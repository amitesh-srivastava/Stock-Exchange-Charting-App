package com.nonJWT.stockexchange.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.model.User1;
import com.nonJWT.stockexchange.repository.User1Repository;
import com.nonJWT.stockexchange.service.User1Service;

@Service
public class User1ServiceImpl implements User1Service {
	
	@Autowired
	User1Repository user1Repo;
	
//	public User1 userSignup(User1 user) {
//		return user1Repo.save(user);		
//	}

	public String userSignIn(String username, String pass) {
		User1 userObj = user1Repo.findByName(username);
		System.out.println(userObj.getpassword());
		System.out.println(pass);
		if(userObj.getpassword().equals(pass)) {
			return userObj.getRole();
		}
		return "Incorrect password";
		// TODO Auto-generated method stub
	}

	public void adminSignIn(User1 user) {
		// TODO Auto-generated method stub
		
	}


}
