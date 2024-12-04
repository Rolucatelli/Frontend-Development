package com.rolucatelli.bluevelvetmusicstore.domain.converter;

import com.rolucatelli.bluevelvetmusicstore.api.request.ProductDetailRequest;
import com.rolucatelli.bluevelvetmusicstore.api.request.ProductDimensionRequest;
import com.rolucatelli.bluevelvetmusicstore.api.request.ProductRequest;
import com.rolucatelli.bluevelvetmusicstore.api.response.ProductResponse;
import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.BoxDimension;
import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.Product;
import com.rolucatelli.bluevelvetmusicstore.infrastructure.entity.ProductDetail;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProductConverter {

    public static Product convertToProduct(ProductRequest request){
        return Product.builder()
                .name(request.getName())
                .shortDescription(request.getShortDescription())
                .fullDescription(request.getFullDescription())
                .brand(request.getBrand())
                .category(request.getCategory())
                .cost(request.getCost())
                .creationTime(request.getCreationTime())
                .updateTime(request.getUpdateTime())
                .enabled(request.getIsEnabled())
                .inStock(request.getInStock())
                .listPrice(request.getListPrice())
                .discount(request.getDiscount())
                .build();
    }

    public static ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .shortDescription(product.getShortDescription())
                .fullDescription(product.getFullDescription())
                .brand(product.getBrand())
                .category(product.getCategory())
                .cost(product.getCost())
                .creationTime(product.getCreationTime())
                .updateTime(product.getUpdateTime())
                .isEnabled(product.getEnabled())
                .inStock(product.getInStock())
                .listPrice(product.getListPrice())
                .discount(product.getDiscount())
                .dimension(convertBoxDimensionRequest(product))
                .details(convertProductDetailsRequest(product))
                .build();
    }

    private static List<ProductDetailRequest> convertProductDetailsRequest(Product product) {
        return Objects.nonNull(product.getProductDetails()) ?
                product.getProductDetails().stream().map(productDetail -> ProductDetailRequest.builder()
                .name(productDetail.getName())
                .value(productDetail.getValue())
                .build()).toList()
                : new ArrayList<>();
    }

    public static List<ProductDetail> convertProductDetail(ProductRequest product) {
        return Objects.nonNull(product.getDetails()) ? product.getDetails().stream().map(productDetail -> ProductDetail.builder()
                .name(productDetail.getName())
                .value(productDetail.getValue())
                .build()).toList()
                : new ArrayList<>();
    }

    private static ProductDimensionRequest convertBoxDimensionRequest(Product product) {
        return ProductDimensionRequest.builder()
                .height(product.getBoxDimension().getHeight())
                .length(product.getBoxDimension().getLength())
                .width(product.getBoxDimension().getWidth())
                .weight(product.getBoxDimension().getWeight())
                .build();
    }

    public static BoxDimension convertBoxDimension(ProductRequest product) {
        return BoxDimension.builder()
                .height(product.getDimension().getHeight())
                .length(product.getDimension().getLength())
                .width(product.getDimension().getWidth())
                .weight(product.getDimension().getWeight())
                .build();
    }

}
