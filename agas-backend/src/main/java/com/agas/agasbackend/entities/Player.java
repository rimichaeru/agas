package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "players")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Player {

    // Personal details player class

    @Id
    @GeneratedValue
    private int id;
    private String name;
    // JSON field for custom, eg. points/score/stats/total

    // ManyToOne (to User)
    @ManyToOne
    @JsonIgnore
    private User user;

    // OneToMany (Games) - one playerCharacter for many games, eg. Tennis, would usually be OneToOne otherwise
    @ManyToOne
    private Game game;


    public Player() {

    }

    public Player(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGame(Game game) {
        this.game = game;
    }


    public User getUser() {
        return user;
    }

    public Game getGame() {
        return game;
    }
}
