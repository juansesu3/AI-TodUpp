import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  console.log("FORMATED TODOS to send >>",todos)

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTdata = await res.json();
  const { content } = GPTdata;

  return content;
};
export default fetchSuggestion;