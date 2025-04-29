package com.fitness.fitnessapp.domain;


import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trainer extends BaseEntity<Long> {
    private String email;
    private String password;
    private String username;
    private String fullName;
}
