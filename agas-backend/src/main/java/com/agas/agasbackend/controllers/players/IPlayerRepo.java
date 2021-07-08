package com.agas.agasbackend.controllers.players;

import com.agas.agasbackend.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPlayerRepo extends JpaRepository<Player, Long> {

}
