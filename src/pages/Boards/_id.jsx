import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis";

export default function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "6646350c606745e42b95483b";
    fetchBoardDetailsAPI(boardId).then((data) => {
      setBoard(data);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  );
}
