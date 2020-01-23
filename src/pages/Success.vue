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
      <div class="q-my-lg text-left">
        <div>
          <div class="text-body1">Nombre de colis: 6</div>
        </div>
        <div>
          <div class="text-body1">
            Total à payer:
            <span class="text-primary text-bold">13,523 FCFA</span>
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
