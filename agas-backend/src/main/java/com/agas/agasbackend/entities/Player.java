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
@JsonIgnoreProperties (value = { "hibernateLazyInitializer", "handler"})
public class Player {

    @Id
    @GeneratedValue
    private Long id;
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


    // Next 3 for get, set, and add properties
    // returns Player rather than void
    public Map<String, String> getProperties() {
        return properties;
    }

    public Player setProperties(Map<String, String> properties) {
        this.properties = properties;
        return this;
    }

    public Player addProperty(String key, String value) {
        properties.put(key, value);
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
