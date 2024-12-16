"use client";
import React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/components/data-table'; // Sesuaikan dengan path komponen Anda
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '@/components/loading';
import { set, update } from 'lodash';
import { useSession } from 'next-auth/react';
import axios from 'axios';
const initialRows: GridRowsProp = [];

// Fungsi untuk mengakses API
async function fetchRows(): Promise<GridRowsProp> {
  const response = await axios.get("/api/items");
  // const data = await response.json();
  const data = response.data;

  return data.map((row: any) => ({
    id: row.id, // Pastikan id ada
    itemCode: row.itemCode,
    zahirCode: row.zahirCode,
    itemDescription: row.itemDescription,
    unit: row.unit,
    group: row.group,
    classification: row.classification,
    price: row.price,
    stock: row.stock,
    image: row.image,
    createdBy: row.createBy,
    updatedBy: row.updateBy,
    // createdAt: new Date(row.createdAt),
  }));
}
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
    valueOptions: ['Pcs', 'Kg'],
  },
  { field: 'group', headerName: 'Group', width: 180, editable: true, type: 'singleSelect', valueOptions: ['Lokal', 'Import', 'Random']},
  { field: 'classification', headerName: 'Classifications', width: 180, editable: true, type: 'singleSelect', valueOptions: ['Sparepart', 'Consumable', 'Assets'] },
  { field: 'price', headerName: 'Price', type: 'number', width: 100, editable: true },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 100, editable: true },
  // { field: 'createdBy', headerName: 'Created By', width: 180},
  // { field: 'updatedBy', headerName: 'Updated By', width: 180},
  // { field: 'createdAt', headerName: 'Created At', type: 'date', width: 180}
];
export default function Inventory() {
  const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
  const { data: session } = useSession();

  React.useEffect(() => {
    fetchRows().then(data => {
      console.log("Rows set to state:", data);
        setRows(data);
    });
  }, []);
  if (rows.length === 0) {
    return <Loading />; // Loading state
  }
  return (
    <div>
      <h1>Data Grid</h1>
      <FullFeaturedCrudGrid
        columns={columns}
        rows={rows}
        defaultNewRow={(id) => ({ 
          id, 
          itemCode: '',
          zahirCode: '', 
          itemDescription: '', 
          unit: '', 
          group: '', 
          classification: '', 
          price: '',
          stock: '', 
          image: '', 
          createdBy: session?.user?.name, 
          updatedBy: session?.user?.name, 
          createdAt: '', 
          updatedAt: '',
          isNew: true 
        })}
        title='Inventory'
      />
    </div>
  );
}
