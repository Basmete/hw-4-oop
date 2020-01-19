var callories = {
  "small": 20,
  "big": 40,
  "cheeseStuffing": 20,
  "saladStuffing": 5,
  "potatoStuffing": 10,
  "caesarSalad": 20,
  "olivierSalad": 80,
  "cola": 40,
  "coffee": 20
}

var cost = {
  "small": 50,
  "big": 100,
  "cheeseStuffing": 10,
  "saladStuffing": 20,
  "potatoStuffing": 15,
  "caesarSalad": 100,
  "olivierSalad": 50,
  "cola": 50,
  "coffee": 80
}

var MenuItem = function(name){

  this.name = name;

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

var Drink = function(name){
  MenuItem.call(this, name)
  this.__proto__ = new MenuItem()

  this.cost = cost[name];
  this.callories = callories[name];
  this.calculateCost(this.cost)
  this.calculateCallories(this.callories)
}

var Salad = function(name, weight){
  MenuItem.call(this, name)
  this.__proto__ = new MenuItem()

  this.costPer100g = cost[name]
  this.calloriesPer100g = callories[name]
  this.weight = weight
  
  this.calculateCost((this.costPer100g/100)*weight)
  this.calculateCallories((this.calloriesPer100g/100)*weight)
}

var Hamburger = function(name, size, ...stuffing){
  MenuItem.call(this, name)
  this.__proto__ = new MenuItem()

  this.size = size
  this.stuffing = stuffing
  

  function calculateHamburgerCost(){
    console.log(cost[size])
    return stuffing.reduce(function(accumulator, currentValue){
      return accumulator + cost[currentValue]
    }, cost[size])
    
  }

  function calculateHamburgerCallories(){
    return stuffing.reduce(function(accumulator, currentValue){
      return accumulator + callories[currentValue]
    }, callories[size])
  }

  var cost2 = calculateHamburgerCost()
  var callories2 = calculateHamburgerCallories()

  this.calculateCost(cost2)
  this.calculateCallories(callories2)
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

Order.prototype.getBill = function() {
  var bill = [];
  for (var key in this.foodItems) {
    bill.push(this.foodItems[key].name)
  }
  console.log("Ваш заказ: " + bill.join(" "))
}

// Заказ из колы, бургера и салата
// Создание Салатов
var Caesar = new Salad('caesarSalad', 230),
    Olivier = new Salad('olivierSalad', 150)
// Создание напитка
var cola = new Drink('cola'),
    coffee = new Drink('coffee')
// Создание гамбургера
var BignumberNine = new Hamburger('BigTasty', 'big', 'saladStuffing', 'potatoStuffing', 'cheeseStuffing')
// Создание заказа посетителя
var newOrder = new Order();
newOrder.addFoodItem(cola);
newOrder.addFoodItem(BignumberNine);
newOrder.addFoodItem(Caesar);
newOrder.addFoodItem(Olivier);
newOrder.addFoodItem(coffee)
// Получение показателей калорийности заказа
newOrder.calculateCallories()
// Получение показателей стоимости заказа
newOrder.calculateCost()