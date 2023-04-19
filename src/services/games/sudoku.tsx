import Sudoku from 'sudoku-umd';
import isValidSudoku from 'is-valid-sudoku';

class SudokuGameService {
  public static isValid = (board: any[]) => {
    return board && isValidSudoku(board);
  };

  public static solve = (board: any[]) => {
    const solution = Sudoku.solve(Sudoku.board_grid_to_string(board));
    return Sudoku.board_string_to_grid(solution);
  };

  public static checkErrors = (
    board: any[],
    row: any,
    cell: any,
    value: any,
  ) => {
    let sudokuErrors: any = [];

    board.map((rowArray: any, rowIndex: number) => {
      if (board[rowIndex][cell] === value && value > 0) {
        sudokuErrors.push(`${rowIndex}${cell}`);
        sudokuErrors.push(`${row}${cell}`);
      }

      if (rowIndex === row) {
        rowArray.map((_: any, colsIndex: number) => {
          if (board[row][colsIndex] === value && value > 0) {
            sudokuErrors.push(`${row}${colsIndex}`);
            sudokuErrors.push(`${row}${cell}`);
          }
        });
      }
    });

    return sudokuErrors;
  };

  public static generate = (level: string = 'easy') => {
    const board = Sudoku.board_string_to_grid(Sudoku.generate(level));

    return board;
  };
}

export default SudokuGameService;
