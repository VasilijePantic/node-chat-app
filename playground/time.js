var moment = require('moment');

// var date = new Date();

// var months = ['Jan', 'Feb'];

// console.log(date.getMonth());

// var createdAt = 1234;
// var date = moment(createdAt);
// console.log(date.format('MMM Do,YYYY, HH:mm:ss A'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var date = moment(someTimestamp);
console.log(date.format('MMM Do,YYYY, HH:mm:ss A'));