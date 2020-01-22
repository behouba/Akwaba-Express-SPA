"use strict";

const paymentOpt1Label = "Au ramassage";
const paymentOpt2Label = "À la livraison";
const paymentOpt1Id = 1;
const paymentOpt2Id = 2;
const category1Label = "Colis";
const category2Label = "Document";
const category1Id = 1;
const category2Id = 2;

class Option {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}
const PaymentOptions = [
  new Option(paymentOpt1Id, paymentOpt1Label),
  new Option(paymentOpt2Id, paymentOpt2Label)
];
const Categories = [
  new Option(category1Id, category1Label),
  new Option(category2Id, category2Label)
];

class Contact {
  name = "";
  phone = "";
  address = "";
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
    this.address = address;
  }
}

class Shipment {
  recipient = new Contact();
  category = new Option(category1Id, null);
  paymentOption = new Option(paymentOpt1Id, null);
  cost = 0;
  distance = 0;

  setRecipient(contact) {
    this.recipient = contact;
  }
  get formatedCost() {
    return this.cost.toLocaleString();
  }
  get formatedDistance() {
    return this.distance.toLocaleString();
  }

  computeCostAndDistance(address) {
    // origin address will be used to compute cost and distance
    if (address == null) {
      return;
    }
    // Shipment cost and distance computation simulation
    this.cost = 1000 + Math.floor(Math.random() * 3000);
    this.distance = 1 + Math.floor(Math.random() * 30);
  }
}

class Order {
  sender = new Contact();
  shipments = new Array();

  addShipment(shipment) {
    //TODO: compute Shipment cost and distance before adding
    shipment.computeCostAndDistance(this.sender.address);
    this.shipments.unshift(shipment);
  }
  get totalCost() {
    var sum = 0;
    this.shipments.forEach(s => (sum += s.cost));
    return sum.toLocaleString();
  }

  setSender(contact) {
    this.sender = contact;
    this.shipments.forEach(shipment => {
      if (!shipment.cost) {
        shipment.computeCostAndDistance(this.sender.address);
      }
    });
  }

  async recomputeCosts() {
    this.shipments.forEach(s => {
      setTimeout(() => {
        s.computeCostAndDistance(this.sender.address);
      }, 2000);
    });
  }

  removeShipment(index) {
    this.shipments.splice(index, 1);
  }
}

let PaymentOptionsMap = new Map();
PaymentOptionsMap[paymentOpt1Id] = paymentOpt1Label;
PaymentOptionsMap[paymentOpt2Id] = paymentOpt2Label;

let CategoriesMap = new Map();
CategoriesMap[category1Id] = category1Label;
CategoriesMap[category2Id] = category2Label;

export {
  PaymentOptionsMap,
  CategoriesMap,
  Contact,
  Order,
  Shipment,
  PaymentOptions,
  Categories
};
