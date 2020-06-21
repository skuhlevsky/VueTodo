<template>
  <div>
    <div v-for="note of allNotes" :key="note.id" class="note-area">
      <div class="note-title">
        <router-link :to="{ name: 'note', params: { id: note.id } }">{{ note.title }}</router-link>
      </div>

      <TodoList
        v-if="note.todos.length"
        :todos="note.todos"
        :removable="false"
        :isSelectable="false"
      />
      <p v-else>No todos!</p>
    </div>

    <button @click="addNote()" class="btn btn__geen">New Note</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoList from "@/components/TodoList";
export default {
  computed: mapGetters(["allNotes", "notesCount"]),
  methods: {
    ...mapActions(["fetchNotes"]),
    addNote() {
      this.fetchNotes("New Task");
    }
  },
  components: {
    TodoList
  },
  mounted() {
    if (!this.notesCount) {
      this.fetchNotes("First task");
      this.fetchNotes("Second task");
    }
  }
};
</script>