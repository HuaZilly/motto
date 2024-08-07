(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },
  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },
  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/common/utils/form-utils.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/common/utils/form-utils.js ***!
  \****************************************************/
/*! exports provided: createPasswordValidationErrorTextObject, classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPasswordValidationErrorTextObject", function() { return createPasswordValidationErrorTextObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/forms */ "./assets/js/theme/common/models/forms.js");





var inputTagNames = ['input', 'select', 'textarea'];
/**
 * Set up Object with Error Messages on Password Validation. Please use messages in mentioned order
 * @param {string} empty defines error text for empty field
 * @param {string} confirm defines error text for empty confirmation field
 * @param {string} mismatch defines error text if confirm passford mismatches passford field
 * @param {string} invalid defines error text for invalid password charaters sequence
 * @return {object} messages or default texts if nothing is providing
 */
var createPasswordValidationErrorTextObject = function createPasswordValidationErrorTextObject(empty, confirm, mismatch, invalid) {
  return {
    onEmptyPasswordErrorText: empty,
    onConfirmPasswordErrorText: confirm,
    onMismatchPasswordErrorText: mismatch,
    onNotValidPasswordErrorText: invalid
  };
};

/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */
function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName;

  // Input can be text/checkbox/radio etc...
  if (tagName === 'input') {
    var inputType = $input.prop('type');
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_2___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
    }
  }

  // Apply class modifier
  return $formField.addClass(className).addClass(specificClassName);
}

/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */
function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }
  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', '));

  // Obtain options
  var _options = options,
    _options$formFieldCla = _options.formFieldClass,
    formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla;

  // Classify each input in a form
  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}

/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */
function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);
  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }
  return '';
}

/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */
function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}
var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   * @param {string} errorText describes errorMassage on email validation
   */
  setEmailValidation: function setEmailValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
          cb(result);
        },
        errorMessage: errorText
      });
    }
  },
  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param {object} errorTextsObject
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, _ref, isOptional) {
    var onEmptyPasswordErrorText = _ref.onEmptyPasswordErrorText,
      onConfirmPasswordErrorText = _ref.onConfirmPasswordErrorText,
      onMismatchPasswordErrorText = _ref.onMismatchPasswordErrorText,
      onNotValidPasswordErrorText = _ref.onNotValidPasswordErrorText;
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onEmptyPasswordErrorText
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength;

        // If optional and nothing entered, it is valid
        if (isOptional && val.length === 0) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onNotValidPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onConfirmPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: onMismatchPasswordErrorText
    }];
    validator.add(passwordValidations);
  },
  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors, priceValidationErrorTexts) {
    if (priceValidationErrorTexts === void 0) {
      priceValidationErrorTexts = {};
    }
    var errorSelector = selectors.errorSelector,
      fieldsetSelector = selectors.fieldsetSelector,
      formSelector = selectors.formSelector,
      maxPriceSelector = selectors.maxPriceSelector,
      minPriceSelector = selectors.minPriceSelector;

    // eslint-disable-next-line object-curly-newline
    var _priceValidationError = priceValidationErrorTexts,
      onMinPriceError = _priceValidationError.onMinPriceError,
      onMaxPriceError = _priceValidationError.onMaxPriceError,
      minPriceNotEntered = _priceValidationError.minPriceNotEntered,
      maxPriceNotEntered = _priceValidationError.maxPriceNotEntered,
      onInvalidPrice = _priceValidationError.onInvalidPrice;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class
    });
    validator.add({
      errorMessage: onMinPriceError,
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: onMaxPriceError,
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: maxPriceNotEntered,
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: minPriceNotEntered,
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: onInvalidPrice,
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: errorText
      });
    }
  },
  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/api */ "./assets/js/theme/common/utils/api.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jquery-match-height */ "./node_modules/jquery-match-height/dist/jquery.matchHeight.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jquery_match_height__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _common_carousel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/carousel */ "./assets/js/theme/common/carousel.js");
/* harmony import */ var _custom_ntc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom/ntc */ "./assets/js/theme/custom/ntc.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 Import all product specific js
 */








// import modalFactory, { showAlertModal, modalTypes } from './global/modal';





var WRITE_REVIEW = _global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].WRITE_REVIEW;
var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])("#modal-review-form")[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", function () {
      if (_this2.url.indexOf("#write_review") !== -1 && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($(".productView"), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.translateColours();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])(".writeReview-form");
    if ($reviewForm.length > 0) {
      var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
      $(document).on("opened.fndtn.reveal", function () {
        return _this2.reviewModal.setupFocusableElements(WRITE_REVIEW);
      });
      $("body").on("click", '[data-reveal-id="modal-review-form"]', function () {
        validator = review.registerValidation(_this2.context);
        _this2.ariaDescribeReviewInputs($reviewForm);
      });
      $reviewForm.on("submit", function () {
        if (validator) {
          validator.performCheck();
          return validator.areAll("valid");
        }
        return false;
      });
    }
    this.productReviewHandler();

    // console.log('producttttttttttttttttttttt.js');

    // loads the variants stock level
    // this.getVariantStockLevels();
    this.playVideo();
    var mainProductID = $('input[name="product_id"]').val();
    var proPrice = $(".productView-price .price-section .mainLoadedPrice").text();
    // var discountedPrice = (Number(proPrice.trim().replace("$",""))*Number(0.90)).toFixed(2);
    // $(".discountedPriceSinglePage-"+mainProductID).html("$"+discountedPrice);

    // this.LoadProductSizesSearch();

    $(".productView-options__block label").on("click", function () {
      var size = $(this).find("span").html();
      var stock = $('span[data-variant="' + size + '"]').html();
      console.log(size + " has stock " + stock);
      if (stock < 6) {
        $(".productView-options__stock").show().find(".stock-qty").html(stock);
      } else {
        $(".productView-options__stock").hide().find(".stock-qty").html("");
      }
    });
    this.moreColoursCarousel();
    $(window).on("load", function () {
      console.log("window loaded");
      $(".MagicZoomGallery").find("iframe").each(function (i) {
        console.log("magic", $(this));
        var src = $(this).attr("src");
        if (src && (src.includes("youtube") || src.includes("vimeo"))) {
          src += "&rel=0&fs=0&controls=0";
          $(this).attr("src", src);
          console.log("src", src);
        }
        var data_src = $(this).attr("data-src");
        if (data_src && (data_src.includes("youtube") || data_src.includes("vimeo"))) {
          data_src += "&rel=0&fs=0&controls=0";
          $(this).attr("data-src", data_src);
          console.log("data_src", data_src);
        }
      });
    });
  };
  _proto.moreColoursCarousel = function moreColoursCarousel() {
    var brandSelector = $("[data-brand]");
    var brandName = brandSelector.attr("data-brand");
    var brandUrl = "/brands/" + brandName.split(" ").join("-").toLowerCase() + "/";
    var carouselSettings = {
      dots: false,
      infinite: true,
      // mobileFirst: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      slide: ".js-product-slide",
      arrows: true,
      responsive: [{
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          infinite: true
        }
      }, {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          infinite: true
        }
      }]
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["default"].api.getPage(brandUrl, "/templates/brand", function (err, response) {
      var slider = $(response).find("#brandproducts-slider").html();
      var noofsliders = $(slider).find("article").length;
      if (noofsliders < 2) {
        $(".more-colours-block").removeClass("d-md-block");
        $(".more-colours-mobile").addClass("d-none");
      } else {
        $(".loadavailableproducts-mob").html(slider).slick(carouselSettings);
        // $(".loadavailableproducts-mob").slick(carouselSettings);
      }
      if (noofsliders <= 2) {
        $('.loadavailableproducts-mob').slick('unslick');
      }
    });
    $(document).on("click", ".more-colours-mobile", function (e) {
      if ($(this).hasClass("slickonclick")) {
        $(this).removeClass("slickonclick");
        $(".loadavailableproducts-mob").slick("destroy").slick(carouselSettings);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["default"].api.getPage(brandUrl, "/templates/brand", function (err, response) {
        var slider = $(response).find("#brandproducts-slider").html();
        var noofsliders = $(slider).find("article").length;
        // alert(noofsliders);
        if (noofsliders <= 2) {
          $('.loadavailableproducts-mob').slick('unslick');
        }
      });
    });
  };
  _proto.translateColours = function translateColours() {
    $("[data-formatbg]").each(function (i) {
      var bg = $(this).attr("data-formatbg");
      $(this).css("background", Object(_custom_ntc__WEBPACK_IMPORTED_MODULE_11__["getHexFromColorName"])(bg));
    });
  };
  _proto.LoadProductSizesSearch = function LoadProductSizesSearch() {
    var listProducts = $(".product-customerviewed .slick-list .slick-track .productCarousel-slide");
    listProducts.each(function (id, li) {
      //var Product = $(li);
      var proID = $(this).find(".ProductIDs").text();
      var forProID = $(this).find(".ProductIDsOnly").text();
      var proPrice = $(this).find(".mainLoadedPrice").text();
      var discountedPrice = (Number(proPrice.trim().replace("$", "")) * Number(0.9)).toFixed(2);
      //console.log(discountedPrice);
      //console.log(proPrice);

      $(".discountedPriceCategory-" + forProID).html("$" + discountedPrice);
      if (proID == "NO") return;
      //console.log(proID);

      $("#loadQuickView-" + proID).html('<div id="loaderimage" class="loadingOverlay loadingOverlay--transition" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" class="icn-loader" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17.9"><path d="M19.2 5.7a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.1 1.3 4.4.8 5.7.8s2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4z" class="icn-wishlist__heart"></path><path d="M18.3 1.7a5.8 5.8 0 00-4-1.7c-1.5 0-2.9.6-4 1.7L10 2l-.3-.3a5.6 5.6 0 00-4-1.7c-1.5 0-2.9.6-4 1.7a5.8 5.8 0 000 8.1l8 8 .4.1.3-.1 8-8a5.7 5.7 0 00-.1-8.1zM5.7.8c1.3 0 2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.5a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.2 1.3 4.4.8 5.7.8z" class="icn-wishlist__stroke"></path></svg></div>');
      //return;

      // load sizes
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["default"].api.product.getById(proID, {
        template: "products/quick-view-options"
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        var availableSizes = "";
        $(response).find(".form-option").each(function (i, obj) {
          var inputID = $(this).attr("for");
          var data_product_attribute_value = $(this).attr("data-product-attribute-value");
          var attr_name = $(response).find("#" + inputID).attr("name");
          availableSizes += "<label id='" + proID + "' class='form-option unavailableinList IsProdAvailable-" + proID + "-" + data_product_attribute_value + " add-me-to-cart' data-popup-type='add-to-bag' for='" + inputID + "' data-product-attribute-value='" + data_product_attribute_value + "' name='" + attr_name + "' ><a href='javascript:void(0);' class='card-size-option' data-reveal-id='add-from-size' >" + $(this).html() + "</a></label>";
          $("#loadQuickView-" + proID).html(availableSizes);
          //console.log("++");

          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["default"].api.productAttributes.optionChange(proID, "product_id=" + proID, "products/quick-view-options", function (err, response) {
            // from response get the available attributes

            var productAttributes = response.data.available_variant_values;
            //console.log(productAttributes);
            if (productAttributes.length > 0) {
              productAttributes.forEach(function (number) {
                //console.log(number+" == ");
                //console.log($(availableSizes).find(".InProdAvailable"));
                $(".IsProdAvailable-" + proID + "-" + number).removeClass("unavailableinList");
              });
            }
          });
        });
      });
    });
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr("name") + "-msg";
      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  }

  // loading variants stock level
  ;
  _proto.getVariantStockLevels = function getVariantStockLevels() {
    var $optionSet = $("[data-product-option-change]");
    var $form = $optionSet.parents($("form"));
    var productId = $('[name="product_id"]', $form).val();
    var $optionsArray = $optionSet.find(".form-radio");
    // console.log('$optionsArray', $optionsArray);

    if ($optionsArray.length > 0) {
      $(".productView-options__block").show();
      $("#loaderimageStockshow").show();
      $.each($optionsArray, function (index, item) {
        var attributeId = $(item).attr("name");
        var attributeIdID = $(item).attr("id");
        var variantSize = $('[for="' + attributeIdID + '"]', $form).text().trim();
        var attributeValue = $(item).val();
        var attribute = attributeId + "=" + attributeValue;
        _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["default"].api.productAttributes.optionChange(productId, attribute, "products/product-view-options", function (err, response) {
          if (response.data.stock > 0) {
            var progressBarHtml = "";
            progressBarHtml += '<div class="bk-stock-countdown">';
            progressBarHtml += '<div class="stock-countdown-message">';
            progressBarHtml += '<div class="message">';
            progressBarHtml += '<div class="message__text">';
            progressBarHtml += '<span class="message__size font-weight-bold text-uppercase">Size ' + variantSize + "</span> Less than ";
            progressBarHtml += '<span data-variant="' + variantSize + '" class="variant-stock font-weight-bold">' + response.data.stock + "</span>";
            progressBarHtml += " left in stock !!!";
            progressBarHtml += "</div>";
            progressBarHtml += "</div>";
            progressBarHtml += "</div>";
            progressBarHtml += '<div class="progress-bar blue stripes">';
            progressBarHtml += '<span style="width: ' + response.data.stock + '%;"></span>';
            progressBarHtml += "</div>";
            progressBarHtml += "</div>";
            $("#loadProductVariantBars").append(progressBarHtml);

            // console.log(response);
            //console.log(response.data.sku, response.data.stock);
          }
          $("#loaderimageStockshow").hide();
        });
      });
    }
  };
  _proto.playVideo = function playVideo() {
    //console.log("from play video");

    $(".playLoadedVideo").on("click", function () {
      var videoID = $(this).attr("data-video-id");
      var viewportheight = $(".productView-img-container").height();
      var viewportwidth = $(".productView-img-container").width();
      var embedCode = '<iframe id="doNotPlayMeAnyMore" type="text/html" width="' + viewportwidth + '" height="' + viewportheight + '" src="https://www.youtube.com/embed/' + videoID + '?autoplay=1&mute=0" frameborder="0" allow="autoplay;"></iframe>';
      //console.log(videoID);

      $(".loadVideoHere").html(embedCode);
      $(".loadVideoHere").show();
      $(".loadImageHere").hide();
      $("#productVideo").addClass("disableZoom");
      console.log("video clicked");
    });
    $(".imageThumbnailClicked").on("click", function () {
      //$("#doNotPlayMeAnyMore").remove();
      $(".loadVideoHere").html("");
      $(".loadVideoHere").hide();
      $(".loadImageHere").show();
      $("#productVideo").removeClass("disableZoom");
      console.log("Image Clicked");
    });
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");



var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }

  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */
  var _proto = _default.prototype;
  _proto.initLinkBind = function initLinkBind() {
    var _this = this;
    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };
  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    }

    // force collapse on page load
    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }

  /**
   * Inject ID into the pagination link
   */;
  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);
    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }
    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };
  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };
  _proto.validate = function validate() {
    return this.validator.performCheck();
  };
  return _default;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvcmV2aWV3cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbImZvcm1zIiwiZW1haWwiLCJ2YWx1ZSIsInJlIiwidGVzdCIsInBhc3N3b3JkIiwibm90RW1wdHkiLCJsZW5ndGgiLCJpbnB1dFRhZ05hbWVzIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IiwiZW1wdHkiLCJjb25maXJtIiwibWlzbWF0Y2giLCJpbnZhbGlkIiwib25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0Iiwib25Db25maXJtUGFzc3dvcmRFcnJvclRleHQiLCJvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQiLCJvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQiLCJjbGFzc2lmeUlucHV0IiwiaW5wdXQiLCJmb3JtRmllbGRDbGFzcyIsIiRpbnB1dCIsIiQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsImNsYXNzTmFtZSIsInNwZWNpZmljQ2xhc3NOYW1lIiwiaW5wdXRUeXBlIiwiX2luY2x1ZGVzIiwiX2NhbWVsQ2FzZSIsIl9jYXBpdGFsaXplIiwiYWRkQ2xhc3MiLCJjbGFzc2lmeUZvcm0iLCJmb3JtU2VsZWN0b3IiLCJvcHRpb25zIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwibWF0Y2giLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwiJHN0YXRlRmllbGQiLCJzdGF0ZUZpZWxkQXR0cnMiLCJ0eXBlIiwibmFtZSIsImFmdGVyIiwiVmFsaWRhdG9ycyIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkYXRvciIsImZpZWxkIiwiZXJyb3JUZXh0IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZXJyb3JNZXNzYWdlIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwicmVxdWlyZW1lbnRzIiwiX3JlZiIsImlzT3B0aW9uYWwiLCIkcGFzc3dvcmQiLCJwYXNzd29yZFZhbGlkYXRpb25zIiwiUmVnRXhwIiwiYWxwaGEiLCJudW1lcmljIiwibWlubGVuZ3RoIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwicHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJfcHJpY2VWYWxpZGF0aW9uRXJyb3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImRhdGEiLCJPYmplY3QiLCJrZXlzIiwibm9kIiwiY2xhc3NlcyIsImZvckVhY2giLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiV1JJVEVfUkVWSUVXIiwibW9kYWxUeXBlcyIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpczIiLCJkb2N1bWVudCIsIm9uIiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwidHJhbnNsYXRlQ29sb3VycyIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwiUmV2aWV3Iiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwicGxheVZpZGVvIiwibWFpblByb2R1Y3RJRCIsInByb1ByaWNlIiwidGV4dCIsInNpemUiLCJodG1sIiwic3RvY2siLCJjb25zb2xlIiwibG9nIiwic2hvdyIsImhpZGUiLCJtb3JlQ29sb3Vyc0Nhcm91c2VsIiwiaSIsInNyYyIsImF0dHIiLCJpbmNsdWRlcyIsImRhdGFfc3JjIiwiYnJhbmRTZWxlY3RvciIsImJyYW5kTmFtZSIsImJyYW5kVXJsIiwic3BsaXQiLCJjYXJvdXNlbFNldHRpbmdzIiwiZG90cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzbGlkZSIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXNwb25zZSIsInNsaWRlciIsIm5vb2ZzbGlkZXJzIiwic2xpY2siLCJlIiwiYmciLCJjc3MiLCJnZXRIZXhGcm9tQ29sb3JOYW1lIiwiTG9hZFByb2R1Y3RTaXplc1NlYXJjaCIsImxpc3RQcm9kdWN0cyIsImlkIiwibGkiLCJwcm9JRCIsImZvclByb0lEIiwiZGlzY291bnRlZFByaWNlIiwiTnVtYmVyIiwidHJpbSIsInJlcGxhY2UiLCJ0b0ZpeGVkIiwicHJvZHVjdCIsImdldEJ5SWQiLCJ0ZW1wbGF0ZSIsIkVycm9yIiwiYXZhaWxhYmxlU2l6ZXMiLCJvYmoiLCJpbnB1dElEIiwiZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSIsImF0dHJfbmFtZSIsInByb2R1Y3RBdHRyaWJ1dGVzIiwib3B0aW9uQ2hhbmdlIiwiYXZhaWxhYmxlX3ZhcmlhbnRfdmFsdWVzIiwibnVtYmVyIiwiXyIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwidHJpZ2dlciIsImdldFZhcmlhbnRTdG9ja0xldmVscyIsIiRvcHRpb25TZXQiLCJwYXJlbnRzIiwicHJvZHVjdElkIiwiJG9wdGlvbnNBcnJheSIsImluZGV4IiwiaXRlbSIsImF0dHJpYnV0ZUlkIiwiYXR0cmlidXRlSWRJRCIsInZhcmlhbnRTaXplIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGUiLCJwcm9ncmVzc0Jhckh0bWwiLCJhcHBlbmQiLCJ2aWRlb0lEIiwidmlld3BvcnRoZWlnaHQiLCJoZWlnaHQiLCJ2aWV3cG9ydHdpZHRoIiwid2lkdGgiLCJlbWJlZENvZGUiLCJQYWdlTWFuYWdlciIsIl9kZWZhdWx0Iiwic3VibWl0IiwiJHJldmlld3NDb250ZW50IiwiJGNvbGxhcHNpYmxlIiwiaW5pdExpbmtCaW5kIiwiaW5qZWN0UGFnaW5hdGlvbkxpbmsiLCJjb2xsYXBzZVJldmlld3MiLCIkY29udGVudCIsIkNvbGxhcHNpYmxlRXZlbnRzIiwiY2xpY2siLCJoYXNoIiwiJG5leHRMaW5rIiwiJHByZXZMaW5rIiwicmV2aWV3UmF0aW5nIiwicmV2aWV3U3ViamVjdCIsInJldmlld0NvbW1lbnQiLCJyZXZpZXdFbWFpbCIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsImJpbmQiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLElBQU1BLEtBQUssR0FBRztFQUNWQyxLQUFLLFdBQUFBLE1BQUNDLEtBQUssRUFBRTtJQUNULElBQU1DLEVBQUUsR0FBRyxZQUFZO0lBQ3ZCLE9BQU9BLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDRixLQUFLLENBQUM7RUFDekIsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUcsUUFBUSxXQUFBQSxTQUFDSCxLQUFLLEVBQUU7SUFDWixPQUFPLElBQUksQ0FBQ0ksUUFBUSxDQUFDSixLQUFLLENBQUM7RUFDL0IsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJSSxRQUFRLFdBQUFBLFNBQUNKLEtBQUssRUFBRTtJQUNaLE9BQU9BLEtBQUssQ0FBQ0ssTUFBTSxHQUFHLENBQUM7RUFDM0I7QUFDSixDQUFDO0FBRWNQLG9FQUFLLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Qks7QUFDVztBQUVwQyxJQUFNUSxhQUFhLEdBQUcsQ0FDbEIsT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLENBQ2I7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFiLFlBQUE7QUFBQTtBQUdVLFNBQVN6SCxZQUFZQSxDQUFBLEVBQUc7RUFDbkMsSUFBTXVJLFNBQVMsR0FBRyxlQUFlO0VBQ2pDLElBQU1DLGFBQWEsR0FBR2pRLENBQUMsWUFBVWdRLFNBQVMsTUFBRyxDQUFDO0VBRTlDQyxhQUFhLENBQUMzTyxJQUFJLENBQUMsVUFBQzJMLEtBQUssRUFBRWlELE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUduUSxDQUFDLENBQUNrUSxPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUNuTCxJQUFJLENBQUNnTCxTQUFTLENBQUMsWUFBWWQsWUFBWTtJQUVqRSxJQUFJa0IsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUNuTCxJQUFJLENBQUNnTCxTQUFTLEVBQUUsSUFBSWQsWUFBWSxDQUFDaUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMzcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmb3JtcyA9IHtcbiAgICBlbWFpbCh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZSA9IC9eLitALitcXC4uKy87XG4gICAgICAgIHJldHVybiByZS50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgcGFzc3dvcmQgZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwYXNzd29yZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RFbXB0eSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlcyBpZiBhIGZpZWxkIGlzIGVtcHR5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICpcbiAgICAgKi9cbiAgICBub3RFbXB0eSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybXM7XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9ub2QnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL21vZGVscy9mb3Jtcyc7XG5cbmNvbnN0IGlucHV0VGFnTmFtZXMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAndGV4dGFyZWEnLFxuXTtcbi8qKlxuICogU2V0IHVwIE9iamVjdCB3aXRoIEVycm9yIE1lc3NhZ2VzIG9uIFBhc3N3b3JkIFZhbGlkYXRpb24uIFBsZWFzZSB1c2UgbWVzc2FnZXMgaW4gbWVudGlvbmVkIG9yZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZW1wdHkgZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBlbXB0eSBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpcm0gZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBlbXB0eSBjb25maXJtYXRpb24gZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBtaXNtYXRjaCBkZWZpbmVzIGVycm9yIHRleHQgaWYgY29uZmlybSBwYXNzZm9yZCBtaXNtYXRjaGVzIHBhc3Nmb3JkIGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gaW52YWxpZCBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGludmFsaWQgcGFzc3dvcmQgY2hhcmF0ZXJzIHNlcXVlbmNlXG4gKiBAcmV0dXJuIHtvYmplY3R9IG1lc3NhZ2VzIG9yIGRlZmF1bHQgdGV4dHMgaWYgbm90aGluZyBpcyBwcm92aWRpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCA9IChlbXB0eSwgY29uZmlybSwgbWlzbWF0Y2gsIGludmFsaWQpID0+ICh7XG4gICAgb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0OiBlbXB0eSxcbiAgICBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dDogY29uZmlybSxcbiAgICBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQ6IG1pc21hdGNoLFxuICAgIG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dDogaW52YWxpZCxcbn0pO1xuXG5cbi8qKlxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBhbiBpbnB1dCBlbGVtZW50IG9uIGl0cyB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRmllbGRDbGFzc1xuICogQHJldHVybiB7b2JqZWN0fSBFbGVtZW50IGl0c2VsZlxuICovXG5mdW5jdGlvbiBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcykge1xuICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgIGNvbnN0ICRmb3JtRmllbGQgPSAkaW5wdXQucGFyZW50KGAuJHtmb3JtRmllbGRDbGFzc31gKTtcbiAgICBjb25zdCB0YWdOYW1lID0gJGlucHV0LnByb3AoJ3RhZ05hbWUnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHt0YWdOYW1lfWA7XG4gICAgbGV0IHNwZWNpZmljQ2xhc3NOYW1lO1xuXG4gICAgLy8gSW5wdXQgY2FuIGJlIHRleHQvY2hlY2tib3gvcmFkaW8gZXRjLi4uXG4gICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXRUeXBlID0gJGlucHV0LnByb3AoJ3R5cGUnKTtcblxuICAgICAgICBpZiAoXy5pbmNsdWRlcyhbJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3N1Ym1pdCddLCBpbnB1dFR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWNoZWNrYm94LCAuZm9ybS1maWVsZC0tcmFkaW9cbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHtfLmNhbWVsQ2FzZShpbnB1dFR5cGUpfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWlucHV0IC5mb3JtLWZpZWxkLS1pbnB1dFRleHRcbiAgICAgICAgICAgIHNwZWNpZmljQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSR7Xy5jYXBpdGFsaXplKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFwcGx5IGNsYXNzIG1vZGlmaWVyXG4gICAgcmV0dXJuICRmb3JtRmllbGRcbiAgICAgICAgLmFkZENsYXNzKGNsYXNzTmFtZSlcbiAgICAgICAgLmFkZENsYXNzKHNwZWNpZmljQ2xhc3NOYW1lKTtcbn1cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGVhY2ggaW5wdXQgZWxlbWVudCBpbiBhIGZvcm0gYmFzZWQgb24gaXRzIHR5cGVcbiAqIEBleGFtcGxlXG4gKiAvLyBCZWZvcmVcbiAqIDxmb3JtIGlkPVwiZm9ybVwiPlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICogICAgIDwvZGl2PlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxzZWxlY3Q+Li4uPC9zZWxlY3Q+XG4gKiAgICAgPC9kaXY+XG4gKiA8L2Zvcm0+XG4gKlxuICogY2xhc3NpZnlGb3JtKCcjZm9ybScsIHsgZm9ybUZpZWxkQ2xhc3M6ICdmb3JtLWZpZWxkJyB9KTtcbiAqXG4gKiAvLyBBZnRlclxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0taW5wdXQgZm9ybS1maWVsZC0taW5wdXRUZXh0XCI+Li4uPC9kaXY+XG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zZWxlY3RcIj4uLi48L2Rpdj5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGZvcm1TZWxlY3RvciAtIHNlbGVjdG9yIG9yIGVsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtqUXVlcnl9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmeUZvcm0oZm9ybVNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCAkZm9ybSA9ICQoZm9ybVNlbGVjdG9yKTtcbiAgICBjb25zdCAkaW5wdXRzID0gJGZvcm0uZmluZChpbnB1dFRhZ05hbWVzLmpvaW4oJywgJykpO1xuXG4gICAgLy8gT2J0YWluIG9wdGlvbnNcbiAgICBjb25zdCB7IGZvcm1GaWVsZENsYXNzID0gJ2Zvcm0tZmllbGQnIH0gPSBvcHRpb25zO1xuXG4gICAgLy8gQ2xhc3NpZnkgZWFjaCBpbnB1dCBpbiBhIGZvcm1cbiAgICAkaW5wdXRzLmVhY2goKF9fLCBpbnB1dCkgPT4ge1xuICAgICAgICBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gJGZvcm07XG59XG5cbi8qKlxuICogR2V0IGlkIGZyb20gZ2l2ZW4gZmllbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRGaWVsZElkKCRmaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSAkZmllbGQucHJvcCgnbmFtZScpLm1hdGNoKC8oXFxbLipcXF0pLyk7XG5cbiAgICBpZiAoZmllbGRJZCAmJiBmaWVsZElkLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmllbGRJZFswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogSW5zZXJ0IGhpZGRlbiBmaWVsZCBhZnRlciBTdGF0ZS9Qcm92aW5jZSBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRzdGF0ZUZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkc3RhdGVGaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSBnZXRGaWVsZElkKCRzdGF0ZUZpZWxkKTtcbiAgICBjb25zdCBzdGF0ZUZpZWxkQXR0cnMgPSB7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICBuYW1lOiBgRm9ybUZpZWxkSXNUZXh0JHtmaWVsZElkfWAsXG4gICAgICAgIHZhbHVlOiAnMScsXG4gICAgfTtcblxuICAgICRzdGF0ZUZpZWxkLmFmdGVyKCQoJzxpbnB1dCAvPicsIHN0YXRlRmllbGRBdHRycykpO1xufVxuXG5jb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvclRleHQgZGVzY3JpYmVzIGVycm9yTWFzc2FnZSBvbiBlbWFpbCB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgc2V0RW1haWxWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JUZXh0KSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmRTZWxlY3RvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZDJTZWxlY3RvclxuICAgICAqIEBwYXJhbSByZXF1aXJlbWVudHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JUZXh0c09iamVjdFxuICAgICAqIEBwYXJhbSBpc09wdGlvbmFsXG4gICAgICovXG4gICAgc2V0UGFzc3dvcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBwYXNzd29yZFNlbGVjdG9yLCBwYXNzd29yZDJTZWxlY3RvciwgcmVxdWlyZW1lbnRzLCB7XG4gICAgICAgIG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCwgb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQsIG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCwgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgIH0sIGlzT3B0aW9uYWwpID0+IHtcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkID0gJChwYXNzd29yZFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRWYWxpZGF0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLmFscGhhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5tYXRjaChuZXcgUmVnRXhwKHJlcXVpcmVtZW50cy5udW1lcmljKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5sZW5ndGggPj0gcmVxdWlyZW1lbnRzLm1pbmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBvcHRpb25hbCBhbmQgbm90aGluZyBlbnRlcmVkLCBpdCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsID09PSAkcGFzc3dvcmQudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHBhc3N3b3JkVmFsaWRhdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcbiAgICAgKiBAcGFyYW0ge05vZH0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdG9yc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZXJyb3JTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZmllbGRzZXRTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZm9ybVNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5tYXhQcmljZVNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5taW5QcmljZVNlbGVjdG9yXG4gICAgICovXG4gICAgc2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBzZWxlY3RvcnMsIHByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHMgPSB7fSkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICB9ID0gc2VsZWN0b3JzO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuICAgICAgICBjb25zdCB7IG9uTWluUHJpY2VFcnJvciwgb25NYXhQcmljZUVycm9yLCBtaW5QcmljZU5vdEVudGVyZWQsIG1heFByaWNlTm90RW50ZXJlZCwgb25JbnZhbGlkUHJpY2UgfSA9IHByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHM7XG5cbiAgICAgICAgdmFsaWRhdG9yLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBmb3JtOiBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAnXycsIC8vIEtMVURHRTogRG9uJ3QgYXBwbHkgc3VjY2VzcyBjbGFzc1xuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6IGBtaW4tbWF4OiR7bWluUHJpY2VTZWxlY3Rvcn06JHttYXhQcmljZVNlbGVjdG9yfWAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAnbWluLW51bWJlcjowJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLnNldE1lc3NhZ2VPcHRpb25zKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXG4gICAgICAgICAgICBwYXJlbnQ6IGZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICAgICAgICBlcnJvclNwYW46IGVycm9yU2VsZWN0b3IsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgbmV3IHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBkaXJ0eVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JUZXh0KSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjbGFzc2VzIGZyb20gZGlydHkgZm9ybSBpZiBwcmV2aW91c2x5IGNoZWNrZWRcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBjbGVhblVwU3RhdGVWYWxpZGF0aW9uOiAoZmllbGQpID0+IHtcbiAgICAgICAgY29uc3QgJGZpZWxkQ2xhc3NFbGVtZW50ID0gJCgoYFtkYXRhLXR5cGU9XCIke2ZpZWxkLmRhdGEoJ2ZpZWxkVHlwZScpfVwiXWApKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhub2QuY2xhc3NlcykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICgkZmllbGRDbGFzc0VsZW1lbnQuaGFzQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKSkge1xuICAgICAgICAgICAgICAgICRmaWVsZENsYXNzRWxlbWVudC5yZW1vdmVDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxufTtcblxuZXhwb3J0IHsgVmFsaWRhdG9ycywgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9O1xuIiwiLypcbiBJbXBvcnQgYWxsIHByb2R1Y3Qgc3BlY2lmaWMganNcbiAqL1xuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gXCIuL3BhZ2UtbWFuYWdlclwiO1xuaW1wb3J0IFJldmlldyBmcm9tIFwiLi9wcm9kdWN0L3Jldmlld3NcIjtcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSBcIi4vY29tbW9uL2NvbGxhcHNpYmxlXCI7XG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSBcIi4vY29tbW9uL3Byb2R1Y3QtZGV0YWlsc1wiO1xuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tIFwiLi9wcm9kdWN0L3ZpZGVvLWdhbGxlcnlcIjtcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gXCIuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzXCI7XG5pbXBvcnQgbW9kYWxGYWN0b3J5LCB7IG1vZGFsVHlwZXMgfSBmcm9tIFwiLi9nbG9iYWwvbW9kYWxcIjtcblxuaW1wb3J0IHsgbm9ybWFsaXplRm9ybURhdGEgfSBmcm9tIFwiLi9jb21tb24vdXRpbHMvYXBpXCI7XG4vLyBpbXBvcnQgbW9kYWxGYWN0b3J5LCB7IHNob3dBbGVydE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQganF1ZXJ5bWF0Y2hoZWlnaHQgZnJvbSBcImpxdWVyeS1tYXRjaC1oZWlnaHRcIjtcblxuaW1wb3J0IGNhcm91c2VsIGZyb20gXCIuL2NvbW1vbi9jYXJvdXNlbFwiO1xuaW1wb3J0IHsgZ2V0SGV4RnJvbUNvbG9yTmFtZSB9IGZyb20gXCIuL2N1c3RvbS9udGNcIjtcblxuY29uc3QgeyBXUklURV9SRVZJRVcgfSA9IG1vZGFsVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICBzdXBlcihjb250ZXh0KTtcbiAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xuICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoXCIjbW9kYWwtcmV2aWV3LWZvcm1cIilbMF07XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsb3NlLmZuZHRuLnJldmVhbFwiLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiN3cml0ZV9yZXZpZXdcIikgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgdmFsaWRhdG9yO1xuXG4gICAgLy8gSW5pdCBjb2xsYXBzaWJsZVxuICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKFwiLnByb2R1Y3RWaWV3XCIpLCB0aGlzLmNvbnRleHQsIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzKTtcbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgIHRoaXMudHJhbnNsYXRlQ29sb3VycygpO1xuXG4gICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKFwiLndyaXRlUmV2aWV3LWZvcm1cIik7XG5cbiAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygkcmV2aWV3Rm9ybSk7XG4gICAgICAkKGRvY3VtZW50KS5vbihcIm9wZW5lZC5mbmR0bi5yZXZlYWxcIiwgKCkgPT4gdGhpcy5yZXZpZXdNb2RhbC5zZXR1cEZvY3VzYWJsZUVsZW1lbnRzKFdSSVRFX1JFVklFVykpO1xuICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5hcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJHJldmlld0Zvcm0pO1xuICAgICAgfSk7XG4gICAgICAkcmV2aWV3Rm9ybS5vbihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoXCJ2YWxpZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb2R1Y3RSZXZpZXdIYW5kbGVyKCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygncHJvZHVjdHR0dHR0dHR0dHR0dHR0dHR0dHR0LmpzJyk7XG5cbiAgICAvLyBsb2FkcyB0aGUgdmFyaWFudHMgc3RvY2sgbGV2ZWxcbiAgICAvLyB0aGlzLmdldFZhcmlhbnRTdG9ja0xldmVscygpO1xuICAgIHRoaXMucGxheVZpZGVvKCk7XG5cbiAgICB2YXIgbWFpblByb2R1Y3RJRCA9ICQoJ2lucHV0W25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsKCk7XG4gICAgdmFyIHByb1ByaWNlID0gJChcIi5wcm9kdWN0Vmlldy1wcmljZSAucHJpY2Utc2VjdGlvbiAubWFpbkxvYWRlZFByaWNlXCIpLnRleHQoKTtcbiAgICAvLyB2YXIgZGlzY291bnRlZFByaWNlID0gKE51bWJlcihwcm9QcmljZS50cmltKCkucmVwbGFjZShcIiRcIixcIlwiKSkqTnVtYmVyKDAuOTApKS50b0ZpeGVkKDIpO1xuICAgIC8vICQoXCIuZGlzY291bnRlZFByaWNlU2luZ2xlUGFnZS1cIittYWluUHJvZHVjdElEKS5odG1sKFwiJFwiK2Rpc2NvdW50ZWRQcmljZSk7XG5cbiAgICAvLyB0aGlzLkxvYWRQcm9kdWN0U2l6ZXNTZWFyY2goKTtcblxuICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fYmxvY2sgbGFiZWxcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2l6ZSA9ICQodGhpcykuZmluZChcInNwYW5cIikuaHRtbCgpO1xuXG4gICAgICB2YXIgc3RvY2sgPSAkKCdzcGFuW2RhdGEtdmFyaWFudD1cIicgKyBzaXplICsgJ1wiXScpLmh0bWwoKTtcblxuICAgICAgY29uc29sZS5sb2coc2l6ZSArIFwiIGhhcyBzdG9jayBcIiArIHN0b2NrKTtcblxuICAgICAgaWYgKHN0b2NrIDwgNikge1xuICAgICAgICAkKFwiLnByb2R1Y3RWaWV3LW9wdGlvbnNfX3N0b2NrXCIpLnNob3coKS5maW5kKFwiLnN0b2NrLXF0eVwiKS5odG1sKHN0b2NrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fc3RvY2tcIikuaGlkZSgpLmZpbmQoXCIuc3RvY2stcXR5XCIpLmh0bWwoXCJcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vcmVDb2xvdXJzQ2Fyb3VzZWwoKTtcblxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3cgbG9hZGVkXCIpO1xuXG4gICAgICAkKFwiLk1hZ2ljWm9vbUdhbGxlcnlcIilcbiAgICAgICAgLmZpbmQoXCJpZnJhbWVcIilcbiAgICAgICAgLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZ2ljXCIsICQodGhpcykpO1xuXG4gICAgICAgICAgdmFyIHNyYyA9ICQodGhpcykuYXR0cihcInNyY1wiKTtcbiAgICAgICAgICBpZiAoc3JjICYmIChzcmMuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpIHx8IHNyYy5pbmNsdWRlcyhcInZpbWVvXCIpKSkge1xuICAgICAgICAgICAgc3JjICs9IFwiJnJlbD0wJmZzPTAmY29udHJvbHM9MFwiO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwic3JjXCIsIHNyYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNyY1wiLCBzcmMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkYXRhX3NyYyA9ICQodGhpcykuYXR0cihcImRhdGEtc3JjXCIpO1xuICAgICAgICAgIGlmIChkYXRhX3NyYyAmJiAoZGF0YV9zcmMuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpIHx8IGRhdGFfc3JjLmluY2x1ZGVzKFwidmltZW9cIikpKSB7XG4gICAgICAgICAgICBkYXRhX3NyYyArPSBcIiZyZWw9MCZmcz0wJmNvbnRyb2xzPTBcIjtcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtc3JjXCIsIGRhdGFfc3JjKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YV9zcmNcIiwgZGF0YV9zcmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtb3JlQ29sb3Vyc0Nhcm91c2VsKCkge1xuICAgIHZhciBicmFuZFNlbGVjdG9yID0gJChcIltkYXRhLWJyYW5kXVwiKTtcbiAgICB2YXIgYnJhbmROYW1lID0gYnJhbmRTZWxlY3Rvci5hdHRyKFwiZGF0YS1icmFuZFwiKTtcbiAgICB2YXIgYnJhbmRVcmwgPSBcIi9icmFuZHMvXCIgKyBicmFuZE5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCkgKyBcIi9cIjtcblxuICAgIGxldCBjYXJvdXNlbFNldHRpbmdzID0ge1xuICAgICAgZG90czogZmFsc2UsXG4gICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgIC8vIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICBzbGlkZTogXCIuanMtcHJvZHVjdC1zbGlkZVwiLFxuICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiA1NTAsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHV0aWxzLmFwaS5nZXRQYWdlKGJyYW5kVXJsLCBcIi90ZW1wbGF0ZXMvYnJhbmRcIiwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgIHZhciBzbGlkZXIgPSAkKHJlc3BvbnNlKS5maW5kKFwiI2JyYW5kcHJvZHVjdHMtc2xpZGVyXCIpLmh0bWwoKTtcblxuICAgICAgdmFyIG5vb2ZzbGlkZXJzID0gJChzbGlkZXIpLmZpbmQoXCJhcnRpY2xlXCIpLmxlbmd0aDtcbiAgICAgIFxuICAgICAgaWYgKG5vb2ZzbGlkZXJzIDwgMikge1xuICAgICAgICAkKFwiLm1vcmUtY29sb3Vycy1ibG9ja1wiKS5yZW1vdmVDbGFzcyhcImQtbWQtYmxvY2tcIik7XG4gICAgICAgICQoXCIubW9yZS1jb2xvdXJzLW1vYmlsZVwiKS5hZGRDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIubG9hZGF2YWlsYWJsZXByb2R1Y3RzLW1vYlwiKS5odG1sKHNsaWRlcikuc2xpY2soY2Fyb3VzZWxTZXR0aW5ncyk7XG4gICAgICAgIC8vICQoXCIubG9hZGF2YWlsYWJsZXByb2R1Y3RzLW1vYlwiKS5zbGljayhjYXJvdXNlbFNldHRpbmdzKTtcbiAgICAgIH1cbiAgICAgIGlmKG5vb2ZzbGlkZXJzIDw9IDIpe1xuICAgICAgICAkKCcubG9hZGF2YWlsYWJsZXByb2R1Y3RzLW1vYicpLnNsaWNrKCd1bnNsaWNrJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm1vcmUtY29sb3Vycy1tb2JpbGVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwic2xpY2tvbmNsaWNrXCIpKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzbGlja29uY2xpY2tcIik7XG4gICAgICAgICQoXCIubG9hZGF2YWlsYWJsZXByb2R1Y3RzLW1vYlwiKS5zbGljayhcImRlc3Ryb3lcIikuc2xpY2soY2Fyb3VzZWxTZXR0aW5ncyk7XG4gICAgICB9XG4gICAgICB1dGlscy5hcGkuZ2V0UGFnZShicmFuZFVybCwgXCIvdGVtcGxhdGVzL2JyYW5kXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHZhciBzbGlkZXIgPSAkKHJlc3BvbnNlKS5maW5kKFwiI2JyYW5kcHJvZHVjdHMtc2xpZGVyXCIpLmh0bWwoKTtcbiAgXG4gICAgICAgIHZhciBub29mc2xpZGVycyA9ICQoc2xpZGVyKS5maW5kKFwiYXJ0aWNsZVwiKS5sZW5ndGg7XG4gICAgICAgIC8vIGFsZXJ0KG5vb2ZzbGlkZXJzKTtcbiAgICAgICAgaWYgKG5vb2ZzbGlkZXJzIDw9IDIpIHtcbiAgICAgICAgICAkKCcubG9hZGF2YWlsYWJsZXByb2R1Y3RzLW1vYicpLnNsaWNrKCd1bnNsaWNrJyk7XG4gICAgICAgIH0gXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgdHJhbnNsYXRlQ29sb3VycygpIHtcbiAgICAkKFwiW2RhdGEtZm9ybWF0YmddXCIpLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgIGNvbnN0IGJnID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1mb3JtYXRiZ1wiKTtcbiAgICAgICQodGhpcykuY3NzKFwiYmFja2dyb3VuZFwiLCBnZXRIZXhGcm9tQ29sb3JOYW1lKGJnKSk7XG4gICAgfSk7XG4gIH1cblxuICBMb2FkUHJvZHVjdFNpemVzU2VhcmNoKCkge1xuICAgIHZhciBsaXN0UHJvZHVjdHMgPSAkKFwiLnByb2R1Y3QtY3VzdG9tZXJ2aWV3ZWQgLnNsaWNrLWxpc3QgLnNsaWNrLXRyYWNrIC5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGVcIik7XG5cbiAgICBsaXN0UHJvZHVjdHMuZWFjaChmdW5jdGlvbiAoaWQsIGxpKSB7XG4gICAgICAvL3ZhciBQcm9kdWN0ID0gJChsaSk7XG4gICAgICB2YXIgcHJvSUQgPSAkKHRoaXMpLmZpbmQoXCIuUHJvZHVjdElEc1wiKS50ZXh0KCk7XG4gICAgICB2YXIgZm9yUHJvSUQgPSAkKHRoaXMpLmZpbmQoXCIuUHJvZHVjdElEc09ubHlcIikudGV4dCgpO1xuICAgICAgdmFyIHByb1ByaWNlID0gJCh0aGlzKS5maW5kKFwiLm1haW5Mb2FkZWRQcmljZVwiKS50ZXh0KCk7XG4gICAgICB2YXIgZGlzY291bnRlZFByaWNlID0gKE51bWJlcihwcm9QcmljZS50cmltKCkucmVwbGFjZShcIiRcIiwgXCJcIikpICogTnVtYmVyKDAuOSkpLnRvRml4ZWQoMik7XG4gICAgICAvL2NvbnNvbGUubG9nKGRpc2NvdW50ZWRQcmljZSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHByb1ByaWNlKTtcblxuICAgICAgJChcIi5kaXNjb3VudGVkUHJpY2VDYXRlZ29yeS1cIiArIGZvclByb0lEKS5odG1sKFwiJFwiICsgZGlzY291bnRlZFByaWNlKTtcblxuICAgICAgaWYgKHByb0lEID09IFwiTk9cIikgcmV0dXJuO1xuICAgICAgLy9jb25zb2xlLmxvZyhwcm9JRCk7XG5cbiAgICAgICQoXCIjbG9hZFF1aWNrVmlldy1cIiArIHByb0lEKS5odG1sKFxuICAgICAgICAnPGRpdiBpZD1cImxvYWRlcmltYWdlXCIgY2xhc3M9XCJsb2FkaW5nT3ZlcmxheSBsb2FkaW5nT3ZlcmxheS0tdHJhbnNpdGlvblwiIHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljbi1sb2FkZXJcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWQgbWVldFwiIHZpZXdCb3g9XCIwIDAgMjAgMTcuOVwiPjxwYXRoIGQ9XCJNMTkuMiA1LjdhNSA1IDAgMDEtMS40IDMuNUwxMCAxNi45IDIuMiA5LjJDMS4zIDguMi44IDcgLjggNS43YzAtMS4zLjUtMi41IDEuNC0zLjVDMy4xIDEuMyA0LjQuOCA1LjcuOHMyLjUuNSAzLjUgMS40bC4yLjIuNi44LjYtLjcuMi0uMkE1IDUgMCAwMTE0LjMuOWMxLjMgMCAyLjUuNSAzLjUgMS40LjkuOSAxLjQgMi4xIDEuNCAzLjR6XCIgY2xhc3M9XCJpY24td2lzaGxpc3RfX2hlYXJ0XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTguMyAxLjdhNS44IDUuOCAwIDAwLTQtMS43Yy0xLjUgMC0yLjkuNi00IDEuN0wxMCAybC0uMy0uM2E1LjYgNS42IDAgMDAtNC0xLjdjLTEuNSAwLTIuOS42LTQgMS43YTUuOCA1LjggMCAwMDAgOC4xbDggOCAuNC4xLjMtLjEgOC04YTUuNyA1LjcgMCAwMC0uMS04LjF6TTUuNy44YzEuMyAwIDIuNS41IDMuNSAxLjRsLjIuMi42LjguNi0uNy4yLS4yQTUgNSAwIDAxMTQuMy45YzEuMyAwIDIuNS41IDMuNSAxLjQuOS45IDEuNCAyLjEgMS40IDMuNWE1IDUgMCAwMS0xLjQgMy41TDEwIDE2LjkgMi4yIDkuMkMxLjMgOC4yLjggNyAuOCA1LjdjMC0xLjMuNS0yLjUgMS40LTMuNUMzLjIgMS4zIDQuNC44IDUuNy44elwiIGNsYXNzPVwiaWNuLXdpc2hsaXN0X19zdHJva2VcIj48L3BhdGg+PC9zdmc+PC9kaXY+J1xuICAgICAgKTtcbiAgICAgIC8vcmV0dXJuO1xuXG4gICAgICAvLyBsb2FkIHNpemVzXG4gICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHByb0lELCB7IHRlbXBsYXRlOiBcInByb2R1Y3RzL3F1aWNrLXZpZXctb3B0aW9uc1wiIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdmFpbGFibGVTaXplcyA9IFwiXCI7XG4gICAgICAgICQocmVzcG9uc2UpXG4gICAgICAgICAgLmZpbmQoXCIuZm9ybS1vcHRpb25cIilcbiAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSwgb2JqKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRJRCA9ICQodGhpcykuYXR0cihcImZvclwiKTtcbiAgICAgICAgICAgIHZhciBkYXRhX3Byb2R1Y3RfYXR0cmlidXRlX3ZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZVwiKTtcbiAgICAgICAgICAgIHZhciBhdHRyX25hbWUgPSAkKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAuZmluZChcIiNcIiArIGlucHV0SUQpXG4gICAgICAgICAgICAgIC5hdHRyKFwibmFtZVwiKTtcblxuICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZXMgKz1cbiAgICAgICAgICAgICAgXCI8bGFiZWwgaWQ9J1wiICtcbiAgICAgICAgICAgICAgcHJvSUQgK1xuICAgICAgICAgICAgICBcIicgY2xhc3M9J2Zvcm0tb3B0aW9uIHVuYXZhaWxhYmxlaW5MaXN0IElzUHJvZEF2YWlsYWJsZS1cIiArXG4gICAgICAgICAgICAgIHByb0lEICtcbiAgICAgICAgICAgICAgXCItXCIgK1xuICAgICAgICAgICAgICBkYXRhX3Byb2R1Y3RfYXR0cmlidXRlX3ZhbHVlICtcbiAgICAgICAgICAgICAgXCIgYWRkLW1lLXRvLWNhcnQnIGRhdGEtcG9wdXAtdHlwZT0nYWRkLXRvLWJhZycgZm9yPSdcIiArXG4gICAgICAgICAgICAgIGlucHV0SUQgK1xuICAgICAgICAgICAgICBcIicgZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZT0nXCIgK1xuICAgICAgICAgICAgICBkYXRhX3Byb2R1Y3RfYXR0cmlidXRlX3ZhbHVlICtcbiAgICAgICAgICAgICAgXCInIG5hbWU9J1wiICtcbiAgICAgICAgICAgICAgYXR0cl9uYW1lICtcbiAgICAgICAgICAgICAgXCInID48YSBocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7JyBjbGFzcz0nY2FyZC1zaXplLW9wdGlvbicgZGF0YS1yZXZlYWwtaWQ9J2FkZC1mcm9tLXNpemUnID5cIiArXG4gICAgICAgICAgICAgICQodGhpcykuaHRtbCgpICtcbiAgICAgICAgICAgICAgXCI8L2E+PC9sYWJlbD5cIjtcblxuICAgICAgICAgICAgJChcIiNsb2FkUXVpY2tWaWV3LVwiICsgcHJvSUQpLmh0bWwoYXZhaWxhYmxlU2l6ZXMpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIisrXCIpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb0lELCBcInByb2R1Y3RfaWQ9XCIgKyBwcm9JRCwgXCJwcm9kdWN0cy9xdWljay12aWV3LW9wdGlvbnNcIiwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgLy8gZnJvbSByZXNwb25zZSBnZXQgdGhlIGF2YWlsYWJsZSBhdHRyaWJ1dGVzXG5cbiAgICAgICAgICAgICAgdmFyIHByb2R1Y3RBdHRyaWJ1dGVzID0gcmVzcG9uc2UuZGF0YS5hdmFpbGFibGVfdmFyaWFudF92YWx1ZXM7XG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICBpZiAocHJvZHVjdEF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RBdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1iZXIrXCIgPT0gXCIpO1xuICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkKGF2YWlsYWJsZVNpemVzKS5maW5kKFwiLkluUHJvZEF2YWlsYWJsZVwiKSk7XG4gICAgICAgICAgICAgICAgICAkKFwiLklzUHJvZEF2YWlsYWJsZS1cIiArIHByb0lEICsgXCItXCIgKyBudW1iZXIpLnJlbW92ZUNsYXNzKFwidW5hdmFpbGFibGVpbkxpc3RcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAkZm9ybS5maW5kKFwiW2RhdGEtaW5wdXRdXCIpLmVhY2goKF8sIGlucHV0KSA9PiB7XG4gICAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgIGNvbnN0IG1zZ1NwYW5JZCA9IGAkeyRpbnB1dC5hdHRyKFwibmFtZVwiKX0tbXNnYDtcblxuICAgICAgJGlucHV0LnNpYmxpbmdzKFwic3BhblwiKS5hdHRyKFwiaWRcIiwgbXNnU3BhbklkKTtcbiAgICAgICRpbnB1dC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBtc2dTcGFuSWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMudXJsLmluZGV4T2YoXCIjd3JpdGVfcmV2aWV3XCIpICE9PSAtMSkge1xuICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgfVxuICB9XG5cbiAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI2J1bGtfcHJpY2luZ1wiKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gbG9hZGluZyB2YXJpYW50cyBzdG9jayBsZXZlbFxuICBnZXRWYXJpYW50U3RvY2tMZXZlbHMoKSB7XG4gICAgY29uc3QgJG9wdGlvblNldCA9ICQoXCJbZGF0YS1wcm9kdWN0LW9wdGlvbi1jaGFuZ2VdXCIpO1xuICAgIGNvbnN0ICRmb3JtID0gJG9wdGlvblNldC5wYXJlbnRzKCQoXCJmb3JtXCIpKTtcbiAgICBjb25zdCBwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCAkZm9ybSkudmFsKCk7XG4gICAgY29uc3QgJG9wdGlvbnNBcnJheSA9ICRvcHRpb25TZXQuZmluZChcIi5mb3JtLXJhZGlvXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKCckb3B0aW9uc0FycmF5JywgJG9wdGlvbnNBcnJheSk7XG5cbiAgICBpZiAoJG9wdGlvbnNBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAkKFwiLnByb2R1Y3RWaWV3LW9wdGlvbnNfX2Jsb2NrXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVyaW1hZ2VTdG9ja3Nob3dcIikuc2hvdygpO1xuICAgICAgJC5lYWNoKCRvcHRpb25zQXJyYXksIChpbmRleCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVJZCA9ICQoaXRlbSkuYXR0cihcIm5hbWVcIik7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZUlkSUQgPSAkKGl0ZW0pLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgY29uc3QgdmFyaWFudFNpemUgPSAkKCdbZm9yPVwiJyArIGF0dHJpYnV0ZUlkSUQgKyAnXCJdJywgJGZvcm0pXG4gICAgICAgICAgLnRleHQoKVxuICAgICAgICAgIC50cmltKCk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gJChpdGVtKS52YWwoKTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gYCR7YXR0cmlidXRlSWR9PSR7YXR0cmlidXRlVmFsdWV9YDtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgYXR0cmlidXRlLCBcInByb2R1Y3RzL3Byb2R1Y3Qtdmlldy1vcHRpb25zXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RvY2sgPiAwKSB7XG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3NCYXJIdG1sID0gXCJcIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cImJrLXN0b2NrLWNvdW50ZG93blwiPic7XG5cbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cInN0b2NrLWNvdW50ZG93bi1tZXNzYWdlXCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwibWVzc2FnZV9fdGV4dFwiPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxzcGFuIGNsYXNzPVwibWVzc2FnZV9fc2l6ZSBmb250LXdlaWdodC1ib2xkIHRleHQtdXBwZXJjYXNlXCI+U2l6ZSAnICsgdmFyaWFudFNpemUgKyBcIjwvc3Bhbj4gTGVzcyB0aGFuIFwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8c3BhbiBkYXRhLXZhcmlhbnQ9XCInICsgdmFyaWFudFNpemUgKyAnXCIgY2xhc3M9XCJ2YXJpYW50LXN0b2NrIGZvbnQtd2VpZ2h0LWJvbGRcIj4nICsgcmVzcG9uc2UuZGF0YS5zdG9jayArIFwiPC9zcGFuPlwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiIGxlZnQgaW4gc3RvY2sgISEhXCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG5cbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBibHVlIHN0cmlwZXNcIj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgcmVzcG9uc2UuZGF0YS5zdG9jayArICclO1wiPjwvc3Bhbj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG5cbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuXG4gICAgICAgICAgICAkKFwiI2xvYWRQcm9kdWN0VmFyaWFudEJhcnNcIikuYXBwZW5kKHByb2dyZXNzQmFySHRtbCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS5za3UsIHJlc3BvbnNlLmRhdGEuc3RvY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKFwiI2xvYWRlcmltYWdlU3RvY2tzaG93XCIpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwbGF5VmlkZW8oKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcImZyb20gcGxheSB2aWRlb1wiKTtcblxuICAgICQoXCIucGxheUxvYWRlZFZpZGVvXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZpZGVvSUQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZpZGVvLWlkXCIpO1xuICAgICAgdmFyIHZpZXdwb3J0aGVpZ2h0ID0gJChcIi5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyXCIpLmhlaWdodCgpO1xuICAgICAgdmFyIHZpZXdwb3J0d2lkdGggPSAkKFwiLnByb2R1Y3RWaWV3LWltZy1jb250YWluZXJcIikud2lkdGgoKTtcbiAgICAgIHZhciBlbWJlZENvZGUgPVxuICAgICAgICAnPGlmcmFtZSBpZD1cImRvTm90UGxheU1lQW55TW9yZVwiIHR5cGU9XCJ0ZXh0L2h0bWxcIiB3aWR0aD1cIicgK1xuICAgICAgICB2aWV3cG9ydHdpZHRoICtcbiAgICAgICAgJ1wiIGhlaWdodD1cIicgK1xuICAgICAgICB2aWV3cG9ydGhlaWdodCArXG4gICAgICAgICdcIiBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICtcbiAgICAgICAgdmlkZW9JRCArXG4gICAgICAgICc/YXV0b3BsYXk9MSZtdXRlPTBcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvdz1cImF1dG9wbGF5O1wiPjwvaWZyYW1lPic7XG4gICAgICAvL2NvbnNvbGUubG9nKHZpZGVvSUQpO1xuXG4gICAgICAkKFwiLmxvYWRWaWRlb0hlcmVcIikuaHRtbChlbWJlZENvZGUpO1xuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLnNob3coKTtcbiAgICAgICQoXCIubG9hZEltYWdlSGVyZVwiKS5oaWRlKCk7XG4gICAgICAkKFwiI3Byb2R1Y3RWaWRlb1wiKS5hZGRDbGFzcyhcImRpc2FibGVab29tXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBjbGlja2VkXCIpO1xuICAgIH0pO1xuXG4gICAgJChcIi5pbWFnZVRodW1ibmFpbENsaWNrZWRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyQoXCIjZG9Ob3RQbGF5TWVBbnlNb3JlXCIpLnJlbW92ZSgpO1xuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLmh0bWwoXCJcIik7XG4gICAgICAkKFwiLmxvYWRWaWRlb0hlcmVcIikuaGlkZSgpO1xuICAgICAgJChcIi5sb2FkSW1hZ2VIZXJlXCIpLnNob3coKTtcbiAgICAgICQoXCIjcHJvZHVjdFZpZGVvXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVpvb21cIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkltYWdlIENsaWNrZWRcIik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgeyBDb2xsYXBzaWJsZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigkcmV2aWV3Rm9ybSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRyZXZpZXdGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcmV2aWV3c0NvbnRlbnQgPSAkKCcjcHJvZHVjdC1yZXZpZXdzJyk7XG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlID0gJCgnW2RhdGEtY29sbGFwc2libGVdJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMuaW5pdExpbmtCaW5kKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UGFnaW5hdGlvbkxpbmsoKTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZVJldmlld3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0aWFsIHBhZ2UgbG9hZCwgdGhlIHVzZXIgY2xpY2tzIG9uIFwiKDEyIFJldmlld3MpXCIgbGlua1xuICAgICAqIFRoZSBicm93c2VyIGp1bXBzIHRvIHRoZSByZXZpZXcgcGFnZSBhbmQgc2hvdWxkIGV4cGFuZCB0aGUgcmV2aWV3cyBzZWN0aW9uXG4gICAgICovXG4gICAgaW5pdExpbmtCaW5kKCkge1xuICAgICAgICBjb25zdCAkY29udGVudCA9ICQoJyNwcm9kdWN0UmV2aWV3cy1jb250ZW50JywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdMaW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld1RhYkxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcbiAgICAgICAgLy8gV2UncmUgaW4gcGFnaW5hdGluZyBzdGF0ZSwgZG8gbm90IGNvbGxhcHNlXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKCcjcHJvZHVjdC1yZXZpZXdzJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgSUQgaW50byB0aGUgcGFnaW5hdGlvbiBsaW5rXG4gICAgICovXG4gICAgaW5qZWN0UGFnaW5hdGlvbkxpbmsoKSB7XG4gICAgICAgIGNvbnN0ICRuZXh0TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICBpZiAoJG5leHRMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclZhbGlkYXRpb24oY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoW3tcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZyYXRpbmdcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdSYXRpbmcsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld1N1YmplY3QsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0ZXh0XCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3Q29tbWVudCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICcud3JpdGVSZXZpZXctZm9ybSBbbmFtZT1cImVtYWlsXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG4gICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdFbWFpbCxcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==