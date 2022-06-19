import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from "react";

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

    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel color="secondary" htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
                color="secondary"
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">US$</InputAdornment>}
                label="Amount"
                />
        </FormControl>
    )
}

export default InputUSD;