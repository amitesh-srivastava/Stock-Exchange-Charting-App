package com.nonJWT.stockexchange.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Sector;
import com.nonJWT.stockexchange.service.SectorService;

@RestController
@CrossOrigin
@RequestMapping("/sector")
public class SectorController {
	@Autowired
	private SectorService sectorService;

	@GetMapping("/allSectors")
	public ResponseEntity<List<Sector>> getAllSectors() {
		return ResponseEntity.ok(sectorService.getAllSectors());
	}

	@PostMapping("/addSector")
	public ResponseEntity<Sector> addSector(@RequestBody Sector sector) {
		return ResponseEntity.ok(sectorService.addSector(sector));
	}

	@GetMapping("/getSectorByID")
	public ResponseEntity<Optional<Sector>> getSectorByID(@RequestBody Long id) {
		return ResponseEntity.ok(sectorService.getSectorByID(id));
	}

	@GetMapping("/getCompaniesInSector/{id}")
	public ResponseEntity<List<Company>> listOfCompaniesInSector(@PathVariable Long id) {
		return ResponseEntity.ok(sectorService.listOfCompaniesInSector(id));
	}

	@GetMapping("/getSectorPrice")
	public ResponseEntity calculateAvgPriceForSector(@RequestParam Long id,
			@RequestParam(name = "from") @DateTimeFormat(iso = ISO.DATE) Date from,
			@RequestParam(name = "to") @DateTimeFormat(iso = ISO.DATE) Date to) {
		return ResponseEntity.ok(sectorService.calculatePriceForSector(id, from, to));
	}
	
	@DeleteMapping("/deleteSector/{id}")
	public ResponseEntity deleteCompany(@PathVariable Long id)  {
		sectorService.deleteSector(id);
		return ResponseEntity.ok("Success"); 
	}

}
