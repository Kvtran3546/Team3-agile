import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import { Profile } from '../pages/';

describe("Profile Page", () => {
    test("Profile Elements", () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/profile']}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );

      expect(container.innerHTML).toContain('Recently Viewed');
      expect(container.innerHTML).toContain('View Friends');
      expect(container.innerHTML).toContain('Find Friends');
    });
  });