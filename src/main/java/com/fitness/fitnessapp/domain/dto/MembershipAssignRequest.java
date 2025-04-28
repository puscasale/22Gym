package com.fitness.fitnessapp.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MembershipAssignRequest {
    private Long membershipId;
    private LocalDate startDate;
    private LocalDate endDate;
}
