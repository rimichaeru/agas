package com.agas.agasbackend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private int id;
    private String uniqueToken;
    private String email;

    // OneToOne (Player), which in-turn has OneToMany (Games)

    public User() {

    }

}
