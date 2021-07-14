package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "games")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Game {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String title;
    private String description;

    // JSON field for custom, eg. points/score/info/total

    // see players in this game
    @OneToMany
    @JoinColumn(name = "game_id")
    @JsonIgnore
    private List<Player> players;

    @OneToOne
    @JsonIgnore
    private User owner;


    public Game() {

    }

    public Game(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }
}
