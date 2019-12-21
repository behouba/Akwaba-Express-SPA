<template>
  <q-page padding>
    <!-- content -->
    <q-card style="max-width:440px;" class="q-mx-auto q-mt-md q-pa-lg">
      <div class="text-center">
        <router-link to="/">
          <img
            src="https://akwabaexpress.ci/assets/img/logo_red.png"
            style="width:200px"
            alt="Logo Akwaba Express"
          />
        </router-link>
        <div class="text-h5 q-pt-md">Récupération du mot de passe</div>
      </div>
      <form @submit.prevent.stop="submitLogin" class="q-pa-md">
        <!-- a simple text field watching for the enter key release -->
        <div>
          <q-banner
            v-if="hasWrongCredentials"
            dense
            inline-actions
            class="text-white bg-negative"
            >Nom d’utilisateur ou mot de passe incorrect</q-banner
          >
          <q-input
            dense
            outlined
            ref="email"
            v-model="email"
            label="Entrez votre adresse e-mail"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) ||
                'Veuillez saisir une adresse e-mail valide'
            ]"
          />
        </div>
        <!--
      A button with v-model set to submit.
      v-model scope variable must be a strict Boolean
        -->
        <div>
          <q-btn
            type="submit"
            :loading="submitting"
            label="Envoyer"
            class="q-mt-md full-width"
            color="primary"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Recovery",
  data() {
    return {
      email: "",
      submitting: false,
      isPwd: true,
      hasWrongCredentials: false
    };
  }
};
</script>
