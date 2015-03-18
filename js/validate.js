'use strict';

(function() {
	function topWalker(node, testFunc, lastParent){
		while(node && node !== lastParent){
			if (testFunc(node)){
				return node;
			}
			node = node.parentNode;
		}
	};

	window.usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

	function showError(groupNode, errorMessage) {
		groupNode.classList.add('has-error');
		var errorMessageNode = document.createElement('div');
		errorMessageNode.className = 'alert alert-danger';
		errorMessageNode.innerHTML = errorMessage;
		groupNode.appendChild(errorMessageNode);
	};


	function hideError(groupNode){
		groupNode.classList.remove('has-error');
		var errorMessageNode = groupNode.querySelector('.alert.alert-danger');
		if (errorMessageNode){
			errorMessageNode.parentNode.removeChild(errorMessageNode);
		};
	};




	var emailNode = document.getElementById("email");
	var emailHolder = topWalker(emailNode, function(oneOfParents){
		return oneOfParents.classList.contains('form-group');
	});
	var validateEmailTimeout;
	function validateEmail(){
		clearTimeout(validateEmailTimeout);
		validateEmailTimeout = setTimeout (function (){
		var emailNodeValue = emailNode.value.trim();
		hideError(emailHolder);
		if(!emailNodeValue){
			showError(emailHolder, "Введите e-mail. Поле обязательно для заполнения");
			submitButton.disabled = true;
			return false;
		};
		if(!/[^@]+@[^@\.]+\.[^@]+/.test(emailNodeValue)){
			showError(emailHolder, "Исправьте правописание. Ошибка в адресе  e-mailа");
			submitButton.disabled = true;
			return false;
		};
		if(window.usedEmails.indexOf(emailNodeValue) !== -1){
			showError(emailHolder, "Такой адрес уже зарегистрирован. Введите правильный e-mail");
			submitButton.disabled = true;
			return false;
		};
		submitButton.disabled = false;
		return true;
	}, 500);
   	};
	emailNode.addEventListener('keyup', validateEmail, false);
	emailNode.addEventListener('change', validateEmail, false);
	emailNode.addEventListener('blur', validateEmail, false);

	

	var passwordNode = document.getElementById("password");
	var passwordHolder = topWalker(passwordNode, function(oneOfParents){
		return oneOfParents.classList.contains('form-group');
	});
	var validatePasswordTimeout;
	function validatePassword(){
		clearTimeout(validatePasswordTimeout);
		validatePasswordTimeout = setTimeout (function (){
		var passwordNodeValue = passwordNode.value.trim();
		hideError(passwordHolder);
		if(!passwordNodeValue){
			showError(passwordHolder, "Введите пароль. Поле обязательно для заполнения");
			submitButton.disabled = true;
			return false;
		};
		if(/^[a-z]+$/i.test(passwordNodeValue) || /^\d+$/.test(passwordNodeValue)){
			showError(passwordHolder, "Введите пароль посложнее. Пароль должен состоять из чисел и букв");
			submitButton.disabled = true;
			return false;
		};
		if(passwordNodeValue.length < 5){
			showError(passwordHolder, "Слишком короткий пароль. Пароль должен состоять из более чем 5 символов");
			submitButton.disabled = true;
			return false;
		};
		if(!/^[a-z,0-9,_-]+$/i.test(passwordNodeValue)){
			showError(passwordHolder, "Пароль содержит запрещенные символы. Пароль должен состоять из латинских буков, цыфер, нижнего подчеркивания или минуса");
			submitButton.disabled = true;
			return false;
		};
		submitButton.disabled = false;
		return true;
	}, 500);
	};
	passwordNode.addEventListener('keyup', validatePassword, false);
	passwordNode.addEventListener('change', validatePassword, false);
	passwordNode.addEventListener('blur', validatePassword, false);

	

	var phoneNode = document.getElementById("phone");
	var phoneHolder = topWalker(phoneNode, function(oneOfParents){
		return oneOfParents.classList.contains('form-group');
	});
	var validatePhoneTimeout;
	function validatePhone(){
		clearTimeout(validatePhoneTimeout);
		validatePhoneTimeout = setTimeout (function (){
		var phoneNodeValue = phoneNode.value.trim();
		hideError(phoneHolder);
		if((phoneNodeValue !== '') & (!/^\+38\d{10}$/.test(phoneNodeValue))) {
			showError(phoneHolder, "Неверный формат ввода телефонного номера. Введите телефон в формате +380991234567");
			submitButton.disabled = true;
			return false;
		};
		submitButton.disabled = false;
		return true;
	}, 500);
	};
	phoneNode.addEventListener('keyup', validatePhone, false);
	phoneNode.addEventListener('change', validatePhone, false);
	phoneNode.addEventListener('blur', validatePhone, false);

	


	var checkBoxNode = document.getElementById("checkbox");
		var checkBoxHolder = topWalker(checkBoxNode, function(oneOfParents){
			return oneOfParents.classList.contains('form-group');
		});
		function validateCheckbox(){
			hideError(checkBoxHolder);
			var checkNode = document.querySelector("input");

			if (checkBoxNode.checked === false){
				showError(checkBoxHolder, "Не поставлена галочка 'согласен со всем'");
				submitButton.disabled = true;
				return false;
			};
			return true;
		};
		checkBoxNode.addEventListener('click', validateCheckbox, false);
		
	
	
	var submitButton = document.querySelector('button[type="submit"]');
	document.querySelector('form').addEventListener('submit', function(){
		var formIsValid;
		formIsValid = validateEmail() && validatePassword() && validateCheckbox();
		if (!formIsValid){
			submitButton.disabled = true;
			event.preventDefault();
		};
	}, false);

}());