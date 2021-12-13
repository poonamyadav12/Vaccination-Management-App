export function formatMMddYYYY(date) {
    return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
}

export function getDate(date) {
    return date.toISOString().substr(0, 10);
}

export function getTime(date) {
    return date.toISOString().substr(12, 5);
}