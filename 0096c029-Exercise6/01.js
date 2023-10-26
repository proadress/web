const msg = document.getElementById("msg");
const elements = document.getElementsByClassName("dice");
const text = document.createElement("div");
const text2 = document.createElement("div");
const imgElement = document.createElement("img");
imgElement.src = "congrats.png";

document.getElementById("rollButton").addEventListener("click", function () {
  roll(1);
});
document.getElementById("cheatButton").addEventListener("click", function () {
  roll(2);
});
document.getElementById("cheatButton2").addEventListener("click", function () {
  roll(3);
});

function roll(buttontype) {
  let arr = new Array(4);
  msg.innerHTML = "";
  let index = 1;
  for (let i = 0; i < elements.length; i++) {
    if (buttontype == 1) {
      index = Math.floor(Math.random() * 6) + 1;
    } else if (buttontype == 2) {
      if (i == 0) index = Math.floor(Math.random() * 6) + 1;
    } else {
      if (i == 0) index = 6;
      else if (i == 2) index = Math.floor(Math.random() * 5) + 1;
    }
    elements[i].setAttribute("src", "die" + index + ".jpg");
    arr[i] = index;
  }
  arr.sort();
  if (arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == arr[3]) {
    addtext('Congratulations! Your roll is "一色"!');
    msg.appendChild(imgElement);
  } else if (
    (arr[3] == arr[2] && arr[3] == arr[1]) ||
    (arr[0] == arr[1] && arr[0] == arr[2])
  ) {
    addtext("No decision,please re-roll the dice!");
  } else if (arr[0] == arr[1]) {
    const score = arr[2] + arr[3];
    addtext("Your score is " + score);
    if (score == 12) {
      msg.appendChild(imgElement);
      text2.textContent = 'Congratulations! Your roll is "十八"!';
      msg.appendChild(text2);
    }
  } else if (arr[1] == arr[2]) {
    addtext("Your score is " + (arr[0] + arr[3]));
  } else if (arr[2] == arr[3]) {
    const score = addtext("Your score is " + (arr[0] + arr[1]));
  } else {
    addtext('Oops! Your roll is "無面"!');
  }
}
function addtext(s) {
  text.textContent = s;
  msg.appendChild(text);
}
