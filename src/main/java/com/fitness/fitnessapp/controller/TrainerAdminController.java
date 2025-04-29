package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.Membership;
import com.fitness.fitnessapp.domain.Trainer;
import com.fitness.fitnessapp.repository.MembershipRepository;
import com.fitness.fitnessapp.repository.TrainerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trainer")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerAdminController {

    private final TrainerRepository trainerRepository;

    public TrainerAdminController(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    @GetMapping
    public List<Trainer> getAll() {
        return trainerRepository.findAll();
    }

    @PostMapping
    public Trainer create(@RequestBody Trainer trainer) {
        return trainerRepository.save(trainer);
    }
}
