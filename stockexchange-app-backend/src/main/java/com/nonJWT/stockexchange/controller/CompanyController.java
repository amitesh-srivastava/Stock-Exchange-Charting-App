package com.nonJWT.stockexchange.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.service.CompanyService;


@RestController
@CrossOrigin(methods = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE})
@RequestMapping("/company")
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@GetMapping("/getAllCompanies")
	public ResponseEntity<List<Company>> getAllCompanies(){
		return ResponseEntity.ok(companyService.getCompanies());
	}
	
	@GetMapping("/findById")
	public ResponseEntity<Optional<Company>> findById(@RequestBody Long id){
		return ResponseEntity.ok(companyService.findById(id));
	}
	
	@GetMapping("/getMatchingCompanies")
	public ResponseEntity<List<Company>> getMatchingCompaniesList(@RequestBody String name){
		return ResponseEntity.ok(companyService.getMatchingCompanies(name));
	}
	
	@PostMapping("/addCompany")
	public ResponseEntity<Company> addCompany(@RequestBody Company company){
		return ResponseEntity.ok(companyService.addCompany(company));
	}
	
	@GetMapping("/getIpoDetails/{id}")
	public ResponseEntity getIpoDetails(@PathVariable Long id)  {
		return ResponseEntity.ok(companyService.getIpoFromCompany(id)); 
	}
	
	@DeleteMapping("/deleteCompany/{id}")
	public ResponseEntity deleteCompany(@PathVariable Long id)  {
		companyService.deleteCompany(id);
		return ResponseEntity.ok("Success"); 
	}

}
