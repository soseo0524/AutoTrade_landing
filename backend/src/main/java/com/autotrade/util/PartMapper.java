package com.autotrade.util;

import com.autotrade.dto.AISearchProductDTO;
import com.autotrade.dto.PartResponseDTO;
import com.autotrade.entity.asset.MediaAsset;
import com.autotrade.entity.asset.Part;
import com.autotrade.entity.enums.PartStatusERD;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class PartMapper {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final String DEFAULT_IMAGE = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200";

    public static PartResponseDTO toPartResponseDTO(Part part) {
        return PartResponseDTO.builder()
                .id(part.getPartId())
                .name(part.getDescription())
                .date(part.getCreatedAt() != null ? 
                      part.getCreatedAt().format(DATE_FORMATTER) : 
                      java.time.LocalDateTime.now().format(DATE_FORMATTER))
                .price(formatPrice(null))
                .image(getImageUrl(part))
                .status(mapStatusToFrontend(part.getStatus()))
                .description(part.getDescription())
                .build();
    }

    public static AISearchProductDTO toAISearchProductDTO(Part part, Double similarity) {
        return AISearchProductDTO.builder()
                .id(part.getPartId())
                .name(part.getDescription())
                .price(formatPrice(null))
                .rating(calculateRating(similarity))
                .compatibility(determineCompatibility(similarity))
                .image(getImageUrl(part))
                .build();
    }

    public static List<PartResponseDTO> toPartResponseDTOList(List<Part> parts) {
        return parts.stream()
                .map(PartMapper::toPartResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<AISearchProductDTO> toAISearchProductDTOList(List<Part> parts) {
        return parts.stream()
                .map(part -> toAISearchProductDTO(part, null))
                .collect(Collectors.toList());
    }

    private static String formatPrice(BigDecimal price) {
        if (price == null) {
            return "₩0";
        }
        long priceLong = price.longValue();
        return String.format("₩%,d", priceLong);
    }

    private static String mapStatusToFrontend(PartStatusERD status) {
        if (status == null) {
            return "New";
        }
        
        switch (status) {
            case Listed:
            case QR_Generated:
            case In_Warehouse:
                return "New";
            case Sold:
            case Returned:
                return "Used";
            case Disposed:
                return "Refurbished";
            case Awaiting_Receipt:
            case Inspection:
            default:
                return "New";
        }
    }

    private static String getImageUrl(Part part) {
        return DEFAULT_IMAGE;
    }

    private static Double calculateRating(Double similarity) {
        if (similarity == null) {
            return 4.5;
        }
        return 4.0 + (similarity * 1.0);
    }

    private static String determineCompatibility(Double similarity) {
        if (similarity == null) {
            return "Compatible";
        }
        
        if (similarity >= 0.9) {
            return "Exact Match";
        } else if (similarity >= 0.7) {
            return "Compatible";
        } else if (similarity >= 0.5) {
            return "Compatible (Similar)";
        } else {
            return "May be compatible";
        }
    }
}

