<template>
  <div class="note">
    <h2 class="note-name">
      <input
          v-if="edit"
          v-model="thisNote.title"
          @blur="edit = false"
          @keyup.enter="edit = false"
          v-focus
          class="noteInput"
      >
      <span v-else>
        <label @click="edit = true">{{ thisNote.title }}</label>
      </span>
    </h2>

    <input class="field__newtodo"
      autofocus autocomplete="off"
      placeholder="Add your todo here..."
      v-model="newTodo"
      @keyup.enter="addTodo">

    <ul class="note__todos">
      <TodoItem 
        v-for="(todo, index) of todoElements"
        :todo="todo"
        :index="index"
        :key="todo.id"
        :removable="true"
        :isSelectable="true"
        :noteId="Number($route.params.id)"
      />
    </ul>

    <button @click="redo()" :disabled="!isRedo" :class="{ btn__geen: isRedo }" class="btn">&#11150; Redo</button>
    <button @click="undo()" :disabled="!isUndo" :class="{ btn__geen: isUndo }" class="btn">Undo &#11148;</button>
    <button @click="cancelEditingNote()" :disabled="!isCancelled" :class="{ btn__red: isCancelled }" class="btn">Cancel</button>
    <button @click="saveNote()" class="btn btn__geen">Save &#11088;</button>
    <button @click="openModal()" class="btn btn__red">Delete</button>

    <Modal 
      v-if="showModal"
      @deleteNote="deleteNoteElement()"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import TodoItem from '@/components/TodoItem'
import Modal from '@/components/Modal'
export default {
  props: ['todos'],
  data() {
    return {
      id: Number(this.$route.params.id),
      edit: false,
      newTodo: '',
      showModal: false    }
  },
  computed: {
    ...mapGetters(['oneNote']),
    todoElements() {
      return this.thisNote.todos.filter(t => !t.isDeleted)
    },
    thisNote() {
      return this.oneNote(this.$route.params.id)
    },
    isRedo() {
      return this.redoCount()
    },
    isUndo() {
      return this.undoCount()
    },
    isCancelled() {
      return (this.undoCount() || this.redoCount())
    }
  },
  components: {
    TodoItem, Modal
  },
  methods: {
    ...mapGetters(['noteStateCount', 'redoAction', 'undoAction', 'redoCount', 'undoCount']),
    ...mapMutations(['createTodo', 'createCurrentState', 'undoTodos', 'inActiveUndo', 'clearUndo', 'cancelEditing', 'deleteNote']),
    addTodo() {
      const todoName = this.newTodo && this.newTodo.trim()
      if (!todoName || todoName.length < 2) return
      this.createTodo({'id': this.id, 'name': todoName})
      this.newTodo = ''
    },
    saveNote() {
      console.log('Saved!')
    },
    redo() {
      this.undoTodos({'id': this.id, 'todoObj': this.redoAction()})
      this.inActiveUndo(false)
    },
    undo() {
      this.undoTodos({'id': this.id, 'todoObj': this.undoAction()})
      this.inActiveUndo(true)
    },
    cancelEditingNote() {
      this.clearUndo()
      this.cancelEditing()
    },
    openModal() {
      this.showModal = true
    },
    deleteNoteElement() {
      this.deleteNote(this.id)
      this.$router.push('/', () => {})
    },
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  mounted() {
    this.clearUndo()
    this.createCurrentState(this.id);
  }
}
</script>