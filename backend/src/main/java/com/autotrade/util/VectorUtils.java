package com.autotrade.util;

import java.util.List;
import java.util.stream.Collectors;

public class VectorUtils {

    public static String toVectorString(List<Double> vector) {
        if (vector == null || vector.isEmpty()) {
            return "[]";
        }

        String values = vector.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));

        return "[" + values + "]";
    }

    public static void validateDimension(List<Double> vector) {
        if (vector != null && vector.size() != 1536) {
            throw new IllegalArgumentException(
                    String.format("Vector dimension must be 1536, but got %d", vector.size()));
        }
    }

    public static String toVectorStringWithValidation(List<Double> vector) {
        validateDimension(vector);
        return toVectorString(vector);
    }
}
