const inputNameEl = document.querySelector("#name");
const inputEmailEl = document.querySelector("#email");
const inputOtherJobRoleEl = document.querySelector("#other-job-role");
const selectJobRoleEl = document.querySelector("#title");
const selectColorEl = document.querySelector("#color");
const selectDesignEl = document.querySelector("#design");
const colorOptions = document.querySelectorAll("[data-theme]");
const registerForActivities = document.querySelector("#activities");
const activitiesBoxEl = document.querySelector("#activities-box");
const activitiesCheckbox = document.querySelectorAll("[type='checkbox']");
let totalActivitiesCost = 0;
const selectPaymentEl = document.querySelector("#payment");
const creditCardEl = document.querySelector("#credit-card");
const inputCreditCardNumEl = document.querySelector("#cc-num");
const inputZipcodeEl = document.querySelector("#zip");
const inputCvvEl = document.querySelector("#cvv");
const paypalEl = document.querySelector("#paypal");
const bitcoinEl = document.querySelector("#bitcoin");
const formEl = document.querySelector("form");

// Basic Info //

//Set name field to focus state on page load
inputNameEl.setAttribute("focus", true);
inputNameEl.focus();

//Hide input field of 'other' job role
inputOtherJobRoleEl.style.display = "none";

//If otther is selected unhide the other job role input field
selectJobRoleEl.addEventListener("change", () => {
  if (selectJobRoleEl.value === "other") {
    inputOtherJobRoleEl.style.display = "inherit";
  } else {
    inputOtherJobRoleEl.style.display = "none";
  }
});

// T-Shirt info //

//Disable select color field on page load
selectColorEl.disabled = true;

//Listen for design selection and update available colors accordingly
selectDesignEl.addEventListener("change", () => {
  selectColorEl.disabled = false;
  selectColorEl.firstElementChild.selected = true;
  for (let i = 0; i < colorOptions.length; i++) {
    const dataThem = colorOptions[i].getAttribute("data-theme");
    if (selectDesignEl.value === dataThem) {
      colorOptions[i].hidden = false;
    } else {
      colorOptions[i].hidden = true;
    }
  }
});

// Register for Activities //

//When activity checked/unchecked update total accordingly
registerForActivities.addEventListener("change", (e) => {
  const individualActivityCost = e.target.getAttribute("data-cost");
  const activitiesCostEl = document.querySelector(".activities-cost");

  if (e.target.checked) {
    totalActivitiesCost += Number(individualActivityCost);
  } else {
    totalActivitiesCost -= Number(individualActivityCost);
  }
  activitiesCostEl.innerHTML = `Total: $${totalActivitiesCost}.00`;
});

//Listen for focus even and add focused class to element
for (let i = 0; i < activitiesCheckbox.length; i++) {
  activitiesCheckbox[i].addEventListener("focus", () => {
    activitiesCheckbox[i].parentElement.classList.add("focus");
  });
}

//Listen for blurr event and remove focus class
for (let i = 0; i < activitiesCheckbox.length; i++) {
  activitiesCheckbox[i].addEventListener("blur", () => {
    activitiesCheckbox[i].parentElement.classList.remove("focus");
  });
}

// Payment info: //

// Functions to set payment methods
setCreditCardAsPayment = () => {
  selectPaymentEl[1].selected = true;
  creditCardEl.hidden = false;
  paypalEl.hidden = true;
  bitcoinEl.hidden = true;
};

setPaypalAsPayment = () => {
  creditCardEl.hidden = true;
  paypalEl.hidden = false;
  bitcoinEl.hidden = true;
};

setBitcoinAsPayment = () => {
  creditCardEl.hidden = true;
  paypalEl.hidden = true;
  bitcoinEl.hidden = false;
};

//defualt payment method
setCreditCardAsPayment();

//Update payment info fields based on selection
selectPaymentEl.addEventListener("change", () => {
  if (selectPaymentEl[1].selected) {
    setCreditCardAsPayment();
  } else if (selectPaymentEl[2].selected) {
    setPaypalAsPayment();
  } else if (selectPaymentEl[3].selected) {
    setBitcoinAsPayment();
  }
});

//Form validation//
updateStylesForFailedValidation = (element) => {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "inherit";
};

updateStylesForPassedValidation = (element) => {
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
  element.parentElement.lastElementChild.style.display = "none";
};

//validator functions
nameValidator = () => {
  const regEx = /[a-zA-Z]/g;
  const string = inputNameEl.value;
  const nameIsValid = regEx.test(string);
  if (!nameIsValid) {
    updateStylesForFailedValidation(inputNameEl);
  } else {
    updateStylesForPassedValidation(inputNameEl);
  }
  return nameIsValid;
};

emailValidator = () => {
  const regEx = /^[^@]+@[^@]+\.com/g;
  const string = inputEmailEl.value;
  const emailIsValid = regEx.test(string);
  if (!emailIsValid) {
    updateStylesForFailedValidation(inputEmailEl);
  } else {
    updateStylesForPassedValidation(inputEmailEl);
  }
  return emailIsValid;
};

activitiesValidator = () => {
  const activtyIsValid = totalActivitiesCost > 0;
  if (!activtyIsValid) {
    updateStylesForFailedValidation(activitiesBoxEl);
  } else {
    updateStylesForPassedValidation(activitiesBoxEl);
  }
  return activtyIsValid;
};

cardNumberValidator = () => {
  const regEx = /^[0-9]{13,16}$/g;
  const string = inputCreditCardNumEl.value;
  const cardNumberIsValid = regEx.test(string);
  if (!cardNumberIsValid) {
    updateStylesForFailedValidation(inputCreditCardNumEl);
  } else {
    updateStylesForPassedValidation(inputCreditCardNumEl);
  }
  return cardNumberIsValid;
};

zipCodeValidator = () => {
  const regEx = /^[0-9]{5}$/g;
  const string = inputZipcodeEl.value;
  const zipCodeIsValid = regEx.test(string);
  if (!zipCodeIsValid) {
    updateStylesForFailedValidation(inputZipcodeEl);
  } else {
    updateStylesForPassedValidation(inputZipcodeEl);
  }
  return zipCodeIsValid;
};

cvvValidator = () => {
  const regEx = /^[0-9]{3}$/g;
  const string = inputCvvEl.value;
  const cvvIsValid = regEx.test(string);
  if (!cvvIsValid) {
    updateStylesForFailedValidation(inputCvvEl);
  } else {
    updateStylesForPassedValidation(inputCvvEl);
  }
  return cvvIsValid;
};

creditCardValidator = () => {
  if (selectPaymentEl[1].selected) {
    const creditCardinfoIsValid =
      cardNumberValidator() && zipCodeValidator() && cvvValidator();
    return creditCardinfoIsValid;
  } else {
    return true;
  }
};

formEl.addEventListener("submit", (e) => {
  if (!nameValidator()) {
    e.preventDefault();
    console.log("nameValidator prevented Submission");
  }
  if (!emailValidator()) {
    e.preventDefault();
    console.log("emailValidator prevented Submission");
  }
  if (!activitiesValidator()) {
    e.preventDefault();
    console.log("activityValidator prevented Submission");
  }
  if (!creditCardValidator()) {
    e.preventDefault();
    console.log("creditCardValidator prevented Submission");
  }
});
