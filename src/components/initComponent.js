/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import VuexGetters from '@/vuex/getters'
import VuexActions from '@/vuex/actions'
import VuexMutations from '@/vuex/mutations'

import { buttonsName } from '@/config/button'
import { globalTableConfig } from '@/config/table'
import { baseTableColumns } from '@/config/table'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/
export const initComponent = function (component)
{
  let componentObject = {
    coreExtendVuex: component.componentName,
    coreExtendVuexPl: component.componentNamePl,
    coreExtendScope: component.componentName,
    coreExtendScopePl: component.componentNamePl,
    coreExtendMenu: '',
    coreVuexAssociate: [],
    formName: component.componentNamePl,
    displayName: component.displayName,
    displayNamePrint: component.displayNamePrint,
    typeMenu: component.typeMenu,
    
    // Name bottoms
    buttons: Object.assign({},
      buttonsName
    ),
    // Table
    table: Object.assign({},
      globalTableConfig,
      {
        columns: component.columnsTable.concat([baseTableColumns]),
        sortOptions: {
          enabled: true,
          initialSortBy: {field: component.fieldID, type: 'desc'}
        },
      }
    ),
    // Fields
    fields: component.fieldsForm,
    fieldID: component.fieldID
  }

  /*
  |--------------------------------------------------------------------------
  | Store
  |--------------------------------------------------------------------------
  |
  */
  let options = {
    displayName: component.displayName,
    url: component.componentUrl +  '/' + component.componentNamePl,
    mTypeName: component.componentName,
    mTypeNamePl: component.componentNamePl
  }

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  |
  */
  const state = {
    all: [],
    item: {},
    clone: {}
  }

  /*
  |--------------------------------------------------------------------------
  | Getters
  |--------------------------------------------------------------------------
  |
  */
  const getters = VuexGetters.core(state, options)

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  |
  */
  const actions = VuexActions.core(options)

  /*
  |--------------------------------------------------------------------------
  | Mutations
  |--------------------------------------------------------------------------
  |
  */
  const mutations = VuexMutations.core(state, options)

  /*
  |--------------------------------------------------------------------------
  | Store
  |--------------------------------------------------------------------------
  |
  */
  let store = {
    state,
    getters,
    actions,
    mutations
  }

  return [componentObject, store]
}