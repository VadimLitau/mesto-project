(()=>{"use strict";var e=fetch("https://nomoreparties.co/v1/plus-cohort-4/cards",{headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}),t=document.querySelector(".popup_AddCard"),o=document.querySelector(".profile__button"),n=document.querySelector(".popup_AddCard_cross"),r=document.querySelector("#photo-gallery__element").content,c=document.querySelector(".popup__form"),u=document.querySelector("#popup__idName"),i=document.querySelector("#popupAddCard__firstInput"),l=document.querySelector("#popupAddCard__secondInput"),a=document.querySelector(".gallery-element"),p=document.querySelector(".popup__photo"),s=document.querySelector(".popup__photo-image"),d=document.querySelector(".popup__photo-name"),_=(document.querySelector(".popup_photo_cross"),document.querySelector(".popup_deleteCard")),f=(document.querySelector(".popup__deleteCard_btn"),function(e,t,o,n,c){var u=r.querySelector(".gallery-element__item").cloneNode(!0),i=u.querySelector(".gallery-element__photo"),l=u.querySelector(".gallery-element__caption-name"),a=u.querySelector(".gallery-element__caption-like"),f=u.querySelector(".gallery-element__deletCard"),m=u.querySelector(".gallery-element__like-counter");return i.alt=t,i.src=e,l.textContent=t,m.textContent=o,u.id=c,a.addEventListener("click",(function(){a.classList.toggle("gallery-element__caption-like_active")})),"3382b6ac0c72abf176e18b90"===n?f.classList.remove("gallery-element__deletCard_notDelete"):f.classList.add("gallery-element__deletCard_notDelete"),f.addEventListener("click",(function e(){var t;t=u,document.querySelector(".popup__deleteCard_btn").addEventListener("click",(function e(){console.log(t.id),t.remove(),console.log("kurwa"),y(_),fetch("https://nomoreparties.co/v1/plus-cohort-4/cards/"+t.id,{method:"DELETE",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}),document.querySelector(".popup__deleteCard_btn").removeEventListener("click",e)})),v(_),f.removeEventListener("click",e)})),i.addEventListener("click",(function(){v(p),s.alt=i.alt,s.src=i.src,d.textContent=l.textContent})),u});function m(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");y(t)}}e.then((function(e){return e.json()})).then((function(e){e.reverse().forEach((function(e){a.prepend(f(e.link,e.name,e.likes.length,e.owner._id,e._id))}))}));var v=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",m)},y=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",m)},S=function(e,t){e.some((function(e){return!e.validity.valid}))?(t.classList.add(h.inactiveButtonClass),t.type="button"):(t.classList.remove(h.inactiveButtonClass),t.type="submit")},h={formSelector:".popup__form",inputSelector:".popup__form-input",submitButtonSelector:".popup__form-button",inactiveButtonClass:"popup__form-button_disabled",inputErrorClass:"popup__form-input_type_error",inputErrorClassActive:"popup__form-input-error_active",errorClass:"popup__error_visible"},q=document.querySelector(".profile__info-name"),b=document.querySelector(".profile__info-profession"),C=document.querySelector(".profile__info-button"),L=(document.querySelector(".popup__cross"),document.querySelector(".popup_profile")),E=document.querySelector("#popup__idProfession");document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__cross")||t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__photo_wrap"))&&y(e)}))})),C.addEventListener("click",(function(){v(L),u.value=q.textContent,E.value=b.textContent})),o.addEventListener("click",(function(){v(t)})),c.addEventListener("submit",(function(e){fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me",{method:"PATCH",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f","Content-Type":"application/json"},body:JSON.stringify({name:u.value,about:E.value})}),q.textContent=u.value,b.textContent=E.value,y(L),e.preventDefault()})),n.addEventListener("click",(function(){y(t)})),t.addEventListener("submit",(function(e){var o,n;y(t),o=l.value,n=i.value,fetch("https://nomoreparties.co/v1/plus-cohort-4/cards",{method:"POST",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f","Content-Type":"application/json"},body:JSON.stringify({name:n,link:o})}).then((function(e){if(e.ok)return e.json()})).then((function(e){a.prepend(f(e.link,e.name,"0",e.owner._id,e._id))})),l.value="",i.value="",document.querySelector(".popup_AddCard_form-button").classList.add("popup__form-button_disabled"),document.querySelector(".popup_AddCard_form-button").type="button",e.preventDefault()})),Array.from(document.querySelectorAll(h.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(h.inputSelector)),o=e.querySelector(h.submitButtonSelector);S(t,o),t.forEach((function(n){n.addEventListener("input",(function(){(function(e,t){t.validity.valid?function(e,t){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(h.inputErrorClass),o.textContent="",o.classList.remove(h.inputErrorClassActive)}(e,t):function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(h.inputErrorClass),n.textContent=o,n.classList.add(h.inputErrorClassActive)}(e,t,t.validationMessage)})(e,n),S(t,o)}))}))}(e)})),fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me",{headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}).then((function(e){return e.json()})).then((function(e){document.querySelector(".profile__info-name").textContent=e.name,document.querySelector(".profile__info-profession").textContent=e.about,document.querySelector(".profile__avatar").src=e.avatar}))})();