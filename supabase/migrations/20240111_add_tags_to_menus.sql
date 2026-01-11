-- Add tags column to menus table
ALTER TABLE
    public.menus
ADD
    COLUMN IF NOT EXISTS tags text [] DEFAULT '{}';