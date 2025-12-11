-- Create sequence for log_id
CREATE SEQUENCE IF NOT EXISTS system_error_log_seq;

-- Create parent table (partitioned table)
CREATE TABLE IF NOT EXISTS system_error_log (
    log_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    error_level VARCHAR(50) NOT NULL,
    error_code VARCHAR(100),
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    service_name VARCHAR(100),
    request_id VARCHAR(100),
    user_id BIGINT,
    metadata JSONB,
    PRIMARY KEY (log_id, created_at)
) PARTITION BY RANGE (created_at);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_system_error_log_created_at ON system_error_log(created_at);
CREATE INDEX IF NOT EXISTS idx_system_error_log_error_level ON system_error_log(error_level);
CREATE INDEX IF NOT EXISTS idx_system_error_log_service_name ON system_error_log(service_name);

-- Example: Create monthly partitions (adjust dates as needed)
-- Note: In production, you would create partitions dynamically or use a scheduled job

-- Partition for current month (example: December 2024)
CREATE TABLE IF NOT EXISTS system_error_log_2024_12 
    PARTITION OF system_error_log
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- Partition for next month (example: January 2025)
CREATE TABLE IF NOT EXISTS system_error_log_2025_01 
    PARTITION OF system_error_log
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Function to create monthly partitions automatically (optional)
CREATE OR REPLACE FUNCTION create_monthly_partition(table_name TEXT, start_date DATE)
RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    end_date DATE;
BEGIN
    partition_name := table_name || '_' || TO_CHAR(start_date, 'YYYY_MM');
    end_date := start_date + INTERVAL '1 month';
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
        partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

