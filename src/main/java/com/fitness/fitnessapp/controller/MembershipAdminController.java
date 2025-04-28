package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.Membership;
import com.fitness.fitnessapp.repository.MembershipRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/memberships")
@CrossOrigin(origins = "http://localhost:3000")
public class MembershipAdminController {

    private final MembershipRepository membershipRepository;

    public MembershipAdminController(MembershipRepository membershipRepository) {
        this.membershipRepository = membershipRepository;
    }

    @GetMapping
    public List<Membership> getAll() {
        return membershipRepository.findAll();
    }

    @PostMapping
    public Membership create(@RequestBody Membership membership) {
        return membershipRepository.save(membership);
    }
}
