document.addEventListener("DOMContentLoaded", function(e) {
    function loadLocaleStorage (inp) {
        if (localStorage.getItem("textarea")) {
            inp.value = localStorage.getItem("textarea");
        }
    }

    function saveLocaleStorage (value) {
        localStorage.setItem("textarea", value)
    }

    function clearLocalStorage (value) {
        if (localStorage.getItem(value)) {
            localStorage.removeItem(value);
        }
    }

    function clearTextAreaHandler () {
        textArea.value = ''
    }

    function debounce(func, delay) {
        let timeout

        return function (...args) {
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    function keyboardHandler(event) {
        let val = event.target.value.trim()
        saveLocaleStorage(val)
    }

    const textArea = document.querySelector('#editor')
    const clearTextArea = document.querySelector('#clear_editor')
    const debouncedHandler = debounce(keyboardHandler, 1000)

    loadLocaleStorage(textArea)
    textArea.addEventListener('input', debouncedHandler)
    clearTextArea.addEventListener('click', clearLocalStorage)
    clearTextArea.addEventListener('click', clearTextAreaHandler)
})