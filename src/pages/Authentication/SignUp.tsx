import { Button, TextField, Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../lib/api/useApiCall';
import { api } from '../../lib/api';
import { pathHandler } from '../../lib/api/pathHandler';
import { storage } from '../../lib/storage';
import { AuthenticationPage } from './AuthenticationPage';

function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const createUserApiCall = useApiCall({
        apiCall: api.createUser,
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
                    <Typography variant="h2">Créer un compte</Typography>
                </TitleContainer>

                <FieldsContainer>
                    <FieldContainer>
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            name="username"
                            placeholder="Jean Dupont, Jean D., Jeanne La Terrible, ..."
                            type="text"
                            label="Surnom"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            helperText="La façon dont vous souhaitez apparaître dans l'application"
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            required
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
                            required
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
                    loading={createUserApiCall.isLoading}
                    type="submit"
                    variant="contained"
                    disabled={!password || !email || !username}
                >
                    Créer un compte
                </Button>
            </CardContent>
        </AuthenticationPage>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        createUserApiCall.perform({ email, password, username });
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
const FieldContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(4) }));
const TitleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(6),
    textAlign: 'center',
}));

export { SignUp };
