import { TextField } from "@mui/material"

export default function Textfield(props){

    return(
        <TextField id="outlined-basic" label={props.label} variant="outlined" sx={{
            width: `${props.width}`,
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'black',
                    borderRadius: '10px',
                },
                '&:hover fieldset': {
                    borderColor: '#acd4f7',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#acd4f7',
                },
            },
            '& .MuiInputLabel-root': {
                color: 'black',
            },
            '& .MuiInputBase-input': {
                color: 'black',
            },
        }}
            onChange={(e) => {props.function(e.target.value)}}
            value={props.text}
        />

    )
 }
 