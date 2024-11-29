let requestCounts = {};
const MAX_REQUESTS = 100;
const TIME_WINDOW = 60000; // 1 minuut

function rateLimit(ip) {
    if (!requestCounts[ip]) {
        requestCounts[ip] = 1;
    } else {
        requestCounts[ip]++;
    }

    setTimeout(() => {
        requestCounts[ip]--;
    }, TIME_WINDOW);

    return requestCounts[ip] <= MAX_REQUESTS;
}
