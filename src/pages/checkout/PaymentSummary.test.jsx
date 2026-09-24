import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;

    beforeEach(() => {
        vi.clearAllMocks();
        loadCart = vi.fn();
        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251,
        };
    });

    function renderComponent(summary) {
        render(
            <MemoryRouter initialEntries={['/checkout']}>
                <Routes>
                    <Route
                        path="/checkout"
                        element={<PaymentSummary paymentSummary={summary} loadCart={loadCart} />}
                    />
                    <Route path="/orders" element={<div>Orders page</div>} />
                </Routes>
            </MemoryRouter>
        );
    }

    it('displays the payment details', () => {
        renderComponent(paymentSummary);

        expect(screen.getByText('Payment Summary')).toBeInTheDocument();
        expect(screen.getByText('Items (3):')).toBeInTheDocument();
        expect(screen.getByText('$42.75')).toBeInTheDocument();
        expect(screen.getByText('$4.99')).toBeInTheDocument();
        expect(screen.getByText('$47.74')).toBeInTheDocument();
        expect(screen.getByText('$4.77')).toBeInTheDocument();
        expect(screen.getByText('$52.51')).toBeInTheDocument();
    });

    it('renders nothing when there is no payment summary', () => {
        renderComponent(undefined);

        expect(screen.queryByText('Payment Summary')).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'Place your order' })
        ).not.toBeInTheDocument();
    });

    it('creates the order, reloads the cart and goes to /orders', async () => {
        const user = userEvent.setup();
        renderComponent(paymentSummary);

        await user.click(screen.getByRole('button', { name: 'Place your order' }));

        expect(await screen.findByText('Orders page')).toBeInTheDocument();
        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
    });
});