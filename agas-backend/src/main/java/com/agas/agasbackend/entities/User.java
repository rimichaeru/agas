package com.agas.agasbackend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    private String email;
//    @GeneratedValue
//    private int id;
    private String uniqueToken;

    // REMOVED---OneToOne (Player), which in-turn has OneToMany (Games)
//    @OneToOne
//    private Player player;

    // OneToMany (Games), OneToMany (Characters)
    @OneToMany
    private List<Game> games;

    public User() {

    }

    public User(String email, String uniqueToken) {
        this.email = email;
        this.uniqueToken = uniqueToken;
    }

    public List<Game> getGames() {
        return games;
    }

    //    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }

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

//    public Player getPlayer() {
//        return player;
//    }

}
