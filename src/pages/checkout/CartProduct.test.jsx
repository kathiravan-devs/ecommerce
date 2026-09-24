import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import { CartProduct } from './CartProduct';

vi.mock('axios');

describe('CartProduct component', () => {
    let cartItem;
    let loadCart;
    let user;

    beforeEach(() => {
        vi.clearAllMocks();
        user = userEvent.setup();
        loadCart = vi.fn();
        cartItem = {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            product: {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: { stars: 4.5, count: 87 },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }
        };
    });

    it('displays the cart item details correctly', () => {
        render(<CartProduct cartItem={cartItem} loadCart={loadCart} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();
        expect(screen.getByText('$10.90')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toHaveValue(2);
    });

    it('deletes the item and reloads the cart', async () => {
        render(<CartProduct cartItem={cartItem} loadCart={loadCart} />);

        await user.click(screen.getByText('Delete'));

        expect(axios.delete).toHaveBeenCalledWith(
            `/api/cart-items/${cartItem.productId}`
        );
        await waitFor(() => expect(loadCart).toHaveBeenCalled());
    });

    it('enters edit mode when Update is clicked', async () => {
        render(<CartProduct cartItem={cartItem} loadCart={loadCart} />);

        const details = screen
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
            .closest('.cart-item-details');

        expect(details).not.toHaveClass('update-cart-item-details');

        await user.click(screen.getByText('Update'));

        expect(details).toHaveClass('update-cart-item-details');
    });

    it('saves the new quantity and leaves edit mode', async () => {
        render(<CartProduct cartItem={cartItem} loadCart={loadCart} />);

        const details = screen
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
            .closest('.cart-item-details');

        await user.click(screen.getByText('Update'));

        const input = screen.getByRole('spinbutton');
        await user.clear(input);
        await user.type(input, '5');
        await user.click(screen.getByText('Save'));

        expect(axios.put).toHaveBeenCalledWith(
            `/api/cart-items/${cartItem.productId}`,
            { quantity: 5 }
        );
        await waitFor(() => expect(loadCart).toHaveBeenCalled());
        await waitFor(() =>
            expect(details).not.toHaveClass('update-cart-item-details')
        );
    });

    it('rejects an invalid quantity', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(<CartProduct cartItem={cartItem} loadCart={loadCart} />);

        await user.click(screen.getByText('Update'));

        const input = screen.getByRole('spinbutton');
        await user.clear(input);
        await user.type(input, '0');
        await user.click(screen.getByText('Save'));

        expect(alertSpy).toHaveBeenCalled();
        expect(axios.put).not.toHaveBeenCalled();
        expect(loadCart).not.toHaveBeenCalled();
    });
});