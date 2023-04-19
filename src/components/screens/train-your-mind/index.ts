import TrainYourMinScreen from './containers/tym';

export type GameType = {
  name: string;
  key: string;
  brains: number;
  image: any;
  color: string;
  time?: number;
  instructions?: string | Array<string>;
};

export {default as TrainYourMindLayout} from './components/tym-layout';
export {default as TrainYourMindInstructionsLayout} from './components/instructions-layout';
export {default as TrainYourMindResultsLayout} from './components/results-layout';
export {default as SudokuLayout} from './components/sudoku';
export {default as SpellItLayout} from './components/spellIt';
export {default as ProblemsLayout} from './components/problems';
export {default as MemoryLayout} from './components/memory';
export {default as GameList} from './components/gameList';
export {default as GameListItem} from './components/gameListItem';
export {default as GameListHeader} from './components/gameListHeader';
export {default as TYMCardItem} from './components/tym-card-item';

export {default as styles} from './styles';
export {default as TYMCardStyles} from './styles/train-your-mind-card';

export default TrainYourMinScreen;

export const gameList = [
  {
    name: 'Sudoku',
    key: 'sudoku',
    brains: 120,
    image: require('assets/img/games/sudoku.png'),
    home_image: require('assets/img/games/home_sudoku.png'),
    color: '#e94044',
    instructions: [
      'Hay que completar las casillas vacías con un solo número del 1 al 9.',
      'En una misma fila no puede haber números repetidos.',
      'En una misma columna no puede haber números repetidos.',
      'En una misma región no puede haber números repetidos.',
      'La solución de un sudoku es única.',
    ],
  },
  {
    name: 'Deletréalo',
    key: 'spellIt',
    brains: 120,
    image: require('assets/img/games/spellIt.png'),
    home_image: require('assets/img/games/home_spell.png'),
    color: '#75bb53',
    time: 60,
    instructions:
      '¿Qué tanto puedes deletrear?\nSelecciona la letra que hace falta y mide tus conocimientos en ortografía.',
  },
  {
    name: 'Solución de problemas',
    key: 'problemSolving',
    brains: 120,
    image: require('assets/img/games/questions.png'),
    home_image: require('assets/img/games/home_problems.png'),
    color: '#f2c230',
    time: 60,
    instructions:
      'Selecciona la respuesta correcta de la siguiente operación matemática.',
  },
  {
    name: 'Memoria',
    key: 'memory',
    brains: 120,
    image: require('assets/img/games/memory.png'),
    home_image: require('assets/img/games/home_memory.png'),
    color: '#24abdf',
    time: 60,
    instructions:
      'Memoriza las imágenes y colócalas en el mismo orden. Logra cuantas más puedas.',
  },
];
