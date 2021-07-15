package com.agas.agasbackend.controllers.games;

import com.agas.agasbackend.entities.Game;
import com.agas.agasbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IGameRepo extends JpaRepository<Game, String> {

    List<Game> findAllByOwnerId(String ownerId);
}
