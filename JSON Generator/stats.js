// import jsonData from "../templatesJson/products.json";

// console.log(jsonData);

function importPayements() {
	fetch("products.json")
		.then((response) => response.json())
		.then((products) => {
			console.log(products);
			fetch("payements/payements.json")
				.then((response) => response.json())
				.then((payements) => {
					console.log(payements);
					generateDishesChart(products, payements);
					generateDrinksChart(products, payements);
					generateDessertsChart(products, payements);
					getAverageBill(payements);
				});
		});
}

function getAverageBill(payements) {
	let nbPay = 0;
	let totalPrice = 0;
	for (let date in payements) {
		payements[date].forEach((payement) => {
			nbPay += 1;
			totalPrice += payement.totalPrice;
		});
	}
	console.log("Moyenne : " + totalPrice / nbPay);

	document.querySelector("#nbTable h4").textContent = nbPay;
	document.querySelector("#totalRevenue h4").textContent = totalPrice;
	document.querySelector("#averageBill h4").textContent = "" + totalPrice / nbPay;
}

function generateDishesChart(products, payements) {
	dishesName = [];
	dishesTaken = [];

	// Plats les plus pris
	products.dishes.forEach((dish) => {
		dishesName.push(dish.name);
		let dishTook = 0;
		for (let date in payements) {
			payements[date].forEach((payement) => {
				if (payement.meals.find((meal) => meal.dish.name == dish.name)) {
					dishTook += 1;
				}
			});
		}
		dishesTaken.push(dishTook);
	});
	initPie(dishesName, dishesTaken, "dishesChart");
}
function generateDrinksChart(products, payements) {
	drinksName = [];
	drinksTaken = [];

	// Plats les plus pris
	products.drinks.forEach((drink) => {
		drinksName.push(drink.name);
		let drinkTook = 0;
		for (let date in payements) {
			payements[date].forEach((payement) => {
				if (payement.meals.find((meal) => meal.drink.name == drink.name)) {
					drinkTook += 1;
				}
			});
		}
		drinksTaken.push(drinkTook);
	});
	initPie(drinksName, drinksTaken, "drinksChart");
}
function generateDessertsChart(products, payements) {
	dessertsName = [];
	dessertsTaken = [];

	// Plats les plus pris
	products.desserts.forEach((dessert) => {
		dessertsName.push(dessert.name);
		let dessertTook = 0;
		for (let date in payements) {
			payements[date].forEach((payement) => {
				if (payement.meals.find((meal) => meal.dessert && meal.dessert.name == dessert.name)) {
					dessertTook += 1;
				}
			});
		}
		dessertsTaken.push(dessertTook);
	});
	console.log(dessertsName);
	console.log(dessertsTaken);
	initPie(dessertsName, dessertsTaken, "dessertsChart");
}

function initPie(labels, data, chartElId) {
	const ctx = document.getElementById(chartElId);

	const param = {
		labels: labels,
		datasets: [
			{
				data: data,
				hoverOffset: 4,
			},
		],
	};
	new Chart(ctx, {
		type: "doughnut",
		data: param,
	});
}
