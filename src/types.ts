export interface Restaurant {
    id: number
    title: string
    rating: number
    category: string
    description: string
    image: string
    featured?: boolean
}

export interface Dish {
    id?: number
    title?: string
    description?: string
    image?: string
    price?: number | string
}
