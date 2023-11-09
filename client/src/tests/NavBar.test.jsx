import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';
import App from "../App";

describe("Navbar component", () => {
  test("should load in", () => {
    //render(<Navbar/>);
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );
    render(<App />);
  })
})