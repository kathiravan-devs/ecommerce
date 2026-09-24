import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage component', () => {
    let loadCart;
    let products;

    beforeEach(() => {
        loadCart = vi.fn();
        products = [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: { stars: 4.5, count: 87 },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"],
        }, {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: { stars: 4, count: 127 },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
        }];
    });

    it('displays the products correctly', async () => {
        render(
            <MemoryRouter>
                <HomePage products={products} cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Intermediate Size Basketball')
        ).toBeInTheDocument();
        expect(screen.getByText('$10.90')).toBeInTheDocument();
        expect(screen.getByText('$20.95')).toBeInTheDocument();
        expect(screen.getByText('127')).toBeInTheDocument();

        const productContainer = screen.getAllByTestId('product-container');
        expect(productContainer.length).toBe(2);
        expect(
            within(productContainer[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();


        const productImages = screen.getAllByTestId('product-image');
        expect(productImages[0]).toHaveAttribute(
            'src',
            'images/products/athletic-cotton-socks-6-pairs.jpg'
        );

    });
});