var callories = {
  "smallHamburger": 20,
  "bigHamburger": 40,
  "cheeseStuffing": 20,
  "saladStuffing": 5,
  "potatoStuffing": 10,
  "caesarSalad": 20,
  "olivierSalad": 80,
  "cola": 40,
  "coffee": 20
}

var cost = {
  "smallHamburger": 50,
  "bigHamburger": 100,
  "cheeseStuffing": 10,
  "saladStuffing": 20,
  "potatoStuffing": 15,
  "caesarSalad": 100,
  "olivierSalad": 50,
  "cola": 50,
  "coffee": 80
}

var MenuItem = function(){

  var cost, callories

  this.calculateCost = function(_cost){
    cost = _cost
  }

  this.getCost = function(){
    return cost
  }

  this.calculateCallories = function(_callories){
    callories = _callories
  }

  this.getCallories = function(_callories){
    return callories
  }

}

var Drink = function(name, cost, callories){
  this.name = name
  this.__proto__ = new MenuItem()
  this.calculateCost(cost)
  this.calculateCallories(callories)
}

var Salad = function(name, weight, costPer100g, calloriesPer100g){
  this.name = name
  this.weight = weight
  this.__proto__ = new MenuItem()
  this.calculateCost((costPer100g/100)*weight)
  this.calculateCallories((calloriesPer100g/100)*weight)
}

var Hamburger = function(name, size, stuffing){ // size = {cost: xxx, callories: xxx}; stuffing = [{cost: xxx, callories: xxx}...]
  this.name = name
  this.size = size
  this.stuffing = stuffing
  this.__proto__ = new MenuItem()

  function calculateHamburgerCost(){
    return stuffing.reduce(function(accumulator, currentValue){
      return accumulator + currentValue.cost
    }, size.cost)
  }

  function calculateHamburgerCallories(){
    return stuffing.reduce(function(accumulator, currentValue){
      return accumulator + currentValue.callories
    }, size.callories)
  }

  var cost = calculateHamburgerCost()
  var callories = calculateHamburgerCallories()

  this.calculateCost(cost)
  this.calculateCallories(callories)
}



var Order = function() {
  this.foodItems = [];
  this.isPaid = false;  

}

Order.prototype.addFoodItem = function(foodItem) {
  if (this.isPaid === true) {
    console.log("Заказ оплачен, внесение изменений более недоступно")
    return
  }
  this.foodItems.push(foodItem);
}

Order.prototype.deleteItem = function(foodItem) {
  if (this.isPaid === true) {
    console.log("Заказ оплачен, внесение изменений более недоступно")
    return
  }
  for (var i = 0; i < this.foodItems.length; i++) {
    
    if (this.foodItems[i] === foodItem) {
      this.foodItems.splice(i,1)
    }
    console.log(this.foodItems) 
  }
}

Order.prototype.calculateCallories = function() {
  this.arrayOfCalloriesValues = this.foodItems
  .map(function(foodItem) {
    return foodItem.getCallories()
  })
  .reduce(function(accumulator, current) {
    return accumulator + current
  }, 0)
  console.log("Калорийность вашего заказа составила: " + this.arrayOfCalloriesValues + " каллорий")
}

Order.prototype.calculateCost = function() {
  this.arrayOfCostsValues = this.foodItems
  .map(function(foodItem) {
    return foodItem.getCost()
  })
  .reduce(function(accumulator, current) {
    return accumulator + current
  }, 0)
  console.log("Стоимость вашего заказа составила: " + this.arrayOfCostsValues + " тугрик(-ов)")
}

Order.prototype.pay = function() {
  this.isPaid = true;
  console.log("Заказ оплачен, приятного аппетита!")
}



// Заказ из колы, бургера и салата
// Создание Салатов
var Caesar = new Salad('Caesar', 230, 100, 20),
    Olivier = new Salad('Olivier', 150, 50, 80)
// Создание напитка
var cola = new Drink('Cola', 50, 40),
    coffie = new Drink('Coffie', 80, 20)
// Создание гамбургера
var BignumberNine = new Hamburger('Number 9 BIG', {cost: 100, callories: 40}, [{cost: 10, callories: 20}, {cost: 20, callories: 5}, {cost: 15, callories: 10}])
// Создание заказа посетителя
var newOrder = new Order();
newOrder.addFoodItem(cola);
newOrder.addFoodItem(BignumberNine);
newOrder.addFoodItem(Caesar);
// Получение показателей калорийности заказа
newOrder.calculateCallories()
// Получение показателей стоимости заказа
newOrder.calculateCost()