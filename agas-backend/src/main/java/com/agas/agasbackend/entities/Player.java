package com.agas.agasbackend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="players")
public class Player {

    @Id
    @GeneratedValue
    private int id;
    private String nameShort;
    private String nameFull;
    // JSON field for custom, eg. points/score/stats/total

    // ID link to Authenticated owner, User

    // OneToMany (Games)


    public Player() {

    }

}
