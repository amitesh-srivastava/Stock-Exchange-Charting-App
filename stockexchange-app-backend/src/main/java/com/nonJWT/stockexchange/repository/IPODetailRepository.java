package com.nonJWT.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nonJWT.stockexchange.model.IPODetail;


@Repository
public interface IPODetailRepository  extends JpaRepository<IPODetail,Long> {
	IPODetail findByCompanyId(Long id);
}