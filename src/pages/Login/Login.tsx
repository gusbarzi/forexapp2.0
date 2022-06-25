//hooks
import { useContext } from 'react';
//axios
import axios from 'axios';
//Formnik
import { useFormik } from 'formik';
import * as yup from 'yup';
//Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/Nav/Nav';
import Router from 'next/router';

import { useRouter } from "next/router";
import { en, pt } from '../../../translations';

import { useEffect, useState } from 'react';



const theme = createTheme();

const validationSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Enter a valid email'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function Login() {
    const router = useRouter();
    const {locale} = router;

    const [language, setLanguage] = useState()

    const getLanguage = () => {
       return window.localStorage.getItem('i18nextLng')
    }
    
    useEffect(() => {
        const get: any = getLanguage();
        setLanguage(get);
    }, [])

    const a = locale === language ? pt : en;

    const inLocalStorage = (token: any) => {
        
        window.localStorage.setItem('token', token);
    }

    const formik = useFormik({
        onSubmit: async data => {
            await axios.post('http://localhost:3000/client/authenticate', {
                email: data.email,
                password: data.password
            }).then((response) => {
                const user = JSON.parse(response.data.clientData)
                inLocalStorage(user)
                Router.push('/home');
                console.log(response.data);
            })
        },
        validationSchema,
        validateOnMount: true,

        initialValues: {
            email: '',
            password: ''
        }
    })

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header home={true} />
                <Container classes={{ root: 'cont' }} component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            {a.title}
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                margin="normal"
                                id="email"
                                label={a.inputEmail}
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                            {(formik.touched.email && formik.errors.email) && (
                                <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.email}</span>
                            )}


                            <TextField
                                required
                                fullWidth
                                margin="normal"
                                name="password"
                                label={a.inputPassword}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                            {(formik.touched.password && formik.errors.password) && (
                                <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.password}</span>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                {a.signinButton}
                            </Button>

                            <Grid container>
                                <Grid item>
                                    <Link href="/register">
                                        {a.signinLink}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}