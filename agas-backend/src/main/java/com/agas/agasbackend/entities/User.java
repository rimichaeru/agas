package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User {

    @Id
    private String id; // ID is the email
    private String uniqueToken;
    private String givenName;
    private String familyName;
    private String username;


    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Player> players;

    public User() {

    }

    public User(String id, String uniqueToken, String givenName, String familyName, String username) {
        this.id = id;
        this.uniqueToken = uniqueToken;
        this.givenName = givenName;
        this.familyName = familyName;
        this.username = username;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public String getUniqueToken() {
        return uniqueToken;
    }

    public void setUniqueToken(String uniqueToken) {
        this.uniqueToken = uniqueToken;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
