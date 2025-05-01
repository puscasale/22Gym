package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.Membership;
import com.fitness.fitnessapp.domain.dto.MembershipAssignRequest;
import com.fitness.fitnessapp.domain.dto.MembershipViewDTO;
import com.fitness.fitnessapp.repository.MemberRepository;
import com.fitness.fitnessapp.repository.MembershipRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipService {

    private final MemberRepository memberRepository;
    private final MembershipRepository membershipRepository;

    public MembershipService(MemberRepository memberRepository, MembershipRepository membershipRepository) {
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
    }

    public MembershipViewDTO viewMembership(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Membership membership = member.getMembership();
        if (membership == null) {
            throw new RuntimeException("No membership found for this member");
        }

        return new MembershipViewDTO(
                membership.getType(),
                membership.getPrice(),
                member.getStartDate() != null ? member.getStartDate().toString() : null,
                member.getEndDate() != null ? member.getEndDate().toString() : null
        );
    }


    public Member assignMembership(Long memberId, Long membershipId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new RuntimeException("Membership not found"));

        LocalDate start = LocalDate.now();
        LocalDate end = start.plusMonths(membership.getMonths());

        member.setMembership(membership);
        member.setStartDate(start);
        member.setEndDate(end);

        return memberRepository.save(member);
    }




    public void cancelMembership(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        member.setMembership(null);
        memberRepository.save(member);
    }

    public List<Membership> getAllMemberships() {
        return membershipRepository.findAll();
    }
}
