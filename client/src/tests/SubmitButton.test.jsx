import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Explore from '../pages/Explore'; // Adjust the import path as needed

describe("Explore and SubmitButton components", () => {
  test("Clicking SubmitButton navigates to SubmitPage", () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/submitspot" element={<div>SubmitSpot Component Text</div>} /> {/* Adjust the element as needed */}
        </Routes>
      </MemoryRouter>
    );

    // Find the SubmitButton and click it
    const submitButton = screen.getByText('Submit a Spot!'); // Adjust the text as needed
    fireEvent.click(submitButton);

    // Verify that the URL has changed to the SubmitPage route
    expect(container.innerHTML).toContain('SubmitSpot Component Text'); // Adjust the text or element check as needed
  });
});