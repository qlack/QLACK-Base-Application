package com.eurodyn.qlack.baseapplication.repository;

import com.eurodyn.qlack.baseapplication.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User> {

  boolean existsByEmail(String email);
  boolean existsByEmailAndPassword(String email, String password);

}
