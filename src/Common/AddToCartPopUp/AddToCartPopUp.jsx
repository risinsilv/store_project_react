import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


// adjust path if needed

export default function CustomizedDialogs(props) {
    const notify = () => toast.success("Item added to cart!");
    const [quantity, setQuantity] = React.useState(1);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        if (quantity < props.stock) setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddToCart = () => {
        const item = {
            id: props.id,  // Unique ID for the item
            name: props.name,
            price: props.price,
            image: props.image,
            quantity: quantity,  // Item quantity
        };
        
        close();
        dispatch(addToCart(item)); 
        notify();
    };

    const close = () => {
        props.handleClose();
        setQuantity(1)
    }

    return (
        <React.Fragment>
             <ToastContainer theme='dark'/>
            <BootstrapDialog onClose={close} open={props.open}>
                <Box sx={{ width: '400px', height: '590px', margin: '30px', borderRadius: '20px' }}>
                    {/* image, category, name */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            width: '250px', height: '250px',
                            backgroundImage: `url(${props.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '20px', marginTop: '10px'
                        }} />
                    </Box>
                    <Box sx={{ marginLeft: '25px', marginTop: '20px', fontSize: '17px', color: '#C0C0C0', fontFamily:'inter' }}>
                        {props.category}
                    </Box>
                    <Box sx={{ marginLeft: '25px', fontSize: '25px', fontWeight: '700', fontFamily:'inter' }}>
                        {props.name}
                    </Box>

                    {/* quantity selector */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
                        <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                            <RemoveCircleIcon fontSize="large" />
                        </IconButton>
                        <Typography sx={{ margin: '0 20px', fontSize: '20px' }}>{quantity}</Typography>
                        <IconButton onClick={handleIncrement} disabled={quantity >= props.stock}>
                            <AddCircleRoundedIcon fontSize="large" />
                        </IconButton>
                    </div>

                    {/* total */}
                    <Box sx={{ marginTop: '30px', marginLeft: '25px', fontSize: '25px', fontWeight: '700',fontFamily:'inter' }}>
                        Total: <span style={{ color: 'red',fontFamily:'inter' }}>${(props.price * quantity).toFixed(2)}</span>
                    </Box>

                    {/* Add to cart button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <Button onClick={handleAddToCart} sx={{ fontSize: '25px', color: 'black' }}>
                            Add to cart
                        </Button>
                       
                    </Box>
                </Box>
            </BootstrapDialog>
        </React.Fragment>
    );
}
