import useFetchBooks from "../utils/useFetchBooks";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";


const RenderBooks = () => {
  let navigate=useNavigate();
    const data = useFetchBooks();
    console.log(data);
    
  return ( 
  <div className="flex">
    {data.map(ele =>  {return ( 
    <Card sx={{ maxWidth: 345 }} key={ele._id}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ele?.coverImageUrl}
          alt={ele?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {ele?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {ele?.authorName}
          </Typography>
          <Typography><EditIcon  onClick={e => navigate('/CreateBooks', { state: { id: ele._id } } ) }/> <DeleteOutlinedIcon/> </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    ) }
    ) }
  </div>
  )
  };


export default RenderBooks;