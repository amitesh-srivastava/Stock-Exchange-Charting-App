package com.nonJWT.stockexchange.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.nonJWT.stockexchange.DTOs.StockPriceAddDto;
import com.nonJWT.stockexchange.model.StockPrice;

public interface StockPriceService {
	public StockPrice add(StockPrice sp);
	public StockPrice addThroughDto(StockPriceAddDto spDto);
	public List<StockPrice> StockPricesPeriodicity(Long Id, Date from, Date to);
}
