-- Create HNSW index on parts.description_vector for efficient similarity search
-- HNSW (Hierarchical Navigable Small World) is optimized for high-dimensional vectors

-- Drop index if exists
DROP INDEX IF EXISTS idx_part_description_vector_hnsw;

-- Create HNSW index with default parameters
-- m: number of connections (default 16)
-- ef_construction: size of the candidate list during construction (default 64)
-- vector_cosine_ops: Cosine similarity operator class for vector operations
CREATE INDEX idx_part_description_vector_hnsw 
ON parts 
USING hnsw (description_vector vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Note: For production, you may want to tune these parameters based on your data size and query patterns
-- Higher m and ef_construction values improve recall but increase build time and index size
-- 
-- Performance tips:
-- - m: 16-64 (higher = better recall, slower build)
-- - ef_construction: 64-200 (higher = better recall, slower build)
-- - For large datasets (>1M vectors), consider increasing these values

