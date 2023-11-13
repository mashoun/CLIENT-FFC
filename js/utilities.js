
function getPage(path) {
    var origin = new URL(location.href).origin
    return new Promise((resolve, reject) => {
        // console.log(origin);
        fetch(`${origin}/${path}`).then(res => res.text()).then(res => {
            resolve(res)
        })
            .catch(err => {
                // console.log(err);
                reject(err)
            })
    })
}

function shareBlog(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        })
            // .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
    } else {
        // console.log('Web Share API not supported');
    }
}


function getYouTubeId(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/\?v=)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


function openFiles() {
    return new Promise((res, rej) => {
        try {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
            input.setAttribute('multiple', true);
            // document.appendChild(input)
            // console.log(input);
            input.click();
            input.addEventListener('change', e => {
                // console.log(e.target.files);
                res(e.target.files)
            })
        } catch (err) {
            // console.log(err);
            rej(500)
        }
    })
}


function optimizeImageQuality(imageDataURI, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // const quality = 0.7; 
            const optimizedImageDataURI = canvas.toDataURL('image/jpeg', quality);
            resolve(optimizedImageDataURI);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = imageDataURI;
    });
}



function file64(path) {
    return new Promise((yes, no) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(path)
            reader.onload = () => {
                yes(reader.result)
            }
        } catch (err) {
            no(err)
        }
    })
}


function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function enhanceDate(dateString) {

    if (dateString == '') return dateString
    const inputDate = new Date(dateString);

    if (isNaN(inputDate)) {
        return "Invalid date";
    }

    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    const enhancedDate = inputDate.toLocaleDateString(undefined, dateOptions);
    const enhancedTime = inputDate.toLocaleTimeString(undefined, timeOptions);

    return `${enhancedDate} - ${enhancedTime}`;
}




// Date utilities
function daysBetweenDates(fromDate, tillDate) {
    const fromTimestamp = new Date(fromDate).getTime();
    const tillTimestamp = new Date(tillDate).getTime();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dateDifference = Math.abs(tillTimestamp - fromTimestamp);

    const numDays = Math.floor(dateDifference / millisecondsPerDay);

    return numDays;
}

function minutesBetweenDates(fromDate, tillDate) {
    const fromTimestamp = new Date(fromDate).getTime();
    const tillTimestamp = new Date(tillDate).getTime();

    const millisecondsPerMinute = 1000 * 60;
    const dateDifference = Math.abs(tillTimestamp - fromTimestamp);

    const numMinutes = Math.floor(dateDifference / millisecondsPerMinute);

    return numMinutes;
}

function compareDates(a, b) {
    // it returns AFTER iza b after a
    if (a.getTime() == b.getTime()) {
        return true;
    } else if (b.getTime() > a.getTime()) {
        return "AFTER";
    } else {
        return "BEFORE";
    }
}


function compareOnlyDates(dateA, dateB, extraMinB = false) {
    const parsedDateA = new Date(dateA);
    const parsedDateB = new Date(dateB);

    // Set the time components to zero for both dates

    // parsedDateA.setHours(0, 0, 0, 0);
    // parsedDateB.setHours(0, 0, 0, 0);

    // add extra min

    if (extraMinB) {
        // parsedDateB.setHours(0, parsedDateB.getMinutes() + extraMinB, 0, 0);
        parsedDateB.setMinutes(parsedDateB.getMinutes() + extraMinB)
        // Logger.log(parsedDateB)
    }

    if (parsedDateB >= parsedDateA) {
        return "AFTER";
    } else if (parsedDateB < parsedDateA) {
        return "BEFORE";
    }
}

function compareTime(timeRangeA, timeRangeB) {
    const [startA, endA] = timeRangeA.split('-').map(time => new Date(`2023-01-01 ${time}`));
    const [startB, endB] = timeRangeB.split('-').map(time => new Date(`2023-01-01 ${time}`));

    return startB >= startA && endB <= endA;
}

function isDurationInside(a, b) {
    // returns true iza b inside a
    return a.start <= b.start && a.end >= b.end;
}

function getDayName(date) {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}
function getDayName2(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
}

function parseAvailability(availabilityString) {
    // console.log(availabilityString);
    // console.log(typeof (availabilityString));
    var arr = []
    var days = availabilityString.split(',')
    days.forEach(day => {

        day = day.trim()
        var timeRanges = day.split('-')
        arr.push({
            dayName: timeRanges[0],
            startTime: timeRanges[1],
            endTime: timeRanges[2]
        })
    })
    // console.log(arr);
    return arr
}

function settedTime(hours, minutes) {
    const today = new Date(); // Get the current date and time
    today.setHours(hours);     // Set the hours
    today.setMinutes(minutes); // Set the minutes
    today.setSeconds(0);       // Optional: Set seconds to 0
    today.setMilliseconds(0);  // Optional: Set milliseconds to 0
    return today;
}

function settedDateTime(dateString, hours, minutes) {
    const originalDate = new Date(dateString);

    if (isNaN(originalDate)) {
        throw new Error("Invalid date string");
    }

    const newDate = new Date(originalDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    return newDate;
}

function get30Days() {
    var currentDate = new Date();

    // Calculate the date after 30 days
    currentDate.setDate(currentDate.getDate() + 30);

    return currentDate;
}



function checkAvailability(avTimeRange, startTime, endTime) {
    // check iza the service is available in that day
    // then check iza true if it is available during that time range

    avTimeRange = parseAvailability(avTimeRange)

    for (let avt of avTimeRange) {
        // console.log(avt);
        if (getDayName(new Date(startTime)) == avt.dayName && getDayName(new Date(endTime)) == avt.dayName) {
            // on the same day
            // Logger.log(avt.dayName)
            var serviceTimeRange = `${avt.startTime}-${avt.endTime}`
            var clientTimeRange = `${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}-${new Date(endTime).getHours()}:${new Date(endTime).getMinutes()}`

            // Logger.log(serviceTimeRange)
            // Logger.log(clientTimeRange)

            var res = compareTime(serviceTimeRange, clientTimeRange)
            // Logger.log(res)
            if (res) return true
        }
    }

    return false


}

function checkMaxBookingRange(startTime, endTime, maxBookingRange) {
    // iza nmb of days between now and the start date is more than 3 days
    // check iza el date adeem
    var now = new Date()
    if (compareOnlyDates(startTime, endTime, 1) == "AFTER" && compareOnlyDates(now, startTime, 1) == "AFTER" && compareOnlyDates(now, endTime, 1) == "AFTER") {
        // compare days
        if (daysBetweenDates(now, startTime) <= maxBookingRange) return true
    }


    return false

}

function generateTimeArray(startTime, endTime) {
    const result = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
        const formattedHour = currentHour.toString().padStart(2, '0');
        const formattedMinute = currentMinute.toString().padStart(2, '0');
        result.push(`${formattedHour}:${formattedMinute}`);

        currentMinute += 30;
        if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
        }
    }

    return result;
}

function checkDuration(serviceDuration, startTime, endTime) {
    // console.log(`Service Duration = ${serviceDuration}`);
    // console.log(`Type Service Duration = ${typeof(serviceDuration)}`);

    // if the client duration is inluded in the service duration then true
    var clientDuration = minutesBetweenDates(startTime, endTime)

    // Logger.log(clientDuration)

    // if (serviceDuration.includes(clientDuration)) return true
    // if(ifArrayIncludes(serviceDuration.split(','),clientDuration)) return true

    var min = serviceDuration.split('-')[0]
    var max = serviceDuration.split('-')[serviceDuration.split('-').length - 1]

    return clientDuration >= min && clientDuration <= max

}

function getCalendarDays(range = 2) {
    if (typeof range !== 'string' || isNaN(parseInt(range)) || parseInt(range) < 1) {
        return "";
    }

    const today = new Date();
    const days = [];

    for (let i = 0; i <= parseInt(range); i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const dayOfMonth = currentDate.getDate();
        const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
        const monthIndex = currentDate.getMonth() + 1; // Adding 1 to convert it to 1-based index
        const year = currentDate.getFullYear();
        const fullDate = currentDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format

        days.push({
            day: dayOfMonth.toString(),
            name: dayOfWeek,
            month: monthName,
            monthIndex: monthIndex.toString(),
            year: year.toString(),
            fullDate: fullDate,
        });
    }

    return days;
}

function getIn12Hours(timeRange) {
    // const [startHour, endHour] = timeRange.split('-').map(time => parseInt(time, 10));

    // if (isNaN(startHour) || isNaN(endHour) || startHour > endHour || startHour < 0 || endHour < 0 || startHour > 24 || endHour > 24) {
    //     return [];
    // }

    // const hours = [];
    // for (let hour = startHour; hour < endHour - 1; hour++) {
    //     let formattedHour = hour;

    //     if (hour >= 12) {
    //         if (hour > 12) {
    //             formattedHour = hour - 12;
    //         }
    //     }

    //     hours.push(formattedHour.toString());
    // }

    // return hours;
    // console.log('time Range = ' + timeRange);
    const [startHour, endHour] = timeRange.split('-').map(time => parseInt(time, 10));

    if (isNaN(startHour) || isNaN(endHour) || startHour > endHour || startHour < 0 || endHour < 0 || startHour > 24 || endHour > 24) {
        return [];
    }

    const hours = [];
    for (let hour = startHour; hour < endHour - 1; hour++) {
        let formattedHour = hour;
        let format = 'AM';

        if (hour >= 12) {
            if (hour > 12) {
                formattedHour = hour - 12;
            }
            format = 'PM';
        }

        hours.push({ hour: formattedHour.toString(), format });
    }

    return hours;
}

function getOpeningHours(dayName, schedule) {
    // console.log(dayName);
    // console.log(schedule);
    schedule = schedule.split(',')
    const daySchedule = schedule.find(entry => entry.startsWith(dayName));

    if (daySchedule) {
        const [day, opening, closing] = daySchedule.split('-');
        return {
            open: opening,
            close: closing,
            range: `${opening}-${closing}`
        };
    }
}

function calculateEndingTime(startTime, duration, maxTime) {
    // Parse the input time strings into hours and minutes
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [maxHours, maxMinutes] = maxTime.split(":").map(Number);

    // Calculate the total minutes for the starting time and duration
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = totalStartMinutes + parseInt(duration);

    // If the ending time is beyond the maximum time, set it to the maximum
    const maxTotalMinutes = maxHours * 60 + maxMinutes;
    if (totalEndMinutes > maxTotalMinutes) {
        return `${String(maxHours).padStart(2, '0')}:${String(maxMinutes).padStart(2, '0')}`;
    }

    // Calculate the ending time hours and minutes
    const endHours = Math.floor(totalEndMinutes / 60);
    const endMinutes = totalEndMinutes % 60;

    // Format the ending time as HH:MM
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

function convertTo24(time, format) {
    // Split the input time string into hours and minutes
    const [hrs, min] = time.split(':').map(Number);

    // Ensure the input format is either "AM" or "PM"
    if (format !== 'AM' && format !== 'PM') {
        return 'Invalid format';
    }

    // Convert to 24-hour format
    if (format === 'AM') {
        if (hrs === 12) {
            // Special case: 12:xx AM should be converted to 00:xx
            return `00:${min.toString().padStart(2, '0')}`;
        } else {
            return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        }
    } else {
        if (hrs === 12) {
            // Special case: 12:xx PM remains the same
            return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        } else {
            // Convert other PM times to 24-hour format by adding 12 to the hours
            return `${(hrs + 12).toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        }
    }
}

function hoursIn24Only(hour, format) {
    // Ensure 'hour' is a valid number between 1 and 12, and 'format' is either 'AM' or 'PM'
    if (typeof hour !== 'number' || hour < 1 || hour > 12 || (format !== 'AM' && format !== 'PM')) {
        return -1; // Invalid input
    }

    if (format === 'AM' && hour === 12) {
        // Special case for 12:00 AM (midnight)
        return 0;
    } else if (format === 'PM' && hour !== 12) {
        // Add 12 hours to convert from PM to 24-hour format
        hour += 12;
    }

    return hour;
}

function isTodayGetHour(dateStr) {
    // Parse the input date string to create a Date object
    const inputDate = new Date(dateStr);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date represents today's date
    if (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    ) return true

    /**
     * {
        // Get the current hour and format it as "HH:00"
        const currentHour = currentDate.getHours();
        const formattedCurrentHour = currentHour < 10 ? `0${currentHour}` : currentHour;
        return `${formattedCurrentHour}:00`;
    }
     */

    return false; // Return null if the input date is not today
}


export default {
    hoursIn24Only,
    isTodayGetHour,
    convertTo24,
    calculateEndingTime,
    getOpeningHours,
    getIn12Hours,
    generateTimeArray,
    getCalendarDays,
    getPage,
    shareBlog,
    getYouTubeId,
    openFiles,
    file64,
    optimizeImageQuality,
    getCurrentDate,
    enhanceDate,
    daysBetweenDates,
    get30Days,
    settedDateTime,
    settedTime,
    parseAvailability,
    getDayName,
    isDurationInside,
    compareDates,
    compareTime,
    compareOnlyDates,
    minutesBetweenDates,
    checkAvailability,
    checkDuration,
    checkMaxBookingRange,
    getDayName2
}