import { Vue } from 'vue-property-decorator'
import { Authorizer } from './Authorizer'

const authorizer = new Authorizer()
Vue.use(authorizer)
export default authorizer
