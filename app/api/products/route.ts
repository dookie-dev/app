import { NextRequest, NextResponse } from "next/server";
import { getMenus } from "@/lib/fetch";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const allProducts = await getMenus();
    const total = allProducts.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedProducts = allProducts.slice(start, end);

    return NextResponse.json({
        data: paginatedProducts,
        pagination: {
            current_page: page,
            total_pages: totalPages,
            total_items: total,
            limit: limit
        }
    });
}
