package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "players")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class Player {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    // JSON field for custom, eg. points/score/stats/total

    // ManyToOne (to User)
    @ManyToOne
    private User user;

    // ManyToOne(Games) - many playerCharacter for one game, eg. Tennis
    @ManyToOne
    private Game game;

    public Player() {

    }

    public Player(String name) {
        this.name = name;
    }

    public void setGame(Game game) {
        this.game = game;
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

//    @JsonIgnore
    public User getUser() {
        return user;
    }

    public Game getGame() {
        return game;
    }
}
