import { Box, useMediaQuery, useTheme } from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from 'react'
import loginback from '../../assets/loginback1.jpg'
import loginback1 from '../../assets/loginback1.1.jpg'
import "@fontsource/bebas-neue"; // Defaults to weight 400
import "@fontsource/bebas-neue/400.css"; // Specify weight
import * as React from 'react';
import instance from '../../Service/AxiosOrder';
import Textfield from "../../Common/Textfield";
import Passwordfield from "../../Common/Passwordfield";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


export default function Login() {
    const [emailT, setEmail] = useState('');
    const [passwordT, setPassword] = useState('');
    const [nameT, setNameT] = useState('')
    const [repassword, setRepassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [register, setRegister] = useState(false);
    const [alignment, setAlignment] = React.useState('web');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment === '1') {
            setRegister(false);
        } else if (newAlignment === '0') {
            setRegister(true);
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
                console.log(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                handleClose()
            });

    }
    const reg = () => {
        handleOpen()
        instance.post('/login/register', {
            name: nameT,
            email: emailT,
            password: passwordT
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
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
            <Box sx={{ backgroundColor: 'white', width: '60%', borderRadius: '30px', display: 'flex', border: '5px solid white', justifyContent: matches ? '':'center', }}>
            {matches  && (<>
                <Box sx={{ width: '50%', height: '740px', backgroundColor: 'white', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px', backgroundImage: `url(${loginback1})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            </Box>
            </>)}
                    
                <Box sx={{ width: matches ? '50%' :'100%',}}>
                    <Box sx={{ color: '#95a6fe', fontFamily: 'bebas neue', fontSize: matches ?  '160px': '50px', fontWeight: '400', display: 'flex', justifyContent: 'left', marginLeft:'25px'}}>{register ? 'Sign up' : 'Login'}</Box>
                    
                    {!register ? (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                <Textfield label='Email' function={setEmail} width='80%'/>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                <Passwordfield function={setPassword} label='Password' w/>
                            </Box>
                        </>
                    )
                        : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                    <Textfield label='Name' function={setNameT} width='80%'/>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Textfield label='Email' function={setEmail} width='80%'/>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Passwordfield function={setPassword} label='Password' />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Passwordfield function={setRepassword} label='Re enter password' />
                                </Box>


                            </>
                        )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: register ? '10px' : '50px' }}>

                        <Button
                            sx={{
                                backgroundColor: '#95a6fe',
                                color: 'white',
                                height: '50px',
                                fontSize: '20px',
                                width: '150px',
                                fontWeight: '700',
                                fontFamily: 'bebas neue',
                                borderRadius: '30px',
                            }}
                            onClick={register ? reg : login} // Dynamically set the onClick handler
                        >
                            {register ? 'Sign up' : 'Log in'} {/* Dynamically set the button text */}
                        </Button>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={open}
                        >
                            <CircularProgress sx={{backgroundColor:'#95a6fe', scale:'2', color:'transparent'}} />
                        </Backdrop>

                    </Box>
                    <Box sx={{fontFamily:'inter',marginLeft:'30px',marginTop:register ? '55px':'140px',fontWeight:'600', color:'#C0C0C0'}}>
                        do you have an account? <Button sx={{ color: '#95a6fe', fontFamily: 'inter', fontSize: '20px', fontWeight:'700'}} onClick={() => { setRegister(!register) }}>{register ? 'Login' : 'Sign Up'}</Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )

}