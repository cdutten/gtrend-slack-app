'use strict';
const googleTrends = require('google-trends-api');
const smb = require('slack-message-builder')

module.exports.hello = async event => {
    let myDate = new Date();
    myDate.setFullYear(myDate.getFullYear() - 1);

    let gtrendConfig = {
        keyword: event.text,
        geo: event.geo ? event.geo : "AR",
        startTime: event.starttime ? event.starttime : myDate,
    };


    return googleTrends.interestOverTime(gtrendConfig)
        .then(function (results) {
            let values = JSON.parse(results).default.timelineData.map(function (val) {
                return val.value[0];
            });
            let avg = (values.reduce((previous, current) => current += previous)) / values.length;

            return smb().text('The avg of interest is ' + avg + 'in the last year')
                .json();
        })
        .catch(function (err) {
            return smb().text('Oh no there was an error' + err)
                .json();
        });
};
