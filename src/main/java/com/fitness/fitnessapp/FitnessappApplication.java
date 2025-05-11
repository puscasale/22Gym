package com.fitness.fitnessapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FitnessappApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessappApplication.class, args);
	}

}
