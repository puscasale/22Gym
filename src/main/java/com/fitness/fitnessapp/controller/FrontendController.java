package com.fitness.fitnessapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    // Acoperă toate rutele frontend care nu încep cu /api
    @GetMapping(value = { "/", "/{path:^(?!api$).*$}", "/{path:^(?!api$).*$}/**" })
    public String forward() {
        return "forward:/index.html";
    }
}
