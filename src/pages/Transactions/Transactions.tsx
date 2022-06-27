//Material UI
import { Box, Container } from '@mui/material';
//Axios
import axios from 'axios';
//Hooks
import React, { useContext, useEffect, useState } from 'react';
//components
import Header from "../../components/Nav/Nav";
//CSS
import styles from "../../../styles/Table.module.css";

import { useRouter } from "next/router";
import { en, pt } from '../../../translations';

interface IRequest {
    id: string,
    firstName: string,
    lastName: string,
    balance: number,
    created_at: number,
}

export const Transactions = () => {
    const router = useRouter();
    const { locale } = router;

    const [language, setLanguage] = useState()
    const [user, setUser]: any = useState({});

    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const getLanguage = () => {
        return window.localStorage.getItem('i18nextLng')
    }

    useEffect(() => {
        const get: any = getLanguage();
        setLanguage(get);
    }, [])

    const a = locale === language ? pt : en;

    const getUser = () => {
        setUser(JSON.parse(window.localStorage.getItem('token')))
    }

    const getData = async () => {
        const tokenLocal = JSON.parse(window.localStorage.getItem('token'))
        await axios.get('http://localhost:3000/client/trades', {
            headers: {
                'Authorization': 'bearer ' + tokenLocal.token
            }
        }).then((response) => {
            setName(response.data[0].firstName)
            setLastName(response.data[0].lastName)
            setTransactions(response.data[0].transactions)
        }).catch((error) => {
            // console.log(error)
        });
    }

    useEffect(() => {
        getData();
        getUser();
    }, [])

    return (
        <>
            <Header home={false} />
            <Container maxWidth="md">
                <Box sx={{ width: '100%', height: 890, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ margin: 'auto', width: 900, height: 600, backgroundColor: '#e9e9e9', borderRadius: 5 }}>
                    <p>{a.name} {name} {lastName}</p>

                        <table className={styles.tableClass}>
                            <thead>
                                <tr>
                                    <th className={styles.thtd}>{a.thID}</th>
                                    <th className={styles.thtd}>{a.thBalance}</th>
                                    <th className={styles.thtd}>{a.thData}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map(({ id, dolar, created_at }) => {
                                    return (
                                        <tr key={id}>
                                            <td className={styles.thtd}>{id}</td>
                                            <td className={styles.thtd}>{dolar}</td>
                                            <td className={styles.thtd}>{created_at}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </Box>

                </Box>
            </Container>
        </>
    )
}