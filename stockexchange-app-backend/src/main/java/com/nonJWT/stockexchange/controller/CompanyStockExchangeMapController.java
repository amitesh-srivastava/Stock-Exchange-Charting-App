package com.nonJWT.stockexchange.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nonJWT.stockexchange.DTOs.addCompanyMappingRequestDto;
import com.nonJWT.stockexchange.model.Companystockexchangemap;
import com.nonJWT.stockexchange.service.CompanyStockExchangeMapService;

@RestController
@CrossOrigin
public class CompanyStockExchangeMapController {
	@Autowired
	private CompanyStockExchangeMapService csems;
	

	@PostMapping("/addMapping")
	public ResponseEntity addMapping(@RequestBody addCompanyMappingRequestDto adcmrDto) {
		return ResponseEntity.ok(csems.addCompanyExchangeMap(adcmrDto));
	}

	@GetMapping("/viewAllMappings")
	public ResponseEntity<List<Companystockexchangemap>> viewMapping() {
		return ResponseEntity.ok(csems.showAll());
	}

}
