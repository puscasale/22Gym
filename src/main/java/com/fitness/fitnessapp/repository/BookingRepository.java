package com.fitness.fitnessapp.repository;

import com.fitness.fitnessapp.domain.Booking;
import com.fitness.fitnessapp.domain.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByMemberId(Long memberId);

    List<Booking> findByFitnessClassId(Long classId);

    boolean existsByFitnessClassIdAndMemberIdAndStatus(Long classId, Long memberId, Status status);

    Optional<Booking> findByFitnessClassIdAndMemberId(Long classId, Long memberId);


}
