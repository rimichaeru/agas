package com.agas.agasbackend.controllers.games;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    public IGameRepo gameRepo;


}
