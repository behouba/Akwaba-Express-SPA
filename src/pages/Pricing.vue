<template>
  <q-page padding>
    <!-- content -->
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-h5 text-center">Calculez vos frais de livraison</div>
      <q-separator class="q-my-xs" />
      <div class="text-body1">
        Indiquez le lieu de départ, la destination ainsi que la catégorie du
        colis afin de calculer le coût de votre livraison.
      </div>
      <div>
        <form @submit.prevent.stop="submitLogin" class="q-py-md">
          <!-- a simple text field watching for the enter key release -->
          <div class="q-gutter-lg">
            <!-- <q-banner
              v-if="hasWrongCredentials"
              dense
              inline-actions
              class="text-white bg-negative"
              >Nom d’utilisateur ou mot de passe incorrect
            </q-banner>-->
            <address-select label="Départ" v-model="origin" />
            <address-select label="Destination" v-model="destination" />
          </div>
          <!--
      A button with v-model set to submit.
      v-model scope variable must be a strict Boolean
          -->
          <div class="q-mt-md">Sélectionnez une catégorie</div>
          <q-separator />
          <div class="row q-gutter-sm q-my-sm">
            <div class="col">
              <q-card
                @click="categorySelect(category1Id)"
                flat
                bordered
                class="category-card text-center"
              >
                <q-card-section>
                  <div class="text-h6">Colis</div>
                  <img src="~assets/icons/package.png" style="width:80px" alt />
                </q-card-section>
                <q-card-section class="text-primary text-weight-bold">
                  <!-- 1,150 FCFA* -->
                  <q-spinner-dots color="primary" size="1em" />
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card
                @click="categorySelect(category2Id)"
                flat
                bordered
                class="category-card text-center"
              >
                <q-card-section>
                  <div class="text-h6">Documents</div>
                  <img style="width:80px" src="~assets/icons/letter.png" alt />
                </q-card-section>

                <q-card-section class="text-primary text-weight-bold"
                  >1,150 FCFA*</q-card-section
                >
              </q-card>
            </div>
          </div>
          <div class="text-center">
            <small class="text-weight-light">
              *Des frais supplémentaires seront facturés pour les colis de plus
              de 10kg
            </small>
          </div>

          <!-- <div>
            <q-btn
              type="submit"
              :loading="submitting"
              label="Inscription"
              class="q-mt-md full-width"
              color="primary"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>-->
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
import AddressSelect from "../components/AddressSelect";
import {
  CATEGORY1_ID as category1Id,
  CATEGORY2_ID as category2Id,
  CategoriesMap as cMap
} from "../store/models";

export default {
  name: "Pricing",
  components: {
    AddressSelect
  },
  data() {
    return {
      origin: "",
      destination: "",
      hasPrices: true,
      category1Id,
      category2Id
    };
  },
  methods: {
    categorySelect(id) {
      console.log(this.origin, this.destination, cMap[id]);
      // if (this.hasPrices) {
      //   this.$router.push(
      //     "/order/checkout?category=" +
      //       category +
      //       "&origin=" +
      //       this.origin +
      //       "&destination=" +
      //       this.destination
      //   );
      //   return;
      // }
    }
  }
};
</script>
