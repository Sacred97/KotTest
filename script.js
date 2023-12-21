// document.addEventListener('mousemove', function(event) {
//     const eyes = document.querySelectorAll('.cat__eye');
//
//     eyes.forEach((eye, index) => {
//         // const { left, top, width, height } = eye.getBoundingClientRect();
//         // console.log(`Eye ${index + 1}: left - ${left}, top - ${top}`)
//         // const eyeCenterX = left + width / 2;
//         // const eyeCenterY = top + height / 2;
//         // const deltaX = event.clientX - eyeCenterX;
//         // const deltaY = event.clientY - eyeCenterY;
//         // const angle = Math.atan2(deltaY, deltaX);
//         // const eyeRadius = width / 1; // Радиус, в пределах которого зрачок может двигаться
//         // const eyeX = eyeRadius * Math.cos(angle);
//         // const eyeY = eyeRadius * Math.sin(angle);
//         //
//         // eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
//     });
// });

// Получаем элементы один раз вне обработчика событий
// const eyes = document.querySelectorAll('.cat__eye');
//
// let lastEyeX = 0;
// let lastEyeY = 0;
//
// document.addEventListener('mousemove', (event) => {
//     let moveEyes = true; // Флаг для определения, должны ли зрачки двигаться
//
//     eyes.forEach((eye) => {
//         const boundingBox = eye.getBoundingClientRect();
//         const eyeCenterX = boundingBox.left + boundingBox.width / 2;
//         const eyeCenterY = boundingBox.top + boundingBox.height / 2;
//         const deltaX = event.clientX - eyeCenterX;
//         const deltaY = event.clientY - eyeCenterY;
//         const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
//
//         // Если курсор слишком близко к любому из глаз, не двигаем зрачки
//         if (distance < 50) {
//             moveEyes = false;
//         }
//
//         // Если флаг moveEyes остается true, перемещаем зрачки
//         const angle = Math.atan2(deltaY, deltaX);
//         const eyeRadius = boundingBox.width;
//         const eyeX = moveEyes ? eyeRadius * Math.cos(angle) : lastEyeX;
//         const eyeY = moveEyes ? eyeRadius * Math.sin(angle) : lastEyeY;
//
//         if (moveEyes) {
//             lastEyeX = eyeX;
//             lastEyeY = eyeY;
//         }
//
//         eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
//     });
// });


let texts = ['Пополнение рекламного бюджета', 'который помогает с маркировкой', 'который добавляет бонусы', 'А что еще?'];
let typingSpeed = 10; // скорость печатания (миллисекунды)
let deletingSpeed = 20; // скорость удаления (миллисекунды)
let pauseTime = 2000; // пауза перед удалением (миллисекунды)
let container = document.getElementById('writer');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
function type() {
    if (isDeleting) {
        // Удаляем символы
        charIndex--;
    } else {
        // Добавляем символы
        charIndex++;
    }

    // Показываем текущее состояние текста
    let textToShow = texts[textIndex].substring(0, charIndex);
    container.textContent = textToShow;

    // Определяем следующий шаг
    if (!isDeleting && charIndex === texts[textIndex].length) {
        if (textIndex === texts.length - 1) return;
        // Если текст полностью напечатан, начинаем удалять
        isDeleting = true;
        setTimeout(type, pauseTime); // Пауза перед удалением
    } else if (isDeleting && charIndex === 0) {
        // Если текст полностью удален
        isDeleting = false;
        textIndex++; // Переходим к следующему тексту
        if (textIndex === texts.length) {
            // Если тексты закончились, не повторяем
            return;
        }
        setTimeout(type, typingSpeed); // Пауза перед новым текстом
    } else {
        // Повторяем печать/удаление
        let delay = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, delay);
    }
}

let $promo = document.querySelector('.promo-container')
let $hiddenHeader = document.querySelector('.hidden-header')
let $progressBar = document.getElementById('progress-bar')

let $kotbot_how = document.getElementById('how')
let howPlayed = false
let $kotbot_bonus = document.getElementById('bonus')
let bonusPlayed = false
let $kotbot_origin = document.getElementById('origin')
let originPlayed = false

let $kotbot_skills = document.getElementById('skills')
let skillsPlayed = false
let $kotbot_referral = document.getElementById('referral')
let referralPlayed = false
let $kotbot_tour = document.getElementById('tour')
let tourPlayed = false

let $kotbot_description = document.querySelector('.skills-container')
let description_animationPlayed = false

function checkAnimation(element, style, value, func, ms = 1000) {
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.style[style] = value
        if (func) setTimeout(func, ms)
        return true
    }
    return false
}

document.addEventListener('DOMContentLoaded', function() {

    let skillsRect = $kotbot_skills.getBoundingClientRect()
    if (skillsRect.top < window.innerHeight && skillsRect.bottom >= 0) {
        skillsPlayed = true
        setTimeout(type, 1000)
    } else {
        $kotbot_skills.style.transition = 'transform 0.5s';
        $kotbot_skills.style.transform = 'scale(0.7)';
    }

    let referral = $kotbot_referral.getBoundingClientRect()
    if (referral.top < window.innerHeight && referral.bottom >= 0) {
        referralPlayed = true
    } else {
        $kotbot_referral.style.transition = 'transform 0.5s';
        $kotbot_referral.style.transform = 'scale(0.7)';
    }


    window.addEventListener('scroll', function() {
        let height = $promo.offsetHeight;

        if (window.pageYOffset > height) {
            $hiddenHeader.style.top = '0px';
        } else {
            $hiddenHeader.style.top = '-90px';
        }

        let scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        let scrollProgress = window.pageYOffset / scrollTotal * 100;
        $progressBar.style.width = scrollProgress + "%";


        if (!howPlayed) {
            let el = document.querySelector('.how-it-works__title')
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('animate__animated', 'animate__fadeInDown')
                howPlayed = true
            }
            howPlayed = false
        }
        if (!skillsPlayed) skillsPlayed = checkAnimation($kotbot_skills,'transform', 'scale(1)', type)
        if (!referralPlayed) referralPlayed = checkAnimation($kotbot_referral)
    });

});

function getPromo() {
    let $el = document.getElementById('code')
    if ($el.innerHTML === 'Погладь кота') {
        $el.innerHTML = 'Отлично! Дарю промокод GIVE500 -<br/>бонус на первое пополнение'
        // $el.style.top = "-126px"
        // $el.style.opacity = "1"
        $el.classList.remove('hide')
        return
    }
    $el.innerHTML = 'Погладь кота'
    // $el.style.top = "-101px"
    // $el.style.opacity = "0.3"
    $el.classList.add('hide')
}
