import axios from 'axios';
//Formnik
import { useFormik } from 'formik';
import * as yup from 'yup';
//Material UI
import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//next
import { Link } from "../../components/Link/Link";
import Header from '../../components/Nav/Nav';

import { useRouter } from "next/router";
import { en, pt } from '../../../translations';

import { useEffect, useState } from 'react';


const theme = createTheme();

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required(),
    lastName: yup
        .string()
        .required(),
    email: yup
        .string()
        .required('Email is required')
        .email('Enter a valid email'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function Register() {
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

    const formik = useFormik({
        onSubmit: values => axios.post('http://localhost:3000/client', {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            balance: 0,
            dolar: 0

        }),
        validationSchema,
        validateOnMount: true,

        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    })

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header home={true} />
                <Container classes={{ root: 'regis' }} component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ m: 2}} component="h1" variant="h5">
                            {a.titleSignup}
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>

                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        label={a.inputFirstName}
                                        name="firstName"
                                        autoComplete="family-name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.firstName && formik.errors.firstName) && (
                                        <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.firstName}</span>
                                    )}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label={a.inputLastName}
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.lastName && formik.errors.lastName) && (
                                        <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.lastName}</span>
                                    )}

                                </Grid>

                                <Grid item xs={12}>

                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label={a.inputSignupEmail}
                                        name="email"
                                        autoComplete="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.email && formik.errors.email) && (
                                        <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.email}</span>
                                    )}

                                </Grid>

                                <Grid item xs={12}>

                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label={a.inputSignupPassword}
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.password && formik.errors.password) && (
                                        <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.password}</span>
                                    )}

                                </Grid>

                            </Grid>
                            <Button
                                disabled={!formik.isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {a.signupButton}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login">
                                        {a.signupLink}
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