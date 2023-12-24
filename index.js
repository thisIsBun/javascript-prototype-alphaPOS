const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]');
const orderLists = document.querySelector("[data-order-lists]");
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]');
const alphaPos = new Pos();

addDrinkButton.addEventListener("click", () => {
  const drinkName = alphaPos.getCheckedValue("drink");
  const ice = alphaPos.getCheckedValue("ice");
  const sugar = alphaPos.getCheckedValue("sugar");

  if (!drinkName) {
    alert("Please choose at least one item.");
    return;
  }

  const drink = new Drink(drinkName, ice, sugar);
  alphaPos.addDrink(drink);
});

orderLists.addEventListener("click", (event) => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]');
  if (!isDeleteButton) {
    return;
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement);
});

checkoutButton.addEventListener("click", () => {
  alert(`Total amount of drinks：$${alphaPos.checkout()}`);
  alphaPos.clearOrder(orderLists);
});

function Pos() {}

Pos.prototype.getCheckedValue = function (inputName) {
  let seletedOption = "";
  document.querySelectorAll(`input[name=${inputName}]`).forEach((option) => {
    if (option.checked) {
      seletedOption = option.value;
    }
  });
  return seletedOption;
};

Pos.prototype.addDrink = function (drink) {
  let orderListCard = `
  <div class="card mb-3">
  <div class="card-body pt-3 pr-3">
  <div class="text-right">
  <span data-alpha-pos="delete-drink">X</span>
  </div>
  <h5 class="card-title">${drink.name}</h5>
  <p class="card-text">${drink.ice}</p>
  <p class="card-text">${drink.sugar}</p>
  </div>
  <div class="card-footer text-right">
  <div class="card-text text-muted">
  $ <span data-drink-price>${drink.price()}</span>
  </div>
  </div>
  </div>
  `;

  orderLists.insertAdjacentHTML("afterbegin", orderListCard);
};

Pos.prototype.deleteDrink = function (target) {
  target.remove();
};

Pos.prototype.checkout = function () {
  let totalAmount = 0;
  document.querySelectorAll("[data-drink-price]").forEach((drink) => {
    totalAmount += Number(drink.textContent);
  });
  return totalAmount;
};

Pos.prototype.clearOrder = function (target) {
  target.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });
};

function Drink(name, ice, sugar) {
  this.name = name;
  this.ice = ice;
  this.sugar = sugar;
}

Drink.prototype.price = function () {
  switch (this.name) {
    case "Black Tea":
    case "Oolong Tea":
    case "Baozong Tea":
    case "Green Tea":
      return 30;
    case "Bubble Milk Tea":
    case "Lemon Green Tea":
      return 50;
    case "Black Tea Latte":
    case "Matcha Latte":
      return 55;
    default:
      alert("No this drink");
  }
};
