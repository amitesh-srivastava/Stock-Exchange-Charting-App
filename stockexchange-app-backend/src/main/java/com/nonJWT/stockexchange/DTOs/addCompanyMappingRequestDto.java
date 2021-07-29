package com.nonJWT.stockexchange.DTOs;

import com.nonJWT.stockexchange.model.Companystockexchangemap;

public class addCompanyMappingRequestDto {
	private String companyName;
	private String stockName;
	private String companyCode;
	
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getStockName() {
		return stockName;
	}
	public void setStockName(String stockName) {
		this.stockName = stockName;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	} 
	
}
