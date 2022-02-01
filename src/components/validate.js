export default class FormValidator {
    constructor(item) {
        this.formSelector = item.formSelector,
            this.inputSelector = item.inputSelector,
            this.submitButtonSelector = item.submitButtonSelector,
            this.inactiveButtonClass = item.inactiveButtonClass,
            this.inputErrorClass = item.inputErrorClass,
            this.inputErrorClassActive = item.inputErrorClassActive,
            this.errorClass = item.errorClass
    }
    echo() {
        console.log(this.formSelector);
    }
}
const testVal = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    inputErrorClassActive: 'popup__form-input-error_active',
    errorClass: 'popup__error_visible'
});
//testVal.echo()
// Валидация инпутов
//добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validParams.inputErrorClass); //form__input_type_error
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validParams.inputErrorClassActive); //form__input-error_active
};
//удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validParams.inputErrorClass); //form__input_type_error
        errorElement.textContent = '';
        errorElement.classList.remove(validParams.inputErrorClassActive); //form__input-error_active
    }
    //проверка валидности поля
const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }
    //добавим слушатель для всех полей в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validParams.inputSelector));
    const buttonElement = formElement.querySelector(validParams.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
//найдем все формы и добавим им обработчики
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validParams.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};
//настройка проверки валидации полей для изменения действия кнопки
const hasInvalidInput = (inputlist) => {
    return inputlist.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
//изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(validParams.inactiveButtonClass);
            buttonElement.type = 'button';
        } else {
            buttonElement.classList.remove(validParams.inactiveButtonClass);

            buttonElement.type = 'submit';
        }

    }
    //параметры для валидации форм
const validParams = {
    formSelector: '.popup__form', //validParams.formSelector
    inputSelector: '.popup__form-input', //validParams.inputSelector
    submitButtonSelector: '.popup__form-button', //validParams.submitButtonSelector
    inactiveButtonClass: 'popup__form-button_disabled', //validParams.inactiveButtonClass
    inputErrorClass: 'popup__form-input_type_error', //validParams.inputErrorClass
    inputErrorClassActive: 'popup__form-input-error_active', //validParams.inputErrorClassActive
    errorClass: 'popup__error_visible' //validParams.errorClass
};
//console.log(validParams.formSelector + 'kurwa')
export { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState };

/*
// Валидация инпутов
//добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validParams.inputErrorClass); //form__input_type_error
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validParams.inputErrorClassActive); //form__input-error_active
};
//удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validParams.inputErrorClass); //form__input_type_error
        errorElement.textContent = '';
        errorElement.classList.remove(validParams.inputErrorClassActive); //form__input-error_active
    }
    //проверка валидности поля
const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }
    //добавим слушатель для всех полей в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validParams.inputSelector));
    const buttonElement = formElement.querySelector(validParams.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
//найдем все формы и добавим им обработчики
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validParams.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};
//настройка проверки валидации полей для изменения действия кнопки
const hasInvalidInput = (inputlist) => {
    return inputlist.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
//изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(validParams.inactiveButtonClass);
            buttonElement.type = 'button';
        } else {
            buttonElement.classList.remove(validParams.inactiveButtonClass);

            buttonElement.type = 'submit';
        }

    }
    //параметры для валидации форм
const validParams = {
    formSelector: '.popup__form', //validParams.formSelector
    inputSelector: '.popup__form-input', //validParams.inputSelector
    submitButtonSelector: '.popup__form-button', //validParams.submitButtonSelector
    inactiveButtonClass: 'popup__form-button_disabled', //validParams.inactiveButtonClass
    inputErrorClass: 'popup__form-input_type_error', //validParams.inputErrorClass
    inputErrorClassActive: 'popup__form-input-error_active', //validParams.inputErrorClassActive
    errorClass: 'popup__error_visible' //validParams.errorClass
};

export { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState };
*/