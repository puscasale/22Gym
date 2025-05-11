package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.Trainer;
import com.fitness.fitnessapp.repository.MemberRepository;
import com.fitness.fitnessapp.repository.TrainerRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final TrainerRepository trainerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(MemberRepository memberRepository, TrainerRepository trainerRepository) {
        this.memberRepository = memberRepository;
        this.trainerRepository = trainerRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Member signup(Member member) {
        if (memberRepository.existsByUsername(member.getUsername()) ||
                trainerRepository.findByUsername(member.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(hashedPassword);

        return memberRepository.save(member);
    }

    public Object login(String username, String password) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (passwordEncoder.matches(password, member.getPassword())) {
                return member;
            } else {
                throw new RuntimeException("Invalid password for member");
            }
        }

        Optional<Trainer> trainerOpt = trainerRepository.findByUsername(username);
        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            // Pentru trainer, verifică parola fără hashing
            if (password.equals(trainer.getPassword())) {
                return trainer;
            } else {
                throw new RuntimeException("Invalid password for trainer");
            }
        }

        throw new RuntimeException("User not found");
    }

}
