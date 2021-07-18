package com.agas.agasbackend.controllers.games;

import com.agas.agasbackend.controllers.users.IUserRepo;
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
    @Autowired
    public IUserRepo userRepo;

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

    // get games based on owner
    @GetMapping("/api/game/owner")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity getOwnersGames(@RequestParam String owner) {
        return ResponseEntity.status(HttpStatus.OK).body(gameRepo.findAllByOwnerId(owner));
    }

    // get game based on id
    @GetMapping("/api/game/id")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity getGameById(@RequestParam String id) {
        return ResponseEntity.status(HttpStatus.OK).body(gameRepo.findById(id));
    }


    // clone game (add Game Code, replace ID)
    @GetMapping("/api/game/clone")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity createClone(@RequestParam String code, @RequestParam String user) {

        Game originalGame = gameRepo.getById(code);

        Game newGame = new Game(originalGame.getTitle(), originalGame.getDescription());
        newGame.setOwner(userRepo.getById(user));

        gameRepo.save(newGame);

        return ResponseEntity.status(HttpStatus.OK).body(newGame);
    }

    @PutMapping("/api/game/update")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity updateGame(@RequestParam String gameId, @RequestBody Game game) {
        Game originalGame = gameRepo.getById(gameId);

        originalGame.setTitle(game.getTitle());
        originalGame.setDescription(game.getDescription());
        originalGame.setProperties(game.getProperties());

        gameRepo.save(originalGame);

        return ResponseEntity.status(HttpStatus.OK).body(originalGame);

    }

}
