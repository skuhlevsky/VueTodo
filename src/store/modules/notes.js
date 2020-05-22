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
      let noteIndex = state.notes.findIndex(x => x.id == id)
      state.noteState.todos = []
      state.noteState.id = state.notes[noteIndex].id
      state.noteState.title = state.notes[noteIndex].title
      state.notes[noteIndex].todos.forEach(function (obj, i) {
        state.noteState.todos.push({...state.notes[noteIndex].todos[i]})
      });
    },
    createTodo(state, {id, name}) {
      let todoObj = { 'name': name }
      let note = state.notes.findIndex(x => x.id == id)
      todoObj['id'] = state.notes[note].todos[0].id.substring(0, 24) + hash(36) + hash(36)
      todoObj['isDone'] = false
      todoObj['isDeleted'] = false
      state.notes[note].todos.push(todoObj)
    },
    updateNotes(state, {todosRes, name}) {
      // Create Note Object with new name
      // Add isDeleted flag
      let noteObj = {
        id: state.notes.length,
        title: name,
        todos: todosRes.map(t => ({...t, isDeleted: false}))
      }
      state.notes.push(noteObj)
    },
    undoTodos(state, {id, todoObj}) {
      let note = state.notes.findIndex(x => x.id == id)
      let todoIndex = state.notes[note].todos.findIndex(x => x.id == todoObj.obj.id)
      state.notes[note].todos[todoIndex].name = todoObj.obj.name
      state.notes[note].todos[todoIndex].isDone = todoObj.obj.isDone
      state.notes[note].todos[todoIndex].isDeleted = todoObj.obj.isDeleted
    },
    cancelEditing(state) {
      let noteIndex = state.notes.findIndex(x => x.id == state.noteState.id)
      state.notes[noteIndex].title = state.noteState.title
      state.notes[noteIndex].todos.forEach(function (obj, i) {
        obj.name = state.noteState.todos[i].name
        obj.isDone = state.noteState.todos[i].isDone
        obj.isDeleted = state.noteState.todos[i].isDeleted
      });
    },
    deleteTodo(state, {id, todoObj}) {
      let note = state.notes.findIndex(x => x.id == id)
      state.notes[note].todos.find( t => { return t.id === todoObj.id }).isDeleted = true
    },
    deleteNote(state, id) {
      let noteIndex = state.notes.findIndex(x => x.id == id)
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
