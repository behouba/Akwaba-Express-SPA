<template>
  <div>
    <q-form ref="shipmentForm" @submit.prevent.stop="validate">
      <div class="row">
        Destinataire
        <q-space />
        <div>
          <a class="text-primary" @click="showContact = true"
            >À partir des contacts</a
          >
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <name-input
          class="col-12 col-md-6"
          v-model="shipment.recipient.name"
        ></name-input>
        <phone-input
          class="col-12 col-md-6"
          v-model="shipment.recipient.phone"
        ></phone-input>
        <address-select
          class="col-12"
          label="Adresse"
          v-model="shipment.recipient.address"
        ></address-select>
      </div>
      <div>
        <div>Sélectionnez la catégorie:</div>
        <q-separator class="q-my-xs" />
        <div>
          <q-option-group
            class="q-my-sm"
            v-model="shipment.category.value"
            :options="categories"
            color="primary"
          />
        </div>
      </div>
      <div>
        <div>Sélectionnez votre mode paiement:</div>
        <q-separator class="q-my-xs" />
        <div>
          <q-option-group
            class="q-my-sm"
            v-model="shipment.paymentOption.value"
            :options="paymentOptions"
            color="primary"
          />
        </div>
      </div>
      <q-separator class="q-my-sm" />
      <div class="text-right">
        <q-btn
          label="Annuler"
          outline
          color="negative"
          class="q-mr-xs"
          no-caps
          @click="showShipmentForm = false"
        />
        <q-btn label="Ajouter" outline color="positive" no-caps type="submit" />
      </div>
    </q-form>

    <q-dialog
      v-model="showContact"
      :maximized="$q.screen.gt.sm ? false : true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <phone-book @input="setRecipient"></phone-book>
    </q-dialog>
  </div>
</template>

<script>
import { Shipment } from "../store/models";
import PhoneBook from "./PhoneBook.vue";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import AddressSelect from "./AddressSelect";
import {
  PaymentOptions as paymentOptions,
  Categories as categories
} from "../store/models";

export default {
  name: "ShipmentForm",
  components: {
    PhoneInput,
    NameInput,
    PhoneBook,
    AddressSelect
  },
  data() {
    return {
      shipment: new Shipment(),
      showContact: false,
      categories,
      paymentOptions
    };
  },
  methods: {
    setRecipient(contact) {
      this.shipment.setRecipient(contact);
      this.showContact = false;
    },
    validate() {
      this.$refs.shipmentForm.validate().then(success => {
        if (success) {
          this.$emit("input", this.shipment);
          this.shipment = new Shipment();
          this.$q.notify({
            position: "top",
            icon: "thumb_up",
            message: "Nouveau colis ajouté à votre commande",
            color: "positive"
          });
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      });
    }
  }
};
</script>
