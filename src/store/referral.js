
export default {
  namespaced: true,
  state() {
    return {
      modalState : false,
    };
  },
  mutations: {
    changeModalState(state,payload){
      state.modalState = payload;
      const body = document.querySelector('body');
      if(state.modalState === true){
        body.style.overflow = 'hidden';
      }else{
        body.style.overflow = 'auto';
      }
    }
  },
  actions: {
  },
};
