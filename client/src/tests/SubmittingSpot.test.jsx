import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import {SubmitSpot} from '../pages'; // Adjust the import path as needed

jest.mock('axios');

describe("SubmitSpot Component", () => {
    test("submits spot data successfully", async () => {
        axios.post.mockResolvedValue({ data: {} }); // Mock Axios post request

        const { getByPlaceholderText, getByRole } = render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<SubmitSpot />} />
                </Routes>
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(getByPlaceholderText('Location Title'), { target: { value: 'Test Location' } });
        fireEvent.change(getByPlaceholderText('Street Address'), { target: { value: '123 Test St' } });
        fireEvent.change(getByPlaceholderText('City'), { target: { value: 'Test City' } });
        fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'Test Description' } });

        // Select a state
        const selectState = getByRole('combobox');
        fireEvent.change(selectState, { target: { value: 'NY' } });

        // Simulate form submission
        fireEvent.click(getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/listings/submitspot', {
                title: 'Test Location',
                address: '123 Test St',
                city: 'Test City',
                state: 'NY',
                description: 'Test Description',
                imageURL: undefined // or the expected value for image URL
            });
        });
    });
});
