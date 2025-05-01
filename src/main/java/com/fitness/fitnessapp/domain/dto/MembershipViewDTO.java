// MembershipViewDTO.java
package com.fitness.fitnessapp.domain.dto;

import com.fitness.fitnessapp.domain.enums.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MembershipViewDTO {
    private MembershipType type;
    private float price;
    private String startDate;
    private String endDate;
}
