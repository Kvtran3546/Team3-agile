import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import SubmitSpot from '../pages/SubmitSpot'; // Adjust the import path as needed

describe("Submit Spot Page", () => {
    test("Proper Submit Page load-in", () => {
        //render(<Navbar/>);
        render(
          <MemoryRouter>
            <Routes>
              <Route element={<SubmitSpot />} />
            </Routes>
          </MemoryRouter>
        );
    });

    test("Elements present in submit page", () => {
        const {container} = render(<SubmitSpot/>);
        
        expect(container.getElementsByTagName('input')).toHaveLength(4);
        expect(container.getElementsByTagName('textarea')).toHaveLength(1);
        expect(container.getElementsByTagName('button')).toHaveLength(1);
        expect(container.getElementsByTagName('select')).toHaveLength(1);
    });
});