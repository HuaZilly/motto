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
    this.createSizeSlider();

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
  _proto.createSizeSlider = function createSizeSlider() {
    var sizeFitContainer = $('.size-fit-container'),
      sizeFitList = sizeFitContainer.find('[data-name]');
    if (sizeFitList.length > 0) {
      sizeFitContainer.find('.middle-bar i').prepend('<input type="range" id="range-size" value="48" name="range-size" min="0" max="100" />');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvcmV2aWV3cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbImZvcm1zIiwiZW1haWwiLCJ2YWx1ZSIsInJlIiwidGVzdCIsInBhc3N3b3JkIiwibm90RW1wdHkiLCJsZW5ndGgiLCJpbnB1dFRhZ05hbWVzIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IiwiZW1wdHkiLCJjb25maXJtIiwibWlzbWF0Y2giLCJpbnZhbGlkIiwib25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0Iiwib25Db25maXJtUGFzc3dvcmRFcnJvclRleHQiLCJvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQiLCJvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQiLCJjbGFzc2lmeUlucHV0IiwiaW5wdXQiLCJmb3JtRmllbGRDbGFzcyIsIiRpbnB1dCIsIiQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsImNsYXNzTmFtZSIsInNwZWNpZmljQ2xhc3NOYW1lIiwiaW5wdXRUeXBlIiwiX2luY2x1ZGVzIiwiX2NhbWVsQ2FzZSIsIl9jYXBpdGFsaXplIiwiYWRkQ2xhc3MiLCJjbGFzc2lmeUZvcm0iLCJmb3JtU2VsZWN0b3IiLCJvcHRpb25zIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwibWF0Y2giLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwiJHN0YXRlRmllbGQiLCJzdGF0ZUZpZWxkQXR0cnMiLCJ0eXBlIiwibmFtZSIsImFmdGVyIiwiVmFsaWRhdG9ycyIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkYXRvciIsImZpZWxkIiwiZXJyb3JUZXh0IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZXJyb3JNZXNzYWdlIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwicmVxdWlyZW1lbnRzIiwiX3JlZiIsImlzT3B0aW9uYWwiLCIkcGFzc3dvcmQiLCJwYXNzd29yZFZhbGlkYXRpb25zIiwiUmVnRXhwIiwiYWxwaGEiLCJudW1lcmljIiwibWlubGVuZ3RoIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwicHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJfcHJpY2VWYWxpZGF0aW9uRXJyb3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImRhdGEiLCJPYmplY3QiLCJrZXlzIiwibm9kIiwiY2xhc3NlcyIsImZvckVhY2giLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiV1JJVEVfUkVWSUVXIiwibW9kYWxUeXBlcyIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpczIiLCJkb2N1bWVudCIsIm9uIiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwidHJhbnNsYXRlQ29sb3VycyIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwiUmV2aWV3Iiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiY3JlYXRlU2l6ZVNsaWRlciIsInBsYXlWaWRlbyIsIm1haW5Qcm9kdWN0SUQiLCJwcm9QcmljZSIsInRleHQiLCJzaXplIiwiaHRtbCIsInN0b2NrIiwiY29uc29sZSIsImxvZyIsInNob3ciLCJoaWRlIiwibW9yZUNvbG91cnNDYXJvdXNlbCIsImkiLCJzcmMiLCJhdHRyIiwiaW5jbHVkZXMiLCJkYXRhX3NyYyIsInNpemVGaXRDb250YWluZXIiLCJzaXplRml0TGlzdCIsInByZXBlbmQiLCJicmFuZFNlbGVjdG9yIiwiYnJhbmROYW1lIiwiYnJhbmRVcmwiLCJzcGxpdCIsImNhcm91c2VsU2V0dGluZ3MiLCJkb3RzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNsaWRlIiwiYXJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsImVyciIsInJlc3BvbnNlIiwic2xpZGVyIiwibm9vZnNsaWRlcnMiLCJzbGljayIsImUiLCJiZyIsImNzcyIsImdldEhleEZyb21Db2xvck5hbWUiLCJMb2FkUHJvZHVjdFNpemVzU2VhcmNoIiwibGlzdFByb2R1Y3RzIiwiaWQiLCJsaSIsInByb0lEIiwiZm9yUHJvSUQiLCJkaXNjb3VudGVkUHJpY2UiLCJOdW1iZXIiLCJ0cmltIiwicmVwbGFjZSIsInRvRml4ZWQiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsInRlbXBsYXRlIiwiRXJyb3IiLCJhdmFpbGFibGVTaXplcyIsIm9iaiIsImlucHV0SUQiLCJkYXRhX3Byb2R1Y3RfYXR0cmlidXRlX3ZhbHVlIiwiYXR0cl9uYW1lIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJvcHRpb25DaGFuZ2UiLCJhdmFpbGFibGVfdmFyaWFudF92YWx1ZXMiLCJudW1iZXIiLCJfIiwibXNnU3BhbklkIiwic2libGluZ3MiLCJ0cmlnZ2VyIiwiZ2V0VmFyaWFudFN0b2NrTGV2ZWxzIiwiJG9wdGlvblNldCIsInBhcmVudHMiLCJwcm9kdWN0SWQiLCIkb3B0aW9uc0FycmF5IiwiaW5kZXgiLCJpdGVtIiwiYXR0cmlidXRlSWQiLCJhdHRyaWJ1dGVJZElEIiwidmFyaWFudFNpemUiLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZSIsInByb2dyZXNzQmFySHRtbCIsImFwcGVuZCIsInZpZGVvSUQiLCJ2aWV3cG9ydGhlaWdodCIsImhlaWdodCIsInZpZXdwb3J0d2lkdGgiLCJ3aWR0aCIsImVtYmVkQ29kZSIsIlBhZ2VNYW5hZ2VyIiwiX2RlZmF1bHQiLCJzdWJtaXQiLCIkcmV2aWV3c0NvbnRlbnQiLCIkY29sbGFwc2libGUiLCJpbml0TGlua0JpbmQiLCJpbmplY3RQYWdpbmF0aW9uTGluayIsImNvbGxhcHNlUmV2aWV3cyIsIiRjb250ZW50IiwiQ29sbGFwc2libGVFdmVudHMiLCJjbGljayIsImhhc2giLCIkbmV4dExpbmsiLCIkcHJldkxpbmsiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJlbGVtZW50IiwiJGVsIiwiaXNJbml0aWFsaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUEsSUFBTUEsS0FBSyxHQUFHO0VBQ1ZDLEtBQUssV0FBQUEsTUFBQ0MsS0FBSyxFQUFFO0lBQ1QsSUFBTUMsRUFBRSxHQUFHLFlBQVk7SUFDdkIsT0FBT0EsRUFBRSxDQUFDQyxJQUFJLENBQUNGLEtBQUssQ0FBQztFQUN6QixDQUFDO0VBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJRyxRQUFRLFdBQUFBLFNBQUNILEtBQUssRUFBRTtJQUNaLE9BQU8sSUFBSSxDQUFDSSxRQUFRLENBQUNKLEtBQUssQ0FBQztFQUMvQixDQUFDO0VBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lJLFFBQVEsV0FBQUEsU0FBQ0osS0FBSyxFQUFFO0lBQ1osT0FBT0EsS0FBSyxDQUFDSyxNQUFNLEdBQUcsQ0FBQztFQUMzQjtBQUNKLENBQUM7QUFFY1Asb0VBQUssRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCSztBQUNXO0FBRXBDLElBQU1RLGFBQWEsR0FBRyxDQUNsQixPQUFP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QUssK0JBQTZCLElBQUksQ0FBQ3NHLFlBQVksQ0FBQ3BFLEVBQUksQ0FBQztFQUMvRSxDQUFDO0VBQUE5RSxNQUFBLENBRUQwSixjQUFjLEdBQWQsU0FBQUEsZUFBQSxFQUFpQjtJQUNiLElBQUksQ0FBQ1QsT0FBTyxDQUFDbEssV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUNyQyxJQUFJLENBQUNtSyxZQUFZLENBQUNNLGNBQWMsQ0FBQ3BQLFFBQVEsQ0FBQyxXQUFXLENBQUM7RUFDMUQsQ0FBQztFQUFBNEYsTUFBQSxDQUVEbUosVUFBVSxHQUFWLFNBQUFBLFdBQUEsRUFBYTtJQUNULElBQUksQ0FBQ0YsT0FBTyxDQUFDNUksRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMrSSxjQUFjLENBQUNPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxDQUFDO0VBQUEsT0FBQWIsWUFBQTtBQUFBO0FBR1UsU0FBUzdILFlBQVlBLENBQUEsRUFBRztFQUNuQyxJQUFNMkksU0FBUyxHQUFHLGVBQWU7RUFDakMsSUFBTUMsYUFBYSxHQUFHclEsQ0FBQyxZQUFVb1EsU0FBUyxNQUFHLENBQUM7RUFFOUNDLGFBQWEsQ0FBQy9PLElBQUksQ0FBQyxVQUFDK0wsS0FBSyxFQUFFaUQsT0FBTyxFQUFLO0lBQ25DLElBQU1DLEdBQUcsR0FBR3ZRLENBQUMsQ0FBQ3NRLE9BQU8sQ0FBQztJQUN0QixJQUFNRSxhQUFhLEdBQUdELEdBQUcsQ0FBQ3ZMLElBQUksQ0FBQ29MLFNBQVMsQ0FBQyxZQUFZZCxZQUFZO0lBRWpFLElBQUlrQixhQUFhLEVBQUU7TUFDZjtJQUNKO0lBRUFELEdBQUcsQ0FBQ3ZMLElBQUksQ0FBQ29MLFNBQVMsRUFBRSxJQUFJZCxZQUFZLENBQUNpQixHQUFHLENBQUMsQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay41LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZm9ybXMgPSB7XG4gICAgZW1haWwodmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmUgPSAvXi4rQC4rXFwuLisvO1xuICAgICAgICByZXR1cm4gcmUudGVzdCh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHBhc3N3b3JkIGZpZWxkXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcGFzc3dvcmQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm90RW1wdHkodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZXMgaWYgYSBmaWVsZCBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqXG4gICAgICovXG4gICAgbm90RW1wdHkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1zO1xuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBub2QgZnJvbSAnLi4vbm9kJztcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9tb2RlbHMvZm9ybXMnO1xuXG5jb25zdCBpbnB1dFRhZ05hbWVzID0gW1xuICAgICdpbnB1dCcsXG4gICAgJ3NlbGVjdCcsXG4gICAgJ3RleHRhcmVhJyxcbl07XG4vKipcbiAqIFNldCB1cCBPYmplY3Qgd2l0aCBFcnJvciBNZXNzYWdlcyBvbiBQYXNzd29yZCBWYWxpZGF0aW9uLiBQbGVhc2UgdXNlIG1lc3NhZ2VzIGluIG1lbnRpb25lZCBvcmRlclxuICogQHBhcmFtIHtzdHJpbmd9IGVtcHR5IGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgZW1wdHkgZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25maXJtIGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgZW1wdHkgY29uZmlybWF0aW9uIGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gbWlzbWF0Y2ggZGVmaW5lcyBlcnJvciB0ZXh0IGlmIGNvbmZpcm0gcGFzc2ZvcmQgbWlzbWF0Y2hlcyBwYXNzZm9yZCBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IGludmFsaWQgZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBpbnZhbGlkIHBhc3N3b3JkIGNoYXJhdGVycyBzZXF1ZW5jZVxuICogQHJldHVybiB7b2JqZWN0fSBtZXNzYWdlcyBvciBkZWZhdWx0IHRleHRzIGlmIG5vdGhpbmcgaXMgcHJvdmlkaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QgPSAoZW1wdHksIGNvbmZpcm0sIG1pc21hdGNoLCBpbnZhbGlkKSA9PiAoe1xuICAgIG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dDogZW1wdHksXG4gICAgb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQ6IGNvbmZpcm0sXG4gICAgb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0OiBtaXNtYXRjaCxcbiAgICBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQ6IGludmFsaWQsXG59KTtcblxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gYW4gaW5wdXQgZWxlbWVudCBvbiBpdHMgdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkQ2xhc3NcbiAqIEByZXR1cm4ge29iamVjdH0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZnVuY3Rpb24gY2xhc3NpZnlJbnB1dChpbnB1dCwgZm9ybUZpZWxkQ2xhc3MpIHtcbiAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICBjb25zdCAkZm9ybUZpZWxkID0gJGlucHV0LnBhcmVudChgLiR7Zm9ybUZpZWxkQ2xhc3N9YCk7XG4gICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dC5wcm9wKCd0YWdOYW1lJykudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCBjbGFzc05hbWUgPSBgJHtmb3JtRmllbGRDbGFzc30tLSR7dGFnTmFtZX1gO1xuICAgIGxldCBzcGVjaWZpY0NsYXNzTmFtZTtcblxuICAgIC8vIElucHV0IGNhbiBiZSB0ZXh0L2NoZWNrYm94L3JhZGlvIGV0Yy4uLlxuICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VHlwZSA9ICRpbnB1dC5wcm9wKCd0eXBlJyk7XG5cbiAgICAgICAgaWYgKF8uaW5jbHVkZXMoWydyYWRpbycsICdjaGVja2JveCcsICdzdWJtaXQnXSwgaW5wdXRUeXBlKSkge1xuICAgICAgICAgICAgLy8gaWU6IC5mb3JtLWZpZWxkLS1jaGVja2JveCwgLmZvcm0tZmllbGQtLXJhZGlvXG4gICAgICAgICAgICBjbGFzc05hbWUgPSBgJHtmb3JtRmllbGRDbGFzc30tLSR7Xy5jYW1lbENhc2UoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWU6IC5mb3JtLWZpZWxkLS1pbnB1dCAuZm9ybS1maWVsZC0taW5wdXRUZXh0XG4gICAgICAgICAgICBzcGVjaWZpY0NsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0ke18uY2FwaXRhbGl6ZShpbnB1dFR5cGUpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBcHBseSBjbGFzcyBtb2RpZmllclxuICAgIHJldHVybiAkZm9ybUZpZWxkXG4gICAgICAgIC5hZGRDbGFzcyhjbGFzc05hbWUpXG4gICAgICAgIC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzTmFtZSk7XG59XG5cbi8qKlxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBlYWNoIGlucHV0IGVsZW1lbnQgaW4gYSBmb3JtIGJhc2VkIG9uIGl0cyB0eXBlXG4gKiBAZXhhbXBsZVxuICogLy8gQmVmb3JlXG4gKiA8Zm9ybSBpZD1cImZvcm1cIj5cbiAqICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZFwiPlxuICogICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIj5cbiAqICAgICA8L2Rpdj5cbiAqICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZFwiPlxuICogICAgICAgICA8c2VsZWN0Pi4uLjwvc2VsZWN0PlxuICogICAgIDwvZGl2PlxuICogPC9mb3JtPlxuICpcbiAqIGNsYXNzaWZ5Rm9ybSgnI2Zvcm0nLCB7IGZvcm1GaWVsZENsYXNzOiAnZm9ybS1maWVsZCcgfSk7XG4gKlxuICogLy8gQWZ0ZXJcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLWlucHV0IGZvcm0tZmllbGQtLWlucHV0VGV4dFwiPi4uLjwvZGl2PlxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0tc2VsZWN0XCI+Li4uPC9kaXY+XG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBmb3JtU2VsZWN0b3IgLSBzZWxlY3RvciBvciBlbGVtZW50XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7alF1ZXJ5fSBFbGVtZW50IGl0c2VsZlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NpZnlGb3JtKGZvcm1TZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgJGZvcm0gPSAkKGZvcm1TZWxlY3Rvcik7XG4gICAgY29uc3QgJGlucHV0cyA9ICRmb3JtLmZpbmQoaW5wdXRUYWdOYW1lcy5qb2luKCcsICcpKTtcblxuICAgIC8vIE9idGFpbiBvcHRpb25zXG4gICAgY29uc3QgeyBmb3JtRmllbGRDbGFzcyA9ICdmb3JtLWZpZWxkJyB9ID0gb3B0aW9ucztcblxuICAgIC8vIENsYXNzaWZ5IGVhY2ggaW5wdXQgaW4gYSBmb3JtXG4gICAgJGlucHV0cy5lYWNoKChfXywgaW5wdXQpID0+IHtcbiAgICAgICAgY2xhc3NpZnlJbnB1dChpbnB1dCwgZm9ybUZpZWxkQ2xhc3MpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICRmb3JtO1xufVxuXG4vKipcbiAqIEdldCBpZCBmcm9tIGdpdmVuIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJGZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0RmllbGRJZCgkZmllbGQpIHtcbiAgICBjb25zdCBmaWVsZElkID0gJGZpZWxkLnByb3AoJ25hbWUnKS5tYXRjaCgvKFxcWy4qXFxdKS8pO1xuXG4gICAgaWYgKGZpZWxkSWQgJiYgZmllbGRJZC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkSWRbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIEluc2VydCBoaWRkZW4gZmllbGQgYWZ0ZXIgU3RhdGUvUHJvdmluY2UgZmllbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSAkc3RhdGVGaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJHN0YXRlRmllbGQpIHtcbiAgICBjb25zdCBmaWVsZElkID0gZ2V0RmllbGRJZCgkc3RhdGVGaWVsZCk7XG4gICAgY29uc3Qgc3RhdGVGaWVsZEF0dHJzID0ge1xuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgbmFtZTogYEZvcm1GaWVsZElzVGV4dCR7ZmllbGRJZH1gLFxuICAgICAgICB2YWx1ZTogJzEnLFxuICAgIH07XG5cbiAgICAkc3RhdGVGaWVsZC5hZnRlcigkKCc8aW5wdXQgLz4nLCBzdGF0ZUZpZWxkQXR0cnMpKTtcbn1cblxuY29uc3QgVmFsaWRhdG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgbmV3IHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBkaXJ0eVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JUZXh0IGRlc2NyaWJlcyBlcnJvck1hc3NhZ2Ugb24gZW1haWwgdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHNldEVtYWlsVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yVGV4dCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQyU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0gcmVxdWlyZW1lbnRzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yVGV4dHNPYmplY3RcbiAgICAgKiBAcGFyYW0gaXNPcHRpb25hbFxuICAgICAqL1xuICAgIHNldFBhc3N3b3JkVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgcGFzc3dvcmRTZWxlY3RvciwgcGFzc3dvcmQyU2VsZWN0b3IsIHJlcXVpcmVtZW50cywge1xuICAgICAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0LCBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsIG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcbiAgICB9LCBpc09wdGlvbmFsKSA9PiB7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZCA9ICQocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5tYXRjaChuZXcgUmVnRXhwKHJlcXVpcmVtZW50cy5hbHBoYSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMubnVtZXJpYykpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWwubGVuZ3RoID49IHJlcXVpcmVtZW50cy5taW5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgb3B0aW9uYWwgYW5kIG5vdGhpbmcgZW50ZXJlZCwgaXQgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbCA9PT0gJHBhc3N3b3JkLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZFZhbGlkYXRpb25zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHtOb2R9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmVycm9yU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZpZWxkc2V0U2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZvcm1TZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWF4UHJpY2VTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWluUHJpY2VTZWxlY3RvclxuICAgICAqL1xuICAgIHNldE1pbk1heFByaWNlVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgc2VsZWN0b3JzLCBwcmljZVZhbGlkYXRpb25FcnJvclRleHRzID0ge30pID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICAgICAgICBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfSA9IHNlbGVjdG9ycztcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICAgICAgY29uc3QgeyBvbk1pblByaWNlRXJyb3IsIG9uTWF4UHJpY2VFcnJvciwgbWluUHJpY2VOb3RFbnRlcmVkLCBtYXhQcmljZU5vdEVudGVyZWQsIG9uSW52YWxpZFByaWNlIH0gPSBwcmljZVZhbGlkYXRpb25FcnJvclRleHRzO1xuXG4gICAgICAgIHZhbGlkYXRvci5jb25maWd1cmUoe1xuICAgICAgICAgICAgZm9ybTogZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgcHJldmVudFN1Ym1pdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3NDbGFzczogJ18nLCAvLyBLTFVER0U6IERvbid0IGFwcGx5IHN1Y2Nlc3MgY2xhc3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6IGBtaW4tbWF4OiR7bWluUHJpY2VTZWxlY3Rvcn06JHttYXhQcmljZVNlbGVjdG9yfWAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ21pbi1udW1iZXI6MCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5zZXRNZXNzYWdlT3B0aW9ucyh7XG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgcGFyZW50OiBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZXJyb3JTcGFuOiBlcnJvclNlbGVjdG9yLFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgc2V0U3RhdGVDb3VudHJ5VmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yVGV4dCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY2xhc3NlcyBmcm9tIGRpcnR5IGZvcm0gaWYgcHJldmlvdXNseSBjaGVja2VkXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgY2xlYW5VcFN0YXRlVmFsaWRhdGlvbjogKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0ICRmaWVsZENsYXNzRWxlbWVudCA9ICQoKGBbZGF0YS10eXBlPVwiJHtmaWVsZC5kYXRhKCdmaWVsZFR5cGUnKX1cIl1gKSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobm9kLmNsYXNzZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGZpZWxkQ2xhc3NFbGVtZW50Lmhhc0NsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAkZmllbGRDbGFzc0VsZW1lbnQucmVtb3ZlQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCB7IFZhbGlkYXRvcnMsIGluc2VydFN0YXRlSGlkZGVuRmllbGQgfTtcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tIFwiLi9wYWdlLW1hbmFnZXJcIjtcbmltcG9ydCBSZXZpZXcgZnJvbSBcIi4vcHJvZHVjdC9yZXZpZXdzXCI7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gXCIuL2NvbW1vbi9jb2xsYXBzaWJsZVwiO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gXCIuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHNcIjtcbmltcG9ydCB2aWRlb0dhbGxlcnkgZnJvbSBcIi4vcHJvZHVjdC92aWRlby1nYWxsZXJ5XCI7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tIFwiLi9jb21tb24vdXRpbHMvZm9ybS11dGlsc1wiO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBtb2RhbFR5cGVzIH0gZnJvbSBcIi4vZ2xvYmFsL21vZGFsXCI7XG5cbmltcG9ydCB7IG5vcm1hbGl6ZUZvcm1EYXRhIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzL2FwaVwiO1xuLy8gaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBzaG93QWxlcnRNb2RhbCwgbW9kYWxUeXBlcyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IGpxdWVyeW1hdGNoaGVpZ2h0IGZyb20gXCJqcXVlcnktbWF0Y2gtaGVpZ2h0XCI7XG5cbmltcG9ydCBjYXJvdXNlbCBmcm9tIFwiLi9jb21tb24vY2Fyb3VzZWxcIjtcbmltcG9ydCB7IGdldEhleEZyb21Db2xvck5hbWUgfSBmcm9tIFwiLi9jdXN0b20vbnRjXCI7XG5cbmNvbnN0IHsgV1JJVEVfUkVWSUVXIH0gPSBtb2RhbFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KFwiI21vZGFsLXJldmlldy1mb3JtXCIpWzBdO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgJChkb2N1bWVudCkub24oXCJjbG9zZS5mbmR0bi5yZXZlYWxcIiwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoXCIjd3JpdGVfcmV2aWV3XCIpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHZhbGlkYXRvcjtcblxuICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJChcIi5wcm9kdWN0Vmlld1wiKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuXG4gICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZUNvbG91cnMoKTtcblxuICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG5cbiAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybShcIi53cml0ZVJldmlldy1mb3JtXCIpO1xuXG4gICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xuICAgICAgJChkb2N1bWVudCkub24oXCJvcGVuZWQuZm5kdG4ucmV2ZWFsXCIsICgpID0+IHRoaXMucmV2aWV3TW9kYWwuc2V0dXBGb2N1c2FibGVFbGVtZW50cyhXUklURV9SRVZJRVcpKTtcbiAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xuICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcbiAgICAgIH0pO1xuICAgICAgJHJldmlld0Zvcm0ub24oXCJzdWJtaXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKFwidmFsaWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuICAgIHRoaXMuY3JlYXRlU2l6ZVNsaWRlcigpO1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygncHJvZHVjdHR0dHR0dHR0dHR0dHR0dHR0dHR0LmpzJyk7XG5cbiAgICAvLyBsb2FkcyB0aGUgdmFyaWFudHMgc3RvY2sgbGV2ZWxcbiAgICAvLyB0aGlzLmdldFZhcmlhbnRTdG9ja0xldmVscygpO1xuICAgIHRoaXMucGxheVZpZGVvKCk7XG5cbiAgICB2YXIgbWFpblByb2R1Y3RJRCA9ICQoJ2lucHV0W25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsKCk7XG4gICAgdmFyIHByb1ByaWNlID0gJChcIi5wcm9kdWN0Vmlldy1wcmljZSAucHJpY2Utc2VjdGlvbiAubWFpbkxvYWRlZFByaWNlXCIpLnRleHQoKTtcbiAgICAvLyB2YXIgZGlzY291bnRlZFByaWNlID0gKE51bWJlcihwcm9QcmljZS50cmltKCkucmVwbGFjZShcIiRcIixcIlwiKSkqTnVtYmVyKDAuOTApKS50b0ZpeGVkKDIpO1xuICAgIC8vICQoXCIuZGlzY291bnRlZFByaWNlU2luZ2xlUGFnZS1cIittYWluUHJvZHVjdElEKS5odG1sKFwiJFwiK2Rpc2NvdW50ZWRQcmljZSk7XG5cbiAgICAvLyB0aGlzLkxvYWRQcm9kdWN0U2l6ZXNTZWFyY2goKTtcblxuICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fYmxvY2sgbGFiZWxcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2l6ZSA9ICQodGhpcykuZmluZChcInNwYW5cIikuaHRtbCgpO1xuXG4gICAgICB2YXIgc3RvY2sgPSAkKCdzcGFuW2RhdGEtdmFyaWFudD1cIicgKyBzaXplICsgJ1wiXScpLmh0bWwoKTtcblxuICAgICAgY29uc29sZS5sb2coc2l6ZSArIFwiIGhhcyBzdG9jayBcIiArIHN0b2NrKTtcblxuICAgICAgaWYgKHN0b2NrIDwgNikge1xuICAgICAgICAkKFwiLnByb2R1Y3RWaWV3LW9wdGlvbnNfX3N0b2NrXCIpLnNob3coKS5maW5kKFwiLnN0b2NrLXF0eVwiKS5odG1sKHN0b2NrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIucHJvZHVjdFZpZXctb3B0aW9uc19fc3RvY2tcIikuaGlkZSgpLmZpbmQoXCIuc3RvY2stcXR5XCIpLmh0bWwoXCJcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vcmVDb2xvdXJzQ2Fyb3VzZWwoKTtcblxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3cgbG9hZGVkXCIpO1xuXG4gICAgICAkKFwiLk1hZ2ljWm9vbUdhbGxlcnlcIilcbiAgICAgICAgLmZpbmQoXCJpZnJhbWVcIilcbiAgICAgICAgLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZ2ljXCIsICQodGhpcykpO1xuXG4gICAgICAgICAgdmFyIHNyYyA9ICQodGhpcykuYXR0cihcInNyY1wiKTtcbiAgICAgICAgICBpZiAoc3JjICYmIChzcmMuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpIHx8IHNyYy5pbmNsdWRlcyhcInZpbWVvXCIpKSkge1xuICAgICAgICAgICAgc3JjICs9IFwiJnJlbD0wJmZzPTAmY29udHJvbHM9MFwiO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwic3JjXCIsIHNyYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNyY1wiLCBzcmMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkYXRhX3NyYyA9ICQodGhpcykuYXR0cihcImRhdGEtc3JjXCIpO1xuICAgICAgICAgIGlmIChkYXRhX3NyYyAmJiAoZGF0YV9zcmMuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpIHx8IGRhdGFfc3JjLmluY2x1ZGVzKFwidmltZW9cIikpKSB7XG4gICAgICAgICAgICBkYXRhX3NyYyArPSBcIiZyZWw9MCZmcz0wJmNvbnRyb2xzPTBcIjtcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtc3JjXCIsIGRhdGFfc3JjKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YV9zcmNcIiwgZGF0YV9zcmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlU2l6ZVNsaWRlcigpIHtcbiAgICBsZXQgc2l6ZUZpdENvbnRhaW5lciA9ICQoJy5zaXplLWZpdC1jb250YWluZXInKSxcbiAgICAgICAgc2l6ZUZpdExpc3QgPSBzaXplRml0Q29udGFpbmVyLmZpbmQoJ1tkYXRhLW5hbWVdJyk7XG4gICAgaWYgKHNpemVGaXRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHNpemVGaXRDb250YWluZXIuZmluZCgnLm1pZGRsZS1iYXIgaScpLnByZXBlbmQoJzxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cInJhbmdlLXNpemVcIiB2YWx1ZT1cIjQ4XCIgbmFtZT1cInJhbmdlLXNpemVcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgLz4nKTtcbiAgICB9XG4gIH1cbiAgbW9yZUNvbG91cnNDYXJvdXNlbCgpIHtcbiAgICB2YXIgYnJhbmRTZWxlY3RvciA9ICQoXCJbZGF0YS1icmFuZF1cIik7XG4gICAgdmFyIGJyYW5kTmFtZSA9IGJyYW5kU2VsZWN0b3IuYXR0cihcImRhdGEtYnJhbmRcIik7XG4gICAgdmFyIGJyYW5kVXJsID0gXCIvYnJhbmRzL1wiICsgYnJhbmROYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpICsgXCIvXCI7XG5cbiAgICBsZXQgY2Fyb3VzZWxTZXR0aW5ncyA9IHtcbiAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAvLyBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgc2xpZGU6IFwiLmpzLXByb2R1Y3Qtc2xpZGVcIixcbiAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNTUwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB1dGlscy5hcGkuZ2V0UGFnZShicmFuZFVybCwgXCIvdGVtcGxhdGVzL2JyYW5kXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICB2YXIgc2xpZGVyID0gJChyZXNwb25zZSkuZmluZChcIiNicmFuZHByb2R1Y3RzLXNsaWRlclwiKS5odG1sKCk7XG5cbiAgICAgIHZhciBub29mc2xpZGVycyA9ICQoc2xpZGVyKS5maW5kKFwiYXJ0aWNsZVwiKS5sZW5ndGg7XG4gICAgICBcbiAgICAgIGlmIChub29mc2xpZGVycyA8IDIpIHtcbiAgICAgICAgJChcIi5tb3JlLWNvbG91cnMtYmxvY2tcIikucmVtb3ZlQ2xhc3MoXCJkLW1kLWJsb2NrXCIpO1xuICAgICAgICAkKFwiLm1vcmUtY29sb3Vycy1tb2JpbGVcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuaHRtbChzbGlkZXIpLnNsaWNrKGNhcm91c2VsU2V0dGluZ3MpO1xuICAgICAgICAvLyAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuc2xpY2soY2Fyb3VzZWxTZXR0aW5ncyk7XG4gICAgICB9XG4gICAgICBpZihub29mc2xpZGVycyA8PSAyKXtcbiAgICAgICAgJCgnLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2InKS5zbGljaygndW5zbGljaycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5tb3JlLWNvbG91cnMtbW9iaWxlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInNsaWNrb25jbGlja1wiKSkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2xpY2tvbmNsaWNrXCIpO1xuICAgICAgICAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuc2xpY2soXCJkZXN0cm95XCIpLnNsaWNrKGNhcm91c2VsU2V0dGluZ3MpO1xuICAgICAgfVxuICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoYnJhbmRVcmwsIFwiL3RlbXBsYXRlcy9icmFuZFwiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICB2YXIgc2xpZGVyID0gJChyZXNwb25zZSkuZmluZChcIiNicmFuZHByb2R1Y3RzLXNsaWRlclwiKS5odG1sKCk7XG4gIFxuICAgICAgICB2YXIgbm9vZnNsaWRlcnMgPSAkKHNsaWRlcikuZmluZChcImFydGljbGVcIikubGVuZ3RoO1xuICAgICAgICAvLyBhbGVydChub29mc2xpZGVycyk7XG4gICAgICAgIGlmIChub29mc2xpZGVycyA8PSAyKSB7XG4gICAgICAgICAgJCgnLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2InKS5zbGljaygndW5zbGljaycpO1xuICAgICAgICB9IFxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHRyYW5zbGF0ZUNvbG91cnMoKSB7XG4gICAgJChcIltkYXRhLWZvcm1hdGJnXVwiKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICBjb25zdCBiZyA9ICQodGhpcykuYXR0cihcImRhdGEtZm9ybWF0YmdcIik7XG4gICAgICAkKHRoaXMpLmNzcyhcImJhY2tncm91bmRcIiwgZ2V0SGV4RnJvbUNvbG9yTmFtZShiZykpO1xuICAgIH0pO1xuICB9XG5cbiAgTG9hZFByb2R1Y3RTaXplc1NlYXJjaCgpIHtcbiAgICB2YXIgbGlzdFByb2R1Y3RzID0gJChcIi5wcm9kdWN0LWN1c3RvbWVydmlld2VkIC5zbGljay1saXN0IC5zbGljay10cmFjayAucHJvZHVjdENhcm91c2VsLXNsaWRlXCIpO1xuXG4gICAgbGlzdFByb2R1Y3RzLmVhY2goZnVuY3Rpb24gKGlkLCBsaSkge1xuICAgICAgLy92YXIgUHJvZHVjdCA9ICQobGkpO1xuICAgICAgdmFyIHByb0lEID0gJCh0aGlzKS5maW5kKFwiLlByb2R1Y3RJRHNcIikudGV4dCgpO1xuICAgICAgdmFyIGZvclByb0lEID0gJCh0aGlzKS5maW5kKFwiLlByb2R1Y3RJRHNPbmx5XCIpLnRleHQoKTtcbiAgICAgIHZhciBwcm9QcmljZSA9ICQodGhpcykuZmluZChcIi5tYWluTG9hZGVkUHJpY2VcIikudGV4dCgpO1xuICAgICAgdmFyIGRpc2NvdW50ZWRQcmljZSA9IChOdW1iZXIocHJvUHJpY2UudHJpbSgpLnJlcGxhY2UoXCIkXCIsIFwiXCIpKSAqIE51bWJlcigwLjkpKS50b0ZpeGVkKDIpO1xuICAgICAgLy9jb25zb2xlLmxvZyhkaXNjb3VudGVkUHJpY2UpO1xuICAgICAgLy9jb25zb2xlLmxvZyhwcm9QcmljZSk7XG5cbiAgICAgICQoXCIuZGlzY291bnRlZFByaWNlQ2F0ZWdvcnktXCIgKyBmb3JQcm9JRCkuaHRtbChcIiRcIiArIGRpc2NvdW50ZWRQcmljZSk7XG5cbiAgICAgIGlmIChwcm9JRCA9PSBcIk5PXCIpIHJldHVybjtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvSUQpO1xuXG4gICAgICAkKFwiI2xvYWRRdWlja1ZpZXctXCIgKyBwcm9JRCkuaHRtbChcbiAgICAgICAgJzxkaXYgaWQ9XCJsb2FkZXJpbWFnZVwiIGNsYXNzPVwibG9hZGluZ092ZXJsYXkgbG9hZGluZ092ZXJsYXktLXRyYW5zaXRpb25cIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY24tbG9hZGVyXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIiB2aWV3Qm94PVwiMCAwIDIwIDE3LjlcIj48cGF0aCBkPVwiTTE5LjIgNS43YTUgNSAwIDAxLTEuNCAzLjVMMTAgMTYuOSAyLjIgOS4yQzEuMyA4LjIuOCA3IC44IDUuN2MwLTEuMy41LTIuNSAxLjQtMy41QzMuMSAxLjMgNC40LjggNS43LjhzMi41LjUgMy41IDEuNGwuMi4yLjYuOC42LS43LjItLjJBNSA1IDAgMDExNC4zLjljMS4zIDAgMi41LjUgMy41IDEuNC45LjkgMS40IDIuMSAxLjQgMy40elwiIGNsYXNzPVwiaWNuLXdpc2hsaXN0X19oZWFydFwiPjwvcGF0aD48cGF0aCBkPVwiTTE4LjMgMS43YTUuOCA1LjggMCAwMC00LTEuN2MtMS41IDAtMi45LjYtNCAxLjdMMTAgMmwtLjMtLjNhNS42IDUuNiAwIDAwLTQtMS43Yy0xLjUgMC0yLjkuNi00IDEuN2E1LjggNS44IDAgMDAwIDguMWw4IDggLjQuMS4zLS4xIDgtOGE1LjcgNS43IDAgMDAtLjEtOC4xek01LjcuOGMxLjMgMCAyLjUuNSAzLjUgMS40bC4yLjIuNi44LjYtLjcuMi0uMkE1IDUgMCAwMTE0LjMuOWMxLjMgMCAyLjUuNSAzLjUgMS40LjkuOSAxLjQgMi4xIDEuNCAzLjVhNSA1IDAgMDEtMS40IDMuNUwxMCAxNi45IDIuMiA5LjJDMS4zIDguMi44IDcgLjggNS43YzAtMS4zLjUtMi41IDEuNC0zLjVDMy4yIDEuMyA0LjQuOCA1LjcuOHpcIiBjbGFzcz1cImljbi13aXNobGlzdF9fc3Ryb2tlXCI+PC9wYXRoPjwvc3ZnPjwvZGl2PidcbiAgICAgICk7XG4gICAgICAvL3JldHVybjtcblxuICAgICAgLy8gbG9hZCBzaXplc1xuICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwcm9JRCwgeyB0ZW1wbGF0ZTogXCJwcm9kdWN0cy9xdWljay12aWV3LW9wdGlvbnNcIiB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXZhaWxhYmxlU2l6ZXMgPSBcIlwiO1xuICAgICAgICAkKHJlc3BvbnNlKVxuICAgICAgICAgIC5maW5kKFwiLmZvcm0tb3B0aW9uXCIpXG4gICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGksIG9iaikge1xuICAgICAgICAgICAgdmFyIGlucHV0SUQgPSAkKHRoaXMpLmF0dHIoXCJmb3JcIik7XG4gICAgICAgICAgICB2YXIgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVcIik7XG4gICAgICAgICAgICB2YXIgYXR0cl9uYW1lID0gJChyZXNwb25zZSlcbiAgICAgICAgICAgICAgLmZpbmQoXCIjXCIgKyBpbnB1dElEKVxuICAgICAgICAgICAgICAuYXR0cihcIm5hbWVcIik7XG5cbiAgICAgICAgICAgIGF2YWlsYWJsZVNpemVzICs9XG4gICAgICAgICAgICAgIFwiPGxhYmVsIGlkPSdcIiArXG4gICAgICAgICAgICAgIHByb0lEICtcbiAgICAgICAgICAgICAgXCInIGNsYXNzPSdmb3JtLW9wdGlvbiB1bmF2YWlsYWJsZWluTGlzdCBJc1Byb2RBdmFpbGFibGUtXCIgK1xuICAgICAgICAgICAgICBwcm9JRCArXG4gICAgICAgICAgICAgIFwiLVwiICtcbiAgICAgICAgICAgICAgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSArXG4gICAgICAgICAgICAgIFwiIGFkZC1tZS10by1jYXJ0JyBkYXRhLXBvcHVwLXR5cGU9J2FkZC10by1iYWcnIGZvcj0nXCIgK1xuICAgICAgICAgICAgICBpbnB1dElEICtcbiAgICAgICAgICAgICAgXCInIGRhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWU9J1wiICtcbiAgICAgICAgICAgICAgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSArXG4gICAgICAgICAgICAgIFwiJyBuYW1lPSdcIiArXG4gICAgICAgICAgICAgIGF0dHJfbmFtZSArXG4gICAgICAgICAgICAgIFwiJyA+PGEgaHJlZj0namF2YXNjcmlwdDp2b2lkKDApOycgY2xhc3M9J2NhcmQtc2l6ZS1vcHRpb24nIGRhdGEtcmV2ZWFsLWlkPSdhZGQtZnJvbS1zaXplJyA+XCIgK1xuICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoKSArXG4gICAgICAgICAgICAgIFwiPC9hPjwvbGFiZWw+XCI7XG5cbiAgICAgICAgICAgICQoXCIjbG9hZFF1aWNrVmlldy1cIiArIHByb0lEKS5odG1sKGF2YWlsYWJsZVNpemVzKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIrK1wiKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9JRCwgXCJwcm9kdWN0X2lkPVwiICsgcHJvSUQsIFwicHJvZHVjdHMvcXVpY2stdmlldy1vcHRpb25zXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGZyb20gcmVzcG9uc2UgZ2V0IHRoZSBhdmFpbGFibGUgYXR0cmlidXRlc1xuXG4gICAgICAgICAgICAgIHZhciBwcm9kdWN0QXR0cmlidXRlcyA9IHJlc3BvbnNlLmRhdGEuYXZhaWxhYmxlX3ZhcmlhbnRfdmFsdWVzO1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3RBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgaWYgKHByb2R1Y3RBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0QXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyK1wiID09IFwiKTtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJChhdmFpbGFibGVTaXplcykuZmluZChcIi5JblByb2RBdmFpbGFibGVcIikpO1xuICAgICAgICAgICAgICAgICAgJChcIi5Jc1Byb2RBdmFpbGFibGUtXCIgKyBwcm9JRCArIFwiLVwiICsgbnVtYmVyKS5yZW1vdmVDbGFzcyhcInVuYXZhaWxhYmxlaW5MaXN0XCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgJGZvcm0uZmluZChcIltkYXRhLWlucHV0XVwiKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cihcIm5hbWVcIil9LW1zZ2A7XG5cbiAgICAgICRpbnB1dC5zaWJsaW5ncyhcInNwYW5cIikuYXR0cihcImlkXCIsIG1zZ1NwYW5JZCk7XG4gICAgICAkaW5wdXQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgbXNnU3BhbklkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI3dyaXRlX3Jldmlld1wiKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxuXG4gIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiNidWxrX3ByaWNpbmdcIikgIT09IC0xKSB7XG4gICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxvYWRpbmcgdmFyaWFudHMgc3RvY2sgbGV2ZWxcbiAgZ2V0VmFyaWFudFN0b2NrTGV2ZWxzKCkge1xuICAgIGNvbnN0ICRvcHRpb25TZXQgPSAkKFwiW2RhdGEtcHJvZHVjdC1vcHRpb24tY2hhbmdlXVwiKTtcbiAgICBjb25zdCAkZm9ybSA9ICRvcHRpb25TZXQucGFyZW50cygkKFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJGZvcm0pLnZhbCgpO1xuICAgIGNvbnN0ICRvcHRpb25zQXJyYXkgPSAkb3B0aW9uU2V0LmZpbmQoXCIuZm9ybS1yYWRpb1wiKTtcbiAgICAvLyBjb25zb2xlLmxvZygnJG9wdGlvbnNBcnJheScsICRvcHRpb25zQXJyYXkpO1xuXG4gICAgaWYgKCRvcHRpb25zQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgJChcIi5wcm9kdWN0Vmlldy1vcHRpb25zX19ibG9ja1wiKS5zaG93KCk7XG4gICAgICAkKFwiI2xvYWRlcmltYWdlU3RvY2tzaG93XCIpLnNob3coKTtcbiAgICAgICQuZWFjaCgkb3B0aW9uc0FycmF5LCAoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlSWQgPSAkKGl0ZW0pLmF0dHIoXCJuYW1lXCIpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVJZElEID0gJChpdGVtKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRTaXplID0gJCgnW2Zvcj1cIicgKyBhdHRyaWJ1dGVJZElEICsgJ1wiXScsICRmb3JtKVxuICAgICAgICAgIC50ZXh0KClcbiAgICAgICAgICAudHJpbSgpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9ICQoaXRlbSkudmFsKCk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGAke2F0dHJpYnV0ZUlkfT0ke2F0dHJpYnV0ZVZhbHVlfWA7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsIGF0dHJpYnV0ZSwgXCJwcm9kdWN0cy9wcm9kdWN0LXZpZXctb3B0aW9uc1wiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0b2NrID4gMCkge1xuICAgICAgICAgICAgdmFyIHByb2dyZXNzQmFySHRtbCA9IFwiXCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJiay1zdG9jay1jb3VudGRvd25cIj4nO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJzdG9jay1jb3VudGRvd24tbWVzc2FnZVwiPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cIm1lc3NhZ2VfX3RleHRcIj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8c3BhbiBjbGFzcz1cIm1lc3NhZ2VfX3NpemUgZm9udC13ZWlnaHQtYm9sZCB0ZXh0LXVwcGVyY2FzZVwiPlNpemUgJyArIHZhcmlhbnRTaXplICsgXCI8L3NwYW4+IExlc3MgdGhhbiBcIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPHNwYW4gZGF0YS12YXJpYW50PVwiJyArIHZhcmlhbnRTaXplICsgJ1wiIGNsYXNzPVwidmFyaWFudC1zdG9jayBmb250LXdlaWdodC1ib2xkXCI+JyArIHJlc3BvbnNlLmRhdGEuc3RvY2sgKyBcIjwvc3Bhbj5cIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIiBsZWZ0IGluIHN0b2NrICEhIVwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgYmx1ZSBzdHJpcGVzXCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPHNwYW4gc3R5bGU9XCJ3aWR0aDogJyArIHJlc3BvbnNlLmRhdGEuc3RvY2sgKyAnJTtcIj48L3NwYW4+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcblxuICAgICAgICAgICAgJChcIiNsb2FkUHJvZHVjdFZhcmlhbnRCYXJzXCIpLmFwcGVuZChwcm9ncmVzc0Jhckh0bWwpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuc2t1LCByZXNwb25zZS5kYXRhLnN0b2NrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChcIiNsb2FkZXJpbWFnZVN0b2Nrc2hvd1wiKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcGxheVZpZGVvKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJmcm9tIHBsYXkgdmlkZW9cIik7XG5cbiAgICAkKFwiLnBsYXlMb2FkZWRWaWRlb1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2aWRlb0lEID0gJCh0aGlzKS5hdHRyKFwiZGF0YS12aWRlby1pZFwiKTtcbiAgICAgIHZhciB2aWV3cG9ydGhlaWdodCA9ICQoXCIucHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lclwiKS5oZWlnaHQoKTtcbiAgICAgIHZhciB2aWV3cG9ydHdpZHRoID0gJChcIi5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyXCIpLndpZHRoKCk7XG4gICAgICB2YXIgZW1iZWRDb2RlID1cbiAgICAgICAgJzxpZnJhbWUgaWQ9XCJkb05vdFBsYXlNZUFueU1vcmVcIiB0eXBlPVwidGV4dC9odG1sXCIgd2lkdGg9XCInICtcbiAgICAgICAgdmlld3BvcnR3aWR0aCArXG4gICAgICAgICdcIiBoZWlnaHQ9XCInICtcbiAgICAgICAgdmlld3BvcnRoZWlnaHQgK1xuICAgICAgICAnXCIgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArXG4gICAgICAgIHZpZGVvSUQgK1xuICAgICAgICAnP2F1dG9wbGF5PTEmbXV0ZT0wXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhdXRvcGxheTtcIj48L2lmcmFtZT4nO1xuICAgICAgLy9jb25zb2xlLmxvZyh2aWRlb0lEKTtcblxuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLmh0bWwoZW1iZWRDb2RlKTtcbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5zaG93KCk7XG4gICAgICAkKFwiLmxvYWRJbWFnZUhlcmVcIikuaGlkZSgpO1xuICAgICAgJChcIiNwcm9kdWN0VmlkZW9cIikuYWRkQ2xhc3MoXCJkaXNhYmxlWm9vbVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwidmlkZW8gY2xpY2tlZFwiKTtcbiAgICB9KTtcblxuICAgICQoXCIuaW1hZ2VUaHVtYm5haWxDbGlja2VkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8kKFwiI2RvTm90UGxheU1lQW55TW9yZVwiKS5yZW1vdmUoKTtcbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5odG1sKFwiXCIpO1xuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLmhpZGUoKTtcbiAgICAgICQoXCIubG9hZEltYWdlSGVyZVwiKS5zaG93KCk7XG4gICAgICAkKFwiI3Byb2R1Y3RWaWRlb1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVab29tXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJJbWFnZSBDbGlja2VkXCIpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHsgQ29sbGFwc2libGVFdmVudHMgfSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3TGluaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdUYWJMaW5rJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIGlmICghJGNvbnRlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZVJldmlld3MoKSB7XG4gICAgICAgIC8vIFdlJ3JlIGluIHBhZ2luYXRpbmcgc3RhdGUsIGRvIG5vdCBjb2xsYXBzZVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xuICAgICAqL1xuICAgIGluamVjdFBhZ2luYXRpb25MaW5rKCkge1xuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRwcmV2TGluay5hdHRyKCdocmVmJywgYCR7JHByZXZMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKFt7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3UmF0aW5nLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGl0bGVcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdTdWJqZWN0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGV4dFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0NvbW1lbnQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLndyaXRlUmV2aWV3LWZvcm0gW25hbWU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3RW1haWwsXG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=