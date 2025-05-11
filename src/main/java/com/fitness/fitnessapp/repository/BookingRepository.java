package com.fitness.fitnessapp.repository;

import com.fitness.fitnessapp.domain.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByMemberId(Long memberId);

    List<Booking> findByFitnessClassId(Long classId);
}
