export interface CartItem extends Cookie {
    quantity: number;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    total_spent: number;
    created_at: string;
}

export interface Address {
    id: string;
    customer_id: string;
    address: string;
    created_at: string;
}

export interface Order {
    id: string;
    order_code: string;
    customer_id: string;
    address_id: string;
    total_amount: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    created_at: string;
    items?: OrderItem[];
    customer?: Customer;
    address?: Address;
}

export interface OrderItem {
    id: string;
    order_id: string;
    menu_id: string;
    menu_name_snapshot: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
}

export interface CookieImage {
    id: string;
    cookie_id: string;
    image_url: string;
    is_main: boolean;
    alt?: string;
}

export interface Review {
    id: string;
    cookie_id: string;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface Cookie {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    images: CookieImage[];
    category: string;
    rating: number;
    stock: number;
    created_at: string;
    is_best_seller?: boolean;
    tags?: string[];
}

export interface PaginationData {
    page: number;
    total_pages: number;
    total_items: number;
    limit: number;
}
