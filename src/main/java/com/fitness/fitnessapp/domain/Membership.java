package com.fitness.fitnessapp.domain;

import com.fitness.fitnessapp.domain.enums.MembershipType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Membership extends BaseEntity<Long> {

    @Enumerated(EnumType.STRING)
    private MembershipType type;

    private Float price;
    private int months;
}
