<template>
  <q-page padding>
    <!-- content -->
    <h2>Login page</h2>
    <router-link to="/auth/registration">Inscription</router-link>
    <br />
    <router-link to="/auth/recovery">Recovery</router-link>
  </q-page>
</template>

<script>
export default {
  name: "Login"
};
</script>
