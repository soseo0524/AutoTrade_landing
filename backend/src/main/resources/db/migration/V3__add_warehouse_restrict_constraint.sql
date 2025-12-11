-- Add foreign key constraint with RESTRICT on delete for Warehouse
-- This prevents deletion of a warehouse if parts are still associated with it

-- Note: The foreign key constraint is already defined in the Part entity
-- This script ensures the constraint exists at the database level
-- If the constraint doesn't exist, it will be created automatically by Hibernate
-- This is a placeholder for explicit constraint management if needed

-- Example: Explicit constraint (if needed)
-- ALTER TABLE part 
-- ADD CONSTRAINT fk_part_warehouse 
-- FOREIGN KEY (warehouse_id) 
-- REFERENCES warehouse(warehouse_id) 
-- ON DELETE RESTRICT;

