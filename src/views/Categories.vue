<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Item Categories</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Category</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.id" label="Category ID"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" label="Category Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.description" label="Category Description"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="justify-center">{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.description }}</td>
        <td class="text-xs-right">
          <v-icon small class="mx-4" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import db from "../config/firebaseDB";

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "ID", align: "left", value: "id" },
        { text: "Category Name", value: "name" },
        { text: "Category Description", value: "description" },
        { text: "Actions", align: "right", value: "name", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: null,
        description: null
      },
      newItem: {
        id: null,
        name: null,
        description: null
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    // this.initialize();

    db.collection("categories")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const category = {
            id: doc.data().id,
            name: doc.data().name,
            description: doc.data().description
          };
          this.desserts.push(category);
        });
      });
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Update Category
        // Object.assign(this.desserts[this.editedIndex], this.editedItem);
        db.collection("categories")
          .where("id", "==", this.editedItem.id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .update({
                  name: this.editedItem.name,
                  description: this.editedItem.description
                })
                .then(() => {
                  this.$router.push("/categories");
                });
            });
          });
      } else {
        // Add New Category
        this.desserts.push(this.editedItem);
        db.collection("categories")
          .add({
            id: this.editedItem.id,
            name: this.editedItem.name,
            description: this.editedItem.description
          })
          .then(docRef => {
            (this.editedItem.id = null),
              (this.editedItem.name = null),
              (this.editedItem.description = null),
              this.$router.push("/categories");
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.close();
    }
  }
};
</script>
