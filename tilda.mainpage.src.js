(($) => {
	const VK_APP_ID = 51804311;

	const q = (el) => document.querySelector(el);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const preload = (...images) =>
		images.forEach((src) => ((preload.images[src] = new Image()), (preload.images[src].src = src)));
	preload.images = {};

	const reachGoal = (type) => {
		console.log('reachGoal', type);

		try {
			window?.ym(55524394, 'reachGoal', type);
		} catch (e) {
			console.error(e);
		}
	};

	const generateQuerySelector = (el) => {
		let str = `${el.tagName}${el.id != '' ? '#' + el.id : ''}`;
		let uniq = generateUniqueRandomString(20);

		if (el.className) {
			let classes = el.className.split(/\s/);

			for (let i = 0; i < classes.length; i++) {
				str += '.' + classes[i];
			}
		}

		el.setAttribute('data-uniqstr', uniq);
		return `${str}[data-uniqstr="${uniq}"]`;
	};

	const buildQuery = (params) => {
		const queryString = Object.keys(params)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
			.join('&');

		return queryString;
	};

	const generateUniqueRandomString = (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		// Add a timestamp to make the string unique
		const timestamp = Date.now();
		result += timestamp;

		return result;
	};

	const loader = (status) => {
		loader.clearTimeout();

		if (!q('.eyes[data-eyes]')) {
			let eyes = document.createElement('div');
			eyes.classList.add('eyes');
			eyes.setAttribute('data-eyes', 'hidden');

			eyes.innerHTML = `
				<style>
					body[data-eyes="true"] {
						overflow: hidden;
					}

					.eyes[data-eyes] {
						position: fixed;
						top: 0;
						left: 0;
						width: 0;
						height: 0;
						background: #171717;
						transition: opacity 250ms ease;
						overflow: hidden;
						opacity: 0;
						z-index: 9999999;
					}

					.eyes[data-eyes="false"],
					.eyes[data-eyes="true"] {
						width: 100%;
						height: 100%;
						opacity: 1;
					}

					.eyes[data-eyes="false"] {
						opacity: 0;
					}

					.eyes[data-eyes="hidden"] {
						width: 0;
						height: 0;
					}

					.eyes .wrap {
						position: absolute;
						width: 185px;
						height: 152px;
						left: 0;
						right: 0;
						margin: calc(-152px/2) auto 0;
						top: 50%;
					}
					
					.eyes .eye {
						position: relative;
						width: 185px;
						height: 84px;
						background-image: url(https://assets.kotbot.black/xd/eye.svg);
						background-repeat: no-repeat;
						background-position: top center;
					}

					.eyes .eye:after {
						position: absolute;
						content: '';
						width: 185px;
						height: 84px;
						background-image: url(https://assets.kotbot.black/xd/ellipse.svg);
						left: 0;
						top: -1px;
						background-repeat: no-repeat;
						background-position: top center;
						transition: top 300ms ease;
					}

					.eyes .eye1 {
						z-index: 0;
					}

					.eyes .eye2 {
						z-index: 1;
					}

					.eyes .eye[data-eye="half"]:after {
						top: 25px;
					}

					.eyes .eye[data-eye="half2"]:after {
						top: 35px;
					}

					.eyes .eye[data-eye="open"]:after {
						top: 45px;
					}

					.eyes .eye[data-eye="open2"]:after {
						top: 55px;
					}
				</style>

				<div class="wrap">
					<div class="eye eye1"></div>
					<div class="eye eye2"></div>
				</div>
			`;

			q('body').appendChild(eyes);
			q('body').setAttribute('data-eyes', status ? 'true' : 'false');
			loader.setTimeout(1, () => q('.eyes[data-eyes]').setAttribute('data-eyes', status ? 'true' : 'false'));
		} else {
			q('body').setAttribute('data-eyes', status ? 'true' : 'false');
			q('.eyes[data-eyes]').setAttribute('data-eyes', status ? 'true' : 'false');
		}

		if (!status) {
			loader.setTimeout(250, () => {
				q('.eyes[data-eyes]').setAttribute('data-eyes', 'hidden');
			});

			document.querySelectorAll('.eyes[data-eyes] .eye').forEach((eye) => {
				eye.setAttribute('data-eye', 'close');
			});
		} else {
			loader.setTimeout(280, () => {
				q('.eyes[data-eyes] .eye1').setAttribute('data-eye', 'open');
			});

			loader.setTimeout(620, () => {
				q('.eyes[data-eyes] .eye2').setAttribute('data-eye', 'open');
			});

			loader.setTimeout(1500, () => {
				const eyes = document.querySelectorAll('.eyes[data-eyes] .eye');
				const rand = (f, t) => Math.floor(Math.random() * (t - f + 1)) + f;

				const blink = () => {
					let half = Math.random() < 0.5 ? 'half' : 'half2';
					let open = Math.random() < 0.5 ? 'open' : 'open2';
					let index = Math.random() < 0.5 ? 0 : 1;
					let eye = eyes[index];
					eye.setAttribute('data-eye', half);
					loader.setTimeout(rand(900, 2500), () => eye.setAttribute('data-eye', open));
					loader.setTimeout(rand(3000, 5000), blink);
				};

				blink();
			});
		}
	};

	loader.timeouts = [];

	loader.setTimeout = (ms, func) => {
		loader.timeouts.push(setTimeout(func, ms));
	};

	loader.setInterval = (ms, func) => {
		loader.timeouts.push(setInterval(func, ms));
	};

	loader.clearTimeout = () => {
		loader.timeouts.forEach((timeout) => {
			clearTimeout(timeout);
			clearInterval(timeout);
		});

		loader.timeouts = [];
	};

	$.oneTapLoader = loader;

	$.oneTapCallback = (self) => {
		loader(true);

		let query = buildQuery({
			client_id: VK_APP_ID,
			display: 'page',
			redirect_uri: `https://kotbot.black/api/onetap`,
			response_type: 'code',
			v: '5.131',
			scope: 65536,
		});

		location.href = `http://oauth.vk.com/authorize?${query}`;
	};

	/* Want To Talk */
	const popup = document.createElement('div');

	popup.classList.add('want-to-talk-popup');
	popup.classList.add('hidden');

	popup.innerHTML = `
		<style>
			.want-to-talk-popup {
				background: #0000009c;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 99999;
				opacity: 0;
				transition: opacity 250ms ease;
				overflow: auto;
			}

			.want-to-talk-popup.hidden {
				width:0;
				height:0;
			}

			.want-to-talk-popup.visible {
				opacity: 1;
			}

			.want-to-talk-popup .success,
			.want-to-talk-popup .form {
				max-width: 424px;
				width: 100%;
				background: #fff;
				position: absolute;
				margin: 0 auto;
				top: 30px;
				left: 0;
				right: 0;
				height: auto;
				padding: 128px 0 0;
				transform: translateY(300px);
				opacity: 0;
				transition: transform 500ms ease, opacity 300ms ease;
				background-image: url(https://assets.kotbot.black/xd/letscall-header.svg);
				background-repeat: no-repeat;
				background-position: center top;
				background-color: #171717;
				border-radius: 24px;
				box-shadow: 0 0 20px -5px #00000033;
				box-sizing: border-box;
			}
			
			.want-to-talk-popup .form:after {
				content: '';
				position: absolute;
				bottom: -45px;
				height: 1px;
				width: 100%;
			}

			.want-to-talk-popup.visible[data-success="true"] .success,
			.want-to-talk-popup.visible .form {
				transform: translateY(0px);
				opacity: 1;
			}

			.want-to-talk-popup .form .wrap {
				background: white;
				border-radius: 0 0 24px 24px;
				padding: 32px;
				position: relative;
			}

			.want-to-talk-popup h3,
			.want-to-talk-popup h2,
			.want-to-talk-popup h1 {
				color: #171717;
				font-family: 'Museo',Arial,sans-serif;
				font-size: 32px;
				font-weight: 400;
				line-height: 38px;
				letter-spacing: 0em;
				text-align: center;
				margin: 0;
				padding: 0;
			}

			.want-to-talk-popup h2 {
				font-size: 16px;
				font-weight: 300;
				line-height: 19px;
				padding: 8px 0 0;
			}

			.want-to-talk-popup .inputs {
				padding: 24px 0 0;
			}

			.want-to-talk-popup .inputs input {
				height: 56px;
				width: 100%;
				outline: 0;
				border: 0;
				box-shadow: 0 0 0 1px #EAEAEA, 0 0 10px 0px #eaeaea00;
				position: relative;
				z-index: 0;
				transition: box-shadow 250ms ease;
				font-family: 'Museo',Arial,sans-serif;
				font-size: 16px;
				font-weight: 300;
				line-height: 19px;
				padding: 0 20px;
				box-sizing: border-box;
			}

			.want-to-talk-popup .inputs input:focus,
			.want-to-talk-popup .inputs input:active {
				z-index: 1;
				box-shadow: 0 0 0 1px #BDB8F5, 0 0 10px 0px #BDB8F5;
			}

			.want-to-talk-popup .inputs input:first-child {
				border-radius: 16px 16px 0 0;
			}

			.want-to-talk-popup .inputs input:last-child {
				border-radius: 0 0 16px 16px;
			}

			.want-to-talk-popup .switch {
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				gap: 8px;
				margin: 0;
			}

			.want-to-talk-popup .switch [rel] {
				display: inline-block;
				box-shadow: 0 0 0 1px #EAEAEA;
				border-radius: 16px;
				height: 56px;
				line-height: 56px;
				white-space: nowrap;
				font-family: 'Museo',Arial,sans-serif;
				font-size: 16px;
				font-weight: 300;
				width: 100%;
				text-align: center;
				color: #17171780;
				transition: box-shadow 250ms ease, color 250ms ease;
				cursor: pointer;
				user-select: none;
			}

			.want-to-talk-popup .switch [rel]:hover {
				color: #1717179e;
				box-shadow: 0 0 0 1px #1717178f;
			}

			.want-to-talk-popup .switch [rel].active {
				color: #171717;
				box-shadow: 0 0 0 1px #171717;
			}

			.want-to-talk-popup h3 {
				font-size: 16px;
				font-weight: 300;
				line-height: 19px;
				padding: 24px 0 8px;
			}

			.want-to-talk-popup button[type="submit"] {
				background: #0278FF;
				outline: 0;
				border: 0;
				border-radius: 40px;
				width: 100%;
				height: 51px;
				text-align: center;
				font-size: 16px;
				font-weight: 400;
				font-family: 'Museo',Arial,sans-serif;
				color: white;
				margin: 40px 0 0;
				cursor: pointer;
				transition: background 250ms ease;
			}

			.want-to-talk-popup button[type="submit"]:hover,
			.want-to-talk-popup button[type="submit"]:active {
				background: #0063D4;
			}

			.want-to-talk-popup .error {
				display: none;
			}

			.want-to-talk-popup .error.active {
				color: #FF1F00;
				font-size: 16px;
				font-weight: 300;
				font-family: 'Museo',Arial,sans-serif;
				text-align: center;
				padding: 15px 0 0;
				display: block;
			}

			.want-to-talk-popup .loading {
				opacity: 0;
				transition: opacity 250ms ease;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 128px;
				background: #171717;
				border-radius: 24px 24px 0 0;
			}

			.want-to-talk-popup .wrap:before {
				content: '';
				opacity: 0;
				transition: opacity 500ms ease;
				position: absolute;
				top: 0;
				left: 0;
				width: 0%;
				height: 0%;
				background: #ffffffdb;
				z-index: 2;
				border-radius: 0 0 24px 24px;
			}

			.want-to-talk-popup[data-loading="true"] .wrap:before,
			.want-to-talk-popup[data-loading="true"] .loading {
				opacity: 1;
			}

			.want-to-talk-popup[data-loading="true"] .wrap:before {
				width: 100%;
				height: 100%;
			}

			.want-to-talk-popup .loading .eye {
				position: absolute;
				height: 84px;
				background-image: url(https://assets.kotbot.black/xd/eye.svg);
				background-repeat: no-repeat;
				background-position: top center;
				width: 100%;
				top: 50%;
				margin: -33px 0 0;
			}

			.want-to-talk-popup .loading .eye:after {
				position: absolute;
				content: '';
				width: 100%;
				height: 84px;
				background-image: url(https://assets.kotbot.black/xd/ellipse.svg);
				left: 0;
				top: -1px;
				background-repeat: no-repeat;
				background-position: top center;
				transform: translateY(0px);
				transition: top 300ms ease;
			}

			.want-to-talk-popup[data-loading="true"] .loading .eye:after {
				animation-duration: 6s, 8s;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				animation-name: changeTopOpen;
				animation-delay: 0.2s, 0.5s;
				top: 25px;
			}

			.want-to-talk-popup[data-success="true"] .form {
				transform: translateY(300px);
				opacity: 0;
			}

			.want-to-talk-popup .success {
				background: white;
				padding: 32px;
				box-shadow: 0 0 10px -5px #00000033;
				display: none;
			}

			.want-to-talk-popup[data-success="true"] .success {
				display: block;
			}

			.want-to-talk-popup .success .image {
				background-image: url(https://assets.kotbot.black/xd/sitting.svg);
				width: 100%;
				height: 128px;
				background-repeat: no-repeat;
				background-position: center;
				margin: 24px 0;
			}

			.want-to-talk-popup .success .close {
				color: #171717;
				font-family: 'Museo',Arial,sans-serif;
				font-size: 16px;
				font-weight: 400;
				text-align: center;
				width: 100%;
				border: 1px solid #171717;
				border-radius: 40px;
				height: 51px;
				line-height: 51px;
				cursor: pointer;
				transition: color 250ms ease, background 250ms ease;
				background: white;
			}

			.want-to-talk-popup .success .close:hover {
				color: white;
				background: #171717;
			}

			@keyframes changeTopOpen {
				0% { transform: translateY(0px); }
				10% { transform: translateY(15px); }
				20% { transform: translateY(0px); }
				40% { transform: translateY(0px); }
				50% { transform: translateY(0px); }
				90% { transform: translateY(15px); }
				100% { transform: translateY(0px); }
			}

			@media only screen and (max-width: 450px) {
				.want-to-talk-popup {
					background: white;
				}

				.want-to-talk-popup h1 {
					font-size: 25px;
					line-height: 28px;
					padding: 0 0 8px;
				}

				.want-to-talk-popup .success,
				.want-to-talk-popup .form {
					max-width: 100%;
					top: 0;
					box-shadow: none;
					border: 0;
					border-radius: 0;
				}

				.want-to-talk-popup .form .wrap {
					border-radius: 0;
					box-shadow: 0 0 0 2px white;
				}

				.want-to-talk-popup .form:after {
					display: none;
				}
			}
		</style>

		<div class="form">
			<div class="loading">
				<div class="eye"></div>
			</div>
			<div class="wrap">
				<h1>Позвоним, напишем</h1>
				<h2>Оставь заявку, чтобы вступить в наш круг</h2>

				<form method="POST" onsubmit="return window.wantToTalkSubmit(this)">
					<div class="inputs">
						<input type="text" name="name" placeholder="Имя" required>
						<input type="phone" name="phone" placeholder="+7 Телефон" required>
					</div>

					<h3>Выбери способ связи:</h3>

					<div class="switch">
						<input type="hidden" name="type" value="">
						<div rel="viber" class="switch-item">Viber</div>
						<div rel="telegram" class="switch-item">Telegram</div>
						<div rel="whatsup" class="switch-item">WhatsUp</div>
					</div>

					<button type="submit">Отправить</button>
					<div class="error"></div>
				</form>
			</div>
		</div>

		<div class="success">
			<h1>Заявка принята</h1>
			<h2>Кот скоро даст о себе знать</h2>
			<div class="image"></div>
			<div class="close">Закрыть</div>
		</div>
	`;

	popup.onclick = (e) => {
		console.log(e);

		if (e.target.classList.contains('switch-item')) {
			let type = e.target.getAttribute('rel');
			popup.querySelector('input[name="type"]').value = type;
			popup.querySelectorAll('.switch-item').forEach((item) => item.classList.remove('active'));
			e.target.classList.add('active');
		}

		if (e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
			e.preventDefault();
			e.stopPropagation();
			$.wantToTalkSubmit(popup.querySelector('form'));
			return false;
		}

		if (
			e.target.classList.contains('want-to-talk-popup') ||
			e.target.classList.contains('form') ||
			e.target.classList.contains('close')
		) {
			document.body.style.overflow = '';
			popup.classList.remove('visible');
			setTimeout(() => popup.classList.add('hidden'), 250);
		}

		return false;
	};

	document.body.appendChild(popup);

	$.wantToTalkSubmit = (self) => {
		if (popup.getAttribute('data-loading') === 'true') {
			return false;
		}

		console.log('submit', self);

		self.querySelector('.error').classList.remove('active');
		self.querySelector('.error').innerHTML = '';

		let name = self.querySelector('input[name="name"]')?.value;
		let phone = self.querySelector('input[name="phone"]')?.value;
		let type = self.querySelector('input[name="type"]')?.value;

		if (typeof name === 'string' && name.length > 0 && typeof phone === 'string' && phone.length > 0 && type) {
			let phoneRegex = /^(\+7|8)[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

			if (!phone.match(phoneRegex)) {
				self.querySelector('.error').classList.add('active');
				self.querySelector('.error').innerHTML = 'Некорректный номер телефона';
				return false;
			}

			popup.setAttribute('data-loading', 'true');

			(async () => {
				let query = buildQuery({ name, phone, type });
				let response;
				await delay(1000);

				try {
					response = await fetch(`https://kotbot.black/api/want-to-talk?${query}`).then((res) => res.text());
				} catch (e) {
					console.error(e);
				}

				if (response === 'OK') {
					await delay(1000);

					popup.style.overflow = 'hidden';
					popup.setAttribute('data-success', 'true');

					await delay(500);

					popup.querySelector('.form').remove();
					popup.style.overflow = '';
				} else {
					popup.setAttribute('data-loading', 'false');
					self.querySelector('.error').classList.add('active');
					self.querySelector('.error').innerHTML =
						typeof response === 'string' ? response : 'Произошла ошибка, попробуйте позже';
				}
			})();
		} else {
			self.querySelector('.error').classList.add('active');
			self.querySelector('.error').innerHTML = 'Заполните все обязательные поля';
			return false;
		}

		return false;
	};

	$.wantToTalkCallback = (self) => {
		reachGoal('call');
		popup.classList.remove('hidden');
		popup.classList.add('visible');
		document.body.style.overflow = 'hidden';
		popup.style.overflow = 'hidden';
		setTimeout(() => (popup.style.overflow = ''), 400);
	};

	/* Want To Talk */

	let script = document.createElement('script');
	script.setAttribute('src', 'https://unpkg.com/@vkontakte/superappkit@1.57.0/dist/index-umd.js');

	script.onload = () => {
		const { Config, Connect, ConnectEvents } = window.SuperAppKit;
		const buttons = document.querySelectorAll('button.onetap-auth, button.onetap-auth-outline, button.onetap-auth-black');

		Config.init({
			appId: VK_APP_ID,
		});

		Array.from(buttons).forEach((button) => {
			let type = 'login';

			if (button.classList.contains('onetap-auth')) type = 'authorization';
			else if (button.classList.contains('onetap-auth-black')) type = 'partners';
			button?.closest('div')?.addEventListener('click', () => reachGoal(type), false);

			const oneTapButton = Connect.buttonOneTapAuth({
				callback: function (e) {
					if (!e?.type) {
						return false;
					}

					console.log(e);
					reachGoal(type);

					if (e.type === ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS && e?.payload?.token && e?.payload?.uuid) {
						let query = buildQuery({
							code: e.payload.token,
							uuid: e.payload.uuid,
						});

						location.href = `https://kotbot.black/api/onetap?${query}`;
					} else {
						$.oneTapCallback(button);
					}

					return false;
				},

				options: {
					showAlternativeLogin: false,
					showAgreements: false,
					displayMode: 'default',
					langId: 0,
					buttonSkin: 'primary',
					buttonStyles: {
						borderRadius: 0,
						height: 60,
					},
				},
			});

			let selector = generateQuerySelector(button);
			let style = document.createElement('style');

			style.innerHTML = `
					${selector} {
						position: relative;
						overflow: hidden;
					}

					${selector} iframe {
						position: absolute;
						top: 0;
						left: 0;
						width: 100% !important;
						height: 100% !important;
						overflow: hidden;
						transform: scale(3);
						opacity: 0.01;
						filter: blur(20px);
					}
				`;

			button.appendChild(style);
			button.appendChild(oneTapButton.getFrame());
		});
	};

	document.head.appendChild(script);

	preload(
		'https://assets.kotbot.black/xd/eye.svg',
		'https://assets.kotbot.black/xd/ellipse.svg',
		'https://assets.kotbot.black/xd/sitting.svg',
		'https://assets.kotbot.black/xd/letscall-header.svg'
	);
})(window);
