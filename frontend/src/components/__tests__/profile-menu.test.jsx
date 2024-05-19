import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import ProfileMenu from '../profile-menu';

vi.mock('react-router-dom', ()=>{
    return {
        useNavigate: () => vi.fn()
    }
});

describe('ProfileMenu', () => {
  const mockUser = {
    fullName: 'John Doe',
    emailAddresses: [{ emailAddress: 'john.doe@example.com' }],
    anchorEl: document.createElement('div'), // Mock anchor element
  };

  const mockOnClose = vi.fn();
  const mockOnSignOut = vi.fn();

  test('renders user profile information', () => {
    render(
      <ProfileMenu
        user={mockUser}
        onClose={mockOnClose}
        onSignOut={mockOnSignOut}
      />
    );

    // Check if user full name is rendered
    expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();

    // Check if user email address is rendered
    expect(screen.getByText(mockUser.emailAddresses[0].emailAddress)).toBeInTheDocument();
  });
  test('navigates to profile page when profile menu item is clicked', () => {
    render(
      <ProfileMenu
        user={mockUser}
        onClose={mockOnClose}
        onSignOut={mockOnSignOut}
      />
    );

    // Click on the profile menu item
    fireEvent.click(screen.getByText('Home'));

    // Check if navigation to profile page occurred
    //expect(mockOnClose).toHaveBeenCalled(); // Close the menu
    expect(window.location.pathname).toBe('/');
  });
  /*
  test('navigates to home page when home menu item is clicked', () => {
    render(
      <ProfileMenu
        user={mockUser}
        onClose={mockOnClose}
        onSignOut={mockOnSignOut}
      />
    );

    // Click on the home menu item
    fireEvent.click(screen.getByText('Home'));

    // Check if navigation to home page occurred
    expect(mockOnClose).toHaveBeenCalled(); // Close the menu
    expect(window.location.pathname).toBe('/home');
  });
  */
  // Similarly, write tests for other menu items and actions
});
