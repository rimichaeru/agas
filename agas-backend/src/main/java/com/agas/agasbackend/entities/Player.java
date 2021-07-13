package com.agas.agasbackend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="players")
public class Player {

    // Personal details player class

    @Id
    @GeneratedValue
    private int id;
    private String name;
    // JSON field for custom, eg. points/score/stats/total

    // ManyToOne (to User)
    @ManyToOne
    private User user;

    // OneToMany (Games) - one playerCharacter for many games, eg. Tennis, would usually be OneToOne otherwise
    @OneToMany
    private List<Game> games;


    public Player() {

    }

    public Player(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public List<Game> getGames() {
        return games;
    }
}
