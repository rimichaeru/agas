package com.agas.agasbackend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    private String id; // ID is the email
    private String uniqueToken;
    private String givenName;
    private String familyName;
    private String username;

    // OneToMany (Games), OneToMany (Players (Characters))
    // remember that any OneToMany needs to handle .save() of the initial DB entry, AND the .save() on the relationship tables straight after
    @OneToMany
    private List<Game> games;

    @OneToMany
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

    public List<Game> getGames() {
        return games;
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
