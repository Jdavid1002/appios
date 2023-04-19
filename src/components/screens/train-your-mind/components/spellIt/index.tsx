import React from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import GeneralService from 'app_services/general/general';
import GameService from 'app_services/games';

import SpellItLayout from './spellIt-layout';

const SpellItGame: React.FC<any> = () => {
  const gameService = new GameService();

  const [remainingSecs, setRemainingSecs] = React.useState<number>(60);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [question, setQuestion] = React.useState<any>({});
  const [corrects, setCorrects] = React.useState<number>(0);
  const [answered, setAnswered] = React.useState<any>(null);

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
        setQuestion(questions[questionIndex + 1]);
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
            name: 'Deletréalo',
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
    setQuestions(gameService.spellItData());
  }, []);

  // In set questions
  React.useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
      setIsActive(true);
    }
  }, [questions]);

  // On times change, set it
  React.useEffect(() => {
    let interval: number = 0;
    question;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((rs: number) => rs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  // On time or questions ends
  React.useEffect(() => {
    if (
      isActive &&
      (remainingSecs === 0 || questions.length === questionIndex)
    ) {
      goResults();
    }
  }, [remainingSecs, questions, questionIndex, isActive]);

  return (
    <SpellItLayout
      remaining={remaining}
      isActive={isActive}
      doAnswer={doAnswer}
      question={question}
      answered={answered}
    />
  );
};

export default React.memo(SpellItGame);
