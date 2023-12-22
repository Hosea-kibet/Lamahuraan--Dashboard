import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SearchBox = ({ value, onChange }) => (
  <TextField
    label="Search"
    variant="outlined"
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
  />
);

const CountCard = ({ title, count, textColor }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" color={textColor}>
        {count}
      </Typography>
    </CardContent>
  </Card>
);

const Datatable = () => {
  const [rows, setRow] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://skiza-app-dy3qp.ondigitalocean.app/public/skiza/direct/subscribed/list?page=1&limit=5000');
        if (Array.isArray(response.data)) {
          setRow(response.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const filteredRows = rows.filter((row) =>
    row.tune_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="datatable">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CountCard title="Total Orders" count={rows.length} textColor="success" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CountCard title="Subscribed Orders" count={filteredRows.length} textColor="success" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CountCard title="Pending Orders" count={rows.length - filteredRows.length} textColor="success" />
        </Grid>
      </Grid>

      <SearchBox value={searchQuery} onChange={handleSearchChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Code</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.tune_code}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.phonenumber}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.status === "OD200" ? 'Subscribed' : "Pending"}
                </StyledTableCell>
                <StyledTableCell align="center">{moment(row.created_at).format('MMMM Do, YYYY, h:mm:ss a')}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Datatable;
