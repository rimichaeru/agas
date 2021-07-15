package com.agas.agasbackend.controllers.users;

import com.agas.agasbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepo extends JpaRepository<User, String> {

    User findByUniqueToken(String uniqueToken);
}
