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

const theme = createTheme();

const validationSchema = yup.object({
    email: yup
    .string()
    .required('Enter is required')
    .email('Enter a valid email'),
    password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {

    const formik = useFormik({
        onSubmit: values => axios.post('http://localhost:3000/auth/authenticate', {
                email: values.email,
                password: values.password
        }),
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
                <Header />
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
                            Sign in
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                margin="normal"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {(formik.touched.email && formik.errors.email) && (
                                <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.email}</span>
                            )}


                            <TextField
                                required
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {(formik.touched.password && formik.errors.password) && (
                                <span style={{ color: 'red', fontSize: '14px' }}>{formik.errors.password}</span>
                            )}
                            <Button
                                disabled={!formik.isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Grid container>
                                <Grid item>
                                    <Link href="/register">
                                        {"Don't have an account? Sign Up"}
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