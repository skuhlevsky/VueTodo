const hash = (params) => Math.random().toString(params).substring(2, 8)
// import _ from "lodash"

export default {
  state: {
    notes: [],
    noteState: []
  },
  actions: {
    async fetchNotes(ctx, noteName) {
      const res = await fetch(
        'https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/task/list'
      )
      const responce = await res.json()
      ctx.commit('updateNotes', {'todosRes': responce.data, 'name': noteName})
    }
  },
  mutations: {
    createCurrentState(state, id) {
      state.noteState = []
      const currentNote = state.notes.find(x => x.id === id)
      state.noteState.todos = []
      state.noteState.id = currentNote.id
      state.noteState.title = currentNote.title
      currentNote.todos.forEach(function (obj, i) {
        state.noteState.todos.push({...currentNote.todos[i]})
      });
    },
    createTodo(state, {id, name}) {
      const todoObj = { 'name': name }
      const currentNote = state.notes.find(x => x.id === id)
      todoObj['id'] = currentNote.todos[0].id.substring(0, 24) + hash(36) + hash(36)
      todoObj['isDone'] = false
      todoObj['isDeleted'] = false
      currentNote.todos.push(todoObj)
    },
    updateNotes(state, {todosRes, name}) {
      // Create Note Object with new name
      // Add isDeleted flag
      const noteObj = {
        id: state.notes.length,
        title: name,
        todos: todosRes.map(t => ({...t, isDeleted: false}))
      }
      state.notes.push(noteObj)
    },
    undoTodos(state, {id, todoObj}) {
      const currentNote = state.notes.find(x => x.id === id)
      const currentTodo = currentNote.todos.find(x => x.id === todoObj.obj.id)
      currentTodo.name = todoObj.obj.name
      currentTodo.isDone = todoObj.obj.isDone
      currentTodo.isDeleted = todoObj.obj.isDeleted
    },
    cancelEditing(state) {
      const currentNote = state.notes.find(x => x.id === state.noteState.id)
      currentNote.title = state.noteState.title
      currentNote.todos.forEach(function (obj, i) {
        obj.name = state.noteState.todos[i].name
        obj.isDone = state.noteState.todos[i].isDone
        obj.isDeleted = state.noteState.todos[i].isDeleted
      });
    },
    deleteTodo(state, {id, todoObj}) {
      const currentNote = state.notes.find(x => x.id === id)
      currentNote.todos.find( t => { return t.id === todoObj.id }).isDeleted = true
    },
    deleteNote(state, id) {
      const noteIndex = state.notes.findIndex(x => x.id === id)
      state.notes.splice(noteIndex, 1)
    }
  },
  getters: {
    allNotes(state) {
      return state.notes
    },
    oneNote: (state) => (id) => {
      return state.notes.find( t => { return t.id === Number(id) } )
    },
    notesCount(state, getters) {
      return getters.allNotes.length
    },
    noteStateCount(state, id) {
      if (Array.isArray(state.noteState[id])) return true
    }
  }
}
