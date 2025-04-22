import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import instance from '../../Service/AxiosOrder';

export default function GetOrders() {
    const [orders, setOrders] = useState([]); // State to store orders

    
    const getOrders = () => {
    
        instance.post('/getOrders', {
            userID: localStorage.getItem('user'),
        })
            .then(function (response) {
                    setOrders(response.data)
                    console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });

    }

    useEffect(() => {
        getOrders()
    }, []);



    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '700' }}>
                Your Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="h6" sx={{ color: 'gray' }}>
                    No orders found.
                </Typography>
            ) : (
                orders.map((order) => (
                    <Card key={order.orderID} sx={{ marginBottom: '20px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: '700' }}>
                                Order ID: {order.orderID}
                            </Typography>
                            <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
                            <Typography variant="body1">Status: {order.status}</Typography>
                            <Typography variant="body1">Created At: {new Date(order.createdAt).toLocaleString()}</Typography>
                            <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: '700' }}>
                                Products:
                            </Typography>
                            <List>
                                {order.products.map((product, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={product?.name || 'Unknown Product'}
                                            secondary={`Price: $${product?.price || 0} | Quantity: ${product?.Quantity || 0}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}