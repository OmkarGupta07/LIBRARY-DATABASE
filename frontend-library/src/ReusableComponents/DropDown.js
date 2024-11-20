import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({ data, selectedValue, setSelectedValue, label }) => {
  
  const transformedData = data.map(({ title, ...rest }) => ({
    name: title, // Rename 'title' to 'name'
    ...rest,     // Include the rest of the keys
  }));

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          label={label}
          value={selectedValue} 
          onChange={(e) =>setSelectedValue(e.target.value) } 
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {transformedData.map((ele) => (
            <MenuItem key={ele._id} value={ele._id}>
              {ele.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
