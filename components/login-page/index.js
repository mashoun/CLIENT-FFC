import utilities from "../../js/utilities.js"
import store from "../../js/store.js"
export default {
    template: await utilities.getPage('components/login-page/index.html'),
    data() {
        return {
            spinner: false,
            store
        }
    },
    methods: {
        login() {
            this.spinner = true
            fetch(this.store.getUserApi() + '?login=1', {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    user: this.store.user
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.spinner = false
                this.store.isLogedIn = true
                this.store.userProfile = res
                this.store.loading = false
                
            })
            .catch(err => {
                this.spinner = false
                alert(err)

            })
        }
    }
}