package com.fitness.fitnessapp.repository;

import com.fitness.fitnessapp.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username); // necesar pt login
    boolean existsByUsername(String username); // pt verificare duplicat la signup
}
