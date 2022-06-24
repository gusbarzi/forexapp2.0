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
    id_client: string,
    transaction: string,
    created_at: number,
  }

export const Transactions = () => {
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

    const [transactions, setTransactions] = useState<Array<IRequest>>([]);
    
    const getData = async () => {
        const tokenLocal = window.localStorage.getItem('token')
        await axios.get('http://localhost:3000/client/trade', {
            headers: {
                'Authorization': 'bearer' + tokenLocal
            }
        }).then((response) => {
            setTransactions(response.data[0].transactions)
        }).catch((error) => {});
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Header home={false} />
            <Container maxWidth="md">
                <Box sx={{ width: '100%', height: 890, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ margin: 'auto', width: 900, height: 600, backgroundColor: '#e9e9e9', borderRadius: 5 }}>

                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>{a.thID}</th>
                                    <th>{a.thName}</th>
                                    <th>{a.thBalance}</th>
                                    <th>{a.thData}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map(({ id, id_client, transaction, created_at }) => {
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{id_client}</td>
                                            <td>{transaction}</td>
                                            <td>{created_at}</td>
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