package com.agas.agasbackend.controllers.games;

import com.agas.agasbackend.entities.Game;
import com.agas.agasbackend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    public IGameRepo gameRepo;

    // get all games
    @GetMapping("/api/game/all")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity getAllGames() {
        return ResponseEntity.status(HttpStatus.OK).body(gameRepo.findAll());
    }

    // create game and link with user token
    @PostMapping("/api/game/create")
    @PreAuthorize("hasAuthority('SCOPE_email')")
    public ResponseEntity createGame(@RequestBody Game game) {

        gameRepo.save(game);

        return ResponseEntity.status(HttpStatus.OK).body(game);
    }

}
