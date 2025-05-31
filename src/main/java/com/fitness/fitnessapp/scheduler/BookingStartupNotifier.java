package com.fitness.fitnessapp.scheduler;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.service.BookingService;
import com.fitness.fitnessapp.service.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class BookingStartupNotifier {

    private final BookingService bookingService;
    private final EmailService emailService;

    public BookingStartupNotifier(BookingService bookingService, EmailService emailService) {
        this.bookingService = bookingService;
        this.emailService = emailService;
    }

    @PostConstruct
    public void sendStartupReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime in48Hours = now.plusHours(72);

        List<Booking> bookings = bookingService.findAllWithFitnessClass();

        System.out.println("[StartupNotifier] Start sending emails at startup...");

        for (Booking booking : bookings) {
            LocalDateTime classTime = LocalDateTime.of(
                    booking.getFitnessClass().getDate(),
                    booking.getFitnessClass().getStartHour()
            );

            if (classTime.isAfter(now) && classTime.isBefore(in48Hours)
                    && booking.getStatus().name().equals("ACTIVE")) {

                String email = booking.getMember().getEmail();
                String subject = "Reminder: Your class starts soon!";
                String body = "Hi, your fitness class \"" + booking.getFitnessClass().getName() +
                        "\" starts at " + booking.getFitnessClass().getStartHour() +
                        " on " + booking.getFitnessClass().getDate() + ".";

                System.out.println("[StartupNotifier] Sending to: " + email);
                emailService.sendReminderEmail(email, subject, body);
            }
        }
    }
}
