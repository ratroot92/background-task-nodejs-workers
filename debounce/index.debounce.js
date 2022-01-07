/** Start clicking a button again and again  */
/** but the event will execute at the last click only once  */
/** saves system for recurring user generated events  */

/** best example  */
/**
 * you are tracking a mouse move events
 * as the mouse moves it will fire events
 * but if you apply debounce function
 * it will only emit events when the mouse
 * will stop after a certain movement
 */

const deBounce = (fn, delay) => {
    let timeoutId;
    function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn();
        }, delay);
    };
}


// Example use 
// document.getElementById('button').addEventListener('click', deBounce((e) => {
//     console.log("you clicked me ")
// }, 5000))