package com.agas.agasbackend.entities;

import com.fasterxml.jackson.annotation.*;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.awt.print.Book;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "games")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@TypeDef(name = "json", typeClass = JsonType.class)
public class Game {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String title;
    private String description;

    // JSON field for custom, eg. points/score/info/total
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Map<String, String> properties = new HashMap<>();

    // see players in this game
    @OneToMany
    @JoinColumn(name = "game_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Player> players;

    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User owner;

    public Game() {

    }

    public Game(String title, String description) {
        this.title = title;
        this.description = description;
    }


    // Next 3 for get, set, and add properties
    // returns Game rather than void
    public Map<String, String> getProperties() {
        return properties;
    }

    public Game setProperties(Map<String, String> properties) {
        this.properties = properties;
        return this;
    }

    public Game addProperty(String key, String value) {
        properties.put(key, value);
        return this;
    }






    public String getId() {
        return id;
    }

    public void setOwner(User owner) {
        this.owner = owner;
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

    public List<Player> getPlayers() {
        return players;
    }

//    public List<User> getUsers() {
//        return users;
//    }

    public User getOwner() {
        return owner;
    }
}
