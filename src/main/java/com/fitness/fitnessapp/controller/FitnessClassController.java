package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.FitnessClass;
import com.fitness.fitnessapp.domain.dto.CreateFitnessClassDTO;
import com.fitness.fitnessapp.domain.dto.FitnessClassDTO;
import com.fitness.fitnessapp.service.FitnessClassService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:5173")
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
    public FitnessClass addClass(@RequestBody CreateFitnessClassDTO dto) {
        return fitnessClassService.addClass(dto);
    }


    @PutMapping("/{id}")
    public FitnessClass updateClass(@PathVariable Long id, @RequestBody FitnessClass fitnessClass) {
        return fitnessClassService.updateClass(id, fitnessClass);
    }

    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable Long id) {
        fitnessClassService.deleteClass(id);
    }

    @GetMapping("/week")
    public List<FitnessClass> getClassesForWeek(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        return fitnessClassService.getClassesBetween(startDate, startDate.plusDays(6));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessClassDTO> getClassById(@PathVariable Long id) {
        FitnessClass fitnessClass = fitnessClassService.getClassById(id);

        FitnessClassDTO dto = new FitnessClassDTO(
                fitnessClass.getId(),
                fitnessClass.getName(),
                fitnessClass.getDate(),
                fitnessClass.getStartHour(),
                fitnessClass.getEndHour(),
                fitnessClass.getDescription(),
                fitnessClass.getTrainer() != null ? fitnessClass.getTrainer().getFullName() : null
        );

        return ResponseEntity.ok(dto);
    }


}
