import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { handleFile, upload } from "./fileReader";
import Modal from "@mui/material";
import { useState } from "react";
import PopUp from "./popUp";
import { xlsToJson } from "./fileReader";

export const CustomerListToolbar = (props) => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file, setJsonData);
    console.log("My json Data is set to : ", jsonData);
  };

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Customers
          </Typography>

          <Box sx={{ m: 1 }}>
            <form>
              <input
                type="file"
                id="file-input"
                name="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileUpload}
              />
              {/* {<Button type="submit" startIcon={<UploadIcon fontSize="small" />} sx={{}}>
            Import
          </Button>} */}
              {/* {<Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>} */}
              <Button type="submit" color="primary" variant="contained">
                Add Customers
              </Button>
            </form>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}></Box>
      </Box>
      {jsonData && <PopUp jsonData={jsonData} />}
    </>
  );
};
