package com.autotrade.controller;

import com.autotrade.dto.AISearchRequestDTO;
import com.autotrade.dto.AISearchResponseDTO;
import com.autotrade.dto.PartResponseDTO;
import com.autotrade.entity.asset.Part;
import com.autotrade.entity.enums.PartStatusERD;
import com.autotrade.service.PartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/parts")
@RequiredArgsConstructor
public class PartController {

    private final PartService partService;

    @PostMapping("/search/similar")
    public ResponseEntity<Map<String, Object>> searchSimilarParts(
            @RequestBody Map<String, Object> request) {

        @SuppressWarnings("unchecked")
        List<Double> queryVector = (List<Double>) request.get("vector");
        Integer limit = request.get("limit") != null ? (Integer) request.get("limit") : 10;

        if (queryVector == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "벡터가 필요합니다.", "field", "vector"));
        }

        try {
            List<Part> parts = partService.searchSimilarParts(queryVector, limit);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "count", parts.size(),
                    "parts", parts));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/search/similar-threshold")
    public ResponseEntity<Map<String, Object>> searchSimilarPartsWithThreshold(
            @RequestBody Map<String, Object> request) {

        @SuppressWarnings("unchecked")
        List<Double> queryVector = (List<Double>) request.get("vector");
        Double similarityThreshold = request.get("similarityThreshold") != null
                ? ((Number) request.get("similarityThreshold")).doubleValue()
                : 0.7;
        Integer limit = request.get("limit") != null ? (Integer) request.get("limit") : 10;

        if (queryVector == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "벡터가 필요합니다.", "field", "vector"));
        }

        try {
            List<Part> parts = partService.searchSimilarPartsWithThreshold(
                    queryVector, similarityThreshold, limit);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "count", parts.size(),
                    "similarityThreshold", similarityThreshold,
                    "parts", parts));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/search/similar-by-status")
    public ResponseEntity<Map<String, Object>> searchSimilarPartsByStatus(
            @RequestBody Map<String, Object> request) {

        @SuppressWarnings("unchecked")
        List<Double> queryVector = (List<Double>) request.get("vector");
        String statusStr = (String) request.get("status");
        Integer limit = request.get("limit") != null ? (Integer) request.get("limit") : 10;

        if (queryVector == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "벡터가 필요합니다.", "field", "vector"));
        }

        if (statusStr == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "상태가 필요합니다.", "field", "status"));
        }

        try {
            PartStatusERD status = PartStatusERD.valueOf(statusStr);
            List<Part> parts = partService.searchSimilarPartsByStatus(queryVector, status, limit);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "count", parts.size(),
                    "status", status.name(),
                    "parts", parts));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "잘못된 상태 값입니다: " + statusStr));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPart(@PathVariable Long id) {
        try {
            Part part = partService.findById(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "part", part));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PartResponseDTO>> getAllParts() {
        List<PartResponseDTO> parts = partService.getAllPartsForFrontend();
        return ResponseEntity.ok(parts);
    }

    @GetMapping("/paged")
    public ResponseEntity<Map<String, Object>> getAllPartsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Part> parts = partService.findAll(pageable);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "page", parts.getNumber(),
                "size", parts.getSize(),
                "totalElements", parts.getTotalElements(),
                "totalPages", parts.getTotalPages(),
                "parts", parts.getContent()));
    }

    @PostMapping("/ai-search")
    public ResponseEntity<AISearchResponseDTO> aiSearch(@RequestBody AISearchRequestDTO request) {
        try {
            AISearchResponseDTO response = partService.searchByText(request.getQuery());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            AISearchResponseDTO errorResponse = AISearchResponseDTO.builder()
                    .type("ai")
                    .text("검색 중 오류가 발생했습니다.")
                    .products(java.util.Collections.emptyList())
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/with-vector")
    public ResponseEntity<Map<String, Object>> getPartsWithVector() {
        List<Part> parts = partService.findPartsWithVector();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "count", parts.size(),
                "parts", parts));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPart(@RequestBody Part part) {
        try {
            Part savedPart = partService.save(part);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "부품이 생성되었습니다.",
                    "part", savedPart));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePart(@PathVariable Long id) {
        try {
            partService.delete(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "부품이 삭제되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
