import utilities from "../../js/utilities.js"
import store from "../../js/store.js"
export default {
    template: await utilities.getPage('components/user-bookin-page/index.html'),
    data() {
        return {
            store,
            utilities,
            spinner: false,
            selectedDuration: '30',
            selectedHour: { 'hour': '', 'format': '' },
            selectedMin: '00',
            // openTime: '',
            closeTime: ''



            // bookInStartTime: '',
            // bookInEndTime: 30,
            // serviceAvailability: '',
            // serviceRange: '',
            // serviceDuration: '',
            // serviceCost: '',
            // activeService:{},
            // avTimeRange:'',
            // avDayName:''

        }
    },
    computed: {

        getStartingMinuts() {
            var arr = []
            var start = 0

            if (this.store.bookInDate.name && this.store.selectedService.availability) {

                if (this.store.bookInDate.day == new Date().getDate()) { start = new Date().getMinutes() }

                for (let i = start; i < 60; i++) {
                    arr.push(`${i}`)

                }

            }
            return arr
        },

        bookInPayload() {

            var user = this.store.userProfile.personalInfo

            return {
                "email": user.email,
                "serviceId": this.store.selectedService.id,
                "serviceName": this.store.selectedService.title,
                "name": `${user.firstName} ${user.lastName}`,
                "number": user.number,
                "startTime": `${this.store.bookInDate.fullDate} ${this.selectedHour.hour}:${this.selectedMin} ${this.selectedHour.format}`,
                "endTime": `${this.store.bookInDate.fullDate} ${this.utilities.calculateEndingTime(
                    utilities.convertTo24(`${this.selectedHour.hour}:${this.selectedMin}`, `${this.selectedHour.format}`),
                    this.selectedDuration,
                    this.closeTime
                )}`
            }
        },

    },
    methods: {
        validation() {
            if (this.bookInPayload.serviceName != '' && this.bookInPayload.startTime != '' && this.bookInPayload.endTime != '') {
                if (this.vCost()) {
                    if (this.vRange()) {
                        if (this.vDuration()) {
                            if (this.vAvailability()) {
                                return {
                                    status: true,
                                    message: ''
                                }
                            } else return {
                                status: false,
                                message: `Invalid Date: This service is not available in that date, please check our services availability Times`
                            }

                        } else return {
                            status: false,
                            message: `Invalid Duration: The duration must be between ${this.store.selectedService.durations} minutes`
                        }
                    } else return {
                        status: false,
                        exception: true,
                        message: `Invalid Range: The Range must be before ${this.store.selectedService.maxBookingRange} days`
                    }
                } else return {
                    status: false,
                    message: `You dont have enough credits`
                }
            }

            return {
                status: false,
                exception: true,
                message: `Invalid Input`
            }
        },
        vAvailability() {
            return utilities.checkAvailability(this.store.selectedService.availability, this.bookInPayload.startTime, this.bookInPayload.endTime)
        },
        vDuration() {
            // console.log(this.selectedService.durations);
            // console.log(this.bookInPayload.startTime);
            return utilities.checkDuration(this.store.selectedService.durations, this.bookInPayload.startTime, this.bookInPayload.endTime)
        },
        vRange() {
            return utilities.checkMaxBookingRange(this.bookInPayload.startTime, this.bookInPayload.endTime, this.store.selectedService.maxBookingRange)
        },
        vCost() {
            // return parseFloat(this.store.userProfile.wallet) >= parseFloat(this.store.selectedService.cost)
            // MONTHLY PACK EXCEPTION
            // check if user is subscribed
            // if yes check if it is not expired
            // if yes this means there is no problem he is sub and not exp then return true
            // else if if is sub and expired check if there is enough credits to recharge if yes return true else return false message
            // else if he is not subscribed check if he have enough credits to charge if yes return true else return false message

            // if the selected service is monthly pack
            // console.log(this.store.selectedService.title.includes('MONTH'));
            if (this.store.selectedService.title.includes('MONTH')) {

                // if monthlyPackExpiration is not null
                if (this.store.monthlyPackExpiration != '') {
                    // means there is a subscribtion
                    // check if it is expired ( date is before now )
                    var res = utilities.compareDates(new Date(), new Date(this.store.monthlyPackExpiration))
                    // console.log(res);
                    if (res == 'BEFORE') {
                        // means subscribtion is expired
                        // check if there is enough credits to recharge
                        // return parseFloat(this.store.userProfile.wallet) >= parseFloat(this.store.selectedService.cost)
                        return true
                    }
                }

                return parseFloat(this.store.userProfile.wallet) >= parseFloat(this.store.selectedService.cost)

            } else return parseFloat(this.store.userProfile.wallet) >= parseFloat(this.store.selectedService.cost)
        },
        getCalendarDays() {
            var arr1 = utilities.getCalendarDays(this.store.selectedService.maxBookingRange)
            var arr2 = []

            for (let i = 0; i < arr1.length; i++) {
                if (this.store.selectedService.availability.includes(arr1[i].name)) {
                    arr2.push(arr1[i])
                }

                // this.selectedService.availability.split(',').forEach(av => {
                //     if()
                // })
            }
            return arr2

            // return arr1
        },
        getStartingHours() {

            if (this.store.bookInDate.name && this.store.selectedService.availability) {

                var openCloseRange = this.utilities.getOpeningHours(this.store.bookInDate.name, this.store.selectedService.availability)

                // this.openTime = openCloseRange.open
                this.closeTime = openCloseRange.close
                if (this.store.bookInDate.day == new Date().getDate()) {
                    // means it is today
                    // openCloseRange.open = new Date().getHours()
                    // console.log('today at = ' + new Date().getHours());

                    return this.utilities.getIn12Hours(`${new Date().getHours()}-${openCloseRange.close}`)
                }


                // console.log(`${this.openTime}-${this.closeTime}`);
                // console.log(utilities.compareDates(new Date(),new Date(this.store.bookInDate.fullDate)));

                return this.utilities.getIn12Hours(openCloseRange.range)
            }
            return false
        },


        selectService() {
            this.store.userProfile.gymServices.forEach(node => {

                if (node.title == this.store.bookInForm.serviceName) {
                    // this.store.bookInForm.serviceId = node.id
                    // this.serviceAvailability = node.availability
                    // this.serviceRange = node.maxBookingRange
                    // this.serviceDuration = node.durations
                    // this.serviceCost = node.cost
                    // console.log(node.title);
                    this.store.selectedService = node
                    this.store.bookInDate = ''
                }
            });
        },
        bookIn() {
            var clock = new Date()

            if (this.store.bookInDate.day == clock.getDate()) {
                // today
                // if the selected min or hours are delayed then set to the current time
                if (utilities.hoursIn24Only(this.selectedHour.hour, this.selectedHour.format) < clock.getHours() && parseFloat(this.selectedMin) < clock.getMinutes()) {
                    this.selectedMin = clock.getMinutes()
                    this.selectedHour.hour = clock.getHours()
                }

            }

            if (confirm('Are you sure?')) {
                this.spinner = true
                // var user = this.store.userProfile.personalInfo

                // this.store.bookInForm.name = `${user.firstName} ${user.lastName}`
                // this.store.bookInForm.email = user.email
                // this.store.bookInForm.number = user.number

                // this.store.bookInForm.startTime = `${this.bookInDate} ${this.bookInStartTime}`
                // this.store.bookInForm.endTime = `${this.bookInDate} ${this.bookInEndTime}`

                fetch(this.store.getUserApi() + '?bookIn=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        user: this.store.user,
                        bookIn: this.bookInPayload
                    })
                })
                    .then(res => res.json())
                    .then(res => {

                        // console.log(res);
                        if (res == true) {
                            this.refresh()
                            alert('Meshe l7al')
                        } else {
                            alert(res)
                        }

                        this.spinner = false

                    })
                    .catch(err => {
                        // console.log(err);
                        this.spinner = false
                        alert('Network Error')
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