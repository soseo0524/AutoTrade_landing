package com.autotrade.service;

import com.autotrade.dto.AISearchProductDTO;
import com.autotrade.dto.AISearchResponseDTO;
import com.autotrade.dto.PartResponseDTO;
import com.autotrade.entity.asset.Part;
import com.autotrade.entity.enums.PartStatusERD;
import com.autotrade.repository.PartRepository;
import com.autotrade.util.PartMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PartService {

    private final PartRepository partRepository;

    public List<Part> searchSimilarParts(List<Double> queryVector, int limit) {
        log.info("벡터 유사도 검색 시작 - 벡터 차원: {}, limit: {}", queryVector.size(), limit);

        if (queryVector == null || queryVector.isEmpty()) {
            throw new IllegalArgumentException("검색 벡터가 비어있습니다.");
        }

        if (queryVector.size() != 1536) {
            throw new IllegalArgumentException(
                    String.format("벡터 차원이 1536이어야 합니다. 현재 차원: %d", queryVector.size()));
        }

        List<Part> results = partRepository.findSimilarParts(queryVector, limit);
        log.info("벡터 유사도 검색 완료 - 결과 수: {}", results.size());

        return results;
    }

    public List<Part> searchSimilarPartsWithThreshold(
            List<Double> queryVector,
            double similarityThreshold,
            int limit) {
        log.info("벡터 유사도 검색 (임계값: {}) 시작 - 벡터 차원: {}, limit: {}",
                similarityThreshold, queryVector.size(), limit);

        if (similarityThreshold < 0.0 || similarityThreshold > 1.0) {
            throw new IllegalArgumentException(
                    String.format("유사도 임계값은 0.0 ~ 1.0 사이여야 합니다. 현재 값: %f", similarityThreshold));
        }

        List<Part> results = partRepository.findSimilarPartsWithThreshold(
                queryVector, similarityThreshold, limit);
        log.info("벡터 유사도 검색 (임계값) 완료 - 결과 수: {}", results.size());

        return results;
    }

    public List<Part> searchSimilarPartsByStatus(
            List<Double> queryVector,
            PartStatusERD status,
            int limit) {
        log.info("벡터 유사도 검색 (상태: {}) 시작 - 벡터 차원: {}, limit: {}",
                status, queryVector.size(), limit);

        List<Part> results = partRepository.findSimilarPartsByStatus(
                com.autotrade.util.VectorUtils.toVectorString(queryVector),
                status.name(),
                limit);
        log.info("벡터 유사도 검색 (상태) 완료 - 결과 수: {}", results.size());

        return results;
    }

    public Part findById(Long partId) {
        return partRepository.findById(partId)
                .orElseThrow(() -> new IllegalArgumentException("부품을 찾을 수 없습니다. ID: " + partId));
    }

    public Page<Part> findAll(Pageable pageable) {
        return partRepository.findAll(pageable);
    }

    public List<Part> findPartsWithVector() {
        return partRepository.findByDescriptionVectorIsNotNull();
    }

    @Transactional
    public Part save(Part part) {
        log.info("부품 저장 - ID: {}, Description: {}", part.getPartId(), part.getDescription());
        return partRepository.save(part);
    }

    @Transactional
    public void delete(Long partId) {
        log.info("부품 삭제 - ID: {}", partId);
        if (!partRepository.existsById(partId)) {
            throw new IllegalArgumentException("부품을 찾을 수 없습니다. ID: " + partId);
        }
        partRepository.deleteById(partId);
    }

    public AISearchResponseDTO searchByText(String queryText) {
        log.info("텍스트 기반 AI 검색 시작 - 쿼리: {}", queryText);

        if (queryText == null || queryText.trim().isEmpty()) {
            throw new IllegalArgumentException("검색 쿼리가 비어있습니다.");
        }

        List<Double> mockVector = generateMockVector(queryText);

        List<Part> parts;
        String responseText;

        String lowerQuery = queryText.toLowerCase();
        if (lowerQuery.contains("porsche") || queryText.contains("2025")) {
            parts = searchSimilarParts(mockVector, 5);
            responseText = "완벽하게 일치하는 부품을 찾지 못했습니다! 대신 호환 가능한 2023년형과 2022년형 모델을 추천해 드립니다.";
        } else {
            parts = searchSimilarParts(mockVector, 1);
            responseText = "완벽하게 일치하는 부품을 찾았습니다!";
        }

        List<AISearchProductDTO> products = parts.stream()
                .map(part -> PartMapper.toAISearchProductDTO(part, 0.9))
                .collect(java.util.stream.Collectors.toList());

        if (products.isEmpty()) {
            products = generateMockProducts(queryText);
        }

        log.info("텍스트 기반 AI 검색 완료 - 결과 수: {}", products.size());

        return AISearchResponseDTO.builder()
                .type("ai")
                .text(responseText)
                .products(products)
                .build();
    }

    public List<PartResponseDTO> getAllPartsForFrontend() {
        List<Part> parts = partRepository.findAll();
        return PartMapper.toPartResponseDTOList(parts);
    }

    private List<Double> generateMockVector(String queryText) {
        Random random = new Random(queryText.hashCode());
        List<Double> vector = new ArrayList<>();
        for (int i = 0; i < 1536; i++) {
            vector.add(random.nextDouble() * 2 - 1);
        }
        return vector;
    }

    private List<AISearchProductDTO> generateMockProducts(String queryText) {
        String lowerQuery = queryText.toLowerCase();
        List<AISearchProductDTO> products = new ArrayList<>();

        if (lowerQuery.contains("porsche") || queryText.contains("2025")) {
            products.add(AISearchProductDTO.builder()
                    .id(101L)
                    .name("Porsche 911 GT3 RS Wing (2023)")
                    .price("₩4,500,000")
                    .rating(5.0)
                    .compatibility("Compatible (2023 Model)")
                    .image("https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200")
                    .build());
            products.add(AISearchProductDTO.builder()
                    .id(103L)
                    .name("Porsche 911 GT3 RS Wing (2022)")
                    .price("₩4,200,000")
                    .rating(4.8)
                    .compatibility("Compatible (2022 Model)")
                    .image("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=300&h=200")
                    .build());
        } else {
            products.add(AISearchProductDTO.builder()
                    .id(102L)
                    .name("Brembo Carbon Ceramic Brakes")
                    .price("₩12,000,000")
                    .rating(4.9)
                    .compatibility("Exact Match")
                    .image("https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200")
                    .build());
        }

        return products;
    }
}
