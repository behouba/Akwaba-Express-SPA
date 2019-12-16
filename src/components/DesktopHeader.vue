<template>
  <div>
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title style="flex:none">
          <img
            class="q-py-sm"
            src="https://akwabaexpress.ci/assets/img/logo_trans-100.png"
          />
        </q-toolbar-title>

        <q-tabs>
          <q-tab name="tab1" label="Nos services" />
          <q-tab name="tab2" label="Commandes" />
          <q-tab name="tab3" label="Suivi de colis" />
          <q-tab name="tab4" label="À propos" />
        </q-tabs>
        <q-space />
        <q-btn-dropdown stretch flat :label="displayName">
          <q-list>
            <!-- clickable v-close-popup @click="onItemClick" -->
            <q-item>
              <!-- <q-item-section avatar>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>-->
              <q-item-section>
                <q-item-label>Mes commande</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <!-- <q-item-section avatar>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>-->
              <q-item-section>
                <q-item-label>Réglages</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <!-- <q-item-section avatar>
                <q-avatar icon="settings" />
              </q-item-section>-->
              <q-item-section>
                <q-item-label>Déconnexion</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  name: "DesktopHeader",
  props: ["displayName"],
  data() {
    return {};
  }
};
</script>
