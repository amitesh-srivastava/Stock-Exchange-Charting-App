package com.nonJWT.stockexchange.service;

import java.util.List;

import com.nonJWT.stockexchange.DTOs.AddIpoDetailDto;
import com.nonJWT.stockexchange.model.IPODetail;

public interface IPODetailService {
	public IPODetail addIPO(IPODetail ipoDetail);
	public List<IPODetail> viewAllIpo();
	public IPODetail addIPOThroughDto(AddIpoDetailDto ipoDetailDto);
}
