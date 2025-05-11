package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.enums.Status;
import com.fitness.fitnessapp.repository.BookingRepository;
import com.fitness.fitnessapp.repository.FitnessClassRepository;
import com.fitness.fitnessapp.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final MemberRepository memberRepository;
    private final FitnessClassRepository fitnessClassRepository;

    public BookingService(BookingRepository bookingRepository, MemberRepository memberRepository, FitnessClassRepository fitnessClassRepository) {
        this.bookingRepository = bookingRepository;
        this.memberRepository = memberRepository;
        this.fitnessClassRepository = fitnessClassRepository;
    }

    public Booking bookClass(Long classId, Long memberId, Status status) {
        FitnessClass fitnessClass = fitnessClassRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        Booking booking = Booking.builder()
                .fitnessClass(fitnessClass)
                .member(member)
                .status(status)
                .bookingDate(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
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

        System.out.println("Class ID: " + classId);
        System.out.println("Booked Count: " + bookedCount);
        System.out.println("Max Capacity: " + maxCapacity);

        return bookedCount >= maxCapacity;
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
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

    public List<Member> getParticipantsByClassId(Long classId) {
        List<Booking> bookings = bookingRepository.findByFitnessClassId(classId);
        return bookings.stream()
                .map(Booking::getMember)
                .distinct()
                .toList();
    }






}
