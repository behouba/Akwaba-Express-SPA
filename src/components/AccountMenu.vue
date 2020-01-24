<template>
  <q-list class="menu-list">
    <q-item clickable v-ripple to="/account/orders">
      <q-item-section avatar>
        <q-icon name="all_inbox" />
      </q-item-section>

      <q-item-section>Mes commandes</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/account/contacts">
      <q-item-section avatar>
        <q-icon name="contacts" />
      </q-item-section>
      <q-item-section>Mes contacts</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/account/setting">
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
  </q-list>
</template>

<script>
export default {
  name: "AccountMenu",
  data() {
    return {};
  }
};
</script>
