package com.nonJWT.stockexchange.service;

import java.util.List;
import java.util.Optional;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.IPODetail;

public interface CompanyService 
{
	public List<Company> getCompanies();
	public Optional<Company> findById(Long id);
	public List<Company> getMatchingCompanies(String pattern);
	public Company addCompany(Company company);;
	public Company addIpoToCompany(String companyName, IPODetail ipoDto);
	public List<IPODetail> getCompanyIpoDetails(String id);
	public List<Company> getCompaniesBySectorId(Long id);
	public IPODetail getIpoFromCompany(Long compID);
	public void deleteCompany(Long id);
}