package com.nonJWT.stockexchange.model;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "StockPrice")
public class StockPrice {
	
	@Id
	@GeneratedValue
	private long id;
	private String exchangename;
	private String companycode;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Company company;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yy")
	private Date datee;
	private Time timee;


	public Company getCompany() {
		return company;
	}


	public void setCompany(Company company) {
		this.company = company;
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


	

	public StockPrice( String exchangename, String companycode,  
			Date datee, Time timee, float shareprice) {
		super();
	
		this.exchangename = exchangename;
		this.companycode = companycode;
		this.company = company;
		this.datee = datee;
		this.timee= timee;
		this.shareprice = shareprice;
	}


	public StockPrice() {
		// TODO Auto-generated constructor stub
	}
}


