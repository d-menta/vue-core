<script>

export default {
  props: {
    item: {
      type: Object,
      required: false
    },
    field: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      loading: false,
      files: [],
      confirm: false,
      options: {
        penColor: 'blue'
      }
    }
  },
  computed: {
    urlFiles () {
      return this.field.urlFiles + '/' + this.item.id
    },
    deleteFiles () {
      return this.field.deleteFiles + '/' + this.item.id
    },
    urlUpload () {
      return this.field.urlUpload + '/' + this.item.id
    }
  },
  created () {
    this.getFilesDropbox()
  },
  methods: {
    getFilesDropbox: function () {

      var options = {
        url: this.urlFiles,
        method: 'GET'
      }
      this.$http.axios(options).then((dropboxFiles) => {
        this.loading = true
        this.files = dropboxFiles.data

        this.cleanSignature()
      })
    },
    deleteFilesDropbox: function () {
      this.confirm = true
    },
    cancelDeleteFilesDropbox: function () {
      this.confirm = false
    },
    confirmDeleteFilesDropbox: function () {
      // RESET
      this.resetDropboxElements()
      var options = {
        url: this.deleteFiles,
        method: 'GET'
      }
      this.$http.axios(options).then(() => {
        this.getFilesDropbox()
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Delete',
            text: 'Delete element successfull!'
          })
        }
      })
    },
    uploadFilesDropbox: function () {

      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      
      this.$log.debug(isEmpty)

      if (!isEmpty) {
        // Get
        let formData = new FormData()
        formData.append('file', data)
        this.resetDropboxElements()
        var options = {
          url: this.urlUpload,
          method: 'POST',
          data: formData
        }
        this.$http.axios(options).then(() => {
          this.getFilesDropbox()
          // Notify
          if (this.$notify){
            this.$notify({
              group: 'global',
              type: 'success',
              title: 'Save',
              text: 'Save element successfull!'
            })
          }
        }, (/*response*/) => {
          this.getFilesDropbox()
        })
      } else {
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Sin firma'
          })
        }
      }
    },
    resetDropboxElements: function () {
      this.files = []
      this.loading = false
      this.confirm = false
    },
    cleanSignature: function () {
      if (this.$refs.signaturePad) {
        this.$refs.signaturePad.clearSignature()
        this.$refs.signaturePad.resizeCanvas()
      }
    }
  }
}
</script>

<template>
  <div class="dropbox signature">
    <h3>{{ field.label }}</h3>
    <div class="form-group w100">

      <template v-if="loading">
        <ul class="photos-list" v-if="files">
          <li v-for="(file, index) in files" v-bind:key="file.metadata.id">
            <small>{{index+1}}</small><img :src="file.link">
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="loading inline">
          <icon name="sync" scale="2" spin></icon>
        </div>
      </template>

      <div class="photos-btns">

        <VueSignaturePad width="300px" height="200px" :options="options" ref="signaturePad" v-show="!files.length" />

        <hr/>
        <button type="button" class="btn cancel" @click="cleanSignature()" tabindex="0" :disabled="files.length > 0">{{ field.resetText }}</button>
        <button type="button" class="btn upload" @click="uploadFilesDropbox()" tabindex="0" :disabled="files.length > 0">{{ field.upText }}</button>
        <button v-if="!confirm" type="button" class="btn delete" @click="deleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.deleteText }}</button>
        <button v-if="confirm" type="button" class="btn delete ask" @click="confirmDeleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.confirmDeleteText }}</button>
        <button v-if="confirm" type="button" class="btn cancel" @click="cancelDeleteFilesDropbox()" tabindex="0" :disabled="!files.length">{{ field.cancelDeleteText }}</button>
      </div>
    </div>
  </div>
</template>
