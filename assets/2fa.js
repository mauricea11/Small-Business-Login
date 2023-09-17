function onlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
function nextInput(val) {
  var input = document.getElementsByClassName("code");
  try {
    if (input[val - 1].value != "") {
      input[val].focus();
    }
  } catch (error) {}
}
var time;

function resendToken() {
  time = 11;
  resetTimer();
  // function send OTP here
  alert("resend OTP success");
}
