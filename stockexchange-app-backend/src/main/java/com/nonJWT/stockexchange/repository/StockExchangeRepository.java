package com.nonJWT.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.StockExchange;

@Repository
public interface StockExchangeRepository  extends JpaRepository<StockExchange,Long> {
	StockExchange findByName(String Name);

}