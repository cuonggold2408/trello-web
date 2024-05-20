import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnDetailsAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";
import Box from "@mui/material/Box";
import Loading from "~/Loading/Loading";
import showToast from "~/utils/Toastify";

export default function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "6646350c606745e42b95483b";
    fetchBoardDetailsAPI(boardId).then((data) => {
      data.columns = mapOrder(data.columns, data.columnOrderIds, "_id");

      // Nếu không có dữ liệu thì lấy dữ liệu mẫu
      data.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // Sắp xếp lại thứ tự card luôn trước khi đưa xuống component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      setBoard(data);
    });
  }, []);

  // Hàm này có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // Tạo placeholder card cho column mới tạo
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cập nhật state Board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  // Hàm này có nhiệm vụ gọi API tạo mới card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // Cập nhật state Board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnToUpdate) {
      // Column rỗng nhưng bản chất là đang có placeholder card
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard];
        columnToUpdate.cardOrderIds = [createdCard._id];
      } else {
        // Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    console.log("🚀 ~ createNewCard ~ columnToUpdate:", columnToUpdate);
    setBoard(newBoard);
  };

  // Hàm này có nhiệm vụ gọi API khi thả column thì lưu lại vị trí mới
  const moveColumn = (dndOrderedColumns) => {
    // Lấy ra mảng id của column theo thứ tự mới
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    // Cập nhật state Board
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Gọi API update vị trí column
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  // Hàm này có nhiệm vụ gọi API khi thả card thì lưu lại vị trí mới trong cùng column
  const moveCardInColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

    console.log("newBoard", newBoard);

    // Gọi API update vị trí card trong column
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  // Hàm này có nhiệm vụ gọi API khi thả card từ column này sang column khác
  /**
   * Khi di chuyển card sang column khác:
   * B1: Cập nhật mảng cardOrderIds của column cũ (nghĩa là xóa cái _id của card đó ra khỏi mảng cardOrderIds)
   * B2: Cập nhật mảng cardOrderIds của column mới (nghĩa là thêm cái _id của card đó vào mảng cardOrderIds)
   * B3: Cập nhật columnId của card đó thành columnId mới
   */
  const moveCardInColumnDifferent = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // Lấy ra mảng id của column theo thứ tự mới
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    // Cập nhật state Board
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Gọi API update vị trí card trong column
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;

    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  // Xử lý xóa 1 Column
  const deleteColumnDetails = (columnId) => {
    // Cập nhật state Board
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter(
      (column) => column._id !== columnId
    );
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    );
    setBoard(newBoard);

    // Gọi API xóa column
    deleteColumnDetailsAPI(columnId).then((res) => {
      showToast("success", res?.deleteResult, "BOTTOM_RIGHT");
    });
  };

  if (!board) return <Loading />;

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInColumn={moveCardInColumn}
        moveCardInColumnDifferent={moveCardInColumnDifferent}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
}
