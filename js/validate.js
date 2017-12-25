/*==========================================================
                START VALIDATE SCRIPT
===========================================================*/
$(document).ready(initValidate);
var validate = null;

//Initialize on page load and instantiate validate object
function initValidate() {
    validate = new Validate();
    validate.init();
}

function Validate() {
    this.proceed = null;
    this.propertyValue = null;
    this.mortgageBalance = null;
    this.zipCode = null;
    this.selectAge = null;
    this.fullName = null
    this.address = null;
    this.phone = null;
    this.input = null;
    this.inputLength = null;

    this.init = function() {
        $('#form-info-container').on('click', '.first-next-btn', this.firstForm);
        $('#form-info-container').on('click', '.second-next-btn', this.secondForm);
        $('#form-info-container').on('click', '.submit-btn', this.submitForm.bind(this));
        $('#form-info').on('keypress', '#full-name', this.requireLetters);
        $('#form-info').on('keypress', '#zip-code', this.requireNumbers);
        $('#form-info').on('keypress', '#phone', this.phoneFormat);
        this.resetBorderColor();
        this.closeModal();
    }

    this.firstForm = function() {
        this.proceed = true;

        // Get input field values for first fieldset
        this.propertyValue = $('#property-value').val();
        this.mortgageBalance = $('#mortgage-balance').val();
        this.zipCode = $('#zip-code').val();

        // Validation at client's end
        // We simply change border color to red if empty field
        if (this.propertyValue == "" || this.propertyValue == " ") {
            $('#property-value').css('border-color', '#f44336');
            this.proceed = false;
        }
        if (this.mortgageBalance == "" || this.propertyValue == " ") {
            $('#mortgage-balance').css('border-color', '#f44336');
            this.proceed = false;
        }
        if (this.zipCode == "" || this.zipCode.length < 5 || this.propertyValue == " ") {
            $('#zip-code').css('border-color', '#f44336');
            this.proceed = false;
        }
        // Everything looks good! proceed...
        if (this.proceed) {
            // Animate first form when next button is clicked and change button class
            $('#form-btn').removeClass('first-next-btn');
            $('#form-btn').addClass('second-next-btn');
            $('#first').css({ 'display': 'none' });
            $('#second').fadeIn('slow');
        }
        return false;
    }

    this.secondForm = function() {
        this.proceed = true;

        // Get input field values for second fieldset
        this.selectAge = $('#select-age').val();
        this.fullName = $('#full-name').val();
        this.address = $('#address').val();

        // Validation at client's end
        // We simply change border color to red if empty field
        if (this.selectAge == "" || this.selectAge == " ") {
            $('#select-age').css('border-color', '#f44336');
            this.proceed = false;
        }
        if (this.fullName == "" || this.selectAge == "") {
            $('#full-name').css('border-color', '#f44336');
            this.proceed = false;
        }
        if (this.address == "" || this.selectAge == "") {
            $('#address').css('border-color', '#f44336');
            this.proceed = false;
        }

        // Everything looks good! proceed...
        if (this.proceed) {
            // Animate second form when next button is clicked and change button class
            $('#form-btn').removeClass('second-next-btn');
            $('#form-btn').addClass('submit-btn');
            $('#form-btn span').text('submit');
            $('#second').css({ 'display': 'none' });
            $('#third').fadeIn('slow');
        }
        return false;
    }

    this.submitForm = function() {
        this.proceed = true;

        // Get input field values for third fieldset
        this.phone = $('#phone').val();

        // Validation at client's end
        // We simply change border color to red if empty field
        if (this.phone == "" || this.phone == " " || this.phone.length < 10) {
            $('#phone').css('border-color', '#f44336');
            this.proceed = false;
        }

        // Everything looks good! proceed...
        if (this.proceed) {
            // Reset form and show modal
            $('#form-info')[0].reset();
            this.showModal();

            // Animate back to first form when submit button is clicked and change button class
            $('#form-btn').removeClass('submit-btn');
            $('#form-btn').addClass('first-next-btn');
            $('#form-btn span').text('next');
            $('#third').css({ 'display': 'none' });
            $('#first').fadeIn('slow');
        }
        return false;
    }

    // Only allow alphabetical characters on input
    this.requireLetters = function(e) {
        var value = String.fromCharCode(e.which);
        var pattern = new RegExp(/[a-zåäö]/i);
        if (value == " ") return;
        return pattern.test(value);
    }

    // Only allow numerical characters on input
    this.requireNumbers = function(e) {
        var value = String.fromCharCode(e.which);
        var pattern = new RegExp(/^[0-9]*$/gm);
        return pattern.test(value);
    }

    // Format phone number - input: 1112223333, output: (111) 222-3333
    this.phoneFormat = function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) return false;
        // Get input value and length
        this.input = $(this).val();
        this.inputLength = this.value.length;
        
        if (this.inputLength == 3 && this.input.indexOf("(") <= -1) {
            $(this).val("(" + this.input + ")" + "-");
        }
        if (this.inputLength == 4 && this.input.indexOf("(") > -1) {
            $(this).val(this.input + ")-");
        }
        if (this.inputLength == 5 && this.input.indexOf(")") > -1) {
            $(this).val(this.input + "-");
        }
        if (this.inputLength == 9) {
            $(this).val(this.input + "-");
            $(this).attr('maxlength', '14');
        }
    }

    // Reset previously set border colors and hide all message on .keyup() and .click()
    this.resetBorderColor = function() {
        $('#property-value, #mortgage-balance, #zip-code, #select-age, #full-name, #address, #phone')
            .click( function() {
                $(this).css('border-color', '');
        });
    }

    // Close modal when button is clicked
    this.closeModal = function() {
        $('#modal-btn').on('click', this.hideModal.bind(this));
    }

    // Hide modal when close button is clicked
    this.hideModal = function() {
        $('#modal-shadow').css('display', 'none');
        $('#modal-content').fadeOut('fast');
    }

    // Show modal when message has been sent
    this.showModal = function() {
        $('#modal-header h2').text('Thank You!');
        $('#modal-body > p').text('We will send you more information by mail in a few days.');
        $('#modal-shadow').css('display', 'block');
        $('#modal-content').fadeIn('fast');
    }

}