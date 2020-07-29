const validateArgs = (email, password) => {

    const errors = {};

    const regExEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    /* const regExPass = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*S/;
     'Пароль должен содержать хотя бы по одной прописной букве и одной строчной и одну цифру' */

    if (email.trim() === '') {
        errors.email = 'Поле Email должно быть заполнено';
    }
    else if (!email.match(regExEmail)) {
        errors.email = 'Введите корректный Email';
    }
    else if (password.trim() === '') {
        errors.password = 'Пароль должен быть заполнен';
    }
    else if (password.length < 5 || password.length > 20) {
        errors.password = 'Пароль должен быть от 5 до 20 символов';
    }

    return { errors, valid: Object.keys(errors).length < 1 };
};


export const validateResult = (email, password) => {
    let { valid, errors } = validateArgs(email, password);
    if (!valid) {
        if (errors.email) {
            throw new Error('Ошибка: ' + errors.email);
        } else {
            throw new Error('Ошибка: ' + errors.password);
        }
    }
};



