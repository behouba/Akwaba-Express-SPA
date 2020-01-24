<template>
  <q-page padding>
    <div class="text-h5">DONNÉES PERSONNELS</div>
    <q-separator class="q-my-xs" />
    <div>
      <form
        @submit.prevent.stop="updateData"
        class="q-py-md"
        style="max-width: 450px"
      >
        <name-input v-model="user.name" />
        <phone-input v-model="user.phone" />
        <address-select label="Adresse" v-model="user.address" />
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
        <!-- <q-checkbox
          v-model="sendMailing"
          label="Recevoir des notifications par e-mail"
        />-->
        <q-toggle
          v-model="sendMailing"
          label="Recevoir des notifications par e-mail"
        />
        <q-separator></q-separator>
        <div class="q-py-sm">
          <router-link class="text-primary" to="/account/password"
            >Modifier votre mot de passe</router-link
          >
        </div>
        <q-separator class="q-mb-sm" />
        <div>
          <q-btn
            outline
            type="submit"
            :loading="submitting"
            label="Enregistrer"
            class="q-mt-sm"
            color="primary"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import NameInput from "../components/NameInput";
import PhoneInput from "../components/PhoneInput";
import AddressSelect from "../components/AddressSelect";

export default {
  name: "Setting",
  components: {
    NameInput,
    PhoneInput,
    AddressSelect
  },
  data() {
    return {
      places: [],
      sendMailing: true,
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
