/*==========================================================

                START VALIDATE SCRIPT

===========================================================*/
$(document).ready(applyClickHandlers);

function applyClickHandlers() {
    $('#form-info').on('click', '#first-next-btn', firstForm);
    $('#form-info').on('click', '#second-next-btn', secondForm);
    $('#form-info').on('click', '#submit-btn', submitForm);
    $('#modal-content').on('click', '#modal-btn', handleModal);
    $('#form-info').on('keypress', '#full-name', requireLetters);
    $('#form-info').on('keypress', '#zip-code', requireNumbers);
    $('#form-info').on('keypress', '#phone', requireNumbers);
    resetBorderColor();
}

var proceed = null;
var propertyValue = null;
var mortgageBalance = null;
var zipCode = null;
var selectAge = null;
var fullName = null
var address = null;
var selectAge = null;

// First Form Validation
function firstForm() {
    proceed = true;

    // Get input field values for first fieldset
    propertyValue = $('#property-value').val();
    mortgageBalance = $('#mortgage-balance').val();
    zipCode = $('#zip-code').val();

    // Simple validation at client's end
    // We simply change border color to red if empty field
    if (propertyValue == "" || propertyValue == " ") {
        $('#property-value').css('border-color', '#f44336');
        proceed = false;
    }
    if (mortgageBalance == "" || propertyValue == " ") {
        $('#mortgage-balance').css('border-color', '#f44336');
        proceed = false;
    }
    if (zipCode == "" || propertyValue == " ") {
        $('#zip-code').css('border-color', '#f44336');
        proceed = false;
    }

    // Everything looks good! proceed...
    if (proceed) {
        animateFirstForm();
    }
    return false;
}

// Animate first form when next button is clicked
function animateFirstForm() {
    $('#second').fadeIn('slow');
    $('#first').css({
        'display': 'none'
    });
}

// Second Form Validation
function secondForm() {
    proceed = true;

    // Get input field values for second fieldset
    selectAge = $('#select-age').val();
    fullName = $('#full-name').val();
    address = $('#address').val();

    // Simple validation at client's end
    // We simply change border color to red if empty field
    if (selectAge == "" || selectAge == " ") {
        $('#select-age').css('border-color', '#f44336');
        proceed = false;
    }
    if (fullName == "" || selectAge == "") {
        $('#full-name').css('border-color', '#f44336');
        proceed = false;
    }
    if (address == "" || selectAge == "") {
        $('#address').css('border-color', '#f44336');
        proceed = false;
    }

    // Everything looks good! proceed...
    if (proceed) {
       animateSecondForm();
    }
    return false;
}

// Animate second form when next button is clicked
function animateSecondForm() {
    $('#third').fadeIn('slow');
    $('#second').css({
        'display': 'none'
    });
}

// Submit Form Validation
function submitForm() {
    proceed = true;
    
    // Get input field values for third fieldset
    phone = $('#phone').val();

    // Simple validation at client's end
    // We simply change border color to red if empty field
    if (phone == "" || phone == " ") {
        $('#phone').css('border-color', '#f44336');
        proceed = false;
    }

    // Everything looks good! proceed...
    if (proceed) {
        showModal();
    }
    return false;
}

// Show modal when message has been sent
function showModal() {
    $('#modal-header h2').text('Thank You!');
    $('#modal-body > p').text('We will send you more information via email shortly.');
    $('#modal-shadow').css('display', 'block');
    $('#modal-content').fadeIn('fast');
}

// Close modal when button is clicked
function handleModal() {
    $('#modal-shadow').css('display', 'none');
    $('#modal-content').fadeOut('fast');
}

// Only allow alphabetical characters on input
function requireLetters(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[a-zåäö]/i);
    return pattern.test(value);
}

// Only allow numerical characters on input
function requireNumbers(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[0-9]*$/gm);
    return pattern.test(value);
}

// Reset previously set border colors and hide all message on .keyup() and .click()
function resetBorderColor() {
    // First form
    $('#property-value').click(function(){
        $('#property-value').css('border-color', '');
    });

    $('#mortgage-balance').click('', function(){
        $('#mortgage-balance').css('border-color', '');
    });

    $('#zip-code').keyup(function(){
        $("#zip-code").css('border-color', '');
    });

    // Second Form
    $('#select-age').click(function(){
        $('#select-age').css('border-color', '');
    });

    $('#full-name').keyup(function(){
        $('#full-name').css('border-color', '');
    });

    $('#address').keyup(function(){
        $('#address').css('border-color', '');
    });

    // Third Form
    $('#phone').keyup(function(){
        $('#phone').css('border-color', '');
    });

}