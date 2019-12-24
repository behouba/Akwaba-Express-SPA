<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-h5 text-center">DONNÉES PERSONNELS</div>
      <q-separator class="q-my-xs" />
      <div>
        <form @submit.prevent.stop="updateData" class="q-py-md">
          <div class="q-gutter-sm">
            <q-input
              dense
              outlined
              v-model="user.name"
              label="Nom"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Veuillez saisir votre nom.'
              ]"
            />

            <q-select
              class="q-pb-sm"
              outlined
              dense
              label="Adresse principale"
              v-model="user.address"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="places"
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"
                    >Aucun resultat</q-item-section
                  >
                </q-item>
              </template>
            </q-select>

            <q-input
              dense
              outlined
              v-model="user.email"
              ref="email"
              label="E-mail"
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
              v-model="user.phone"
              prefix="+225 "
              ref="phone"
              label="Téléphone"
              mask="## ## ## ##"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length == 11) ||
                  'Veuillez saisir un numéro de téléphone valide'
              ]"
            />
          </div>
          <q-separator></q-separator>
          <div class="q-py-sm">
            <router-link class="text-primary" to="/user/password"
              >Modifier votre mot de passe</router-link
            >
          </div>

          <div>
            <q-btn
              type="submit"
              :loading="submitting"
              label="Enregistrer les modificatons"
              class="q-mt-sm full-width"
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
  </q-page>
</template>

<script>
const stringOptions = [
  "Abidjan cocody",
  "Abidjan youpougon",
  "Abidjan Treichville",
  "Abidjan Bingerville",
  "Abidjan Adjamé"
];
export default {
  name: "Setting",
  data() {
    return {
      places: [],
      user: {
        name: "Kouamé manassé",
        address: "Cocody, riviera palmeraie",
        phone: "45001685",
        email: "behouba@gmail.com"
      },
      submitting: false
    };
  },
  methods: {
    updateData() {
      alert(JSON.stringify(this.user));
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.places = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>

<style>
.q-select__dropdown-icon {
  cursor: pointer;
  display: none !important;
}
</style>
