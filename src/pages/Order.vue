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
                <a class="text-primary" @click="showContact = true"
                  >À partir des contacts</a
                >
              </div>
            </div>

            <q-separator class="q-my-xs" />

            <div class="row q-col-gutter-md">
              <name-input class="col-12 col-md-6" v-model="order.sender.name" />
              <phone-input
                class="col-12 col-md-6"
                v-model="order.sender.phone"
              />
              <address-select
                @input="senderAdresseInput"
                class="col-12"
                label="Adresse"
                v-model="order.sender.address"
              />
            </div>
          </div>
        </q-form>

        <q-slide-transition>
          <shipment-form
            v-if="showShipmentForm"
            @input="addShipment"
          ></shipment-form>
        </q-slide-transition>

        <div v-show="!showShipmentForm">
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
          <div>{{ order.shipments.length }} Colis</div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-sm">
            <div
              class="col-12 col-md-6"
              :key="i"
              v-for="(s, i) in order.shipments"
            >
              <shipment-card
                :shipment="s"
                :removable="true"
                @show="showShipment(i)"
                @remove="order.removeShipment(i)"
              />
            </div>
          </div>
        </div>
        <div class="q-mt-lg" style="margin-bottom: 100px;">
          <q-btn
            v-if="order.shipments.length > 0"
            @click="sendOrder"
            label="Valider la commande"
            no-caps
            class="full-width"
            outline
            color="primary"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </div>
      <div>
        <q-dialog
          v-model="showContact"
          :maximized="$q.screen.gt.sm ? false : true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <phone-book @input="setSender" />
        </q-dialog>

        <q-dialog v-model="showInfo" v-if="selection != null">
          <shipment-info-card :shipment="selection" />
        </q-dialog>
      </div>
    </div>
    <div id="footer" v-if="order.shipments.length > 0">
      <div class="text-center q-py-md text-primary text-weight-bold">
        Total à payer:
        {{ order.totalCost }} FCFA
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import PhoneBook from "../components/PhoneBook.vue";
import NameInput from "../components/NameInput";
import PhoneInput from "../components/PhoneInput";
import AddressSelect from "../components/AddressSelect";
import ShipmentForm from "../components/ShipmentForm";
import ShipmentCard from "../components/ShipmentCard";
import ShipmentInfoCard from "../components/ShipmentInfoCard";
import { Order } from "../store/models";

export default Vue.extend({
  name: "Order",
  props: ["origin", "destination"],
  components: {
    PhoneBook,
    NameInput,
    PhoneInput,
    AddressSelect,
    ShipmentForm,
    ShipmentCard,
    ShipmentInfoCard
  },
  data() {
    return {
      order: new Order(),
      showInfo: false,
      selection: null,
      showShipmentForm: false,
      submitting: false,
      showContact: false
    };
  },
  methods: {
    setSender(contact) {
      // this.order.sender = contact;
      this.order.setSender(contact);
      this.showContact = false;
    },
    sendOrder() {
      this.$refs.senderForm.validate().then(success => {
        if (success) {
          this.$store.dispatch("sendOrder", this.order);
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      });
    },
    showShipment(i) {
      this.selection = this.order.shipments[i];
      this.showInfo = true;
    },
    addShipment(shipment) {
      try {
        this.showShipmentForm = false;
        this.order.addShipment(shipment);
      } catch (error) {
        this.$q.notify({
          position: "center",
          icon: "report_problem",
          message: error,
          color: "info"
        });
      }
    },
    senderAdresseInput(address) {
      if (address == null) {
        return;
      }
      // TODO: should updated order totalCost and each shipment cost and distance
      this.order.recomputeCosts();
      console.log("Re-computing all for: ", address, "...");
    }
  }
});
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
