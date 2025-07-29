package com.canisoft.demo.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test-db")
    public String testDbConnection() {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM information_schema.tables", Integer.class);
        return "Tablas en la base de datos: " + count;
    }
}