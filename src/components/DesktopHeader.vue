<template>
  <div>
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title style="flex:none">
          <router-link to="/">
            <img
              class="q-py-sm"
              src="https://akwabaexpress.ci/assets/img/logo_trans-100.png"
            />
          </router-link>
        </q-toolbar-title>

        <q-tabs>
          <q-route-tab to="/services" name="tab1" label="Nos services" />
          <q-route-tab to="/pricing" name="tab2" label="Commande" />
          <q-route-tab to="/tracking" name="tab3" label="Suivi de colis" />
          <q-route-tab to="/about" name="tab4" label="À propos" />
        </q-tabs>
        <q-space />
        <q-btn-dropdown v-if="displayName" :label="displayName">
          <account-menu />
        </q-btn-dropdown>
        <q-btn v-else to="/auth/login" label="Connexion" outline color="red" />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import AccountMenu from "./AccountMenu";
export default {
  name: "DesktopHeader",
  props: ["displayName"],
  components: {
    AccountMenu
  },
  data() {
    return {};
  }
};
</script>
