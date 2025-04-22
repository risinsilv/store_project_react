import { Button } from "@mui/material";

export default function Button1(props) {
    return(
        <Button
        sx={{
            color: 'black',
            fontSize: '15px',
            borderRadius: '10px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.1)',
            },
            '&:active': {
                backgroundColor: '#95a6fe', // Change to your desired active background color
                color: 'white', // Optional: Change text color on click
            },
        }}
        onClick={props.function} // Pass the onClick function as a prop
    >
        {props.text}
    </Button>
    )
}