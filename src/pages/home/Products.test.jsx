import { expect, it, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Products } from './Products';

describe('Product Component', () => {

    it('displays the product details correctly', () => {

        const product = {
            keywords: ["socks", "sports", "apparel"],
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: { stars: 4.5, count: 87 },
            priceCents: 1090,
        };

        const productRef = { current: [] };
        const index = 0;
        const loadCart = vi.fn();
        const showAdded = vi.fn();

        render(
            <Products
                product={product}
                productRef={productRef}
                index={index}
                loadCart={loadCart}
                showAdded={showAdded}
            />
        );

        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByTestId('product-image')).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute('src', `images/ratings/rating-${product.rating.stars * 10}.png`);
        expect(screen.getByText('87')).toBeInTheDocument();
        expect(screen.getByText('$10.90')).toBeInTheDocument();

    });
});