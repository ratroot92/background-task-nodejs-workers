/* eslint-disable consistent-return */
const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - last < delay) {
            // eslint-disable-next-line no-useless-return
            return;
        }
        last = now;
        return fn(...args);
    };
};


// Example use 
// document.getElementById('button').addEventListener('click', throttle((e) => {
//     console.log("you clicked me ")
// }, 5000))