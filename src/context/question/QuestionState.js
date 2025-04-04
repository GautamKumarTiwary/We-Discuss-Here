import questionContext from "./questionContext";
import { useState } from "react";

const QuestionState = (props) => {
  const host = "http://localhost:5000";
  const questionsInitial = [];
  const [questions, setQuestions] = useState(questionsInitial);

  // Get all Questions
  const getQuestions = async () => {
    try {
      const response = await fetch(`${host}/api/quiz/questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setQuestions(json);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  // Add a Question
  const addQuestion = async (question, answers) => {
    try {
      const response = await fetch("http://localhost:5000/api/quiz/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answers }),
      });

      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  };

  return (
    <questionContext.Provider value={{ questions, addQuestion, getQuestions }}>
      {props.children}
    </questionContext.Provider>
  );
};

export default QuestionState;
