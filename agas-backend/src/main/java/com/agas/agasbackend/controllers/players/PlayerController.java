package com.agas.agasbackend.controllers.players;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PlayerController {

    @Autowired
    public IPlayerRepo playerRepo;


    // test api connection
    @GetMapping("/test")
    public ResponseEntity getTest() {
        return new ResponseEntity("API is working", HttpStatus.OK);
    }





}
