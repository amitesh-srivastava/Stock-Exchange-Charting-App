package com.nonJWT.stockexchange.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.StockExchange;
import com.nonJWT.stockexchange.repository.StockExchangeRepository;
import com.nonJWT.stockexchange.service.StockExchangeService;

@RestController
@CrossOrigin
@RequestMapping("/exchange")
public class Stockexchangecontroller {
	
	@Autowired
	private StockExchangeService stockExchangeService;
	
	@GetMapping("/getStockExchangeList")
	public ResponseEntity<List<StockExchange>> getStockExchangeList()  {
			return ResponseEntity.ok(stockExchangeService.getStockExchangeList());
		}
	
	@PostMapping("/addStockExchange")
	public ResponseEntity<StockExchange> addStockExchange(@RequestBody StockExchange stkc)  {
		return ResponseEntity.ok(stockExchangeService.addStockExchange(stkc));
	}
	
	@GetMapping("/companies/{id}")
	public ResponseEntity getCompanies(@PathVariable Long id)  {
		return ResponseEntity.ok(stockExchangeService.getCompaniesList(id));
	}
	
//	@GetMapping("/geCompaniesFromStock")
//	public ResponseEntity getCompanies(StockExchange ste)  {
//		return ResponseEntity.ok(stockExchangeService.getCompaniesListfromStock(ste));
//	}
	
	@DeleteMapping("/deleteExchange/{id}")
	public ResponseEntity deleteExchange(@PathVariable Long id)  {
		stockExchangeService.deleteExchange(id);
		return ResponseEntity.ok("Success"); 
	}


}
