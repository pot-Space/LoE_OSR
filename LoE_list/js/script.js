"use strict";

import { config } from "./character_reference.js";

const perksBody = document.querySelector(".perks__body"),
  btnAddnew = document.querySelector("#addnew"),
  tnDownload = document.querySelector("#download"),
  btnSave = document.querySelector("#save");

function settingPerks(obj) {
  for (let i = 0; i < obj.length; i++) {
    let divSkill = document.createElement("div"),
      h3SkillHeader = document.createElement("h3");

    divSkill.className = "skill";
    h3SkillHeader.className = "skill__header";

    let { header, text } = obj[i];

    perksBody.append(divSkill);
    h3SkillHeader.textContent = header;
    divSkill.append(h3SkillHeader);

    for (let j = 0; j < text.length; j++) {
      let { para, checked } = text[j];

      let divSkillBody = document.createElement("div"),
        label = document.createElement("label"),
        input = document.createElement("input"),
        checkboxStyleCheckmark = document.createElement("div"),
        checkboxStyleBody = document.createElement("div");

      divSkillBody.className = "skill__body";
      label.className = "checkbox-style";
      input.type = "checkbox";
      checkboxStyleCheckmark.className = "checkbox-style__checkmark";
      checkboxStyleBody.className = "checkbox-style__body";
      if (checked == true) {
        input.setAttribute("checked", "true");
        checkboxStyleBody.classList.add("bg-carpet");
      }

      checkboxStyleBody.innerHTML = para;

      divSkillBody.append(label);
      label.append(input, checkboxStyleCheckmark, checkboxStyleBody);
      divSkill.append(divSkillBody);
    }
  }
}

let perksValueToJSON = JSON.stringify(config.rascal.perksValue); // Динамически ${rascal имя листа или сохранения, если есть}
window.localStorage.setItem("PerksValue", perksValueToJSON);
let backObjPerksValue = JSON.parse(localStorage.getItem("PerksValue"));

settingPerks(backObjPerksValue);

document.addEventListener("DOMContentLoaded", function () {
  const skillBody = document.querySelectorAll(".skill__body");
  skillBody.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      let target = event.target;

      if (target.checked) {
        target.parentNode.lastElementChild.classList.add("bg-carpet");
        target.parentNode.firstElementChild.setAttribute("checked", "true");
      } else {
        target.parentNode.lastElementChild.classList.remove("bg-carpet");
        target.parentNode.firstElementChild.removeAttribute("checked");
      }
    });
  });
});

// class Class {
//     constructor() {}
//     checked() {}
// }