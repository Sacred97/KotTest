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





