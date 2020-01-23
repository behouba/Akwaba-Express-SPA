<template>
  <q-card class="my-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar square>
          <img
            v-if="shipment.category.value == 2"
            src="~/assets/icons/letter.png"
          />
          <img v-else src="~/assets/icons/package.png" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{ shipment.recipient.name }}</q-item-label>
        <q-item-label lines="1" caption>{{
          shipment.recipient.address
        }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat @click="show()" round size="sm" icon="visibility" />
      <q-btn
        flat
        v-if="removable"
        round
        size="sm"
        icon="close"
        @click="remove()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ShipmentCard",
  props: {
    shipment: {
      type: Object,
      required: true
    },
    removable: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    remove() {
      this.$emit("remove", this.shipment);
    },
    show() {
      this.$emit("show", this.shipment);
    }
  }
};
</script>
