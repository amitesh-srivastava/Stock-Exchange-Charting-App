package com.nonJWT.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.StockPrice;

@Repository
public interface StockPriceRepository  extends JpaRepository<StockPrice,Long> {

}