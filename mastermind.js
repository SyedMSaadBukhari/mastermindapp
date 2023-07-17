let colorSequence = [];
let selectedColor = null;
let selectedClass = null;
let activeRow = 0;
let selectedColorSequence = [];
let clearfixBox = null;
let decodeRow = null;

let rules = document.querySelector(".rules");
let toggleButton = rules.querySelector(".toggle-button");
let info = rules.querySelector(".info");

toggleButton.addEventListener("click", () => {
  if (toggleButton.innerHTML === "Show Rules") {
    info.style.display = "block";
    toggleButton.innerHTML = "Hide Rules";
  } else if (toggleButton.innerHTML === "Hide Rules") {
    info.style.display = "none";
    toggleButton.innerHTML = "Show Rules";
  }
});

function gameStart() {
  const pegElements = document.querySelectorAll(".color-palatte .peg input");
  while (colorSequence.length < 4) {
    const randomColorIndex = Math.floor(Math.random() * pegElements.length);
    colorSequence.push(pegElements[randomColorIndex].value);
  }
  console.log(colorSequence);

  pegElements.forEach((peg) => {
    peg.addEventListener("click", () => {
      selectedColor = peg.value;
      console.log(selectedColor);
    });
  });

  clearfixBox = document.getElementsByClassName("clearfix-box");

  clearfixBox[0].classList.add("active");

  decodeRow = document.getElementsByClassName("decode-row");

  for (let i = 0; i < decodeRow.length; i++) {
    let clearfixPegElements = decodeRow[i].getElementsByClassName("peg");

    for (let j = 0; j < clearfixPegElements.length; j++) {
      let peg = clearfixPegElements[j];

      peg.addEventListener("click", function handleClick() {
        peg.className = "peg " + selectedColor;

        selectedColorSequence.push(selectedColor);

        console.log(selectedColorSequence);

        peg.removeEventListener("click", handleClick);

        checkRowCompletion();
      });
    }
  }
}

function checkRowCompletion() {
  let currentRow = decodeRow[activeRow];
  let currentPegElements = currentRow.getElementsByClassName("peg");

  let isCompleted = true;

  for (let i = 0; i < currentPegElements.length; i++) {
    if (!currentPegElements[i].classList.contains(selectedColorSequence[i])) {
      isCompleted = false;
      break;
    }
  }

  if (isCompleted) {
    document.getElementsByClassName("submit")[activeRow].style.display =
      "block";

    for (let j = 0; j < clearfixBox.length; j++) {
      clearfixBox[j].classList.add("disabled");
    }

    clearfixBox[activeRow].classList.remove("disabled");
  }
}

let submitButtons = document.querySelectorAll(".submit");

submitButtons.forEach(function (submitButton) {
  submitButton.addEventListener("click", function () {
    let hintElements = clearfixBox[activeRow].querySelectorAll(".hints .hint");

    for (let k = 0; k < colorSequence.length; k++) {
      let hintElement = hintElements[k];

      if (selectedColorSequence.join("") === colorSequence.join("")) {
        endGameSuccess();
      }

      if (selectedColorSequence[k] === colorSequence[k]) {
        hintElement.style.backgroundColor = "black";
      } else if (colorSequence.includes(selectedColorSequence[k])) {
        hintElement.style.backgroundColor = "white";
      } else {
        hintElement.style.backgroundColor = "red";
      }
    }
    if (activeRow === clearfixBox.length - 1) {
      endGame();
    } else if (activeRow < clearfixBox.length - 1) {
      clearfixBox[activeRow].classList.remove("active");
      activeRow++;
      clearfixBox[activeRow].classList.add("active");
    }

    for (let j = 0; j < clearfixBox.length; j++) {
      clearfixBox[j].classList.add("disabled");
    }

    clearfixBox[activeRow].classList.remove("disabled");

    selectedColorSequence.length = 0;
  });
});

let gameFaliure = document.querySelector(".endgame");
let endGameRelative = gameFaliure.querySelector(".endgame-relative");
let endGameHeader = endGameRelative.querySelector(".endgame-header");
let endGameButton = endGameRelative.querySelector(".endgame-button");
// console.log((endGameHeader.innerHTML = "congrats"));
// console.log(endGameButton.innerHTML);

endGameButton.addEventListener("click", function () {
  gameReset();
});

function endGame() {
  gameFaliure.style.display = "block";
  endGameRelative.classList = "endgame-relative " + "failure";
  console.log(endGameRelative);
}

function endGameSuccess() {
  gameFaliure.style.display = "block";
  endGameRelative.classList = "endgame-relative " + "success";
  endGameHeader.innerHTML = "Congratulations!";
}

function gameReset() {
  colorSequence = [];
  selectedColor = null;
  selectedClass = null;
  activeRow = 0;
  selectedColorSequence.length = 0;

  for (let i = 0; i < clearfixBox.length; i++) {
    const box = clearfixBox[i];
    box.classList.remove("active", "disabled");

    let pegs = box.getElementsByClassName("peg");
    for (let j = 0; j < pegs.length; j++) {
      pegs[j].className = "peg";
    }

    let hints = box.querySelectorAll(".hints .hint");
    for (let k = 0; k < hints.length; k++) {
      hints[k].style.backgroundColor = "";
    }
  }
  submitButtons.forEach(function (submitButton) {
    submitButton.style.display = "none";
  });

  gameFaliure.style.display = "none";
  gameStart();
}
gameStart();
