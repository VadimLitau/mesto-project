(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{h:()=>x});var t=document.querySelector(".profile__info-name"),o=document.querySelector(".profile__info-profession"),n=document.querySelector(".profile__info-button"),r=(document.querySelector(".popup__cross"),document.querySelector(".popup_profile")),c=document.querySelector("#popup__idProfession");fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me",{headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).then((function(e){document.querySelector(".profile__info-name").textContent=e.name,document.querySelector(".profile__info-profession").textContent=e.about,document.querySelector(".profile__avatar").src=e.avatar}));var u=function(e,t,o,n){fetch("https://nomoreparties.co/v1/plus-cohort-4/users/me/"+t,{method:"PATCH",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f","Content-Type":"application/json"},body:JSON.stringify({avatar:e,name:o.value,about:n.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).then((function(e){document.querySelector(".profile__avatar").src=e.avatar}))},a=function(e,t,o){fetch("https://nomoreparties.co/v1/plus-cohort-4/cards/likes/"+e,{method:t,headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).then((function(e){o.textContent=e.likes.length}))},i=document.querySelector(".popup_AddCard"),l=document.querySelector(".profile__button"),p=document.querySelector(".popup_AddCard_cross"),s=document.querySelector("#photo-gallery__element").content,d=document.querySelector(".popup__form"),_=document.querySelector("#popup__idName"),f=document.querySelector("#popupAddCard__firstInput"),m=document.querySelector("#popupAddCard__secondInput"),v=document.querySelector(".gallery-element"),y=document.querySelector(".popup__photo"),h=document.querySelector(".popup__photo-image"),S=document.querySelector(".popup__photo-name"),q=(document.querySelector(".popup_photo_cross"),"3382b6ac0c72abf176e18b90"),b=document.querySelector(".popup_deleteCard"),C=(document.querySelector(".popup__deleteCard_btn"),function(e,t,o,n,r,c){var u=s.querySelector(".gallery-element__item").cloneNode(!0),i=u.querySelector(".gallery-element__photo"),l=u.querySelector(".gallery-element__caption-name"),p=u.querySelector(".gallery-element__caption-like"),d=u.querySelector(".gallery-element__deletCard"),_=u.querySelector(".gallery-element__like-counter");return i.alt=t,i.src=e,l.textContent=t,_.textContent=o,u.id=r,c&&p.classList.add("gallery-element__caption-like_active"),p.addEventListener("click",(function(){p.classList.contains("gallery-element__caption-like_active")?(a(r,"DELETE",_),p.classList.remove("gallery-element__caption-like_active")):(a(r,"PUT",_),p.classList.add("gallery-element__caption-like_active"))})),n===q?d.classList.remove("gallery-element__deletCard_notDelete"):d.classList.add("gallery-element__deletCard_notDelete"),d.addEventListener("click",(function e(){var t;t=u,document.querySelector(".popup__deleteCard_btn").addEventListener("click",(function e(){var o;t.remove(),k(b),o=t.id,fetch("https://nomoreparties.co/v1/plus-cohort-4/cards/"+o,{method:"DELETE",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),document.querySelector(".popup__deleteCard_btn").removeEventListener("click",e)})),E(b),d.removeEventListener("click",e)})),i.addEventListener("click",(function(){E(y),h.alt=i.alt,h.src=i.src,S.textContent=l.textContent})),u});fetch("https://nomoreparties.co/v1/plus-cohort-4/cards",{headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.reverse().forEach((function(e){var t;e.likes.forEach((function(e){return q===e._id?t=1:t})),v.prepend(C(e.link,e.name,e.likes.length,e.owner._id,e._id,t))}))}));function L(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");k(t)}}var E=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",L)},k=function(e,t,o,n){t?(o.textContent=n,setTimeout((function(){e.classList.remove("popup_opened")}),t)):e.classList.remove("popup_opened"),document.removeEventListener("keydown",L)},g=function(e,t){e.some((function(e){return!e.validity.valid}))?(t.classList.add(A.inactiveButtonClass),t.type="button"):(t.classList.remove(A.inactiveButtonClass),t.type="submit")},A={formSelector:".popup__form",inputSelector:".popup__form-input",submitButtonSelector:".popup__form-button",inactiveButtonClass:"popup__form-button_disabled",inputErrorClass:"popup__form-input_type_error",inputErrorClassActive:"popup__form-input-error_active",errorClass:"popup__error_visible"},j=document.querySelector(".profile__avatar"),x=2e3;j.addEventListener("click",(function(){E(document.querySelector(".popup_editAvatar"))})),document.querySelector(".popup_editAvatar_btn").addEventListener("click",(function(){var e=document.querySelector("#popup_editAvatar").value;k(document.querySelector(".popup_editAvatar"),x,document.querySelector(".popup_editAvatar_btn"),"Сохранение..."),setTimeout((function(){console.log(e),u(e,"avatar","","")}),x)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__cross")||t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__photo_wrap"))&&k(e)}))})),n.addEventListener("click",(function(){E(r),_.value=t.textContent,c.value=o.textContent})),l.addEventListener("click",(function(){E(i),m.value="",f.value="",document.querySelector(".popup_AddCard_form-button").classList.add("popup__form-button_disabled"),document.querySelector(".popup_AddCard_form-button").type="button"})),d.addEventListener("submit",(function(e){k(r,x,document.querySelector(".popup__form-button_profile"),"Сохранение..."),setTimeout((function(){u("","",_,c),t.textContent=_.value,o.textContent=c.value}),x),e.preventDefault()})),p.addEventListener("click",(function(){k(i)})),i.addEventListener("submit",(function(e){var t,o;k(i,x,document.querySelector(".popup_AddCard_form-button"),"Сохранение..."),t=m.value,o=f.value,function(e,t,o){var n;fetch("https://nomoreparties.co/v1/plus-cohort-4/cards",{method:"POST",headers:{authorization:"69b55c42-ee88-4348-a639-420f0f40fb4f","Content-Type":"application/json"},body:JSON.stringify({name:t,link:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return n=e})).finally(setTimeout((function(){v.prepend(C(n.link,n.name,"0",n.owner._id,n._id))}),o))}(t,o,x),e.preventDefault()})),Array.from(document.querySelectorAll(A.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(A.inputSelector)),o=e.querySelector(A.submitButtonSelector);g(t,o),t.forEach((function(n){n.addEventListener("input",(function(){(function(e,t){t.validity.valid?function(e,t){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(A.inputErrorClass),o.textContent="",o.classList.remove(A.inputErrorClassActive)}(e,t):function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(A.inputErrorClass),n.textContent=o,n.classList.add(A.inputErrorClassActive)}(e,t,t.validationMessage)})(e,n),g(t,o)}))}))}(e)}))})();