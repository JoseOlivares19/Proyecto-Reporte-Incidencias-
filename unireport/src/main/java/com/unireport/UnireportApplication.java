package com.unireport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UnireportApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnireportApplication.class, args);
	}

}
