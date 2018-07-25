import coreGetters from '@/vuex/getters'
import coreActions from '@/vuex/actions'
import coreMutations from '@/vuex/mutations'

const options = {
  displayName: 'comments',
  url: process.env.VUE_APP_API_URL +  '/comments',
  mTypeName: 'COMMENT',
  mTypeNamePl: 'COMMENTS'
}

// initial state
const state = {
  all: [],
  item: {}
}

// getters
const getters = coreGetters.core(state, options)

// actions
const actions = coreActions.core(options)

// mutations
const mutations = coreMutations.core(state, options)

export default {
  state,
  getters,
  actions,
  mutations
}
