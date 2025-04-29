package com.fitness.fitnessapp.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FitnessClassDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
    private String description;
    private String trainerName;
}

