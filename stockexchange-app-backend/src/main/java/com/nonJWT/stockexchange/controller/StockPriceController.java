package com.nonJWT.stockexchange.controller;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nonJWT.stockexchange.DTOs.StockPriceAddDto;
import com.nonJWT.stockexchange.model.StockPrice;
import com.nonJWT.stockexchange.repository.StockPriceRepository;
import com.nonJWT.stockexchange.service.StockPriceService;

@RestController
@CrossOrigin
public class StockPriceController {

	@RestController
	@CrossOrigin
	public class Stockpricecontroller {
		@Autowired
		StockPriceRepository stkpricerepo;

		@Autowired
		StockPriceService spServ;
		/*
		 * { "exchangename": "bse", "companycode": "TCS",
		 * 
		 * "datee ": "2014-01-01T23:28:56.782Z", "timee" :"10:20:00" } expected json
		 * format
		 */

//@CrossOrigin(origins ="http://reactive01.herokuapp.com")
//@CrossOrigin(origins ="http://localhost:3000")
		@RequestMapping(value = "/addstockprices", method = RequestMethod.POST)
		public ResponseEntity<Object> stockpriceapi(@RequestBody StockPriceAddDto stockprice)
				throws ClassNotFoundException, IOException {
			StockPrice stkprice = spServ.addThroughDto(stockprice);
			// make sure your entity class properties of price are in lower case and match
			// the json,to avoid errors
			System.out.println(stkprice + "check this " + stkprice.getCompanycode());

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(stkprice.getId()).toUri();

			return ResponseEntity.created(location).build();
		}

//@CrossOrigin(origins ="http://localhost:3000")
		@RequestMapping(value = "/getstockprices", method = RequestMethod.GET, headers = "Accept=application/json")
		public List<StockPrice> getstockprice() throws ClassNotFoundException, IOException {
			List<StockPrice> stkprice = stkpricerepo.findAll();
			// make sure your entity class properties of user are in lower case and match
			// the json,to avoid errors
			return stkprice;
		}

		@GetMapping("/getCompanyStockPrice")
		public List<StockPrice> getCompanyStockPrice(@RequestParam Long id, @RequestParam(name = "from") @DateTimeFormat(iso = ISO.DATE) Date from,
				@RequestParam(name = "to") @DateTimeFormat(iso = ISO.DATE) Date to) throws ClassNotFoundException, IOException {
			List<StockPrice> stkPriceList = spServ.StockPricesPeriodicity(id, from, to);
			return stkPriceList;
		}
	}

}
