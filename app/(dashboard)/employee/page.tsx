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
  // const response = await axios.get("/api/employees");
const response = await fetch('/api/employees');

  const data = await response.json();
  // const data = response.data;

  return data.map((row: any) => ({
    id: row.id, // Pastikan id ada
    fullName: row.fullName,
    address: row.address,
    phone: row.phone,
    position: row.position,
    shift: row.shift,

  }));
}
const columns: GridColDef[] = [
  { field: 'fullName', headerName: 'Full Name', width: 180, editable: true },
  {
    field: 'address',
    headerName: 'Address',
    // width: 80,
    align: 'left',
    headerAlign: 'left',
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 180,
    editable: true,
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 180,
    editable: true,
  },
  {
    field: 'shift',
    headerName: 'Shift',
    width: 220,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['A', 'B'],
  }
];
export default function Employee() {
  const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
  const { data: session } = useSession();

  React.useEffect(() => {
    fetchRows().then(data => {
      console.log("Rows set to state:", data);
        setRows(data);
    });
  }, []);
  // if (rows.length === 0) {
  //   return <Loading />; // Loading state
  // }
  return (
    <div>
      <h1>Employee</h1>
      <FullFeaturedCrudGrid
        columns={columns}
        rows={rows}
        defaultNewRow={(id) => ({ 
          id, 
          fullName: '',
          address: '',
          phone: '',
          position: '',
          shift: '',
          isNew: true
        })}
        title='Employee'
      />
    </div>
  );
}
