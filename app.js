const dateOfBirth = document.querySelector('#date-of-birth');
const checkBtn = document.querySelector('.check-btn');
const outputMessage = document.querySelector('#output-message');
const gif = document.querySelector('.gif');

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

outputMessage.style.display = 'none';
gif.style.display = 'none';

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
        if (day > daysInMonth[month-1]) {
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

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (month === 1 && day < 1) {
            day = 31;
            month = 12;
            year--;
        }
        if (month > 1 && day < 1) {
            day = daysInMonth[month - 2];
            month--;
        }
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

function getPreviousPalindromeDate(date) {
    let ctr = 0;
    let previousDate = getPreviousDate(date);

    while(1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];
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
        
        outputMessage.style.display = 'block';
        outputMessage.innerText = 'Calculating';
        gif.src = './Images/calculating.gif';
        gif.alt = 'A kid calculating meme';
        gif.style.display = 'block';

        setTimeout (() => {
            if (checkIsPalindrome) {
                outputMessage.innerHTML = `Yay! your birthday is a <span>Palindrome</span> 🤘`;
                gif.src = './Images/palindrome.gif';
                gif.alt = 'Andy from "The Office" says "I Knew It!"';
            } else {
                let [ctr1, nextDate] = getNextPalindromeDate(date);
                let [ctr2, previousDate] = getPreviousPalindromeDate(date);
                outputMessage.innerHTML = `No! your birthday is <span>Not</span> a Palindrome.<br>The Next Palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span>, you missed by <span>${ctr1}</span> days.<br>
                The Previous Palindrome date was <span>${previousDate.day}-${previousDate.month}-${previousDate.year}</span>, you missed by <span>${ctr2}</span> days.`;
                gif.src = './Images/not-palindrome.webp';
                gif.alt = 'Jim from "The Office" mouthing "So close"';
            }
        }, 2500);
    } else {
        outputMessage.style.display = 'block';
        outputMessage.innerHTML = `Select Date.`;
    }
}