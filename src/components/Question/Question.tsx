import Answers from '../Answers';
import QuestionTimer from '../QuestionTimer';
import QUESTIONS from '../../questions';
import { useState } from 'react';

interface QuestionProps {
  readonly index: number;
  readonly onSkipAnswer: () => void;
  readonly onSelectAnswer: (answer: string) => void;
}

export default function Question({ index, onSkipAnswer, onSelectAnswer }: QuestionProps) {
  const [answers, setAnswers] = useState<{ selectedAnswer: string; isCorrect: null | boolean }>({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answers.selectedAnswer) timer = 1000;

  if (answers.isCorrect !== null) timer = 2000;

  function handleSelectAnswer(answer: string) {
    setAnswers({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswers({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answers.selectedAnswer) answerState = 'answered';

  if (answers.selectedAnswer && answers.isCorrect !== null)
    answerState = answers.isCorrect ? 'correct' : 'wrong';

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answers.selectedAnswer === '' ? onSkipAnswer : null} // 불필요하게 실행하지 않도록?
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        selectedAnswer={answers.selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
