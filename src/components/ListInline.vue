<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/Core'
import componentConfig from '@/components/component'

/*
|--------------------------------------------------------------------------
| vue-good-table
|--------------------------------------------------------------------------
|
*/
import { VueGoodTable } from 'vue-good-table';

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponent,
  components: {
    VueGoodTable,
  },
  data () {
    return {
      itemIDParent: 0,
      items: [],
      config: componentConfig
    }
  },
  created () {
    // Data
    this.itemIDParent = parseInt(this.$route.params.id)
    this.$store.dispatch('getByParent' + this.config.coreExtendVuexPl, this.itemIDParent)
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['allByParent' + this.config.coreExtendVuexPl]
    }
  },
  methods: {
    __newItem () {
      this.$router.push({name: this.config.coreExtendScope + '-new', params: { id_parent: this.itemIDParent }})
    },
    __edit (id) {
      this.$router.push({name: this.config.coreExtendScope, params: { id: id, id_parent: this.itemIDParent }})
    },
    __delete (id) {
      this.$store.dispatch('get' + this.config.coreExtendVuex, id).then(() => {
        this.$store.dispatch('delete' + this.config.coreExtendVuex, this.$store.getters[this.config.coreExtendVuex])
      })
    }
  }
}
</script>

<template>
  <div class="List Inline">
    <div class="header">
      <h3>{{ config.displayName }}</h3>
    </div>
    <vue-good-table :columns="config.table.columns" :rows="itemsVuex" :lineNumbers="config.table.lineNumbers" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" styleClass="table table-bordered table-hover">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label === 'Actions'">
          <a class="btn edit" @click="__edit(props.row.id)"><span v-html="config.buttonEditName"></span></a>
          <a class="btn delete" @click="__delete(props.row.id)"><span v-html="config.buttonDeleteName"></span></a>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <div class="actions">
      <a class="btn new" @click="__newItem()"><span v-html="config.buttonNewName"></span></a>
    </div>
  </div>
</template>

<style lang="sass">
</style>