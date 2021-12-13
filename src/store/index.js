import { createStore } from 'vuex'

export default createStore({
  state: {
    dialogFormVisible: false,
    yiliaoShow: false,
    passwordShow: false,
  },
  mutations: {
    setDialogFormVisible(state, value) {
      state.dialogFormVisible = value
    },
    setYiliaoShow(state, value) {
      state.yiliaoShow = value
    },
    setPasswordShow(state, value) {
      state.passwordShow = value
    }
  },
  actions: {
  },
  modules: {
  }
})
