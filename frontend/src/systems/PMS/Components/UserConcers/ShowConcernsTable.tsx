import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Note {
  id: number;
  email: string;
  concern: string;
}

interface Concerns {
  data?: Note[];
}

interface SortConfig {
  key: keyof Note;
  direction: 'asc' | 'desc';
}

const ShowConcernsTable: React.FC<{ concerns?: Concerns }> = ({ concerns }) => {
  const [concernsData, setConcernsData] = useState<Note[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<'email' | 'concern' | 'both'>('email');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'asc' });
  const [repliedIds, setRepliedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const data = concerns?.data || [];
    const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    setConcernsData(sortedData);

    // Load stored replied IDs from local storage
    const storedRepliedIds = JSON.parse(localStorage.getItem('repliedIds') || '[]');
    setRepliedIds(new Set(storedRepliedIds));
  }, [concerns, sortConfig]);

  const handleSort = (key: keyof Note) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleEmailRedirect = (id: number, email: string, concern: string) => {
    const userName = email.split('@')[0];
    const subject = encodeURIComponent('Response to Your Concern');
    const body = encodeURIComponent(`Dear ${userName},\n\nRegarding your concern: ${concern}\n\n****** Response goes here. ******\n\n\nBest regards,\nAyurCare`);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    
    const newRepliedIds = new Set(repliedIds);
    newRepliedIds.add(id);
    setRepliedIds(newRepliedIds);
    localStorage.setItem('repliedIds', JSON.stringify(Array.from(newRepliedIds)));
  };

  const filteredData = concernsData.filter((row) => {
    if (!searchText) return true;
    const searchTextLower = searchText.toLowerCase();
    if (searchFilter === 'email') {
      return row.email.toLowerCase().includes(searchTextLower);
    } else if (searchFilter === 'concern') {
      return row.concern.toLowerCase().includes(searchTextLower);
    } else if (searchFilter === 'both') {
      return row.email.toLowerCase().includes(searchTextLower) || row.concern.toLowerCase().includes(searchTextLower);
    }
    return true;
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Search By</FormLabel>
        <RadioGroup
          row
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value as 'email' | 'concern' | 'both')}
        >
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="concern" control={<Radio />} label="Concern" />
          <FormControlLabel value="both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('id')}>Concern No {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}</TableCell>
              <TableCell onClick={() => handleSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}</TableCell>
              <TableCell>Concern</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.concern}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEmailRedirect(row.id, row.email, row.concern)}
                    sx={{
                      backgroundColor: repliedIds.has(row.id) ? "#4CAF50" : "red",
                      fontSize: "0.75rem",
                      padding: "3px 10px",
                    }}
                  >
                    {repliedIds.has(row.id) ? "Replied" : "Reply"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ShowConcernsTable;
