/**
 * Created by John Aggelogiannis on 21/04/16.
 */

window.onload = function () {

    /**
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     * 1. Given a pattern and a string, find if the string follows the same pattern.  |
     *    Eg: Pattern : [a, b, b, a], String : "cat dog dog cat"                      |
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     */

    /*
     * -Time Complexity : O(n) , where n is the total number of characters in the pattern.
     */

    function isFollowingPattern(pattern, str) {
        // If any of the input is missing then return false with an error in console.
        if (!pattern || !str) {
            console.error('invalid argument in isFollowingPattern!');
            return false;
        }

        // Convert str which contains multiple words into an array of string.
        var words = str.split(' ');
        var patternLen = pattern.length;

        // Check length of both of the pattern and words length.
        // If they are not equal length return false.
        if (words.length !== patternLen) {
            return false;
        }

        // Create a character hashMap which uses characters from pattern as keys and map it with words.
        var hashMap = {};

        for (var i = 0; i < patternLen; i++) {

            // If the patterns character doesn't exist in the hashMap,
            // then add it to the hasp map and map it with the word's value.
            // If it exists then compare it with the word's value.
            if (!hashMap[pattern[i]]) {
                hashMap[pattern[i]] = words[i];
            }
            else if (hashMap[pattern[i]] !== words[i]) {
                return false;
            }
        }

        return true;
    }

    console.log('\n---------------- 1. isFollowingPattern(pattern, string) ----------------\n\n');
    console.log('isFollowingPattern([\'a\', \'b\', \'b\', \'a\'], \'cat dog dog cat\') : ' +
        isFollowingPattern(['a', 'b', 'b', 'a'], 'cat dog dog cat'));                                         // true
    console.log('isFollowingPattern([\'a\', \'b\', \'b\', \'a\'], \'cat dog dog cat cat\') : ' +
        isFollowingPattern(['a', 'b', 'b', 'a'], 'cat dog dog cat cat'));                                     // false
    console.log('isFollowingPattern([\'a\', \'b\', \'b\', \'a\', \'a\'], \'cat dog dog cat\') : ' +
        isFollowingPattern(['a', 'b', 'b', 'a', 'a'], 'cat dog dog cat'));                                    // false
    console.log('isFollowingPattern([\'a\', \'b\', \'b\', \'a\'], \'cat cat dog cat\') : ' +
        isFollowingPattern(['a', 'b', 'b', 'a'], 'cat cat dog cat'));                                         // false
    console.log('isFollowingPattern([\'a\', \'b\', \'c\', \'a\'], \'cat dog dog cat\') : ' +
        isFollowingPattern(['a', 'b', 'c', 'a'], 'cat dog dog cat'));                                         // true
    console.log('isFollowingPattern([\'a\', \'b\', \'c\', \'a\', \'c\'], \'cat dog rabbit cat rabbit\') : ' +
        isFollowingPattern(['a', 'b', 'c', 'a', 'c'], 'cat dog rabbit cat rabbit'));                          // true
    console.log('\n-----------------------------------------------------------------------\n');

    /**
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     * 2. Given a number N return whether N is a perfect number or not.                                     |
     *    Explain the time and memory complexity of your implementation.                                    |
     *    (A perfect number is a positive integer that is equal to the sum of its proper positive divisors  |
     *    excluding the number itself)                                                                      |
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     */

    /*
     * -Time Complexity : O(n) , where n is the decimal representation of number.
     *
     * -Memory Complexity : O(1)
     */

    function isPerfectNumber(number) {
        // If the input isn't a number return false with an error in console.
        if (typeof(number) !== 'number') {
            console.error('invalid argument in isPerfectNumber!');
            return false;
        }

        // Here we keep the sum of the positive divisors of number
        var temp = 0;

        for (var i = 1; i <= number / 2; i++) {
            // for every positive divisor we add it to the temp.
            if (number % i === 0) {
                temp += i;
            }
        }

        // If the sum is equal with the input number and it's not 0 then we have a perfect number.
        return (temp === number && temp !== 0)
    }

    console.log('\n-------------------- 2. isPerfectNumber(number) --------------------\n\n');
    console.log('isPerfectNumber(28) : ' + isPerfectNumber(28));            // true
    console.log('isPerfectNumber(0) : ' + isPerfectNumber(0));              // false
    console.log('isPerfectNumber(1) : ' + isPerfectNumber(1));              // false
    console.log('isPerfectNumber(6) : ' + isPerfectNumber(6));              // true
    console.log('isPerfectNumber(-31) : ' + isPerfectNumber(-31));          // false
    console.log('isPerfectNumber(100) : ' + isPerfectNumber(100));          // false
    console.log('\n-----------------------------------------------------------------------\n');

    /**
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     * 3. You have a number of meetings (with their start and end times).                             |
     *    You need to schedule them using the minimum number of rooms.                                |
     *    Return the list of meetings in every room as well as their starting and ending timestamps.  |
     * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
     */

    /*
     * -Time Complexity : O(nlogn) , where n is the total number of meetings.
     */

    function meetingsScheduler(meetings) {
        // we start with no rooms.
        var rooms = [];

        // If we have an invalid input we return an empty array with an error in console.
        if (!meetings) {
            console.error('invalid argument in meetingsScheduler!');
            return rooms;
        }

        // If we only have max 1 meeting then we return 1 or 0 rooms.
        if (meetings && meetings.length < 2) {
            return meetings[0] ? rooms.push(meetings[0]) : rooms;
        }

        // We sort the meetings by start time and we store them in a priority queue.
        var sortedMeetings = meetings.sort(function (a, b) {
            var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
            return dateA - dateB;
        });

        // create the first room and assign it the first meeting.
        rooms.push(sortedMeetings.splice(0, 1));

        // while they're are meetings in the queue, iterate.
        while (sortedMeetings.length) {
            var found = false;
            // Iterate though all rooms to find any unoccupied.
            for (var i = 0; i < rooms.length; i++) {
                var roomLastIndex = rooms[i].length - 1;

                // If meeting's start date is greater or equal than the end date of the last meeting in the room,
                // pop the meeting from the queue and push it to the suitable room.
                if (sortedMeetings[0].startDate >= rooms[i][roomLastIndex].endDate) {
                    rooms[i].push(sortedMeetings.splice(0, 1)[0]);
                    found = true;
                    break;
                }
            }
            // If we haven't found any unoccupied rooms , then create a room and pop the meeting from queue
            // and push it to the room.
            if (!found) {
                rooms.push(sortedMeetings.splice(0, 1));
            }
        }

        // finally return the list of meetings in every room.
        return rooms;
    }

    // A mock structure of meetings
    var meetings = [
        {
            startDate: '2016-04-21T13:00',
            endDate: '2016-04-21T15:00'
        },
        {
            startDate: '2016-04-21T13:00',
            endDate: '2016-04-21T17:00'
        },
        {
            startDate: '2016-04-21T18:00',
            endDate: '2016-04-21T19:00'
        },
        {
            startDate: '2016-04-21T16:00',
            endDate: '2016-04-21T19:00'
        },
        {
            startDate: '2016-04-21T20:00',
            endDate: '2016-04-21T21:00'
        }];

    var minRooms = meetingsScheduler(meetings);
    console.log('\n------------------- 3. meetingsScheduler(meetings) ------------------\n\n');
    console.log('The minimum number of rooms is ' + minRooms.length + '.');
    for (var j = 0; j < minRooms.length; j++) {
        console.log('Room ' + j + ':');
        console.log(minRooms[j]);
    }
    console.log('\n-----------------------------------------------------------------------\n');

};