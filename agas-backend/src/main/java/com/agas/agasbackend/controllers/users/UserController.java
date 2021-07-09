package com.agas.agasbackend.controllers.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    public IUserRepo userRepo;
}
