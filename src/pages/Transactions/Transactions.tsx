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

interface IRequest {
    _id: string,
    userId: string,
    name: string,
    balance: number,
    dateCreate: string
  }

export const Transactions = () => {

    const [transactions, setTransactions] = useState<Array<IRequest>>([]);

    return (
        <>
            <Header home={false} />
            <Container maxWidth="md">
                <Box sx={{ width: '100%', height: 890, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ margin: 'auto', width: 900, height: 600, backgroundColor: '#e9e9e9', borderRadius: 5 }}>

                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Balance (£)</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map((transaction) => {
                                    return (
                                        <tr>
                                            <td>{transaction.userId}</td>
                                            <td>{transaction.name}</td>
                                            <td>{transaction.balance}</td>
                                            <td>{transaction.dateCreate}</td>
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