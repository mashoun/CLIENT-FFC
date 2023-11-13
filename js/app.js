import utilities from './utilities.js'
import store from './store.js'
import "./swiper.min.js"

const app = Vue.createApp({
    data() {
        return {
            spinner: false,
            store,
            utilities
        }
    },
    methods: {
        validateSignup() {
            // returns true iza all are validated
            if (this.store.signup.firstName.trim() != '') {
                if (this.store.signup.lastName.trim() != '') {
                    if (this.store.signup.email.trim() != '') {
                        if (this.store.signup.password.trim() != '') {
                            if (this.store.signup.number.trim() != '') {
                                if (this.store.signup.idnFront[0].src64 != '') {
                                    if (this.store.signup.idnBack[0].src64 != '') {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false
        },
        activateTab(tabName) {
            this.store.activeTab = tabName
            this.store.showActiveTab = true
        },
        async uploadFileToStore(prop) {
            // takes image and save it in store
            var files = await utilities.openFiles()
            if (files) {

                var files64 = [];// turn to b64
                for (let i = 0; i < files.length; i++) {
                    files64.push({
                        alt: `IDN-${utilities.getCurrentDate()}`,
                        // src64: await utilities.file64(files[i])
                        src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]), 0.7)
                    })
                }

                // console.log(files64);
                this.store.signup[prop] = files64
            }
        },
        signup() {
            this.spinner = true
            fetch(this.store.getUserApi() + '?signup=1', {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    createNewUserAccount: this.store.signup
                })
            })
                .then(res => res.json())
                .then(res => {

                    // console.log(res);
                    if (res == true) {

                        alert('Meshe l7al')
                    } else alert(res)
                    // then direct to login page

                    this.spinner = false
                    location.href = '/login'
                })
                .catch(err => {
                    this.spinner = false
                    alert(err)
                    location.reload()

                })
        }
    },
    mounted() {


        this.spinner = true
        fetch(this.store.getPublicApi()).then(res => res.json()).then(res => {
            // console.log(res);
            this.store.public = res
            this.spinner = false
            this.store.loading = false

        }).catch(err => {
            this.spinner = false
            // console.log(err);
            // location.reload()
        })
    }
})


// import temp from '../components/temp/index.js'
// app.component('temp', temp)

import navbar from '../components/navbar/index.js'
app.component('navbar', navbar)

import heroSection from '../components/hero-section/index.js'
app.component('hero-section', heroSection)

import aboutSection from '../components/about-section/index.js'
app.component('about-section', aboutSection)

import servicesSection from '../components/services-section/index.js'
app.component('services-section', servicesSection)

import whyChooseUsSection from '../components/why-choose-us-section/index.js'
app.component('why-choose-us-section', whyChooseUsSection)

import packagesSection from '../components/packages-section/index.js'
app.component('packages-section', packagesSection)

import faqSection from '../components/faq-section/index.js'
app.component('faq-section', faqSection)

import footerSection from '../components/footer-section/index.js'
app.component('footer-section', footerSection)


import loginPage from '../components/login-page/index.js'
app.component('login-page', loginPage)


import userProfilePage from '../components/user-profile-page/index.js'
app.component('user-profile-page', userProfilePage)

import userActivitiesPage from '../components/user-activities-page/index.js'
app.component('user-activities-page', userActivitiesPage)

import userReceiptsPage from '../components/user-receipts-page/index.js'
app.component('user-receipts-page', userReceiptsPage)

import userNotificationsPage from '../components/user-notifications-page/index.js'
app.component('user-notifications-page', userNotificationsPage)

import userBookinPage from '../components/user-bookin-page/index.js'
app.component('user-bookin-page', userBookinPage)

import userGymServicesPage from '../components/user-gym-services-page/index.js'
app.component('user-gym-services-page', userGymServicesPage)

app.mount('#app')

