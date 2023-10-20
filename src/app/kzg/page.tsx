"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import CycloneIcon from "@mui/icons-material/Cyclone";

const RotatingIcon = styled(IconButton)`
  animation: rotateAnimation 1s linear infinite;

  @keyframes rotateAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface KZG {
  query: string;
  result?: string;
  status?: "Whitelisted" | "Checking..." | "NotWhitelisted";
}

export default function StarredPage() {
  const [rows, setRows] = React.useState<KZG[]>([]);

  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuery = async () => {
    console.log(address);
    const items: KZG[] = address
      .split("\n")
      .filter((f) => f.trim())
      .map((item) => {
        return {
          query: item,
          result: "",
          status: "Checking...",
        };
      });
    setRows(items);
    setOpen(false);

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      await axios
        .get(`http://api.ulsincere.com/kzg?address=${item.query}`)
        .then((response) => {
          const result = response.data.data;
          // Update the specific row with the new data.
          setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index].result = result || "";
            updatedRows[index].status = result
              ? "Whitelisted"
              : "NotWhitelisted";
            return updatedRows;
          });
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          // Update the specific row to indicate an error.
          setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index].status = "NotWhitelisted";
            return updatedRows;
          });
        });
    }
  };

  const statusColorMap: { [key: string]: string } = {
    NotWhitelisted: "#bdbdbd",
    "Checking...": "#2196f3",
    Whitelisted: "#00bcd4",
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container sx={{ textAlign: "right", marginBottom: "8px" }}>
          <Button variant="contained" onClick={handleClickOpen}>
            Add Address
          </Button>
        </Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {!rows.length && (
              <caption>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="contained" onClick={handleClickOpen}>
                    Add Address
                  </Button>
                </Container>
              </caption>
            )}
            <TableHead>
              <TableRow>
                <TableCell>Query</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={`${row.query} + ${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.query}
                  </TableCell>
                  <TableCell align="right">{row.result}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: statusColorMap[row.status!] }}
                  >
                    {row.status === "Checking..." ? (
                      <RotatingIcon color="primary">
                        <CycloneIcon />
                      </RotatingIcon>
                    ) : null}
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Address / Github Handle</DialogTitle>
          <DialogContent sx={{ width: "520px" }}>
            <DialogContentText>
              Add your address or Github Handle
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              placeholder={`Add your address or Github Handle, one per line. For example:
0x5D544C2329d812B1eA1D3F520C882d69811cabce
0x5D544C2329d812B1eA1D3F520C882d69811c7ce3
venlinCommunity`}
              type="email"
              value={address}
              fullWidth
              multiline
              rows={12}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleQuery}>Query</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
