package com.nonJWT.stockexchange.DTOs;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AddIpoDetailDto {
	private Double pricePerShare;
	private Long totalNumberOfShares;
	private LocalDateTime openDateTime;
	private String companyName;
	private List<String> stockExchangeNames = new ArrayList<>();
	
	public Double getPricePerShare() {
		return pricePerShare;
	}
	public void setPricePerShare(Double pricePerShare) {
		this.pricePerShare = pricePerShare;
	}
	public Long getTotalNumberOfShares() {
		return totalNumberOfShares;
	}
	public void setTotalNumberOfShares(Long totalNumberOfShares) {
		this.totalNumberOfShares = totalNumberOfShares;
	}
	public LocalDateTime getOpenDateTime() {
		return openDateTime;
	}
	public void setOpenDateTime(LocalDateTime openDateTime) {
		this.openDateTime = openDateTime;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public List<String> getStockExchangeNames() {
		return stockExchangeNames;
	}
	public void setStockExchangeNames(List<String> stockExchangeNames) {
		this.stockExchangeNames = stockExchangeNames;
	}
}
