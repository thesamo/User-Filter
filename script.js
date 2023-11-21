
const API_URL = "https://randomuser.me/api/?results=50";

const input = document.querySelector("input");
const lists = document.querySelector(".lists ul");

let allUsers = [];

const fetchData = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  allUsers = data.results;
  showUsers(allUsers);
};

const showUsers = (users) => {
  lists.innerHTML = ""; 

  users.forEach((user) => {
    const li = document.createElement("li");
    const fullName = `${user.name.first} ${user.name.last}`;
    const city = user.location.city;
    const country = user.location.country;
    li.innerHTML = `
      <img src="${user.picture.thumbnail}"/>
      <span>${fullName}</span>
      <p>${city}, ${country}</p>
    `;
    lists.appendChild(li);
  });
};

const filterUsers = () => {
  const searchText = input.value.trim().toLowerCase();

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const city = user.location.city.toLowerCase();
    const country = user.location.country.toLowerCase();
    return (
      fullName.includes(searchText) || city.includes(searchText) || country.includes(searchText)
    );
  });

  showUsers(filteredUsers);
};

input.addEventListener("input", filterUsers);

fetchData();