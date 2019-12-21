<template>
  <div>
    <q-header>
      <q-toolbar class="text-white" style="background-color: #b02025">
        <q-toolbar-title>
          <router-link to="/">
            <img
              class="q-py-sm"
              src="https://akwabaexpress.ci/assets/img/logo_trans-100.png"
            />
          </router-link>
        </q-toolbar-title>

        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      content-class="bg-white text-black"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding class="menu-list">
          <q-item>
            <q-item-section>{{ displayName }}</q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple to="/user/orders">
            <q-item-section avatar>
              <q-icon name="all_inbox" />
            </q-item-section>

            <q-item-section>Mes commandes</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/setting">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Réglages</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>Déconnexion</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple to="/services">
            <q-item-section avatar>
              <q-icon name="local_offer" />
            </q-item-section>

            <q-item-section>Nos services</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/pricing">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Commande</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/tracking">
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>

            <q-item-section>Suivi de colis</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/about">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>

            <q-item-section>À propos</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://akwabaexpress.ci/assets/img/logo_trans.png"
        style="height: 150px"
      ></q-img>
    </q-drawer>
  </div>
</template>

<script>
export default {
  name: "MobileHeader",
  props: ["displayName"],
  data() {
    return {
      drawerRight: false
    };
  }
};
</script>
