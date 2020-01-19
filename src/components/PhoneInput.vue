<template>
  <div>
    <q-input
      dense
      outlined
      color="dark"
      ref="senderPhone"
      prefix="+225 "
      v-model="phone"
      label="Téléphone"
      mask="## ## ## ##"
      lazy-rules
      :rules="[
        val =>
          (val && val.length > 0) || 'Veuillez saisir une adresse e-mail valide'
      ]"
    />
  </div>
</template>

<script>
export default {
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
};
</script>
