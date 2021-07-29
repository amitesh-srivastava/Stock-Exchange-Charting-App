package com.nonJWT.stockexchange.DTOs;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

public class StockPriceAddDto {
	private long id;
	private String exchangename;
	private String companycode;
	private Date datee;
	private Time timee;
	private float shareprice;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getExchangename() {
		return exchangename;
	}
	public void setExchangename(String exchangename) {
		this.exchangename = exchangename;
	}
	public String getCompanycode() {
		return companycode;
	}
	public void setCompanycode(String companycode) {
		this.companycode = companycode;
	}

	public Date getDatee() {
		return datee;
	}
	public void setDatee(Date datee) {
		this.datee = datee;
	}
	public Time getTimee() {
		return timee;
	}
	public void setTimee(Time timee) {
		this.timee = timee;
	}
	public float getShareprice() {
		return shareprice;
	}
	public void setShareprice(float shareprice) {
		this.shareprice = shareprice;
	}
}
