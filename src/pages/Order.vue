<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:550px">
      <div class="text-h5 text-center">
        Livraison de {{ $route.query.category }} à
        {{ $route.query.destination }}
      </div>
      <q-separator class="q-my-xs" />
      <div>
        <form @submit.prevent.stop="order" class="q-py-md">
          <!-- a simple text field watching for the enter key release -->
          <div class="q-my-md">
            <div class="row">
              Expéditeur
              <q-space />
              <div>
                <a class="text-primary" @click="senderDialog = true"
                  >À partir des contacts</a
                >
              </div>
            </div>

            <q-separator class="q-my-xs" />

            <div class="row q-col-gutter-xs">
              <name-input class="col-12 col-md-6" v-model="sender.name" />
              <phone-input class="col-12 col-md-6" v-model="sender.phone" />
            </div>
            <div class="row q-qy-sm">
              <address-select
                label="Adresse"
                v-model="sender.address"
                class="col"
              />
            </div>
          </div>

          <q-card class="q-pa-md" v-if="newShippingForm">
            <div class="row">
              Destinataire
              <q-space />
              <div>
                <a class="text-primary" @click="recipientDialog = true"
                  >À partir des contacts</a
                >
              </div>
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-md">
              <name-input class="col-12 col-md-6" v-model="shipment.name" />
              <phone-input class="col-12 col-md-6" v-model="shipment.phone" />
            </div>
            <div class="row">
              <address-select
                label="Adresse"
                v-model="shipment.address"
                class="col"
              />
            </div>
            <div class="q-my-sm">
              <div>Sélectionnez la catégorie</div>
              <q-separator class="q-my-xs" />
              <div class="row">
                <q-option-group
                  v-model="shipment.category"
                  :options="categories"
                  color="primary"
                  inline
                />
              </div>
            </div>
            <div>
              <div>Sélectionnez votre mode paiement:</div>
              <q-separator class="q-my-xs" />
              <div class="row">
                <q-option-group
                  v-model="shipment.paymentOption"
                  :options="paymentOpts"
                  color="primary"
                  inline
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
            <q-card-actions align="right">
              <q-btn label="Annuler" no-caps @click="newShippingForm = false" />
              <q-btn
                label="Ajouter"
                no-caps
                color="primary"
                @click="addShipment"
              />
            </q-card-actions>
          </q-card>

          <div v-if="!newShippingForm">
            <q-btn
              label="+ Ajouter un colis"
              no-caps
              class="q-mt-md full-width"
              @click="newShippingForm = true"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>

          <div id="shipments" class="q-my-md">
            <div>{{ shipments.length }} Colis</div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-md-6" v-for="(s, i) in shipments" :key="i">
                <q-card class="my-card" flat bordered>
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar square>
                        <img
                          v-if="s.category == 'document'"
                          src="~/assets/icons/letter.png"
                        />
                        <img v-else src="~/assets/icons/package.png" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ s.name }}</q-item-label>
                      <q-item-label caption>{{ s.address }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-card-actions align="right">
                    <q-btn flat round size="sm" icon="settings" />
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="close"
                      @click="removeShipment(i)"
                    />
                    <!-- <q-btn flat size="sm" no-caps color="primary"
                      >Supprimer</q-btn
                    >
                    <q-btn flat size="sm" no-caps color="info">Modifier</q-btn>-->
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="shipments.length > 0">
            <q-btn
              type="submit"
              label="Valider la commande"
              no-caps
              class="q-mt-lg full-width"
              color="positive"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </form>
      </div>
      <div>
        <q-dialog
          v-model="senderDialog"
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <q-card-section>
              <q-card-section class="row items-center q-pb-none">
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            </q-card-section>
            <q-card-section>
              <q-select
                outlined
                color="dark"
                v-model="sender"
                use-input
                autofocus
                option-value="name"
                option-label="name"
                behavior="menu"
                map-options
                hide-selected
                @input="dismissDialog"
                :options="contactOptions"
                @filter="filterFn"
                label="Selectionnez un contact"
              />
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="recipientDialog"
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
              <q-select
                style="max-width: 500px"
                class="q-mx-auto q-mt-md"
                outlined
                color="dark"
                v-model="shipment"
                use-input
                autofocus
                hide-selected
                option-value="name"
                option-label="name"
                behavior="menu"
                map-options
                @input="dismissDialog"
                :options="contactOptions"
                @filter="filterFn"
                label="Selectionnez un contact"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div id="footer">
      <div class="text-center q-py-md text-primary text-weight-bold">
        Frais de livraison 1,300 FCFA
      </div>
    </div>
  </q-page>
</template>

<script>
import AddressSelect from "../components/AddressSelect";
import NameInput from "../components/NameInput";
import PhoneInput from "../components/PhoneInput";

const contacts = [
  { name: "Didier Attoubo", phone: "90893433", address: "Abidjan cocody" },
  { name: "Naturo Uzumaki", phone: "34253354", address: "Abidjan treichville" },
  { name: "Shadow fox", phone: "52343453", address: "Abidjan yopougon" },
  { name: "Jumia ci", phone: "22345351", address: "Abidjan adjamé" },
  { name: "Pharmacie Bonheur", phone: "42342313", address: "Abidjan marcory" },
  { name: "Client", phone: "23453425", address: "Abidjan abobo" }
];

function Order(sender, shipments) {
  return {
    sender,
    shipments
  };
}
function Shipment() {
  return {
    category: "parcel",
    paymentOption: "pickup"
  };
}
export default {
  name: "Order",
  props: ["origin", "destination"],
  components: {
    AddressSelect,
    NameInput,
    PhoneInput
  },
  data() {
    return {
      sender: {},
      recipient: {},
      shipment: Shipment(),
      shipments: [],
      newShippingForm: false,
      submitting: false,
      senderDialog: false,
      recipientDialog: false,
      contactOptions: contacts,
      categories: [
        {
          label: "Colis",
          value: "parcel"
        },
        {
          label: "Document",
          value: "document"
        }
      ],
      paymentOpts: [
        {
          label: "Au ramassage",
          value: "pickup"
        },
        {
          label: "À la livraison",
          value: "delivery"
        }
      ]
    };
  },
  methods: {
    dismissDialog() {
      this.senderDialog = false;
      this.recipientDialog = false;
    },
    order() {
      var order = new Order(this.sender, this.shipments);
      alert(`order : ${JSON.stringify(order)}`);
    },
    removeShipment(index) {
      this.shipments.splice(index, 1);
    },
    addShipment() {
      // alert(JSON.stringify(this.shipment));
      this.shipments.push(this.shipment);
      this.shipment = Shipment();
      this.newShippingForm = false;
    },
    filterFn(val, update) {
      update(() => {
        if (val == null) {
          this.contactOptions = contacts;
          return;
        }
        const needle = val.toLowerCase();
        this.contactOptions = contacts.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>

<style>
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid lightgray;
  background-color: white;
  text-align: center;
}
</style>
