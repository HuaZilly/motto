(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvcmV2aWV3cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbImZvcm1zIiwiZW1haWwiLCJ2YWx1ZSIsInJlIiwidGVzdCIsInBhc3N3b3JkIiwibm90RW1wdHkiLCJsZW5ndGgiLCJpbnB1dFRhZ05hbWVzIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IiwiZW1wdHkiLCJjb25maXJtIiwibWlzbWF0Y2giLCJpbnZhbGlkIiwib25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0Iiwib25Db25maXJtUGFzc3dvcmRFcnJvclRleHQiLCJvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQiLCJvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQiLCJjbGFzc2lmeUlucHV0IiwiaW5wdXQiLCJmb3JtRmllbGRDbGFzcyIsIiRpbnB1dCIsIiQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsImNsYXNzTmFtZSIsInNwZWNpZmljQ2xhc3NOYW1lIiwiaW5wdXRUeXBlIiwiX2luY2x1ZGVzIiwiX2NhbWVsQ2FzZSIsIl9jYXBpdGFsaXplIiwiYWRkQ2xhc3MiLCJjbGFzc2lmeUZvcm0iLCJmb3JtU2VsZWN0b3IiLCJvcHRpb25zIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwibWF0Y2giLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwiJHN0YXRlRmllbGQiLCJzdGF0ZUZpZWxkQXR0cnMiLCJ0eXBlIiwibmFtZSIsImFmdGVyIiwiVmFsaWRhdG9ycyIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkYXRvciIsImZpZWxkIiwiZXJyb3JUZXh0IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZXJyb3JNZXNzYWdlIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwicmVxdWlyZW1lbnRzIiwiX3JlZiIsImlzT3B0aW9uYWwiLCIkcGFzc3dvcmQiLCJwYXNzd29yZFZhbGlkYXRpb25zIiwiUmVnRXhwIiwiYWxwaGEiLCJudW1lcmljIiwibWlubGVuZ3RoIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwicHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJfcHJpY2VWYWxpZGF0aW9uRXJyb3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImRhdGEiLCJPYmplY3QiLCJrZXlzIiwibm9kIiwiY2xhc3NlcyIsImZvckVhY2giLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiV1JJVEVfUkVWSUVXIiwibW9kYWxUeXBlcyIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpczIiLCJkb2N1bWVudCIsIm9uIiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwidHJhbnNsYXRlQ29sb3VycyIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwiUmV2aWV3Iiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwicGxheVZpZGVvIiwibWFpblByb2R1Y3RJRCIsInByb1ByaWNlIiwidGV4dCIsInNpemUiLCJodG1sIiwic3RvY2siLCJjb25zb2xlIiwibG9nIiwic2hvdyIsImhpZGUiLCJtb3JlQ29sb3Vyc0Nhcm91c2VsIiwiaSIsInNyYyIsImF0dHIiLCJpbmNsdWRlcyIsImRhdGFfc3JjIiwiYnJhbmRTZWxlY3RvciIsImJyYW5kTmFtZSIsImJyYW5kVXJsIiwic3BsaXQiLCJjYXJvdXNlbFNldHRpbmdzIiwiZG90cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzbGlkZSIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXNwb25zZSIsInNsaWRlciIsIm5vb2ZzbGlkZXJzIiwic2xpY2siLCJlIiwiYmciLCJjc3MiLCJnZXRIZXhGcm9tQ29sb3JOYW1lIiwiTG9hZFByb2R1Y3RTaXplc1NlYXJjaCIsImxpc3RQcm9kdWN0cyIsImlkIiwibGkiLCJwcm9JRCIsImZvclByb0lEIiwiZGlzY291bnRlZFByaWNlIiwiTnVtYmVyIiwidHJpbSIsInJlcGxhY2UiLCJ0b0ZpeGVkIiwicHJvZHVjdCIsImdldEJ5SWQiLCJ0ZW1wbGF0ZSIsIkVycm9yIiwiYXZhaWxhYmxlU2l6ZXMiLCJvYmoiLCJpbnB1dElEIiwiZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSIsImF0dHJfbmFtZSIsInByb2R1Y3RBdHRyaWJ1dGVzIiwib3B0aW9uQ2hhbmdlIiwiYXZhaWxhYmxlX3ZhcmlhbnRfdmFsdWVzIiwibnVtYmVyIiwiXyIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwidHJpZ2dlciIsImdldFZhcmlhbnRTdG9ja0xldmVscyIsIiRvcHRpb25TZXQiLCJwYXJlbnRzIiwicHJvZHVjdElkIiwiJG9wdGlvbnNBcnJheSIsImluZGV4IiwiaXRlbSIsImF0dHJpYnV0ZUlkIiwiYXR0cmlidXRlSWRJRCIsInZhcmlhbnRTaXplIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGUiLCJwcm9ncmVzc0Jhckh0bWwiLCJhcHBlbmQiLCJ2aWRlb0lEIiwidmlld3BvcnRoZWlnaHQiLCJoZWlnaHQiLCJ2aWV3cG9ydHdpZHRoIiwid2lkdGgiLCJlbWJlZENvZGUiLCJQYWdlTWFuYWdlciIsIl9kZWZhdWx0Iiwic3VibWl0IiwiJHJldmlld3NDb250ZW50IiwiJGNvbGxhcHNpYmxlIiwiaW5pdExpbmtCaW5kIiwiaW5qZWN0UGFnaW5hdGlvbkxpbmsiLCJjb2xsYXBzZVJldmlld3MiLCIkY29udGVudCIsIkNvbGxhcHNpYmxlRXZlbnRzIiwiY2xpY2siLCJoYXNoIiwiJG5leHRMaW5rIiwiJHByZXZMaW5rIiwicmV2aWV3UmF0aW5nIiwicmV2aWV3U3ViamVjdCIsInJldmlld0NvbW1lbnQiLCJyZXZpZXdFbWFpbCIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsImJpbmQiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLElBQU1BLEtBQUssR0FBRztFQUNWQyxLQUFLLFdBQUFBLE1BQUNDLEtBQUssRUFBRTtJQUNULElBQU1DLEVBQUUsR0FBRyxZQUFZO0lBQ3ZCLE9BQU9BLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDRixLQUFLLENBQUM7RUFDekIsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSUcsUUFBUSxXQUFBQSxTQUFDSCxLQUFLLEVBQUU7SUFDWixPQUFPLElBQUksQ0FBQ0ksUUFBUSxDQUFDSixLQUFLLENBQUM7RUFDL0IsQ0FBQztFQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJSSxRQUFRLFdBQUFBLFNBQUNKLEtBQUssRUFBRTtJQUNaLE9BQU9BLEtBQUssQ0FBQ0ssTUFBTSxHQUFHLENBQUM7RUFDM0I7QUFDSixDQUFDO0FBRWNQLG9FQUFLLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Qks7QUFDVztBQUVwQyxJQUFNUSxhQUFhLEdBQUcsQ0FDbEIsT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLENBQ2I7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFiLFlBQUE7QUFBQTtBQUdVLFNBQVN6SCxZQUFZQSxDQUFBLEVBQUc7RUFDbkMsSUFBTXVJLFNBQVMsR0FBRyxlQUFlO0VBQ2pDLElBQU1DLGFBQWEsR0FBR2pRLENBQUMsWUFBVWdRLFNBQVMsTUFBRyxDQUFDO0VBRTlDQyxhQUFhLENBQUMzTyxJQUFJLENBQUMsVUFBQzJMLEtBQUssRUFBRWlELE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUduUSxDQUFDLENBQUNrUSxPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUNuTCxJQUFJLENBQUNnTCxTQUFTLENBQUMsWUFBWWQsWUFBWTtJQUVqRSxJQUFJa0IsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUNuTCxJQUFJLENBQUNnTCxTQUFTLEVBQUUsSUFBSWQsWUFBWSxDQUFDaUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL25vZCc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vbW9kZWxzL2Zvcm1zJztcblxuY29uc3QgaW5wdXRUYWdOYW1lcyA9IFtcbiAgICAnaW5wdXQnLFxuICAgICdzZWxlY3QnLFxuICAgICd0ZXh0YXJlYScsXG5dO1xuLyoqXG4gKiBTZXQgdXAgT2JqZWN0IHdpdGggRXJyb3IgTWVzc2FnZXMgb24gUGFzc3dvcmQgVmFsaWRhdGlvbi4gUGxlYXNlIHVzZSBtZXNzYWdlcyBpbiBtZW50aW9uZWQgb3JkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbXB0eSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGNvbmZpcm1hdGlvbiBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IG1pc21hdGNoIGRlZmluZXMgZXJyb3IgdGV4dCBpZiBjb25maXJtIHBhc3Nmb3JkIG1pc21hdGNoZXMgcGFzc2ZvcmQgZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZhbGlkIGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgaW52YWxpZCBwYXNzd29yZCBjaGFyYXRlcnMgc2VxdWVuY2VcbiAqIEByZXR1cm4ge29iamVjdH0gbWVzc2FnZXMgb3IgZGVmYXVsdCB0ZXh0cyBpZiBub3RoaW5nIGlzIHByb3ZpZGluZ1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0ID0gKGVtcHR5LCBjb25maXJtLCBtaXNtYXRjaCwgaW52YWxpZCkgPT4gKHtcbiAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQ6IGVtcHR5LFxuICAgIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0OiBjb25maXJtLFxuICAgIG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dDogbWlzbWF0Y2gsXG4gICAgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0OiBpbnZhbGlkLFxufSk7XG5cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGFuIGlucHV0IGVsZW1lbnQgb24gaXRzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZENsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmZ1bmN0aW9uIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xuICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXQucHJvcCgndGFnTmFtZScpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcbiAgICBsZXQgc3BlY2lmaWNDbGFzc05hbWU7XG5cbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSAkaW5wdXQucHJvcCgndHlwZScpO1xuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKFsncmFkaW8nLCAnY2hlY2tib3gnLCAnc3VibWl0J10sIGlucHV0VHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0tY2hlY2tib3gsIC5mb3JtLWZpZWxkLS1yYWRpb1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0taW5wdXQgLmZvcm0tZmllbGQtLWlucHV0VGV4dFxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgY2xhc3MgbW9kaWZpZXJcbiAgICByZXR1cm4gJGZvcm1GaWVsZFxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxuICAgICAgICAuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gZWFjaCBpbnB1dCBlbGVtZW50IGluIGEgZm9ybSBiYXNlZCBvbiBpdHMgdHlwZVxuICogQGV4YW1wbGVcbiAqIC8vIEJlZm9yZVxuICogPGZvcm0gaWQ9XCJmb3JtXCI+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiAgICAgPC9kaXY+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPHNlbGVjdD4uLi48L3NlbGVjdD5cbiAqICAgICA8L2Rpdj5cbiAqIDwvZm9ybT5cbiAqXG4gKiBjbGFzc2lmeUZvcm0oJyNmb3JtJywgeyBmb3JtRmllbGRDbGFzczogJ2Zvcm0tZmllbGQnIH0pO1xuICpcbiAqIC8vIEFmdGVyXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1pbnB1dCBmb3JtLWZpZWxkLS1pbnB1dFRleHRcIj4uLi48L2Rpdj5cbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZm9ybVNlbGVjdG9yIC0gc2VsZWN0b3Igb3IgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0ICRmb3JtID0gJChmb3JtU2VsZWN0b3IpO1xuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKGlucHV0VGFnTmFtZXMuam9pbignLCAnKSk7XG5cbiAgICAvLyBPYnRhaW4gb3B0aW9uc1xuICAgIGNvbnN0IHsgZm9ybUZpZWxkQ2xhc3MgPSAnZm9ybS1maWVsZCcgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBDbGFzc2lmeSBlYWNoIGlucHV0IGluIGEgZm9ybVxuICAgICRpbnB1dHMuZWFjaCgoX18sIGlucHV0KSA9PiB7XG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkZm9ybTtcbn1cblxuLyoqXG4gKiBHZXQgaWQgZnJvbSBnaXZlbiBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRmaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkSWQoJGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcblxuICAgIGlmIChmaWVsZElkICYmIGZpZWxkSWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBJbnNlcnQgaGlkZGVuIGZpZWxkIGFmdGVyIFN0YXRlL1Byb3ZpbmNlIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJHN0YXRlRmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRzdGF0ZUZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IGdldEZpZWxkSWQoJHN0YXRlRmllbGQpO1xuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgIG5hbWU6IGBGb3JtRmllbGRJc1RleHQke2ZpZWxkSWR9YCxcbiAgICAgICAgdmFsdWU6ICcxJyxcbiAgICB9O1xuXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XG59XG5cbmNvbnN0IFZhbGlkYXRvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yVGV4dCBkZXNjcmliZXMgZXJyb3JNYXNzYWdlIG9uIGVtYWlsIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBzZXRFbWFpbFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkMlNlbGVjdG9yXG4gICAgICogQHBhcmFtIHJlcXVpcmVtZW50c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvclRleHRzT2JqZWN0XG4gICAgICogQHBhcmFtIGlzT3B0aW9uYWxcbiAgICAgKi9cbiAgICBzZXRQYXNzd29yZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHBhc3N3b3JkU2VsZWN0b3IsIHBhc3N3b3JkMlNlbGVjdG9yLCByZXF1aXJlbWVudHMsIHtcbiAgICAgICAgb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0LCBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCwgb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0LCBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXG4gICAgfSwgaXNPcHRpb25hbCkgPT4ge1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZFZhbGlkYXRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLm51bWVyaWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLmxlbmd0aCA+PSByZXF1aXJlbWVudHMubWlubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIGFuZCBub3RoaW5nIGVudGVyZWQsIGl0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwgPT09ICRwYXNzd29yZC52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQocGFzc3dvcmRWYWxpZGF0aW9ucyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB7Tm9kfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0b3JzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5lcnJvclNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5maWVsZHNldFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5mb3JtU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1heFByaWNlU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1pblByaWNlU2VsZWN0b3JcbiAgICAgKi9cbiAgICBzZXRNaW5NYXhQcmljZVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHNlbGVjdG9ycywgcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3IsXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cztcblxuICAgICAgICB2YWxpZGF0b3IuY29uZmlndXJlKHtcbiAgICAgICAgICAgIGZvcm06IGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIHByZXZlbnRTdWJtaXQ6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzQ2xhc3M6ICdfJywgLy8gS0xVREdFOiBEb24ndCBhcHBseSBzdWNjZXNzIGNsYXNzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdtaW4tbnVtYmVyOjAnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3Iuc2V0TWVzc2FnZU9wdGlvbnMoe1xuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHBhcmVudDogZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGVycm9yU3BhbjogZXJyb3JTZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldFN0YXRlQ291bnRyeVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNsYXNzZXMgZnJvbSBkaXJ0eSBmb3JtIGlmIHByZXZpb3VzbHkgY2hlY2tlZFxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIGNsZWFuVXBTdGF0ZVZhbGlkYXRpb246IChmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCAkZmllbGRDbGFzc0VsZW1lbnQgPSAkKChgW2RhdGEtdHlwZT1cIiR7ZmllbGQuZGF0YSgnZmllbGRUeXBlJyl9XCJdYCkpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG5vZC5jbGFzc2VzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWVsZENsYXNzRWxlbWVudC5oYXNDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkQ2xhc3NFbGVtZW50LnJlbW92ZUNsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuXG5leHBvcnQgeyBWYWxpZGF0b3JzLCBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH07XG4iLCIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSBcIi4vcGFnZS1tYW5hZ2VyXCI7XG5pbXBvcnQgUmV2aWV3IGZyb20gXCIuL3Byb2R1Y3QvcmV2aWV3c1wiO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tIFwiLi9jb21tb24vY29sbGFwc2libGVcIjtcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tIFwiLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzXCI7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gXCIuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeVwiO1xuaW1wb3J0IHsgY2xhc3NpZnlGb3JtIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHNcIjtcbmltcG9ydCBtb2RhbEZhY3RvcnksIHsgbW9kYWxUeXBlcyB9IGZyb20gXCIuL2dsb2JhbC9tb2RhbFwiO1xuXG5pbXBvcnQgeyBub3JtYWxpemVGb3JtRGF0YSB9IGZyb20gXCIuL2NvbW1vbi91dGlscy9hcGlcIjtcbi8vIGltcG9ydCBtb2RhbEZhY3RvcnksIHsgc2hvd0FsZXJ0TW9kYWwsIG1vZGFsVHlwZXMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmltcG9ydCB1dGlscyBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCBqcXVlcnltYXRjaGhlaWdodCBmcm9tIFwianF1ZXJ5LW1hdGNoLWhlaWdodFwiO1xuXG5pbXBvcnQgY2Fyb3VzZWwgZnJvbSBcIi4vY29tbW9uL2Nhcm91c2VsXCI7XG5pbXBvcnQgeyBnZXRIZXhGcm9tQ29sb3JOYW1lIH0gZnJvbSBcIi4vY3VzdG9tL250Y1wiO1xuXG5jb25zdCB7IFdSSVRFX1JFVklFVyB9ID0gbW9kYWxUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgdGhpcy4kcmV2aWV3TGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJyk7XG4gICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XG4gICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeShcIiNtb2RhbC1yZXZpZXctZm9ybVwiKVswXTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xvc2UuZm5kdG4ucmV2ZWFsXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI3dyaXRlX3Jldmlld1wiKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCB2YWxpZGF0b3I7XG5cbiAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoXCIucHJvZHVjdFZpZXdcIiksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgIHZpZGVvR2FsbGVyeSgpO1xuXG4gICAgdGhpcy50cmFuc2xhdGVDb2xvdXJzKCk7XG5cbiAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuXG4gICAgY29uc3QgJHJldmlld0Zvcm0gPSBjbGFzc2lmeUZvcm0oXCIud3JpdGVSZXZpZXctZm9ybVwiKTtcblxuICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZXZpZXcgPSBuZXcgUmV2aWV3KCRyZXZpZXdGb3JtKTtcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwib3BlbmVkLmZuZHRuLnJldmVhbFwiLCAoKSA9PiB0aGlzLnJldmlld01vZGFsLnNldHVwRm9jdXNhYmxlRWxlbWVudHMoV1JJVEVfUkVWSUVXKSk7XG4gICAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgdmFsaWRhdG9yID0gcmV2aWV3LnJlZ2lzdGVyVmFsaWRhdGlvbih0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICB9KTtcbiAgICAgICRyZXZpZXdGb3JtLm9uKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmFyZUFsbChcInZhbGlkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdwcm9kdWN0dHR0dHR0dHR0dHR0dHR0dHR0dHQuanMnKTtcblxuICAgIC8vIGxvYWRzIHRoZSB2YXJpYW50cyBzdG9jayBsZXZlbFxuICAgIC8vIHRoaXMuZ2V0VmFyaWFudFN0b2NrTGV2ZWxzKCk7XG4gICAgdGhpcy5wbGF5VmlkZW8oKTtcblxuICAgIHZhciBtYWluUHJvZHVjdElEID0gJCgnaW5wdXRbbmFtZT1cInByb2R1Y3RfaWRcIl0nKS52YWwoKTtcbiAgICB2YXIgcHJvUHJpY2UgPSAkKFwiLnByb2R1Y3RWaWV3LXByaWNlIC5wcmljZS1zZWN0aW9uIC5tYWluTG9hZGVkUHJpY2VcIikudGV4dCgpO1xuICAgIC8vIHZhciBkaXNjb3VudGVkUHJpY2UgPSAoTnVtYmVyKHByb1ByaWNlLnRyaW0oKS5yZXBsYWNlKFwiJFwiLFwiXCIpKSpOdW1iZXIoMC45MCkpLnRvRml4ZWQoMik7XG4gICAgLy8gJChcIi5kaXNjb3VudGVkUHJpY2VTaW5nbGVQYWdlLVwiK21haW5Qcm9kdWN0SUQpLmh0bWwoXCIkXCIrZGlzY291bnRlZFByaWNlKTtcblxuICAgIC8vIHRoaXMuTG9hZFByb2R1Y3RTaXplc1NlYXJjaCgpO1xuXG4gICAgJChcIi5wcm9kdWN0Vmlldy1vcHRpb25zX19ibG9jayBsYWJlbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaXplID0gJCh0aGlzKS5maW5kKFwic3BhblwiKS5odG1sKCk7XG5cbiAgICAgIHZhciBzdG9jayA9ICQoJ3NwYW5bZGF0YS12YXJpYW50PVwiJyArIHNpemUgKyAnXCJdJykuaHRtbCgpO1xuXG4gICAgICBjb25zb2xlLmxvZyhzaXplICsgXCIgaGFzIHN0b2NrIFwiICsgc3RvY2spO1xuXG4gICAgICBpZiAoc3RvY2sgPCA2KSB7XG4gICAgICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fc3RvY2tcIikuc2hvdygpLmZpbmQoXCIuc3RvY2stcXR5XCIpLmh0bWwoc3RvY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi5wcm9kdWN0Vmlldy1vcHRpb25zX19zdG9ja1wiKS5oaWRlKCkuZmluZChcIi5zdG9jay1xdHlcIikuaHRtbChcIlwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubW9yZUNvbG91cnNDYXJvdXNlbCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIndpbmRvdyBsb2FkZWRcIik7XG5cbiAgICAgICQoXCIuTWFnaWNab29tR2FsbGVyeVwiKVxuICAgICAgICAuZmluZChcImlmcmFtZVwiKVxuICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFnaWNcIiwgJCh0aGlzKSk7XG5cbiAgICAgICAgICB2YXIgc3JjID0gJCh0aGlzKS5hdHRyKFwic3JjXCIpO1xuICAgICAgICAgIGlmIChzcmMgJiYgKHNyYy5pbmNsdWRlcyhcInlvdXR1YmVcIikgfHwgc3JjLmluY2x1ZGVzKFwidmltZW9cIikpKSB7XG4gICAgICAgICAgICBzcmMgKz0gXCImcmVsPTAmZnM9MCZjb250cm9scz0wXCI7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJzcmNcIiwgc3JjKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3JjXCIsIHNyYyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRhdGFfc3JjID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zcmNcIik7XG4gICAgICAgICAgaWYgKGRhdGFfc3JjICYmIChkYXRhX3NyYy5pbmNsdWRlcyhcInlvdXR1YmVcIikgfHwgZGF0YV9zcmMuaW5jbHVkZXMoXCJ2aW1lb1wiKSkpIHtcbiAgICAgICAgICAgIGRhdGFfc3JjICs9IFwiJnJlbD0wJmZzPTAmY29udHJvbHM9MFwiO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1zcmNcIiwgZGF0YV9zcmMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhX3NyY1wiLCBkYXRhX3NyYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vcmVDb2xvdXJzQ2Fyb3VzZWwoKSB7XG4gICAgdmFyIGJyYW5kU2VsZWN0b3IgPSAkKFwiW2RhdGEtYnJhbmRdXCIpO1xuICAgIHZhciBicmFuZE5hbWUgPSBicmFuZFNlbGVjdG9yLmF0dHIoXCJkYXRhLWJyYW5kXCIpO1xuICAgIHZhciBicmFuZFVybCA9IFwiL2JyYW5kcy9cIiArIGJyYW5kTmFtZS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSArIFwiL1wiO1xuXG4gICAgbGV0IGNhcm91c2VsU2V0dGluZ3MgPSB7XG4gICAgICBkb3RzOiBmYWxzZSxcbiAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgLy8gbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgIHNsaWRlOiBcIi5qcy1wcm9kdWN0LXNsaWRlXCIsXG4gICAgICBhcnJvd3M6IHRydWUsXG4gICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDU1MCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuXG4gICAgdXRpbHMuYXBpLmdldFBhZ2UoYnJhbmRVcmwsIFwiL3RlbXBsYXRlcy9icmFuZFwiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgdmFyIHNsaWRlciA9ICQocmVzcG9uc2UpLmZpbmQoXCIjYnJhbmRwcm9kdWN0cy1zbGlkZXJcIikuaHRtbCgpO1xuXG4gICAgICB2YXIgbm9vZnNsaWRlcnMgPSAkKHNsaWRlcikuZmluZChcImFydGljbGVcIikubGVuZ3RoO1xuICAgICAgXG4gICAgICBpZiAobm9vZnNsaWRlcnMgPCAyKSB7XG4gICAgICAgICQoXCIubW9yZS1jb2xvdXJzLWJsb2NrXCIpLnJlbW92ZUNsYXNzKFwiZC1tZC1ibG9ja1wiKTtcbiAgICAgICAgJChcIi5tb3JlLWNvbG91cnMtbW9iaWxlXCIpLmFkZENsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi5sb2FkYXZhaWxhYmxlcHJvZHVjdHMtbW9iXCIpLmh0bWwoc2xpZGVyKS5zbGljayhjYXJvdXNlbFNldHRpbmdzKTtcbiAgICAgICAgLy8gJChcIi5sb2FkYXZhaWxhYmxlcHJvZHVjdHMtbW9iXCIpLnNsaWNrKGNhcm91c2VsU2V0dGluZ3MpO1xuICAgICAgfVxuICAgICAgaWYobm9vZnNsaWRlcnMgPD0gMil7XG4gICAgICAgICQoJy5sb2FkYXZhaWxhYmxlcHJvZHVjdHMtbW9iJykuc2xpY2soJ3Vuc2xpY2snKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubW9yZS1jb2xvdXJzLW1vYmlsZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJzbGlja29uY2xpY2tcIikpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNsaWNrb25jbGlja1wiKTtcbiAgICAgICAgJChcIi5sb2FkYXZhaWxhYmxlcHJvZHVjdHMtbW9iXCIpLnNsaWNrKFwiZGVzdHJveVwiKS5zbGljayhjYXJvdXNlbFNldHRpbmdzKTtcbiAgICAgIH1cbiAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKGJyYW5kVXJsLCBcIi90ZW1wbGF0ZXMvYnJhbmRcIiwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgdmFyIHNsaWRlciA9ICQocmVzcG9uc2UpLmZpbmQoXCIjYnJhbmRwcm9kdWN0cy1zbGlkZXJcIikuaHRtbCgpO1xuICBcbiAgICAgICAgdmFyIG5vb2ZzbGlkZXJzID0gJChzbGlkZXIpLmZpbmQoXCJhcnRpY2xlXCIpLmxlbmd0aDtcbiAgICAgICAgLy8gYWxlcnQobm9vZnNsaWRlcnMpO1xuICAgICAgICBpZiAobm9vZnNsaWRlcnMgPD0gMikge1xuICAgICAgICAgICQoJy5sb2FkYXZhaWxhYmxlcHJvZHVjdHMtbW9iJykuc2xpY2soJ3Vuc2xpY2snKTtcbiAgICAgICAgfSBcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICB0cmFuc2xhdGVDb2xvdXJzKCkge1xuICAgICQoXCJbZGF0YS1mb3JtYXRiZ11cIikuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgY29uc3QgYmcgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWZvcm1hdGJnXCIpO1xuICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIGdldEhleEZyb21Db2xvck5hbWUoYmcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIExvYWRQcm9kdWN0U2l6ZXNTZWFyY2goKSB7XG4gICAgdmFyIGxpc3RQcm9kdWN0cyA9ICQoXCIucHJvZHVjdC1jdXN0b21lcnZpZXdlZCAuc2xpY2stbGlzdCAuc2xpY2stdHJhY2sgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZVwiKTtcblxuICAgIGxpc3RQcm9kdWN0cy5lYWNoKGZ1bmN0aW9uIChpZCwgbGkpIHtcbiAgICAgIC8vdmFyIFByb2R1Y3QgPSAkKGxpKTtcbiAgICAgIHZhciBwcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzXCIpLnRleHQoKTtcbiAgICAgIHZhciBmb3JQcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzT25seVwiKS50ZXh0KCk7XG4gICAgICB2YXIgcHJvUHJpY2UgPSAkKHRoaXMpLmZpbmQoXCIubWFpbkxvYWRlZFByaWNlXCIpLnRleHQoKTtcbiAgICAgIHZhciBkaXNjb3VudGVkUHJpY2UgPSAoTnVtYmVyKHByb1ByaWNlLnRyaW0oKS5yZXBsYWNlKFwiJFwiLCBcIlwiKSkgKiBOdW1iZXIoMC45KSkudG9GaXhlZCgyKTtcbiAgICAgIC8vY29uc29sZS5sb2coZGlzY291bnRlZFByaWNlKTtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvUHJpY2UpO1xuXG4gICAgICAkKFwiLmRpc2NvdW50ZWRQcmljZUNhdGVnb3J5LVwiICsgZm9yUHJvSUQpLmh0bWwoXCIkXCIgKyBkaXNjb3VudGVkUHJpY2UpO1xuXG4gICAgICBpZiAocHJvSUQgPT0gXCJOT1wiKSByZXR1cm47XG4gICAgICAvL2NvbnNvbGUubG9nKHByb0lEKTtcblxuICAgICAgJChcIiNsb2FkUXVpY2tWaWV3LVwiICsgcHJvSUQpLmh0bWwoXG4gICAgICAgICc8ZGl2IGlkPVwibG9hZGVyaW1hZ2VcIiBjbGFzcz1cImxvYWRpbmdPdmVybGF5IGxvYWRpbmdPdmVybGF5LS10cmFuc2l0aW9uXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNuLWxvYWRlclwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCIgdmlld0JveD1cIjAgMCAyMCAxNy45XCI+PHBhdGggZD1cIk0xOS4yIDUuN2E1IDUgMCAwMS0xLjQgMy41TDEwIDE2LjkgMi4yIDkuMkMxLjMgOC4yLjggNyAuOCA1LjdjMC0xLjMuNS0yLjUgMS40LTMuNUMzLjEgMS4zIDQuNC44IDUuNy44czIuNS41IDMuNSAxLjRsLjIuMi42LjguNi0uNy4yLS4yQTUgNSAwIDAxMTQuMy45YzEuMyAwIDIuNS41IDMuNSAxLjQuOS45IDEuNCAyLjEgMS40IDMuNHpcIiBjbGFzcz1cImljbi13aXNobGlzdF9faGVhcnRcIj48L3BhdGg+PHBhdGggZD1cIk0xOC4zIDEuN2E1LjggNS44IDAgMDAtNC0xLjdjLTEuNSAwLTIuOS42LTQgMS43TDEwIDJsLS4zLS4zYTUuNiA1LjYgMCAwMC00LTEuN2MtMS41IDAtMi45LjYtNCAxLjdhNS44IDUuOCAwIDAwMCA4LjFsOCA4IC40LjEuMy0uMSA4LThhNS43IDUuNyAwIDAwLS4xLTguMXpNNS43LjhjMS4zIDAgMi41LjUgMy41IDEuNGwuMi4yLjYuOC42LS43LjItLjJBNSA1IDAgMDExNC4zLjljMS4zIDAgMi41LjUgMy41IDEuNC45LjkgMS40IDIuMSAxLjQgMy41YTUgNSAwIDAxLTEuNCAzLjVMMTAgMTYuOSAyLjIgOS4yQzEuMyA4LjIuOCA3IC44IDUuN2MwLTEuMy41LTIuNSAxLjQtMy41QzMuMiAxLjMgNC40LjggNS43Ljh6XCIgY2xhc3M9XCJpY24td2lzaGxpc3RfX3N0cm9rZVwiPjwvcGF0aD48L3N2Zz48L2Rpdj4nXG4gICAgICApO1xuICAgICAgLy9yZXR1cm47XG5cbiAgICAgIC8vIGxvYWQgc2l6ZXNcbiAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQocHJvSUQsIHsgdGVtcGxhdGU6IFwicHJvZHVjdHMvcXVpY2stdmlldy1vcHRpb25zXCIgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGF2YWlsYWJsZVNpemVzID0gXCJcIjtcbiAgICAgICAgJChyZXNwb25zZSlcbiAgICAgICAgICAuZmluZChcIi5mb3JtLW9wdGlvblwiKVxuICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpLCBvYmopIHtcbiAgICAgICAgICAgIHZhciBpbnB1dElEID0gJCh0aGlzKS5hdHRyKFwiZm9yXCIpO1xuICAgICAgICAgICAgdmFyIGRhdGFfcHJvZHVjdF9hdHRyaWJ1dGVfdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXCIpO1xuICAgICAgICAgICAgdmFyIGF0dHJfbmFtZSA9ICQocmVzcG9uc2UpXG4gICAgICAgICAgICAgIC5maW5kKFwiI1wiICsgaW5wdXRJRClcbiAgICAgICAgICAgICAgLmF0dHIoXCJuYW1lXCIpO1xuXG4gICAgICAgICAgICBhdmFpbGFibGVTaXplcyArPVxuICAgICAgICAgICAgICBcIjxsYWJlbCBpZD0nXCIgK1xuICAgICAgICAgICAgICBwcm9JRCArXG4gICAgICAgICAgICAgIFwiJyBjbGFzcz0nZm9ybS1vcHRpb24gdW5hdmFpbGFibGVpbkxpc3QgSXNQcm9kQXZhaWxhYmxlLVwiICtcbiAgICAgICAgICAgICAgcHJvSUQgK1xuICAgICAgICAgICAgICBcIi1cIiArXG4gICAgICAgICAgICAgIGRhdGFfcHJvZHVjdF9hdHRyaWJ1dGVfdmFsdWUgK1xuICAgICAgICAgICAgICBcIiBhZGQtbWUtdG8tY2FydCcgZGF0YS1wb3B1cC10eXBlPSdhZGQtdG8tYmFnJyBmb3I9J1wiICtcbiAgICAgICAgICAgICAgaW5wdXRJRCArXG4gICAgICAgICAgICAgIFwiJyBkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlPSdcIiArXG4gICAgICAgICAgICAgIGRhdGFfcHJvZHVjdF9hdHRyaWJ1dGVfdmFsdWUgK1xuICAgICAgICAgICAgICBcIicgbmFtZT0nXCIgK1xuICAgICAgICAgICAgICBhdHRyX25hbWUgK1xuICAgICAgICAgICAgICBcIicgPjxhIGhyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnIGNsYXNzPSdjYXJkLXNpemUtb3B0aW9uJyBkYXRhLXJldmVhbC1pZD0nYWRkLWZyb20tc2l6ZScgPlwiICtcbiAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKCkgK1xuICAgICAgICAgICAgICBcIjwvYT48L2xhYmVsPlwiO1xuXG4gICAgICAgICAgICAkKFwiI2xvYWRRdWlja1ZpZXctXCIgKyBwcm9JRCkuaHRtbChhdmFpbGFibGVTaXplcyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiKytcIik7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvSUQsIFwicHJvZHVjdF9pZD1cIiArIHByb0lELCBcInByb2R1Y3RzL3F1aWNrLXZpZXctb3B0aW9uc1wiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAvLyBmcm9tIHJlc3BvbnNlIGdldCB0aGUgYXZhaWxhYmxlIGF0dHJpYnV0ZXNcblxuICAgICAgICAgICAgICB2YXIgcHJvZHVjdEF0dHJpYnV0ZXMgPSByZXNwb25zZS5kYXRhLmF2YWlsYWJsZV92YXJpYW50X3ZhbHVlcztcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcm9kdWN0QXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgIGlmIChwcm9kdWN0QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdEF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG51bWJlcitcIiA9PSBcIik7XG4gICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCQoYXZhaWxhYmxlU2l6ZXMpLmZpbmQoXCIuSW5Qcm9kQXZhaWxhYmxlXCIpKTtcbiAgICAgICAgICAgICAgICAgICQoXCIuSXNQcm9kQXZhaWxhYmxlLVwiICsgcHJvSUQgKyBcIi1cIiArIG51bWJlcikucmVtb3ZlQ2xhc3MoXCJ1bmF2YWlsYWJsZWluTGlzdFwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFyaWFEZXNjcmliZVJldmlld0lucHV0cygkZm9ybSkge1xuICAgICRmb3JtLmZpbmQoXCJbZGF0YS1pbnB1dF1cIikuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoXCJuYW1lXCIpfS1tc2dgO1xuXG4gICAgICAkaW5wdXQuc2libGluZ3MoXCJzcGFuXCIpLmF0dHIoXCJpZFwiLCBtc2dTcGFuSWQpO1xuICAgICAgJGlucHV0LmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIG1zZ1NwYW5JZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiN3cml0ZV9yZXZpZXdcIikgIT09IC0xKSB7XG4gICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICB9XG4gIH1cblxuICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMudXJsLmluZGV4T2YoXCIjYnVsa19wcmljaW5nXCIpICE9PSAtMSkge1xuICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICB9XG4gIH1cblxuICAvLyBsb2FkaW5nIHZhcmlhbnRzIHN0b2NrIGxldmVsXG4gIGdldFZhcmlhbnRTdG9ja0xldmVscygpIHtcbiAgICBjb25zdCAkb3B0aW9uU2V0ID0gJChcIltkYXRhLXByb2R1Y3Qtb3B0aW9uLWNoYW5nZV1cIik7XG4gICAgY29uc3QgJGZvcm0gPSAkb3B0aW9uU2V0LnBhcmVudHMoJChcImZvcm1cIikpO1xuICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsICRmb3JtKS52YWwoKTtcbiAgICBjb25zdCAkb3B0aW9uc0FycmF5ID0gJG9wdGlvblNldC5maW5kKFwiLmZvcm0tcmFkaW9cIik7XG4gICAgLy8gY29uc29sZS5sb2coJyRvcHRpb25zQXJyYXknLCAkb3B0aW9uc0FycmF5KTtcblxuICAgIGlmICgkb3B0aW9uc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fYmxvY2tcIikuc2hvdygpO1xuICAgICAgJChcIiNsb2FkZXJpbWFnZVN0b2Nrc2hvd1wiKS5zaG93KCk7XG4gICAgICAkLmVhY2goJG9wdGlvbnNBcnJheSwgKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZUlkID0gJChpdGVtKS5hdHRyKFwibmFtZVwiKTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlSWRJRCA9ICQoaXRlbSkuYXR0cihcImlkXCIpO1xuICAgICAgICBjb25zdCB2YXJpYW50U2l6ZSA9ICQoJ1tmb3I9XCInICsgYXR0cmlidXRlSWRJRCArICdcIl0nLCAkZm9ybSlcbiAgICAgICAgICAudGV4dCgpXG4gICAgICAgICAgLnRyaW0oKTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSAkKGl0ZW0pLnZhbCgpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBgJHthdHRyaWJ1dGVJZH09JHthdHRyaWJ1dGVWYWx1ZX1gO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCBhdHRyaWJ1dGUsIFwicHJvZHVjdHMvcHJvZHVjdC12aWV3LW9wdGlvbnNcIiwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdG9jayA+IDApIHtcbiAgICAgICAgICAgIHZhciBwcm9ncmVzc0Jhckh0bWwgPSBcIlwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwiYmstc3RvY2stY291bnRkb3duXCI+JztcblxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwic3RvY2stY291bnRkb3duLW1lc3NhZ2VcIj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJtZXNzYWdlX190ZXh0XCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPHNwYW4gY2xhc3M9XCJtZXNzYWdlX19zaXplIGZvbnQtd2VpZ2h0LWJvbGQgdGV4dC11cHBlcmNhc2VcIj5TaXplICcgKyB2YXJpYW50U2l6ZSArIFwiPC9zcGFuPiBMZXNzIHRoYW4gXCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxzcGFuIGRhdGEtdmFyaWFudD1cIicgKyB2YXJpYW50U2l6ZSArICdcIiBjbGFzcz1cInZhcmlhbnQtc3RvY2sgZm9udC13ZWlnaHQtYm9sZFwiPicgKyByZXNwb25zZS5kYXRhLnN0b2NrICsgXCI8L3NwYW4+XCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCIgbGVmdCBpbiBzdG9jayAhISFcIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcblxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIGJsdWUgc3RyaXBlc1wiPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxzcGFuIHN0eWxlPVwid2lkdGg6ICcgKyByZXNwb25zZS5kYXRhLnN0b2NrICsgJyU7XCI+PC9zcGFuPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcblxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG5cbiAgICAgICAgICAgICQoXCIjbG9hZFByb2R1Y3RWYXJpYW50QmFyc1wiKS5hcHBlbmQocHJvZ3Jlc3NCYXJIdG1sKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLnNrdSwgcmVzcG9uc2UuZGF0YS5zdG9jayk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoXCIjbG9hZGVyaW1hZ2VTdG9ja3Nob3dcIikuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlWaWRlbygpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiZnJvbSBwbGF5IHZpZGVvXCIpO1xuXG4gICAgJChcIi5wbGF5TG9hZGVkVmlkZW9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmlkZW9JRCA9ICQodGhpcykuYXR0cihcImRhdGEtdmlkZW8taWRcIik7XG4gICAgICB2YXIgdmlld3BvcnRoZWlnaHQgPSAkKFwiLnByb2R1Y3RWaWV3LWltZy1jb250YWluZXJcIikuaGVpZ2h0KCk7XG4gICAgICB2YXIgdmlld3BvcnR3aWR0aCA9ICQoXCIucHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lclwiKS53aWR0aCgpO1xuICAgICAgdmFyIGVtYmVkQ29kZSA9XG4gICAgICAgICc8aWZyYW1lIGlkPVwiZG9Ob3RQbGF5TWVBbnlNb3JlXCIgdHlwZT1cInRleHQvaHRtbFwiIHdpZHRoPVwiJyArXG4gICAgICAgIHZpZXdwb3J0d2lkdGggK1xuICAgICAgICAnXCIgaGVpZ2h0PVwiJyArXG4gICAgICAgIHZpZXdwb3J0aGVpZ2h0ICtcbiAgICAgICAgJ1wiIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgK1xuICAgICAgICB2aWRlb0lEICtcbiAgICAgICAgJz9hdXRvcGxheT0xJm11dGU9MFwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93PVwiYXV0b3BsYXk7XCI+PC9pZnJhbWU+JztcbiAgICAgIC8vY29uc29sZS5sb2codmlkZW9JRCk7XG5cbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5odG1sKGVtYmVkQ29kZSk7XG4gICAgICAkKFwiLmxvYWRWaWRlb0hlcmVcIikuc2hvdygpO1xuICAgICAgJChcIi5sb2FkSW1hZ2VIZXJlXCIpLmhpZGUoKTtcbiAgICAgICQoXCIjcHJvZHVjdFZpZGVvXCIpLmFkZENsYXNzKFwiZGlzYWJsZVpvb21cIik7XG4gICAgICBjb25zb2xlLmxvZyhcInZpZGVvIGNsaWNrZWRcIik7XG4gICAgfSk7XG5cbiAgICAkKFwiLmltYWdlVGh1bWJuYWlsQ2xpY2tlZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vJChcIiNkb05vdFBsYXlNZUFueU1vcmVcIikucmVtb3ZlKCk7XG4gICAgICAkKFwiLmxvYWRWaWRlb0hlcmVcIikuaHRtbChcIlwiKTtcbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5oaWRlKCk7XG4gICAgICAkKFwiLmxvYWRJbWFnZUhlcmVcIikuc2hvdygpO1xuICAgICAgJChcIiNwcm9kdWN0VmlkZW9cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlWm9vbVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgQ2xpY2tlZFwiKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB7IENvbGxhcHNpYmxlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCRyZXZpZXdGb3JtKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJHJldmlld0Zvcm0uZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRyZXZpZXdzQ29udGVudCA9ICQoJyNwcm9kdWN0LXJldmlld3MnKTtcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUgPSAkKCdbZGF0YS1jb2xsYXBzaWJsZV0nLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgdGhpcy5pbml0TGlua0JpbmQoKTtcbiAgICAgICAgdGhpcy5pbmplY3RQYWdpbmF0aW9uTGluaygpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlUmV2aWV3cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRpYWwgcGFnZSBsb2FkLCB0aGUgdXNlciBjbGlja3Mgb24gXCIoMTIgUmV2aWV3cylcIiBsaW5rXG4gICAgICogVGhlIGJyb3dzZXIganVtcHMgdG8gdGhlIHJldmlldyBwYWdlIGFuZCBzaG91bGQgZXhwYW5kIHRoZSByZXZpZXdzIHNlY3Rpb25cbiAgICAgKi9cbiAgICBpbml0TGlua0JpbmQoKSB7XG4gICAgICAgIGNvbnN0ICRjb250ZW50ID0gJCgnI3Byb2R1Y3RSZXZpZXdzLWNvbnRlbnQnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld0xpbmsnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3VGFiTGluaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICBpZiAoISRjb250ZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VSZXZpZXdzKCkge1xuICAgICAgICAvLyBXZSdyZSBpbiBwYWdpbmF0aW5nIHN0YXRlLCBkbyBub3QgY29sbGFwc2VcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoJyNwcm9kdWN0LXJldmlld3MnKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yY2UgY29sbGFwc2Ugb24gcGFnZSBsb2FkXG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluamVjdCBJRCBpbnRvIHRoZSBwYWdpbmF0aW9uIGxpbmtcbiAgICAgKi9cbiAgICBpbmplY3RQYWdpbmF0aW9uTGluaygpIHtcbiAgICAgICAgY29uc3QgJG5leHRMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tbmV4dCAucGFnaW5hdGlvbi1saW5rJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuICAgICAgICBjb25zdCAkcHJldkxpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1wcmV2aW91cyAucGFnaW5hdGlvbi1saW5rJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgIGlmICgkbmV4dExpbmsubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbmV4dExpbmsuYXR0cignaHJlZicsIGAkeyRuZXh0TGluay5hdHRyKCdocmVmJyl9ICNwcm9kdWN0LXJldmlld3NgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkxpbmsubGVuZ3RoKSB7XG4gICAgICAgICAgICAkcHJldkxpbmsuYXR0cignaHJlZicsIGAkeyRwcmV2TGluay5hdHRyKCdocmVmJyl9ICNwcm9kdWN0LXJldmlld3NgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyVmFsaWRhdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZChbe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnJhdGluZ1wiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld1JhdGluZyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRpdGxlXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3U3ViamVjdCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRleHRcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdDb21tZW50LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJy53cml0ZVJldmlldy1mb3JtIFtuYW1lPVwiZW1haWxcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcbiAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0VtYWlsLFxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9