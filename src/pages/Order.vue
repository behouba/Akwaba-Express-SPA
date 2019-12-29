<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-h5 text-center">
        Livraison de {{ $route.query.category }} à
        {{ $route.query.destination }}
      </div>
      <q-separator class="q-my-xs" />
      <div>
        <form @submit.prevent.stop="order" class="q-py-md">
          <!-- a simple text field watching for the enter key release -->
          <div>Expéditeur</div>

          <q-separator class="q-my-xs" />

          <div class="q-gutter-sm">
            <q-input
              dense
              color="dark"
              outlined
              ref="senderName"
              v-model="sender.name"
              label="Nom"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Veuillez saisir une adresse e-mail valide'
              ]"
            >
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  @click="senderDialog = true"
                  icon="add"
                ></q-btn>
              </template>
            </q-input>

            <q-input
              outlined
              color="dark"
              dense
              ref="senderPhone"
              prefix="+225 "
              v-model="sender.phone"
              label="Téléphone"
              mask="## ## ## ##"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Veuillez saisir une adresse e-mail valide'
              ]"
            />
            <div>Destinataire</div>
            <!-- <q-separator class="q-my-xs" /> -->
            <q-input
              dense
              color="dark"
              outlined
              ref="recipientName"
              v-model="recipient.name"
              label="Nom"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Veuillez saisir une adresse e-mail valide'
              ]"
            >
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  @click="recipientDialog = true"
                  icon="add"
                ></q-btn>
              </template>
            </q-input>
            <q-input
              outlined
              dense
              color="dark"
              ref="recipientPhone"
              prefix="+225 "
              v-model="recipient.phone"
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

          <div>Sélectionnez votre mode paiement:</div>
          <q-separator class="q-mb-md" />
          <div class="q-gutter-md">
            <q-radio
              dense
              color="dark"
              v-model="paymentOpt"
              val="pickup"
              label="Paiement au ramassage"
            />
            <q-radio
              color="dark"
              dense
              v-model="paymentOpt"
              val="delivery"
              label="Paiement à la livraison"
            />
          </div>
          <!--
      A button with v-model set to submit.
      v-model scope variable must be a strict Boolean
          -->
          <!-- to="/order/success?id=1342523423" -->

          <div>
            <q-btn
              type="submit"
              label="Valider la commande"
              class="q-mt-lg full-width"
              color="primary"
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
              <div class="text-h6">Contacts</div>
            </q-card-section>
            <q-card-section>
              <q-select
                outlined
                dense
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
            <q-card-section>
              <div class="text-h6">Contacts</div>
            </q-card-section>
            <q-card-section>
              <q-select
                outlined
                dense
                color="dark"
                v-model="recipient"
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
const contacts = [
  { name: "Didier Attoubo", phone: "90893433" },
  { name: "Naturo Uzumaki", phone: "34253354" },
  { name: "Shadow fox", phone: "52343453" },
  { name: "Jumia ci", phone: "22345351" },
  { name: "Pharmacie Bonheur", phone: "42342313" },
  { name: "Client", phone: "23453425" }
];

function Order(origin, destination, sender, recipient, pOption) {
  return {
    origin,
    destination,
    sender,
    recipient,
    pOption
  };
}
export default {
  name: "Order",
  props: ["origin", "destination", "category"],
  data() {
    return {
      sender: {},
      recipient: {},
      paymentOpt: "pickup",
      submitting: false,
      senderDialog: false,
      recipientDialog: false,
      contactOptions: contacts
    };
  },
  methods: {
    dismissDialog() {
      this.senderDialog = false;
      this.recipientDialog = false;
    },
    order() {
      const origin = this.$route.query.origin;
      const destination = this.$route.query.destination;
      var order = new Order(
        origin,
        destination,
        this.sender,
        this.recipient,
        this.paymentOpt
      );
      alert(`order : ${JSON.stringify(order)}`);
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
  text-align: center;
}
</style>
