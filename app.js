// lessons link constants
const TALMUD = "https://zoom.us/j/97056859552?pwd=RlZqczJueW9rR0JBL0JVUDBIRWNyZz09";
const MATH = "https://edu-il.zoom.us/j/93712910482?pwd=ZkhYbWREdUgwWkJWbjBnejMxczJ2QT09";
const ENGLISH = "https://us04web.zoom.us/j/79223538000?pwd=NkQ5dlJzUmtoYTEwWlBBRjhhLzhpUT09";
const SCIENCE = "science.html"
const MEGAMOT = "megamot.html";
const CIVICS = "https://edu-il.zoom.us/j/89413744064";
const MAHSHEVET = "https://edu-il.zoom.us/j/88530634829?pwd=aXB4VjRQZm1oQ2RUbGZubnNBaGwrUT09";
const BIBLE = "https://us02web.zoom.us/j/88322882133?pwd=b2lQbEY5U1ZpU3U2SDl4SEcvTm1MZz09";
const SPORT = "https://us02web.zoom.us/j/81883294499?pwd=OU9RVWtQYU9LRVNVckZ3VjZ6K29mdz09";
const NONE = "";

// creating the lessons schedule in a 2D array
var week = [
    [], [], [], [], []
];

// fill the array
week[0][0] = TALMUD;
week[0][1] = MEGAMOT;
week[0][2] = SCIENCE;
week[0][3] = NONE
week[0][4] = TALMUD
week[0][5] = MATH
week[1][0] = TALMUD
week[1][1] = CIVICS
week[1][2] = TALMUD
week[1][3] = NONE
week[1][4] = ENGLISH
week[1][5] = NONE
week[2][0] = SCIENCE
week[2][1] = SCIENCE
week[2][2] = CIVICS
week[2][3] = NONE
week[2][4] = MATH
week[2][5] = TALMUD
week[3][0] = MAHSHEVET
week[3][1] = ENGLISH
week[3][2] = SPORT
week[3][3] = NONE
week[3][4] = MEGAMOT
week[3][5] = BIBLE
week[4][0] = TALMUD
week[4][1] = CIVICS
week[4][2] = MATH
week[4][3] = NONE
week[4][4] = NONE
week[4][5] = NONE

// open the zoom of the lesson when page is loaded
window.onload(openLesson());

/**
 * this function openes the lesson with the produced zoom link, and only if timezone is israel
 */
function openLesson() {
    if(new Date().getTimezoneOffset() == -120) {
        var zoomLink = produceZoomLink();
        if(zoomLink != "") {
            var meta = document.createElement('meta');
            meta.httpEquiv = "refresh";
            meta.content = "5; " + zoomLink;
            document.getElementsByTagName('head')[0].appendChild(meta); 
        } else {
            document.getElementById('mainTitle').innerHTML = "אין שיעור כעת או שהקישור אינו מוזן";
            document.getElementById('description').hidden = true;
        }
    } else {
        document.getElementById('mainTitle').innerHTML = "שגיאת זמן (איזור זמן\שעון לא תקין)";
        document.getElementById('description').hidden = true;
    }
}

/**
 * this function produces the correct zoom link according to the current time (pc time).
 * it checks the day of the week and the number of the current lesson according to the time, and
 * returns the link in this position in the 2D array.
 * @returns {String} Zoom Link
 */
function produceZoomLink() {
    var date = new Date();
    var hour = getLessonHour();
    var day = date.getDay();
    if(hour != -1) {
        return week[day][hour];
    }
    return "";
}

/**
 * this function returns the lesson number according to the current hour
 * @returns {int} number from 0-5
 */
function getLessonHour() {

    /**
     * Ranges:
     * 8:45-10:24 -> 0
     * 10:25-11:59 -> 1
     * 12:00-13:29 -> 2
     * 13:30-14:09 -> 3
     * 14:10-15:39 -> 4
     * 15:40-17:00 -> 5
     */

    var date = new Date();

    if(date >= dateObj('08:45') && date <= dateObj('10:24')) {
        return 0;
    }

    else if(date >= dateObj('10:25') && date <= dateObj('11:59')) {
        return 1;
    }

    else if(date >= dateObj('12:00') && date <= dateObj('13:29')) {
        return 2;
    }

    else if(date >= dateObj('13:30') && date <= dateObj('14:09')) {
        return 3;
    }

    else if(date >= dateObj('14:10') && date <= dateObj('15:39')) {
        return 4;
    }

    else if(date >= dateObj('15:40') && date <= dateObj('17:00')) {
        return 5;
    }

    else {
        return -1;
    }
}

/**
 * 
 * @param {String} d : a String from the shape HH:MM (hours:minutes), the function produces a date object containing this time.
 * @returns {Date} date object containing the requested hour
 */
function dateObj(d) {
    var parts = d.split(":")
    var date = new Date();
    date.setHours(parts[0]);
    date.setMinutes(parts[1]);
    return date;
}