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
import UploadButton from './atoms/upload-button';
import { uploadImage } from '@/utils/file-uploader';
import Image from 'next/image';
// import InputFileUpload from './atoms/upload-image';

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
  const pathname = usePathname();
  const { setRows, setRowModesModel, defaultNewRow } = props;
  const apiRef = useGridApiContext();
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
  const pathname = usePathname();
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleViewClick = (id: GridRowId) => () => {
    const data = rows.find((row) => row.id === id);
    router.push(`/inventory/${data!.itemCode}`);
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
    try {
      if (newRow.isNew) {
        const response = await axios.post('/api/inventory', newRow);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === newRow.id
              ? { ...response.data, isNew: false }
              : row
          )
        );
        console.log(response);
        console.log(newRow);
      } else {
        console.log(newRow);
        const response = await axios.patch(`/api/inventory/${newRow.itemCode}`, newRow);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === newRow.id
              ? { ...response.data, isNew: false }
              : row
          )
        );
      }
      return newRow;
    } catch (error) {
      console.error('Error updating row:', error);
      throw error;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleImageUpload = async (id: GridRowId, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('pathname', pathname);
      console.log(formData, id)
      const response = await axios.post('/api/upload', formData);
      console.log(response);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, image: response.data } : row))
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

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
  const SafeImage = ({ src, alt, width, height, style }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={style}
      />
    );
  };
  
  const imageColumn: GridColDef = {
    field: 'image',
    type: 'actions',
    headerName: 'Image',
    width: 180,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return [
          <UploadButton
            key={`${pathname}-${id}`}
            onChange={(file: File) => handleImageUpload(id, file)}
          />,
        ];
      }
  
      const row = rows.find((row) => row.id === id);
      const imageUrl = row?.image || '/no-image.jpg';
      const altText = row?.itemDescription || 'No description';
  
      return [
        <SafeImage
          key={`${pathname}-${id}`}
          src={imageUrl}
          alt={altText}
          width={100}
          height={38}
          style={{ objectFit: 'cover' }}
        />,
      ];
    },
  };
  
  const updatedColumns = [...columns, imageColumn, actionsColumn];

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
  onProcessRowUpdateError={(error) => {
    console.error('Error during row update:', error);
    alert('An error occurred during row update. Please check the console for details.');
  }}
  slots={{ toolbar: EditToolbar }}
  slotProps={{
    toolbar: { setRows, setRowModesModel, defaultNewRow },
  }}
/>

    </Box>
    </Paper>
  );
}
