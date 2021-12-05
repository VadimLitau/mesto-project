import { showPopupProfile, closeAllPopup } from './utils.js';
import { likesServAdd, userCard, servReq, deleteServCard } from './api.js';
import { timePopupInterval } from './index.js'
//попап добавления карточки
const popupCreateNewCard = document.querySelector('.popup_AddCard');
//нашли кнопку открытия popup добавления карточки
const popupButtonCreateCard = document.querySelector('.profile__button');
//нашли кнопку закрытия popup добавления карточки 
const popupAddCardClos = document.querySelector('.popup_AddCard_cross');
//получение контента template
const galleryElement = document.querySelector('#photo-gallery__element').content;
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#popup__idName');
//получение текста из попап для названия карточки
const newCardText = document.querySelector('#popupAddCard__firstInput');
//получение ссылки на изображение из попап для карточки
const newCardLink = document.querySelector('#popupAddCard__secondInput');
//получение элемента родителя галереи
const gallery = document.querySelector('.gallery-element');
//получение родителя для показа фотографии
const popupPhoto = document.querySelector('.popup__photo');
//получение изображения для показа фотографии
const popupPhotoImage = document.querySelector('.popup__photo-image');
//получение текста для показа изображения
const popupPhotoName = document.querySelector('.popup__photo-name');
//получение элемента для закрытие попап показа изображения
const popupPhotoClose = document.querySelector('.popup_photo_cross');
//мой id
const myId = '3382b6ac0c72abf176e18b90';
//попап удаления карточки
const popupDeleteCard = document.querySelector('.popup_deleteCard');
//Начало - добавление элемента галлереи
const deleteButton = document.querySelector('.popup__deleteCard_btn');

//Создание шаблона карточки
const createServCard = (servLink, servName, serLike, servId, servPhotoId, likeStatus) => {
    //получение копии template элемента 
    const newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true);
    //получение изображение из копии
    const galleryImage = newGalleryElement.querySelector('.gallery-element__photo');
    //получение текста из копии
    const galleryText = newGalleryElement.querySelector('.gallery-element__caption-name');
    //Получение лайка в новой карточке
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');
    //получение элемента корзины новой карточки
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');
    //получение элемента счетчика лайков
    const galleryCounterLikes = newGalleryElement.querySelector('.gallery-element__like-counter');
    //получение массива с карточками от сервера  
    galleryImage.alt = servName;
    galleryImage.src = servLink;
    galleryText.textContent = servName;
    galleryCounterLikes.textContent = serLike;
    newGalleryElement.id = servPhotoId;
    if (likeStatus) { galleryLike.classList.add('gallery-element__caption-like_active') }
    //реакция и замена вида лайка при клике
    galleryLike.addEventListener('click', function() {
        if (galleryLike.classList.contains('gallery-element__caption-like_active')) {
            likesServAdd(servPhotoId, 'DELETE').then((data) => {
                galleryCounterLikes.textContent = data.likes.length;
            });
            galleryLike.classList.remove('gallery-element__caption-like_active')
        } else {
            likesServAdd(servPhotoId, 'PUT').then((data) => { galleryCounterLikes.textContent = data.likes.length; });
            galleryLike.classList.add('gallery-element__caption-like_active')
        }
    });

    //добавлять или нет элемент корзины на карточку
    if (servId === myId) {
        galleryDeletCard.classList.remove('gallery-element__deletCard_notDelete');
    } else {
        galleryDeletCard.classList.add('gallery-element__deletCard_notDelete');
    }
    //удаление элемента галереи
    /*
    function deletTemCard() {
        //showPopupProfile(popupDeleteCard);
        delCard(newGalleryElement);
        galleryDeletCard.removeEventListener('click', deletTemCard);
    };*/
    galleryDeletCard.addEventListener('click', () => {
        showPopupProfile(popupDeleteCard);
        delCard(newGalleryElement);
    });

    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        showPopupProfile(popupPhoto);
        popupPhotoImage.alt = galleryImage.alt;
        popupPhotoImage.src = galleryImage.src;
        popupPhotoName.textContent = galleryText.textContent;
    });
    return newGalleryElement;
};
//удаление карточки с сервера
function delCard(item) {
    //const ji = document.getElementById(item.id);
    // console.log(ji);
    closeAllPopup(popupDeleteCard);
    item.remove();
    deleteServCard(item.id);
    //пусть пока это останется, попробую завтра на свежую голову еще поколдовать
    //const hoba = item; //эта переменная прекрасна
    /*я потратил 12 часов чтобы эта херня заработала, завтра же распечатаю этот кусок кода и сожгу к чертям, гори в аду >< */

    //console.log(hoba.id)
    //item.remove();
    // console.log('kurwa')
    //closeAllPopup(popupDeleteCard);
    // deleteServCard(item.id);
    //document.querySelector('.popup__deleteCard_btn').removeEventListener('click', gtg);

    //function gtg() { document.querySelector('.popup__deleteCard_btn').addEventListener('click', gtg); }
}
//Начало - добавление карточек галереи по умолчанию
servReq().then((data) => {
    data.reverse().forEach(function(item) {
        // console.log(item)
        let elem;
        item.likes.forEach(function(rrr) {
            if (myId === rrr._id) {
                return elem = 1;
            }
            return elem;
        })
        gallery.prepend(createServCard(item.link, item.name, item.likes.length, item.owner._id, item._id, elem));
    });
});
//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
const createUserCard = (userLink, userText, time) => {
        let elem;
        userCard(userLink, userText, timePopupInterval).then((data) => {
                return elem = data;
                //gallery.prepend(createServCard(data.link, data.name, '0', data.owner._id, data._id));
            })
            .finally(setTimeout(() => { gallery.prepend(createServCard(elem.link, elem.name, '0', elem.owner._id, elem._id)) }, time));
    }
    //Конец - Добавление карточки пользователем
export { myId, delCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard };