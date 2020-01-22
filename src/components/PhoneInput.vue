<template>
  <div>
    <q-input
      dense
      outlined
      color="dark"
      ref="phone"
      prefix="+225 "
      v-model="phone"
      label="Téléphone"
      mask="## ## ## ##"
      lazy-rules
      :rules="[
        val =>
          (val && val.length == 11) ||
          'Veuillez saisir un numéro de téléphone valide'
      ]"
    />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PhoneInput",
  props: {
    value: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    phone: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
});
</script>
