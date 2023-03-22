const { default: axios } = require("axios");
const express = require("express"),
  cors = require("cors"),
  session = require("express-session");
const { nanoid } = require("nanoid");
const { numberOfQuestions } = require("./config");

const app = express(),
  PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "vGOqO2qT5QWpCZkN9MgK",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  return res.send("Server works");
});

app.post("/init", (req, res) => {
  const questions = req.session.questions;

  if (questions && questions.length > 0) {
    const nextQuestion = questions.find((v) => !v.user_answer);

    if (!nextQuestion) {
      let points = 0;
      questions.forEach((v) => {
        if (v.correct_answer === v.user_answer) {
          points += 1;
        }
      });

      return res.status(200).send({
        message: "finish",
        points,
        numberOfQuestions,
        questions,
      });
    }

    const nextQuestionIndex = questions.findIndex(
      (v) => v.id === nextQuestion.id
    );

    const question = { ...nextQuestion };

    delete question["correct_answer"];
    delete question["incorrect_answers"];

    return res.status(200).send({
      message: "success",
      question,
      questionIndex: nextQuestionIndex,
      numberOfQuestions,
    });
  }
  return res.status(200).send({
    message: "noquestionsavailable",
    question: null,
    questionIndex: null,
    numberOfQuestions,
  });
});

app.post("/reset", (req, res) => {
  req.session.questions = null;
  return res.status(200).send({
    message: "success",
    question: null,
    questionIndex: null,
    numberOfQuestions,
  });
});

app.get("/question", (req, res) => {
  let questions = req.session.questions;
  if (!questions) {
    return axios
      .get(
        "https://raw.githubusercontent.com/FhilF/zeniark-reactjs-coding-challenge/main/mock-data/questions.json"
      )
      .then((result) => {
        const questions = result.data.results
          .sort(() => Math.random() - Math.random())
          .slice(0, numberOfQuestions);
        const newQuestions = questions.map((v) => ({
          ...v,
          id: nanoid(),
          user_answer: null,
        }));
        req.session.questions = newQuestions;

        const nextQuestion = newQuestions.find((v) => !v.user_answer);
        const nextQuestionIndex = newQuestions.findIndex(
          (v) => v.id === nextQuestion.id
        );
        if (!nextQuestion) {
          let points = 0;
          questions.forEach((v) => {
            if (v.correct_answer === v.user_answer) {
              points += 1;
            }
          });

          return res.status(200).send({
            message: "finish",
            points,
            numberOfQuestions,
            questions,
          });
        }
        const question = { ...nextQuestion };

        delete question["correct_answer"];
        delete question["incorrect_answers"];

        return res.status(200).send({
          message: "success",
          question,
          questionIndex: nextQuestionIndex,
          numberOfQuestions,
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: "error" });
      });
  }

  const nextQuestion = questions.find((v) => !v.user_answer);

  if (!nextQuestion) {
    let points = 0;
    questions.forEach((v) => {
      if (v.correct_answer === v.user_answer) {
        points += 1;
      }
    });

    return res.status(200).send({
      message: "finish",
      points,
      numberOfQuestions,
      questions,
    });
  }
  const nextQuestionIndex = questions.findIndex(
    (v) => v.id === nextQuestion.id
  );
  const question = { ...nextQuestion };

  delete question["correct_answer"];
  delete question["incorrect_answers"];
  return res.status(200).send({
    message: "success",
    question,
    questionIndex: nextQuestionIndex,
    numberOfQuestions,
  });
});

app.post("/question/:id/answer", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  const questions = req.session.questions;
  if (!id || !answer) return res.status(400).send("invalidparams");

  if (!questions) return res.status(500).send("refreshbrowser");

  const objIndex = questions.findIndex((v) => v.id === id);
  if (objIndex === -1) return res.send("invalidid");

  if (questions[objIndex].type === "boolean") {
    questions[objIndex].user_answer = answer
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return res.status(200).send({ message: "success" });
});

app.get("/result", (req, res) => {
  const questions = req.session.questions;
  if (!questions) return res.status(500).send("refreshbrowser");

  const unansweredQuestions = questions.find((v) => !v.user_answer);
  if (unansweredQuestions) {
    return res.status(400).send({ message: "unansweredquestions" });
  }

  let points = 0;
  questions.forEach((v) => {
    if (v.correct_answer === v.user_answer) {
      points += 1;
    }
  });

  return res.status(200).send({
    message: "success",
    points,
    totalQuestion: questions.length,
    questions,
  });
});

app.get("/test", (req, res) => {
  const questions = req.session.questions;
  if (!questions) return res.status(500).send("refreshbrowser");

  return res.status(200).send({ questions });
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
