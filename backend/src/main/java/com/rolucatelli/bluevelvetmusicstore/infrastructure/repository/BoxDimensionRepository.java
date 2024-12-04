package com.rolucatelli.bluevelvetmusicstore.infrastructure.repository;

import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.BoxDimension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxDimensionRepository extends JpaRepository<BoxDimension, Long> {

}
