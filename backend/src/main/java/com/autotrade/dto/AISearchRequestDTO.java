package com.autotrade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AISearchRequestDTO {
    private String query;  // 검색 텍스트
}

