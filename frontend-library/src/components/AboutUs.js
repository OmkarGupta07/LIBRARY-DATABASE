import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import image from './eren_img.jpg';

   
   const AboutUs=()=> {
    return (
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img src={image} alt="profile-picture" />
        </CardHeader>
        <CardContent className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Omkar Gupta
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Developer 
          </Typography>
        </CardContent>
        <CardActions className="flex justify-center gap-7 pt-2">
          <Tooltip content="Like">
            <Typography
              as="a"
              href="#facebook"
              variant="lead"
              color="blue"
              textGradient
            >
              <i className="fab fa-facebook" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#twitter"
              variant="lead"
              color="light-blue"
              textGradient
            >
              <i className="fab fa-twitter" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#instagram"
              variant="lead"
              color="purple"
              textGradient
            >
              <i className="fab fa-instagram" />
            </Typography>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }

  export default AboutUs;