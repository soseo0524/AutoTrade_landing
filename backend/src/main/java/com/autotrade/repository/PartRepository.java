package com.autotrade.repository;

import com.autotrade.entity.asset.Part;
import com.autotrade.util.VectorUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {

    @Query(value = """
            SELECT p.*,
                   1 - (p.description_vector <=> CAST(:queryVector AS vector)) AS similarity
            FROM parts p
            WHERE p.description_vector IS NOT NULL
            ORDER BY p.description_vector <=> CAST(:queryVector AS vector) ASC
            LIMIT :limit
            """, nativeQuery = true)
    List<Part> findSimilarParts(@Param("queryVector") String queryVector, @Param("limit") int limit);

    default List<Part> findSimilarParts(List<Double> queryVector, int limit) {
        String vectorString = VectorUtils.toVectorStringWithValidation(queryVector);
        return findSimilarParts(vectorString, limit);
    }

    @Query(value = """
            SELECT p.*,
                   1 - (p.description_vector <=> CAST(:queryVector AS vector)) AS similarity
            FROM parts p
            WHERE p.description_vector IS NOT NULL
              AND 1 - (p.description_vector <=> CAST(:queryVector AS vector)) >= :similarityThreshold
            ORDER BY p.description_vector <=> CAST(:queryVector AS vector) ASC
            LIMIT :limit
            """, nativeQuery = true)
    List<Part> findSimilarPartsWithThreshold(
            @Param("queryVector") String queryVector,
            @Param("similarityThreshold") double similarityThreshold,
            @Param("limit") int limit);

    default List<Part> findSimilarPartsWithThreshold(List<Double> queryVector, double similarityThreshold, int limit) {
        String vectorString = VectorUtils.toVectorStringWithValidation(queryVector);
        return findSimilarPartsWithThreshold(vectorString, similarityThreshold, limit);
    }

    @Query(value = """
            SELECT p.*,
                   1 - (p.description_vector <=> CAST(:queryVector AS vector)) AS similarity
            FROM parts p
            WHERE p.description_vector IS NOT NULL
              AND p.status = CAST(:status AS text)
            ORDER BY p.description_vector <=> CAST(:queryVector AS vector) ASC
            LIMIT :limit
            """, nativeQuery = true)
    List<Part> findSimilarPartsByStatus(
            @Param("queryVector") String queryVector,
            @Param("status") String status,
            @Param("limit") int limit);

    List<Part> findByDescriptionVectorIsNotNull();
}
