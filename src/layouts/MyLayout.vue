<template>
  <q-layout view="lHh Lpr lff">
    <DesktopHeader v-if="$q.platform.is.desktop" :displayName="userName" />
    <MobileHeader v-else-if="$q.platform.is.mobile" :displayName="userName" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DesktopHeader from "../components/DesktopHeader";
import MobileHeader from "../components/MobileHeader";
export default {
  name: "MyLayout",
  components: {
    DesktopHeader,
    MobileHeader
  },
  data() {
    return {
      leftDrawerOpen: false,
      userName: "Kouamé Manssé"
    };
  }
};
</script>
