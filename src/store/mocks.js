import {
  Order,
  Shipment,
  Contact,
  CATEGORY1_ID,
  CATEGORY2_ID,
  CATEGORY1_LABEL,
  CATEGORY2_LABEL,
  PAYMENT_OPT1_ID,
  PAYMENT_OPT1_LABEL,
  PAYMENT_OPT2_ID,
  PAYMENT_OPT2_LABEL
} from "./models";

export function mockContacts() {
  return [
    {
      id: 13,
      name: "Didier Attoubo",
      phone: "90893433",
      address: "Abidjan cocody"
    },
    {
      id: 34,
      name: "Naturo Uzumaki",
      phone: "34253354",
      address: "Abidjan treichville"
    },
    {
      id: 14,
      name: "Shadow fox",
      phone: "52343453",
      address: "Abidjan yopougon"
    },
    { name: "Jumia ci", phone: "22345351", address: "Abidjan adjamé" },
    {
      id: 15,

      name: "Pharmacie Bonheur",
      phone: "42342313",
      address: "Abidjan marcory"
    },
    { id: 16, name: "Client", phone: "23453425", address: "Abidjan abobo" },
    {
      id: 17,
      name: "Very long contact name, it is very very long",
      phone: "23453425",
      address: "Abidjan abobo"
    },
    { id: 18, name: "Harry", phone: "32234235", address: "Abidjan angré" },
    { id: 19, name: "Uchiwa", phone: "23453425", address: "Abidjan gare nord" },
    { id: 20, name: "Jean Luc", phone: "23453425", address: "Abidjan yopougon" }
  ];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function mockShipment() {
  var s = new Shipment();
  s.recipient = new Contact("Peter pan", "53564545", "Abidjan yopougon");
  if (getRandomInt(1, 2) == 1) {
    s.category = new Option(CATEGORY1_ID, CATEGORY1_LABEL);
    s.paymentOption = new Option(PAYMENT_OPT1_ID, PAYMENT_OPT1_LABEL);
  } else {
    s.category = new Option(CATEGORY2_ID, CATEGORY2_LABEL);
    s.paymentOption = new Option(PAYMENT_OPT2_ID, PAYMENT_OPT2_LABEL);
  }
  s.cost = getRandomInt(1000, 3000);
  s.distance = getRandomFloat(1.0, 30.0);
  return s;
}

export function mockOrder(id) {
  var o = new Order();
  o.id = id;
  o.sender = new Contact("Jhon doe", "45001685", "Abidjan cocody");
  var n = getRandomInt(1, 50);
  for (var i = 1; i < n; i++) {
    o.addShipment(mockShipment());
  }
  return o;
}
