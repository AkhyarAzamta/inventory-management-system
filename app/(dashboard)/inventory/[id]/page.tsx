"use client";
import FullFeaturedCrudGrid from '@/components/data-table';
import DetailInventory from '@/components/detail-inventory';
import CustomImageList from '@/components/image-list'
import { Box } from '@mui/material';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId
} from '@mui/x-data-grid-generator';
import React from 'react'
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    // featured: true,
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
const inventoryData = {
  // id: "1",
  itemCode: "Code001",
  zahirCode: "Zahir001",
  // itemDescription: "Sample Item 1",
  unit: "pcs",
  group: "Group A",
  classification: "Class 1",
  inbound: 10,
  outbound: 5,
  stock: 5,
  // image: "image1.jpg",
  createdBy: "admin",
  updatedBy: "admin",
  createdAt: "2024-11-01",
  updatedAt: "2024-11-15",
};
const title = {
  itemDescription: "Sample Item 1",
};
const columns: GridColDef[] = [
  { field: 'itemCode', headerName: 'ItemCode', width: 180, editable: true },
  {
    field: 'zahirCode',
    headerName: 'Zahir Code',
    // width: 80,
    align: 'left',
    headerAlign: 'left',
    editable: true,
  },
  {
    field: 'itemDescription',
    headerName: 'Item Description',
    // type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 220,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['Market', 'Finance', 'Development'],
  },
  { field: 'group', headerName: 'Group', width: 180, editable: true },
  { field: 'classification', headerName: 'Classifications', width: 180, editable: true },
  { field: 'inbound', headerName: 'Inbound', type: 'number', width: 180, editable: true },
  { field: 'outbound', headerName: 'Outbound', type: 'number', width: 180, editable: true },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 180, editable: true },
  { field: 'image', headerName: 'Image', width: 180, editable: true },
  { field: 'createdBy', headerName: 'Created By', width: 180, editable: true },
  { field: 'updatedBy', headerName: 'Updated By', width: 180, editable: true },
  { field: 'createdAt', headerName: 'Created At', type: 'date', width: 180, editable: true },
];

const rows: GridRowsProp = [
  {
    id: randomId(),
    itemCode: randomTraderName(),
    zahirCode: randomTraderName(),
    itemDescription: randomTraderName(),
    unit: randomTraderName(),
    group: randomTraderName(),
    classification: randomTraderName(),
    inbound: 2,
    outbound: 2,
    stock: 2,
    image: randomTraderName(),
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: randomCreatedDate(),
    updatedAt: randomCreatedDate()
  }
];
export default function Detail() {
  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <CustomImageList
        data={itemData}
        width={540}
        // height={500}
        // rowHeight={150}
        gap={2}
      />
      {/* <DetailInventory /> */}
      <DetailInventory data={inventoryData} title={title.itemDescription} />
      </Box>
      <FullFeaturedCrudGrid
        columns={columns}
        rows={rows}
        defaultNewRow={(id) => ({ id, itemCode: '', zahirCode: '', itemDescription: '', unit: '', group: '', classification: '', inbound: '', outbound: '', stock: '', image: '', createdBy: '', updatedBy: '', createdAt: '', isNew: true })}
        title='Inventory Inbound'
      />
      <FullFeaturedCrudGrid
        columns={columns}
        rows={rows}
        defaultNewRow={(id) => ({ id, itemCode: '', zahirCode: '', itemDescription: '', unit: '', group: '', classification: '', inbound: '', outbound: '', stock: '', image: '', createdBy: '', updatedBy: '', createdAt: '', isNew: true })}
        title='Inventory Outbound'
      />
    </Box>
  )
}
