<template>
  <li v-if="!todo.isDeleted" :class="{'done': todo.isDone}" class="todo__item">
    <div :class="{'checkbox': removable}">
      <input v-if="isSelectable"
             type="checkbox"
             :checked="todo.isDone"
             v-on:change="changeDoneStatus"
      >
      <div v-if="edit" class="todo__item--editable-area">
        <input
          v-model="todo.name"
          @blur="edit = false"
          @keyup.enter="edit = false"
          @change="submit"
          v-focus
          class="todo__item--editable-field"
        >
      </div>
      <div v-else class="todo__item--name-area">
        <label v-if="isSelectable" @click="changeDoneStatus()">
          <span :class="{'done': todo.isDone}">
            <strong>{{ index + 1 }}.</strong>
            {{ todo.name }}
          </span>
        </label>
        <label v-else>
          <span>
            <strong>{{ index + 1 }}.</strong>
            {{ todo.name }}
          </span>
        </label>
        <button v-if="isSelectable" @click="edit = true" class="bnt__edit"></button>
        <button v-if="isSelectable" @click="deleteTodoElement(todo.id)" class="bnt__delete"></button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    removable: {
      type: Boolean,
      required: true
    },
    isSelectable: {
      type: Boolean,
      required: true
    },
    noteId: Number,
    index: Number
  },
  data() {
    return {
      todoSaved: {},
      // Copy of the previous state of the object 
      edit: false
    };
  },
  computed: {
    count () {
      // Checking for todo element changes
      return this.undoCount()
    }
  },
  watch: {
    count: {
      immediate: true, 
      handler () {
        this.saveTodo()
      }
    }
  },
  methods: {
    ...mapGetters(['undoCount']),
    ...mapMutations(['addActions', 'deleteTodo']),
    changeDoneStatus() {
      this.todo.isDone = !this.todo.isDone
      this.submit()
    },
    deleteTodoElement() {
      this.deleteTodo({'id': this.noteId, 'todoObj': this.todo})
      this.submit()
    },
    saveTodo() {
      this.todoSaved = {...this.todo}
    },
    submit() {
      this.addActions({'action': 'todo', 'undoObj': {...this.todoSaved}, 'redoObj': {...this.todo}})
      this.saveTodo()
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  mounted() {
    this.saveTodo()
  }
}
</script>

<style scoped>
  .todo__item {
    display: flex;
    justify-content: space-between;
    padding: .2rem .2rem;
    transition: color .5s;
    text-align: left;
  }

  input {
    margin-right: 1rem;
  }

  .done {
    color: #bbbbbb;
    text-decoration: line-through;
  }

  /* Checkbox start here */
  .checkbox {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .checkbox input[type="checkbox"] {
    width: auto;
    opacity: 0.00000001;
    position: absolute;
    left: 0;
    margin-left: -20px;
  }
  .checkbox label {
    position: relative;
  }
  .checkbox label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    margin: 4px;
    width: 20px;
    height: 20px;
    transition: transform 0.28s ease;
    border-radius: 3px;
    border: 2px solid #7bbe72;
  }
  .checkbox label:after {
    content: '';
    display: block;
    width: 10px;
    height: 5px;
    border-bottom: 2px solid #7bbe72;
    border-left: 2px solid #7bbe72;
    -webkit-transform: rotate(-45deg) scale(0);
    transform: rotate(-45deg) scale(0);
    transition: transform ease 0.25s;
    will-change: transform;
    position: absolute;
    top: 11px;
    left: 10px;
  }
  .checkbox input[type="checkbox"]:checked ~ .todo__item--name-area label::before {
    color: #7bbe72;
  }
  .checkbox input[type="checkbox"]:checked ~ .todo__item--name-area label::after {
    -webkit-transform: rotate(-45deg) scale(1);
    transform: rotate(-45deg) scale(1);
  }
  .checkbox label,
  .todo__item--editable-area {
    min-height: 32px;
    display: block;
    padding-left: 40px;
    margin-bottom: 0;
    font-weight: normal;
    cursor: pointer;
  }
  .checkbox label span {
    position: absolute;
    top: 50%;
    left: 43px;
    text-align: left;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding-right: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 30px;
  }
  .checkbox input[type="checkbox"]:focus + .todo__item--name-area label::before {
    outline: 0;
  }

  .todo__item--editable-area {
    padding-right: 40px;
    padding-top: 7px;
    padding-left: 44px;
  }

  .todo__item--editable-field {
    font-size: 14px;
    width: 100%;
    border: 0;
    outline: none;
    border-bottom: 1px solid #5F9EA0;
  }
  /* Checkbox end here */

  /* Delete button start here */
  .todo__item .checkbox .bnt__delete {
    display: none;
    position: absolute;
    top: 0; right: 0;
    bottom: 0; border: 0;
    background: none;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    cursor: pointer;
    transition: color 0.2s ease-out;
  }

  .todo__item .bnt__delete:hover {
    color: #af5b5e;
  }

  .todo__item .bnt__delete:after {
    content: '×';
  }

  .todo__item:hover .bnt__delete {
    display: block;
  }
  /* Delete button end here */

  .todo__item .bnt__edit {
    display: none;
    position: absolute;
    top: 0; right: 30px;
    bottom: 0; border: 0;
    background: none;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: auto 0;
    font-size: 22px;
    opacity: .5;
    color: #5F9EA0;
    cursor: pointer;
    transition: color 0.2s ease-out;
  }

  .todo__item .bnt__edit:after {
    content: '✎';
  }

  .todo__item .bnt__edit:hover {
    opacity: 1;
  }

  .todo__item:hover .bnt__edit {
    display: block;
  }
</style>