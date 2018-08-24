/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $acl
|--------------------------------------------------------------------------
|
*/
let acl = new Vue({
  data () {
    return {
      components: {}
    }
  },
  methods: {
    addComponent (name, component) {
      this.components[name] = component
    },
    can (component, permission) {
      let canPromise = new Promise((resolve, reject) => {
        this.$auth.getUserInfo('https://dmenta.io/app_metadata').then((app_metadata) => {
          if (this.components[component][app_metadata.role][permission]) {
            resolve()
          }else{
            reject()
          }
        })
      })
      return canPromise
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$acl = acl
  }
}

