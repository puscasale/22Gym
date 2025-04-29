package com.fitness.fitnessapp.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFitnessClassDTO {
    private String name;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
    private String description;
    private Integer maxCapacity;
    private Long trainerId;  // ID-ul trainerului
}
