import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { ThemeProvider, styled } from '@mui/material';
import { theme } from './theme';
import { AlertHandlerContextProvider } from './lib/alert';
import './index.css';
import { LanguageProvider } from './lib/translation';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();
const StyledBody = styled('div')(({ theme }) => ({ color: theme.palette.common.black }));

root.render(
    <ThemeProvider theme={theme}>
        <LanguageProvider>
            <StyledBody>
                <QueryClientProvider client={queryClient}>
                    <AlertHandlerContextProvider>
                        <BrowserRouter>
                            <Router />
                        </BrowserRouter>
                    </AlertHandlerContextProvider>
                </QueryClientProvider>
            </StyledBody>
        </LanguageProvider>
    </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
