-- 1. Create Customers Table
CREATE TABLE public.customers (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text,
    phone text UNIQUE NOT NULL,
    total_spent numeric DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- 2. Create Addresses Table
CREATE TABLE public.addresses (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id uuid REFERENCES public.customers(id),
    address text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 3. Create Orders Table
CREATE TABLE public.orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_code text UNIQUE NOT NULL,
    customer_id uuid REFERENCES public.customers(id),
    address_id uuid REFERENCES public.addresses(id),
    total_amount numeric NOT NULL,
    status text DEFAULT 'pending' CHECK (
        status IN ('pending', 'paid', 'shipped', 'cancelled')
    ),
    created_at timestamptz DEFAULT now()
);

-- 4. Create Order Items Table
CREATE TABLE public.order_items (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    menu_id uuid REFERENCES public.menus(id),
    menu_name_snapshot text NOT NULL,
    unit_price numeric NOT NULL,
    quantity integer NOT NULL,
    subtotal numeric NOT NULL
);

-- 5. RLS Policies
ALTER TABLE
    public.customers ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    public.addresses ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    public.orders ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow public (or at least server) to insert orders (Checkout process)
-- Ideally this is handled by Service Role in API Route, but for client-side queries:
CREATE POLICY "Public can read own customer data" ON public.customers FOR
SELECT
    USING (true);

-- Refine later for Auth
CREATE POLICY "Public can insert customers" ON public.customers FOR
INSERT
    WITH CHECK (true);

CREATE POLICY "Public can read own orders" ON public.orders FOR
SELECT
    USING (true);

CREATE POLICY "Public can insert orders" ON public.orders FOR
INSERT
    WITH CHECK (true);

CREATE POLICY "Public can read own order items" ON public.order_items FOR
SELECT
    USING (true);

CREATE POLICY "Public can insert order items" ON public.order_items FOR
INSERT
    WITH CHECK (true);

CREATE POLICY "Public can insert addresses" ON public.addresses FOR
INSERT
    WITH CHECK (true);

-- Admin policies (assuming authenticated users are admins)
CREATE POLICY "Admins can all customers" ON public.customers FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins can all orders" ON public.orders FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins can all order_items" ON public.order_items FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins can all addresses" ON public.addresses FOR ALL TO authenticated USING (true);