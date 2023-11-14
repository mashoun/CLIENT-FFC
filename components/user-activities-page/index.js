import utilities from "../../js/utilities.js"
import store from "../../js/store.js"
export default {
    template: await utilities.getPage('components/user-activities-page/index.html'),
    data() {
        return {
            store,
            utilities,
            spinner: false

        }
    },
    methods: {
        isNotOldDate(date) {
            if (utilities.compareDates(new Date(), new Date(date)) === true || utilities.compareDates(new Date(), new Date(date)) == 'AFTER') {
                return true
            }
            return false
        },
        reBookIn(id) {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getUserApi() + '?reBookIn=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({

                        user: this.store.user,
                        reBookIn: {
                            activityId: id,
                            email: this.store.user.email,
                            shift: this.store.reBookIn.shift
                        }

                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.spinner = false
                        this.refresh()
                        alert('Meshe l7al')

                    })
                    .catch(err => {
                        alert(err)
                        this.spinner = false
                    })
            }

        },
        bookOut(id) {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getUserApi() + '?bookOut=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({

                        user: this.store.user,
                        bookOut: {
                            id,
                            email: this.store.user.email,
                        }

                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.spinner = false
                        this.refresh()
                        alert('Meshe l7al')

                    })
                    .catch(err => {
                        alert(err)
                        this.spinner = false
                    })
            }
        },
        refresh() {
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
                    // console.log(res);
                    this.spinner = false
                    this.store.isLogedIn = true
                    this.store.userProfile = res

                })
                .catch(err => {
                    this.spinner = false
                    alert(err)

                })
        }
    }
}