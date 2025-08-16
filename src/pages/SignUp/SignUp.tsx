import { Button, Card, TextField, Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../lib/api/useApiCall';
import { api } from '../../lib/api';
import { pathHandler } from '../../lib/api/pathHandler';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const createUserApiCall = useApiCall({
        apiCall: api.createUser,
        onSuccess: () => {
            navigate(pathHandler.getRoutePath('HOME'));
        },
    });

    return (
        <>
            <ContentContainer>
                <Card>
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
                            disabled={!password || !email}
                        >
                            Créer un compte
                        </Button>
                    </CardContent>
                </Card>
            </ContentContainer>
        </>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        createUserApiCall.perform({ email, password });
        event.preventDefault();
    }
}

const ContentContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
});

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

export { SignUp };
