package com.nonJWT.stockexchange.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Sector;
import com.nonJWT.stockexchange.model.StockPrice;
import com.nonJWT.stockexchange.repository.Companyrepository;
import com.nonJWT.stockexchange.repository.SectorRepository;
import com.nonJWT.stockexchange.service.SectorService;
import com.nonJWT.stockexchange.service.StockPriceService;

@Service
public class SectorServiceImpl implements SectorService {
	@Autowired
	private SectorRepository sectorRepository;
	
	@Autowired
	private Companyrepository compRepo;
	
	@Autowired
	private StockPriceService stkPriceServ;
	
	public List<Sector> getAllSectors() {
		return sectorRepository.findAll();
	}
	
	public Sector addSector(Sector sector) {
		return sectorRepository.save(sector);
	}
	
	public Optional<Sector> getSectorByID(Long id) {
		return sectorRepository.findById(id);
	}
	
	public Sector findByName(String sec) {
		return sectorRepository.findBySectorName(sec);
	}

	@Override
	public List<Company> listOfCompaniesInSector(Long id) {
		return compRepo.findBySectorId(id);
	}
	
	public double calculatePriceForSector(Long id,Date from, Date to) {
		List<Company> listComp = listOfCompaniesInSector(id);
		List<StockPrice> stkList = new ArrayList<>();
		double average = 0;
		double total = 0;
		int counter = 0;
		for(Company com : listComp) {
			stkList = stkPriceServ.StockPricesPeriodicity(com.getId(),from,to);
			for(StockPrice stk: stkList) {
				total = total + stk.getShareprice();
				counter +=1;
			}
		}
		return total/counter;
	}

	public void deleteSector(Long id) {
		sectorRepository.deleteById(id);
		
	}
	
}
