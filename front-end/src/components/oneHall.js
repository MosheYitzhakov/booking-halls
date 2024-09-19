import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Hall({ hall }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/halls/${hall.name_hall}`);
      }}
      sx={{
        display: "flex",
        border: "1px solid",
        marginLeft: "23%",
        marginTop: "20px",
        height: "100%",
        width: "50%",
      }}
    >
      <Button>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography gutterBottom variant="h5" component="div">
            {hall.name_hall}
            <Typography variant="h6" color="text.secondary">
              {hall.max_guests} כמות מוזמנים מקסימלי
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {hall.min_meals} מינימום מנות
            </Typography>
          </Typography>
        </CardContent>
      </Button>
      {hall?.images?.[0]?.name && (
        <CardMedia
          sx={{ flex: "1 0 auto", width: "35%", display: "inline-block" }}
          image={require(`../images/${hall?.images[0].name}`)}
        />
      )}
    </Card>
  );
}
