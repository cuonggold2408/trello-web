import axios from "axios";
import { API_ROOT } from "~/utils/constants";

export const fetchBoardDetailsAPI = async (boardId) => {
  // Axios trả về kết quả thông qua data
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};
