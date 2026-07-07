import type { Restaurant } from '../../types'

export const restaurantsMock: Restaurant[] = [
    {
        id: 1,
        titulo: 'Hioki Sushi',
        avaliacao: 4.9,
        tipo: 'Japonesa',
        destacado: true,
        capa: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida e qualidade garantida.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1542975972-2d50b1d7778f?auto=format&fit=crop&w=800&q=80',
                nome: 'Sushi Mix Premium',
                descricao: 'Selecionados nigiris e rolls especiais com salmão, atum e camarão.',
                preco: 72.9,
                porcao: '14 unidades'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1546554137-f86b9593a5ad?auto=format&fit=crop&w=800&q=80',
                nome: 'Temaki salmão',
                descricao: 'Temaki crocante com salmão fresco, cream cheese e cebolinha.',
                preco: 25.5,
                porcao: '1 unidade'
            }
        ]
    },
    {
        id: 2,
        titulo: 'La Dolce Vita',
        avaliacao: 4.8,
        tipo: 'Italiana',
        destacado: false,
        capa: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Massas artesanais, molhos caseiros e sobremesas típicas da Itália. Viva a experiência da cozinha italiana em casa.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
                nome: 'Lasanha de quatro queijos',
                descricao: 'Lasanha cremosa com quatro queijos e molho branco especial.',
                preco: 59.9,
                porcao: '1 porção'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1512058564366-c9e5ed75e593?auto=format&fit=crop&w=800&q=80',
                nome: 'Risoto de funghi',
                descricao: 'Risoto cremoso com cogumelos selecionados e azeite trufado.',
                preco: 63.0,
                porcao: '1 porção'
            }
        ]
    },
    {
        id: 3,
        titulo: 'Casa do Burger',
        avaliacao: 4.7,
        tipo: 'Hamburgueria',
        destacado: true,
        capa: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Hambúrgueres artesanais, batatas crocantes e molhos especiais para uma refeição completa.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
                nome: 'Cheeseburger Clássico',
                descricao: 'Hambúrguer com queijo cheddar, alface, tomate e molho secreto.',
                preco: 48.5,
                porcao: '1 unidade'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
                nome: 'Batata rústica',
                descricao: 'Batatas rústicas crocantes com tempero especial.',
                preco: 19.9,
                porcao: '1 porção'
            }
        ]
    },
    {
        id: 4,
        titulo: 'Green Bowl',
        avaliacao: 4.6,
        tipo: 'Saudável',
        destacado: false,
        capa: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Refeições leves e nutritivas com bowls cheios de sabor e ingredientes frescos.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
                nome: 'Bowl Vegetariano',
                descricao: 'Mix de vegetais, grãos e molho oriental.',
                preco: 37.9,
                porcao: '1 porção'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                nome: 'Smoothie Tropical',
                descricao: 'Batida de frutas frescas com leite vegetal.',
                preco: 22.5,
                porcao: '500ml'
            }
        ]
    },
    {
        id: 5,
        titulo: 'Taco Fiesta',
        avaliacao: 4.5,
        tipo: 'Mexicana',
        destacado: false,
        capa: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Tacos, nachos e pratos mexicanos preparados com ingredientes autênticos.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                nome: 'Tacos de carne',
                descricao: 'Tacos recheados com carne suculenta, guacamole e sour cream.',
                preco: 34.9,
                porcao: '3 unidades'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1532634896-26909d0d8be8?auto=format&fit=crop&w=800&q=80',
                nome: 'Nachos Supreme',
                descricao: 'Nachos crocantes com queijo, jalapeño e pico de gallo.',
                preco: 29.5,
                porcao: '1 porção'
            }
        ]
    },
    {
        id: 6,
        titulo: 'Doce Sabor',
        avaliacao: 4.4,
        tipo: 'Sobremesas',
        destacado: false,
        capa: 'https://images.unsplash.com/photo-1505253217299-1a2f3d2ce9a2?auto=format&fit=crop&w=1200&q=80',
        descricao:
            'Doces e sobremesas para adoçar o seu dia com receitas tradicionais e modernas.',
        cardapio: [
            {
                id: 1,
                foto: 'https://images.unsplash.com/photo-1505253217299-1a2f3d2ce9a2?auto=format&fit=crop&w=800&q=80',
                nome: 'Brownie com sorvete',
                descricao: 'Brownie quentinho servido com sorvete de baunilha.',
                preco: 28.5,
                porcao: '1 porção'
            },
            {
                id: 2,
                foto: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80',
                nome: 'Cheesecake de frutas vermelhas',
                descricao: 'Cheesecake cremoso com cobertura de frutas vermelhas.',
                preco: 24.9,
                porcao: '1 fatia'
            }
        ]
    }
]
