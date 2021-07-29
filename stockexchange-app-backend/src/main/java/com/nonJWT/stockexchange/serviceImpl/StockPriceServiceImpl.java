package com.nonJWT.stockexchange.serviceImpl;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.DTOs.StockPriceAddDto;
import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Companystockexchangemap;
import com.nonJWT.stockexchange.model.StockPrice;
import com.nonJWT.stockexchange.repository.Companyrepository;
import com.nonJWT.stockexchange.repository.Companystockexchangemaprepository;
import com.nonJWT.stockexchange.repository.StockPriceRepository;
import com.nonJWT.stockexchange.service.StockPriceService;

@Service
public class StockPriceServiceImpl implements StockPriceService{

	@Autowired
	private StockPriceRepository spRepo;
	
	@Autowired
	private Companyrepository comRepo;
	
	@Autowired
	private Companystockexchangemaprepository mapRepo;
	
	@Override
	public StockPrice add(StockPrice sp) {
		return spRepo.save(sp);
	}

	@Override
	public StockPrice addThroughDto(StockPriceAddDto spDto) {
		Companystockexchangemap cr = mapRepo.findByCompanyCode(spDto.getCompanycode());
		StockPrice sp = new StockPrice();
		sp.setCompany(cr.getCompany());
		sp.setCompanycode(spDto.getCompanycode());
		sp.setDatee(spDto.getDatee());
		sp.setExchangename(spDto.getExchangename());
		sp.setShareprice(spDto.getShareprice());
		sp.setTimee(spDto.getTimee());
		return add(sp);
	}

	public List<StockPrice> StockPricesPeriodicity(Long id, Date from, Date to) {
		Company company = comRepo.findById(id).get();
		if(company==null)
			return null;
		List<StockPrice> stkPriceList = new ArrayList<>();
		company.getStockPrice().forEach(s ->{
			if(!(s.getDatee().after(to) || s.getDatee().before(from))) {
				stkPriceList.add(s);
			}
		});
		return stkPriceList;
		
	}

}
