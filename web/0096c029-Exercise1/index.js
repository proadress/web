function sayhello() {
  console.log("hello");
}

document.getElementById("myButton").onclick = function () {
  var m = document.getElementById("myText").value;

  console.log("hello", m);
};
sayhello();
