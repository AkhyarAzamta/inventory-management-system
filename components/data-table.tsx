"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Button, { ButtonProps } from '@mui/material/Button';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  useGridApiContext,
  GridCsvExportOptions,
  GridCsvGetRowsToExportParams,
  gridExpandedSortedRowIdsSelector,
} from '@mui/x-data-grid';
import { createSvgIcon, Paper, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

type FullFeaturedCrudGridProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  defaultNewRow: (id: GridRowId) => GridRowModel; // Function to define the structure of new rows
  title: string;
};

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
    defaultNewRow: (id: GridRowId) => GridRowModel; // Tambahkan properti ini
  }
}
const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);
const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridExpandedSortedRowIdsSelector(apiRef);

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel, defaultNewRow } = props;
  const apiRef = useGridApiContext();
const pathname = usePathname();
  const handleClick = () => {
    const id = Math.random().toString(36).substr(2, 9); // Generate random ID
    console.log(pathname)
    setRows((oldRows) => [
      ...oldRows,
      defaultNewRow(id), // Use the reusable function
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'itemCode' },
    }));
  };
  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options);
  const buttonBaseProps: ButtonProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
      >
        Filtered rows
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({
  columns,
  rows: initialRows,
  defaultNewRow,
  title,
}: FullFeaturedCrudGridProps) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const router = useRouter();
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleViewClick = (id: GridRowId) => () => {
    router.push(`/inventory/${id}`);
  };
  const handleSaveClick = (id: GridRowId) => async () => {
    // console.log({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await axios.delete(`/api/inventory/${id}`); // Sesuaikan endpoint
      setRows(rows.filter((row) => row.id !== id)); // Hapus dari UI hanya jika berhasil
      console.log(`Row ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting row ${id}:`, error);
    }
  };  

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };

    if (newRow.isNew === true) {
      const response = await axios.post('/api/inventory', updatedRow);
      // console.log('ini newRow nya ya: ', newRow);
      // console.log('ini updatedRow nya ya: ', updatedRow);
      // console.log('ini response nya ya: ', response.data);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === newRow.id ? { ...response.data, isNew: false, id: response.data.id, createdAt: new Date(response.data.createdAt) } : row
        )
      );
    } else {
      // const response = await axios.put(`/api/inventory/${newRow.id}`, updatedRow);
      // console.log('ini newRow nya ya: ', newRow);
      // console.log('ini updatedRow nya ya: ', updatedRow);
      // console.log('ini response nya ya: ', response.data);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const actionsColumn: GridColDef = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          onClick={handleViewClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  const updatedColumns = [...columns, actionsColumn];

  return (
    <Paper sx={{ p: 1, marginY: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={updatedColumns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, defaultNewRow },
        }}
      />
    </Box>
    </Paper>
  );
}
