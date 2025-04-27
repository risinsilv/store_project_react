import { Box, useMediaQuery, useTheme } from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from 'react'
import loginback from '../../assets/loginback4.jpg'
import loginback1 from '../../assets/loginback4.jpg'
import "@fontsource/bebas-neue"; // Defaults to weight 400
import "@fontsource/bebas-neue/400.css"; // Specify weight
import * as React from 'react';
import instance from '../../Service/AxiosOrder';
import Textfield from "../../Common/Textfield";
import Passwordfield from "../../Common/Passwordfield";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Button1 from "../../Common/Button1/Button1";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function welcomePage() {
    const [emailT, setEmail] = useState('');
    const [passwordT, setPassword] = useState('');
    const [nameT, setNameT] = useState('')
    const [repassword, setRepassword] = useState('')
    const [register, setRegister] = useState(false);
    const [alignment, setAlignment] = React.useState('web');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = useState('user');

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole); // Update the role when toggled
        }
    };



    const login = () => {
        handleOpen()
        instance.post('login/login', {
            email: emailT,
            password: passwordT
        })
            .then(function (response) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', response.data.userID)
                localStorage.setItem('role', response.data.role)
                console.log(response.data.role)
                console.log(response.data.userID)
                console.log(response.data.token);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Login failed. Please check your credentials.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
            .finally(function () {
                handleClose()
            });

    }
    const reg = () => {
        handleOpen()
        // Check if passwords match
        if (passwordT !== repassword) {
            toast.error("Passwords do not match. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleClose(); // Close the backdrop
            return; // Stop further execution
        }

        instance.post('/login/register', {
            name: nameT,
            email: emailT,
            password: passwordT,
            role: role
        })
            .then(function (response) {
                console.log(response);
                toast.success("Registration successful! Please log in.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Registration failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .finally(function () {
                handleClose()
            });

    }

    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', backgroundImage: `url(${loginback})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '100vh', alignItems: 'center', backgroundColor: '#818589', '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darkens the background
                zIndex: 1
            }, '& > *': { zIndex: 2 }
        }}>
            <Box sx={{ backgroundColor: 'white', width: '60%', borderRadius: '30px', display: 'flex', border: '5px solid white', justifyContent: matches ? '' : 'center', }}>
                {matches && (<>
                    <Box sx={{ width: '50%', height: '740px', backgroundColor: 'white', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px', backgroundImage: `url(${loginback1})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    </Box>
                </>)}

                <Box sx={{ width: matches ? '50%' : '100%', }}>
                    <Box sx={{ color: '#acd4f7', fontFamily: 'bebas neue', fontSize: matches ? '160px' : '50px', fontWeight: '400', display: 'flex', justifyContent: 'left', marginLeft: '25px', WebkitTextStroke: '2px black', }}>{register ? 'Sign up' : 'Login'}</Box>

                    {!register ? (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                <Textfield label='Email' function={setEmail} width='80%' />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                <Passwordfield function={setPassword} label='Password' w />
                            </Box>
                        </>
                    )
                        : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Textfield label='Name' function={setNameT} width='80%' />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Textfield label='Email' function={setEmail} width='80%' />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Passwordfield function={setPassword} label='Password' />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Passwordfield function={setRepassword} label='Re enter password' />
                                </Box>

                                {/* Role Toggle */}
                                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px', marginRight:'40px' }}>
                                    <ToggleButtonGroup
                                        value={role}
                                        exclusive
                                        onChange={handleRoleChange}
                                        aria-label="User Role"
                                        sx={{
                                            backgroundColor: '#f5f5f5', // Background color for the group
                                            borderRadius: '30px', // Rounded corners for the group
                                            padding: '5px', // Padding inside the group
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                                        }}
                                    >
                                        <ToggleButton
                                            value="user"
                                            aria-label="User"
                                            sx={{
                                                backgroundColor: role === 'user' ? '#acd4f7' : 'white', // Highlight selected button
                                                color: role === 'user' ? 'black' : '#757575', // Change text color for selected button
                                                fontWeight: '700', // Bold text
                                                fontFamily: 'bebas neue',
                                                fontSize: '16px',
                                                borderRadius: '30px', // Rounded corners for buttons
                                                border: '1px solid #acd4f7', // Border color
                                                '&:hover': {
                                                    backgroundColor: '#acd4f7', // Hover effect
                                                    color: 'black',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: '#acd4f7', // Selected button background
                                                    color: 'black', // Selected button text color
                                                },
                                            }}
                                        >
                                            User
                                        </ToggleButton>
                                        <ToggleButton
                                            value="admin"
                                            aria-label="Admin"
                                            sx={{
                                                backgroundColor: role === 'admin' ? '#acd4f7' : 'white', // Highlight selected button
                                                color: role === 'admin' ? 'black' : '#757575', // Change text color for selected button
                                                fontWeight: '700', // Bold text
                                                fontFamily: 'bebas neue',
                                                fontSize: '16px',
                                                borderRadius: '30px', // Rounded corners for buttons
                                                border: '1px solid #acd4f7', // Border color
                                                '&:hover': {
                                                    backgroundColor: '#acd4f7', // Hover effect
                                                    color: 'black',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: '#acd4f7', // Selected button background
                                                    color: 'black', // Selected button text color
                                                },
                                            }}
                                        >
                                            Admin
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </>
                        )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: register ? '10px' : '50px' }}>

                        <Button
                            sx={{
                                backgroundColor: '#acd4f7',
                                color: 'black',
                                height: '50px',
                                fontSize: '20px',
                                width: '150px',
                                fontWeight: '700',
                                fontFamily: 'bebas neue',
                                borderRadius: '30px',
                                border: '2px solid black',

                            }}
                            onClick={register ? reg : login} // Dynamically set the onClick handler
                        >
                            {register ? 'Sign up' : 'Log in'} {/* Dynamically set the button text */}
                        </Button>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={open}
                        >
                            <CircularProgress sx={{ backgroundColor: '#acd4f7', scale: '2', color: 'transparent' }} />
                        </Backdrop>

                    </Box>
                    <Box sx={{ fontFamily: 'inter', marginLeft: '30px', marginTop: register ? '10px' : '142px', fontWeight: '600', color: '#C0C0C0' }}>
                        do you have an account? <Button sx={{ color: '#acd4f7', fontFamily: 'inter', fontSize: '20px', fontWeight: '700' }} onClick={() => { setRegister(!register) }}>{register ? 'Login' : 'Sign Up'}</Button>
                    </Box>
                </Box>
            </Box>
            <ToastContainer />
        </Box >
    )

}