const {format} = require('date-fns');
const today =format(new Date(),'dd.MM.yyyy');

const App = () => {
    const date = new Date();
    const tomorrow = addDays(date, 1);
    const start = startOfDay(date);
    const dateFormatted = getUnixTime(date);

    console.log(dateFormatted);
};

module.export= App;