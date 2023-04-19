import React from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import GameService from 'app_services/games';
import GeneralService from 'app_services/general/general';

import SpellItLayout from './memory-layout';

const MemoryGame: React.FC<any> = () => {
  const gameService = new GameService();
  const questions = gameService.memoryData();

  const [remainingSecs, setRemainingSecs] = React.useState(60);
  const [showRemainingSecs, setShowRemainingSecs] = React.useState(3);
  const [isActive, setIsActive] = React.useState(false);
  const [isShow, setIsShow] = React.useState(true);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [question, setQuestion] = React.useState(questions[0]);
  const [tempAnswer, setTempAnswer] = React.useState([]);
  const [corrects, setCorrects] = React.useState(0);
  const [answered, setAnswered] = React.useState<any[]>([]);
  const [level, setLevel] = React.useState(0);

  const navigation = useNavigation();

  const remaining = GeneralService.getRemaining(remainingSecs);
  const showRemaining = GeneralService.getRemaining(showRemainingSecs);

  const doAnswer = (optionsLength: number, answer: string) => {
    const t: any = [...tempAnswer, answer];

    setTempAnswer(t);

    if (t.length === optionsLength) {
      setAnswered(t);

      if (JSON.stringify(question.answer) === JSON.stringify(t)) {
        setCorrects(corrects + 1);
      }

      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setQuestion(questions[questionIndex + 1]);
        setTempAnswer([]);
        setIsShow(true);
        setShowRemainingSecs(3);
        setAnswered([]);
      }, 1000);
    }
  };

  const goResults = () => {
    const resetAction = CommonActions.reset({
      index: 2,
      routes: [
        {name: 'Home'},
        {name: 'Train-your-mind'},
        {
          name: 'Train-your-mind/results',
          params: {
            name: 'Memoria',
            key: 'spell',
            time_view: remainingSecs,
            corrected_answers: corrects.toString(),
            details: [
              {
                key: 'Total de preguntas contestadas',
                value: questionIndex.toString(),
              },
              {key: 'Cantidad de aciertos', value: corrects.toString()},
            ],
          },
        },
      ],
    });
    navigation.dispatch(resetAction);
    setIsActive(false);
  };

  // On component mount
  React.useEffect(() => {
    setIsActive(true);
  }, []);

  // On times change, set it
  React.useEffect(() => {
    let interval: number = 0;
    let showInterval: number = 0;

    if (isShow) {
      showInterval = setInterval(() => {
        setShowRemainingSecs((rs: number) => rs - 1);
      }, 1000);
    } else if (!isShow && showRemainingSecs !== 0) {
      clearInterval(showInterval);
    }

    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((rs: number) => rs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    if (showRemainingSecs === 0) {
      setIsShow(false);
    }

    if (showRemainingSecs > 0) {
      setIsShow(true);
    }

    return () => {
      clearInterval(showInterval);
      clearInterval(interval);
    };
  }, [isActive, remainingSecs, isShow, showRemainingSecs]);

  // On questionIndex change
  React.useEffect(() => {
    if (questionIndex >= 0 && questionIndex < 5) {
      setLevel(1);
    } else if (questionIndex >= 5 && questionIndex < 10) {
      setLevel(2);
    } else if (questionIndex >= 10 && questionIndex < 15) {
      setLevel(3);
    }
  }, [questionIndex]);

  // On time or questions ends
  React.useEffect(() => {
    if (remainingSecs === 0 || questions.length === questionIndex) {
      goResults();
    }
  }, [remainingSecs, questions, questionIndex]);

  return (
    <SpellItLayout
      remaining={remaining}
      showRemaining={showRemaining}
      isActive={isActive}
      doAnswer={doAnswer}
      question={question}
      showRemainingSecs={showRemainingSecs}
      setShowRemainingSecs={setShowRemainingSecs}
      isShow={isShow}
      setIsShow={setIsShow}
      tempAnswer={tempAnswer}
      questionIndex={questionIndex}
      level={level}
      answered={answered}
    />
  );
};

export default MemoryGame;
