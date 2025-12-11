package com.autotrade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartResponseDTO {
    private Long id;
    private String name;
    private String date;  // "YYYY-MM-DD" 형식
    private String price;  // "₩850,000" 형식
    private String image;  // 이미지 URL
    private String status; // "New", "Used", "Refurbished" 등
    private String description;
}

