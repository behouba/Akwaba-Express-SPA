<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:550px">
      <div class="text-h5 text-center">Commande de livraison</div>
      <q-separator class="q-my-xs" />
      <div>
        <q-form class="q-py-md" ref="senderForm">
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

            <div class="row q-col-gutter-md">
              <q-input
                class="col-12 col-md-6"
                v-model="sender.name"
                dense
                color="dark"
                outlined
                ref="senderName"
                label="Nom"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Veuillez saisir un nom valide'
                ]"
              ></q-input>

              <q-input
                dense
                outlined
                color="dark"
                ref="senderPhone"
                prefix="+225 "
                class="col-12 col-md-6"
                v-model="sender.phone"
                label="Téléphone"
                mask="## ## ## ##"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Veuillez saisir un numéro de téléphone'
                ]"
              />
            </div>
            <div class="row">
              <q-select
                outlined
                dense
                :hide-dropdown-icon="true"
                use-input
                label="Adresse"
                v-model="sender.address"
                class="col"
                color="dark"
                clearable
                hide-selected
                fill-input
                input-debounce="0"
                :options="addresses"
                @filter="filterFn"
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Veuillez selectionner votre adresse'
                ]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >Aucun resultat</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </q-form>

        <q-form ref="shipmentForm" @submit.prevent.stop="addShipment">
          <q-card class="q-pa-md" v-if="showShipmentForm">
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
              <q-input
                class="col-12 col-md-6"
                v-model="shipment.recipient.name"
                dense
                color="dark"
                outlined
                ref="senderName"
                label="Nom"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Veuillez saisir une adresse e-mail valide'
                ]"
              ></q-input>

              <q-input
                dense
                outlined
                color="dark"
                ref="senderPhone"
                prefix="+225 "
                class="col-12 col-md-6"
                v-model="shipment.recipient.phone"
                label="Téléphone"
                mask="## ## ## ##"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Veuillez saisir une adresse e-mail valide'
                ]"
              />
            </div>
            <div class="row">
              <q-select
                outlined
                dense
                :hide-dropdown-icon="true"
                use-input
                label="Adresse"
                v-model="shipment.recipient.address"
                class="col"
                color="dark"
                clearable
                hide-selected
                fill-input
                input-debounce="0"
                :options="addresses"
                @filter="filterFn"
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Veuillez selectionner votre adresse'
                ]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >Aucun resultat</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
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
              <q-btn
                label="Annuler"
                no-caps
                @click="showShipmentForm = false"
              />
              <q-btn label="Ajouter" no-caps color="primary" type="submit" />
            </q-card-actions>
          </q-card>
        </q-form>

        <div v-if="!showShipmentForm">
          <q-btn
            label="+ Ajouter un colis"
            no-caps
            class="q-mt-md full-width"
            @click="showShipmentForm = true"
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
                    <q-item-label lines="1">
                      {{ s.recipient.name }}
                    </q-item-label>
                    <q-item-label lines="1" caption>{{
                      s.recipient.address
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-card-actions align="right">
                  <q-btn
                    flat
                    @click="showShipmentInfo(i)"
                    round
                    size="sm"
                    icon="visibility"
                  />
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
        <div class="q-mt-lg" style="margin-bottom: 200px;">
          <q-btn
            v-if="shipments.length > 0"
            @click="order"
            label="Valider la commande"
            no-caps
            class="full-width"
            color="positive"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </div>
      <div>
        <q-dialog
          v-model="senderDialog"
          :maximized="$q.screen.gt.sm ? false : true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <phone-book @contactSelected="setSender"></phone-book>
        </q-dialog>

        <q-dialog
          v-model="recipientDialog"
          :maximized="$q.screen.gt.sm ? false : true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <phone-book @contactSelected="setRecipient"></phone-book>
        </q-dialog>

        <q-dialog v-model="shipmentInfo" v-if="selectedShipment != null">
          <q-card style="width: 500px; max-width: 80vw;" class="q-pt-md">
            <q-card-section class="q-pt-none">
              <div>Destinataire: {{ selectedShipment.recipient.name }}</div>
              <div>Catégorie: {{ selectedShipment.category }}</div>
              <div>Distance: 12 km</div>
              <div>Frais de livraison: 1,250 FCFA</div>
              <div>Mode de paiement: {{ selectedShipment.paymentOption }}</div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
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
import PhoneBook from "../components/PhoneBook";

const serverAddresses = [
  "Abidjan cocody",
  "Abidjan youpougon",
  "Abidjan Treichville",
  "Abidjan Bingerville",
  "Abidjan Adjamé"
];

function Order(sender, shipments) {
  return {
    sender,
    shipments
  };
}

function Shipment() {
  return {
    recipient: {},
    category: "parcel",
    paymentOption: "pickup"
  };
}
export default {
  name: "Order",
  props: ["origin", "destination"],
  components: {
    PhoneBook
  },
  data() {
    return {
      shipmentInfo: false,
      sender: {},
      addresses: [],
      selectedShipment: null,
      shipment: new Shipment(null),
      shipments: [],
      showShipmentForm: false,
      submitting: false,
      senderDialog: false,
      recipientDialog: false,
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
    setSender(contact) {
      this.sender = contact;
      this.senderDialog = false;
    },
    setRecipient(contact) {
      this.shipment.recipient = contact;
      this.recipientDialog = false;
    },
    order() {
      this.$refs.senderForm.validate().then(success => {
        if (success) {
          var order = new Order(this.sender, this.shipments);
          alert(`order : ${JSON.stringify(order)}`);
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      });
    },
    showShipmentInfo(i) {
      this.selectedShipment = this.shipments[i];
      this.shipmentInfo = true;
    },
    removeShipment(index) {
      this.shipments.splice(index, 1);
    },
    addShipment() {
      // alert(JSON.stringify(this.shipment));
      this.$refs.shipmentForm.validate().then(success => {
        if (success) {
          this.shipments.push(this.shipment);
          this.shipment = Shipment();
          this.showShipmentForm = false;
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      });
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      //TODO: Ajax request to retreive addresses based on user input
      update(() => {
        const needle = val.toLowerCase();
        this.addresses = serverAddresses.filter(
          v => v.toLowerCase().indexOf(needle) > -1
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
.constactHeight {
  height: 50vh;
  max-height: 50vh;
}
</style>
