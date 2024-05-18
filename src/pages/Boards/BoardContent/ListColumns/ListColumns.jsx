import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export default function ListColumns({ columns }) {
  /**
   * SortableContext: yêu cầu items là 1 mảng ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}]
   * Nếu không đúng như vậy thì vẫn kéo thả được nhưng mà nó ko có hiệu ứng animation
   * Github vấn đề đó: https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   */

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addNewColumn = () => {
    if (!newColumnTitle) {
      console.log("Column title is required");
      return;
    }
    console.log("newColumnTitle", newColumnTitle);

    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Box thêm cột */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              onClick={toggleOpenNewColumnForm}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAddIcon />}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              p: 1,
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title"
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderWidth: "0.5px !important",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                    borderWidth: "1px !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    borderWidth: "1px !important",
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}
