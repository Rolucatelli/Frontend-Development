package com.rolucatelli.bluevelvetmusicstore.infrastructure.repository;

import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
