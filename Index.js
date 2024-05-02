/*
Copyright 2024 DolmaAndKebab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

if (document.getElementById("Quiz") instanceof HTMLElement) {
  var Quiz_Container = document.getElementById("Quiz");
}

const Quiz = [
  {
    Question: "What is 1 + 1",
    Answers: ["1", "2", "3", "4", "5"],
    Real_Answer: "2",
  },
  {
    Question: "What is 2 + 2",
    Answers: ["1", "4", "5", "6", "10"],
    Real_Answer: "4",
  },
];

let Quiz_Num = 0;
let Quiz_Max = Quiz.length;
let Toggled = 0;

function Handle_Toggled_Answer() {
  // Unselecting untoggled answers
  for (const index of Quiz[Quiz_Num].Answers) {
    if (document.getElementById(index.toString()) instanceof HTMLElement) {
      const Element = document.getElementById(index.toString());
      if (Element.id != Toggled.toString()) {
        Element.classList.remove("btn-success");
        Element.classList.add("btn-primary");
      }
    }
  }

  // Selecting toggled answers
  if (document.getElementById(Toggled.toString()) instanceof HTMLElement) {
    const Toggled_Answer = document.getElementById(Toggled.toString());

    Toggled_Answer.classList.remove("btn-primary");
    Toggled_Answer.classList.add("btn-success");
  }
}

function Show_Quiz() {
  // Showing the win screen!
  if (Quiz_Num > Quiz_Max) {
    const sumbit = document.getElementById("submit");
    sumbit.remove();

    while (Quiz_Container.firstChild) {
      Quiz_Container.removeChild(Quiz_Container.firstChild);
    }
  }

  // Setting Quiz_Container
  while (Quiz_Container.firstChild) {
    Quiz_Container.removeChild(Quiz_Container.firstChild);
  }
  // Creating Question Element
  const Question = document.createElement("p");

  Question.innerHTML = Quiz[Quiz_Num].Question;

  // Creating Answers Element
  const Answers = document.createElement("p");

  Answers.innerHTML = `Answers: <span>${Quiz[Quiz_Num].Answers}</span>`;

  // Creating Instructions Element
  const Instructions = document.createElement("p");

  Instructions.innerHTML = "Pick a Answer!";

  // Creating Answers Container Element

  const Answers_Container = document.createElement("div");

  Answers_Container.id = "Answers_Container";

  // Appending the Quiz onto the Quiz Container
  Quiz_Container.appendChild(Question);
  Quiz_Container.appendChild(Answers);
  Quiz_Container.appendChild(Instructions);
  Quiz_Container.appendChild(Answers_Container);

  // Creating Answers Element
  for (const index of Quiz[Quiz_Num].Answers) {
    const Answer_Element = document.createElement("button");

    Answer_Element.innerHTML = index.toString();
    Answer_Element.type = "button";
    Answer_Element.classList.add("btn");
    Answer_Element.classList.add("btn-primary");
    Answer_Element.id = index.toString();

    Answer_Element.addEventListener("click", () => {
      Toggled = Answer_Element.id;
      Handle_Toggled_Answer();
    });

    Answers_Container.appendChild(Answer_Element);
  }
}

function Check_Quiz_Format() {
  if (typeof Quiz[Quiz_Num].Question !== "string") {
    return false;
  }
  if (!Array.isArray(Quiz[Quiz_Num].Answers)) {
    return false;
  }
  for (const index of Quiz[Quiz_Num].Answers) {
    if (typeof index !== "string") {
      return false;
    }
  }
  if (typeof Quiz[Quiz_Num].Real_Answer !== "string") {
    return false;
  }

  return true;
}

function Handle_Quiz() {
  // Showing the quiz
  if (Check_Quiz_Format()) {
    Show_Quiz();

    const SumbitButton = document.getElementById("Sumbit");

    SumbitButton.addEventListener("click", () => {
      if (Toggled.toString() === Quiz[Quiz_Num].Real_Answer.toString()) {
        // Setting Quiz_Container
        while (Quiz_Container.firstChild) {
          Quiz_Container.removeChild(Quiz_Container.firstChild);
        }

        // Creating Correct Message
        const Correct_Message = document.createElement("div");

        Correct_Message.classList.add("alert");
        Correct_Message.classList.add("alert-success");
        Correct_Message.role = "alert";

        Correct_Message.innerHTML = "That's correct!";

        // Creating Next Button
        const Next = document.createElement("button");

        Next.classList.add("btn");
        Next.classList.add("btn-primary");
        Next.type = "button";

        Next.innerHTML = "Go to New Quiz!";

        // Appending Elements
        Quiz_Container.appendChild(Correct_Message);
        Quiz_Container.append(Next);

        // Handling Next
        Next.addEventListener("click", () => {
          Toggled = 0;
          Quiz_Num += 1;
          Handle_Quiz();
        });
      } else {
        // Setting Quiz_Container
        while (Quiz_Container.firstChild) {
          Quiz_Container.removeChild(Quiz_Container.firstChild);
        }

        // Creating Incorrect Message
        const Incorrect_Message = document.createElement("div");

        Incorrect_Message.classList.add("alert");
        Incorrect_Message.classList.add("alert-danger");
        Incorrect_Message.role = "alert";

        Incorrect_Message.innerHTML = "Oh no! That's incorrect!";

        // Creating Retry Buttton
        const Retry = document.createElement("button");

        Retry.classList.add("btn");
        Retry.classList.add("btn-primary");
        Retry.type = "button";

        Retry.innerHTML = "Retry";

        // Appending Elements
        Quiz_Container.appendChild(Incorrect_Message);
        Quiz_Container.appendChild(Retry);

        // Handling Retry
        Retry.addEventListener("click", () => {
          Toggled = 0;
          Quiz_Num = 0;
          Handle_Quiz();
        });
      }
    });
  } else {
    console.error("Quiz is not in correct format!");
  }
}

Handle_Quiz();
