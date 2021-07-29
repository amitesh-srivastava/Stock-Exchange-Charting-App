package com.nonJWT.stockexchange.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.Company;

@Repository
public interface Companyrepository  extends JpaRepository<Company,Long> {
   Company findByCompanyName(String Name);
   Optional<Company> findById(Long id);
   List<Company> findBySectorId(Long id);
   
   @Query(value = "select * from Company where company_name like = :pattern%", nativeQuery = true)
   List<Company> findCompaniesByPattern(String pattern);
}
