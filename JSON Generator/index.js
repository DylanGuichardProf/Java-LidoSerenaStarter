function generateResa() {
  let mail = document.querySelector("#resaMail").value;
  let date = formatDate(new Date(document.querySelector("#resaDate").value));
  let nbPeople = parseInt(document.querySelector("#resaNbPeople").value);

  let resa = {
    cli_mail: mail,
    date: date,
    nbOfPeople: nbPeople,
  };

  downloadJSON(resa, "resa");
}

function downloadJSON(obj, fileName) {
  // Convertir l'objet en chaîne JSON
  const jsonString = JSON.stringify(obj, null, 2); // null et 2 sont utilises pour un formatage avec des indentations

  // Creer un Blob avec le contenu JSON
  const blob = new Blob([jsonString], { type: "application/json" });

  // Creer un lien de telechargement
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName + ".json"; // Nom du fichier
  a.click(); // Simule un clic pour declencher le telechargement

  // Liberer l'objet URL
  URL.revokeObjectURL(a.href);
}

function formatDate(date) {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  let year = date.getFullYear();

  let minutes = "" + date.getMinutes();
  let hours = "" + date.getHours();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (hours.length < 2) hours = "0" + hours;

  const dateStr = `${day}/${month}/${year} ${hours}:${minutes}`;
  return dateStr;
}

/*** MANAGE COMMAND ***/
let command = {
  tabNum: 0,
  date: "",
  reserved: false,
  reservationMail: "",
  nbOfPeople: 0,
  meals: [],
  singleProducts: [],
};
let currentMeal = {
  code: "",
  choice: {
    dish: "",
    drink: "",
    dessert: "",
  },
};
const emptyMeal = {
  code: "",
  choice: {
    dish: "",
    drink: "",
    dessert: "",
  },
};

function toogleReserved(isReserved) {
  document.querySelector("#reservedMail").classList.toggle("visible");
  command.reserved = isReserved;
}

function selectTable(el, num) {
  document.querySelector("#tableBtn .selected")?.classList.remove("selected");
  el.classList.add("selected");
  command.tabNum = num;
}
function selectNbPeople(el, num) {
  document.querySelector("#nbPeopleBtn .selected")?.classList.remove("selected");
  el.classList.add("selected");
  command.nbOfPeople = num;
}

function showMeals() {
  let mealsBloc = document.querySelector("#mealsBlocToClone").cloneNode(true);
  mealsBloc.id = "";
  mealsBloc.classList.remove("hidden");
  mealsBloc.classList.add("currentMeal");
  document.querySelector("#meals").appendChild(mealsBloc);
}
function showMeal(el, code) {
  // RESET
  document.querySelector(".currentMeal .pizzas").classList.add("hidden");
  document.querySelector(".currentMeal .pastas").classList.add("hidden");
  document.querySelector(".currentMeal .secondi").classList.add("hidden");
  document.querySelector(".currentMeal .drinks").classList.add("hidden");
  document.querySelector(".currentMeal .dessert").classList.add("hidden");

  document.querySelector(".currentMeal .selected")?.classList.remove("selected");

  el.classList.add("selected");
  currentMeal.code = code;
  if (code.includes("Pi")) {
    document.querySelector(".currentMeal .pizzas").classList.remove("hidden");
  } else if (code.includes("Pa")) {
    document.querySelector(".currentMeal .pastas").classList.remove("hidden");
  } else {
    document.querySelector(".currentMeal .secondi").classList.remove("hidden");
  }
  document.querySelector(".currentMeal .drinks").classList.remove("hidden");
  if (code.includes("D")) {
    document.querySelector(".currentMeal .dessert").classList.remove("hidden");
  }
}
function selectDishInMeal(el, name) {
  document.querySelector(".product.pizza .selected")?.classList.remove("selected");
  document.querySelector(".product.pastas .selected")?.classList.remove("selected");
  document.querySelector(".product.secondi .selected")?.classList.remove("selected");
  el.classList.add("selected");
  currentMeal.choice.dish = name;
}
function selectDrinkInMeal(el, name) {
  document.querySelector(".product.drinks .selected")?.classList.remove("selected");
  el.classList.add("selected");
  currentMeal.choice.drink = name;
}
function selectDessertInMeal(el, name) {
  document.querySelector(".product.dessert .selected")?.classList.remove("selected");
  el.classList.add("selected");
  currentMeal.choice.dessert = name;
}
function validateMeal() {
  command.meals.push(JSON.parse(JSON.stringify(currentMeal)));
  // Reset currentMeals to avoid relica
  currentMeal = emptyMeal;
  document.querySelector("#meals").removeChild(document.querySelector(".currentMeal"));
  console.log("Commande : ", command);
}
function selectSingleProduct(name) {
  command.singleProducts.push(name);
}

function generateCommand() {
  command.reservationMail = document.querySelector("#reservedMail").value;
  command.date = formatDate(new Date());
  downloadJSON(command, "command");
}
