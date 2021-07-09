package com.agas.agasbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class AgasBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgasBackendApplication.class, args);
	}

}
