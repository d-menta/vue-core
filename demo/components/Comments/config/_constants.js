/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
*/
export default {
// VUEX
  VUEX_MUTATION: 'COMMENT',
  VUEX_MUTATION_PL: 'COMMENTS',
  // API
  SCOPE: 'comment',
  SCOPE_PL: 'comments',
  // TABLE
  TABLE_COLUMNS: [
    {
      label: 'ID',
      field: 'id',
      type: 'number',
      thClass: 'id',
      tdClass: 'id',
      sortable: false
    },
    {
      label: 'Name',
      field: 'name',
      type: 'string',
      thClass: 'name',
      tdClass: 'name'
    },
  ],
  FIELDS: [
    {
      label: 'Name',
      field: 'name',
      type: 'string',
      required: true,
      firstFocusForm: true
    },
  ],
  // EXTRAS
  MENU: '',
  NAME: 'Comments'
}
