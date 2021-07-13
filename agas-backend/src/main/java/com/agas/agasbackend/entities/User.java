package com.agas.agasbackend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    private String email;
    private String uniqueToken;
    private String username;

    // OneToMany (Games), OneToMany (Players (Characters))
    // remember that any OneToMany needs to handle .save() of the initial DB entry, AND the .save() on the relationship tables straight after
    @OneToMany
    private List<Game> games;

    @OneToMany
    private List<Player> players;

    public User() {

    }

    public User(String email, String uniqueToken, String username) {
        this.email = email;
        this.uniqueToken = uniqueToken;
        this.username = username;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
