import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import mapIcons from "./data/mapping";

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
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

const Clients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Make the GET request
        const response = await fetch("/api/flutter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the response from the server
        const responseJson = await response.json();
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(responseJson);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  const pageSettings = { pageSize: 6 };

  const columns = [
    { field: "Reservation ID", headerName: "Reservation ID" },
    { field: "Source", headerName: "Platform" },
    { field: "Guest", headerName: "Guest" },
    { field: "Check In", headerName: "Check In" },
    { field: "Check Out", headerName: "Check Out" },
    { field: "Total Amount", headerName: "Total Amount" },
    { field: "_id", headerName: "Lookup _id" },
  ];

  return (
    <div className="bg-blue-50">
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
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
              backgroundColor: "#d3eaf2",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#e9f5f9",
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
            rows={data}
            getRowId={(row) => row._id}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
              Columns: undefined,
              Filters: undefined,
              Density: undefined,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Clients;
