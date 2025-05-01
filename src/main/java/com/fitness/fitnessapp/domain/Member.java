package com.fitness.fitnessapp.domain;

import com.fitness.fitnessapp.domain.enums.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends BaseEntity<Long> {

    private String email;
    private String password;
    private String username;
    private LocalDate startDate;
    private LocalDate endDate;
    private UserType userType= UserType.MEMBER;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;
}
