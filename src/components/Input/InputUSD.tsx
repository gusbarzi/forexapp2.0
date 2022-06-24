import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { en, pt } from '../../../translations'; 

interface State {
    amount: string;
}
export const InputUSD = () => {

const [values, setValues] = useState<State>({
    amount: ''
});

const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    }        

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
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel color="secondary" htmlFor="outlined-adornment-amount">{a.amountLabel}</InputLabel>
            <OutlinedInput
                color="secondary"
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">US$</InputAdornment>}
                label={a.amountLabel}
                />
        </FormControl>
    )
}

export default InputUSD;