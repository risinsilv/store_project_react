import { TextField } from "@mui/material"

export default function Textfield(props){

    return(
        <TextField id="outlined-basic" label={props.label} variant="outlined" sx={{
            width: `${props.width}`,
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#95a6fe',
                    borderRadius: '10px',
                },
                '&:hover fieldset': {
                    borderColor: '#95a6fe',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#95a6fe',
                },
            },
            '& .MuiInputLabel-root': {
                color: '#95a6fe',
            },
            '& .MuiInputBase-input': {
                color: '#95a6fe',
            },
        }}
            onChange={(e) => {props.function(e.target.value)}}
            value={props.text}
        />

    )
 }
 