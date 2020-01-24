<template>
  <q-card flat bordered class="order-card" @click="routeToOrderInfo(order.id)">
    <q-card-section>
      <span class="text-bold">№ {{ order.id }}</span>
      <span class="text-grey-8 float-right">19 janvier 2020 à 14:35</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-green-8">En Attente de confirmation</div>
      <!-- <div class="q-mt-sm text-red-8">Annulée</div> -->
      <div>Livré(s): 0 / {{ order.shipments.length }}</div>
      <div>Total à payer: {{ order.totalCost }} FCFA</div>
    </q-card-section>
  </q-card>
  <!-- <q-separator /> -->
  <!-- <q-card-actions align="right">
      <q-btn flat no-caps @click="confirm = true" color="negative"
        >Annuler</q-btn
      >
      <q-btn flat no-caps to="/account/order">Détails</q-btn>
  </q-card-actions>-->
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
  },
  methods: {
    routeToOrderInfo(id) {
      this.$router.push(`/account/order/?id=${id}`);
    }
  }
};
</script>

<style scoped>
.order-card {
  cursor: pointer;
}
</style>
