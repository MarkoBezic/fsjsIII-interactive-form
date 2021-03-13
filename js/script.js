const inputNameEl = document.querySelector("#name");
const inputOtherJobRoleEl = document.querySelector("#other-job-role");
const selectJobRoleEl = document.querySelector("#title");

inputNameEl.setAttribute("focus", true);
inputNameEl.focus();

inputOtherJobRoleEl.style.display = "none";

selectJobRoleEl.addEventListener("change", () => {
  if (selectJobRoleEl.value === "other") {
    inputOtherJobRoleEl.style.display = "block";
  } else {
    inputOtherJobRoleEl.style.display = "none";
  }
});
