<template>
  <q-page padding>
    <div style="max-width: 1200px">
      <div class="row q-mt-lg">
        <div class="col-12 col-md-4 q-mb-md q-pr-md">
          <div class="text-h6">Commande № {{ order.id }}</div>
          <q-separator class="q-mb-md" />
          <div>Créée le: 19 janvier 2020 à 14:35</div>
          <div>
            Statut:
            <span class="text-green-8">En Attente de confirmation</span>
          </div>
          <div>Expéditeur: {{ order.sender.name }}</div>
          <!-- <div class="q-mt-sm text-red-8">Annulée</div> -->
          <div>Livré(s): 0 / {{ order.shipments.length }}</div>
          <div>Total à payer: {{ order.totalCost }} FCFA</div>
          <q-separator vertical />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">{{ order.shipments.length }} Colis</div>
          <q-separator class="q-mb-md" />
          <div class="row q-col-gutter-sm">
            <div
              :key="s.id"
              class="col-12 col-md-6"
              v-for="(s, i) in order.shipments"
            >
              <shipment-card
                @show="showShipment(i)"
                :shipment="s"
                :removable="false"
              />
            </div>
          </div>

          <q-dialog v-model="showInfo" v-if="selection != null">
            <shipment-info-card :shipment="selection" />
          </q-dialog>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mockOrder } from "../store/mocks";
import ShipmentCard from "../components/ShipmentCard";
import ShipmentInfoCard from "../components/ShipmentInfoCard";

export default {
  name: "OrderInfo",
  components: {
    ShipmentCard,
    ShipmentInfoCard
  },
  data() {
    return {
      selection: null,
      showInfo: false,
      order: mockOrder(1234213423)
    };
  },
  methods: {
    showShipment(i) {
      this.selection = this.order.shipments[i];
      this.showInfo = true;
    }
  }
};
</script>
