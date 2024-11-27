"use client";
import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Card, CardContent, Paper, Typography } from '@mui/material';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface ImageData {
  img: string;
  title: string;
  author?: string;
  featured?: boolean;
}

interface CustomImageListProps {
  data: Array<ImageData>;
  width?: number;
  height?: number;
  rowHeight?: number;
  gap?: number;
}

const CustomImageList: React.FC<CustomImageListProps> = ({
  data,
  width = 500,
  height = 400,
  rowHeight = 200,
  gap = 1,
}) => {
  // Pastikan setidaknya ada satu gambar `featured: true` secara default
  const defaultData = data.map((item, index) => ({
    ...item,
    featured: index === 0 ? true : item.featured || false, // Set `featured: true` untuk gambar pertama jika tidak diatur
  }));

  const [imageData, setImageData] = useState(defaultData);

  const handleImageClick = (index: number) => {
    // Set semua gambar lain ke `featured: false` kecuali yang diklik
    setImageData((prev) =>
      prev.map((item, i) => ({
        ...item,
        featured: i === index, // Hanya set `featured: true` untuk gambar yang diklik
      }))
    );
  };

  return (
    <Card sx={{ maxWidth: width+500, height:height+70, p: 1, width: '100%', alignItems: 'center' }}>
    <ImageList
      sx={{
        width,
        height,
        transform: 'translateZ(0)',
      }}
      rowHeight={rowHeight}
      gap={gap}
    > 
      {imageData.map((item, index) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem
            key={item.img}
            cols={cols}
            rows={rows}
            onClick={() => handleImageClick(index)} // Tambahkan event klik
            style={{ cursor: 'pointer' }} // Tambahkan gaya untuk menunjukkan bahwa gambar bisa diklik
          >
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: item.featured ? 'yellow' : 'white' }} // Highlight ikon jika `featured` aktif
                  aria-label={`star ${item.title}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    </Card>
  );
};

export default CustomImageList;
