package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.enums.Status;
import com.fitness.fitnessapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) {
        return bookingService.bookClass(request.getClassId(), request.getMemberId(), request.getStatus());
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        bookingService.updateBookingStatus();
        return bookingService.findAllBookings();
    }

    @GetMapping("/user/{memberId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long memberId) {
        bookingService.updateBookingStatus();
        return bookingService.findBookingsByUserId(memberId);
    }

    @GetMapping("/class/{classId}")
    public List<Booking> getBookingsByClassId(@PathVariable Long classId) {
        return bookingService.findBookingsByClassId(classId);
    }

    @GetMapping("/class/{classId}/isFullyBooked")
    public boolean isClassFullyBooked(@PathVariable Long classId) {
        return bookingService.isClassFullyBooked(classId);
    }

    @DeleteMapping("/{bookingId}")
    public void deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
    }

    @GetMapping("/update-status")
    public void updateBookingStatus() {
        bookingService.updateBookingStatus();
    }

    @GetMapping("/class/{classId}/participants")
    public List<Member> getParticipantsByClassId(@PathVariable Long classId) {
        return bookingService.getParticipantsByClassId(classId);
    }



    public static class BookingRequest {
        private Long classId;
        private Long memberId;
        private Status status;

        public Long getClassId() {
            return classId;
        }

        public void setClassId(Long classId) {
            this.classId = classId;
        }

        public Long getMemberId() {
            return memberId;
        }

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }

        public Status getStatus() {
            return status;
        }

        public void setStatus(Status status) {
            this.status = status;
        }
    }
}
