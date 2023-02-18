import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { Modal, Button } from "@mui/material";

const PopUp = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(props.jsonData);
  }, []);

  const mycolumns = Object.keys(props.jsonData[0]).map((header) => ({
    field: header,
    headerName: header,
  }));

  console.log("My columns are ", mycolumns);

  return (
    <div className="outside_div">
      <Button onClick={() => setOpen(true)}> Click here to preview </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="mb-4 overflow-auto rounded-3xl m-10"
      >
        <div
          className="bg-blue-50 rounded-3xl
         "
        >
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
                  backgroundColor: "none",
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
                rows={props.jsonData}
                getRowId={(row) => row.RowNumber}
                columns={mycolumns}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          </Box>
          <div className="flex justify-center relative">
            <button
              className="bg-red-200 rounded-2xl p-4 m-4"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-green-200 rounded-2xl p-4 m-4"
              onClick={() => {
                console.log("data will be uploaded from here");
                setOpen(false);
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopUp;
