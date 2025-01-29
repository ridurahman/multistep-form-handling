const nextBtn = document.querySelector(".btn-next");
const goBackBtn = document.querySelector(".btn-back");
const confirmBtn = document.querySelector(".btn-confirm");
const steps = document.querySelectorAll(".steps > .step");
const stepDetails = document.querySelectorAll(".form-step");

const billType = document.querySelectorAll(".billing-type");
const thanks = document.querySelector(".thanks");
const changeBtn = document.querySelector(".change");
const buttonGroup = document.querySelector(".btn-group");
const userInput = {};

let item = 0;
nextBtn.addEventListener("click", (e) => {
  if (validateForm()) {
    item++;
    if (item >= steps.length - 1) {
      item = steps.length - 1;
    }
    console.log(item);
    updateUI();
  }

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
  updateUI();
});

function updateUI() {
  steps.forEach((step, index) => {
    if (step.className.includes("active")) {
      step.classList.remove("active");
      stepDetails[index].classList.remove("form-step--active");
    }
    if (item == index) {
      step.classList.add("active");
      stepDetails[index].classList.add("form-step--active");
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

billType.forEach((el) => {
  el.addEventListener("click", (e) => {
    for (let ele of billType) {
      console.log(ele);
      ele.classList.remove("active");
    }
    el.classList.add("active");
    // e.target.closest(".billing-type").classList.add("active");
  });
});

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

function validateForm() {
  const fields = stepDetails[item].querySelectorAll("input");
  let isValid = true;
  for (let field of fields) {
    if (field.value == "") {
      field.classList.add("invalid");
      isValid = false;
    }
  }
  return isValid;
}
