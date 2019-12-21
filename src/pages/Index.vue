<template>
  <q-page>
    <div class="relative-position">
      <q-img
        src="https://akwabaexpress.ci/assets/img/Abidjan01.jpeg"
        style="max-width: 100%; height: 550px;"
      >
        <div
          style="max-width: 800px;height:100%;background:none"
          class="vertical-middle text-white q-pa-sm"
        >
          <h2 class="text-weight-medium">
            Livraison express de documents et colis partout Abidjan.
          </h2>
          <div class="q-gutter-sm">
            <q-btn
              color="primary"
              icon="arrow_right_alt"
              text-color="white"
              label="Je commande"
            />
            <q-btn
              color="white"
              text-color="black"
              icon="search"
              label="Suivre mon colis"
            />
          </div>
        </div>
      </q-img>
    </div>
    <div>
      <div>
        <h3 class="text-center text-primary">Nos services</h3>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="text-center q-pa-md">
            <div>
              <img src="https://akwabaexpress.ci/assets/img/website.png" alt />
            </div>
            <div>Commande de livraison en ligne</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="text-center q-pa-md">
            <div>
              <img
                src="https://akwabaexpress.ci/assets/img/calculator.png"
                alt
              />
            </div>
            <div>Calcule des frais de livraison en ligne</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="text-center q-pa-md">
            <div>
              <img src="https://akwabaexpress.ci/assets/img/track.png" alt />
            </div>
            <div>Suivi de colis en ligne</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="text-center q-pa-md">
            <div>
              <img src="https://akwabaexpress.ci/assets/img/track.png" alt />
            </div>
            <div>Envoi de colis</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      slide: 1,
      trackingID: null
    };
  }
};
</script>
