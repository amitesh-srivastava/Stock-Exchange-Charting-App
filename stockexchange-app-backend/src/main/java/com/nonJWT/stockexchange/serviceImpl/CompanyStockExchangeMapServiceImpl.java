package com.nonJWT.stockexchange.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.DTOs.addCompanyMappingRequestDto;
import com.nonJWT.stockexchange.model.Companystockexchangemap;
import com.nonJWT.stockexchange.model.StockExchange;
import com.nonJWT.stockexchange.repository.Companyrepository;
import com.nonJWT.stockexchange.repository.Companystockexchangemaprepository;
import com.nonJWT.stockexchange.repository.StockExchangeRepository;
import com.nonJWT.stockexchange.service.CompanyStockExchangeMapService;

@Service
public class CompanyStockExchangeMapServiceImpl implements CompanyStockExchangeMapService {

	@Autowired
	private Companystockexchangemaprepository csemr;
	
	@Autowired
	private Companyrepository companyRepo;
	
	@Autowired
	private StockExchangeRepository stckRepo;
	
	public Companystockexchangemap add(Companystockexchangemap csem) {
		return csemr.save(csem);
	}

	public List<Companystockexchangemap> showAll() {
		return csemr.findAll();
	}
	
	public Companystockexchangemap addCompanyExchangeMap(addCompanyMappingRequestDto reqDto) {
		Companystockexchangemap compstk = new Companystockexchangemap();
		compstk.setCompany(companyRepo.findByCompanyName(reqDto.getCompanyName()));
		compstk.setCompanyCode(reqDto.getCompanyCode());
		compstk.setStockexchange(stckRepo.findByName(reqDto.getStockName()));
		return add(compstk);
	}
		
}
