<template>
  <q-page padding>
    <div class="text-h5">MES COMMANDES</div>
    <q-separator />
    <div class="q-py-lg">
      <q-input
        dense
        outlined
        ref="id"
        color="dark"
        placeholder="Rechercher"
        lazy-rules
      >
        <template v-slot:append>
          <q-icon color="primary" name="search" />
        </template>
      </q-input>
    </div>
    <q-infinite-scroll class="q-gutter-y-sm" @load="onLoad" :offset="250">
      <div class="row q-col-gutter-sm">
        <div
          class="col-12 col-md-6"
          :key="index"
          v-for="(order, index) in orders"
        >
          <order-card :order="order" />
        </div>
      </div>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="q-ml-sm">Souhaitez vous annuler cette commande ?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Non" color="primary" v-close-popup />
            <q-btn flat label="Oui" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import OrderCard from "../components/OrderCard";
import { mockOrder } from "../store/mocks";
export default {
  name: "Orders",
  components: {
    OrderCard
  },
  data() {
    return {
      confirm: false,
      orders: []
    };
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        if (this.orders) {
          this.fetchOrders(this.orders.length);
          done();
        }
      }, 2000);
    },
    fetchOrders(offset) {
      const start = 1224234234 + offset;
      const end = start + 15;
      for (var id = start; id < end; id++) {
        this.orders.push(mockOrder(id));
      }
    }
  },
  created() {
    this.fetchOrders(0);
  }
};
</script>
