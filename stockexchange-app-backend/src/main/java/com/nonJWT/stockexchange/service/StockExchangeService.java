package com.nonJWT.stockexchange.service;

import java.util.List;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.StockExchange;

public interface StockExchangeService {
	public List<StockExchange> getStockExchangeList();
	public StockExchange addStockExchange(StockExchange stockExchange);
	public List<Company> getCompaniesList(Long id);
	public void deleteExchange(Long id);
	//public List<Company> getCompaniesListfromStock(StockExchange ste);
}
