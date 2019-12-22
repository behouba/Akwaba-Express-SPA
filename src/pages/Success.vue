<template>
  <q-page padding>
    <!-- content -->
    <div class="text-center q-mx-auto q-my-md" style="max-width:600px;">
      <div class="q-my-md">
        <q-icon color="positive" size="7em" name="check_circle_outline" />
      </div>
      <div class="text-h5">Votre commande a été créée</div>
      <div class="q-py-md">
        <q-separator></q-separator>
        <div class="q-py-lg text-body1">
          Numéro de commande:
          <span class="text-primary text-bold">#{{ $route.query.id }}</span>
        </div>
        <q-separator></q-separator>
      </div>
      <div class="q-mb-md">
        Notre service client vous contactera dans quelques instants afin de
        confirmer votre commande.
      </div>
      <q-separator></q-separator>
      <div style="max-width: 400px" class="q-mx-auto q-my-lg">
        <div class="row">
          <div class="col text-body1 text-left">Frais de livraison:</div>
          <div class="col text-body1 text-right text-primary text-bold">
            1,345 FCFA*
          </div>
        </div>
        <div class="row">
          <div class="col text-body1 text-left">Mode de paiement:</div>
          <div class="col text-body1 text-right text-bold">
            Paiment à la livraison
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="q-gutter-md q-mt-sm">
        <q-btn
          color="white"
          icon="info"
          no-caps
          to="/user/orders"
          text-color="black"
          label="Voir les détails"
        />
        <q-btn
          color="primary"
          no-caps
          to="/pricing"
          icon="arrow_right_alt"
          label="Nouvelle commande"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Success"
};
</script>
