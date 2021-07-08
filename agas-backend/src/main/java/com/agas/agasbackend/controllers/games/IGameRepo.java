package com.agas.agasbackend.controllers.games;

import com.agas.agasbackend.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGameRepo extends JpaRepository<Game, String> {

}
