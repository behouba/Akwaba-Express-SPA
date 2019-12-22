<template>
  <q-page padding>
    <q-card style="max-width:440px;" class="q-mx-auto q-mt-md q-pa-lg">
      <div class="text-center">
        <router-link to="/">
          <img
            src="~/assets/icons/logo_red.png"
            style="width:200px"
            alt="Logo Akwaba Express"
          />
        </router-link>
        <div class="text-h5 q-pt-md">INSCRIPTION</div>
        <q-separator class="q-my-sm" />
        <div>
          Si vous êtes déjà inscrit,
          <router-link class="text-primary" to="/auth/login"
            >connectez-vous</router-link
          >
        </div>
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
            outlined
            dense
            ref="lastName"
            v-model="lastName"
            label="Nom de famille"
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
            ref="firstName"
            v-model="firstName"
            label="Prénom"
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
            outlined
            dense
            ref="phone"
            v-model="phone"
            label="Numéro de mobile"
            mask="## ## ## ##"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) ||
                'Veuillez saisir une adresse e-mail valide'
            ]"
          />
          <q-input
            ref="password"
            outlined
            dense
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
            label="Inscription"
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
    <!-- <div class="text-center q-gutter-sm q-my-md">
      <div>
        <router-link class="text-primary" to="/general-conditions"
          >Conditions génerales d'utilisation</router-link
        >
      </div>
      <div>
        <router-link class="text-primary" to="/privacy-policy"
          >Politique de confidentialité</router-link
        >
      </div>
    </div>-->
  </q-page>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      submitting: false,
      isPwd: true,
      hasWrongCredentials: false
    };
  }
};
</script>
