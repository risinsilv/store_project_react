import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Service/AxiosOrder';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UpdateProduct(props) {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState(props.image || null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        setName(props.name || '');
        setPrice(props.price || '');
        setStock(props.stock || '');
        setCategory(props.category || '');
        setDescription(props.description || '');
        setImage(props.image || null);
    }, [props.name, props.price, props.stock, props.category, props.description, props.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            inputRef.current = file; // Store the file for FormData
        }
    };

    const updateProduct = () => {
        if (!name || !price || !stock || !category || !description) {
            toast.error('Please fill in all fields.', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        const formData = new FormData();
        formData.append('ID', props.id); // Assuming you have the product ID to update
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        if (inputRef.current) {
            formData.append('image', inputRef.current);
        }

        instance.put('/admin/updateProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data.message);
                toast.success('Product updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
                window.location.reload();
                props.handleClose();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                toast.error('Failed to update product.', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            });
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <BootstrapDialog onClose={props.handleClose} open={props.open}>
                <Box sx={{ width: '400px', height: 'auto', margin: '30px', borderRadius: '20px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: '700', fontFamily: 'inter' }}>
                            Update Product
                        </Typography>
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            width: '200px',
                            height: '200px',
                            border: '2px dashed #acd4f7',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundImage: image ? `url(${image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginTop: '20px',
                        }}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        {!image && (
                            <Typography sx={{ color: '#acd4f7', fontSize: '16px' }}>
                                Click to upload an image
                            </Typography>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="file-input"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            label="Price"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            label="Stock"
                            fullWidth
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            label="Category"
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ marginBottom: '15px' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#acd4f7',
                                color: 'black',
                                fontWeight: '700',
                                fontFamily: 'inter',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                '&:hover': {
                                    backgroundColor: '#95a6fe',
                                    transform: 'scale(1.05)',
                                },
                            }}
                            onClick={updateProduct}
                        >
                            Update Product
                        </Button>
                    </Box>
                </Box>
            </BootstrapDialog>
        </React.Fragment>
    );
}