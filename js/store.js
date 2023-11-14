export default {
    activeTab: 'user-profile-page',
    showActiveTab: false,
    loading: true,

    signup: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        idnFront: [
            {
                alt: '',
                src64: ''
            }
        ],
        idnBack: [
            {
                alt: '',
                src64: ''
            }
        ]
    },

    selectedService: {
        "id": "",
        "title": "",
        "capacity": "",
        "durations": "",
        "availability": "",
        "maxBookingRange": "",
        "cost": "",
        "index": ""
    },

    bookInDate: "",
    bookInTime: '',


    user: {
        email: '',
        password: ''
    },
    isLogedIn: false,

    userProfile: {
        "personalInfo": {
            "firstName": "",
            "lastName": "",
            "email": "",
            "number": "",
            "idnFront": "",
            "idnBack": "",
        },
        "wallet": "0",
        "monthlyPackExpiration": "",
        "enrolledActivities": [
            {
                "id": "",
                "timestamp": "",
                "startDate": "",
                "endDate": "",
                "serviceId": "",
                "serviceName": "",
                "index": "",
            },
        ],
        "receipts": [
            {
                "id": "",
                "timestamp": "",
                "type": "",
                "amount": "",
                "note": "",
                "index": "",
            },
        ],
        "notifications": [
            {
                "id": "",
                "timestamp": "",
                "note": "",
                "index": "",
            }
        ],
        "gymServices": [
            {
                "id": "",
                "title": "",
                "capacity": "",
                "durations": "",
                "availability": "",
                "maxBookingRange": "",
                "cost": "",
                "index": "",
            }
        ]
    },
    reBookIn: {
        shift: '10'
    },

    bookInForm: {
        "email": "",
        "serviceId": "",
        "serviceName": "",
        "name": "",
        "number": "",
        "startTime": "",
        "endTime": ""
    },

    public: {
        "contact": {
            "email": "",
            "number": "",
            "waNumber": "",
            "facebook": "",
            "instagram": "",
            "linkedIn": ""
        },
        "about": {
            "heading": "",
            "bio": "",
            "about1": "",
            "about2": "",
            "about3": "",
            "about4": ""
        },
        "services": [
            {
                "id": "1",
                "title": "service 1",
                "description": "service description 1",
                "index": 1
            },
        ],
        "stories": [
            {
                "id": "5",
                "thumbnail": "https://picsum.photos/504",
                "index": 1
            },
        ],
        "rules": [
            {
                "id": "639948565664",
                "rule": "no smoking",
                "index": 1
            }
        ],
        "whyChooseUs": [
            {
                "id": "1",
                "note": "location",
                "index": 1
            },
        ],
        "faq": [
            {
                "id": "1",
                "question": "question 1",
                "answer": "answer 1",
                "index": 1
            },
        ]
    },



    getUserApi() {
        return 'https://script.google.com/macros/s/AKfycbwbckyC-A15q4etW1J1NoGhCx7Aa2gSRgtxDfUVbDsb5ANiVOfjA0g4fgBmf6WuXN3e/exec'
    },
    getPublicApi() {
        return 'https://script.google.com/macros/s/AKfycbyVk0TY1GlOwa9omJ6x3c3mqtw0Me1nGL5enxWoN9T5TIVT2hU1ELG410Aiz9FlE3YZ/exec'
    },


    closeTab() {
        this.activeTab = ''
        this.showActiveTab = false
    }
}