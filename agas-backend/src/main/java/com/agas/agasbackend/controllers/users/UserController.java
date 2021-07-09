package com.agas.agasbackend.controllers.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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
