import { jobInput } from './modal.js';
import { nameInput } from './cards.js';
const udpdateAvatar = (newAvatar, linkrequest, nameIn, jobIn) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me/' + linkrequest, {
        method: 'PATCH',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar,
            name: nameIn.value,
            about: jobIn.value
        })

    }).then((res) => {
        if (res.ok) {
            return res.json()
        }
    }).then((data) => {
        console.log(data)
        document.querySelector('.profile__avatar').src = data.avatar;

    });
};
export { udpdateAvatar }