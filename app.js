const dateOfBirth = document.querySelector('#date-of-birth');
const checkBtn = document.querySelector('.check-btn');
const outputMessage = document.querySelector('#output-message');

checkBtn.addEventListener('click', clickHandler);

function checkPalindrome(str) {
    let reverse = reverseString(str);
    return str === reverse;
}

function reverseString(str) {
    let characters = str.split('');
    let reverseCharacters = characters.reverse();
    let reversedStr = reverseCharacters.join('');

    // one-liner
    // return str.split('').reverse().join('');

    return reversedStr;
}

function convertDateToStr(date) {
    let dateObj = {day: '', month:'', year:''};

    if (date.day < 10) {
        dateObj.day = '0' + date.day;
    } else { dateObj.day = date.day.toString() }

    if (date.month < 10) {
        dateObj.month = '0' + date.month;
    } else { dateObj.month = date.month.toString() }

    dateObj.year = date.year.toString();

    return dateObj;
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let datesList = getAllDateFormats(date);
    let isPalindrome = false;

    for(let i=0; i<datesList.length; i++) {
        if (checkPalindrome(datesList[i])) {
            isPalindrome = true;
            break;
        }
    }

    return isPalindrome;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day >daysInMonth[month-1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getNextPalindromeDate(date) {
    let ctr = 0;
    let nextDate = getNextDate(date);

    while(1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function clickHandler() {
    let dob = dateOfBirth.value;

    if (dob) {
        let dateList = dob.split('-');

        let date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }
    
        let checkIsPalindrome = checkPalindromeForAllDateFormats(date);
    
        if (checkIsPalindrome) {
            outputMessage.innerHTML = `Yay! your birthday is a Palindrome 🤘`
        } else {
            let [ctr, nextDate] = getNextPalindromeDate(date);
            outputMessage.innerHTML = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days.`
        }
    }
}


const asd = {day: 12, month:7, year:1998}