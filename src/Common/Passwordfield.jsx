import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export default function Passwordfield(props){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return(
        <FormControl sx={{
            m: 1, width: '80%',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'black',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#acd4f7',
                },
                '& .MuiInputLabel-root': {
                    color: 'black',
                    
                },
                '& .MuiInputBase-input': {
                    color: 'black',
                    
                },
            },
         
        }} variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'black' }}>{props.label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                onChange={(e) => props.function(e.target.value)}
            />
        </FormControl>
    )
}