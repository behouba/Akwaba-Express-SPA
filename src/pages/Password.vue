<template>
  <q-page padding>
    <div class="q-mx-auto q-my-lg" style="max-width:500px">
      <div class="text-h5 text-center">Modifier votre mot de passe</div>
      <q-separator class="q-my-xs" />
      <div>
        <form @submit.prevent.stop="updateData" class="q-py-md">
          <div class="q-gutter-sm">
            <q-input
              ref="password"
              dense
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="password.current"
              lazy-rules
              label="Mot de passe actuel"
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
            <q-input
              ref="password"
              dense
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="password.new1"
              lazy-rules
              label="Nouveau mot de passe"
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
            <q-input
              ref="password"
              dense
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="password.new2"
              lazy-rules
              label="Saisissez à nouveau le mot de passe"
              :rules="[
                val =>
                  (val.length >= 4 && password.new1 == password.new2) ||
                  'Les mots de passe ne correspondent pas'
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

          <div>
            <q-btn
              type="submit"
              :loading="submitting"
              label="Mettre à jour le mot de passe"
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
export default {
  name: "Password",
  data() {
    return {
      isPwd: true,
      password: {
        current: null,
        new1: null,
        new2: null
      }
    };
  }
};
</script>
