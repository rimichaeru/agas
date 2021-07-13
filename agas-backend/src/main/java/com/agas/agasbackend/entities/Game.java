package com.agas.agasbackend.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="games")
public class Game {

    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    private String description;
    private String owner;

    // JSON field for custom, eg. points/score/info/total

    // see players in this game
    @OneToMany
    private List<Player> players;

    public Game() {

    }

    public Game(String name, String description, String owner) {
        this.name = name;
        this.description = description;
        this.owner = owner;
    }
}
