package com.nonJWT.stockexchange.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.IPODetail;
import com.nonJWT.stockexchange.repository.Companyrepository;
import com.nonJWT.stockexchange.repository.IPODetailRepository;
import com.nonJWT.stockexchange.service.CompanyService;
import com.nonJWT.stockexchange.service.SectorService;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired 
	private Companyrepository companyRepository;
	
	@Autowired
	private SectorService sectorService;
	
	@Autowired
	private IPODetailRepository ipoRepo;
	
	public List<Company> getCompanies() {
		return companyRepository.findAll();
	}

	public Optional<Company> findById(Long id) {
		return companyRepository.findById(id);
	}

	public List<Company> getMatchingCompanies(String pattern) {
		List<Company> companies = companyRepository.findCompaniesByPattern(pattern);
		return companies;
	}

	public Company addCompany(Company company) {
		company.setSector(sectorService.findByName(company.getSectorName()));
		return companyRepository.save(company);
	}

	@Override
	public Company addIpoToCompany(String companyName, IPODetail ipoDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IPODetail> getCompanyIpoDetails(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Company> getCompaniesBySectorId(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public IPODetail getIpoFromCompany(Long compId) {
		return ipoRepo.findByCompanyId(compId);
	}
	
	public void deleteCompany(Long id) {
		companyRepository.deleteById(id);
	}
	

}
