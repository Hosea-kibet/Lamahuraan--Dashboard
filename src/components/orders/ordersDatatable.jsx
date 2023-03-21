import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from '@mui/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  subscribed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  failed: {
    color: 'red',
  },
});

export default function Datatable() {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [rows, setRow] = useState([]);
  console.log(rows);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://skiza-app-dy3qp.ondigitalocean.app/api/v1/skiza/subscribed/list?limit=1000&page=1",
          { headers }
        );
        setRow(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const classes = useStyles();

  return (
    
    <div className="datatable">
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tune Code</StyledTableCell>
                <StyledTableCell align="center">PhoneNumber</StyledTableCell>
                <StyledTableCell align="center">Time Created</StyledTableCell>
                {/* <StyledTableCell align="center">Status</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.tune_code}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phonenumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
                  </StyledTableCell>
                  {/* <StyledTableCell
                    align="center"
                    className={
                      row.status === "OD200"
                        ? classes.subscribed
                        : row.status === "OD201"
                        ? classes.pending
                        : row.status === "OD400"
                        ? classes.failed
                        : ""
                    }
                  >
                    {row.status === "OD200" && "Subscribed"}
                    {row.status === "OD201" && "Pending"}
                    {row.status === "OD400" && "Failed"}
                    
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
