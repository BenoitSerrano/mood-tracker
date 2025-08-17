import { Button, TextField, Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../lib/api/useApiCall';
import { api } from '../../lib/api';
import { pathHandler } from '../../lib/api/pathHandler';
import { storage } from '../../lib/storage';
import { AuthenticationPage } from './AuthenticationPage';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginApiCall = useApiCall({
        apiCall: api.login,
        onSuccess: (data) => {
            const { token } = data;
            storage.jwtHandler.set(token);
            navigate(pathHandler.getRoutePath('HOME'));
        },
    });

    return (
        <AuthenticationPage>
            <CardContent onSubmit={handleSubmit}>
                <TitleContainer>
                    <Typography variant="h2">Se connecter</Typography>
                </TitleContainer>

                <FieldsContainer>
                    <FieldContainer>
                        <TextField
                            autoFocus
                            fullWidth
                            name="email"
                            type="email"
                            label="Adresse e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            fullWidth
                            name="password"
                            type="password"
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FieldContainer>
                </FieldsContainer>

                <Button
                    loading={loginApiCall.isLoading}
                    type="submit"
                    variant="contained"
                    disabled={!password || !email}
                >
                    Se connecter
                </Button>
            </CardContent>
        </AuthenticationPage>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        loginApiCall.perform({ email, password });
        event.preventDefault();
    }
}

const CardContent = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}));

const FieldsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));
const FieldContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(2) }));
const TitleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(6),
    textAlign: 'center',
}));

export { SignIn };
