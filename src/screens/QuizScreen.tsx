import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {getLessonById} from '../data/lessons';
import {useUser} from '../context/UserContext';
import {COLORS, SPACING, FONT_SIZES} from '../constants/theme';
import {Question, QuestionType} from '../types';

const QuizScreen = ({route, navigation}: any) => {
  const {lessonId} = route.params;
  const lesson = getLessonById(lessonId);
  const {completeLesson, addXP} = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(
    null,
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  const currentQuestion: Question = lesson.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.questions.length - 1;

  const checkAnswer = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer');
      return;
    }

    const isCorrect =
      currentQuestion.type === QuestionType.TRUE_FALSE
        ? selectedAnswer === currentQuestion.correctAnswer
        : selectedAnswer === currentQuestion.correctAnswer;

    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + currentQuestion.xpReward);
      addXP(currentQuestion.xpReward);
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      completeLesson(lesson.id, lesson.category, lesson.xpReward);
      Alert.alert(
        '🎉 Lesson Complete!',
        `You earned ${score} XP!\nCorrect answers: ${
          answers.filter(a => a).length
        }/${lesson.questions.length}`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const renderOptions = () => {
    if (currentQuestion.type === QuestionType.TRUE_FALSE) {
      return (
        <View style={styles.optionsContainer}>
          {['true', 'false'].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.optionButtonSelected,
                showExplanation &&
                  option === currentQuestion.correctAnswer &&
                  styles.optionButtonCorrect,
                showExplanation &&
                  selectedAnswer === option &&
                  option !== currentQuestion.correctAnswer &&
                  styles.optionButtonWrong,
              ]}
              onPress={() => !showExplanation && setSelectedAnswer(option)}
              disabled={showExplanation}>
              <Text style={styles.optionText}>
                {option === 'true' ? 'True' : 'False'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {currentQuestion.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.optionButtonSelected,
              showExplanation &&
                index === currentQuestion.correctAnswer &&
                styles.optionButtonCorrect,
              showExplanation &&
                selectedAnswer === index &&
                index !== currentQuestion.correctAnswer &&
                styles.optionButtonWrong,
            ]}
            onPress={() => !showExplanation && setSelectedAnswer(index)}
            disabled={showExplanation}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentQuestionIndex + 1} of {lesson.questions.length}
        </Text>
        <Text style={styles.scoreText}>Score: {score} XP</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${
                ((currentQuestionIndex + 1) / lesson.questions.length) * 100
              }%`,
            },
          ]}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {renderOptions()}

      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>
            {selectedAnswer === currentQuestion.correctAnswer ||
            (currentQuestion.type === QuestionType.TRUE_FALSE &&
              selectedAnswer === currentQuestion.correctAnswer)
              ? '✓ Correct!'
              : '✗ Incorrect'}
          </Text>
          <Text style={styles.explanationText}>
            {currentQuestion.explanation}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {!showExplanation ? (
          <TouchableOpacity
            style={[
              styles.checkButton,
              selectedAnswer === null && styles.checkButtonDisabled,
            ]}
            onPress={checkAnswer}
            disabled={selectedAnswer === null}>
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>
              {isLastQuestion ? 'Finish' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  progress: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  scoreText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  questionContainer: {
    padding: SPACING.lg,
    minHeight: 120,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  optionsContainer: {
    padding: SPACING.md,
  },
  optionButton: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  optionButtonSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: '#E3F2FD',
  },
  optionButtonCorrect: {
    borderColor: COLORS.success,
    backgroundColor: '#E8F5E9',
  },
  optionButtonWrong: {
    borderColor: COLORS.error,
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    textAlign: 'center',
  },
  explanationContainer: {
    margin: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  explanationTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  explanationText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  buttonContainer: {
    padding: SPACING.md,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  checkButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
