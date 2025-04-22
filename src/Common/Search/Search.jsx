import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import instance from '../../Service/AxiosOrder';

export default function FreeSolo({ onSearch }) {
  const [pnames, setPnames] = React.useState([]); // Correctly initialize state

  const getProductNames = () => {
    instance.get('/getProductNames', {}) // Fetch product names from the backend
      .then(function (response) {
        const productNames = response.data.map((item) => item.name); // Extract product names
        setPnames(productNames); // Update state with product names
        console.log(productNames);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProductNames(); // Fetch product names when the component mounts
  }, []);

  const handleSearch = (event, value) => {
    if (onSearch) {
      onSearch(value); // Call the parent-provided callback with the selected product name
    }
  };
  const handleInputChange = (event, value) => {
    if (value === "") {
      console.log("Clear button pressed"); // Log when the clear button is pressed
      if (onSearch) {
        onSearch(""); // Notify the parent component that the input was cleared
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '20vw' }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={pnames} // Use the pnames array directly
        onChange={handleSearch}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search item"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                height: '50px',
              },
              '& .MuiInputBase-input': {
                fontSize: '16px', // Adjust font size
              },
              '& .MuiInputLabel-root': {
                fontSize: '14px', // Adjust font size of the label
              },
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    </Stack>
  );
}