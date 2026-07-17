import type { CheckoutRequest, CheckoutResponse, Restaurant } from '../types'

const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'
const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout'

export async function fetchRestaurants(): Promise<Restaurant[]> {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Falha ao carregar restaurantes')
    }

    return response.json()
}

export async function fetchRestaurantById(id: number): Promise<Restaurant | undefined> {
    const restaurants = await fetchRestaurants()
    return restaurants.find((restaurant) => restaurant.id === id)
}

export async function checkoutOrder(payload: CheckoutRequest): Promise<CheckoutResponse> {
    const response = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const message = typeof data === 'object' && data !== null && 'message' in data ? String((data as any).message) : 'Erro no checkout'
        throw new Error(message)
    }

    return data
}
