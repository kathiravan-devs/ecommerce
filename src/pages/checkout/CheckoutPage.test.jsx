import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import { CheckoutPage } from './CheckoutPage';

vi.mock('axios');

describe('CheckoutPage component', () => {
    let cart;
    let loadCart;
    let deliveryOptions;
    let paymentSummary;

    beforeEach(() => {
        vi.clearAllMocks();
        loadCart = vi.fn();

        const baseTime = new Date(2026, 8, 24, 12).getTime();

        deliveryOptions = [
            { id: '1', deliveryDays: 7, priceCents: 0, estimatedDeliveryTimeMs: baseTime + 7 * 86400000 },
            { id: '2', deliveryDays: 3, priceCents: 499, estimatedDeliveryTimeMs: baseTime + 3 * 86400000 },
            { id: '3', deliveryDays: 1, priceCents: 999, estimatedDeliveryTimeMs: baseTime + 1 * 86400000 },
        ];

        paymentSummary = {
            totalItems: 2,
            productCostCents: 2180,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 2679,
            taxCents: 268,
            totalCostCents: 2947,
        };

        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '2',
            product: {
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
                name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
                priceCents: 1090,
            },
        }];

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/delivery-options?expand=estimatedDeliveryTime') {
                return { data: deliveryOptions };
            }
            if (urlPath === '/api/payment-summary') {
                return { data: paymentSummary };
            }
        });
    });

    function renderPage(cartItems) {
        return render(
            <MemoryRouter>
                <CheckoutPage cart={cartItems} loadCart={loadCart} />
            </MemoryRouter>
        );
    }

    it('displays the order and the payment summary after loading', async () => {
        renderPage(cart);

        expect(screen.getByText('Review your order')).toBeInTheDocument();

        expect(await screen.findByText('Payment Summary')).toBeInTheDocument();
        expect(screen.getByText('Items (2):')).toBeInTheDocument();
        expect(screen.getByText('$21.80')).toBeInTheDocument();
        expect(screen.getByText('$29.47')).toBeInTheDocument();

        expect(
            await screen.findByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();
        expect(await screen.findAllByRole('radio')).toHaveLength(3);
    });

    it('fetches delivery options and payment summary on mount', async () => {
        renderPage(cart);
        await screen.findByText('Payment Summary');

        expect(axios.get).toHaveBeenCalledWith(
            '/api/delivery-options?expand=estimatedDeliveryTime'
        );
        expect(axios.get).toHaveBeenCalledWith('/api/payment-summary');
    });

    it('fetches the payment summary again when the cart changes', async () => {
        const { rerender } = renderPage(cart);
        await screen.findByText('Payment Summary');

        rerender(
            <MemoryRouter>
                <CheckoutPage cart={[...cart]} loadCart={loadCart} />
            </MemoryRouter>
        );

        await waitFor(() => {
            const paymentCalls = axios.get.mock.calls.filter(
                ([url]) => url === '/api/payment-summary'
            );
            expect(paymentCalls).toHaveLength(2);
        });
    });
});