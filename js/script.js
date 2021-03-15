const inputNameEl = document.querySelector("#name");
const inputOtherJobRoleEl = document.querySelector("#other-job-role");
const selectJobRoleEl = document.querySelector("#title");
const selectColorEl = document.querySelector("#color");
const selectDesignEl = document.querySelector("#design");
const colorOptions = document.querySelectorAll("[data-theme]");
const registerForActivities = document.querySelector("#activities");
let totalActivitiesCost = 0;

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

//Disable select color field on page load
selectColorEl.disabled = true;

//Listen for design selection and update available colors accordingly
selectDesignEl.addEventListener("change", () => {
  selectColorEl.disabled = false;
  if (selectDesignEl[0].selected) {
    for (let i = 0; i < colorOptions.length; i++) {
      const dataTheme = colorOptions[i].getAttribute("data-theme");
      colorOptions[i].hidden = false;
      if (dataTheme !== "js puns") {
        colorOptions[i].hidden = true;
      }
    }
  } else if (selectDesignEl[1].selected) {
    for (let i = 0; i < colorOptions.length; i++) {
      const dataTheme = colorOptions[i].getAttribute("data-theme");
      colorOptions[i].hidden = false;
      if (dataTheme !== "heart js") {
        colorOptions[i].hidden = true;
      }
    }
  }
});

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
