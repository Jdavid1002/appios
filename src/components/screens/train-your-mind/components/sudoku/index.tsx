import React from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import isValidSudoku from 'is-valid-sudoku';
import Sudoku from 'sudoku-umd';

import GeneralService from '../../../../../services/general/general';

import SudokuLayout from './sudoku-layout';

const SudokuGame: React.FC<any> = () => {
  
  const [initialBoard] = React.useState<any[]>(
    Sudoku.board_string_to_grid(Sudoku.generate(70)),
  );
  const [board, setBoard] = React.useState<any[]>([]);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [selectedCell, setSelectedCell] = React.useState<any[]>([]);
  const [errors, setErrors] = React.useState<any[]>([]);
  const [remainingSecs, setRemainingSecs] = React.useState<number>(0);

  const navigation: any = useNavigation();

  const clearBoard = () => {
    setBoard(convertSudoku(initialBoard));
    setErrors([]);
  };

  const solveBoard = () => {
    const solution = Sudoku.solve(Sudoku.board_grid_to_string(initialBoard));
    setBoard(Sudoku.board_string_to_grid(solution));
  };

  const remaining = GeneralService.getRemaining(remainingSecs);

  const convertSudoku = (thisBoard: any) => {
    return Sudoku.board_string_to_grid(Sudoku.board_grid_to_string(thisBoard));
  };

  const handleChange = (value: string, row: number, cell: number) => {
    const tempBoard: any[] = [...board];
    tempBoard[row][cell] = value.replace(/[^1-9]/g, '');
    checkErrors(row, cell, value);
    setBoard([...tempBoard]);
  };

  const checkErrors = (row: any, cell: any, value: any) => {
    let sudokuErrors: any = [];

    board.map((rowArray: any, rowIndex: number) => {
      if (board[rowIndex][cell] === value && value > 0) {
        sudokuErrors.push(`${rowIndex}${cell}`);
        sudokuErrors.push(`${row}${cell}`);
      }

      if (rowIndex === row) {
        rowArray.map((_: any, colsIndex: number) => {
          if (value > 0 && board[row][colsIndex] === value) {
            sudokuErrors.push(`${row}${colsIndex}`);
            sudokuErrors.push(`${row}${cell}`);
          }
        });
      }
    });

    setErrors(sudokuErrors);
  };

  React.useEffect(() => {
    setBoard(convertSudoku(initialBoard));
    setIsActive(true);
  }, [initialBoard]);

  // On time change, set it
  React.useEffect(() => {
    let interval: number = 0;

    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((rs: number) => rs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  // On sudoku is solved
  React.useEffect(() => {
    if (board.length > 0 && isValidSudoku(convertSudoku(board))) {
      const resetAction = CommonActions.reset({
        index: 2,
        routes: [
          {name: 'Home'},
          {name: 'Train-your-mind'},
          {
            name: 'Train-your-mind/results',
            params: {
              name: 'Sudoku',
              key: 'sudoku',
              time_view: remainingSecs,
              corrected_answers: '1',
              details: [
                {
                  key: 'Total de tiempo',
                  value: `${remaining.m}:${remaining.s}`,
                },
              ],
            },
          },
        ],
      });
      navigation.dispatch(resetAction);
      setIsActive(false);
    }
  }, [board]);

  return (
    <SudokuLayout
      solveBoard={solveBoard}
      isActive={isActive}
      initialBoard={initialBoard}
      board={board}
      clearBoard={clearBoard}
      handleChange={handleChange}
      selectedRow={selectedCell}
      setSelectedRow={setSelectedCell}
      remaining={remaining}
      errors={errors}
    />
  );
};

export default React.memo(SudokuGame);
