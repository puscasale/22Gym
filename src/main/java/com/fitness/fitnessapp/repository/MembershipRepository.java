package com.fitness.fitnessapp.repository;

import com.fitness.fitnessapp.domain.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
}
