import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './App';

/**
 * This is the entry point for the application.
 * It renders the App component to the root element.
 * All components are rendered inside the App component.
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Failed to find the root element');
}
