package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "players")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
@TypeDef(name = "json", typeClass = JsonType.class)
public class Player {

    @Id
    @GeneratedValue
    private int id;
    private String name;

    // JSON field for custom, eg. points/score/stats/total
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Map<String, String> properties = new HashMap<>();

    @ManyToOne
    private User user;

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
