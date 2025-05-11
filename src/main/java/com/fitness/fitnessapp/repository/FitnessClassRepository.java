package com.fitness.fitnessapp.repository;

import com.fitness.fitnessapp.domain.FitnessClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FitnessClassRepository extends JpaRepository<FitnessClass, Long> {
    List<FitnessClass> findByDate(LocalDate date);

    List<FitnessClass> findByDateBetween(LocalDate start, LocalDate end);

    FitnessClass getClassById(Long classId);
}
