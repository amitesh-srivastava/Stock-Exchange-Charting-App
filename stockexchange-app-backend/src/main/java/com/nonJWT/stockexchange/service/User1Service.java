package com.nonJWT.stockexchange.service;

import com.nonJWT.stockexchange.model.User1;

public interface User1Service {
	//public User1 userSignup(User1 user);
	public String userSignIn(String username, String pass);
	public void adminSignIn(User1 user);
}
