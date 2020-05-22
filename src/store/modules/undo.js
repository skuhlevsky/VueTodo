export default {
  state: {
    undo: [],
    redo: []
  },
  
  mutations: {
    addActions(state, {action, undoObj, redoObj}) {
      state.undo = []
      state.redo = []
      state.undo.push({action, actual: true, obj: undoObj})
      state.redo.push({action, actual: false, obj: redoObj})
    },
    inActiveUndo(state, action) {
      state.undo[0].actual = !action
      state.redo[0].actual = action
    },
    clearUndo(state) {
      state.undo = []
      state.redo = []
    }
  },

  getters: {
    redoCount(state) {
      if (state.redo.length && state.redo[0].actual) return true
      else return false
    },
    undoCount(state) {
      if (state.undo.length && state.undo[0].actual) return true
      else return false
    },
    redoAction(state) {
      return state.redo[0]
    },
    undoAction(state) {
      return state.undo[0]
    }
  }
}
