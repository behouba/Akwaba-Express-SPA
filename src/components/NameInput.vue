<template>
  <div>
    <q-input
      dense
      color="dark"
      outlined
      ref="name"
      v-model="name"
      label="Nom"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Veuillez saisir un nom']"
    ></q-input>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "NameInput",
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
    name: {
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
