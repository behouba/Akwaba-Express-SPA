<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-h5 text-center">
        Livraison de {{ $route.query.category }} à
        {{ $route.query.destination }}
      </div>
      <q-separator class="q-my-xs" />
      <div>
        <form @submit.prevent.stop="submitLogin" class="q-py-md">
          <!-- a simple text field watching for the enter key release -->
          <div>Expéditeur</div>

          <q-separator class="q-my-xs" />

          <div class="q-gutter-sm">
            <q-input
              dense
              outlined
              ref="senderName"
              v-model="sender.name"
              label="Expéditeur (Nom et prénom)"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Veuillez saisir une adresse e-mail valide'
              ]"
            />

            <q-input
              outlined
              dense
              ref="senderPhone"
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
              outlined
              ref="recipientName"
              v-model="recipient.name"
              label="Destinataire (Nom et prénom)"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Veuillez saisir une adresse e-mail valide'
              ]"
            />
            <q-input
              outlined
              dense
              ref="recipientPhone"
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
              v-model="paymentMode"
              val="pickup"
              label="Paiement au ramassage"
            />
            <q-radio
              dense
              v-model="paymentMode"
              val="delivery"
              label="Paiement à la livraison"
            />
          </div>
          <!--
      A button with v-model set to submit.
      v-model scope variable must be a strict Boolean
          -->

          <div>
            <q-btn
              type="submit"
              :loading="submitting"
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
    </div>
    <div id="footer">
      <div class="text-center q-py-md text-primary text-weight-bold">
        Frais de livraison 1,300 FCFA
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Order",
  props: ["origin", "destination", "category"],
  data() {
    return {
      sender: {},
      recipient: {},
      paymentMode: "pickup",
      submitting: false
    };
  },
  methods: {}
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
