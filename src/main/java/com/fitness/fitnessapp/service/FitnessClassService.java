package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.repository.FitnessClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FitnessClassService {

    private final FitnessClassRepository fitnessClassRepository;

    public FitnessClassService(FitnessClassRepository fitnessClassRepository) {
        this.fitnessClassRepository = fitnessClassRepository;
    }

    public List<FitnessClass> getAllClasses() {
        return fitnessClassRepository.findAll();
    }

    public FitnessClass addClass(FitnessClass fitnessClass) {
        return fitnessClassRepository.save(fitnessClass);
    }

    public FitnessClass updateClass(Long id, FitnessClass updatedClass) {
        FitnessClass existing = fitnessClassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        existing.setName(updatedClass.getName());
        existing.setDate(updatedClass.getDate());
        existing.setStartHour(updatedClass.getStartHour());
        existing.setEndHour(updatedClass.getEndHour());
        existing.setDescription(updatedClass.getDescription());
        existing.setMaxCapacity(updatedClass.getMaxCapacity());
        existing.setTrainer(updatedClass.getTrainer());

        return fitnessClassRepository.save(existing);
    }

    public void deleteClass(Long id) {
        fitnessClassRepository.deleteById(id);
    }
}
