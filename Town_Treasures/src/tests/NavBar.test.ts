// //import React from 'react';
// import { render } from '@testing-library/react';
// import NavBar from '../constants/NavBar';
// import '@testing-library/jest-dom';



// describe('NavBar Component', () => {
//   it('renders a navigation bar with six links', () => {
//     const { getByText } = render(<NavBar />);
    
//     // Ensure the presence of navigation links
//     expect(getByText('Home')).toBeInTheDocument();
//     expect(getByText('About')).toBeInTheDocument();
//     expect(getByText('Contact')).toBeInTheDocument();
//     expect(getByText('Login')).toBeInTheDocument();
//     expect(getByText('Sign Up')).toBeInTheDocument();
//     expect(getByText('Logout')).toBeInTheDocument();
//   });

//   // You can add more test cases to check specific functionality of the navigation bar
// });

//some fucking bullshit

import {render, screen, cleanup} from '@testing-library/react';
import NavBar from '../constants/NavBar';

test("Should render Navbar component", () => {
    render(<Navbar/>)
    const HomeElement = screen.getAllByTestId("Home");
    expect(HomeElement).toBeInTheDocument();
})

// import {describe, expect, test} from '@jest/globals';
// import {sum} from './sum';

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });