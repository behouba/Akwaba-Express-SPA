<template>
  <q-page padding>
    <!-- content -->
    <div class="q-mx-auto" style="max-width: 600px">
      <div class="text-h5 text-center q-mt-lg">COMMANDES</div>
      <q-separator></q-separator>
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
        <q-card v-for="(order, index) in orders" :key="index">
          <q-expansion-item
            expand-separator
            :icon="icons[0]"
            label="Colis à Bonheur de couple"
            caption="En Attente de confirmation"
          >
            <q-card class="my-card">
              <q-separator />
              <q-card-section class="text-body2 text-grey-8">
                <div>Commande Nº: 1324234242</div>
                <div>Créée le: 10/12/2019</div>
                <div>Nº de suivi: 3453245234</div>
                <!-- <div>Expéditeur: Kouamé behouba manassé</div> -->
                <div>Destinataire: Bonheur de couple</div>
                <div>Destination: Abidjan, cocody riviera palmeraie</div>
                <div>Catégorie: Colis</div>
                <div>Distance: 12 km</div>
                <div>Frais de livraison: 1,250 FCFA</div>
                <div>Mode de paiement: Paiement à la livraison</div>
                <div></div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn
                  size="sm"
                  icon="search"
                  to="/tracking?id=324123423"
                  color="info"
                  >Suivre</q-btn
                >
                <q-btn
                  size="sm"
                  icon="close"
                  @click="confirm = true"
                  color="negative"
                  >Annuler</q-btn
                >
                <q-btn
                  size="sm"
                  icon="close"
                  @click="confirm = true"
                  color="negative"
                  >Supprimer</q-btn
                >
              </q-card-actions>
            </q-card>
          </q-expansion-item>
        </q-card>

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
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      confirm: false,
      icons: ["hourglass_empty", "local_shipping", "close", "done"],
      orders: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        if (this.orders) {
          this.orders.push({}, {}, {}, {}, {}, {}, {});
          done();
        }
      }, 2000);
    }
  }
};
</script>
