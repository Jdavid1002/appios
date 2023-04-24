import React from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import GeneralService from '../../../../../services/general/general';
import GameService from '../../../../../services/games';

import ProblemsLayout from './problems-layout';

const ProblemsGame: React.FC<any> = () => {
  const gameService = new GameService();

  const [question, setQuestion] = React.useState<any>(null);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [corrects, setCorrects] = React.useState(0);
  const [remainingSecs, setRemainingSecs] = React.useState(60);
  const [answered, setAnswered] = React.useState<any>(null);
  const [level, setLevel] = React.useState(0);

  const navigation = useNavigation();

  const remaining = GeneralService.getRemaining(remainingSecs);

  const doAnswer = (answer: string) => {
    if (!answered) {
      setAnswered(answer);
      if (question.answer === answer) {
        setCorrects(corrects + 1);
      }
  
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        const generatedQuestion = gameService.problemsData(questionIndex);
        setQuestion(generatedQuestion);
        setAnswered(null);
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
            name: 'Solución de problems',
            key: 'problems',
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
    const generatedQuestion = gameService.problemsData(questionIndex);
    setQuestion(generatedQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On question ready
  React.useEffect(() => {
    if (question) {
      setIsActive(true);
    }
  }, [question]);

  // On time change, se it
  React.useEffect(() => {
    let interval: number = 0;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((rs: number) => rs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

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

  // On game ends
  React.useEffect(() => {
    if (isActive && remainingSecs === 0) {
      goResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, remainingSecs]);

  return (
    <ProblemsLayout
      remaining={remaining}
      isActive={isActive}
      doAnswer={doAnswer}
      question={question}
      answered={answered}
      level={level}
    />
  );
};

export default ProblemsGame;
