export interface Dish {
    foto: string
    preco: number
    id: number
    nome: string
    descricao: string
    porcao: string
}

export interface Restaurant {
    id: number
    titulo: string
    destacado: boolean
    tipo: string
    avaliacao: number
    descricao: string
    capa: string
    cardapio: Dish[]
}

export interface CheckoutProduct {
    id: number
    price: number
}

export interface CheckoutRequest {
    products: CheckoutProduct[]
    delivery: {
        receiver: string
        address: {
            description: string
            city: string
            zipCode: string
            number: number
            complement?: string
        }
    }
    payment: {
        card: {
            name: string
            number: string
            code: number
            expires: {
                month: number
                year: number
            }
        }
    }
}

export interface CheckoutResponse {
    orderId?: string
    [key: string]: unknown
}
