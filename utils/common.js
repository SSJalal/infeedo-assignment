//get Month and Year from the date string
const getMonthYear = (date) => {
    const inputDate = new Date(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[inputDate.getMonth()]} ${inputDate.getFullYear()}`;
}

//used to create response object when fetching data
exports.createResponse = (response) => {
    let result = [];
    response.forEach(element => {
        let obj = {
            date: getMonthYear(element.date),
            metrics: element
        };
        delete obj.metrics.date;
        result.push(obj);
    });
    return result;
}

//check if the date is valid or not
exports.isDateValid = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }