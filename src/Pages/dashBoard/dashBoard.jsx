import { Height, WidthFull } from "@mui/icons-material";
import Search from '../../Common/Search/Search'
import { Box, Button } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import "@fontsource/roboto/900.css"; // Specify weight
import Button1 from "../../Common/Button1/Button1";
import loginback from '../../assets/loginback1.jpg'
import "@fontsource/bebas-neue/400.css";
import { route1 } from '../../Navigation/Navigation'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useCallback } from "react";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

export default function dashBoard() {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ width: '100vw' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '80px', width: '100vw', backgroundColor: 'transparent', position: 'sticky', top: 0, zIndex: 1 }}>
                    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', height: '30px', width: '30vw' }}>
                            <Button1 text='Home' function={() => navigate("/Home")}/>
                            <Button1 text='My orders' function={() => navigate("/GetOrders")}/>
                            <Button1 text={<ShoppingCartIcon />} function={() => navigate('/Cart')}/>
                            <Button1 text='Add Products' function={() => navigate('/Product')}/>
                            <Button1 text={<ExitToAppRoundedIcon />} function={()=> {localStorage.clear('token'),window.location.reload()}}/>
                        </Box>
                    </Box>
                </Box>
                <Routes>
                    <Route path='*' element={<Navigate to={'/Home'} />}></Route>
                    {route1.map((val, index) =>
                        <Route key={index} path={val.path} element={val.element}></Route>
                    )}
                </Routes>

            </Box>
        </>
    )
}