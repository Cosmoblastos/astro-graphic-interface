export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const stabilization = (number, duration) => {

}

export function isValidHttpUrl (string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default {
    randomNumber,
    stabilization,
    isValidHttpUrl
}