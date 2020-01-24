<template>
  <q-card style="width: 400px; max-width: 80vw;" class="q-pt-md">
    <q-card-section class="q-pt-none">
      <div>Destinataire: {{ shipment.recipient.name }}</div>
      <div>Téléphone: {{ shipment.recipient.phone }}</div>
      <div>Adresse: {{ shipment.recipient.address }}</div>
      <div>Catégorie: {{ cMap[shipment.category.value] }}</div>
      <div>Distance: {{ shipment.formatedDistance }} km</div>
      <div>
        Frais de livraison:
        {{ shipment.formatedCost }} FCFA
      </div>
      <div>
        Mode de paiement:
        {{ poMap[shipment.paymentOption.value] }}
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  PaymentOptionsMap as poMap,
  CategoriesMap as cMap
} from "../store/models";
export default {
  name: "ShipmentInfoCard",
  props: {
    shipment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cMap,
      poMap
    };
  }
};
</script>
