package com.nonJWT.stockexchange.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.DTOs.AddIpoDetailDto;
import com.nonJWT.stockexchange.model.IPODetail;
import com.nonJWT.stockexchange.model.StockExchange;
import com.nonJWT.stockexchange.repository.Companyrepository;
import com.nonJWT.stockexchange.repository.IPODetailRepository;
import com.nonJWT.stockexchange.repository.StockExchangeRepository;
import com.nonJWT.stockexchange.service.IPODetailService;

@Service
public class IPODetailServiceImpl implements IPODetailService{

	@Autowired
	private IPODetailRepository ipoRepo;
	
	@Autowired
	private Companyrepository companyRepo;
	
	@Autowired
	private StockExchangeRepository stockRepo;
	
	public IPODetail addIPO(IPODetail ipoDetail) {
		return ipoRepo.save(ipoDetail);
	}

	public List<IPODetail> viewAllIpo() {
		return ipoRepo.findAll();
	}
	
	public IPODetail addIPOThroughDto(AddIpoDetailDto ipoDetailDto) {
		IPODetail ipoDetail = new IPODetail();
		ipoDetail.setCompany(companyRepo.findByCompanyName(ipoDetailDto.getCompanyName()));
		ipoDetail.setOpenDateTime(ipoDetailDto.getOpenDateTime());
		ipoDetail.setPricePerShare(ipoDetailDto.getPricePerShare());
		ipoDetail.setTotalNumberOfShares(ipoDetailDto.getTotalNumberOfShares());
		List<StockExchange> stckList = new ArrayList<>();
		for(String item : ipoDetailDto.getStockExchangeNames()) {
			stckList.add(stockRepo.findByName(item));
		}
		ipoDetail.setStockExchanges(stckList);
		return addIPO(ipoDetail);
		
	}

}
