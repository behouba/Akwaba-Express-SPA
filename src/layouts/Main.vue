<template>
  <q-layout view="lHh Lpr lff">
    <DesktopHeader v-if="$q.screen.gt.sm" :displayName="userName" />
    <MobileHeader v-else :displayName="userName" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DesktopHeader from "../components/DesktopHeader";
import MobileHeader from "../components/MobileHeader";
export default {
  name: "Main",
  components: {
    DesktopHeader,
    MobileHeader
  },
  data() {
    return {
      leftDrawerOpen: false,
      userName: ""
    };
  }
};
</script>
