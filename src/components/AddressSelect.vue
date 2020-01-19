<template>
  <div>
    <q-select
      outlined
      dense
      :label="label"
      :hide-dropdown-icon="true"
      use-input
      v-model="selectedAddr"
      color="dark"
      clearable
      hide-selected
      fill-input
      input-debounce="0"
      :options="addresses"
      @filter="filterFn"
    >
      <!-- <template v-slot:prepend>
        <q-icon name="room" />
      </template>-->
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">Aucun resultat</q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
const serverAddresses = [
  "Abidjan cocody",
  "Abidjan youpougon",
  "Abidjan Treichville",
  "Abidjan Bingerville",
  "Abidjan Adjamé"
];
export default {
  name: "AddressSelect",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      addresses: []
    };
  },
  methods: {
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      //TODO: Ajax request to retreive addresses based on user input
      update(() => {
        const needle = val.toLowerCase();
        this.addresses = serverAddresses.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  computed: {
    selectedAddr: {
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
