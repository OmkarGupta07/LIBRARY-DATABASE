import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const DropDown=({data,selectedValue,setSelectedValue})=>{


        return (
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Author"
                      value={selectedValue} 
                      onChange={(e) => 
                        {setSelectedValue(e.target.value)}}
                    >
                 {data.map(ele =>
                      <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              );
}




export default DropDown;