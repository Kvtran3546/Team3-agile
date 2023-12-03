import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import {Login } from '../pages/';

jest.mock('axios');

describe('Login Component', () => {
    it('submits login data successfully', async () => {
        axios.post.mockResolvedValue({ data: {} }); // Mock Axios post request

        const { getByLabelText, getByRole } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users/login', {
                username: 'testuser',
                password: 'password123'
            });
        });
    });
});