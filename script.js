const nextBtn = document.querySelector(".btn-next");
const goBackBtn = document.querySelector(".btn-back");
const confirmBtn = document.querySelector(".btn-confirm");
const steps = document.querySelectorAll(".steps > .step");
const stepDetails = document.querySelectorAll(".form-step");
const form = document.querySelector(".form");
const billType = document.querySelectorAll(".billing-type");
const thanks = document.querySelector(".thanks");
const changeBtn = document.querySelector(".change");
const buttonGroup = document.querySelector(".btn-group");
const plan = document.getElementById("plan");
const planName = document.querySelector(".plan-name-confirm");
const planPrice = document.querySelector(".plan-price-confirm");
const monthlyPlan = document.getElementById("monthly");
const yearlyPlan = document.getElementById("yearly");
const monthlyAddOns = document.getElementById("monthly-addons");
const yearlyAddOns = document.getElementById("yearly-addons");
const addOns = document.querySelectorAll(".add-ons-type");
const addOnsConfirm = document.querySelector(".services");
const totalPrice = document.querySelector(".total-price");
const userInput = {};
let item = 0;

console.log(addOns);
for (let child in yearlyPlan.children) {
  console.log(child);
}
nextBtn.addEventListener("click", (e) => {
  // if (validateForm(fields)) {

  item++;
  let fields = stepDetails[item].querySelectorAll("input");
  if (item >= steps.length - 1) {
    item = steps.length - 1;
  }
  // console.log(item);
  // console.log(stepDetails[item]);
  updateUI();
  // console.log(fields);
  // }

  //
  // if (steps.length === stepDetails.length) {
  //   steps.forEach((step, index) => {
  //     if (step.className === "step active") {
  //       // step.classList.remove("active");
  //       item = index + 1;
  //     }
  //     if (index == item) {
  //       step.classList.add("active");
  //       stepDetails[item - 1].classList.remove("form-step--active");
  //       stepDetails[item].classList.add("form-step--active");
  //     }
  //   });
  // }
});

goBackBtn.addEventListener("click", (e) => {
  item--;
  if (item <= 0) {
    item = 0;
  }
  // steps[item + 1].classList.remove("active");
  updateUI();
});

function updateUI() {
  steps.forEach((step, index) => {
    if (stepDetails[index].className.includes("form-step--active")) {
      // step.classList.remove("active");
      stepDetails[index].classList.remove("form-step--active");
    }
    if (item == index) {
      step.classList.add("active");
      stepDetails[index].classList.add("form-step--active");
    }
    if (item < index) {
      step.classList.remove("active");
    }
  });

  if (item == 0) {
    goBackBtn.style.display = "none";
  } else if (item == steps.length - 1) {
    nextBtn.style.display = "none";
    confirmBtn.style.display = "block";
  } else {
    goBackBtn.style.display = "block";
    nextBtn.style.display = "block";
    confirmBtn.style.display = "none";
  }
}

confirmBtn.addEventListener("click", (e) => {
  stepDetails[3].classList.remove("form-step--active");
  buttonGroup.style.display = "none";
  thanks.style.display = "block";
});

// userInput["plan"] = "Monthly";

function handlePlan() {
  if (plan.checked) {
    userInput[plan.name] = "Yearly";
    yearlyPlan.style.display = "flex";
    monthlyPlan.style.display = "none";

    yearlyAddOns.style.display = "block";
    monthlyAddOns.style.display = "none";
  } else {
    userInput[plan.name] = "Monthly";
    yearlyPlan.style.display = "none";
    monthlyPlan.style.display = "flex";

    yearlyAddOns.style.display = "none";
    monthlyAddOns.style.display = "block";
  }
  console.log(plan);
}

handlePlan();

function handleBillType() {
  billType.forEach((el) => {
    if (
      el.classList.contains("active") &&
      el.closest(".billing").id.toLowerCase() == userInput["plan"].toLowerCase()
    ) {
      userInput["billName"] = el.querySelector(".bill-name").innerHTML;
      userInput["billPrice"] = el.querySelector(".bill-price").innerHTML;
    }
    el.addEventListener("click", (e) => {
      for (let ele of billType) {
        ele.classList.remove("active");
      }
      let type = el.dataset.type;
      monthlyPlan.children[type].classList.add("active");
      yearlyPlan.children[type].classList.add("active");
      // console.log(el.querySelector(".bill-name").innerHTML);
      if (
        el.classList.contains("active") &&
        el.closest(".billing").id.toLowerCase() ==
          userInput["plan"].toLowerCase()
      ) {
        userInput["billName"] = el.querySelector(".bill-name").innerHTML;
        userInput["billPrice"] = el.querySelector(".bill-price").innerHTML;
      }
      // e.target.closest(".billing-type").classList.add("active");
      updateConfirm();
    });
  });
}
handleBillType();
userInput["add-ons"] = {};
function handleAddOns() {
  addOns.forEach((el) => {
    let servicePrice = el
      .closest(".add-ons")
      .querySelector(".service-price").innerHTML;

    if (
      el.checked &&
      el.closest(".add-ons-duration").dataset.duration.toLowerCase() ==
        userInput["plan"].toLowerCase()
    ) {
      userInput["add-ons"] = {
        ...userInput["add-ons"],
        [el.name]: { name: el.value, price: servicePrice },
      };
    }
    // console.log(el.name in userInput["add-ons"]);
    else if (el.name in userInput["add-ons"]) {
      delete userInput["add-ons"][el.name];
    }
  });
}
handleAddOns();

function handleAddOnsConfirm() {
  // userInput["add-ons"].forEach((el) => {
  //   console.log(el);
  // });
  addOnsConfirm.innerHTML = "";
  let duration = "";
  if (userInput["plan"] == "Monthly") {
    duration = "mo";
  } else {
    duration = "yr";
  }
  for (let key in userInput["add-ons"]) {
    // console.log(userInput["add-ons"][key]);
    addOnsConfirm.innerHTML += `<div class="service">
                    <p>${userInput["add-ons"][key]["name"]}</p>
                    <span>+$${userInput["add-ons"][key]["price"]}/${duration}</span>
                  </div>`;
  }
}

handleAddOnsConfirm();

changeBtn.addEventListener("click", (e) => {
  // stepDetails[3].classList.remove("form-step--active");
  // steps[3].classList.remove("active");
  // confirmBtn.style.display = "none";
  // stepDetails[1].classList.add("form-step--active");
  // steps[1].classList.add("active");
  // nextBtn.style.display = "block";
  item = 1;
  updateUI();
});
// console.log(item);
// let validCount = 0;
form.addEventListener("input", (e) => {
  let fields = stepDetails[item].querySelectorAll("input");
  // for (let field of fields) {

  if (e.target.type !== "checkbox") {
    if (validateForm(e.target)) {
      userInput[e.target.name] = e.target.value;
      // validCount++;
    }
    // else if (userInput[e.target.name]) {
    //   delete userInput[e.target.name];
    // }

    // }
    // console.log(fields);
    let validity = true;
    for (let field of fields) {
      // console.log(field.classList);
      if (field.classList.contains("invalid") || !userInput[field.name]) {
        validity = false;
      }
    }
    if (validity) {
      nextBtn.classList.remove("btn-next--disabled");
    } else if (!nextBtn.classList.contains("btn-next--disabled")) {
      nextBtn.classList.add("btn-next--disabled");
    }
  }

  // if (Object.keys(userInput).length == fields.length) {
  //   nextBtn.classList.remove("btn-next--disabled");
  // } else if (!nextBtn.classList.contains("btn-next--disabled")) {
  //   nextBtn.classList.add("btn-next--disabled");
  // }

  if (e.target.name == "plan") {
    // billType.forEach((el, index) => {
    //   if (
    //     el.closest(".billing").id.toLowerCase() ==
    //       userInput["plan"].toLowerCase() &&
    //     el.classList.contains("active")
    //   ) {
    //     // el.classList.remove("active");
    //     console.log(index);
    //     if(index)
    //   }
    // });
    handlePlan();
    handleBillType();
    handleAddOns();
    handleAddOnsConfirm();
  }

  if (e.target.className == "add-ons-type") {
    handleAddOns();
    handleAddOnsConfirm();
  }
  updateConfirm();
  console.log(userInput);
  // field.addEventListener("change", (e) => {
  // validateForm(fields);
  // });
  // if(e.target.matches(""))
});

function validateForm(field) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phoneNo = document.getElementById("phoneNo");
  let isValid = true;
  // console.log(field == name);
  let invalidfield = field.closest(".input");
  if (field.value == "") {
    field.classList.add("invalid");
    invalidfield.querySelector(".invalid-message").innerHTML =
      "This field is required";
    isValid = false;
  } else if (field == name) {
    if (name.value != "" && !isValidName(name.value)) {
      field.classList.add("invalid");
      name.closest(".input").querySelector(".invalid-message").innerHTML =
        "Please enter a valid name!";
      isValid = false;
    } else {
      field.classList.remove("invalid");
      name.closest(".input").querySelector(".invalid-message").innerHTML = "";
    }
  } else if (field == email) {
    if (email.value != "" && !isValidEmail(email.value)) {
      field.classList.add("invalid");
      email.closest(".input").querySelector(".invalid-message").innerHTML =
        "Please enter a valid email address!";
      isValid = false;
    } else {
      field.classList.remove("invalid");
      email.closest(".input").querySelector(".invalid-message").innerHTML = "";
    }
  } else if (field == phoneNo) {
    if (phoneNo.value != "" && !isValidPhoneNo(phoneNo.value)) {
      field.classList.add("invalid");
      phoneNo.closest(".input").querySelector(".invalid-message").innerHTML =
        "Please enter a valid phone number (10 digits)!";
      isValid = false;
    } else {
      field.classList.remove("invalid");
      phoneNo.closest(".input").querySelector(".invalid-message").innerHTML =
        "";
    }
  }
  console.log(isValid);
  return isValid;
}

// function isEmpty(fields) {
//   let empty = false;
//   for (let field of fields) {
//     let invalidfield = field.closest(".input");
//     if (field.value == "") {
//       field.classList.add("invalid");
//       invalidfield.querySelector(".invalid-message").innerHTML =
//         "This field is required";
//       empty = true;
//     } else {
//       invalidfield.querySelector(".invalid-message").innerHTML = "";
//       field.classList.remove("invalid");
//     }
//   }
//   return empty;
// }

function isValidName(name) {
  let namePattern = /^\s*([A-Za-z]{1,}([\.,] |[-']| ?))+\.?\s*$/;
  return namePattern.test(name);
}

function isValidEmail(email) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

function isValidPhoneNo(phoneNo) {
  let phonePattern = /^[0-9]{10}$/;
  return phonePattern.test(phoneNo);
}

function calculateTotal() {
  let servicesPrice = 0;
  for (let key in userInput["add-ons"]) {
    servicesPrice += Number(userInput["add-ons"][key]["price"]);
  }
  return Number(userInput["billPrice"]) + servicesPrice;
}

function updateConfirm() {
  planName.innerHTML = `${userInput["billName"]} (${userInput["plan"]})`;
  if (userInput["plan"] == "Monthly") {
    planPrice.innerHTML = `$${userInput["billPrice"]}/mo`;
    totalPrice.innerHTML = `$${calculateTotal()}/mo`;
  } else {
    planPrice.innerHTML = `$${userInput["billPrice"]}/yr`;
    totalPrice.innerHTML = `$${calculateTotal()}/yr`;
  }
  console.log(calculateTotal());
}
updateConfirm();
