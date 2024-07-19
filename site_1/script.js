function generateProblem() {
  var num1 = Math.floor(Math.random() * 90) + 10;
  var num2 = Math.floor(Math.random() * 90) + 10;
  document.getElementById("num1").innerText = num1;
  document.getElementById("num2").innerText = num2;
}

function showModal(imageSrc) {
  var modal = document.getElementById("modal");
  var modalImg = document.getElementById("modal-image");
  modal.style.display = "flex";
  modalImg.src = imageSrc;
  setTimeout(function() {
    closeModal();
  }, 3000);
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

function checkAnswer() {
  var answer = parseInt(document.getElementById("answer").value);
  var num1 = parseInt(document.getElementById("num1").innerText);
  var num2 = parseInt(document.getElementById("num2").innerText);
  var correctAnswer = num1 + num2;

  if (answer === correctAnswer) {
    showModal("https://i.ibb.co/L1nnYYg/Dance1.gif");
    generateProblem();
  } else {
    showModal("https://i.ibb.co/VYJJFdF/3F30.gif");
  }
}

window.onload = function() {
  generateProblem();
  closeModal();
};
