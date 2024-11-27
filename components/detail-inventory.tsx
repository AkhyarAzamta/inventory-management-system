"use client";
import { Box, Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

// Tipe data dinamis
interface DetailDataProps {
  data: Record<string, any>; // Data dinamis dengan field yang bervariasi
  title: string; // Judul komponen
}

export default function DetailData({ data, title }: DetailDataProps) {
  // Membagi data menjadi dua kolom jika lebih dari satu item
  const dataEntries = Object.entries(data);
  const mid = Math.ceil(dataEntries.length / 2); // Titik tengah untuk membagi data menjadi dua
  const leftColumn = dataEntries.slice(0, mid); // Bagian kiri
  const rightColumn = dataEntries.slice(mid); // Bagian kanan

  return (
    <Card sx={{ p: 2, width: "100%", height: 470 }}>
      {/* Judul komponen */}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {/* Menampilkan dua kolom jika lebih banyak data */}
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "500px", overflow: "auto" }}>
        {/* Kolom kiri */}
        <Box sx={{ width: "50%", maxHeight: "500px", overflowY: "auto" }}>
          <List dense>
            {leftColumn.map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText
                  primary={`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                  secondary={value}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Kolom kanan */}
        <Box sx={{ width: "50%", maxHeight: "500px", overflowY: "auto" }}>
          <List dense>
            {rightColumn.map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText
                  primary={`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                  secondary={value}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Card>
  );
}
