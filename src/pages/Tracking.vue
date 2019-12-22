<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-center">
        <img src="~/assets/icons/track.png" alt="Suivi de colis" />
        <div class="text-h5 q-py-md">Suivi de colis</div>
      </div>
      <!-- <div class="text-center">
        Suivez vos colis en indiquant le numéro de suivi ci-dessous.
      </div>-->
      <div>
        <form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit.prevent.stop="fetchTracking"
          class="q-py-md"
        >
          <!-- a simple text field watching for the enter key release -->
          <div class="q-gutter-sm">
            <q-input
              dense
              outlined
              ref="id"
              color="dark"
              v-model="id"
              :loading="fetching"
              placeholder="Entrez le numéro de suivi de colis"
              lazy-rules
              :rules="[
                val =>
                  (val.length > 0 && !isNaN(Number(val))) ||
                  'Veuillez un numéro de suivi valide'
              ]"
            >
              <template v-if="!fetching" v-slot:append>
                <q-icon @click="fetchTracking" color="primary" name="search" />
              </template>
            </q-input>
          </div>
        </form>
      </div>
      <div v-if="fetching" class="text-center q-mt-md">
        <!-- <q-spinner-hourglass color="primary" size="4em" /> -->
        Recherche en cours...
      </div>
      <div id="tracking" class="q-pa-md">
        <q-timeline v-if="tracking">
          <div class="text-h4">{{ tracking.shipment.nature }}</div>
          <q-separator class="q-my-sm" />
          <div class="q-mb-md">
            <div>Poids: {{ tracking.shipment.weight }} kg</div>
            <div>Expéditeur: {{ tracking.shipment.sender.name }}</div>
            <div>Destinataire: {{ tracking.shipment.recipient.name }}</div>
            <div>Destination: {{ tracking.shipment.recipient.area.name }}</div>
          </div>
          <q-separator class="q-my-md" />
          <q-timeline-entry
            v-for="event in tracking.events"
            v-bind:key="event.time"
            :title="event.title"
            :subtitle="event.time"
            :icon="event.title == 'Échec de livraison' ? 'error' : 'done'"
            :color="
              event.title == 'Échec de livraison' ? 'negative' : 'positive'
            "
          >
            <div>{{ event.area }}</div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>

<script>
var tracking = {
  shipment: {
    id: 1923453142,
    userId: 1,
    orderId: 1632346016,
    weight: 0.015,
    state: { id: 7, name: "Échec de livraison" },
    timeCreated: "2019-12-21T13:11:59.465654Z",
    timeDelivered: { Time: "0001-01-01T00:00:00Z", Valid: false },
    sender: {
      name: "SELLSIO",
      area: { id: 61, name: "Cocody, Angré", cityId: 0 },
      phone: "57866089",
      address: "8eme tranche"
    },
    recipient: {
      name: "CHIC TENDANCE",
      area: { id: 61, name: "Cocody, Angré", cityId: 0 },
      phone: "07651834",
      address: "NOUVEAU CHU"
    },
    category: { id: 2, name: "Colis", minCost: 0, maxCost: 0 },
    paymentOption: { id: 2, name: "Paiement à la livraison" },
    nature: "smilingfoot",
    cost: 1000,
    distance: 0
  },
  events: [
    {
      title: "Échec de livraison",
      time: "2019-12-21T21:16:58.231369Z",
      city: "Cocody",
      area: "Cocody, Riviéra Palmeraie"
    },
    {
      title: "Échec de livraison",
      time: "2019-12-21T21:06:02.884605Z",
      city: "Cocody",
      area: "Cocody, Riviéra Palmeraie"
    },
    {
      title: "Ramassé",
      time: "2019-12-21T19:48:52.996575Z",
      city: "Cocody",
      area: "Cocody, Riviéra Palmeraie"
    },
    {
      title: "En attente de ramassage",
      time: "2019-12-21T13:11:59.467203Z",
      city: "Cocody",
      area: "Cocody, Angré"
    }
  ]
};

import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "Tracking",
  data() {
    return {
      id: null,
      fetching: false,
      tracking: null
    };
  },
  methods: {
    scrollToElement(el) {
      let target = getScrollTarget(el);
      let offset = el.offsetTop;
      let duration = 500;
      setScrollPosition(target, offset, duration);
    },
    fetchTracking() {
      if (!this.$refs.id.validate()) {
        return;
      }
      this.fetching = true;
      this.tracking = null;
      setTimeout(() => {
        this.tracking = tracking;
        this.tracking.events.map(x => {
          var d = new Date(x.time);
          x.time = d.toLocaleString("fr");
          return x;
        });
        this.fetching = false;
        this.scrollToElement(document.getElementById("tracking"));
      }, 3000);
    }
  }
};
</script>

<style scoped>
h3,
.q-timeline__heading-title {
  padding: 10px 0px !important;
}
</style>
