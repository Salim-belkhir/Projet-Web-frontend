import { createStore } from 'vuex'

export default createStore({
  state: {
    research : [],
    isSociety : false,
    user : {
      token: null,
      userId : null
    },
    dateDebut : "",
    dateFin : ""
  },
  getters: {
    getSociety(state){
      return state.isSociety;
    },
    getUser(state){
      return state.user;
    },
    getUserToken(state){
      return state.user.token;
    },
    getUserId(state){
      return state.user.userId;
    },
    getResearch(state){
      return state.research;
    },
    getDateDebut(state){
      return state.dateDebut;
    },
    getDateFin(state){
      return state.dateFin;
    }
  },
  mutations: {
    CHANGE_SOCIETY(state, payload){
      state.isSociety = payload;
    },
    CHANGE_USERID(state, payload){
      state.user.userId = payload;
    },
    CHANGE_TOKEN(state, payload){
      state.user.token = payload;
    },
    CHANGE_RESEARCH(state, payload){
      state.research = payload;
    },
    CHANGE_DATE_DEBUT(state, payload){
      state.dateDebut = payload;
    },
    CHANGE_DATE_FIN(state, payload){
      state.dateFin = payload;
    }
  },
  actions: {
    changeSociety(context){
      context.commit("CHANGE_SOCIETY", true);
    },
    changeClient(context){
      context.commit("CHANGE_SOCIETY", false);
    }
  },
  modules: {
  }
})
