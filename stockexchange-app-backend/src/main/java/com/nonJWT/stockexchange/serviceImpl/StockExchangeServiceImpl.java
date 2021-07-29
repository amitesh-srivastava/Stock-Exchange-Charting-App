package com.nonJWT.stockexchange.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Companystockexchangemap;
import com.nonJWT.stockexchange.model.StockExchange;
import com.nonJWT.stockexchange.repository.Companystockexchangemaprepository;
import com.nonJWT.stockexchange.repository.StockExchangeRepository;
import com.nonJWT.stockexchange.service.StockExchangeService;

@Service
public class StockExchangeServiceImpl implements StockExchangeService {
	
	@Autowired
	private StockExchangeRepository stockExchangeRepository;
	
	@Autowired
	private Companystockexchangemaprepository mapRepo;
	
	public List<StockExchange> getStockExchangeList() {
		return stockExchangeRepository.findAll();
	}
	
	public StockExchange addStockExchange(StockExchange stockExchange) {
		return stockExchangeRepository.save(stockExchange);
	}

	public List<Company> getCompaniesList(Long id) {
		List<Companystockexchangemap> maps = mapRepo.getMapsByStockExchangeId(id);
		List<Company> compList = new ArrayList<>(); 
		for(Companystockexchangemap c : maps) {
			compList.add(c.getCompany());
		}
		return compList;
		
	}

	@Override
	public void deleteExchange(Long id) {
		stockExchangeRepository.deleteById(id);
		
	}

//	@Override
//	public List<Company> getCompaniesListfromStock(StockExchange ste) {
//
//		return null;
//	}
//	
}
