import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Hall({ hall }) {
  const navigate = useNavigate();
  const handlePageHall = async (name) => {

    // Implement your login logic here
    // console.log(`Login attempt with username: ${username} and password: ${password}`);
    // const { data } = await instance.get(`/users/${username}/${password}`);
    // if (typeof data === 'object') {
    //   localStorage.setItem("uesr", JSON.stringify(data))
      navigate(`/halls/${name}`)
    //   return console.log('ok');
    // } else {
    //   return setIncorrect(true)
    // }
};
console.log( hall.images[0].name);
  return (
    <Card sx={{ display: 'flex', border: '1px solid', margin: "12px", height: "20%", width: "50%" }}>

      <Button onClick={()=>{handlePageHall(hall.name_hall)}} size="small">לפרטים והזמנה</Button>
      
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="h5" component="div">
        {hall.name_hall}  שם אולם
        <Typography variant="h6" color="text.secondary">
         {hall.max_guests} מקסימום מוזמנים
        </Typography>
        <Typography variant="h6" color="text.secondary">
        {hall.min_meals} מינימום מנות
        </Typography>
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
      <CardMedia
        sx={{ flex: '1 0 auto', width: 250 ,display:"inline-block"}}
        title="green iguana"
        image={require('../images/im.jpeg')}
        alt="Live from space album cover"
      />
    </Card>
  );

}