import utilities from "../../js/utilities.js"
import store from "../../js/store.js"
export default {
    template: await utilities.getPage('components/user-activities-page/index.html'),
    data() {
        return {
            store,
            utilities,

        }
    },
    methods: {
        isNotOldDate(date) {
            if (utilities.compareDates(new Date(), new Date(date)) === true || utilities.compareDates(new Date(), new Date(date)) == 'AFTER') {
                return true
            }
            return false
        }
    }
}