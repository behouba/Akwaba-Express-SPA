<template>
  <q-card style="width: 500px">
    <q-card-section>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        v-model="query"
        @input="fetchContacts(query)"
        outlined
        placeholder="Recherche de contact"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section
      :class="{
        scroll: $q.screen.gt.sm,
        constactHeight: $q.screen.gt.sm
      }"
    >
      <q-list>
        <q-item
          v-for="contact in contacts"
          :key="contact.id"
          class="q-my-sm"
          :data-contact="contact.id"
          clickable
          v-ripple
          @click="input(contact)"
        >
          <q-item-section avatar>
            <q-avatar
              icon="perm_identity"
              color="primary"
              text-color="white"
            ></q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ contact.name }}</q-item-label>
            <q-item-label caption lines="1"
              >+225 {{ contact.phone }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item-label class="text-center" v-if="contacts.length < 1" header
          >Aucun contact</q-item-label
        >
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PhoneBook",
  data() {
    return {
      query: null
    };
  },
  computed: {
    ...mapGetters(["contacts"])
  },
  methods: {
    ...mapActions(["fetchContacts"]),
    input(contact) {
      this.$emit("input", contact);
    }
  },
  created() {
    this.fetchContacts();
  }
};
</script>
