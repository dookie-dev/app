import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // 1. Create Base Response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 2. Prevent crash if Env is missing in Vercel
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        return response
    }

    try {
        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        request.cookies.set({ name, value, ...options })
                        response = NextResponse.next({
                            request: { headers: request.headers },
                        })
                        response.cookies.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        request.cookies.set({ name, value: '', ...options })
                        response = NextResponse.next({
                            request: { headers: request.headers },
                        })
                        response.cookies.set({ name, value: '', ...options })
                    },
                },
            }
        )

        // 3. Prevent Unhandled Exception from Network
        const { data: { user } } = await supabase.auth.getUser()

        const pathname = request.nextUrl.pathname

        // Protect Admin Routes
        if (pathname.startsWith('/admin')) {
            if (!user) {
                const url = request.nextUrl.clone()
                url.pathname = '/login'
                return NextResponse.redirect(url)
            }
        }

        // Redirect login if already logged in
        if (pathname.startsWith('/login')) {
            if (user) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin/dashboard'
                return NextResponse.redirect(url)
            }
        }

    } catch (error) {
        console.error("Middleware Error:", error)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Run middleware only on routes that need it to reduce Edge load and crash surface
         */
        '/admin/:path*',
        '/login',
    ],
}
