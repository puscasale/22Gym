package com.fitness.fitnessapp.service;

import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.domain.Trainer;
import com.fitness.fitnessapp.domain.dto.CreateFitnessClassDTO;
import com.fitness.fitnessapp.repository.FitnessClassRepository;
import com.fitness.fitnessapp.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FitnessClassService {

    private final FitnessClassRepository fitnessClassRepository;
    private  TrainerRepository trainerRepository;

    public FitnessClassService(FitnessClassRepository fitnessClassRepository,TrainerRepository trainerRepository) {
        this.fitnessClassRepository = fitnessClassRepository;
        this.trainerRepository = trainerRepository;
    }

    public List<FitnessClass> getAllClasses() {
        return fitnessClassRepository.findAll();
    }

    public FitnessClass addClass(CreateFitnessClassDTO dto) {
        Trainer trainer = trainerRepository.findById(dto.getTrainerId())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        FitnessClass fitnessClass = FitnessClass.builder()
                .name(dto.getName())
                .date(dto.getDate())
                .startHour(dto.getStartHour())
                .endHour(dto.getEndHour())
                .description(dto.getDescription())
                .maxCapacity(dto.getMaxCapacity())
                .trainer(trainer)  // aici legăm trainer-ul corect
                .build();

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

    public List<FitnessClass> getClassesBetween(LocalDate start, LocalDate end) {
        return fitnessClassRepository.findByDateBetween(start, end);
    }

    public FitnessClass getClassById(Long id) {
        return fitnessClassRepository.getReferenceById(id);
    }

}
