package com.nonJWT.stockexchange.service;

import java.util.List;

import com.nonJWT.stockexchange.DTOs.addCompanyMappingRequestDto;
import com.nonJWT.stockexchange.model.Companystockexchangemap;

public interface CompanyStockExchangeMapService {
	public Companystockexchangemap add(Companystockexchangemap csem);
	public List<Companystockexchangemap> showAll();
	public Companystockexchangemap addCompanyExchangeMap(addCompanyMappingRequestDto reqDto);
}