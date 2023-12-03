import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import {Register } from '../pages/';

jest.mock('axios');

describe('Register Component', () => {
    it('submits registration data successfully', async () => {
        axios.post.mockResolvedValue({ data: {} });

        const { getByLabelText, getByRole } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Test@1234' } });

        fireEvent.click(getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/register', {
                email: 'test@example.com',
                username: 'testuser',
                password: 'Test@1234'
            });
        });
    });
});