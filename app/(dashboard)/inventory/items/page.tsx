"use client";
import React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/components/data-table';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '@/components/loading';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const initialRows: GridRowsProp = [];

async function fetchRows(): Promise<GridRowsProp> {
  try {
    const response = await axios.get("/api/items");
    const data = response.data;

    return data.map((row: any) => ({
      id: row.id,
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
    }));
  } catch (error) {
    console.error("Error fetching rows:", error);
    return [];
  }
}

const columns: GridColDef[] = [
  { field: 'itemCode', headerName: 'ItemCode', width: 180, editable: true },
  { field: 'zahirCode', headerName: 'Zahir Code', align: 'left', headerAlign: 'left', editable: true },
  { field: 'itemDescription', headerName: 'Item Description', width: 180, editable: true },
  { field: 'unit', headerName: 'Unit', width: 220, editable: true, type: 'singleSelect', valueOptions: ['Pcs', 'Kg'] },
  { field: 'group', headerName: 'Group', width: 180, editable: true, type: 'singleSelect', valueOptions: ['Lokal', 'Import', 'Random'] },
  { field: 'classification', headerName: 'Classifications', width: 180, editable: true, type: 'singleSelect', valueOptions: ['Sparepart', 'Consumable', 'Assets'] },
  { field: 'price', headerName: 'Price', type: 'number', width: 100, editable: true },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 100, editable: true },
];

export default function Items() {
  const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
  const [isLoading, setIsLoading] = React.useState(true);
  const { data: session } = useSession();

  React.useEffect(() => {
    setIsLoading(true);
    fetchRows()
      .then(data => {
        console.log("Rows set to state:", data);
        setRows(data);
      })
      .catch(error => console.error("Failed to fetch rows:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
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
          isNew: true,
        })}
        title='Items'
      />
    </div>
  );
}
