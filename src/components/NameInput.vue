<template>
  <div>
    <q-input
      dense
      color="dark"
      outlined
      ref="senderName"
      v-model="name"
      label="Nom"
      lazy-rules
      :rules="[
        val =>
          (val && val.length > 0) || 'Veuillez saisir une adresse e-mail valide'
      ]"
    >
      <!-- <template v-slot:append>
                  <q-btn
                    round
                    flat
                    @click="senderDialog = true"
                    icon="add"
                  ></q-btn>
      </template>-->
    </q-input>
  </div>
</template>

<script>
export default {
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
};
</script>
