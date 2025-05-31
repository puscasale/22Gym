package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.dto.MemberWithStatusDTO;
import com.fitness.fitnessapp.domain.enums.Status;
import com.fitness.fitnessapp.repository.BookingRepository;
import com.fitness.fitnessapp.repository.FitnessClassRepository;
import com.fitness.fitnessapp.repository.MemberRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final MemberRepository memberRepository;
    private final FitnessClassRepository fitnessClassRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public BookingService(BookingRepository bookingRepository,
                          MemberRepository memberRepository,
                          FitnessClassRepository fitnessClassRepository,
                          SimpMessagingTemplate messagingTemplate) {
        this.bookingRepository = bookingRepository;
        this.memberRepository = memberRepository;
        this.fitnessClassRepository = fitnessClassRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public Booking bookClass(Long classId, Long memberId, Status status) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        if (bookingRepository.existsByFitnessClassIdAndMemberIdAndStatus(classId, memberId, Status.ACTIVE)) {
            throw new IllegalArgumentException("You have already booked this class.");
        }

        Booking booking = Booking.builder()
                .fitnessClass(fitnessClass)
                .member(member)
                .status(status)
                .bookingDate(LocalDateTime.now())
                .build();

        Booking saved = bookingRepository.save(booking);

        messagingTemplate.convertAndSend(
                "/topic/class/" + classId + "/joined",
                new MemberWithStatusDTO(
                        member.getId(),
                        member.getUsername(),
                        member.getEmail(),
                        status
                )
        );

        return saved;
    }

    public List<Booking> findAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> findBookingsByUserId(Long memberId) {
        return bookingRepository.findByMemberId(memberId);
    }

    public List<Booking> findBookingsByClassId(Long classId) {
        return bookingRepository.findByFitnessClassId(classId);
    }

    public boolean isClassFullyBooked(Long classId) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));

        long bookedCount = bookingRepository.findByFitnessClassId(classId).size();
        int maxCapacity = fitnessClass.getMaxCapacity();

        return bookedCount >= maxCapacity;
    }

    public void deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        bookingRepository.deleteById(bookingId);

        messagingTemplate.convertAndSend(
                "/topic/class/" + booking.getFitnessClass().getId() + "/cancelled",
                booking.getMember().getId()
        );
    }

    public void updateBookingStatus() {
        List<Booking> bookings = bookingRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (Booking booking : bookings) {
            LocalDateTime classEndTime = LocalDateTime.of(
                    booking.getFitnessClass().getDate(),
                    booking.getFitnessClass().getEndHour()
            );

            if (classEndTime.isBefore(now) && booking.getStatus() == Status.ACTIVE) {
                booking.setStatus(Status.FINISHED);
                bookingRepository.save(booking);
            }
        }
    }

    public List<MemberWithStatusDTO> getParticipantsWithStatusByClassId(Long classId) {
        List<Booking> bookings = bookingRepository.findByFitnessClassId(classId);
        return bookings.stream()
                .map(b -> new MemberWithStatusDTO(
                        b.getMember().getId(),
                        b.getMember().getUsername(),
                        b.getMember().getEmail(),
                        b.getStatus()
                ))
                .toList();
    }

    public boolean existsByFitnessClassIdAndMemberIdAndStatus(Long classId, Long memberId, Status status) {
        return bookingRepository.existsByFitnessClassIdAndMemberIdAndStatus(classId, memberId, status);
    }

    public void updateBookingStatus(Long classId, Long memberId, Status status) {
        Booking booking = bookingRepository
                .findByFitnessClassIdAndMemberId(classId, memberId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        booking.setStatus(status);
        bookingRepository.save(booking);

        messagingTemplate.convertAndSend(
                "/topic/class/" + classId + "/status-updated",
                new MemberWithStatusDTO(
                        booking.getMember().getId(),
                        booking.getMember().getUsername(),
                        booking.getMember().getEmail(),
                        status
                )
        );
    }

    public List<Booking> findAllWithFitnessClass() {
        List<Booking> bookings = bookingRepository.findAll();

        // Force fetch fitnessClass și member ca să nu ai LazyInitializationException
        for (Booking booking : bookings) {
            booking.getFitnessClass().getName(); // Trigger fetch
            booking.getMember().getEmail();      // Trigger fetch
        }

        return bookings;
    }

}
