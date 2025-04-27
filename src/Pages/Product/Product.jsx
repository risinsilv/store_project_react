import { Box } from "@mui/material";
import Textfield from "../../Common/Textfield";
import TextField from '@mui/material/TextField';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useRef } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import instance from '../../Service/AxiosOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Store the selected image
    const inputRef = useRef(null);

    
    const setProduct = () => {
        // Create a FormData object to send both text fields and the image
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        formData.append('image', inputRef.current.files[0]); // Append the selected image file
    
        // Send the FormData to the backend
        instance.post('/admin/setProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type
            },
        })
            .then((response) => {
                console.log(response.data.message);
                toast.success('Product added successfully!', {
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
            .catch((error) => {
                console.error('Error adding product:', error);
                toast.error('Failed to add product.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Generate a preview URL for the image
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Box sx={{ width: '40%', height: '800px', borderRadius: "30px",boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', }}>

            <AddBoxIcon
                    sx={{
                        color: '#acd4f7',
                        fontSize: '50px',
                        marginTop: '20px',
                        marginLeft: '20px',
                        transition: 'transform 0.2s ease-in-out', // Smooth transition
                        '&:hover': {
                            transform: 'scale(0.8)', // Make the icon smaller on hover
                        },
                    }}
                    onClick={setProduct} // Call setProduct when the icon is clicked
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Box
                        sx={{
                            width: '200px',
                            border: '5px solid #acd4f7',
                            borderRadius: "30px",
                            marginTop: '20px',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundImage: image ? `url(${image})` : 'none', // Set background if image is selected
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        onClick={() => inputRef.current.click()}
                    >
                        {!image && <AddPhotoAlternateIcon sx={{ color: '#acd4f7', fontSize: '100px' }} />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="file-input"
                            ref={inputRef}
                        />
                    </Box>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        sx={{ width: '450px', borderRadius: "30px", marginTop: '70px' }}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Textfield label='Name' width='80%' function={setName} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Textfield label='Price' width='80%' function={setPrice} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Textfield label='Stock' width='80%' function={setStock} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Textfield label='Category' width='80%' function={setCategory} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
}