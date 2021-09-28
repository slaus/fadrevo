/* SCRIPT */

window.addEventListener('DOMContentLoaded', () => {

    /* GET BROWSER PARAMETERS */

    let browserHeight;

    const getBrowserHeight = () => {
        browserHeight = document.documentElement.clientHeight;
        return browserHeight;
    };

    const setLanguagePosition = () => {
        getBrowserHeight();

        const languageBlock = document.querySelector('.button-language');
        if (browserHeight < languageBlock.previousElementSibling.offsetHeight + 40) {
            languageBlock.style.position = 'relative';
        } else {
            languageBlock.style.position = '';
        }
    };

    setLanguagePosition();

    window.addEventListener('resize', () => {
        setLanguagePosition();
    });


    /* PAGE LINK */

    const pageLink = document.querySelectorAll('.page-link');

    pageLink.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            hideAllPage();

            setApplicationPage(item.getAttribute('href'));

            getApplicationPage();
        });
    });

    const hideAllPage = () => {
        const pageName = document.querySelectorAll('[data-page]');

        pageName.forEach(page => {
            page.style.display = 'none';
        });
    };


    /* LOCAL STORAGE */

    const getApplicationPage = () => {
        if (localStorage.getItem('page') === null || localStorage.getItem('page') === 'undefined') {
            localStorage.setItem('page', '#home');
        }

        hideAllPage();

        document.querySelector(`[data-target="${localStorage.getItem('page')}"]`).style.display = 'flex';
    };

    getApplicationPage();

    const setApplicationPage = (block) => {
        localStorage.setItem('page', block);
    };

    const getApplicationFontSize = () => {
        size = window.getComputedStyle(document.body).fontSize;
        if (localStorage.getItem('fontSize') === null || localStorage.getItem('fontSize') === 'undefined') {
            localStorage.setItem('fontSize', size);
        }
        document.querySelector('html').style.fontSize = localStorage.getItem('fontSize');
    };

    const setApplicationFontSize = (parameter) => {
        localStorage.setItem('fontSize', parameter);
    };


    /* SHOW PASSWORD */

    document.querySelectorAll('.password-control').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            let items = item.previousElementSibling;

            if (items.getAttribute('type') == 'password'){
                items.setAttribute('type', 'text');
                item.querySelector('img').setAttribute('src', 'assets/icons/eye-close.svg');
            } else {
                items.setAttribute('type', 'password');
                item.querySelector('img').setAttribute('src', 'assets/icons/eye.svg');
            }
        });
    });


    /* CREATE PHONE MASK */

    const mask = (selector) => {

        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    };

    mask('[name="phone"]');


    /* FONT SWITCHER */

    const fontSwitcher = document.querySelector('[data-size]');

    let size;

    getApplicationFontSize();

    fontSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
            size = parseInt(size, 10) + parseInt(fontSwitcher.dataset.size, 10);
        if (size == 20) size = 13;
        document.querySelector('html').style.fontSize = `${size}px`;

        setApplicationFontSize(`${size}px`);
    });


    /* INPUT PLACEHOLDER */

    const inputs = document.querySelectorAll('input.form__input');
    let placeholder;
    inputs.forEach(item => {
        item.addEventListener('focus', () => {
            placeholder = item.getAttribute('placeholder');
            let span = document.createElement('span');
            setTimeout(() => {
                item.classList.add('focus-input');
            }, 250);

            span.classList.add('input-valid', 'animate__animated', 'animate__backInUp');
            span.innerText = placeholder;
            item.parentNode.appendChild(span);
        });
        item.addEventListener('focusout', (placeholder) => {
            document.querySelector('.input-valid').classList.remove('animate__backInUp');
            document.querySelector('.input-valid').classList.add('animate__backOutDown');
            document.querySelector('.input-valid').remove();
            setTimeout(() => {
                item.classList.remove('focus-input');
            }, 250);

        });
    });
});