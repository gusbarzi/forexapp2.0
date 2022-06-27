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
import { Console } from 'console';


export const Trading = () => {
    const router = useRouter();
    const {locale} = router;

    const [language, setLanguage] = useState()
    const [dolar, setDolar] = useState(0)
    const [user, setUser]: any = useState([])
    const [amount, setAmount]: any = useState()

    const getLanguage = () => {
        return window.localStorage.getItem('i18nextLng')
    }

    const getUser = () => {
        setUser(JSON.parse(window.localStorage.getItem('token')))
    }

    const trade = () => {
        axios.post('http://localhost:3000/trade', {
            balance: user.clientData.balance - amount,
            dolar: user.clientData.dolar + (amount * dolar)
        },
            {
                headers: {
                    'Authorization': 'bearer ' + user.token
                }
            }
        ).then((response) => {
            const newData = {
                clientData: {
                    balance: response.data.balance,
                    dolar: response.data.dolar,
                    email: user.clientData.email,
                    firstName: user.clientData.fistName,
                    id: response.data.id,
                    lastName: user.clientData.lastName
                },
                token: user.token
            }
            window.localStorage.setItem('token', JSON.stringify(newData))
            window.location.reload();
        }).catch((error) => {
            // console.log(error)
        })
    }

    const attStatus = async () => {
        await axios.put('http://localhost:3000/deposit/trade', {
            balance: user.clientData.balance - amount,
            dolar: user.clientData.dolar + (amount * dolar)
        },
            {
                headers: {
                    'Authorization': 'bearer ' + user.token
                }
            }
        ).then((response) => {
            const newData = {
                clientData: {
                    balance: response.data.balance,
                    dolar: response.data.dolar,
                    email: user.clientData.email,
                    firstName: user.clientData.fistName,
                    id: response.data.id,
                    lastName: user.clientData.lastName
                },
                token: user.token
            }
            window.localStorage.setItem('token', JSON.stringify(newData))
            // window.location.reload();
        }).catch((error) => {
            // console.log(error)
        })
        trade()
    }
    
    useEffect(() => {
        const getDolar = async () => {
            const ws = await new WebSocket('wss://stream.binance.com:9443/ws/gbpusdt@bookTicker');
            ws.onmessage = (event) => {
                const obj = JSON.parse(event.data);

                setDolar(obj.a)
            }
        }
        const get: any = getLanguage();
        setLanguage(get);
        getUser()
        getDolar()
    }, [])

    const a = locale === language ? pt : en;



    return (
        <>
            <Header home={false} />
            <Container maxWidth="md">
                <Box sx={{ width: '100%', height: 890, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 500, height: 520, backgroundColor: '#e9e9e9', p: 2, m: 1, borderRadius: 5 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                            <div className={styles.box__container}>
                                <h1 className={styles.div__h1}>
                                    GBP
                                </h1>
                                <h1 className={styles.div__h1}>
                                    £: {user?.clientData?.balance}
                                </h1>
                                <h1 className={styles.div__h1}>
                                    Dolar
                                </h1>
                                <h1 className={styles.div__h1}>
                                    USD: {user?.clientData?.dolar}
                                </h1>
                            </div>

                            <Typography>Dolar(US$)</Typography>
                            <TextField size="small" disabled id="outlined-basic" value={dolar} variant="outlined" sx={{ width: 350 }} margin="normal" />

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
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Button onClick={() => attStatus()} sx={{ width: 350 }} variant="contained" color="success">
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