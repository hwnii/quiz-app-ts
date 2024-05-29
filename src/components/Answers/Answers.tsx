import { useRef } from 'react';

interface AnswersProps {
  readonly answers: string[];
  readonly answerState: string;
  readonly selectedAnswer: string | null;
  readonly onSelectAnswer: (answer: string) => void;
}

export default function Answers({
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
}: AnswersProps) {
  const shuffledAnswer = useRef<string[]>();

  if (!shuffledAnswer.current) {
    shuffledAnswer.current = [...answers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswer.current.map((answer) => {
        const isSelected = selectedAnswer === answer;

        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClass}
              disabled={answerState !== ''} // 버튼을 클릭하면
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
