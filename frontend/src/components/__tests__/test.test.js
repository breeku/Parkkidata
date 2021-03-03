import { render, screen, } from '@testing-library/react'

import '@testing-library/jest-dom'

import App from '../../App'


test('should render App component wihtout crash', () => {
    render(<App />)
    const appElement = screen.getByTestId('dragStats');
    const appElementFilter = screen.getByTestId('filter');
    expect(appElement).toBeInTheDocument();
    expect(appElementFilter).toBeInTheDocument();
    expect(appElement).toHaveTextContent('capacity estimate:');
})