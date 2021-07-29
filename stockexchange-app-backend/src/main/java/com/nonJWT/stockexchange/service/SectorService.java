package com.nonJWT.stockexchange.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Sector;


public interface SectorService {
	public List<Sector> getAllSectors();
	public Sector addSector(Sector sector);
	public abstract Optional<Sector> getSectorByID(Long id);
	public Sector findByName(String sec);
	public List<Company> listOfCompaniesInSector(Long id);
	public double calculatePriceForSector(Long id,Date from, Date to);
	public void deleteSector(Long id);
}
