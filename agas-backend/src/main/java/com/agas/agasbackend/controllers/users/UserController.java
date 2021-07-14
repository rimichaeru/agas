package com.agas.agasbackend.controllers.users;


import com.agas.agasbackend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    public IUserRepo userRepo;

    // test api connection
    @GetMapping("/api/test")
    @PreAuthorize("hasAuthority('SCOPE_email')")
    public Map<String, Object> messages() {

        Map<String, Object> result = new HashMap<>();
        result.put("messages", "BeepBoop");

        return result;
    }

    // get all users
    @GetMapping("/api/user/all")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public ResponseEntity getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepo.findAll());
    }

    // initialise user account
    @PostMapping("/api/user/create")
    @PreAuthorize("hasAuthority('SCOPE_email')")
    public ResponseEntity createUser(@RequestBody User profile) {
        User userExists = userRepo.findByUniqueToken(profile.getUniqueToken());

        if (userExists == null) {
            // Add user if doesn't exist
            User newUser = new User(profile.getId(), profile.getUniqueToken(), profile.getGivenName(), profile.getFamilyName(), profile.getId());
            userRepo.save(newUser);
            return ResponseEntity.status(HttpStatus.OK).body("New user account created");

        } else {
            // return error if user exists
            return ResponseEntity.status(HttpStatus.OK).body("User account already exists");
        }

    }

    // get all profile information (characters, games)
    @GetMapping("/api/user/profile")
    public ResponseEntity getAllProfile(@RequestParam String token) {
        User userProfile = userRepo.findByUniqueToken(token);

        return ResponseEntity.status(HttpStatus.OK).body(userProfile);
    }


    // test profile connection
    @GetMapping("/api/userProfile")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public <A extends AbstractOAuth2TokenAuthenticationToken<AbstractOAuth2Token>> Map<String, Object> getUserDetails(A authentication) {
        return authentication.getTokenAttributes();
    }

    //For JWT only
    @GetMapping("/api/userProfileJWT")
    @PreAuthorize("hasAuthority('SCOPE_profile')")
    public Map<String, Object> getUserDetails(JwtAuthenticationToken authentication) {
        return authentication.getTokenAttributes();
    }
}
