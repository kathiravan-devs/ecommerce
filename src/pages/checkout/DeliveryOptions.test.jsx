import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import { DeliveryOptions } from './DeliveryOptions';

vi.mock('axios');

describe('DeliveryOptions component', () => {
    let cartItem;
    let deliveryOptions;
    let loadCart;

    beforeEach(() => {
        vi.clearAllMocks();
        loadCart = vi.fn();

        // Thursday, Sept 24 2026 at noon local time, so the formatted
        // dates don't shift with the machine's timezone
        const baseTime = new Date(2026, 8, 24, 12).getTime();

        deliveryOptions = [
            { id: '1', deliveryDays: 7, priceCents: 0, estimatedDeliveryTimesMS: baseTime },
            { id: '2', deliveryDays: 3, priceCents: 499, estimatedDeliveryTimesMS: baseTime },
            { id: '3', deliveryDays: 1, priceCents: 999, estimatedDeliveryTimesMS: baseTime },
        ];

        cartItem = {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '2',
        };
    });

    it('displays every option with its date and price', () => {
        render(
            <DeliveryOptions
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
            />
        );

        expect(screen.getByText('Choose a delivery option:')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(3);

        expect(screen.getByText('Thursday, October 1')).toBeInTheDocument();
        expect(screen.getByText('Sunday, September 27')).toBeInTheDocument();
        expect(screen.getByText('Friday, September 25')).toBeInTheDocument();

        expect(screen.getByText('FREE Shipping')).toBeInTheDocument();
        expect(screen.getByText('$4.99 - Shipping')).toBeInTheDocument();
        expect(screen.getByText('$9.99 - Shipping')).toBeInTheDocument();
    });

    it('checks only the option saved on the cart item', () => {
        render(
            <DeliveryOptions
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
            />
        );

        const radios = screen.getAllByRole('radio');
        expect(radios[0]).not.toBeChecked();
        expect(radios[1]).toBeChecked();
        expect(radios[2]).not.toBeChecked();
    });

    it('updates the delivery option when one is clicked', async () => {
        const user = userEvent.setup();
        render(
            <DeliveryOptions
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCart={loadCart}
            />
        );

        await user.click(screen.getAllByRole('radio')[0]);

        expect(axios.put).toHaveBeenCalledWith(
            '/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            {
                deliveryOptionId: '1'
            }
        );
        expect(loadCart).toHaveBeenCalled();
    });
});