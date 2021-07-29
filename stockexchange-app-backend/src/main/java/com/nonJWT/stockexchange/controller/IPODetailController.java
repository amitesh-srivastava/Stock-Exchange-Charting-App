package com.nonJWT.stockexchange.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nonJWT.stockexchange.DTOs.AddIpoDetailDto;
import com.nonJWT.stockexchange.service.IPODetailService;

@RestController
@CrossOrigin
public class IPODetailController {
	
	@Autowired
	private IPODetailService ipoServ;
	
	@PostMapping("/addIpo")
	public ResponseEntity addIpo(@RequestBody AddIpoDetailDto ipoDto)  {
		return ResponseEntity.ok(ipoServ.addIPOThroughDto(ipoDto)); 
	}
	
	@GetMapping("/getAllIpo")
	public ResponseEntity viewAll()  {
		return ResponseEntity.ok(ipoServ.viewAllIpo()); 
	}
	
}
