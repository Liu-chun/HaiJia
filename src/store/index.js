import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from "./modules/app";
import user from "./modules/user";
import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default new Vuex.Store({
    app,
    user,
    state,
    actions,
    getters,
    mutations
})
