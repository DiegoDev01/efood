import type { Restaurant } from '../types'

const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'

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
