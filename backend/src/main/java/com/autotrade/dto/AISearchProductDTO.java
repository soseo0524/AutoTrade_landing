package com.autotrade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AISearchProductDTO {
    private Long id;
    private String name;
    private String price;  // "₩12,000,000" 형식
    private Double rating;
    private String compatibility;
    private String image;
}

