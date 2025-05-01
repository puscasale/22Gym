package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.Membership;
import com.fitness.fitnessapp.domain.dto.MembershipViewDTO;
import com.fitness.fitnessapp.service.MembershipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership")
@CrossOrigin(origins = "http://localhost:5173")
public class MembershipController {

    private final MembershipService membershipService;

    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping("/{memberId}/membership")
    public MembershipViewDTO viewMembership(@PathVariable Long memberId) {
        return membershipService.viewMembership(memberId);
    }


    @PostMapping("/{memberId}/membership/{membershipId}")
    public Member assignMembership(@PathVariable Long memberId, @PathVariable Long membershipId) {
        return membershipService.assignMembership(memberId, membershipId);
    }


    @DeleteMapping("/{memberId}/membership")
    public void cancelMembership(@PathVariable Long memberId) {
        membershipService.cancelMembership(memberId);
    }

    @GetMapping("/all")
    public List<Membership> getAllMemberships() {
        return membershipService.getAllMemberships();
    }

}
