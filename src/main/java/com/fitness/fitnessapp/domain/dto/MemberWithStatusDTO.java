package com.fitness.fitnessapp.domain.dto;

import com.fitness.fitnessapp.domain.enums.Status;

public class MemberWithStatusDTO {
    private Long id;             // Member ID
    private String username;
    private String email;
    private Status status;       // Status din Booking

    public MemberWithStatusDTO(Long id, String username, String email, Status status) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.status = status;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }

}
