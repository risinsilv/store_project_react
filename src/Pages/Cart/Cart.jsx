// Cart.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,clearCart } from '../../redux/cartSlice';
import instance from '../../Service/AxiosOrder';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const dispatch = useDispatch();

    // Calculate total price
    const totalPrice = (cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2);

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item)); // Dispatch action to remove item from the cart
    };

    const placeOrder = () => {
        console.log(localStorage.getItem('user'),cartItems,totalPrice)
        instance.post('/placeOrder', {
            userID: localStorage.getItem('user'),
            status: 'completed',
            orderItems: cartItems,
            totalAmount: totalPrice
        })
            .then(function (response) {
                dispatch(clearCart());
                console.log('Order placed successfully:', response.data);
                alert('Order placed successfully!');
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginTop: '50px' }}>
                <Box sx={{ width: '95%' }}>
                    {/* Cart Items */}
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '700' }}>
                        Your Cart
                    </Typography>
                    {cartItems.length === 0 ? (
                        <Typography variant="h6" sx={{ color: 'gray' }}>
                            Your cart is empty.
                        </Typography>
                    ) : (
                        cartItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                }}
                            >
                                {/* Item Image */}
                                <Box
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '10px',
                                    }}
                                />
                                {/* Item Details */}
                                <Box sx={{ flex: 1, marginLeft: '20px' }}>
                                    <Typography variant="h6" sx={{ fontWeight: '700' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray' }}>
                                        {item.category}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                        Quantity: {item.quantity}
                                    </Typography>
                                </Box>
                                {/* Item Price */}
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: '700' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                    <Button onClick={() => handleRemoveFromCart(item)} sx={{ color: 'red' }}>
                                        Remove
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    )}

                    {/* Summary Section */}
                    {cartItems.length > 0 && (
                        <Box
                            sx={{
                                marginTop: '30px',
                                padding: '20px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: '700', marginBottom: '20px' }}>
                                Order Summary
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography variant="body1">Total Items:</Typography>
                                <Typography variant="body1">{cartItems.length}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography variant="body1">Total Price:</Typography>
                                <Typography variant="body1">${totalPrice}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: '20px', width: '100%' }}
                                onClick={placeOrder}
                            >
                                Place Order
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}
