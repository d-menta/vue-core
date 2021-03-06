/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $api
|--------------------------------------------------------------------------
|
*/
let api = new Vue({
  methods: {
    // GET ALL
    // ******************
    get (url, _callback) {
      // Degub
      this.$log.debug('API', url)
      // var self = this
      var options = {
        url: url,
        method: 'GET'
      }
      this.$http.axios(options).then((response) => {
        // Return items
        _callback(response.data)
      }, (error) => {
        this.$log.info('SERVICES -> API -> get()')
        this.$log.error(error)
      })
    },

    // UPDATE
    // ******************
    update (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url + '/' + item.id,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Update',
            text: 'Update element successfull!'
          })
        }
        // -----
      }, (error) => {
        this.$log.info('SERVICES -> API -> update()')
        this.$log.error(error)
      })
    },

    // SAVE
    save (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Save',
            text: 'Save element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> save()')
        this.$log.error(error)
      })
    },

    // DELETE
    delete (url, item, _callback, wait) {
      // Degub
      this.$log.debug('API', url)
      if (wait) {
        // Alert wait
      }
      var options = {
        url: url + '/' + item.id,
        method: 'DELETE'
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Delete',
            text: 'Delete element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> delete()')
        this.$log.error(error)
      })
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$api = api
  }
}

