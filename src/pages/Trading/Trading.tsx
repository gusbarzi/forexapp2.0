//Axios
import axios from 'axios';
//Hooks
import { useContext, useEffect, useState } from 'react'
//Material UI
import { Container, Typography, TextField, Button, Box } from "@mui/material"
//components
import Header from "../../components/Nav/Nav";
//CSS
import styles from "../../../styles/Trade.module.css";

import { useRouter } from "next/router";
import { en, pt } from '../../../translations'; 


export const Trading = () => {
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

    return (
        <>
            <Header home={false} />
            <Container maxWidth="md">
                <Box sx={{ width: '100%', height: 890, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 500, height: 600, backgroundColor: '#e9e9e9', p: 2, m: 1, borderRadius: 5 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                            <div className={styles.box__container}>
                                <h1 className={styles.div__h1}>
                                    GBP
                                </h1>
                                <h1 className={styles.div__h1}>
                                    £: {'0,00'}
                                </h1>
                                <h1 className={styles.div__h1}>
                                    Dolar
                                </h1>
                                <h1 className={styles.div__h1}>
                                    USD: {'0,00'}
                                </h1>
                            </div>

                            <Typography>Dolar(US$)</Typography>
                            <TextField size="small" disabled id="outlined-basic" label={'dolar'} variant="outlined" sx={{ width: 350 }} margin="normal" />

                            <Typography>GPB(£)</Typography>
                            <TextField
                                color="secondary"
                                size="small"
                                id="outlined-basic"
                                label={a.inputAmount}
                                variant="outlined"
                                sx={{
                                    width: 350,
                                }}
                                margin="normal"
                                //onChange={(e) => setLibra(e.target.value)}
                                //onKeyUp={() => convert()}
                            />

                            <Typography>GBP(£)/USD(US$)</Typography>
                            <TextField
                                size="small"
                                disabled
                                id="outlined-basic"
                                //label={total}
                                variant="outlined"
                                sx={{ width: 350 }}
                                margin="normal"
                            />

                            <Button onClick={console.log} sx={{ width: 350 }} variant="contained" color="success">
                                {a.buyButton}
                            </Button>

                        </Box>

                    </Box>

                </Box>
            </Container>
        </>
    )
}

export default Trading;