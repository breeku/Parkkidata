import { render, screen, fireEvent, } from '@testing-library/react'

import '@testing-library/jest-dom'

import App from '../../App'
import Statistics from '../Window/Statistics'


test('should render App component wihtout crash', () => {
    render(<App />)
    const appElement = screen.getByTestId('dragStats');
    const appElementFilter = screen.getByTestId('filter');
    expect(appElement).toBeInTheDocument();
    expect(appElementFilter).toBeInTheDocument();
    expect(appElement).toHaveTextContent('capacity estimate:');

    fireEvent.click(screen.getByText('Statistics'))
    const appElementStatistics = screen.getByTestId('statistics');
    expect(appElementStatistics).toBeInTheDocument();

})