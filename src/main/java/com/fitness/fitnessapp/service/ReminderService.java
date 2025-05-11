package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.repository.BookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReminderService {

    private static final Logger logger = LoggerFactory.getLogger(ReminderService.class);

    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    public ReminderService(BookingRepository bookingRepository, EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 25 19 * * *")  // Rulează zilnic la ora 08:00
    public void sendReminders() {
        logger.info("Running sendReminders method...");

        LocalDate today = LocalDate.now();
        LocalDate reminderDate = today.plusDays(1);

        logger.info("Searching for bookings for date: " + reminderDate);

        List<Booking> upcomingBookings = bookingRepository.findAll().stream()
                .filter(booking ->
                        booking.getFitnessClass().getDate().isEqual(reminderDate) &&
                                booking.getStatus().toString().equals("ACTIVE")
                )
                .toList();

        logger.info("Found " + upcomingBookings.size() + " upcoming bookings.");

        for (Booking booking : upcomingBookings) {
            String toEmail = booking.getMember().getEmail();
            String subject = "22Gym: Class Reminder - " + booking.getFitnessClass().getName();
            String content = "<h2>Reminder for your upcoming class tomorrow:</h2>"
                    + "<p>Class: " + booking.getFitnessClass().getName() + "</p>"
                    + "<p>Date: " + booking.getFitnessClass().getDate() + "</p>"
                    + "<p>Start Time: " + booking.getFitnessClass().getStartHour() + "</p>"
                    + "<p>Duration: 1 hour</p>"
                    + "<p><a href='http://localhost:5173/view-class/" + booking.getFitnessClass().getId() + "'>View Details</a></p>";

            try {
                logger.info("Sending email to " + toEmail);
                emailService.sendReminderEmail(toEmail, subject, content);
            } catch (IOException e) {
                logger.error("Failed to send reminder email to " + toEmail, e);
            }
        }
    }
}
