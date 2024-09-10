$(document).ready(function () {
    $('#phone').on('input', function () {
        let value = $(this).val();
        let cleanedValue = value.replace(/[^0-9+]/g, '');  
        let hasPlus = cleanedValue.startsWith('+'); 
        if (hasPlus) {
            cleanedValue = cleanedValue.slice(1);
        }

        let formattedValue = '+';
        if (cleanedValue.length > 0) {
            if (cleanedValue.length <= 3) {
                formattedValue += cleanedValue;
            } else if (cleanedValue.length <= 5) {
                formattedValue += cleanedValue.slice(0, 3) + ' ' + cleanedValue.slice(3);
            } else if (cleanedValue.length <= 8) {
                formattedValue += cleanedValue.slice(0, 3) + ' ' + cleanedValue.slice(3, 5) + ' ' + cleanedValue.slice(5);
            } else if (cleanedValue.length <= 12) {
                formattedValue += cleanedValue.slice(0, 3) + ' ' + cleanedValue.slice(3, 5) + ' ' + cleanedValue.slice(5, 8) + ' ' + cleanedValue.slice(8);
            } else {
                formattedValue += cleanedValue.slice(0, 3) + ' ' + cleanedValue.slice(3, 5) + ' ' + cleanedValue.slice(5, 8) + ' ' + cleanedValue.slice(8, 12) + ' ' + cleanedValue.slice(12);
            }
        }

        $(this).val(formattedValue);
    });

    $('#card_type').on('change', function() {
        updateCardLogo();
    });

    function updateCardLogo() {
        var selectedOption = $('#card_type option:selected');
        var logoUrl = selectedOption.data('logo');

        $('#card_logo_img').fadeOut(250, function() {
            $(this).attr('src', logoUrl).fadeIn(250);
        });
    }


    function validateName() {
        var nameField = $('input[name="name"]');
        var value = nameField.val();
        var regex = /^[a-zA-Zа-яА-ЯёЁїЇіІєЄ\s]+$/;
        if (!regex.test(value)) {
            showError(nameField, "Введіть коректне ім'я або прізвище (без цифр)");
            return false;
        } else {
            hideError(nameField);
            return true;
        }
    }

    function validateCity() {
        var cityField = $('input[name="city"]');
        var value = cityField.val();
        var regex = /^[a-zA-Zа-яА-ЯёЁїЇіІєЄ\s]+$/;
        if (!regex.test(value)) {
            showError(cityField, "Назва міста не повинна містити цифри");
            return false;
        } else {
            hideError(cityField);
            return true;
        }
    }

    function validateStreet() {
        var streetField = $('input[name="street"]');
        var value = streetField.val().trim();
        if (value.length === 0) {
            showError(streetField, 'Введіть вулицю');
            return false;
        } else {
            hideError(streetField);
            return true;
        }
    }

    function validateCardNumber() {
        var cardNumberField = $('input[name="card_number"]');
        var value = cardNumberField.val().replace(/\s+/g, '');
        if (value.length !== 16) {
            showError(cardNumberField, 'Номер картки повинен містити 16 цифр');
            return false;
        } else {
            hideError(cardNumberField);
            return true;
        }
    }

    function validateExpiryDate() {
        var expiryDateField = $('input[name="expiry_data"]');
        var value = expiryDateField.val().replace(/\s+/g, '');
        var regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(value)) {
            showError(expiryDateField, 'Введіть коректний строк дії у форматі MM/YY');
            return false;
        } else {
            hideError(expiryDateField);
            return true;
        }
    }

    function validateCVC() {
        var cvcField = $('input[name="cvc"]');
        var value = cvcField.val();
        if (value.length !== 3 || !$.isNumeric(value)) {
            showError(cvcField, 'CVC повинен містити 3 цифри');
            return false;
        } else {
            hideError(cvcField);
            return true;
        }
    }

    function validatePhoneNumber() {
        var phoneField = $('#phone');
        var value = phoneField.val().replace(/\D+/g, '');
        if (value.length !== 12) {
            showError(phoneField, 'Номер телефону повинен містити рівно 12 цифр');
            return false;
        } else {
            hideError(phoneField);
            return true;
        }
    }
    function showError(element, message) {
        element.next('.invalid-feedback').remove();
        element.after('<div class="invalid-feedback" style="display: block;">' + message + '</div>');
    }


    function hideError(element) {
        element.next('.invalid-feedback').remove();
    }


    $('#verify-button').on('click', function() {
        var isValid = true;

        if (!validateName()) {
            isValid = false;
        }

        if (!validateCity()) {
            isValid = false;
        }

        if (!validateStreet()) {
            isValid = false;
        }

        if (!validateCardNumber()) {
            isValid = false;
        }

        if (!validateExpiryDate()) {
            isValid = false;
        }

        if (!validateCVC()) {
            isValid = false;
        }

        if (!validatePhoneNumber()) {
            isValid = false;
        }

        if (isValid) {
            $('#verify-button').fadeOut(300, function() {
                $('#submit-button').fadeIn(300).addClass('visible');
            });
        } else {
            $('#payment-form')[0].reportValidity();
        }
    });

    $('#payment-form input').on('input', function() {
        if ($('#submit-button').is(':visible')) {
            $('#submit-button').fadeOut(300, function() {
                $('#verify-button').fadeIn(300).addClass('visible');
            });
        }
    });
});