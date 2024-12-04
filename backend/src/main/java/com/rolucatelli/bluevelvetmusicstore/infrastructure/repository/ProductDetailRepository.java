package com.rolucatelli.bluevelvetmusicstore.infrastructure.repository;

import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
}
