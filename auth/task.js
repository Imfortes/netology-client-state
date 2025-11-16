document.addEventListener('DOMContentLoaded', () => {
    const sighIn = document.querySelector('#signin')
    const welcome = document.querySelector('#welcome')
    const signinBtn = document.querySelector('#signin__btn');
    const signoutBtn = document.querySelector('#signout__btn');

    async function signin(event) {
        event.preventDefault();

        try {
            let login = document.querySelector('input[name="login"]');
            let password = document.querySelector('input[name="password"]');

            if (!login || !password) {
                console.error('Поля не найдены');
                return;
            }

            let formData = new FormData();

            formData.append('login', login.value);
            formData.append('password', password.value);

            console.log(formData)
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error(`HTTP ошибка! ${response.status}`);
            }

            const data = await response.json();
            console.log('Успешная авторизация:', data);
            console.log('Успешная авторизация user:', data.user_id);

            if (data.user_id) {
                saveIdInLocalStorage(data.user_id)
                login.value = ''
                password.value = ''
                onloadAuthCheck()
            }

        } catch (e) {
            console.error(`Ошибка: ${e}`)
        }
    }

    async function signout(event) {
        event.preventDefault();

        try {

            // const response = await fetch('https://students.netoservices.ru/nestjs-backend/logout', {
            //     method: 'POST',
            // })
            //
            // if (!response.ok) {
            //     throw new Error(`Ошибка при выходе: ${response.status}`);
            // }

            localStorage.removeItem('id');
            onloadAuthCheck()

        } catch (e) {
            console.log(e)
        }
    }

    function saveIdInLocalStorage(id) {
        localStorage.setItem('id', JSON.stringify(id));
    }

    function onloadAuthCheck(){
        let userId = localStorage.getItem('id');
        if (userId) {
            sighIn.classList.remove('signin_active');
            welcome.classList.add('welcome_active');
            console.log(`${signinBtn}`)
        } else {
            sighIn.classList.add('signin_active');
            welcome.classList.remove('welcome_active');
        }
    }

    onloadAuthCheck()
    signinBtn.addEventListener('click', signin)
    signoutBtn.addEventListener('click', signout)

})