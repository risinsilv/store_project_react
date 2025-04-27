import { Box, Button } from '@mui/material';
import loginback from '../../assets/loginback4.jpg';
import Search from '../../Common/Search/Search';
import DropDown from '../../Common/DropDown/DropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import instance from '../../Service/AxiosOrder';
import Addtocartpopup from '../../Common/AddToCartPopUp/AddToCartPopUp';
import UpdateProduct from '../../Common/UpdateProductPopup/UpdateProduct';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [selectedCategory, setSelectedCategory] = useState('');

    const [pname, setPname] = useState('');
    const [pstock, setStock] = useState(0);
    const [pprice, setPrice] = useState(0);
    const [pcategory, setCategory] = useState('');
    const [pimage, setImage] = useState('');
    const [pid, setPid] = useState('');
    const [pdescription, setDescription] = useState('');

    const [openAddToCart, setOpenAddToCart] = useState(false);
    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);

    const role = localStorage.getItem('role'); // Get the role from local storage
    const handleClickOpenAddToCart = (name, stock, image, category, price, id, description) => {
        setOpenAddToCart(true);
        setPname(name);
        setStock(stock);
        setPrice(price);
        setCategory(category);
        setImage(image);
        setPid(id);
        setDescription(description);
    };

    const handleCloseAddToCart = () => {
        setOpenAddToCart(false);
    };

    const handleClickOpenUpdateProduct = (name, stock, image, category, price, id, description) => {
        setOpenUpdateProduct(true);
        setPname(name);
        setStock(stock);
        setPrice(price);
        setCategory(category);
        setImage(image);
        setPid(id);
        setDescription(description);
    };

    const handleCloseUpdateProduct = () => {
        setOpenUpdateProduct(false);
    };

    const getProducts = () => {
        instance.get('/getProducts', {})
            .then(function (response) {
                setProducts(response.data || []); // Fallback to an empty array if response.data.products is undefined
                setFilteredProducts(response.data || []); // Initialize filtered products
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // Update selected category
        if (category === 'All') {
            setFilteredProducts(products); // Show all products if "All" is selected
        } else {
            setFilteredProducts(products.filter((product) => product.category === category)); // Filter products by category
        }
    };

    const handleSearch = (name) => {
        if (name === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((product) => product.name === name));
        }
    };

    useEffect(() => {
        getProducts(); // Fetch products when the component mounts
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginTop: '50px' }}>
                <Box
                    sx={{
                        width: '95%',
                        height: '660px',
                        backgroundImage: `url(${loginback})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            color: 'black',
                            fontFamily: 'bebas neue',
                            fontSize: '160px',
                            fontWeight: '400',
                            display: 'flex',
                            justifyContent: 'left',
                            width: '650px',
                            marginLeft: '60px',
                        }}
                    >
                        Welcome to our online store.
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginTop: '50px' }}>
                <Box sx={{ width: '95%' }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ margin: '20px' }}>
                            <DropDown onCategoryChange={handleCategoryChange} />
                        </Box>
                        <Box sx={{ margin: '20px' }}>
                            <Search onSearch={handleSearch} />
                        </Box>
                    </Box>
                    <Addtocartpopup
                        open={openAddToCart}
                        handleClose={handleCloseAddToCart}
                        name={pname}
                        stock={pstock}
                        category={pcategory}
                        image={pimage}
                        price={pprice}
                        id={pid}
                    />
                    <UpdateProduct
                        open={openUpdateProduct}
                        handleClose={handleCloseUpdateProduct}
                        name={pname}
                        stock={pstock}
                        category={pcategory}
                        image={pimage}
                        price={pprice}
                        id={pid}
                        description={pdescription}
                        
                    
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '50px', flexWrap: 'wrap' }}>
                        {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
                            <Box sx={{ fontFamily: 'inter', fontSize: '20px', fontWeight: '700', color: '#95a6fe' }}>
                                No products available.
                            </Box>
                        ) : (
                            filteredProducts.map((product) => (
                                <Box
                                    key={product.ID}
                                    sx={{
                                        width: '400px',
                                        height: '550px',
                                        backgroundColor: 'white',
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                        margin: '30px',
                                        borderRadius: '20px',
                                        position: 'relative',
                                        '&:hover': {
                                            transform: 'scale(0.95)', // Enlarge the icon on hover
                                            backgroundColor: '#acd4f7', // Change color on hover
                                        },
                                        transition: '0.5s',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '10px',
                                            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Enlarge the icon on hover
                                                color: 'white', // Change color on hover
                                            },
                                            '&:active': {
                                                transform: 'scale(1)', // Reset size on click
                                                color: 'black', // Change color on click
                                            },
                                        }}
                                        onClick={() =>
                                            handleClickOpenAddToCart(
                                                product.name,
                                                product.stock,
                                                product.image,
                                                product.category,
                                                product.price,
                                                product.ID,
                                                product.description
                                            )
                                        }
                                    >
                                        <ShoppingCartIcon sx={{ fontSize: '50px' }} />
                                    </Box>
                                    {role === 'admin' && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: '10px',
                                                top: '10px',
                                                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.2)', // Enlarge the icon on hover
                                                    color: 'white', // Change color on hover
                                                },
                                                '&:active': {
                                                    transform: 'scale(1)', // Reset size on click
                                                    color: 'black', // Change color on click
                                                },
                                            }}
                                            onClick={() =>
                                                handleClickOpenUpdateProduct(
                                                    product.name,
                                                    product.stock,
                                                    product.image,
                                                    product.category,
                                                    product.price,
                                                    product.ID,
                                                    product.description
                                                )
                                            }
                                        >
                                            <AddIcon sx={{ fontSize: '50px', color:'red' }} />
                                        </Box>
                                    )}
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box
                                            sx={{
                                                width: '250px',
                                                height: '250px',
                                                backgroundImage: `url(${product.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '20px',
                                                marginTop: '25px',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            marginTop: '20px',
                                            marginLeft: '25px',
                                            fontFamily: 'inter',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            color: '#C0C0C0',
                                        }}
                                    >
                                        {product.category}
                                    </Box>
                                    <Box
                                        sx={{
                                            marginTop: '5px',
                                            marginLeft: '25px',
                                            fontFamily: 'inter',
                                            fontSize: '25px',
                                            fontWeight: '700',
                                            color: 'black',
                                        }}
                                    >
                                        {product.name}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            marginTop: '10px',
                                            width: '90%',
                                            marginLeft: '25px',
                                            fontFamily: 'inter',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            color: 'black',
                                            height: '100px',
                                        }}
                                    >
                                        {product.description}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                                        <Box
                                            sx={{
                                                fontFamily: 'inter',
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: 'black',
                                            }}
                                        >
                                            ${product.price}
                                        </Box>
                                        <Box
                                            sx={{
                                                fontFamily: 'inter',
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: 'black',
                                            }}
                                        >
                                            {product.stock} items
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}