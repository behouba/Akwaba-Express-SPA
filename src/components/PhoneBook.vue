<template>
  <q-card style="width: 500px">
    <q-card-section>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        v-model="contactQuery"
        @input="fetchContacts"
        outlined
        placeholder="Recherche de contact"
        hint="Debouncing 500ms"
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
          clickable
          v-ripple
          @click="selectContact(contact)"
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
function getContacts() {
  return [
    {
      name: "Didier Attoubo",
      phone: "90893433",
      address: "Abidjan cocody"
    },
    {
      name: "Naturo Uzumaki",
      phone: "34253354",
      address: "Abidjan treichville"
    },
    { name: "Shadow fox", phone: "52343453", address: "Abidjan yopougon" },
    { name: "Jumia ci", phone: "22345351", address: "Abidjan adjamé" },
    {
      name: "Pharmacie Bonheur",
      phone: "42342313",
      address: "Abidjan marcory"
    },
    { name: "Client", phone: "23453425", address: "Abidjan abobo" },
    {
      name: "Very long contact name, it is very very long",
      phone: "23453425",
      address: "Abidjan abobo"
    }
  ];
}

export default {
  name: "PhoneBook",
  data() {
    return {
      contacts: getContacts(),
      contactQuery: null
    };
  },
  methods: {
    fetchContacts() {
      const contacts = getContacts();
      if (this.contactQuery.length < 1) {
        this.contacts = contacts;
        return;
      }
      this.contacts = contacts.filter(
        v => v.name.toLowerCase().indexOf(this.contactQuery.toLowerCase()) > -1
      );
    },
    selectContact(contact) {
      this.$emit("contactSelected", contact);
    }
  }
};
</script>
