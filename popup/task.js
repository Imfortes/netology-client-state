document.addEventListener("DOMContentLoaded", function(e) {
    const subscribeModal = document.getElementById("subscribe-modal");

    function getCookies(name) {
        const target = name + '='
        const cookies = document.cookie.split(';')

        if (cookies) {
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim()

                if (cookie.indexOf(target) === 0) {
                    console.log(cookie.substring(target.length))
                    return cookie.substring(target.length);
                }
            }
            return null
        }
    }

    function setCookies() {
        const date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
        document.cookie = `subscribe_modal=closed; expires=${date.toUTCString()}; path=/`;
        console.log(document.cookie);
    }

    function openModal(el) {
        el.classList.add("modal_active");
    }

    function closeModal(el) {
        el.classList.remove("modal_active");
        setCookies();
    }

    const modalCookie = getCookies('subscribe_modal');
    if (modalCookie !== 'closed') {
        console.log('Показываем модалку, т.к. кука != "closed"');
        setTimeout(() => {
            openModal(subscribeModal);
        }, 1000);
    } else {
        console.log('Модалка не показывается, т.к. кука = "closed"');
    }

    const closeBtn = subscribeModal.querySelector('.modal__close');
    closeBtn.addEventListener('click', function() {
        closeModal(subscribeModal);
    });
})