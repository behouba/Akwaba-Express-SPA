<template>
  <q-page padding>
    <!-- content -->
    <q-card style="max-width:440px;" class="q-mx-auto q-mt-md q-pa-lg">
      <div class="text-center">
        <router-link to="/">
          <img
            src="~/assets/icons/logo_red.png"
            style="width:200px"
            alt="Logo Akwaba Express"
          />
        </router-link>
        <div class="text-h5 q-pt-md">CONNEXION</div>
      </div>
      <form @submit.prevent.stop="submitLogin" class="q-pa-md">
        <!-- a simple text field watching for the enter key release -->
        <div class="q-gutter-sm">
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
            label="Adresse e-mail"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) ||
                'Veuillez saisir une adresse e-mail valide'
            ]"
          />

          <q-input
            ref="password"
            dense
            outlined
            :type="isPwd ? 'password' : 'text'"
            v-model="password"
            lazy-rules
            label="Mot de passe"
            :rules="[
              val =>
                (val && val.length >= 4) ||
                'Votre mot de passe doit contenir au moins 4 caractères'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <!--
      A button with v-model set to submit.
      v-model scope variable must be a strict Boolean
        -->
        <div>
          <q-btn
            type="submit"
            :loading="submitting"
            label="Connexion"
            class="q-mt-md full-width"
            color="primary"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <div class="q-mt-md text-center">
            <router-link class="text-primary" to="/auth/recovery"
              >Mot de passe oublié?</router-link
            >
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="text-center">
          <router-link class="text-primary" to="/auth/registration"
            >Inscription</router-link
          >
        </div>
      </form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      submitting: false,
      isPwd: true,
      hasWrongCredentials: false
    };
  },
  methods: {
    submitLogin() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        return;
      }
      this.submitting = true;
      setTimeout(() => {
        this.hasWrongCredentials = true;
        this.submitting = false;
      }, 2000);
    }
  }
};
</script>
