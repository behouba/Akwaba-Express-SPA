<template>
  <q-layout view="lHh Lpr lff">
    <DesktopHeader v-if="$q.screen.gt.sm" :displayName="userName" />
    <MobileHeader v-else :displayName="userName" />
    <q-page-container class="q-mx-auto q-mt-lg" style="max-width: 1200px">
      <div class="row q-mt-lg">
        <div class="col-12 col-md-3 q-pr-md" v-if="$q.screen.gt.sm">
          <account-menu />
        </div>
        <div class="col-12 col-md-9">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import DesktopHeader from "../components/DesktopHeader";
import MobileHeader from "../components/MobileHeader";
import AccountMenu from "../components/AccountMenu";

export default {
  name: "Account",
  components: {
    DesktopHeader,
    MobileHeader,
    AccountMenu
  },
  data() {
    return {
      leftDrawerOpen: false,
      userName: "Manassé"
    };
  }
};
</script>
