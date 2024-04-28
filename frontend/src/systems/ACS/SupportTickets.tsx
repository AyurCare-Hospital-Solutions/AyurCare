import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  TextField,
  Button,
} from '@mui/material';

interface Ticket {
  id: number;
  username: string;
  time: string;
  subject: string;
  description: string;
  replied: boolean;
}

const SupportTickets = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 1, username: 'JohnDoe', time: '12:30 PM', subject: 'Issue with login', description: 'User unable to login to the system.', replied: false },
    { id: 2, username: 'JaneSmith', time: '1:45 PM', subject: 'Problem with payment', description: 'User facing issues while making a payment.', replied: false },
    // Add more ticket data as needed
  ]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyMessage('');
  };

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyMessage(event.target.value);
  };

  const handleSubmitReply = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return { ...ticket, replied: true };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    console.log('Reply message:', replyMessage);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            {/* Menu icon */}
          </IconButton>
          <Typography variant="h6">
            Support Ticket System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          {/* Navigation links */}
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add more navigation links as needed */}
        </List>
      </Drawer>

      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Support Tickets</Typography>
        <Divider style={{ marginBottom: '20px' }} />

        {/* List of tickets */}
        {tickets.map((ticket) => (
          <Paper key={ticket.id} style={{ marginBottom: '10px', cursor: 'pointer', backgroundColor: ticket.replied ? 'lightgreen' : 'white' }} onClick={() => handleTicketClick(ticket)}>
            <Typography variant="body1">{ticket.username} - {ticket.time}</Typography>
            <Typography variant="h6">{ticket.subject}</Typography>
          </Paper>
        ))}

        {/* Detailed view of selected ticket */}
        {selectedTicket && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h5">Selected Ticket</Typography>
            <Typography variant="h6">Subject: {selectedTicket.subject}</Typography>
            <Typography variant="body1">Description: {selectedTicket.description}</Typography>
            <TextField
              label="Reply"
              multiline
              rows={4}
              fullWidth
              value={replyMessage}
              onChange={handleReplyChange}
              variant="outlined"
              style={{ marginTop: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmitReply} style={{ marginTop: '10px' }}>Submit Reply</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;
