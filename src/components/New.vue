<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponentEdit from '@/components/Edit'
import componentConfig from '@/components/component'

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponentEdit,
  data () {
    return {
      config: componentConfig,
      isNew: true
    }
  }
}
</script>
