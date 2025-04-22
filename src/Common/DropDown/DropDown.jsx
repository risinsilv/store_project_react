import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import instance from '../../Service/AxiosOrder';

export default function DropDown({ onCategoryChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = React.useState([]); // State to store categories
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCategories = () => {
    instance.get('/getCategories', {}) // Fetch categories from the backend
      .then(function (response) {
        // Map the response to extract the category names if the response contains objects
        const categoryNames = response.data.map((item) => item.category);
        setCategories(['All', ...categoryNames]); // Add "All" to show all products
        console.log(categoryNames);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getCategories(); // Fetch categories when the component mounts
  }, []);

  const handleCategorySelect = (category) => {
    onCategoryChange(category); // Call the callback with the selected category
    handleClose(); // Close the dropdown menu
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map((category, index) => (
          <MenuItem key={index} onClick={() => handleCategorySelect(category)}>
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}