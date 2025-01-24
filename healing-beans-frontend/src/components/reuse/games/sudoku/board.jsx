import Cell from "./cell";

const Board = ({ board, initialBoard, onCellChange }) => {
  return (
    <div className="grid grid-cols-9 gap-0 border-2 border-black">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              ${
                colIndex % 3 === 2 && colIndex !== 8
                  ? "border-r-2 border-black"
                  : ""
              }
              ${
                rowIndex % 3 === 2 && rowIndex !== 8
                  ? "border-b-2 border-black"
                  : ""
              }
            `}
          >
            <Cell
              value={cell}
              isInitial={initialBoard[rowIndex][colIndex] !== 0}
              onChange={(value) => onCellChange(rowIndex, colIndex, value)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
