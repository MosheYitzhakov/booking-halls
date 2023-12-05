

// export const Hall = ()=>{
// return (
//     <>
//     <img src="" alt="r" />
//     <b> {`<שם האולם>`} :אולם </b>
//     <b> {`<מספר >`} :מינימום מנות </b>
//     <b> {`<מספר >`}  :מקסימום מוזמנים  </b>
//     <input type="button" value='לפרטים'></input>
//     </>
// )
// }
// export default Hall


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
  return (
    <Card sx={{ display: 'flex', border: '1px solid', margin: "12px", height: "20%", width: "50%" }}>

      <Button onClick={()=>{handlePageHall(hall)}} size="small">לפרטים והזמנה</Button>
      
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="h5" component="div">
          שם אולם
        </Typography>
        <Typography variant="h6" color="text.secondary">
          מינימום
        </Typography>
        <Typography variant="h6" color="text.secondary">
          מינימום מנות
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
      <CardMedia
        sx={{ flex: '1 0 auto', width: 250 }}
        image="https://www.kolhazman.co.il/wp-content/uploads/thumbs/%D7%90%D7%95%D7%9C%D7%9E%D7%99-%D7%90%D7%A8%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%97%D7%9F02-30q3hhvbyo4mte3mzaqe4q.jpg"
        title="green iguana"
      />
    </Card>
  );

}

