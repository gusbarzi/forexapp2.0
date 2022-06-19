import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from "react";

interface State {
    amount: string;
}
export const InputGBP = () => {

const [values, setValues] = useState<State>({
    amount: ''
});

const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    }        

    return (
        <FormControl fullWidth >
            <InputLabel color="secondary" htmlFor="outlined-adornment-amount">Amount</InputLabel>

            <OutlinedInput
                color="secondary"
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                label="Amount"
                />
                <Button color="success">Deposit</Button>
        </FormControl>
    )
}

export default InputGBP;