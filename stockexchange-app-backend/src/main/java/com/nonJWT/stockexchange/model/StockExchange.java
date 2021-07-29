package com.nonJWT.stockexchange.model;



import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "StockExchange")
public class StockExchange {
	

	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private String address;
	
	private String description;
	private String remarks;
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@OneToMany(targetEntity = Companystockexchangemap.class)
	private List<Companystockexchangemap> compstockmap;
	public StockExchange() {
		super();
		
		// TODO Auto-generated constructor stub
	}
	public StockExchange(String name) {
		super();
		this.name =name;
		// TODO Auto-generated constructor stub
	}
	
	@JsonIgnore
	public List<Companystockexchangemap> getCompstockmap() {
		return compstockmap;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setCompstockmap(List<Companystockexchangemap> compstockmap) {
		this.compstockmap = compstockmap;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
