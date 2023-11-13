import utilities from "../../js/utilities.js"
import store from '../../js/store.js'
export default {
    template: await utilities.getPage('components/services-section/index.html'),    
    data(){
        return{
            store,utilities
        }
    }
}