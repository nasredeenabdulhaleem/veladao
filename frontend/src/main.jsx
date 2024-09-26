import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ToastContainer } from 'react-toastify';


import App from './App.jsx'
import './styles/main.css'
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/Error/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <App />
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
)
