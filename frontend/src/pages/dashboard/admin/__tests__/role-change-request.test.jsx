import { render } from '@testing-library/react';
import React from 'react';
import RoleChangeRequest from '../role-change-request';

// Mocking components and functions
vi.mock("../../../components/status-change-table", () => ({
  StatusChangeTable: vi.fn((props) => (
    <div data-testid="status-change-table">
      <p>Title: {props.title}</p>
      <p>Data: {JSON.stringify(props.data)}</p>
      <p>Headers: {JSON.stringify(props.headers)}</p>
    </div>
  )),
}));

const mockData = [
    { id: 1, full_name: 'John Doe', role: 'user' },
    { id: 2, full_name: 'Jane Smith', role: 'manager' },
  ];

vi.mock("dataprovider", () => ({
  getQuery: vi.fn()
  .mockImplementationOnce(() => ({ data: undefined, isLoading: true, isError: false }))
  .mockImplementationOnce(() => ({ data: undefined, isLoading: false, isError: true }))
  .mockImplementation(() => ({ data: mockData, isLoading: false, isError: false })),
  createMutation: () => ({ mutate: vi.fn().mockImplementation(() => ({ data: "mock data" })) })
}));

describe('RoleChangeRequest Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading message when loading', () => {
    const { getByText } = render(<RoleChangeRequest />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const { getByText } = render(<RoleChangeRequest />);
    expect(getByText('Error')).toBeInTheDocument();
  });

  // it('renders StatusChangeTable with correct props when data is available', async () => {
  //   const { getByTestId } = render(<RoleChangeRequest />);
  //   await waitFor(() => {
  //     expect(getByTestId('status-change-table')).toBeInTheDocument();
  //     expect(getByTestId('status-change-table')).toHaveTextContent('Title: Role Change Requests');
  //     expect(getByTestId('status-change-table')).toHaveTextContent('Data: [{"id":1,"Full Name":"John Doe","Role":"user"},{"id":2,"Full Name":"Jane Smith","Role":"manager"}]');
  //     expect(getByTestId('status-change-table')).toHaveTextContent('Headers: ["Full Name","Role"]');
  //   });
  // });

  // Add more tests for handleStatusChange function if needed
});
