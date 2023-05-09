import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: 'c1',
    };
  },
  mutations,
  actions,
  getters,
};
