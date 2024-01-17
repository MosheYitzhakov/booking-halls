import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Hall({hall}) {
  const navigate = useNavigate();
  const handlePageHall = async (name) => {
      navigate(`/halls/${name}` )
};
  return (
    <Card onClick={()=>{handlePageHall(hall.name_hall)}} sx={{ display: 'flex', border: '1px solid', marginLeft: "23%",marginTop:"20px", height: "100%", width: "50%" }}>

      <Button onClick={()=>{handlePageHall(hall.name_hall)}} size="small">לפרטים והזמנה</Button>
      
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="h5" component="div">
        {hall.name_hall}  שם אולם
        <Typography variant="h6" color="text.secondary">
         {hall.max_guests} כמות מוזמנים מקסימלי 
        </Typography>
        <Typography variant="h6" color="text.secondary">
        {hall.min_meals} מינימום מנות
        </Typography>
        </Typography>
      </CardContent>
      {/* <CardActions>
      </CardActions> */}
      
  { hall?.images?.[0]?.name &&   <CardMedia
        sx={{ flex: '1 0 auto', width: 250 ,display:"inline-block"}}
        title="green iguana"
        image={require(`../images/${hall?.images[0].name}`)}
        alt="Live from space album cover"
      />}
    </Card>
  );

}