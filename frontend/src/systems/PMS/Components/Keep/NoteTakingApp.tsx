import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarComponent from "./CalendarComponent";
import { enqueueSnackbar } from "notistack";
import Mousetrap from "mousetrap";
import { playAudio } from "../Common/audioUtils";

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

const NoteTakingApp: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [, setOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (): void => {
    if (!note.trim()) {
      playAudio("../../../../../public/pmsassests/sounds/failure.mp3");
      enqueueSnackbar(<Typography> Cannot add an empty note. </Typography>, {
        variant: "error",
      });
      setOpen(true);
      return;
    }
    const newNote: Note = {
      id: Date.now(),
      content: note,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNote]);
    setNote("");
    playAudio("../../../../../public/pmsassests/sounds/success.mp3");
    enqueueSnackbar(<Typography> Note added!</Typography>, {
      variant: "success",
    });
    setOpen(true);
  };

  const handleDelete = (id: number): void => {
    setNotes(notes.filter((note) => note.id !== id));
    playAudio("../../../../../public/pmsassests/sounds/success.mp3");
    enqueueSnackbar(<Typography>Note deleted! </Typography>, {
      variant: "success",
    });
    setOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    playAudio("../../../../../public/pmsassests/sounds/click.mp3");
    setNote(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      handleAddNote();
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const inputRef = useRef<HTMLInputElement>(null); // Specify the type of element

  useEffect(() => {
    // Bind the '/' key to focus the input
    Mousetrap.bind("/", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      if (inputRef.current) {
        // Check if the input element is not null
        inputRef.current.focus(); // Focus the input only if it's not null
      }
      return false; // Prevent the default action of the '/' key
    });

    // Cleanup function to unbind the event listener when the component unmounts
    return () => {
      Mousetrap.unbind("/");
    };
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, mr: 2 }}>
          <TextField
            label="Add a new note"
            variant="outlined"
            value={note}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            margin="normal"
            fullWidth
            InputProps={{
              inputRef: inputRef, // Use InputProps to pass ref to the actual input element
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<NoteAddIcon />}
            onClick={handleAddNote}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add to note
          </Button>
          <Grid container spacing={5} sx={{ mt: 2 }}>
            {notes.map((note) => (
              <Grid item key={note.id} xs={6} sm={6} md={4}>
                <Paper elevation={24} sx={{ mr: 8 }}>
                  <Card sx={{ minWidth: 200, maxWidth: 250 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {note.content}
                      </Typography>
                      <Typography color="textSecondary">
                        Created: {new Date(note.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                    <IconButton
                      onClick={() => handleDelete(note.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <CalendarComponent
          events={notes.map((note) => ({
            title: note.content,
            date: new Date(note.createdAt).toISOString().split("T")[0],
          }))}
        />
      </Box>
    </>
  );
};

export default NoteTakingApp;
