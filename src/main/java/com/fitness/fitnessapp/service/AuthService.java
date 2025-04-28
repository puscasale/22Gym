package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.Trainer;
import com.fitness.fitnessapp.repository.MemberRepository;
import com.fitness.fitnessapp.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final TrainerRepository trainerRepository;

    public AuthService(MemberRepository memberRepository, TrainerRepository trainerRepository) {
        this.memberRepository = memberRepository;
        this.trainerRepository = trainerRepository;
    }

    public Member signup(Member member) {
        if (memberRepository.existsByUsername(member.getUsername()) ||
                trainerRepository.findByUsername(member.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        return memberRepository.save(member);
    }

    public Object login(String username, String password) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (member.getPassword().equals(password)) {
                return member;
            } else {
                throw new RuntimeException("Invalid password");
            }
        }

        Optional<Trainer> trainerOpt = trainerRepository.findByUsername(username);
        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            if (trainer.getPassword().equals(password)) {
                return trainer;
            } else {
                throw new RuntimeException("Invalid password");
            }
        }

        throw new RuntimeException("User not found");
    }
}
