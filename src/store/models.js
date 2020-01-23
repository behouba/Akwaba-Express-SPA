"use strict";

export const PAYMENT_OPT1_LABEL = "Au ramassage";
export const PAYMENT_OPT2_LABEL = "À la livraison";
export const PAYMENT_OPT1_ID = 1;
export const PAYMENT_OPT2_ID = 2;
export const CATEGORY1_LABEL = "Colis";
export const CATEGORY2_LABEL = "Document";
export const CATEGORY1_ID = 1;
export const CATEGORY2_ID = 2;

class Option {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}
const PaymentOptions = [
  new Option(PAYMENT_OPT1_ID, PAYMENT_OPT1_LABEL),
  new Option(PAYMENT_OPT2_ID, PAYMENT_OPT2_LABEL)
];
const Categories = [
  new Option(CATEGORY1_ID, CATEGORY1_LABEL),
  new Option(CATEGORY2_ID, CATEGORY2_LABEL)
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
  category = new Option(CATEGORY1_ID, null);
  paymentOption = new Option(PAYMENT_OPT1_ID, null);
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
  id = null;
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
PaymentOptionsMap[PAYMENT_OPT1_ID] = PAYMENT_OPT1_LABEL;
PaymentOptionsMap[PAYMENT_OPT2_ID] = PAYMENT_OPT2_LABEL;

let CategoriesMap = new Map();
CategoriesMap[CATEGORY1_ID] = CATEGORY1_LABEL;
CategoriesMap[CATEGORY2_ID] = CATEGORY2_LABEL;

export {
  PaymentOptionsMap,
  CategoriesMap,
  Contact,
  Order,
  Shipment,
  PaymentOptions,
  Categories
};
