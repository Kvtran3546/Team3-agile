import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Explore from '../pages/Explore'; // Adjust the import path as needed
import { listingData } from '../constants/index'; // Import the hardcoded listingData

describe("Explore Page", () => {
  test("Explore displays ListingCard components", () => {
    render(
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if Explore page displays ListingCard components
    listingData.forEach((listing) => {
      expect(screen.getByText(listing.title).textContent).toContain(listing.title); // Check for the title
      expect(screen.getByText(listing.address).textContent).toContain(listing.address); // Check for the address
    });
  });
});