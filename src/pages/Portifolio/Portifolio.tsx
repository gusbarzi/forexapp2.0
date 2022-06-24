//React Hooks
import { useEffect, useState } from 'react';
//axios
import axios from 'axios';
//Material UI
import { Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography, Modal, Button, Box } from '@mui/material';
//components
import Header from "../../components/Nav/Nav"
import InputUSD from '../../components/Input/InputUSD';
import { Link } from "../../components/Link/Link";

import { useRouter } from "next/router";
import { en, pt } from '../../../translations';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderradius: '10px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Portifolio = () => {
    const [gbpBalance, setBalanceGbp]: any = useState('');
    //Modal
    const [openGbp, setOpengbp] = useState(false);
    const [openUsd, setOpenusd] = useState(false)

    const handleOpengbp = () => setOpengbp(true);
    const handleOpenusd = () => setOpenusd(true);

    const handleClosegbp = () => setOpengbp(false);
    const handleCloseusd = () => setOpenusd(false);

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

                    <Box sx={{ width: 500, height: 600, display: 'flex', justifyContent: 'center', backgroundColor: '#e9e9e9', p: 2, m: 1, borderRadius: 5 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                            <Typography sx={{ height: 150 }} variant="h3">
                                {a.titlePortifolio}
                            </Typography>

                            <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 3, md: 10 }}>

                                <Grid item xs={8}>
                                    <Typography sx={{ m: 1 }} variant="h6" gutterBottom component="div">
                                        GBP: {'0,00'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Link href="/portifolio">
                                        <Button onClick={handleOpengbp} variant="contained" color="success" classes={{ root: 'button' }}>{a.depositButtons}</Button>
                                    </Link>
                                </Grid>

                                <Grid item xs={8}>
                                    <Typography sx={{ m: 1 }} variant="h6" gutterBottom component="div">
                                        USD: {'0,00'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Link href="/portifolio">
                                        <Button onClick={handleOpenusd} variant="contained" color="success" classes={{ root: 'button' }}>{a.depositButtons}</Button>
                                    </Link>
                                </Grid>

                            </Grid>

                            <div>
                                <Modal open={openGbp} onClose={handleClosegbp} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={style}>
                                        <FormControl fullWidth >
                                            <InputLabel color="secondary" htmlFor="outlined-adornment-amount">{a.amountLabel}</InputLabel>

                                            <OutlinedInput
                                                value={gbpBalance}
                                                onChange={(e) => setBalanceGbp(e.target.value)}
                                                color="secondary"
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                                label={a.amountLabel}
                                            />
                                        </FormControl>
                                        <Button color="success">{a.depositButtons}</Button>
                                    </Box>
                                </Modal>
                            </div>

                            <div>
                                <Modal open={openUsd} onClose={handleCloseusd} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={style}>
                                        <InputUSD />
                                        <Button color="success">{a.depositButtons}</Button>
                                    </Box>
                                </Modal>
                            </div>

                        </Box>

                    </Box>

                </Box>
            </Container>
        </>
    )
}

export default Portifolio