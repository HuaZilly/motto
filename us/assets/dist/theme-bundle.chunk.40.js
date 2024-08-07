(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "./assets/js/theme/account.js":
/*!************************************!*\
  !*** ./assets/js/theme/account.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Account; });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "./node_modules/lodash/reduce.js");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_payment_method__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/payment-method */ "./assets/js/theme/common/payment-method.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }










var Account = /*#__PURE__*/function (_PageManager) {
  function Account(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__["createTranslationDictionary"])(context);
    _this.$state = $('[data-field-type="State"]');
    _this.$body = $('body');
    return _this;
  }
  _inheritsLoose(Account, _PageManager);
  var _proto = Account.prototype;
  _proto.onReady = function onReady() {
    var $editAccountForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-edit-account-form]');
    var $addressForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-address-form]');
    var $inboxForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-inbox-form]');
    var $accountReturnForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-return-form]');
    var $paymentMethodForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-payment-method-form]');
    var $reorderForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-reorder-form]');
    var $invoiceButton = $('[data-print-invoice]');
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context.urls);

    // Injected via template
    this.passwordRequirements = this.context.passwordRequirements;

    // Instantiates wish list JS
    _wishlist__WEBPACK_IMPORTED_MODULE_4__["default"].load(this.context);
    if ($editAccountForm.length) {
      this.registerEditAccountValidation($editAccountForm);
      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }
    if ($invoiceButton.length) {
      $invoiceButton.on('click', function () {
        var left = window.screen.availWidth / 2 - 450;
        var top = window.screen.availHeight / 2 - 320;
        var url = $invoiceButton.data('printInvoice');
        window.open(url, 'orderInvoice', "width=900,height=650,left=" + left + ",top=" + top + ",scrollbars=1");
      });
    }
    if ($addressForm.length) {
      this.initAddressFormValidation($addressForm);
      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }
    if ($inboxForm.length) {
      this.registerInboxValidation($inboxForm);
    }
    if ($accountReturnForm.length) {
      this.initAccountReturnFormValidation($accountReturnForm);
    }
    if ($paymentMethodForm.length) {
      this.initPaymentMethodFormValidation($paymentMethodForm);
    }
    if ($reorderForm.length) {
      this.initReorderForm($reorderForm);
    }
    this.bindDeleteAddress();
    this.bindDeletePaymentMethod();
  }

  /**
   * Binds a submit hook to ensure the customer receives a confirmation dialog before deleting an address
   */;
  _proto.bindDeleteAddress = function bindDeleteAddress() {
    $('[data-delete-address]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deleteAddress');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.bindDeletePaymentMethod = function bindDeletePaymentMethod() {
    $('[data-delete-payment-method]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deletePaymentMethod');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.initReorderForm = function initReorderForm($reorderForm) {
    var _this2 = this;
    $reorderForm.on('submit', function (event) {
      var $productReorderCheckboxes = $('.account-listItem .form-checkbox:checked');
      var submitForm = false;
      $reorderForm.find('[name^="reorderitem"]').remove();
      $productReorderCheckboxes.each(function (index, productCheckbox) {
        var productId = $(productCheckbox).val();
        var $input = $('<input>', {
          type: 'hidden',
          name: "reorderitem[" + productId + "]",
          value: '1'
        });
        submitForm = true;
        $reorderForm.append($input);
      });
      if (!submitForm) {
        event.preventDefault();
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: _this2.context.selectItem,
          icon: 'error'
        });
      }
    });
  };
  _proto.initAddressFormValidation = function initAddressFormValidation($addressForm) {
    var _this3 = this;
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($addressForm, this.context);
    var stateSelector = 'form[data-address-form] [data-field-type="State"]';
    var $stateElement = $(stateSelector);
    var addressValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-address-form] input[type="submit"]'
    });
    addressValidator.add(validationModel);
    if ($stateElement) {
      var $last;

      // Requests the states for a country with AJAX
      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }
        var $field = $(field);
        if (addressValidator.getStatus($stateElement) !== 'undefined') {
          addressValidator.remove($stateElement);
        }
        if ($last) {
          addressValidator.remove($last);
        }
        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(addressValidator, field, _this3.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
        }
      });
    }
    $addressForm.on('submit', function (event) {
      addressValidator.performCheck();
      if (addressValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.initAccountReturnFormValidation = function initAccountReturnFormValidation($accountReturnForm) {
    var errorMessage = $accountReturnForm.data('accountReturnFormError');
    $accountReturnForm.on('submit', function (event) {
      var formSubmit = false;

      // Iterate until we find a non-zero value in the dropdown for quantity
      $('[name^="return_qty"]', $accountReturnForm).each(function (i, ele) {
        if (parseInt($(ele).val(), 10) !== 0) {
          formSubmit = true;

          // Exit out of loop if we found at least one return
          return true;
        }
      });
      if (formSubmit) {
        return true;
      }
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: errorMessage,
        icon: 'error'
      });
      return event.preventDefault();
    });
  };
  _proto.initPaymentMethodFormValidation = function initPaymentMethodFormValidation($paymentMethodForm) {
    var _this4 = this;
    // Inject validations into form fields before validation runs
    $paymentMethodForm.find('#first_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.firstNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#last_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.lastNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#company.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.companyLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#phone.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.phoneLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address1.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address1Label + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address2.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address2Label + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#city.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.cityLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#country.form-field').attr('data-validation', "{ \"type\": \"singleselect\", \"label\": \"" + this.context.countryLabel + "\", \"required\": true, prefix: \"" + this.context.chooseCountryLabel + "\" }");
    $paymentMethodForm.find('#state.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.stateLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#postal_code.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.postalCodeLabel + "\", \"required\": true, \"maxlength\": 0 }");
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($paymentMethodForm, this.context);
    var paymentMethodSelector = 'form[data-payment-method-form]';
    var paymentMethodValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: paymentMethodSelector + " input[type=\"submit\"]"
    });
    var $stateElement = $(paymentMethodSelector + " [data-field-type=\"State\"]");
    var $last;
    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
      if (err) {
        throw new Error(err);
      }
      var $field = $(field);
      if (paymentMethodValidator.getStatus($stateElement) !== 'undefined') {
        paymentMethodValidator.remove($stateElement);
      }
      if ($last) {
        paymentMethodValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(paymentMethodValidator, field, _this4.validationDictionary.field_not_blank);
      } else {
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
      }
    });

    // Use credit card number input listener to highlight credit card type
    var cardType;
    $(paymentMethodSelector + " input[name=\"credit_card_number\"]").on('keyup', function (_ref) {
      var target = _ref.target;
      cardType = Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["creditCardType"])(target.value);
      if (cardType) {
        $(paymentMethodSelector + " img[alt=\"" + cardType + "\"]").siblings().css('opacity', '.2');
      } else {
        $(paymentMethodSelector + " img").css('opacity', '1');
      }
    });

    // Set of credit card validation
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCreditCardNumberValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"credit_card_number\"]", this.context.creditCardNumber);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setExpirationValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"expiration\"]", this.context.expiration);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setNameOnCardValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"name_on_card\"]", this.context.nameOnCard);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCvvValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"cvv\"]", this.context.cvv, function () {
      return cardType;
    });

    // Set of credit card format
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setCreditCardNumberFormat(paymentMethodSelector + " input[name=\"credit_card_number\"]");
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setExpirationFormat(paymentMethodSelector + " input[name=\"expiration\"]");

    // Billing address validation
    paymentMethodValidator.add(validationModel);
    $paymentMethodForm.on('submit', function (event) {
      event.preventDefault();
      // Perform final form validation
      paymentMethodValidator.performCheck();
      if (paymentMethodValidator.areAll('valid')) {
        // Serialize form data and reduce it to object
        var data = lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()($paymentMethodForm.serializeArray(), function (obj, item) {
          var refObj = obj;
          refObj[item.name] = item.value;
          return refObj;
        }, {});

        // Assign country and state code
        var country = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(_this4.context.countries, function (_ref2) {
          var value = _ref2.value;
          return value === data.country;
        });
        var state = country && lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(country.states, function (_ref3) {
          var value = _ref3.value;
          return value === data.state;
        });
        data.country_code = country ? country.code : data.country;
        data.state_or_province_code = state ? state.code : data.state;

        // Default Instrument
        data.default_instrument = !!data.default_instrument;

        // Store credit card
        Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["storeInstrument"])(_this4.context, data, function () {
          window.location.href = _this4.context.paymentMethodsUrl;
        }, function () {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: _this4.context.generic_error,
            icon: 'error'
          });
        });
      }
    });
  };
  _proto.registerEditAccountValidation = function registerEditAccountValidation($editAccountForm) {
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($editAccountForm, this.context);
    var formEditSelector = 'form[data-edit-account-form]';
    var editValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: '${formEditSelector} input[type="submit"]'
    });
    var emailSelector = formEditSelector + " [data-field-type=\"EmailAddress\"]";
    var $emailElement = $(emailSelector);
    var passwordSelector = formEditSelector + " [data-field-type=\"Password\"]";
    var $passwordElement = $(passwordSelector);
    var password2Selector = formEditSelector + " [data-field-type=\"ConfirmPassword\"]";
    var $password2Element = $(password2Selector);
    var currentPasswordSelector = formEditSelector + " [data-field-type=\"CurrentPassword\"]";
    var $currentPassword = $(currentPasswordSelector);

    // This only handles the custom fields, standard fields are added below
    editValidator.add(validationModel);
    if ($emailElement) {
      editValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setEmailValidation(editValidator, emailSelector, this.validationDictionary.valid_email);
    }
    if ($passwordElement && $password2Element) {
      var _this$validationDicti = this.validationDictionary,
        enterPassword = _this$validationDicti.password,
        matchPassword = _this$validationDicti.password_match,
        invalidPassword = _this$validationDicti.invalid_password;
      editValidator.remove(passwordSelector);
      editValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setPasswordValidation(editValidator, passwordSelector, password2Selector, this.passwordRequirements, Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword), true);
    }
    if ($currentPassword) {
      editValidator.add({
        selector: currentPasswordSelector,
        validate: function validate(cb, val) {
          var result = true;
          if (val === '' && $passwordElement.val() !== '') {
            result = false;
          }
          cb(result);
        },
        errorMessage: this.context.currentPassword
      });
    }
    editValidator.add([{
      selector: formEditSelector + " input[name='account_firstname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.firstName
    }, {
      selector: formEditSelector + " input[name='account_lastname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.lastName
    }]);
    $editAccountForm.on('submit', function (event) {
      editValidator.performCheck();
      if (editValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerInboxValidation = function registerInboxValidation($inboxForm) {
    var inboxValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-inbox-form] input[type="submit"]'
    });
    inboxValidator.add([{
      selector: 'form[data-inbox-form] select[name="message_order_id"]',
      validate: function validate(cb, val) {
        var result = Number(val) !== 0;
        cb(result);
      },
      errorMessage: this.context.enterOrderNum
    }, {
      selector: 'form[data-inbox-form] input[name="message_subject"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterSubject
    }, {
      selector: 'form[data-inbox-form] textarea[name="message_content"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterMessage
    }]);
    $inboxForm.on('submit', function (event) {
      inboxValidator.performCheck();
      if (inboxValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  return Account;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/form-validation.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");


/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */
function buildDateValidation($formField, validation) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
}

/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 * @param errorText provides error validation message
 */
function buildRequiredCheckboxValidation(validation, $formField, errorText) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: errorText
  };
}
function buildRequiredValidation(validation, selector, errorText) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: errorText
  };
}
function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}
function buildValidation($validateableElement, errorMessage) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');
  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation);
    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation(validation, $validateableElement, errorMessage));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";
      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }
      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector, errorMessage));
      }
    });
  }
  return fieldValidations;
}

/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @param context provides access for error messages on required fields validation
 * @returns {Array}
 */
/* harmony default export */ __webpack_exports__["default"] = (function ($form, context) {
  var validationsToPerform = [];
  var _createTranslationDic = Object(_utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__["createTranslationDictionary"])(context),
    requiredFieldValidationText = _createTranslationDic.field_not_blank;
  $form.find('[data-validation]').each(function (index, input) {
    var getLabel = function getLabel($el) {
      return $el.first().data('validation').label;
    };
    var requiredValidationMessage = getLabel($(input)) + requiredFieldValidationText;
    validationsToPerform = validationsToPerform.concat(buildValidation($(input), requiredValidationMessage));
  });
  return validationsToPerform;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/payment-method.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/payment-method.js ***!
  \**************************************************/
/*! exports provided: creditCardType, storeInstrument, Formatters, Validators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "creditCardType", function() { return creditCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeInstrument", function() { return storeInstrument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formatters", function() { return Formatters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! creditcards */ "./node_modules/creditcards/index.js");
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(creditcards__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Omit null or empty string properties of object
 * @param {Object} object
 * @returns {Object}
 */
var omitNullString = function omitNullString(obj) {
  var refObj = obj;
  $.each(refObj, function (key, value) {
    if (value === null || value === '') {
      delete refObj[key];
    }
  });
  return refObj;
};

/**
 * Get credit card type from credit card number
 * @param {string} value
 */
var creditCardType = function creditCardType(value) {
  return creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.type(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(value), true);
};

/**
 * Wrapper for ajax request to store a new instrument in bigpay
 * @param {object} Representing the data needed for the header
 * @param {object} Representing the data needed for the body
 * @param {function} done Function to execute on a successful response
 * @param {function} fail Function to execute on a unsuccessful response
 */
var storeInstrument = function storeInstrument(_ref, _ref2, done, fail) {
  var paymentsUrl = _ref.paymentsUrl,
    shopperId = _ref.shopperId,
    storeHash = _ref.storeHash,
    vaultToken = _ref.vaultToken;
  var provider_id = _ref2.provider_id,
    currency_code = _ref2.currency_code,
    credit_card_number = _ref2.credit_card_number,
    expiration = _ref2.expiration,
    name_on_card = _ref2.name_on_card,
    cvv = _ref2.cvv,
    default_instrument = _ref2.default_instrument,
    address1 = _ref2.address1,
    address2 = _ref2.address2,
    city = _ref2.city,
    postal_code = _ref2.postal_code,
    state_or_province_code = _ref2.state_or_province_code,
    country_code = _ref2.country_code,
    company = _ref2.company,
    first_name = _ref2.first_name,
    last_name = _ref2.last_name,
    email = _ref2.email,
    phone = _ref2.phone;
  var expiry = expiration.split('/');
  $.ajax({
    url: paymentsUrl + "/stores/" + storeHash + "/customers/" + shopperId + "/stored_instruments",
    dataType: 'json',
    method: 'POST',
    cache: false,
    headers: {
      Authorization: vaultToken,
      Accept: 'application/vnd.bc.v1+json',
      'Content-Type': 'application/vnd.bc.v1+json'
    },
    data: JSON.stringify({
      instrument: {
        type: 'card',
        cardholder_name: name_on_card,
        number: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(credit_card_number),
        expiry_month: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.month.parse(expiry[0]),
        expiry_year: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.year.parse(expiry[1], true),
        verification_value: cvv
      },
      billing_address: omitNullString({
        address1: address1,
        address2: address2,
        city: city,
        postal_code: postal_code,
        state_or_province_code: state_or_province_code,
        country_code: country_code,
        company: company,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
      }),
      provider_id: provider_id,
      default_instrument: default_instrument,
      currency_code: currency_code
    })
  }).done(done).fail(fail);
};
var Formatters = {
  /**
   * Sets up a format for credit card number
   * @param field
   */
  setCreditCardNumberFormat: function setCreditCardNumberFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref3) {
        var target = _ref3.target;
        var refTarget = target;
        refTarget.value = creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.format(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(target.value));
      });
    }
  },
  /**
   * Sets up a format for expiration date
   * @param field
   */
  setExpirationFormat: function setExpirationFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref4) {
        var target = _ref4.target,
          which = _ref4.which;
        var refTarget = target;
        if (which === 8 && /.*(\/)$/.test(target.value)) {
          refTarget.value = target.value.slice(0, -1);
        } else if (target.value.length > 4) {
          refTarget.value = target.value.slice(0, 5);
        } else if (which !== 8) {
          refTarget.value = target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^([0-1])([3-9])$/g, '0$1/$2').replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2').replace(/^([0]+)\/|[0]+$/g, '0').replace(/[^\d\/]|^[\/]*$/g, '').replace(/\/\//g, '/');
        }
      });
    }
  }
};
var Validators = {
  /**
   * Sets up a validation for credit card number
   * @param validator
   * @param field
   * @param errorMessage
   */
  setCreditCardNumberValidation: function setCreditCardNumberValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.isValid(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(val));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for expiration date
   * @param validator
   * @param field
   * @param errorMessage
   */
  setExpirationValidation: function setExpirationValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var expiry = val.split('/');
          var result = val.length && /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val);
          result = result && !creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.isPast(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.month.parse(expiry[0]), creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.year.parse(expiry[1], true));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for name on card
   * @param validator
   * @param field
   * @param errorMessage
   */
  setNameOnCardValidation: function setNameOnCardValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = !!val.length;
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for cvv
   * @param validator
   * @param field
   * @param errorMessage
   * @param {any} cardType The credit card number type
   */
  setCvvValidation: function setCvvValidation(validator, field, errorMessage, cardType) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var type = typeof cardType === 'function' ? cardType() : cardType;
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.cvc.isValid(val, type);
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2Zvcm0tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3BheW1lbnQtbWV0aG9kLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sIm5hbWVzIjpbIkFjY291bnQiLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCIkc3RhdGUiLCIkIiwiJGJvZHkiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCIkZWRpdEFjY291bnRGb3JtIiwiY2xhc3NpZnlGb3JtIiwiJGFkZHJlc3NGb3JtIiwiJGluYm94Rm9ybSIsIiRhY2NvdW50UmV0dXJuRm9ybSIsIiRwYXltZW50TWV0aG9kRm9ybSIsIiRyZW9yZGVyRm9ybSIsIiRpbnZvaWNlQnV0dG9uIiwiY29tcGFyZVByb2R1Y3RzIiwidXJscyIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwiV2lzaGxpc3QiLCJsb2FkIiwibGVuZ3RoIiwicmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24iLCJpcyIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJvbiIsImxlZnQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwidG9wIiwiYXZhaWxIZWlnaHQiLCJ1cmwiLCJkYXRhIiwib3BlbiIsImluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24iLCJyZWdpc3RlckluYm94VmFsaWRhdGlvbiIsImluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24iLCJpbml0UGF5bWVudE1ldGhvZEZvcm1WYWxpZGF0aW9uIiwiaW5pdFJlb3JkZXJGb3JtIiwiYmluZERlbGV0ZUFkZHJlc3MiLCJiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCIsImV2ZW50IiwibWVzc2FnZSIsImN1cnJlbnRUYXJnZXQiLCJjb25maXJtIiwicHJldmVudERlZmF1bHQiLCJfdGhpczIiLCIkcHJvZHVjdFJlb3JkZXJDaGVja2JveGVzIiwic3VibWl0Rm9ybSIsImZpbmQiLCJyZW1vdmUiLCJlYWNoIiwiaW5kZXgiLCJwcm9kdWN0Q2hlY2tib3giLCJwcm9kdWN0SWQiLCJ2YWwiLCIkaW5wdXQiLCJ0eXBlIiwibmFtZSIsInZhbHVlIiwiYXBwZW5kIiwic3dhbCIsImZpcmUiLCJ0ZXh0Iiwic2VsZWN0SXRlbSIsImljb24iLCJfdGhpczMiLCJ2YWxpZGF0aW9uTW9kZWwiLCJ2YWxpZGF0aW9uIiwic3RhdGVTZWxlY3RvciIsIiRzdGF0ZUVsZW1lbnQiLCJhZGRyZXNzVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwiYWRkIiwiJGxhc3QiLCJzdGF0ZUNvdW50cnkiLCJlcnIiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiVmFsaWRhdG9ycyIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJmaWVsZF9ub3RfYmxhbmsiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZXJyb3JNZXNzYWdlIiwiZm9ybVN1Ym1pdCIsImkiLCJlbGUiLCJwYXJzZUludCIsIl90aGlzNCIsImF0dHIiLCJmaXJzdE5hbWVMYWJlbCIsImxhc3ROYW1lTGFiZWwiLCJjb21wYW55TGFiZWwiLCJwaG9uZUxhYmVsIiwiYWRkcmVzczFMYWJlbCIsImFkZHJlc3MyTGFiZWwiLCJjaXR5TGFiZWwiLCJjb3VudHJ5TGFiZWwiLCJjaG9vc2VDb3VudHJ5TGFiZWwiLCJzdGF0ZUxhYmVsIiwicG9zdGFsQ29kZUxhYmVsIiwicGF5bWVudE1ldGhvZFNlbGVjdG9yIiwicGF5bWVudE1ldGhvZFZhbGlkYXRvciIsImNhcmRUeXBlIiwiX3JlZiIsInRhcmdldCIsImNyZWRpdENhcmRUeXBlIiwic2libGluZ3MiLCJjc3MiLCJDQ1ZhbGlkYXRvcnMiLCJzZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbiIsImNyZWRpdENhcmROdW1iZXIiLCJzZXRFeHBpcmF0aW9uVmFsaWRhdGlvbiIsImV4cGlyYXRpb24iLCJzZXROYW1lT25DYXJkVmFsaWRhdGlvbiIsIm5hbWVPbkNhcmQiLCJzZXRDdnZWYWxpZGF0aW9uIiwiY3Z2IiwiQ0NGb3JtYXR0ZXJzIiwic2V0Q3JlZGl0Q2FyZE51bWJlckZvcm1hdCIsInNldEV4cGlyYXRpb25Gb3JtYXQiLCJfcmVkdWNlIiwic2VyaWFsaXplQXJyYXkiLCJvYmoiLCJpdGVtIiwicmVmT2JqIiwiY291bnRyeSIsIl9maW5kIiwiY291bnRyaWVzIiwiX3JlZjIiLCJzdGF0ZSIsInN0YXRlcyIsIl9yZWYzIiwiY291bnRyeV9jb2RlIiwiY29kZSIsInN0YXRlX29yX3Byb3ZpbmNlX2NvZGUiLCJkZWZhdWx0X2luc3RydW1lbnQiLCJzdG9yZUluc3RydW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJwYXltZW50TWV0aG9kc1VybCIsImdlbmVyaWNfZXJyb3IiLCJmb3JtRWRpdFNlbGVjdG9yIiwiZWRpdFZhbGlkYXRvciIsImVtYWlsU2VsZWN0b3IiLCIkZW1haWxFbGVtZW50IiwicGFzc3dvcmRTZWxlY3RvciIsIiRwYXNzd29yZEVsZW1lbnQiLCJwYXNzd29yZDJTZWxlY3RvciIsIiRwYXNzd29yZDJFbGVtZW50IiwiY3VycmVudFBhc3N3b3JkU2VsZWN0b3IiLCIkY3VycmVudFBhc3N3b3JkIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRfZW1haWwiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJlbnRlclBhc3N3b3JkIiwicGFzc3dvcmQiLCJtYXRjaFBhc3N3b3JkIiwicGFzc3dvcmRfbWF0Y2giLCJpbnZhbGlkUGFzc3dvcmQiLCJpbnZhbGlkX3Bhc3N3b3JkIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0Iiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwicmVzdWx0IiwiY3VycmVudFBhc3N3b3JkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJpbmJveFZhbGlkYXRvciIsIk51bWJlciIsImVudGVyT3JkZXJOdW0iLCJlbnRlclN1YmplY3QiLCJlbnRlck1lc3NhZ2UiLCJQYWdlTWFuYWdlciIsImJ1aWxkRGF0ZVZhbGlkYXRpb24iLCIkZm9ybUZpZWxkIiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsImludmFsaWRNZXNzYWdlIiwiZm9ybUVsZW1lbnRJZCIsIm1pblNwbGl0Iiwic3BsaXQiLCJtYXhTcGxpdCIsIm1pbkRhdGUiLCJEYXRlIiwibWF4RGF0ZSIsInRyaWdnZXJlZEJ5IiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiY2hvc2VuRGF0ZSIsImJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24iLCJlcnJvclRleHQiLCJmb3JtRmllbGRJZCIsInByaW1hcnlTZWxlY3RvciIsInNlY29uZGFyeVNlbGVjdG9yIiwiY2hlY2tib3giLCJjaGVja2VkIiwiYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24iLCJidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbiIsImZvcm1GaWVsZFNlbGVjdG9yIiwibGFiZWwiLCJtaW4iLCJtYXgiLCJudW1iZXJWYWwiLCJidWlsZFZhbGlkYXRpb24iLCIkdmFsaWRhdGVhYmxlRWxlbWVudCIsImZpZWxkVmFsaWRhdGlvbnMiLCJkYXRlVmFsaWRhdGlvbiIsInB1c2giLCJyZXF1aXJlZCIsImVsZW1lbnQiLCIkaW5wdXRFbGVtZW50IiwidGFnTmFtZSIsImdldCIsImlucHV0TmFtZSIsImVsZW1lbnRTZWxlY3RvciIsIiRmb3JtIiwidmFsaWRhdGlvbnNUb1BlcmZvcm0iLCJfY3JlYXRlVHJhbnNsYXRpb25EaWMiLCJyZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQiLCJpbnB1dCIsImdldExhYmVsIiwiJGVsIiwiZmlyc3QiLCJyZXF1aXJlZFZhbGlkYXRpb25NZXNzYWdlIiwiY29uY2F0Iiwib21pdE51bGxTdHJpbmciLCJrZXkiLCJjcmVkaXRjYXJkcyIsImNhcmQiLCJwYXJzZSIsImRvbmUiLCJmYWlsIiwicGF5bWVudHNVcmwiLCJzaG9wcGVySWQiLCJzdG9yZUhhc2giLCJ2YXVsdFRva2VuIiwicHJvdmlkZXJfaWQiLCJjdXJyZW5jeV9jb2RlIiwiY3JlZGl0X2NhcmRfbnVtYmVyIiwibmFtZV9vbl9jYXJkIiwiYWRkcmVzczEiLCJhZGRyZXNzMiIsImNpdHkiLCJwb3N0YWxfY29kZSIsImNvbXBhbnkiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZW1haWwiLCJwaG9uZSIsImV4cGlyeSIsImFqYXgiLCJkYXRhVHlwZSIsIm1ldGhvZCIsImNhY2hlIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJBY2NlcHQiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5zdHJ1bWVudCIsImNhcmRob2xkZXJfbmFtZSIsIm51bWJlciIsImV4cGlyeV9tb250aCIsImV4cGlyeV95ZWFyIiwidmVyaWZpY2F0aW9uX3ZhbHVlIiwiYmlsbGluZ19hZGRyZXNzIiwiRm9ybWF0dGVycyIsInJlZlRhcmdldCIsImZvcm1hdCIsIl9yZWY0Iiwid2hpY2giLCJ0ZXN0Iiwic2xpY2UiLCJyZXBsYWNlIiwidmFsaWRhdG9yIiwiaXNWYWxpZCIsImlzUGFzdCIsImN2YyIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRVY7QUFDRztBQUNnQjtBQUNBO0FBQ29GO0FBQ3REO0FBQ2tEO0FBQzFGO0FBQ2dCO0FBQUEsSUFFbkNBLE9BQU8sMEJBQUFDLFlBQUE7RUFDeEIsU0FBQUQsUUFBWUUsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBRixZQUFBLENBQUFHLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0Usb0JBQW9CLEdBQUdDLG9HQUEyQixDQUFDSixPQUFPLENBQUM7SUFDaEVDLEtBQUEsQ0FBS0ksTUFBTSxHQUFHQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7SUFDNUNMLEtBQUEsQ0FBS00sS0FBSyxHQUFHRCxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQUMsT0FBQUwsS0FBQTtFQUMzQjtFQUFDTyxjQUFBLENBQUFWLE9BQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFVLE1BQUEsR0FBQVgsT0FBQSxDQUFBWSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsT0FBTyxHQUFQLFNBQUFBLFFBQUEsRUFBVTtJQUNOLElBQU1DLGdCQUFnQixHQUFHQyw2RUFBWSxDQUFDLDhCQUE4QixDQUFDO0lBQ3JFLElBQU1DLFlBQVksR0FBR0QsNkVBQVksQ0FBQyx5QkFBeUIsQ0FBQztJQUM1RCxJQUFNRSxVQUFVLEdBQUdGLDZFQUFZLENBQUMsdUJBQXVCLENBQUM7SUFDeEQsSUFBTUcsa0JBQWtCLEdBQUdILDZFQUFZLENBQUMsNEJBQTRCLENBQUM7SUFDckUsSUFBTUksa0JBQWtCLEdBQUdKLDZFQUFZLENBQUMsZ0NBQWdDLENBQUM7SUFDekUsSUFBTUssWUFBWSxHQUFHTCw2RUFBWSxDQUFDLDZCQUE2QixDQUFDO0lBQ2hFLElBQU1NLGNBQWMsR0FBR2IsQ0FBQyxDQUFDLHNC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IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgV2lzaGxpc3QgZnJvbSAnLi93aXNobGlzdCc7XG5pbXBvcnQgdmFsaWRhdGlvbiBmcm9tICcuL2NvbW1vbi9mb3JtLXZhbGlkYXRpb24nO1xuaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSwgVmFsaWRhdG9ycywgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCwgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHsgY3JlZGl0Q2FyZFR5cGUsIHN0b3JlSW5zdHJ1bWVudCwgVmFsaWRhdG9ycyBhcyBDQ1ZhbGlkYXRvcnMsIEZvcm1hdHRlcnMgYXMgQ0NGb3JtYXR0ZXJzIH0gZnJvbSAnLi9jb21tb24vcGF5bWVudC1tZXRob2QnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRlZGl0QWNjb3VudEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFkZHJlc3NGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW5ib3hGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtaW5ib3gtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFjY291bnRSZXR1cm5Gb3JtID0gY2xhc3NpZnlGb3JtKCdbZGF0YS1hY2NvdW50LXJldHVybi1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcGF5bWVudE1ldGhvZEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcmVvcmRlckZvcm0gPSBjbGFzc2lmeUZvcm0oJ1tkYXRhLWFjY291bnQtcmVvcmRlci1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW52b2ljZUJ1dHRvbiA9ICQoJ1tkYXRhLXByaW50LWludm9pY2VdJyk7XG5cbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcblxuICAgICAgICAvLyBJbmplY3RlZCB2aWEgdGVtcGxhdGVcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyA9IHRoaXMuY29udGV4dC5wYXNzd29yZFJlcXVpcmVtZW50cztcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgd2lzaCBsaXN0IEpTXG4gICAgICAgIFdpc2hsaXN0LmxvYWQodGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJGVkaXRBY2NvdW50Rm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSk7XG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW52b2ljZUJ1dHRvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICRpbnZvaWNlQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoIC8gMiAtIDQ1MDtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC8gMiAtIDMyMDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSAkaW52b2ljZUJ1dHRvbi5kYXRhKCdwcmludEludm9pY2UnKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ29yZGVySW52b2ljZScsIGB3aWR0aD05MDAsaGVpZ2h0PTY1MCxsZWZ0PSR7bGVmdH0sdG9wPSR7dG9wfSxzY3JvbGxiYXJzPTFgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRhZGRyZXNzRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFkZHJlc3NGb3JtVmFsaWRhdGlvbigkYWRkcmVzc0Zvcm0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW5ib3hGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckluYm94VmFsaWRhdGlvbigkaW5ib3hGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkYWNjb3VudFJldHVybkZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24oJGFjY291bnRSZXR1cm5Gb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcGF5bWVudE1ldGhvZEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcmVvcmRlckZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRSZW9yZGVyRm9ybSgkcmVvcmRlckZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kRGVsZXRlQWRkcmVzcygpO1xuICAgICAgICB0aGlzLmJpbmREZWxldGVQYXltZW50TWV0aG9kKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYSBzdWJtaXQgaG9vayB0byBlbnN1cmUgdGhlIGN1c3RvbWVyIHJlY2VpdmVzIGEgY29uZmlybWF0aW9uIGRpYWxvZyBiZWZvcmUgZGVsZXRpbmcgYW4gYWRkcmVzc1xuICAgICAqL1xuICAgIGJpbmREZWxldGVBZGRyZXNzKCkge1xuICAgICAgICAkKCdbZGF0YS1kZWxldGUtYWRkcmVzc10nKS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnZGVsZXRlQWRkcmVzcycpO1xuXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZERlbGV0ZVBheW1lbnRNZXRob2QoKSB7XG4gICAgICAgICQoJ1tkYXRhLWRlbGV0ZS1wYXltZW50LW1ldGhvZF0nKS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnZGVsZXRlUGF5bWVudE1ldGhvZCcpO1xuXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFJlb3JkZXJGb3JtKCRyZW9yZGVyRm9ybSkge1xuICAgICAgICAkcmVvcmRlckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0UmVvcmRlckNoZWNrYm94ZXMgPSAkKCcuYWNjb3VudC1saXN0SXRlbSAuZm9ybS1jaGVja2JveDpjaGVja2VkJyk7XG4gICAgICAgICAgICBsZXQgc3VibWl0Rm9ybSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAkcmVvcmRlckZvcm0uZmluZCgnW25hbWVePVwicmVvcmRlcml0ZW1cIl0nKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcy5lYWNoKChpbmRleCwgcHJvZHVjdENoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChwcm9kdWN0Q2hlY2tib3gpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoJzxpbnB1dD4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgcmVvcmRlcml0ZW1bJHtwcm9kdWN0SWR9XWAsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMScsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdWJtaXRGb3JtID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICRyZW9yZGVyRm9ybS5hcHBlbmQoJGlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXN1Ym1pdEZvcm0pIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuY29udGV4dC5zZWxlY3RJdGVtLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0QWRkcmVzc0Zvcm1WYWxpZGF0aW9uKCRhZGRyZXNzRm9ybSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRhZGRyZXNzRm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nO1xuICAgICAgICBjb25zdCAkc3RhdGVFbGVtZW50ID0gJChzdGF0ZVNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgYWRkcmVzc1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzc1ZhbGlkYXRvci5nZXRTdGF0dXMoJHN0YXRlRWxlbWVudCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGFkZHJlc3NWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRhZGRyZXNzRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGFkZHJlc3NWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0QWNjb3VudFJldHVybkZvcm1WYWxpZGF0aW9uKCRhY2NvdW50UmV0dXJuRm9ybSkge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAkYWNjb3VudFJldHVybkZvcm0uZGF0YSgnYWNjb3VudFJldHVybkZvcm1FcnJvcicpO1xuXG4gICAgICAgICRhY2NvdW50UmV0dXJuRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGZvcm1TdWJtaXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB1bnRpbCB3ZSBmaW5kIGEgbm9uLXplcm8gdmFsdWUgaW4gdGhlIGRyb3Bkb3duIGZvciBxdWFudGl0eVxuICAgICAgICAgICAgJCgnW25hbWVePVwicmV0dXJuX3F0eVwiXScsICRhY2NvdW50UmV0dXJuRm9ybSkuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KCQoZWxlKS52YWwoKSwgMTApICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1TdWJtaXQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4aXQgb3V0IG9mIGxvb3AgaWYgd2UgZm91bmQgYXQgbGVhc3Qgb25lIHJldHVyblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGZvcm1TdWJtaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFBheW1lbnRNZXRob2RGb3JtVmFsaWRhdGlvbigkcGF5bWVudE1ldGhvZEZvcm0pIHtcbiAgICAgICAgLy8gSW5qZWN0IHZhbGlkYXRpb25zIGludG8gZm9ybSBmaWVsZHMgYmVmb3JlIHZhbGlkYXRpb24gcnVuc1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2ZpcnN0X25hbWUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmZpcnN0TmFtZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2xhc3RfbmFtZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQubGFzdE5hbWVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjb21wYW55LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jb21wYW55TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI3Bob25lLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5waG9uZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IGZhbHNlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNhZGRyZXNzMS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuYWRkcmVzczFMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNhZGRyZXNzMi5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuYWRkcmVzczJMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiBmYWxzZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjY2l0eS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuY2l0eUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2NvdW50cnkuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZXNlbGVjdFwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuY291bnRyeUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIHByZWZpeDogXCIke3RoaXMuY29udGV4dC5jaG9vc2VDb3VudHJ5TGFiZWx9XCIgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI3N0YXRlLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5zdGF0ZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI3Bvc3RhbF9jb2RlLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5wb3N0YWxDb2RlTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1vZGVsID0gdmFsaWRhdGlvbigkcGF5bWVudE1ldGhvZEZvcm0sIHRoaXMuY29udGV4dCk7XG4gICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2RTZWxlY3RvciA9ICdmb3JtW2RhdGEtcGF5bWVudC1tZXRob2QtZm9ybV0nO1xuICAgICAgICBjb25zdCBwYXltZW50TWV0aG9kVmFsaWRhdG9yID0gbm9kKHsgc3VibWl0OiBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl1gIH0pO1xuICAgICAgICBjb25zdCAkc3RhdGVFbGVtZW50ID0gJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXWApO1xuXG4gICAgICAgIGxldCAkbGFzdDtcbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHBheW1lbnRNZXRob2RWYWxpZGF0b3IuZ2V0U3RhdHVzKCRzdGF0ZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgZmllbGQsIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuZmllbGRfbm90X2JsYW5rKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVXNlIGNyZWRpdCBjYXJkIG51bWJlciBpbnB1dCBsaXN0ZW5lciB0byBoaWdobGlnaHQgY3JlZGl0IGNhcmQgdHlwZVxuICAgICAgICBsZXQgY2FyZFR5cGU7XG4gICAgICAgICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgIGNhcmRUeXBlID0gY3JlZGl0Q2FyZFR5cGUodGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjYXJkVHlwZSkge1xuICAgICAgICAgICAgICAgICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbWdbYWx0PVwiJHtjYXJkVHlwZX1cIl1gKS5zaWJsaW5ncygpLmNzcygnb3BhY2l0eScsICcuMicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW1nYCkuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2V0IG9mIGNyZWRpdCBjYXJkIHZhbGlkYXRpb25cbiAgICAgICAgQ0NWYWxpZGF0b3JzLnNldENyZWRpdENhcmROdW1iZXJWYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImNyZWRpdF9jYXJkX251bWJlclwiXWAsIHRoaXMuY29udGV4dC5jcmVkaXRDYXJkTnVtYmVyKTtcbiAgICAgICAgQ0NWYWxpZGF0b3JzLnNldEV4cGlyYXRpb25WYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImV4cGlyYXRpb25cIl1gLCB0aGlzLmNvbnRleHQuZXhwaXJhdGlvbik7XG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXROYW1lT25DYXJkVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJuYW1lX29uX2NhcmRcIl1gLCB0aGlzLmNvbnRleHQubmFtZU9uQ2FyZCk7XG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRDdnZWYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImN2dlwiXWAsIHRoaXMuY29udGV4dC5jdnYsICgpID0+IGNhcmRUeXBlKTtcblxuICAgICAgICAvLyBTZXQgb2YgY3JlZGl0IGNhcmQgZm9ybWF0XG4gICAgICAgIENDRm9ybWF0dGVycy5zZXRDcmVkaXRDYXJkTnVtYmVyRm9ybWF0KGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImNyZWRpdF9jYXJkX251bWJlclwiXWApO1xuICAgICAgICBDQ0Zvcm1hdHRlcnMuc2V0RXhwaXJhdGlvbkZvcm1hdChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJleHBpcmF0aW9uXCJdYCk7XG5cbiAgICAgICAgLy8gQmlsbGluZyBhZGRyZXNzIHZhbGlkYXRpb25cbiAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBQZXJmb3JtIGZpbmFsIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIGlmIChwYXltZW50TWV0aG9kVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBmb3JtIGRhdGEgYW5kIHJlZHVjZSBpdCB0byBvYmplY3RcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gXy5yZWR1Y2UoJHBheW1lbnRNZXRob2RGb3JtLnNlcmlhbGl6ZUFycmF5KCksIChvYmosIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmT2JqID0gb2JqO1xuICAgICAgICAgICAgICAgICAgICByZWZPYmpbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZPYmo7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIGNvdW50cnkgYW5kIHN0YXRlIGNvZGVcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5ID0gXy5maW5kKHRoaXMuY29udGV4dC5jb3VudHJpZXMsICh7IHZhbHVlIH0pID0+IHZhbHVlID09PSBkYXRhLmNvdW50cnkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gY291bnRyeSAmJiBfLmZpbmQoY291bnRyeS5zdGF0ZXMsICh7IHZhbHVlIH0pID0+IHZhbHVlID09PSBkYXRhLnN0YXRlKTtcbiAgICAgICAgICAgICAgICBkYXRhLmNvdW50cnlfY29kZSA9IGNvdW50cnkgPyBjb3VudHJ5LmNvZGUgOiBkYXRhLmNvdW50cnk7XG4gICAgICAgICAgICAgICAgZGF0YS5zdGF0ZV9vcl9wcm92aW5jZV9jb2RlID0gc3RhdGUgPyBzdGF0ZS5jb2RlIDogZGF0YS5zdGF0ZTtcblxuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgSW5zdHJ1bWVudFxuICAgICAgICAgICAgICAgIGRhdGEuZGVmYXVsdF9pbnN0cnVtZW50ID0gISFkYXRhLmRlZmF1bHRfaW5zdHJ1bWVudDtcblxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIGNyZWRpdCBjYXJkXG4gICAgICAgICAgICAgICAgc3RvcmVJbnN0cnVtZW50KHRoaXMuY29udGV4dCwgZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuY29udGV4dC5wYXltZW50TWV0aG9kc1VybDtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuZ2VuZXJpY19lcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlckVkaXRBY2NvdW50VmFsaWRhdGlvbigkZWRpdEFjY291bnRGb3JtKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nb2RlbCA9IHZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3QgZm9ybUVkaXRTZWxlY3RvciA9ICdmb3JtW2RhdGEtZWRpdC1hY2NvdW50LWZvcm1dJztcbiAgICAgICAgY29uc3QgZWRpdFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZW1haWxTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJFbWFpbEFkZHJlc3NcIl1gO1xuICAgICAgICBjb25zdCAkZW1haWxFbGVtZW50ID0gJChlbWFpbFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJQYXNzd29yZFwiXWA7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZEVsZW1lbnQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZDJTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJDb25maXJtUGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQyRWxlbWVudCA9ICQocGFzc3dvcmQyU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFzc3dvcmRTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJDdXJyZW50UGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkY3VycmVudFBhc3N3b3JkID0gJChjdXJyZW50UGFzc3dvcmRTZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gVGhpcyBvbmx5IGhhbmRsZXMgdGhlIGN1c3RvbSBmaWVsZHMsIHN0YW5kYXJkIGZpZWxkcyBhcmUgYWRkZWQgYmVsb3dcbiAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJGVtYWlsRWxlbWVudCkge1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUoZW1haWxTZWxlY3Rvcik7XG4gICAgICAgICAgICBWYWxpZGF0b3JzLnNldEVtYWlsVmFsaWRhdGlvbihlZGl0VmFsaWRhdG9yLCBlbWFpbFNlbGVjdG9yLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LnZhbGlkX2VtYWlsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcGFzc3dvcmRFbGVtZW50ICYmICRwYXNzd29yZDJFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IHBhc3N3b3JkOiBlbnRlclBhc3N3b3JkLCBwYXNzd29yZF9tYXRjaDogbWF0Y2hQYXNzd29yZCwgaW52YWxpZF9wYXNzd29yZDogaW52YWxpZFBhc3N3b3JkIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLnJlbW92ZShwYXNzd29yZDJTZWxlY3Rvcik7XG4gICAgICAgICAgICBWYWxpZGF0b3JzLnNldFBhc3N3b3JkVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICBlZGl0VmFsaWRhdG9yLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyxcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QoZW50ZXJQYXNzd29yZCwgZW50ZXJQYXNzd29yZCwgbWF0Y2hQYXNzd29yZCwgaW52YWxpZFBhc3N3b3JkKSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkY3VycmVudFBhc3N3b3JkKSB7XG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGN1cnJlbnRQYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSAnJyAmJiAkcGFzc3dvcmRFbGVtZW50LnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuY3VycmVudFBhc3N3b3JkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGl0VmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W25hbWU9J2FjY291bnRfZmlyc3RuYW1lJ11gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5maXJzdE5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHtmb3JtRWRpdFNlbGVjdG9yfSBpbnB1dFtuYW1lPSdhY2NvdW50X2xhc3RuYW1lJ11gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5sYXN0TmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgICRlZGl0QWNjb3VudEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChlZGl0VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJJbmJveFZhbGlkYXRpb24oJGluYm94Rm9ybSkge1xuICAgICAgICBjb25zdCBpbmJveFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluYm94VmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gc2VsZWN0W25hbWU9XCJtZXNzYWdlX29yZGVyX2lkXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gTnVtYmVyKHZhbCkgIT09IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmVudGVyT3JkZXJOdW0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIGlucHV0W25hbWU9XCJtZXNzYWdlX3N1YmplY3RcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlclN1YmplY3QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIHRleHRhcmVhW25hbWU9XCJtZXNzYWdlX2NvbnRlbnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlck1lc3NhZ2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkaW5ib3hGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpbmJveFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGluYm94VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoYXQgdGhlIGdpdmVuIGRhdGUgZm9yIHRoZSBkYXkvbW9udGgveWVhciBzZWxlY3QgaW5wdXRzIGlzIHdpdGhpbiBwb3RlbnRpYWwgcmFuZ2VcbiAqIEBwYXJhbSAkZm9ybUZpZWxkXG4gKiBAcGFyYW0gdmFsaWRhdGlvblxuICogQHJldHVybnMge3tzZWxlY3Rvcjogc3RyaW5nLCB0cmlnZ2VyZWRCeTogc3RyaW5nLCB2YWxpZGF0ZTogRnVuY3Rpb24sIGVycm9yTWVzc2FnZTogc3RyaW5nfX1cbiAqL1xuZnVuY3Rpb24gYnVpbGREYXRlVmFsaWRhdGlvbigkZm9ybUZpZWxkLCB2YWxpZGF0aW9uKSB7XG4gICAgLy8gTm8gZGF0ZSByYW5nZSByZXN0cmljdGlvbiwgc2tpcFxuICAgIGlmICh2YWxpZGF0aW9uLm1pbl9kYXRlICYmIHZhbGlkYXRpb24ubWF4X2RhdGUpIHtcbiAgICAgICAgY29uc3QgaW52YWxpZE1lc3NhZ2UgPSBgWW91ciBjaG9zZW4gZGF0ZSBtdXN0IGZhbGwgYmV0d2VlbiAke3ZhbGlkYXRpb24ubWluX2RhdGV9IGFuZCAke3ZhbGlkYXRpb24ubWF4X2RhdGV9LmA7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50SWQgPSAkZm9ybUZpZWxkLmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IG1pblNwbGl0ID0gdmFsaWRhdGlvbi5taW5fZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICBjb25zdCBtYXhTcGxpdCA9IHZhbGlkYXRpb24ubWF4X2RhdGUuc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3QgbWluRGF0ZSA9IG5ldyBEYXRlKG1pblNwbGl0WzBdLCBtaW5TcGxpdFsxXSAtIDEsIG1pblNwbGl0WzJdKTtcbiAgICAgICAgY29uc3QgbWF4RGF0ZSA9IG5ldyBEYXRlKG1heFNwbGl0WzBdLCBtYXhTcGxpdFsxXSAtIDEsIG1heFNwbGl0WzJdKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VsZWN0b3I6IGAjJHtmb3JtRWxlbWVudElkfSBzZWxlY3RbZGF0YS1sYWJlbD1cInllYXJcIl1gLFxuICAgICAgICAgICAgdHJpZ2dlcmVkQnk6IGAjJHtmb3JtRWxlbWVudElkfSBzZWxlY3Q6bm90KFtkYXRhLWxhYmVsPVwieWVhclwiXSlgLFxuICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF5ID0gTnVtYmVyKCRmb3JtRmllbGQuZmluZCgnc2VsZWN0W2RhdGEtbGFiZWw9XCJkYXlcIl0nKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGggPSBOdW1iZXIoJGZvcm1GaWVsZC5maW5kKCdzZWxlY3RbZGF0YS1sYWJlbD1cIm1vbnRoXCJdJykudmFsKCkpIC0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hvc2VuRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuXG4gICAgICAgICAgICAgICAgY2IoY2hvc2VuRGF0ZSA+PSBtaW5EYXRlICYmIGNob3NlbkRhdGUgPD0gbWF4RGF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogV2UgdmFsaWRhdGUgY2hlY2tib3hlcyBzZXBhcmF0ZWx5IGZyb20gc2luZ2xlIGlucHV0IGZpZWxkcywgYXMgdGhleSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoZWNrZWQgb3B0aW9uXG4gKiBmcm9tIG1hbnkgZGlmZmVyZW50IGlucHV0c1xuICogQHBhcmFtICRmb3JtRmllbGRcbiAqIEBwYXJhbSB2YWxpZGF0aW9uXG4gKiBAcGFyYW0gZXJyb3JUZXh0IHByb3ZpZGVzIGVycm9yIHZhbGlkYXRpb24gbWVzc2FnZVxuICovXG5mdW5jdGlvbiBidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uKHZhbGlkYXRpb24sICRmb3JtRmllbGQsIGVycm9yVGV4dCkge1xuICAgIGNvbnN0IGZvcm1GaWVsZElkID0gJGZvcm1GaWVsZC5hdHRyKCdpZCcpO1xuICAgIGNvbnN0IHByaW1hcnlTZWxlY3RvciA9IGAjJHtmb3JtRmllbGRJZH0gaW5wdXQ6Zmlyc3Qtb2YtdHlwZWA7XG4gICAgY29uc3Qgc2Vjb25kYXJ5U2VsZWN0b3IgPSBgIyR7Zm9ybUZpZWxkSWR9IGlucHV0YDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdG9yOiBwcmltYXJ5U2VsZWN0b3IsXG4gICAgICAgIHRyaWdnZXJlZEJ5OiBzZWNvbmRhcnlTZWxlY3RvcixcbiAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAkKHNlY29uZGFyeVNlbGVjdG9yKS5lYWNoKChpbmRleCwgY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24odmFsaWRhdGlvbiwgc2VsZWN0b3IsIGVycm9yVGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgICB2YWxpZGF0ZShjYiwgdmFsKSB7XG4gICAgICAgICAgICBjYih2YWwubGVuZ3RoID4gMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkTnVtYmVyUmFuZ2VWYWxpZGF0aW9uKHZhbGlkYXRpb24sIGZvcm1GaWVsZFNlbGVjdG9yKSB7XG4gICAgY29uc3QgaW52YWxpZE1lc3NhZ2UgPSBgVGhlIHZhbHVlIGZvciAke3ZhbGlkYXRpb24ubGFiZWx9IG11c3QgYmUgYmV0d2VlbiAke3ZhbGlkYXRpb24ubWlufSBhbmQgJHt2YWxpZGF0aW9uLm1heH0uYDtcbiAgICBjb25zdCBtaW4gPSBOdW1iZXIodmFsaWRhdGlvbi5taW4pO1xuICAgIGNvbnN0IG1heCA9IE51bWJlcih2YWxpZGF0aW9uLm1heCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybUZpZWxkU2VsZWN0b3J9IGlucHV0W25hbWU9XCIke3ZhbGlkYXRpb24ubmFtZX1cIl1gLFxuICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlclZhbCA9IE51bWJlcih2YWwpO1xuXG4gICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6IGludmFsaWRNZXNzYWdlLFxuICAgIH07XG59XG5cblxuZnVuY3Rpb24gYnVpbGRWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gJHZhbGlkYXRlYWJsZUVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbnMgPSBbXTtcbiAgICBjb25zdCBmb3JtRmllbGRTZWxlY3RvciA9IGAjJHskdmFsaWRhdGVhYmxlRWxlbWVudC5hdHRyKCdpZCcpfWA7XG5cbiAgICBpZiAodmFsaWRhdGlvbi50eXBlID09PSAnZGF0ZWNob29zZXInKSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWxpZGF0aW9uID0gYnVpbGREYXRlVmFsaWRhdGlvbigkdmFsaWRhdGVhYmxlRWxlbWVudCwgdmFsaWRhdGlvbik7XG5cbiAgICAgICAgaWYgKGRhdGVWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goZGF0ZVZhbGlkYXRpb24pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uLnJlcXVpcmVkICYmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdjaGVja2JveHNlbGVjdCcgfHwgdmFsaWRhdGlvbi50eXBlID09PSAncmFkaW9zZWxlY3QnKSkge1xuICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbih2YWxpZGF0aW9uLCAkdmFsaWRhdGVhYmxlRWxlbWVudCwgZXJyb3JNZXNzYWdlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHZhbGlkYXRlYWJsZUVsZW1lbnQuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGlucHV0RWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gJGlucHV0RWxlbWVudC5nZXQoMCkudGFnTmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0TmFtZSA9ICRpbnB1dEVsZW1lbnQuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNlbGVjdG9yID0gYCR7Zm9ybUZpZWxkU2VsZWN0b3J9ICR7dGFnTmFtZX1bbmFtZT1cIiR7aW5wdXROYW1lfVwiXWA7XG5cbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdudW1iZXJvbmx5Jykge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3RvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24odmFsaWRhdGlvbiwgZWxlbWVudFNlbGVjdG9yLCBlcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkVmFsaWRhdGlvbnM7XG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSB2YWxpZGF0aW9uIG1vZGVsIGZvciBkeW5hbWljIGZvcm1zXG4gKiBAcGFyYW0gJGZvcm1cbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyBmb3IgZXJyb3IgbWVzc2FnZXMgb24gcmVxdWlyZWQgZmllbGRzIHZhbGlkYXRpb25cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCRmb3JtLCBjb250ZXh0KSB7XG4gICAgbGV0IHZhbGlkYXRpb25zVG9QZXJmb3JtID0gW107XG4gICAgY29uc3QgeyBmaWVsZF9ub3RfYmxhbms6IHJlcXVpcmVkRmllbGRWYWxpZGF0aW9uVGV4dCB9ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgJGZvcm0uZmluZCgnW2RhdGEtdmFsaWRhdGlvbl0nKS5lYWNoKChpbmRleCwgaW5wdXQpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0TGFiZWwgPSAkZWwgPT4gJGVsLmZpcnN0KCkuZGF0YSgndmFsaWRhdGlvbicpLmxhYmVsO1xuICAgICAgICBjb25zdCByZXF1aXJlZFZhbGlkYXRpb25NZXNzYWdlID0gZ2V0TGFiZWwoJChpbnB1dCkpICsgcmVxdWlyZWRGaWVsZFZhbGlkYXRpb25UZXh0O1xuXG4gICAgICAgIHZhbGlkYXRpb25zVG9QZXJmb3JtID0gdmFsaWRhdGlvbnNUb1BlcmZvcm0uY29uY2F0KGJ1aWxkVmFsaWRhdGlvbigkKGlucHV0KSwgcmVxdWlyZWRWYWxpZGF0aW9uTWVzc2FnZSkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbGlkYXRpb25zVG9QZXJmb3JtO1xufVxuIiwiaW1wb3J0IGNyZWRpdGNhcmRzIGZyb20gJ2NyZWRpdGNhcmRzJztcblxuLyoqXG4gKiBPbWl0IG51bGwgb3IgZW1wdHkgc3RyaW5nIHByb3BlcnRpZXMgb2Ygb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCBvbWl0TnVsbFN0cmluZyA9IG9iaiA9PiB7XG4gICAgY29uc3QgcmVmT2JqID0gb2JqO1xuXG4gICAgJC5lYWNoKHJlZk9iaiwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIHJlZk9ialtrZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVmT2JqO1xufTtcblxuLyoqXG4gKiBHZXQgY3JlZGl0IGNhcmQgdHlwZSBmcm9tIGNyZWRpdCBjYXJkIG51bWJlclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVkaXRDYXJkVHlwZSA9IHZhbHVlID0+IGNyZWRpdGNhcmRzLmNhcmQudHlwZShjcmVkaXRjYXJkcy5jYXJkLnBhcnNlKHZhbHVlKSwgdHJ1ZSk7XG5cbi8qKlxuICogV3JhcHBlciBmb3IgYWpheCByZXF1ZXN0IHRvIHN0b3JlIGEgbmV3IGluc3RydW1lbnQgaW4gYmlncGF5XG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGhlYWRlclxuICogQHBhcmFtIHtvYmplY3R9IFJlcHJlc2VudGluZyB0aGUgZGF0YSBuZWVkZWQgZm9yIHRoZSBib2R5XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkb25lIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gYSBzdWNjZXNzZnVsIHJlc3BvbnNlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmYWlsIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gYSB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNvbnN0IHN0b3JlSW5zdHJ1bWVudCA9ICh7XG4gICAgLy8gSG9zdG5hbWUsIElkcyAmIFRva2VuXG4gICAgcGF5bWVudHNVcmwsXG4gICAgc2hvcHBlcklkLFxuICAgIHN0b3JlSGFzaCxcbiAgICB2YXVsdFRva2VuLFxufSwge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgLy8gUHJvdmlkZXIgSW5mb1xuICAgIHByb3ZpZGVyX2lkLFxuICAgIGN1cnJlbmN5X2NvZGUsXG5cbiAgICAvLyBJbnN0cnVtZW50IERldGFpbHNcbiAgICBjcmVkaXRfY2FyZF9udW1iZXIsXG4gICAgZXhwaXJhdGlvbixcbiAgICBuYW1lX29uX2NhcmQsXG4gICAgY3Z2LFxuICAgIGRlZmF1bHRfaW5zdHJ1bWVudCxcblxuICAgIC8vIEJpbGxpbmcgQWRkcmVzc1xuICAgIGFkZHJlc3MxLFxuICAgIGFkZHJlc3MyLFxuICAgIGNpdHksXG4gICAgcG9zdGFsX2NvZGUsXG4gICAgc3RhdGVfb3JfcHJvdmluY2VfY29kZSxcbiAgICBjb3VudHJ5X2NvZGUsXG4gICAgY29tcGFueSxcbiAgICBmaXJzdF9uYW1lLFxuICAgIGxhc3RfbmFtZSxcbiAgICBlbWFpbCxcbiAgICBwaG9uZSxcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG59LCBkb25lLCBmYWlsKSA9PiB7XG4gICAgY29uc3QgZXhwaXJ5ID0gZXhwaXJhdGlvbi5zcGxpdCgnLycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgJHtwYXltZW50c1VybH0vc3RvcmVzLyR7c3RvcmVIYXNofS9jdXN0b21lcnMvJHtzaG9wcGVySWR9L3N0b3JlZF9pbnN0cnVtZW50c2AsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IHZhdWx0VG9rZW4sXG4gICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYmMudjEranNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3ZuZC5iYy52MStqc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaW5zdHJ1bWVudDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgICAgICAgICBjYXJkaG9sZGVyX25hbWU6IG5hbWVfb25fY2FyZCxcbiAgICAgICAgICAgICAgICBudW1iZXI6IGNyZWRpdGNhcmRzLmNhcmQucGFyc2UoY3JlZGl0X2NhcmRfbnVtYmVyKSxcbiAgICAgICAgICAgICAgICBleHBpcnlfbW9udGg6IGNyZWRpdGNhcmRzLmV4cGlyYXRpb24ubW9udGgucGFyc2UoZXhwaXJ5WzBdKSxcbiAgICAgICAgICAgICAgICBleHBpcnlfeWVhcjogY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi55ZWFyLnBhcnNlKGV4cGlyeVsxXSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uX3ZhbHVlOiBjdnYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmlsbGluZ19hZGRyZXNzOiBvbWl0TnVsbFN0cmluZyh7XG4gICAgICAgICAgICAgICAgYWRkcmVzczEsXG4gICAgICAgICAgICAgICAgYWRkcmVzczIsXG4gICAgICAgICAgICAgICAgY2l0eSxcbiAgICAgICAgICAgICAgICBwb3N0YWxfY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9vcl9wcm92aW5jZV9jb2RlLFxuICAgICAgICAgICAgICAgIGNvdW50cnlfY29kZSxcbiAgICAgICAgICAgICAgICBjb21wYW55LFxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwcm92aWRlcl9pZCxcbiAgICAgICAgICAgIGRlZmF1bHRfaW5zdHJ1bWVudCxcbiAgICAgICAgICAgIGN1cnJlbmN5X2NvZGUsXG4gICAgICAgIH0pLFxuICAgIH0pXG4gICAgICAgIC5kb25lKGRvbmUpXG4gICAgICAgIC5mYWlsKGZhaWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IEZvcm1hdHRlcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIGZvcm1hdCBmb3IgY3JlZGl0IGNhcmQgbnVtYmVyXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgc2V0Q3JlZGl0Q2FyZE51bWJlckZvcm1hdDogZmllbGQgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgICQoZmllbGQpLm9uKCdrZXl1cCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHJlZlRhcmdldC52YWx1ZSA9IGNyZWRpdGNhcmRzLmNhcmQuZm9ybWF0KGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgZm9ybWF0IGZvciBleHBpcmF0aW9uIGRhdGVcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRFeHBpcmF0aW9uRm9ybWF0OiBmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgJChmaWVsZCkub24oJ2tleXVwJywgKHsgdGFyZ2V0LCB3aGljaCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh3aGljaCA9PT0gOCAmJiAvLiooXFwvKSQvLnRlc3QodGFyZ2V0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gdGFyZ2V0LnZhbHVlLnNsaWNlKDAsIDUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hpY2ggIT09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gdGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbMS05XVxcL3xbMi05XSkkL2csICcwJDEvJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKDBbMS05XXwxWzAtMl0pJC9nLCAnJDEvJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFswLTFdKShbMy05XSkkL2csICcwJDEvJDInKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oMFsxLTldfDFbMC0yXSkoWzAtOV17Mn0pJC9nLCAnJDEvJDInKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oWzBdKylcXC98WzBdKyQvZywgJzAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teXFxkXFwvXXxeW1xcL10qJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXC8vZywgJy8nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgdmFsaWRhdGlvbiBmb3IgY3JlZGl0IGNhcmQgbnVtYmVyXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBlcnJvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBzZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aCAmJiBjcmVkaXRjYXJkcy5jYXJkLmlzVmFsaWQoY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZSh2YWwpKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIGV4cGlyYXRpb24gZGF0ZVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICovXG4gICAgc2V0RXhwaXJhdGlvblZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cGlyeSA9IHZhbC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsLmxlbmd0aCAmJiAvXigwWzEtOV18MVswLTJdKVxcLyhbMC05XXsyfSkkLy50ZXN0KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCAmJiAhY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5pc1Bhc3QoY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLCBjcmVkaXRjYXJkcy5leHBpcmF0aW9uLnllYXIucGFyc2UoZXhwaXJ5WzFdLCB0cnVlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBuYW1lIG9uIGNhcmRcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxuICAgICAqL1xuICAgIHNldE5hbWVPbkNhcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSAhIXZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjdnZcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7YW55fSBjYXJkVHlwZSBUaGUgY3JlZGl0IGNhcmQgbnVtYmVyIHR5cGVcbiAgICAgKi9cbiAgICBzZXRDdnZWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlLCBjYXJkVHlwZSkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBjYXJkVHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IGNhcmRUeXBlKCkgOiBjYXJkVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aCAmJiBjcmVkaXRjYXJkcy5jdmMuaXNWYWxpZCh2YWwsIHR5cGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==