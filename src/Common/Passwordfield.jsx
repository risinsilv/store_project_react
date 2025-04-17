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
                    borderColor: '#95a6fe',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                },
                '&:hover fieldset': {
                    borderColor: '#95a6fe',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#95a6fe',
                },
                '& .MuiInputLabel-root': {
                    color: '#95a6fe',
                    
                },
                '& .MuiInputBase-input': {
                    color: '#95a6fe',
                    
                },
            },
         
        }} variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#95a6fe' }}>{props.label}</InputLabel>
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