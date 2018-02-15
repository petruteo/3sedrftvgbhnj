const moment = require('moment');

var createdAt= 1245677788834;
var date = moment(createdAt);

// date.add(100, 'year').subtract(9, 'months');

console.log(date.format('h:mm A YYYY'));