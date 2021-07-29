package com.nonJWT.stockexchange.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.Companystockexchangemap;

@Repository
public interface Companystockexchangemaprepository extends JpaRepository<Companystockexchangemap, Long> {
	@Query(value = "select * from Company_stockexchangemap where stock_exchange_id = :StockExchangeId", nativeQuery = true)
	List<Companystockexchangemap> getMapsByStockExchangeId(Long StockExchangeId);
	
	Companystockexchangemap findByCompanyCode(String id);
}