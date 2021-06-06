function covertTime(date) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    // convert to UTC
    if (date.match(regEx)) {
        date = date.replaceAll('-', '/');
    }
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const now = new Date(date);
    return ((now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + '-' + months[now.getMonth()] + '-' + now.getFullYear());
}

export default covertTime