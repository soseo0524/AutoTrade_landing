package com.autotrade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AISearchResponseDTO {
    private String type;  // "ai"
    private String text;   // 응답 메시지
    private List<AISearchProductDTO> products;
}

