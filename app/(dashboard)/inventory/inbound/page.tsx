"use client";
import React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/components/data-table'; // Sesuaikan dengan path komponen Anda
import {
  randomCreatedDate,
  randomTraderName,
  randomId
} from '@mui/x-data-grid-generator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


// Definisikan kolom dan data yang akan ditampilkan
// const columns: GridColDef[] = [
//   { field: 'name', headerName: 'Name', width: 180, editable: true },
//   { field: 'age', headerName: 'Age', type: 'number', width: 100, editable: true },
//   { field: 'role', headerName: 'Role', width: 180, editable: true },
//   // Tambahkan kolom lain sesuai kebutuhan
// ];

// const rows: GridRowsProp = [
//   { id: 1, name: 'John Doe', age: 30, role: 'Market' },
//   { id: 2, name: 'Jane Smith', age: 25, role: 'Finance' },
//   // Tambahkan data lain sesuai kebutuhan
// ];

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
  { field: 'createdAt', headerName: 'Created At', type: 'date', width: 180, editable: true }
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

export default function Inbound() {
  return (
    <div>
      <h1>Data Grid</h1>
      <FullFeaturedCrudGrid
        columns={columns}
        rows={rows}
        defaultNewRow={(id) => ({ id, itemCode: '', zahirCode: '', itemDescription: '', unit: '', group: '', classification: '', inbound: '', outbound: '', stock: '', image: '', createdBy: '', updatedBy: '', createdAt: '', isNew: true })}
        title='Inventory Inbound'
      />
    </div>
  );
}
