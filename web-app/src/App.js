import React, { useEffect, useState } from "react";
import "./styles/main.scss";
import { Box} from "@mantine/core";
import BlueLogo from "./images/logo-marine-blue.png";
import Welcome from "./components/Welcome";
import useStyles from "./styles/js/app";
import Question from "./components/Question";
import axios from "axios";
import Results from "./components/Results";
import Error from "./components/Error";

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [question, setQuestion] = useState();
  const [questionIndex, setQuestionIndex] = useState();
  const [numberOfQuestions, setNumberOfQuestions] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState();
  const { classes } = useStyles();

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/init",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === "finish") {
          setIsFinished(true);
          setResults(res.data);
          return setIsPageLoading(false);
        }
        setNumberOfQuestions(res.data.numberOfQuestions);
        setQuestionIndex(res.data.questionIndex);
        setQuestion(res.data.question);
        setIsPageLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsPageLoading(false);
      });
  }, []);

  const getQuestion = () => {
    setIsRequesting(true);
    axios
      .get("http://localhost:5000/question", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "finish") {
          setIsFinished(true);
          setResults(res.data);
          return setIsRequesting(false);
        }
        setNumberOfQuestions(res.data.numberOfQuestions);
        setQuestionIndex(res.data.questionIndex);
        setQuestion(res.data.question);
        setIsRequesting(false);
      })
      .catch((err) => {
        if (
          err.response.status === 500 &&
          err.response.data === "refreshbrowser"
        ) {
          return window.location.reload();
        }

        setIsError(true);
        setIsRequesting(false);
      });
  };

  const answerQuestion = (id, answer) => {
    setIsRequesting(true);
    if (!id || !answer) return window.alert("Invalid id or answer");
    axios
      .post(
        `http://localhost:5000/question/${id}/answer`,
        { answer },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        getQuestion();
      })
      .catch((err) => {
        if (
          err.response.status === 500 &&
          err.response.data === "refreshbrowser"
        ) {
          return window.location.reload();
        }
        setIsError(true);
        setIsRequesting(false);
      });
  };

  const reset = () => {
    setIsRequesting(true);
    axios
      .post(
        `http://localhost:5000/reset`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setNumberOfQuestions(res.data.numberOfQuestions);
        setQuestionIndex(null);
        setQuestion(null);
        setIsFinished(false);
        setIsRequesting(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsRequesting(false);
      });
  };

  return (
    <Box className={classes.app}>
      <Box className="main">
        <Box className="bg-logo-container">
          <img src={BlueLogo} className="zeniark-logo-bg" alt="zeniark-logo" />
        </Box>
        <Box className="content">
          <Box className="container">
            {!isPageLoading &&
              (isError ? (
                <Error />
              ) : isFinished ? (
                <Results results={results} reset={reset} isRequesting={isRequesting}/>
              ) : question ? (
                <Question
                  question={question}
                  numberOfQuestions={numberOfQuestions}
                  isRequesting={isRequesting}
                  questionIndex={questionIndex}
                  answerQuestion={answerQuestion}
                />
              ) : (
                <Welcome
                  numberOfQuestions={numberOfQuestions}
                  getQuestion={getQuestion}
                  isRequesting={setIsRequesting}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
