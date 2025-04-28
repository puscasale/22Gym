package com.fitness.fitnessapp.domain;

import com.fitness.fitnessapp.domain.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking extends BaseEntity<Long> {
    @ManyToOne
    private Member member;

    @ManyToOne
    private FitnessClass fitnessClass;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime bookingDate;
}
