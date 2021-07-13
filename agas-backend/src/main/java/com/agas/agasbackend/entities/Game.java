package com.agas.agasbackend.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String name;
    private String description;

    // JSON field for custom, eg. points/score/info/total

    // see players in this game
    @OneToMany
    private List<Player> players;

    @OneToOne
//    @JoinColumns({
//            @JoinColumn(name = "owner_username", referencedColumnName = "username"),
//            @JoinColumn(name = "owner_email", referencedColumnName = "email")
//    })
    private User user;


    public Game() {

    }

    public Game(String name, String description) {
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }


}
