package com.agas.agasbackend.controllers.players;


import com.agas.agasbackend.entities.Game;
import com.agas.agasbackend.entities.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class PlayerController {

    @Autowired
    public IPlayerRepo playerRepo;

    // get all players
    @GetMapping("/api/player/all")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity getAllPlayers() {
        return ResponseEntity.status(HttpStatus.OK).body(playerRepo.findAll());
    }

    // create player and link with user token
    @PostMapping("/api/player/create")
    @PreAuthorize("hasAuthority('SCOPE_email')")
    public ResponseEntity createPlayer(@RequestBody Player player) {
        playerRepo.save(player);
        return ResponseEntity.status(HttpStatus.OK).body(player);
    }

    // update an existing player
    @PutMapping("/api/player/update")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity updatePlayer(@RequestParam Long playerId, @RequestBody Player player) {
        Player originalPlayer = playerRepo.getById(playerId);

        originalPlayer.setName(player.getName());
        originalPlayer.setProperties(player.getProperties());

        playerRepo.save(originalPlayer);

        return ResponseEntity.status(HttpStatus.OK).body(originalPlayer);

    }


}
