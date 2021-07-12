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
    private String nameShort;
    private String nameFull;
    // JSON field for custom, eg. points/score/stats/total

    // Email-ID link to Authenticated owner, User

    // OneToMany (Games)

    public Player() {

    }



}
