import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import mapIcons from "./data/mapping";
import { Search as SearchIcon } from "../../icons/search";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Group,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import styles from "../../styles/Home.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, TextField, InputAdornment, SvgIcon } from "@mui/material";
import { useTheme } from "@mui/material";

const Clients = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if data exists in state
        if (data.length === 0) {
          // Make the GET request
          const response = await fetch("/api/flutter", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          // Parse the response from the server
          const responseJson = await response.json();

          // Check if response data exists in state
          if (responseJson.length !== data.length) {
            setData(responseJson);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [data]);

  const pageSettings = { pageSize: 6 };

  const filteredData = data.filter((row) =>
    row.Guest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "Reservation ID", headerName: "Reservation ID", width: 150 },
    { field: "Source", headerName: "Platform", minWidth: 100, flex: 1 },
    { field: "Guest", headerName: "Guest", minWidth: 100, flex: 1 },
    { field: "Check In", headerName: "Check In", width: 110 },
    { field: "Check Out", headerName: "Check Out", width: 110 },
    { field: "Type", headerName: "Type", width: 110 },
    { field: "Room", headerName: "Room", width: 110 },
    { field: "Payment", headerName: "Payment", minWidth: 110, flex: 1 },
    { field: "Total Amount", headerName: "Total Amount", width: 130 },
    {
      field: "_id",
      headerName: "Lookup _id",
      width: 100,
      sortable: false,
      filterable: false,
      hide: true,
    },
  ];

  return (
    <div className="bg-blue-50">
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search customer"
          variant="outlined"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Box>
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            textAlign: "center",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#94e2cd",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#51abcb",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#e9f5f9",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",

              backgroundColor: "#d3eaf2",
            },
            "& .MuiCheckbox-root": {
              color: `"#b7ebde" !important`,
            },
            "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "red",
            },
          }}
        >
          <DataGrid
            rows={filteredData}
            getRowId={(row) => row._id}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Clients;
