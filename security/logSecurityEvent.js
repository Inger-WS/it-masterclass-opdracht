
const securityEvents = [
    "",
    Date.now().toString(),
];

const getCurrentDate = () => {
    return new Date().getDate().toString();
}

function logSecurityEvent(event, getCurrentDate) {

    if (event === undefined) {
        throw new Error('Event is required');
    } else if (typeof event !== 'string') {
        throw new Error('Event must be a string');
    } else if (event.trim() === '') {
        throw new Error('Event must be a non-empty string');
    } else if (securityEvents.includes(event)) {
        throw new Error('Event already logged');
    } else {
        securityEvents.push(event, getCurrentDate);
    }
}