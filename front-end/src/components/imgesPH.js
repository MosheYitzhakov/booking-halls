import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "100%", height: "20%" }}
      variant="quilted"
      cols={4}
      rowHeight={350}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 2} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 100, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://www.kolhazman.co.il/wp-content/uploads/thumbs/%D7%90%D7%95%D7%9C%D7%9E%D7%99-%D7%90%D7%A8%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%97%D7%9F02-30q3hhvbyo4mte3mzaqe4q.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
];
