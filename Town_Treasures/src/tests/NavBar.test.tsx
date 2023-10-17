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

import { render } from '@testing-library/react';
import NavbarComponent from '../components/NavBar'; // Update the import path
import '@testing-library/jest-dom'

describe('NavbarComponent', () => {

  it('renders without crashing', () => {
    const { container } = render(<NavbarComponent/>);
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of links', () => {
    const { getAllByRole } = render(<NavbarComponent/>);
    const links = getAllByRole('link');
    expect(links).toHaveLength(6);
  });

  const testCases = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
    { href: '/login', text: 'Login' },
    { href: '/signup', text: 'Sign Up' },
    { href: '/logout', text: 'Logout' },
  ];

  testCases.forEach(({ href, text }) => {
    it(`renders ${text} link correctly`, () => {
      const { getByText } = render(<NavbarComponent />);
      const link = getByText(text);
      expect(link).toHaveAttribute('href', href);
    });
  });

});



// import {describe, expect, test} from '@jest/globals';
// import {sum} from './sum';

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });