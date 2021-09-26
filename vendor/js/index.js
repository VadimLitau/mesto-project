/*Начало - Заполнение полей форм popup*/
const popup_name = document.querySelector('.profile__info-name'); /*получение элемента с именем профиля*/
const popup_nameText = popup_name.textContent; /* получение текста имени профиля*/
const popup_nameId = document.getElementById('popup__idName'); /*получение инпута имени попап */
/*ниже аналогия имени но с профессией*/
const popup_profession = document.querySelector('.profile__info-profession');
let popup_professionText = popup_profession.textContent;
const popup_professionId = document.getElementById('popup__idProfession');
/*Конец - Заполнение полей форм popup*/
/*начало - открытие popup_opened*/
const popup_button = document.querySelector('.profile__info-button'); /*нашли кнопку открытия popup*/
const popup = document.querySelector('.popup'); /*нашли popup*/
popup_button.addEventListener('click', popup_opened); /*слушатель для popup*/
/*функция обработчик popup*/
function popup_opened() {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.add('popup_opened');
        popup_nameId.value = popup_nameText;
        popup_professionId.value = popup_professionText;
    }
};
/*Конец - открытие popup_opened*/
/*___________________________*/
/*начало - закрытие popup_opened*/
const popup_closetButton = document.querySelector('.popup__cross'); /*нашли кнопку закрытия popup*/
popup_closetButton.addEventListener('click', popup_closet); /*слушатель для popup*/
/*функция обработчик закрытия popup*/
function popup_closet() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');

    }
};
/*Конец - закрытие popup_opened*/
/*___________________________*/

/*Начало - ввод в попап и сохранение на странице*/
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#popup__idName');
const jobInput = document.querySelector('#popup__idProfession');

function formSubmitHandler(evt) {
    evt.preventDefault();
    popup_name.textContent = nameInput.value;
    popup_profession.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);
/*Конец - ввод в попап и сохранение на странице*/
/*___________________________*/
/*Начало - добавление элемента галлереи*/
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const gallery = document.querySelector('.gallery-element'); /*получение элемента родителя галереи*/
const galleryElement = document.querySelector('#photo-gallery__element').content; /*получение контента template */
const popupPhoto = document.querySelector('.popup-photo'); /*Получение элемента popupPhoto */
let popupPhotoImage = document.querySelector('.popup-photo__photo');
let popupPhotoName = document.querySelector('.popup-photo__name');


/*добавление карточек галереи по умолчанию*/
initialCards.forEach(function(item) {
    let newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true); /*копирование содержимого template*/
    let galleryImage = newGalleryElement.querySelector('.gallery-element__photo'); /*получение элемента с изображением*/
    let galleryText = newGalleryElement.querySelector('.gallery-element__caption-name'); /*получение элемента с текстом */
    galleryImage.src = item.link; /*замена изображения из объекта по умолчанию */
    galleryText.textContent = item.name; /*замена текста из объекта по умолчанию*/
    gallery.append(newGalleryElement); /*добавление карточки галереи */
    /*Начало - Анимация Лайка*/
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');

    function editLike() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    }
    galleryLike.addEventListener('click', editLike);
    /*Конец - Анимация Лайка*/

    /*Начало - Удаление карточки*/
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');

    function deletCard() {
        newGalleryElement.remove();
    };
    galleryDeletCard.addEventListener('click', deletCard);
    /*Конец - Удаление карточки*/
    /* */
    function showPhoto() {
        popupPhoto.classList.add('popup-photo_opened');
        popupPhotoImage.src = item.link;
        popupPhotoName.textContent = item.name;
    }
    galleryImage.addEventListener('click', showPhoto);

    function closePhoto() {
        popupPhoto.classList.remove('popup-photo_opened');
    }
    popupPhoto.addEventListener('click', closePhoto);
    /* */
});
/*Конец - добавление элемента галлереи */
/*___________________________*/
/*Начало - Форма добавление карточки*/


const popup_templateAddCardOpen = document.querySelector('#popup').content; /*template элемент popup */
const popup_CloneAddCardOpen = popup_templateAddCardOpen.querySelector('.popup').cloneNode(true);
const popup_buttonAddCard = document.querySelector('.profile__button'); /*нашли кнопку открытия popup*/
const popupAddCardClos = popup_CloneAddCardOpen.querySelector('.popup__cross'); /*кнопка закрытия popup*/
popup_buttonAddCard.addEventListener('click', popup_addCardOpen);
popupAddCardClos.addEventListener('click', popupCardClose);
let popup_addCardTitle = popup_CloneAddCardOpen.querySelector('.popup__form-title');
const popContent = document.querySelector('.content');

function popup_addCardOpen() {
    if (!popup_CloneAddCardOpen.classList.contains('popup_opened')) {
        popContent.append(popup_CloneAddCardOpen);
        popup_CloneAddCardOpen.classList.add('popup_opened');
        popup_addCardTitle.textContent = 'Новое место';
        popup_CloneAddCardOpen.querySelector('#popup__firstInput').placeholder = 'Название';
        popup_CloneAddCardOpen.querySelector('#popup__secondInput').placeholder = 'Ссылка на картинку';

    }
};

function popupCardClose() {
    if (popup_CloneAddCardOpen.classList.contains('popup_opened')) {
        popup_CloneAddCardOpen.classList.remove('popup_opened');

    }
};
/*Конец - Форма добавление карточки console.log(popupAddCardClos);*/
/*___________________________*/
/*Начало - Добавление карточки*/
const popupAddCardSubmitButton = popup_CloneAddCardOpen.querySelector('.popup__form-button');

function addNewGalleryCard(evt) {
    evt.preventDefault();
    let nameNewCard = popup_CloneAddCardOpen.querySelector('#popup__firstInput').value;
    let linkNewCard = popup_CloneAddCardOpen.querySelector('#popup__secondInput').value;
    let newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true); /*копирование содержимого template*/
    let galleryImage = newGalleryElement.querySelector('.gallery-element__photo'); /*получение элемента с изображением*/
    let galleryText = newGalleryElement.querySelector('.gallery-element__caption-name'); /*получение элемента с текстом */
    galleryImage.src = linkNewCard; /*замена изображения из объекта по умолчанию */
    galleryText.textContent = nameNewCard; /*замена текста из объекта по умолчанию*/
    gallery.prepend(newGalleryElement); /*добавление карточки галереи */
    popup_CloneAddCardOpen.classList.remove('popup_opened');
    /*Начало - Анимация Лайка*/
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');

    function editLike() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    }
    galleryLike.addEventListener('click', editLike);
    /*Конец - Анимация Лайка*/
    /*___________________________*/
    /*Начало - Удаление карточки*/
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');

    function deletCard() {
        newGalleryElement.remove();
    };
    galleryDeletCard.addEventListener('click', deletCard);
    /*Конец - Удаление карточки*/
    /* */
    function showPhoto() {
        popupPhoto.classList.add('popup-photo_opened');
        popupPhotoImage.src = linkNewCard;
        popupPhotoName.textContent = nameNewCard;
    }
    galleryImage.addEventListener('click', showPhoto);

    function closePhoto() {
        popupPhoto.classList.remove('popup-photo_opened');
    }
    popupPhoto.addEventListener('click', closePhoto);
    /* */
};
popupAddCardSubmitButton.addEventListener('click', addNewGalleryCard);
/*Конец - Добавление карточки*/
/*___________________________*/