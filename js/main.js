// DOM elements
const select = document.getElementById("select-nb");
const groups = document.getElementById("groups");

// populate select tag in html
for (let i = 1; i <= group.length / 2; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  select.appendChild(option);
}

// generate random index in range
const generateRandomIndex = max => {
  return Math.round(Math.random() * (max - 1));
};

// generate random group according to size
const generateRandomGroup = chunk => {
  const groupMembers = [];
  for (let i = 0; i < chunk; i++) {
    const index = generateRandomIndex(group.length);
    groupMembers.push(group[index]);
    group.splice(index, 1);
  }
  return groupMembers;
};

// split group
const splitGroup = (number, chunk) => {
  const groupList = [];

  for (let i = 1; i <= number; i++) {
    groupList.push(generateRandomGroup(chunk));
  }

  if (group.length % number > 0) {
    for (let i = 0; i < group.length % number; i++) {
      groupList[i].push(group[i]);
      group.splice(i, 1);
    }
  }

  return groupList;
};

// create groups on selecting option
select.addEventListener("change", e => {
  let number = e.target.value;
  const chunk = Math.floor(group.length / number);
  const result = splitGroup(number, chunk);

  let counter = 1;
  result.map(group => {
    const index = generateRandomIndex(groupNames.length);
    const name = groupNames[index];
    groupNames.splice(index, 1);
    const div = document.createElement("div");
    div.innerHTML = `<h2>Group ${name} <span>(${group.length} members)</span></span>`;
    group.map(member => {
      div.innerHTML += `<p>Name : ${member}</p>`;
    });
    groups.appendChild(div);
    counter++;
  });
});
