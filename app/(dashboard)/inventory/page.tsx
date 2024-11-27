"use client";
import React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/components/data-table'; // Sesuaikan dengan path komponen Anda
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '@/components/loading';
const initialRows: GridRowsProp = [];

// Fungsi untuk mengakses API
async function fetchRows(): Promise<GridRowsProp> {
  const response = await fetch("/api/inventory");
  const data = await response.json();

  return data.map((row: any) => ({
    id: row.id, // Pastikan id ada
    itemCode: row.itemCode,
    zahirCode: row.zahirCode,
    itemDescription: row.itemDescription,
    unit: row.unit,
    group: row.group,
    classification: row.classification,
    stock: row.stock,
    image: row.image,
    createdBy: row.createBy,
    updatedBy: row.updateBy,
    createdAt: new Date(row.createdAt),
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
  // {
  //   field: 'actions',
  //   type: 'actions',
  //   headerName: 'Actions',
  //   width: 100,
  //   cellClassName: 'actions',
  //   getActions: ({ id }) => {
  //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //     if (isInEditMode) {
  //       return [
  //         <GridActionsCellItem
  //           icon={<SaveIcon />}
  //           label="Save"
  //           sx={{
  //             color: 'primary.main',
  //           }}
  //           onClick={handleSaveClick(id)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<CancelIcon />}
  //           label="Cancel"
  //           className="textPrimary"
  //           onClick={handleCancelClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     }

  //     return [
  //       <GridActionsCellItem
  //         icon={<EditIcon />}
  //         label="Edit"
  //         className="textPrimary"
  //         onClick={handleEditClick(id)}
  //         color="inherit"
  //       />,
  //       <GridActionsCellItem
  //         icon={<DeleteIcon />}
  //         label="Delete"
  //         onClick={handleDeleteClick(id)}
  //         color="inherit"
  //       />,
  //     ];
  //   },
  // },
];
export default function Inventory() {
  const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
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
        defaultNewRow={(id) => ({ id, itemCode: '', zahirCode: '', itemDescription: '', unit: '', group: '', classification: '', inbound: '', outbound: '', stock: '', image: '', createdBy: '', updatedBy: '', createdAt: '', isNew: true })}
        title='Inventory'
      />
    </div>
  );
}
