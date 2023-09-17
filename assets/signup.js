// localStorage.clear();
const teacherButton = document.getElementById("teacherbtn");
const studentButton = document.getElementById("studentbtn");
const adminButton = document.getElementById("adminbtn");
const registerBtn = document.getElementById("registerbutton");
const apiKey = "913756fae32756effba1c031c662ad28"; //REMOVE!!!
const appID = "e18a7081"; //REMOVE!!!
let teacherButtonVal = "";
let studentButtonVal = "";
let adminButtonVal = "";
let name = document.getElementById("nameinput");
let email = document.getElementById("emailinput");
let username = document.getElementById("usernameinput");
let password = document.getElementById("passwordinput");
let phone = document.getElementById("phoneinput");
let schoolSelection = document.getElementById("input");
let schoolAPIURL =
  "https://api.schooldigger.com/v2.0/schools?st=NY&perPage=50&appID=e18a7081&appKey=913756fae32756effba1c031c662ad28";
let teacherButtonClicked = false;
let studentButtonClicked = false;
let adminButtonClicked = false;
let role = "";

let names = [];

async function loadSchools() {
  const response = await fetch(schoolAPIURL, {
    method: "GET",
  });
  const data = await response.json();

  // console.log(data.schoolList);

  let schoolArr = data.schoolList.map((q) => {
    return q.schoolName;
  });

  // console.log(schoolArr);

  for (let i = 0; i < schoolArr.length; i++) {
    names.push(schoolArr[i]);
  }
  console.log(names);
}
loadSchools();

//Sort names in ascending order
let sortedNames = names.sort();

//reference
let input = document.getElementById("input");

//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
    // console.log(i);
  }
});
function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}

// Keep other buttons black when one is clicked
teacherButton.addEventListener("click", () => {
  studentButtonClicked = false;
  adminButtonClicked = false;
  teacherButtonClicked = true;
  teacherButtonVal = teacherButton.innerText;
  role = teacherButtonVal;
  adminButton.style.borderColor = "black";
  studentButton.style.borderColor = "black";
  teacherButton.style.borderColor = "orange";
});

studentButton.addEventListener("click", () => {
  teacherButtonClicked = false;
  adminButtonClicked = false;
  studentButtonClicked = true;
  studentButtonVal = studentButton.innerText;
  role = studentButtonVal;
  teacherButton.style.borderColor = "black";
  adminButton.style.borderColor = "black";
  studentButton.style.borderColor = "orange";
});

adminButton.addEventListener("click", () => {
  teacherButtonClicked = false;
  studentButtonClicked = false;
  adminButtonClicked = true;
  adminButtonVal = adminButton.innerText;
  role = adminButtonVal;
  teacherButton.style.borderColor = "black";
  studentButton.style.borderColor = "black";
  adminButton.style.borderColor = "orange";
});

registerBtn.addEventListener("click", () => {
  let selectedSchool = schoolSelection.value;
  name = name.value;
  email = email.value;
  username = username.value;
  password = password.value;
  phone = phone.value;

  if (teacherButtonClicked) {
    console.log(teacherButtonVal);
    localStorage.setItem("role", role);
  } else if (studentButtonClicked) {
    console.log(studentButtonVal);
    localStorage.setItem("role", role);
  } else {
    console.log(adminButtonVal);
    localStorage.setItem("role", role);
  }

  console.log(name);
  console.log(email);
  console.log(username);
  console.log(password);
  console.log(phone);
  console.log(selectedSchool);

  localStorage.setItem("name", name);
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
});

registerBtn.addEventListener("click", () => {
  window.location.href = "2fa.html";
});
