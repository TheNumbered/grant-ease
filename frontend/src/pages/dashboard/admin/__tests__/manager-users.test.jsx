import { render, waitFor } from '@testing-library/react';
import React from 'react';
import ManageUsers from '../manage-users';

// Mocking the data
const mockUserData = [
    { id: 1, full_name: 'John Doe', is_banned: false },
    { id: 2, full_name: 'Jane Smith', is_banned: true },
  ];


// Mocking the data fetching function
vi.mock('../../../dataprovider', () => ({
  getQuery: vi.fn()
            .mockImplementationOnce(() => ({ data: undefined, isLoading: true, isError: false }))
            .mockImplementationOnce(() => ({ data: undefined, isLoading: false, isError: true }))
            .mockImplementation(() => ({ data: mockUserData, isLoading: false, isError: false })),
  updateMutation: ()=>({ mutate: vi.fn().mockImplementation(()=>({data: "mock data"})) })
}));



describe('ManageUsers Component', () => {
  it('renders loading message when loading', () => {
    const { getByText } = render(<ManageUsers />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const { getByText } = render(<ManageUsers />);
    expect(getByText('Error')).toBeInTheDocument();
  });

  it('renders user data correctly', async () => {
    const { getByText } = render(<ManageUsers />);
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});