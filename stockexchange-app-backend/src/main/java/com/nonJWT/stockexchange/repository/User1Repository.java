package com.nonJWT.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.User1;


@Repository
public interface User1Repository  extends JpaRepository<User1,Long> {
	User1 findByEmail(String email);
	User1 findByName(String name);
}