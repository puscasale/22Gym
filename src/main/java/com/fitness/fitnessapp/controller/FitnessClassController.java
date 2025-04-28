package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.service.FitnessClassService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:3000")
public class FitnessClassController {

    private final FitnessClassService fitnessClassService;

    public FitnessClassController(FitnessClassService fitnessClassService) {
        this.fitnessClassService = fitnessClassService;
    }

    @GetMapping
    public List<FitnessClass> getAllClasses() {
        return fitnessClassService.getAllClasses();
    }

    @PostMapping
    public FitnessClass addClass(@RequestBody FitnessClass fitnessClass) {
        return fitnessClassService.addClass(fitnessClass);
    }

    @PutMapping("/{id}")
    public FitnessClass updateClass(@PathVariable Long id, @RequestBody FitnessClass fitnessClass) {
        return fitnessClassService.updateClass(id, fitnessClass);
    }

    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable Long id) {
        fitnessClassService.deleteClass(id);
    }
}
