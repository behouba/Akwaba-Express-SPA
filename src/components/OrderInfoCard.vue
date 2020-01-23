<template>
  <q-card>
    <q-card-section>
      <div>
        <span class="text-bold">№ {{ order.id }}</span>
        <span class="text-grey-8 float-right">19 janvier 2020 à 14:35</span>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-green-8">En Attente de confirmation</div>
      <!-- <div class="q-mt-sm text-red-8">Annulée</div> -->
      <div>Livré(s): 0 / {{ order.shipments.length }}</div>
      <div>Total à payer: {{ order.totalCost }} FCFA</div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat no-caps @click="confirm = true" color="negative"
        >Annuler</q-btn
      >
      <q-btn flat no-caps to="/user/order">Détails</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "OrderInfoCard",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icons: ["hourglass_empty", "local_shipping", "close", "done"]
    };
  }
};
</script>
