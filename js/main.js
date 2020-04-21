// DOM elements
const select = document.getElementById("select-nb");
const groups = document.getElementById("groups");

/**
 * populate select tag in html
 *
 * @param {array} array
 * @param {object} selectTag
 *
 * @returns {void}
 */
const createSelectTag = (array, selectTag) => {
  const length = array.length;
  for (let i = 1; i <= length / 2; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    selectTag.appendChild(option);
  }
};

/**
 * generate random index in range
 *
 * @param {int} max
 */
const generateRandomIndex = (max) => {
  return Math.round(Math.random() * (max - 1));
};

/**
 *  generate random group according to chunk size
 *
 * @param {int} chunk - size of group
 * @param {array} group
 *
 * @returns {array}
 */
const generateRandomGroup = (chunk, group) => {
  const groupMembers = [];
  const newGroup = [...group]; // use spread operator to avoid mutation of original array

  for (let i = 0; i < chunk; i++) {
    const length = newGroup.length;
    const index = generateRandomIndex(length);
    groupMembers.push(newGroup[index]);
    newGroup.splice(index, 1);
  }
  console.log(groupMembers);
  return groupMembers;
};

/**
 * splits a group into smaller groups according to number
 *
 * @param {int} number - number of groups
 * @param {array} group - group to be splitted
 *
 * @returns {array}
 */
const splitGroup = (number, group) => {
  const groupList = [];
  const newGroup = [...group]; // use spread operator to avoid mutation of original array
  const length = newGroup.length;
  const chunk = Math.floor(length / number);

  for (let i = 1; i <= number; i++) {
    groupList.push(generateRandomGroup(chunk, newGroup));
  }

  if (length % number > 0) {
    for (let i = 0; i < length % number; i++) {
      groupList[i].push(newGroup[i]);
      newGroup.splice(i, 1);
    }
  }
  return groupList;
};

/**
 *  create HTML structure to display groups
 *
 * @param {object} container - ref to HTML container
 * @param {array} groupNames - groups names
 * @param {array} group - group members
 */
const displayGroups = (container, groupNames, group) => {
  const index = generateRandomIndex(groupNames.length);
  const name = groupNames[index];
  groupNames.splice(index, 1);
  const div = document.createElement("div");
  div.innerHTML = `<h2>Group ${name} <span>(${group.length} members)</span></span>`;
  group.map((member) => {
    div.innerHTML += `<p>Name : ${member}</p>`;
  });
  container.appendChild(div);
};

window.addEventListener("load", () => {
  createSelectTag(group, select);
});

// create groups on selecting option
select.addEventListener("change", (e) => {
  groups.innerHTML = "";
  let number = parseInt(e.target.value);
  const result = splitGroup(number, group);
  result.map((group) => {
    displayGroups(groups, groupNames, group);
  });
});
