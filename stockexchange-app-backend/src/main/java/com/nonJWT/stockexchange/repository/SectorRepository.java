package com.nonJWT.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.Sector;

@Repository
public interface SectorRepository  extends JpaRepository<Sector,Long> {
	Sector findBySectorName(String name);
	
}