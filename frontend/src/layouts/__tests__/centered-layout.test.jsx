import { render, screen } from '@testing-library/react';
import React from 'react';
import { CenteredLayout } from '../centered-layout';

describe('CenteredLayout', () => {
  test('renders children', () => {
    render(
      <CenteredLayout>
        <div>Test Child</div>
      </CenteredLayout>
    );

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  test('applies styles correctly', () => {
    render(
      <CenteredLayout extras={{ 'data-testid': 'test-layout' }}>
        <div>Test Child</div>
      </CenteredLayout>
    );

    const layoutElement = screen.getByTestId('test-layout');
    expect(layoutElement).toHaveStyle({
      display: 'flex',
      backgroundImage: 'url("./subtle-prism.svg")',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    });
  });
});
