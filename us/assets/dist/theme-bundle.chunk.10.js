(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./custom/cart-page-upsell */ "./assets/js/theme/custom/cart-page-upsell.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }






// custom

var Cart = /*#__PURE__*/function (_PageManager) {
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Cart, _PageManager);
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.bindEvents();
    this.displayMemberPrice();
    /**
    * IntuitSolutions.net - Cart Page Upsell
    */
    this.cartPageUpsell = new _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_8__["default"]();
  };
  _proto.displayMemberPrice = function displayMemberPrice() {
    var cartProducts = $(".cart_product_id");
    //console.log(cartProducts);
    cartProducts.each(function (id, li) {
      // calculate and display discounted price
      var mainProductID = $(this).attr("data-product-id");
      console.log("=>>>>>" + mainProductID);
      var proPrice = $(this).attr("data-product-price").replace("$", "");
      var discountedPrice = (Number(proPrice.trim().replace("$", "")) * Number(0.90)).toFixed(2);
      $(".memberProductPrice-" + mainProductID).html("$" + discountedPrice);
    });
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId) {
    var _this4 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      _this4.bindGiftWrappingForm();
      modal.setupFocusableElements(_global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].CART_CHANGE_PRODUCT);
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $changedOption = $(currentTarget);
      var $form = $changedOption.parents('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      var item = $('[name="item_id"]', $form).attr('value');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange(item, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      cartRemoveItem(itemId);

      // swal.fire({
      //     text: string,
      //     icon: 'warning',
      //     showCancelButton: true,
      // }).then((result) => {
      //     if (result.value) {
      //         // remove item from cart
      //         cartRemoveItem(itemId);
      //     }
      // });

      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        // return swal.fire({
        //     text: $codeInput.data('error'),
        //     icon: 'error',
        // });
        showCouponError($codeInput.data('error'));
        return;
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          $('.coupon-error').hide().text("");
          _this7.refreshContent();
        } else {
          // swal.fire({
          //     text: response.data.errors.join('\n'),
          //     icon: 'error',
          // });

          showCouponError(response.data.errors.join('\n'));
        }
      });
      function showCouponError(text) {
        $('.coupon-error').show().text(text);
      }
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            text: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    var _this10 = this;
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__["default"]($('[data-shipping-estimator]'));

    /**
    * IntuitSolutions.net - Cart Page Upsell
    */
    // reload cart content when a Cart Page Upsell item is added to the cart
    $(document).on('cpu-refresh-cart-content', function () {
      return _this10.refreshContent(false);
    });
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
});

/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell-product-details.js":
/*!********************************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell-product-details.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsellProduct; });
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);





var CartPageUpsellProduct = /*#__PURE__*/function () {
  function CartPageUpsellProduct($scope) {
    this.$scope = $scope;
    this.$scope.addClass('hasOptions--wired');
    this.initRadioAttributes();
    this.$form = jquery__WEBPACK_IMPORTED_MODULE_1___default()('form', this.$scope);
    this.$productId = jquery__WEBPACK_IMPORTED_MODULE_1___default()('[name="product_id"]', this.$form).val();
    this.key = 'cpu'; // unique indentifier for this customization

    this.$productOptionsElement = jquery__WEBPACK_IMPORTED_MODULE_1___default()("[data-" + this.key + "-option-change]", this.$form); // ie <div class="options" data-cpu-option-change>

    this.updateOptionView();
    // utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), (err, response) => {
    //     const attributesData = response.data || {};
    //     const attributesContent = response.content || {};
    //     this.updateProductAttributes(attributesData);
    //     // if (hasDefaultOptions) {
    //         this.updateView(attributesData, attributesContent);
    //     // } else {
    //     //     this.updateDefaultAttributesForOOS(attributesData);
    //     // }
    // });

    this.bindEvents();
  }

  /**
   * add "isRequired" to options that are required
   */
  var _proto = CartPageUpsellProduct.prototype;
  _proto.addRequiredClasstoOptions = function addRequiredClasstoOptions() {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('.form-field', this.$productOptionsElement).toArray().forEach(function (option) {
      if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(option).find('small:contains("Required")').length) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(option).addClass('isRequired');
      }
    });
  }

  /**
   * Handle product options changes
   */;
  _proto.productOptionsChanged = function productOptionsChanged(event) {
    var $changedOption = jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.target);
    var optionRow = jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.target).parents('.form-field');

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      // do nothing
    } else {
      this.updateOptionView();
    }

    // was an option with a value selected?
    if ($changedOption.val() !== '') {
      if ($changedOption.is('input')) {
        var type = $changedOption.attr('type');
        switch (type) {
          case 'radio':
            $changedOption.attr('checked', true);
            $changedOption.siblings('input').attr('checked', false);
            optionRow.addClass('isSelected');
            break;
          case 'checkbox':
            if ($changedOption.prop('checked')) {
              optionRow.addClass('isSelected');
              $changedOption.attr('checked', true);
            } else {
              optionRow.removeClass('isSelected');
              $changedOption.attr('checked', false);
            }
            break;
          case 'text':
          case 'number':
            $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
            $changedOption.attr('value', $changedOption.val());
            break;
        }
      } else if ($changedOption.is('select')) {
        var $selectedOption = $changedOption.find("option[value=\"" + $changedOption.val() + "\"]");
        $selectedOption.attr('selected', true);
        $selectedOption.siblings('option').attr('selected', false);
        // if it's a date select, make sure all 3 selects are filled in before saying it's filled in
        if ($changedOption.attr('name').indexOf('month') !== -1 || $changedOption.attr('name').indexOf('day') !== -1 || $changedOption.attr('name').indexOf('year') !== -1) {
          // count the other date fields (if changed month, see if day and year are filled out)
          var otherSelectedDateFields = $changedOption.siblings('select').toArray().reduce(function (count, select) {
            return jquery__WEBPACK_IMPORTED_MODULE_1___default()(select).val() === '' ? count : count + 1;
          }, 0);
          // if all fields are filled in
          if (otherSelectedDateFields === 2) {
            optionRow.addClass('isSelected');
          }
        } else {
          optionRow.addClass('isSelected'); // it's not a date select, just mark the option as selected
        }
      } else if ($changedOption.is('textarea')) {
        $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
        $changedOption.text($changedOption.val());
      }
    } else {
      // else remove class (there was no value for this option)
      optionRow.removeClass('isSelected');
    }
    this.checkOptionsSelected();
  }

  /**
   *  Make API call on option change to update availability
   */;
  _proto.updateOptionView = function updateOptionView() {
    var _this = this;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.productAttributes.optionChange(this.$productId, this.$form.serialize(), function (err, response) {
      var productAttributesData = response.data || {};
      _this.updateProductAttributes(productAttributesData);
      _this.updateView(productAttributesData);
      // stock stuff (should wire up image change as well later)
      // if (productAttributesData.stock !== undefined) {
      //     $('.currentStock', $scope).text(productAttributesData.stock);
      // } else {
      //     $('.currentStock', $scope).text('');
      // }
    });
  }

  /**
   *  Check whether all required options are selected 
   */;
  _proto.checkOptionsSelected = function checkOptionsSelected() {
    /*
    ## see if all options are selected
    */
    var numberRequiredOptions = this.$scope.find('.form-field.isRequired').length;
    var numberSelectedOptions = this.$scope.find('.form-field.isRequired.isSelected').length;
    // const $addToCartButton = $form.find('.card-actions .button');
    // $addToCartButton.removeClass('button--success');
    if (numberRequiredOptions === 0 || numberRequiredOptions <= numberSelectedOptions) {
      this.$scope.addClass('hasOptions--selected'); // add class to product for easy adding to cart
      jquery__WEBPACK_IMPORTED_MODULE_1___default()('.cpu__modal').addClass('hasOptions--selected'); // update text for user as well
    } else {
      this.$scope.removeClass('hasOptions--selected'); // remove class since not all options filled in
      jquery__WEBPACK_IMPORTED_MODULE_1___default()('.cpu__modal').removeClass('hasOptions--selected'); // update text for user as well
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   *
   */;
  _proto.updatePriceView = function updatePriceView(price) {
    if (price.without_tax) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()("[data-product-price-without-tax]", this.$scope).html(price.without_tax.formatted);
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data) {
    // update price
    // const viewModel = this.getViewModel(this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.price)) {
      this.updatePriceView(data.price);
    }
    // update image
    var imageEl = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".cpu__item-img", this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.image)) {
      var imageSrc = data.image.data.replace('{:size}', '300x300');
      imageEl.attr('src', imageSrc);
    } else {
      imageEl.attr('src', imageEl.data('src'));
    }
    // update message if there is one
    var optionMessage = data.stock_message || data.purchasing_message;
    if (optionMessage !== null) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
        text: optionMessage,
        icon: 'error'
      });
      this.$scope.addClass('hasOptions--error');
    } else {
      this.$scope.removeClass('hasOptions--error');
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this2 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('[data-product-attribute-value]', this.$scope.add('.cpu__modal')).each(function (i, attribute) {
      var $attribute = jquery__WEBPACK_IMPORTED_MODULE_1___default()(attribute);
      var attrId = parseInt($attribute.data('product-attribute-value'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this2.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this2.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable').prev('input').attr('disabled', true);
    }
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($attribute.parent().val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable').prev('input').attr('disabled', false);
    }
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this3 = this;
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = jquery__WEBPACK_IMPORTED_MODULE_1___default()(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.click(function () {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);
            $radio.change();
          } else {
            $radio.data('state', true);
          }
          _this3.initRadioAttributes();
        });
      }
      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    var _this4 = this;
    Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_3__["default"])(this.$scope, this.$productId, this.key); // make options unique so there aer no conflicts when selecting options

    this.addRequiredClasstoOptions(); // add "isRequired" to required options
    this.checkOptionsSelected();

    // listen for option changes
    this.$productOptionsElement.change(function (event) {
      _this4.productOptionsChanged(event, event.target);
    });
    this.$productOptionsElement.show();

    // update options selected on load
    this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
    this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
    this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
    this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
    this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
    this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
  };
  return CartPageUpsellProduct;
}();


/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsell; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart-page-upsell-product-details */ "./assets/js/theme/custom/cart-page-upsell-product-details.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var _common_carousel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/carousel.js */ "./assets/js/theme/common/carousel.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }








//  Apr 2019: updated version includes ITS Upsell Suite
var VERSION = '2.0';
var CartPageUpsell = /*#__PURE__*/function () {
  function CartPageUpsell() {
    console.log('IntuitSolutions.net - Cart Page Upsell', VERSION);

    /**
     * options = 'related', 'similar', 'custom fields'
     * errorDefault = backup mode; only necessary with Upsell Suite
     * -- related = automatically loads related products from a random item in the cart
     * -- similar = automatically loads similar by view products from a random item in the cart
     * -- custom fields = will load the products specified by the cart item's custom fields
     * -- upsell suite = will load products specified by Upsell Suite CSVs
     */
    this.mode = 'custom fields';
    this.errorDefault = 'similar';
    this.showMobileInCarousel = true;
    this.productLimit = 3;
    this.loading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu .loadingOverlay');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.product.getById = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.product.getById.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.product); // required to keep scope of utils to the utils
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api); // required to keep scope of utils to the utils

    this.bindEvents();
  }

  /**
   * remove duplicate items from array
   *
   * pulled from stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
   * @param {array} upsellTargets - array of items we want to strip out any duplicate items from
   */
  var _proto = CartPageUpsell.prototype;
  _proto.removeDuplicateTargets = function removeDuplicateTargets(upsellTargets) {
    return Array.from(new Set(upsellTargets));
  }

  /**
   * get cart items URLs and Product Ids so we don't try to upsell an item that's already in the cart
   * @param {array} upsellTargets - array of items we want to strip out any cart item matches from
   */;
  _proto.removeCartItemTargets = function removeCartItemTargets(upsellTargets) {
    // get all data from the cart items
    var cartItemData = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-upsell]').toArray().forEach(function (cartItem) {
      var producturl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cartItem).data('product-url').replace(window.location.origin, '') || '';
      var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cartItem).data('product-id').toString() || '';
      cartItemData.push(producturl, productId);
    });
    // only keep upsell items that aren't within our cartItemData array
    var result = upsellTargets.reduce(function (upsellItems, upsellitem) {
      if (cartItemData.indexOf(upsellitem) === -1) {
        upsellItems.push(upsellitem);
      }
      return upsellItems;
    }, []);
    // return result
    return result;
  }

  /**
   * get random int given a max
   */;
  _proto.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * automatically load products from the cart item's either related products or similar by view items
   * @param {string} type - "related" or "similar"
   */;
  _proto.loadAutoTargets = function loadAutoTargets(type) {
    var _this = this;
    var itemIndex = this.getRandomInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart-item').length); // get random item index (pick random item)
    var itemId = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cart-item').eq(itemIndex || 0).data('product-id'); // get product id of that random item
    if (itemId == undefined) {
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu').hide();
    }
    // see if we already ajax'd for these upsell items
    var storedData = JSON.parse(localStorage.getItem("cpu__items" + itemId)) || [];
    if (storedData.length) {
      // if already ajaxed and stored upsell items
      storedData = this.removeDuplicateTargets(storedData); // remove duplicate upsell targets
      storedData = this.removeCartItemTargets(storedData); // remove any upsell targets that match an item already in the cart
      this.loadUpsellTargets(storedData); // load those stored upsell items
    } else {
      // otherwise
      var opts = {
        template: "custom/cart-page-upsell-targets--" + type,
        config: {
          product: {
            related_products: {
              limit: 70
            },
            similar_by_views: {
              limit: 70
            }
          }
        }
      };
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.product.getById(itemId, opts, function (err, res) {
        // ajax for the first item's upsell items (suggested products)
        if (err) {
          return jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu').hide();
        }
        var targets = JSON.parse(res) || [];
        targets = _this.removeDuplicateTargets(targets); // remove duplicate upsell targets
        targets = _this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
        localStorage.setItem("cpu__items" + itemId, JSON.stringify(targets));
        _this.loadUpsellTargets(targets);
      });
    }
  }

  /**
   * returns array of upsell product URLs and/or IDs
   */;
  _proto.loadCustomFieldTargets = function loadCustomFieldTargets() {
    var targets = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-upsell]').toArray().forEach(function (cartItem) {
      var upsellItems = jquery__WEBPACK_IMPORTED_MODULE_0___default()(cartItem).data('upsell');
      if (upsellItems.length) {
        upsellItems.split(',').forEach(function (upsellItem) {
          if (upsellItem.length) {
            targets.push(upsellItem);
          }
        });
      }
    });
    // if mode is set to custom fields but no items have custom fields applied, default to using related products
    if (targets.length === 0) {
      //return this.loadAutoTargets('related');
    }
    targets = this.removeDuplicateTargets(targets); // remove duplicate upsell targets
    targets = this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
    return this.loadUpsellTargets(targets);
  };
  _proto.loadCSVTargets = /*#__PURE__*/function () {
    var _loadCSVTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var cpuHTMLtext, cpuHTML, remainingSlots, targets;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //  get the previously AJAXed products from sessionStorage
            cpuHTMLtext = sessionStorage.getItem("cpuCards");
            cpuHTML = upsellSuiteCPU.parseArrayFromString(cpuHTMLtext); //  if nothing has been downloaded,
            //  revert to backup mode
            console.log(cpuHTML.length, "cpuHTML Length");
            if (cpuHTML.length) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", this.loadAutoTargets(this.errorDefault));
          case 5:
            //  display the previouly downloaded products
            cpuHTML.forEach(function (card) {
              return jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu .cpu__list--customfields').append(card.html);
            });

            //  if there is room for more products,
            //  fill the rest of the add-on by
            //  adding products from the CSVs
            //  of products already in the CPU
            remainingSlots = this.productLimit - cpuHTML.length;
            if (!remainingSlots) {
              _context.next = 18;
              break;
            }
            _context.prev = 8;
            _context.next = 11;
            return upsellSuiteCPU.getAdditionalProducts(cpuHTML.map(function (product) {
              return product.product_id;
            }), remainingSlots);
          case 11:
            targets = _context.sent;
            return _context.abrupt("return", this.loadUpsellTargets(targets));
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            console.error("CPU parse error: ", _context.t0);
          case 18:
            this.applyUpsellHandlers();
            return _context.abrupt("return", this.loading.hide());
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[8, 15]]);
    }));
    function loadCSVTargets() {
      return _loadCSVTargets.apply(this, arguments);
    }
    return loadCSVTargets;
  }()
  /**
   * handle adding items to cart
   */
  ;
  _proto.addToCart = function addToCart(event) {
    var _this2 = this;
    var product = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget).parents('.cpu__item');
    product.removeClass('hasError'); // remove any error highlighting
    // make sure all options are selected
    if (product.hasClass('hasOptions') && !product.hasClass('hasOptions--selected')) {
      product.hasClass('hasOptions--wired') ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('.qaatx__options', product).slideDown() // if options loaded, just show them
      : this.toggleOptions(event); // options aren't loaded, load them + show them
      product.addClass('hasError');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
      return sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
        text: 'Please make sure all required options have been selected',
        icon: 'error'
      });
    }
    // actually add to cart
    this.loading.show();
    var form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-form', product);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.cart.itemAdd(new FormData(form[0]), function (err, response) {
      var errorMessage = err || response.data.error; // take note of errors
      if (errorMessage) {
        // Guard statement
        // Strip the HTML from the error message
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        _this2.loading.hide();
        product.addClass('hasError'); // highlgihht error item
        var errorOffset = product.offset().top;
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
          scrollTop: errorOffset - 20
        }, 700); // scroll user to the error product
        // remove class from our 'qued" items
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
        // alert user of error
        return sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
          text: tmp.textContent || tmp.innerText,
          icon: 'error'
        });
      }
      _this2.loading.hide();
      product.addClass('wasAdded');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button', product).text('Added to Cart');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger('cpu-refresh-cart-content');
      // if (product.hasClass('isBeingAdded')) {
      //     product.removeClass('isBeingAdded');
      //     ($('.cpu__item.isBeingAdded') && $('.cpu__item.isBeingAdded').length)
      //         ? $('.cpu__item.isBeingAdded').eq(0).find('.qaatc__addtocart').trigger('click') // trigger submitting next product to the cart
      //         : window.location = '/cart.php';
      // }
    });
  }

  /**
   * when modal option changed we need to sync the "real" form. Sync options selected in scope1 with scope2
   * @param {object} event
   * @param {string} productId
   */;
  _proto.syncFormOption = function syncFormOption(event, productId) {
    var opt = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('.form-field');
    var type = jquery__WEBPACK_IMPORTED_MODULE_0___default()(opt).data('product-attribute');
    var target = null;
    var targetId = null;
    var value = null;
    switch (type) {
      case 'input-checkbox':
      case 'set-rectangle':
      case 'set-radio':
      case 'product-list':
      case 'swatch':
        target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input:checked', opt);
        if (target && target.length) {
          targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + targetId).prop('checked', true);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + targetId).siblings('input').prop('checked', false);
        } else {
          targetId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).prop('id').replace("_" + productId, '').replace('modal_', '');
        }
        break;
      case 'set-select':
        target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.form-select', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + targetId).val(value);
        break;
      case 'input-text':
      case 'textarea':
        target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.form-input', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + targetId).val(value);
        break;
    }
    // force update on the "real" form
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + targetId).trigger('change');
  }

  /**
   * Add to cart from modal
   */;
  _proto.addToCartFromModal = function addToCartFromModal(modalContent, product) {
    var modal = modalContent.parents('.cpu__modal');
    if (!modal.hasClass('hasOptions--selected')) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
        text: 'Please make sure all required options have been selected',
        icon: 'error',
        onClose: function onClose() {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button--options', product).trigger('click'); // show options again if tried adding to cart before selecting all options
        }
      });
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button--addtocart', product).trigger('click'); // trigger add to cart button click on main product
    sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.close(); // close modal
  }

  /**
   * show and load if needed this product's options
   */;
  _proto.showOptions = function showOptions(e) {
    var _this3 = this;
    var product = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).parents('.cpu__item');
    var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-name', product).text();
    var optionMarkup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-options', product).html();
    var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[name="product_id"]', product).val();
    sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
      title: "" + name,
      html: optionMarkup,
      customClass: 'cpu__modal',
      showCloseButton: true,
      showConfirmButton: false,
      onOpen: function onOpen() {
        // since the moda lHTML is cloned it doesn't have any handlers applied to it. This handles the "fake" cloned options to update the "real" options
        var modalContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.getContent());
        Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_4__["default"])(modalContent, productId, 'modal');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).change(function (event) {
          _this3.syncFormOption(event, productId);
        });
        // trigger default selected options unless there's an error.. then we'll get stuck in a loop
        if (!product.hasClass('hasOptions--error')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-cpu-option-change]', modalContent).find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
        }

        // this.optionHandlers[productId].updateOptionView();
        _this3.optionHandlers[productId].checkOptionsSelected(modalContent);

        // handle adding to cart from modal
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button--modaladdtocart', modalContent).on('click', function () {
          return _this3.addToCartFromModal(modalContent, product);
        });
      }
    });
  }

  /**
   * apply upsell handlers
   */;
  _proto.applyUpsellHandlers = function applyUpsellHandlers() {
    var _this4 = this;
    this.optionHandlers = {};
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item.hasOptions').toArray().forEach(function (product) {
      var thisID = jquery__WEBPACK_IMPORTED_MODULE_0___default()(product).find('input[name="product_id"]').val();
      _this4.optionHandlers[thisID] = new _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_3__["default"](jquery__WEBPACK_IMPORTED_MODULE_0___default()(product));
    }); // handle options for all products w/ options

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button--addtocart').on('click', function (e) {
      return _this4.addToCart(e);
    }); // manage adding to cart

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item-button--options').on('click', function (e) {
      return _this4.showOptions(e);
    }); // manage adding to cart

    this.displayInCarousel();
  }

  /**
   * AJAX the upsell URLs and/or IDs and append where needed
   * @param {array} targets - targets to upsell
   */;
  _proto.loadUpsellTargets = function loadUpsellTargets(targets) {
    var _this5 = this;
    if (targets.length) {
      targets = targets.slice(0, this.productLimit || targets.length);
      var runQueueInOrder = function runQueueInOrder() {
        if (targets.length === 0) {
          // when done all products
          _this5.applyUpsellHandlers();
          _this5.loading.hide();
          return;
        } else {
          var target = targets.shift();
          var requestMethod = target.toString().match(/^[0-9]+$/) ? _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.product.getById : _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage;
          requestMethod(target, {
            template: 'custom/cart-page-upsell-item'
          }, function (err, response) {
            if (err) {
              return;
            } // if error
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu .cpu__list--customfields').append(response); // no error, append markup
            runQueueInOrder(); // run next item
          });
        }
        ;
      };
      runQueueInOrder(); // start the loop
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cpu').hide();
    }
  }

  /**
   * Add Slick options to product display after loading products,
   * then fire Slick
   */;
  _proto.displayInCarousel = function displayInCarousel() {
    if (!this.showMobileInCarousel) return;

    //  Add CSS to product cards before firing Slick
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__list').addClass('cpu__list-slick');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__item').addClass('cpu__item-slick');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cpu__list').slick({
        "infinite": true,
        "dots": true,
        "arrows": true,
        "mobileFirst": true,
        "rows": 1,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "responsive": [{
          "breakpoint": 767,
          "settings": "unslick"
        }]
      });
    });

    // formatCarousel();
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    this.loading.show();
    switch (this.mode) {
      case 'related':
        return this.loadAutoTargets('related');
      case 'similar':
        return this.loadAutoTargets('similar');
      case 'custom fields':
        return this.loadCustomFieldTargets();
      case 'upsell suite':
        return this.loadCSVTargets();
    }
  };
  return CartPageUpsell;
}();


/***/ }),

/***/ "./assets/js/theme/custom/make-options-unique.js":
/*!*******************************************************!*\
  !*** ./assets/js/theme/custom/make-options-unique.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/*
 * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
 */
var makeOptionIdsUnique = function makeOptionIdsUnique(scope, productId, key) {
  $('input[type="radio"], input[type="checkbox"]', scope).each(function (index, el) {
    var optionId = $(el).attr('id'); // update ID to include product ID
    $(el).attr('id', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('for', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
  // add input fields label class and put in here. These options we need to select their sibling label
  var optionsWithLabelAttrs = ['input[type="text"]', 'input[type="number"]', 'input[type="file"]', 'select', 'textarea'];
  var optionsWithLabelAttrsSelectors = optionsWithLabelAttrs.join(',');
  $(optionsWithLabelAttrsSelectors, scope).parents('.form-field').find('label').each(function (index, el) {
    var optionId = $(el).attr('for'); // update ID to include product ID
    $(el).attr('for', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('id', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
};
/* harmony default export */ __webpack_exports__["default"] = (makeOptionIdsUnique);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vY2FydC1wYWdlLXVwc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL21ha2Utb3B0aW9ucy11bmlxdWUuanMiXSwibmFtZXMiOlsiQ2FydCIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJGNhcnRDb250ZW50IiwiJCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRvdmVybGF5IiwiaGlkZSIsImJpbmRFdmVudHMiLCJkaXNwbGF5TWVtYmVyUHJpY2UiLCJjYXJ0UGFnZVVwc2VsbCIsIkNhcnRQYWdlVXBzZWxsIiwiY2FydFByb2R1Y3RzIiwiZWFjaCIsImlkIiwibGkiLCJtYWluUHJvZHVjdElEIiwiYXR0ciIsImNvbnNvbGUiLCJsb2ciLCJwcm9QcmljZSIsInJlcGxhY2UiLCJkaXNjb3VudGVkUHJpY2UiLCJOdW1iZXIiLCJ0cmltIiwidG9GaXhlZCIsImh0bWwiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIl90aGlzIiwiaXRlbUlkIiwiZGF0YSIsIiRlbCIsIm9sZFF0eSIsInBhcnNlSW50IiwidmFsIiwibWF4UXR5IiwibWluUXR5IiwibWluRXJyb3IiLCJtYXhFcnJvciIsIm5ld1F0eSIsInN3YWwiLCJmaXJlIiwidGV4dCIsImljb24iLCJzaG93IiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiaXRlbVVwZGF0ZSIsImVyciIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJlcnJvcnMiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJfdGhpczIiLCJpbnZhbGlkRW50cnkiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJfdGhpczQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50IiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJzZXR1cEZvY3VzYWJsZUVsZW1lbnRzIiwibW9kYWxUeXBlcyIsIkNBUlRfQ0hBTkdFX1BST0RVQ1QiLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGNoYW5nZWRPcHRpb24iLCIkZm9ybSIsInBhcmVudHMiLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJpdGVtIiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIl90aGlzNSIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImxlbmd0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsInJlcGxhY2VXaXRoIiwicXVhbnRpdHkiLCJ0cmlnZ2VyIiwiYmluZENhcnRFdmVudHMiLCJfdGhpczYiLCJkZWJvdW5jZVRpbWVvdXQiLCJfYmluZCIsIl9kZWJvdW5jZSIsInByZXZlbnREZWZhdWx0Iiwib25RdHlGb2N1cyIsInZhbHVlIiwiY2hhbmdlIiwic3RyaW5nIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIl90aGlzNyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJjb2RlIiwic2hvd0NvdXBvbkVycm9yIiwiYXBwbHlDb2RlIiwiYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cyIsIl90aGlzOCIsIiRjZXJ0Q29udGFpbmVyIiwiJGNlcnRGb3JtIiwiJGNlcnRJbnB1dCIsInRvZ2dsZSIsImdpZnRDZXJ0Q2hlY2siLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiX3RoaXM5IiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJmaW5kIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJfdGhpczEwIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiY29udGV4dCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsImFkZENsYXNzIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwiY29sbGFwc2libGVGYWN0b3J5IiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCJjZXJ0IiwiQ2FydFBhZ2VVcHNlbGxQcm9kdWN0IiwiJHNjb3BlIiwiaW5pdFJhZGlvQXR0cmlidXRlcyIsIiRwcm9kdWN0SWQiLCJrZXkiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwidXBkYXRlT3B0aW9uVmlldyIsImFkZFJlcXVpcmVkQ2xhc3N0b09wdGlvbnMiLCJ0b0FycmF5IiwiZm9yRWFjaCIsIm9wdGlvbiIsInByb2R1Y3RPcHRpb25zQ2hhbmdlZCIsInRhcmdldCIsIm9wdGlvblJvdyIsIkZvcm1EYXRhIiwidW5kZWZpbmVkIiwidHlwZSIsInNpYmxpbmdzIiwiJHNlbGVjdGVkT3B0aW9uIiwiaW5kZXhPZiIsIm90aGVyU2VsZWN0ZWREYXRlRmllbGRzIiwicmVkdWNlIiwiY291bnQiLCJzZWxlY3QiLCJjaGVja09wdGlvbnNTZWxlY3RlZCIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidXBkYXRlVmlldyIsIm51bWJlclJlcXVpcmVkT3B0aW9ucyIsIm51bWJlclNlbGVjdGVkT3B0aW9ucyIsInVwZGF0ZVByaWNlVmlldyIsInByaWNlIiwid2l0aG91dF90YXgiLCJmb3JtYXR0ZWQiLCJfaXNPYmplY3QiLCJpbWFnZUVsIiwiaW1hZ2UiLCJpbWFnZVNyYyIsIm9wdGlvbk1lc3NhZ2UiLCJzdG9ja19tZXNzYWdlIiwiYmVoYXZpb3IiLCJvdXRfb2Zfc3RvY2tfYmVoYXZpb3IiLCJpblN0b2NrSWRzIiwiaW5fc3RvY2tfYXR0cmlidXRlcyIsIm91dE9mU3RvY2tNZXNzYWdlIiwib3V0X29mX3N0b2NrX21lc3NhZ2UiLCJpIiwiYXR0cmlidXRlIiwiJGF0dHJpYnV0ZSIsImF0dHJJZCIsImVuYWJsZUF0dHJpYnV0ZSIsImRpc2FibGVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsInByZXYiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJzZWxlY3RlZEluZGV4IiwiZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlIiwicmVtb3ZlQXR0ciIsIiRwYXJlbnQiLCJjbG9zZXN0IiwicmFkaW8iLCIkcmFkaW8iLCJjbGljayIsIm1ha2VPcHRpb25JZHNVbmlxdWUiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZSIsInQiLCJyIiwiT2JqZWN0IiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX25leHQiLCJfdGhyb3ciLCJWRVJTSU9OIiwibW9kZSIsImVycm9yRGVmYXVsdCIsInNob3dNb2JpbGVJbkNhcm91c2VsIiwicHJvZHVjdExpbWl0IiwibG9hZGluZyIsInByb2R1Y3QiLCJnZXRCeUlkIiwiYmluZCIsImdldFBhZ2UiLCJyZW1vdmVEdXBsaWNhdGVUYXJnZXRzIiwidXBzZWxsVGFyZ2V0cyIsIkFycmF5IiwiZnJvbSIsIlNldCIsInJlbW92ZUNhcnRJdGVtVGFyZ2V0cyIsImNhcnRJdGVtRGF0YSIsImNhcnRJdGVtIiwicHJvZHVjdHVybCIsIm9yaWdpbiIsInByb2R1Y3RJZCIsInRvU3RyaW5nIiwidXBzZWxsSXRlbXMiLCJ1cHNlbGxpdGVtIiwiZ2V0UmFuZG9tSW50IiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibG9hZEF1dG9UYXJnZXRzIiwiaXRlbUluZGV4IiwiZXEiLCJzdG9yZWREYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvYWRVcHNlbGxUYXJnZXRzIiwib3B0cyIsImNvbmZpZyIsInJlbGF0ZWRfcHJvZHVjdHMiLCJsaW1pdCIsInNpbWlsYXJfYnlfdmlld3MiLCJyZXMiLCJ0YXJnZXRzIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImxvYWRDdXN0b21GaWVsZFRhcmdldHMiLCJzcGxpdCIsInVwc2VsbEl0ZW0iLCJsb2FkQ1NWVGFyZ2V0cyIsIl9sb2FkQ1NWVGFyZ2V0cyIsIl9jYWxsZWUiLCJjcHVIVE1MdGV4dCIsImNwdUhUTUwiLCJyZW1haW5pbmdTbG90cyIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJzZXNzaW9uU3RvcmFnZSIsInVwc2VsbFN1aXRlQ1BVIiwicGFyc2VBcnJheUZyb21TdHJpbmciLCJjYXJkIiwiYXBwZW5kIiwiZ2V0QWRkaXRpb25hbFByb2R1Y3RzIiwibWFwIiwicHJvZHVjdF9pZCIsInQwIiwiZXJyb3IiLCJhcHBseVVwc2VsbEhhbmRsZXJzIiwiYWRkVG9DYXJ0IiwiaGFzQ2xhc3MiLCJzbGlkZURvd24iLCJ0b2dnbGVPcHRpb25zIiwiZm9ybSIsIml0ZW1BZGQiLCJ0bXAiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZXJyb3JPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJzeW5jRm9ybU9wdGlvbiIsIm9wdCIsInRhcmdldElkIiwiYWRkVG9DYXJ0RnJvbU1vZGFsIiwibW9kYWxDb250ZW50Iiwib25DbG9zZSIsImNsb3NlIiwic2hvd09wdGlvbnMiLCJvcHRpb25NYXJrdXAiLCJ0aXRsZSIsImN1c3RvbUNsYXNzIiwic2hvd0Nsb3NlQnV0dG9uIiwic2hvd0NvbmZpcm1CdXR0b24iLCJvbk9wZW4iLCJvcHRpb25IYW5kbGVycyIsInRoaXNJRCIsImRpc3BsYXlJbkNhcm91c2VsIiwicnVuUXVldWVJbk9yZGVyIiwic2hpZnQiLCJyZXF1ZXN0TWV0aG9kIiwibWF0Y2giLCJyZWFkeSIsInNsaWNrIiwic2NvcGUiLCJlbCIsIm9wdGlvbklkIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFFdUI7QUFDakI7QUFDVztBQUNBO0FBQ2xCO0FBQ3hDO0FBQ3VEO0FBQUEsSUFFbENBLElBQUksMEJBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBQyxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBQyxjQUFBLENBQUFKLElBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFJLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFDTixJQUFJLENBQUNDLFlBQVksR0FBR0MsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO0lBQzVDLElBQUksQ0FBQ0MsYUFBYSxHQUFHRCxDQUFDLENBQUMsb0JBQW9CLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxXQUFXLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUMxQyxJQUFJLENBQUNHLFFBQVEsR0FBR0gsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRWIsSUFBSSxDQUFDQyxVQUFVLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUNDLGtCQUFrQixDQUFDLENBQUM7SUFDekI7QUFDUjtBQUNBO0lBQ1EsSUFB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SixJQUFJLENBQUMsQ0FBQyxDQUFDL1QsSUFBSSxDQUFDLElBQUksRUFBS3NNLEdBQUcsU0FBSTZRLFFBQVEsU0FBSTFGLFNBQVcsQ0FBQyxDQUFDLENBQUM7RUFDaEUsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVjdEgsa0ZBQW1CLEUiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZ2lmdENlcnRDaGVjayBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuLy8gY3VzdG9tXG5pbXBvcnQgQ2FydFBhZ2VVcHNlbGwgZnJvbSAnLi9jdXN0b20vY2FydC1wYWdlLXVwc2VsbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5TWVtYmVyUHJpY2UoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICogSW50dWl0U29sdXRpb25zLm5ldCAtIENhcnQgUGFnZSBVcHNlbGxcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYXJ0UGFnZVVwc2VsbCA9IG5ldyBDYXJ0UGFnZVVwc2VsbCgpO1xuXG4gICAgfVxuXG4gICAgZGlzcGxheU1lbWJlclByaWNlKCl7XG5cbiAgICAgICAgdmFyIGNhcnRQcm9kdWN0cyA9ICQoXCIuY2FydF9wcm9kdWN0X2lkXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGNhcnRQcm9kdWN0cyk7XG4gICAgICAgIGNhcnRQcm9kdWN0cy5lYWNoKGZ1bmN0aW9uKGlkLCBsaSkge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGFuZCBkaXNwbGF5IGRpc2NvdW50ZWQgcHJpY2VcbiAgICAgICAgICAgIHZhciBtYWluUHJvZHVjdElEID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1wcm9kdWN0LWlkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9Pj4+Pj5cIittYWluUHJvZHVjdElEKTtcbiAgICAgICAgICAgIHZhciBwcm9QcmljZSA9ICQodGhpcykuYXR0cihcImRhdGEtcHJvZHVjdC1wcmljZVwiKS5yZXBsYWNlKFwiJFwiLFwiXCIpO1xuICAgICAgICAgICAgdmFyIGRpc2NvdW50ZWRQcmljZSA9IChOdW1iZXIocHJvUHJpY2UudHJpbSgpLnJlcGxhY2UoXCIkXCIsXCJcIikpKk51bWJlcigwLjkwKSkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICQoXCIubWVtYmVyUHJvZHVjdFByaWNlLVwiK21haW5Qcm9kdWN0SUQpLmh0bWwoXCIkXCIrZGlzY291bnRlZFByaWNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIW5ld1F0eSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogYCR7aW52YWxpZEVudHJ5fSBpcyBub3QgYSB2YWxpZCBlbnRyeWAsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcblxuICAgICAgICAgICAgbW9kYWwuc2V0dXBGb2N1c2FibGVFbGVtZW50cyhtb2RhbFR5cGVzLkNBUlRfQ0hBTkdFX1BST0RVQ1QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkY2hhbmdlZE9wdGlvbiA9ICQoY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICRjaGFuZ2VkT3B0aW9uLnBhcmVudHMoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSAkKCdbbmFtZT1cIml0ZW1faWRcIl0nLCAkZm9ybSkuYXR0cigndmFsdWUnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShpdGVtLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdjYXJ0L2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHRvdGFsczogJ2NhcnQvdG90YWxzJyxcbiAgICAgICAgICAgICAgICBwYWdlVGl0bGU6ICdjYXJ0L3BhZ2UtdGl0bGUnLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBsZXQgcHJlVmFsO1xuXG4gICAgICAgIC8vIGNhcnQgdXBkYXRlXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcbiAgICAgICAgJCgnLmNhcnQtaXRlbS1xdHktaW5wdXQnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2ZvY3VzJywgZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgIHByZVZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm1EZWxldGUnKTtcblxuICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcblxuICAgICAgICAgICAgLy8gc3dhbC5maXJlKHtcbiAgICAgICAgICAgIC8vICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAvLyAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgLy8gICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAvLyB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgLy8gICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvdXBvbkZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBFbXB0eSBjb2RlXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGV4dDogJGNvZGVJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgIC8vICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIHNob3dDb3Vwb25FcnJvcigkY29kZUlucHV0LmRhdGEoJ2Vycm9yJykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb3Vwb24tZXJyb3InKS5oaWRlKCkudGV4dChcIlwiKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvdXBvbkVycm9yKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2hvd0NvdXBvbkVycm9yKHRleHQpe1xuICAgICAgICAgICAgICAgICQoJy5jb3Vwb24tZXJyb3InKS5zaG93KCkudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWdpZnRDZXJ0Q2hlY2soY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNlcnRJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSk7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMubmV0IC0gQ2FydCBQYWdlIFVwc2VsbFxuICAgICAgICAqL1xuICAgICAgICAvLyByZWxvYWQgY2FydCBjb250ZW50IHdoZW4gYSBDYXJ0IFBhZ2UgVXBzZWxsIGl0ZW0gaXMgYWRkZWQgdG8gdGhlIGNhcnRcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcsICgpID0+IHRoaXMucmVmcmVzaENvbnRlbnQoZmFsc2UpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBzd2FsIGZyb20gJy4uL2dsb2JhbC9zd2VldC1hbGVydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9ICdmb3JtW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXSc7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdCcsIHRoaXMuJGVsZW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ0NvdW50cnlcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ1N0YXRlL1Byb3ZpbmNlXFwnIGZpZWxkIGNhbm5vdCBiZSBibGFuay4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gZGVmYXVsdCBzaGlwcGluZyBhbmQgdXBzIHNoaXBwaW5nIHJhdGVzXG4gICAgICovXG4gICAgYmluZFVQU1JhdGVzKCkge1xuICAgICAgICBjb25zdCBVUFNSYXRlVG9nZ2xlID0gJy5lc3RpbWF0b3ItZm9ybS10b2dnbGVVUFNSYXRlJztcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybVVwcyA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tdXBzJyk7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtRGVmYXVsdC50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xuICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIHlvdSBjaGFuZ2UgYSBjb3VudHJ5LCB5b3Ugc3dhcCB0aGUgc3RhdGUvcHJvdmluY2UgYmV0d2VlbiBhbiBpbnB1dCBhbmQgYSBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xuICAgICAgICAgICAgJCh0aGlzLnNoaXBwaW5nRXN0aW1hdG9yKS5maW5kKCcuZm9ybS1maWVsZC0tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdmb3JtLWZpZWxkLS1zdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSA9IChzZWxlY3RvclRvQWN0aXZhdGUpID0+IHtcbiAgICAgICAgICAgICQodG9nZ2xlQnV0dG9uKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCBzZWxlY3RvclRvQWN0aXZhdGUpO1xuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1jbG9zZScpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWFkZCcpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9ICF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZDtcbiAgICB9XG5cbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yQ29udGFpbmVyID0gJCgnLnNoaXBwaW5nLWVzdGltYXRvcicpO1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICAgICAgJGVzdGltYXRvckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgc3RhdGVfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctc3RhdGVcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlSWQgPSAkKCcuc2hpcHBpbmctcXVvdGU6Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0UGFnZVVwc2VsbFByb2R1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0td2lyZWQnKTtcblxuICAgICAgICB0aGlzLmluaXRSYWRpb0F0dHJpYnV0ZXMoKTtcblxuICAgICAgICB0aGlzLiRmb3JtID0gJCgnZm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgdGhpcy4kZm9ybSkudmFsKCk7XG5cbiAgICAgICAgdGhpcy5rZXkgPSAnY3B1JzsgLy8gdW5pcXVlIGluZGVudGlmaWVyIGZvciB0aGlzIGN1c3RvbWl6YXRpb25cblxuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKGBbZGF0YS0ke3RoaXMua2V5fS1vcHRpb24tY2hhbmdlXWAsIHRoaXMuJGZvcm0pOyAvLyBpZSA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiIGRhdGEtY3B1LW9wdGlvbi1jaGFuZ2U+XG5cbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25WaWV3KCk7XG4gICAgICAgIC8vIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgYXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAvLyAgICAgY29uc3QgYXR0cmlidXRlc0NvbnRlbnQgPSByZXNwb25zZS5jb250ZW50IHx8IHt9O1xuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIC8vICAgICAvLyBpZiAoaGFzRGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgLy8gICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAvLyAgICAgdGhpcy51cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIC8vICAgICAvLyB9XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIFwiaXNSZXF1aXJlZFwiIHRvIG9wdGlvbnMgdGhhdCBhcmUgcmVxdWlyZWRcbiAgICAgKi9cbiAgICBhZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zKCkge1xuICAgICAgICAkKCcuZm9ybS1maWVsZCcsIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudCkudG9BcnJheSgpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbikuZmluZCgnc21hbGw6Y29udGFpbnMoXCJSZXF1aXJlZFwiKScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQob3B0aW9uKS5hZGRDbGFzcygnaXNSZXF1aXJlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgcHJvZHVjdCBvcHRpb25zIGNoYW5nZXNcbiAgICAgKi9cbiAgICBwcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNvbnN0IG9wdGlvblJvdyA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpO1xuXG4gICAgICAgIC8vIERvIG5vdCB0cmlnZ2VyIGFuIGFqYXggcmVxdWVzdCBpZiBpdCdzIGEgZmlsZSBvciBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgRm9ybURhdGFcbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3R5cGUnKSA9PT0gJ2ZpbGUnIHx8IHdpbmRvdy5Gb3JtRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdhcyBhbiBvcHRpb24gd2l0aCBhIHZhbHVlIHNlbGVjdGVkP1xuICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24udmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gJGNoYW5nZWRPcHRpb24uYXR0cigndHlwZScpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5zaWJsaW5ncygnaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udmFsKCkubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCd2YWx1ZScsICRjaGFuZ2VkT3B0aW9uLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdGVkT3B0aW9uID0gJGNoYW5nZWRPcHRpb24uZmluZChgb3B0aW9uW3ZhbHVlPVwiJHskY2hhbmdlZE9wdGlvbi52YWwoKX1cIl1gKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRPcHRpb24uYXR0cignc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRPcHRpb24uc2libGluZ3MoJ29wdGlvbicpLmF0dHIoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBkYXRlIHNlbGVjdCwgbWFrZSBzdXJlIGFsbCAzIHNlbGVjdHMgYXJlIGZpbGxlZCBpbiBiZWZvcmUgc2F5aW5nIGl0J3MgZmlsbGVkIGluXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZignbW9udGgnKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ2RheScpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZigneWVhcicpICE9PSAtMVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb3VudCB0aGUgb3RoZXIgZGF0ZSBmaWVsZHMgKGlmIGNoYW5nZWQgbW9udGgsIHNlZSBpZiBkYXkgYW5kIHllYXIgYXJlIGZpbGxlZCBvdXQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyU2VsZWN0ZWREYXRlRmllbGRzID0gJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ3NlbGVjdCcpLnRvQXJyYXkoKS5yZWR1Y2UoKGNvdW50LCBzZWxlY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHNlbGVjdCkudmFsKCkgPT09ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKTsgLy8gaXQncyBub3QgYSBkYXRlIHNlbGVjdCwganVzdCBtYXJrIHRoZSBvcHRpb24gYXMgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCd0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udmFsKCkubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi50ZXh0KCRjaGFuZ2VkT3B0aW9uLnZhbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVsc2UgcmVtb3ZlIGNsYXNzICh0aGVyZSB3YXMgbm8gdmFsdWUgZm9yIHRoaXMgb3B0aW9uKVxuICAgICAgICAgICAgb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1ha2UgQVBJIGNhbGwgb24gb3B0aW9uIGNoYW5nZSB0byB1cGRhdGUgYXZhaWxhYmlsaXR5XG4gICAgICovXG4gICAgdXBkYXRlT3B0aW9uVmlldygpICB7XG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgLy8gc3RvY2sgc3R1ZmYgKHNob3VsZCB3aXJlIHVwIGltYWdlIGNoYW5nZSBhcyB3ZWxsIGxhdGVyKVxuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLmN1cnJlbnRTdG9jaycsICRzY29wZSkudGV4dChwcm9kdWN0QXR0cmlidXRlc0RhdGEuc3RvY2spO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KCcnKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENoZWNrIHdoZXRoZXIgYWxsIHJlcXVpcmVkIG9wdGlvbnMgYXJlIHNlbGVjdGVkIFxuICAgICAqL1xuICAgIGNoZWNrT3B0aW9uc1NlbGVjdGVkKCkgIHtcbiAgICAgICAgLypcbiAgICAgICAgIyMgc2VlIGlmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZFxuICAgICAgICAqL1xuICAgICAgICBjb25zdCBudW1iZXJSZXF1aXJlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkJykubGVuZ3RoO1xuICAgICAgICBjb25zdCBudW1iZXJTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkLmlzU2VsZWN0ZWQnKS5sZW5ndGg7XG4gICAgICAgIC8vIGNvbnN0ICRhZGRUb0NhcnRCdXR0b24gPSAkZm9ybS5maW5kKCcuY2FyZC1hY3Rpb25zIC5idXR0b24nKTtcbiAgICAgICAgLy8gJGFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVDbGFzcygnYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgIGlmIChudW1iZXJSZXF1aXJlZE9wdGlvbnMgPT09IDAgfHwgbnVtYmVyUmVxdWlyZWRPcHRpb25zIDw9IG51bWJlclNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIGFkZCBjbGFzcyB0byBwcm9kdWN0IGZvciBlYXN5IGFkZGluZyB0byBjYXJ0XG4gICAgICAgICAgICAkKCcuY3B1X19tb2RhbCcpLmFkZENsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpOyAvLyB1cGRhdGUgdGV4dCBmb3IgdXNlciBhcyB3ZWxsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gcmVtb3ZlIGNsYXNzIHNpbmNlIG5vdCBhbGwgb3B0aW9ucyBmaWxsZWQgaW5cbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykucmVtb3ZlQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZVByaWNlVmlldyhwcmljZSkge1xuICAgICAgICBpZiAocHJpY2Uud2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgICQoYFtkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXhdYCwgdGhpcy4kc2NvcGUpLmh0bWwocHJpY2Uud2l0aG91dF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmlldyBvZiBwcmljZSwgbWVzc2FnZXMsIFNLVSBhbmQgc3RvY2sgb3B0aW9ucyB3aGVuIGEgcHJvZHVjdCBvcHRpb24gY2hhbmdlc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlVmlldyhkYXRhKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBwcmljZVxuICAgICAgICAvLyBjb25zdCB2aWV3TW9kZWwgPSB0aGlzLmdldFZpZXdNb2RlbCh0aGlzLiRzY29wZSk7XG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEucHJpY2UpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByaWNlVmlldyhkYXRhLnByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgaW1hZ2VcbiAgICAgICAgY29uc3QgaW1hZ2VFbCA9ICQoYC5jcHVfX2l0ZW0taW1nYCwgdGhpcy4kc2NvcGUpO1xuICAgICAgICBpZiAoXy5pc09iamVjdChkYXRhLmltYWdlKSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBkYXRhLmltYWdlLmRhdGEucmVwbGFjZSgnezpzaXplfScsICczMDB4MzAwJyk7XG4gICAgICAgICAgICBpbWFnZUVsLmF0dHIoJ3NyYycsIGltYWdlU3JjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VFbC5kYXRhKCdzcmMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIG1lc3NhZ2UgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGNvbnN0IG9wdGlvbk1lc3NhZ2UgPSBkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2U7XG4gICAgICAgIGlmIChvcHRpb25NZXNzYWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG9wdGlvbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtkYXRhLm91dF9vZl9zdG9ja19tZXNzYWdlfSlgO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciAhPT0gJ2hpZGVfb3B0aW9uJyAmJiBiZWhhdmlvciAhPT0gJ2xhYmVsX29wdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXScsIHRoaXMuJHNjb3BlLmFkZCgnLmNwdV9fbW9kYWwnKSkuZWFjaCgoaSwgYXR0cmlidXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYXR0cmlidXRlID0gJChhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZScpLCAxMCk7XG5cbiAgICAgICAgICAgIGlmIChpblN0b2NrSWRzLmluZGV4T2YoYXR0cklkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3VuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgJHNlbGVjdCA9ICRhdHRyaWJ1dGUucGFyZW50KCk7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgYXR0cmlidXRlIGlzIHRoZSBzZWxlY3RlZCBvcHRpb24gaW4gYSBzZWxlY3QgZHJvcGRvd24sIHNlbGVjdCB0aGUgZmlyc3Qgb3B0aW9uIChNRVJDLTYzOSlcbiAgICAgICAgICAgIGlmICgkYXR0cmlidXRlLnBhcmVudCgpLnZhbCgpID09PSAkYXR0cmlidXRlLmF0dHIoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0WzBdLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSArIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd1bmF2YWlsYWJsZScpXG4gICAgICAgICAgICAgICAgLnByZXYoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkge1xuICAgICAgICBjb25zdCAkcGFyZW50ID0gJGF0dHJpYnV0ZS5jbG9zZXN0KCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKTtcbiAgICAgICAgcmV0dXJuICRwYXJlbnQgPyAkcGFyZW50LmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJykgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IHJhZGlvIGJ1dHRvbnMgdG8gZ2V0IGRlc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBpbml0UmFkaW9BdHRyaWJ1dGVzKCkge1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIHJhZGlvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkcmFkaW8gPSAkKHJhZGlvKTtcblxuICAgICAgICAgICAgLy8gT25seSBiaW5kIHRvIGNsaWNrIG9uY2VcbiAgICAgICAgICAgIGlmICgkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkcmFkaW8uY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHJhZGlvLmRhdGEoJ3N0YXRlJykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLmRhdGEoJ3N0YXRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uY2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScsICRyYWRpby5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50c1xuICAgICAqL1xuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIG1ha2VPcHRpb25JZHNVbmlxdWUodGhpcy4kc2NvcGUsIHRoaXMuJHByb2R1Y3RJZCwgdGhpcy5rZXkpOyAvLyBtYWtlIG9wdGlvbnMgdW5pcXVlIHNvIHRoZXJlIGFlciBubyBjb25mbGljdHMgd2hlbiBzZWxlY3Rpbmcgb3B0aW9uc1xuXG4gICAgICAgIHRoaXMuYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucygpOyAvLyBhZGQgXCJpc1JlcXVpcmVkXCIgdG8gcmVxdWlyZWQgb3B0aW9uc1xuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBvcHRpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50LCBldmVudC50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LnNob3coKTtcblxuICAgICAgICAvLyB1cGRhdGUgb3B0aW9ucyBzZWxlY3RlZCBvbiBsb2FkXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgcmFkaW8gb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgcmFkaW8gYnV0dG9ucyB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCd0ZXh0YXJlYScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiB0ZXh0YXJlYSB0cCBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgfVxufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgc3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5pbXBvcnQgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0IGZyb20gJy4vY2FydC1wYWdlLXVwc2VsbC1wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IG1ha2VPcHRpb25JZHNVbmlxdWUgZnJvbSAnLi9tYWtlLW9wdGlvbnMtdW5pcXVlJztcbmltcG9ydCBmb3JtYXRDYXJvdXNlbCBmcm9tICcuLi9jb21tb24vY2Fyb3VzZWwuanMnO1xuaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnO1xuXG4vLyAgQXByIDIwMTk6IHVwZGF0ZWQgdmVyc2lvbiBpbmNsdWRlcyBJVFMgVXBzZWxsIFN1aXRlXG5jb25zdCBWRVJTSU9OID0gJzIuMCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludHVpdFNvbHV0aW9ucy5uZXQgLSBDYXJ0IFBhZ2UgVXBzZWxsJywgVkVSU0lPTik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9wdGlvbnMgPSAncmVsYXRlZCcsICdzaW1pbGFyJywgJ2N1c3RvbSBmaWVsZHMnXG4gICAgICAgICAqIGVycm9yRGVmYXVsdCA9IGJhY2t1cCBtb2RlOyBvbmx5IG5lY2Vzc2FyeSB3aXRoIFVwc2VsbCBTdWl0ZVxuICAgICAgICAgKiAtLSByZWxhdGVkID0gYXV0b21hdGljYWxseSBsb2FkcyByZWxhdGVkIHByb2R1Y3RzIGZyb20gYSByYW5kb20gaXRlbSBpbiB0aGUgY2FydFxuICAgICAgICAgKiAtLSBzaW1pbGFyID0gYXV0b21hdGljYWxseSBsb2FkcyBzaW1pbGFyIGJ5IHZpZXcgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XG4gICAgICAgICAqIC0tIGN1c3RvbSBmaWVsZHMgPSB3aWxsIGxvYWQgdGhlIHByb2R1Y3RzIHNwZWNpZmllZCBieSB0aGUgY2FydCBpdGVtJ3MgY3VzdG9tIGZpZWxkc1xuICAgICAgICAgKiAtLSB1cHNlbGwgc3VpdGUgPSB3aWxsIGxvYWQgcHJvZHVjdHMgc3BlY2lmaWVkIGJ5IFVwc2VsbCBTdWl0ZSBDU1ZzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vZGUgPSAnY3VzdG9tIGZpZWxkcyc7XG4gICAgICAgIHRoaXMuZXJyb3JEZWZhdWx0ID0gJ3NpbWlsYXInO1xuICAgICAgICB0aGlzLnNob3dNb2JpbGVJbkNhcm91c2VsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGltaXQgPSAzO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9ICQoJyNjcHUgLmxvYWRpbmdPdmVybGF5Jyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCA9IHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQuYmluZCh1dGlscy5hcGkucHJvZHVjdCk7IC8vIHJlcXVpcmVkIHRvIGtlZXAgc2NvcGUgb2YgdXRpbHMgdG8gdGhlIHV0aWxzXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlID0gdXRpbHMuYXBpLmdldFBhZ2UuYmluZCh1dGlscy5hcGkpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxuICAgICAqXG4gICAgICogcHVsbGVkIGZyb20gc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkyMjk2NDUvcmVtb3ZlLWR1cGxpY2F0ZS12YWx1ZXMtZnJvbS1qcy1hcnJheVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgZHVwbGljYXRlIGl0ZW1zIGZyb21cbiAgICAgKi9cbiAgICByZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHVwc2VsbFRhcmdldHMpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh1cHNlbGxUYXJnZXRzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IGNhcnQgaXRlbXMgVVJMcyBhbmQgUHJvZHVjdCBJZHMgc28gd2UgZG9uJ3QgdHJ5IHRvIHVwc2VsbCBhbiBpdGVtIHRoYXQncyBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICogQHBhcmFtIHthcnJheX0gdXBzZWxsVGFyZ2V0cyAtIGFycmF5IG9mIGl0ZW1zIHdlIHdhbnQgdG8gc3RyaXAgb3V0IGFueSBjYXJ0IGl0ZW0gbWF0Y2hlcyBmcm9tXG4gICAgICovXG4gICAgcmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHVwc2VsbFRhcmdldHMpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCBkYXRhIGZyb20gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgY29uc3QgY2FydEl0ZW1EYXRhID0gW107XG4gICAgICAgICQoJ1tkYXRhLXVwc2VsbF0nKS50b0FycmF5KCkuZm9yRWFjaChjYXJ0SXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0dXJsID0gJChjYXJ0SXRlbSkuZGF0YSgncHJvZHVjdC11cmwnKS5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sICcnKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtaWQnKS50b1N0cmluZygpIHx8ICcnO1xuICAgICAgICAgICAgY2FydEl0ZW1EYXRhLnB1c2gocHJvZHVjdHVybCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG9ubHkga2VlcCB1cHNlbGwgaXRlbXMgdGhhdCBhcmVuJ3Qgd2l0aGluIG91ciBjYXJ0SXRlbURhdGEgYXJyYXlcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdXBzZWxsVGFyZ2V0cy5yZWR1Y2UoKHVwc2VsbEl0ZW1zLCB1cHNlbGxpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FydEl0ZW1EYXRhLmluZGV4T2YodXBzZWxsaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBzZWxsSXRlbXMucHVzaCh1cHNlbGxpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cHNlbGxJdGVtcztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICAvLyByZXR1cm4gcmVzdWx0XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHJhbmRvbSBpbnQgZ2l2ZW4gYSBtYXhcbiAgICAgKi9cbiAgICBnZXRSYW5kb21JbnQobWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGF1dG9tYXRpY2FsbHkgbG9hZCBwcm9kdWN0cyBmcm9tIHRoZSBjYXJ0IGl0ZW0ncyBlaXRoZXIgcmVsYXRlZCBwcm9kdWN0cyBvciBzaW1pbGFyIGJ5IHZpZXcgaXRlbXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFwicmVsYXRlZFwiIG9yIFwic2ltaWxhclwiXG4gICAgICovXG4gICAgbG9hZEF1dG9UYXJnZXRzKHR5cGUpIHtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5nZXRSYW5kb21JbnQoJCgnLmNhcnQtaXRlbScpLmxlbmd0aCk7IC8vIGdldCByYW5kb20gaXRlbSBpbmRleCAocGljayByYW5kb20gaXRlbSlcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJCgnLmNhcnQtaXRlbScpLmVxKGl0ZW1JbmRleCB8fCAwKS5kYXRhKCdwcm9kdWN0LWlkJyk7IC8vIGdldCBwcm9kdWN0IGlkIG9mIHRoYXQgcmFuZG9tIGl0ZW1cbiAgICAgICAgaWYgKGl0ZW1JZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNlZSBpZiB3ZSBhbHJlYWR5IGFqYXgnZCBmb3IgdGhlc2UgdXBzZWxsIGl0ZW1zXG4gICAgICAgIGxldCBzdG9yZWREYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgY3B1X19pdGVtcyR7aXRlbUlkfWApKSB8fCBbXTtcbiAgICAgICAgaWYgKHN0b3JlZERhdGEubGVuZ3RoKSB7IC8vIGlmIGFscmVhZHkgYWpheGVkIGFuZCBzdG9yZWQgdXBzZWxsIGl0ZW1zXG4gICAgICAgICAgICBzdG9yZWREYXRhID0gdGhpcy5yZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHN0b3JlZERhdGEpOyAvLyByZW1vdmUgZHVwbGljYXRlIHVwc2VsbCB0YXJnZXRzXG4gICAgICAgICAgICBzdG9yZWREYXRhID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgICAgIHRoaXMubG9hZFVwc2VsbFRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIGxvYWQgdGhvc2Ugc3RvcmVkIHVwc2VsbCBpdGVtc1xuICAgICAgICB9IGVsc2UgeyAvLyBvdGhlcndpc2VcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2FydC1wYWdlLXVwc2VsbC10YXJnZXRzLS0ke3R5cGV9YCxcbiAgICAgICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZF9wcm9kdWN0czogeyBsaW1pdDogNzAsIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1pbGFyX2J5X3ZpZXdzOiB7IGxpbWl0OiA3MCwgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChpdGVtSWQsIG9wdHMsIChlcnIsIHJlcykgPT4geyAvLyBhamF4IGZvciB0aGUgZmlyc3QgaXRlbSdzIHVwc2VsbCBpdGVtcyAoc3VnZ2VzdGVkIHByb2R1Y3RzKVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJyNjcHUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gSlNPTi5wYXJzZShyZXMpIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgY3B1X19pdGVtcyR7aXRlbUlkfWAsIEpTT04uc3RyaW5naWZ5KHRhcmdldHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFycmF5IG9mIHVwc2VsbCBwcm9kdWN0IFVSTHMgYW5kL29yIElEc1xuICAgICAqL1xuICAgIGxvYWRDdXN0b21GaWVsZFRhcmdldHMoKSB7XG4gICAgICAgIGxldCB0YXJnZXRzID0gW107XG4gICAgICAgICQoJ1tkYXRhLXVwc2VsbF0nKS50b0FycmF5KCkuZm9yRWFjaChjYXJ0SXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cHNlbGxJdGVtcyA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Vwc2VsbCcpO1xuICAgICAgICAgICAgaWYgKHVwc2VsbEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHVwc2VsbEl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHVwc2VsbEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwc2VsbEl0ZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHVwc2VsbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIG1vZGUgaXMgc2V0IHRvIGN1c3RvbSBmaWVsZHMgYnV0IG5vIGl0ZW1zIGhhdmUgY3VzdG9tIGZpZWxkcyBhcHBsaWVkLCBkZWZhdWx0IHRvIHVzaW5nIHJlbGF0ZWQgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygncmVsYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRDU1ZUYXJnZXRzICgpICAgIHtcbiAgICAgICAgLy8gIGdldCB0aGUgcHJldmlvdXNseSBBSkFYZWQgcHJvZHVjdHMgZnJvbSBzZXNzaW9uU3RvcmFnZVxuICAgICAgICBjb25zdCBjcHVIVE1MdGV4dCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjcHVDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgY3B1SFRNTCA9IHVwc2VsbFN1aXRlQ1BVLnBhcnNlQXJyYXlGcm9tU3RyaW5nKGNwdUhUTUx0ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIC8vICBpZiBub3RoaW5nIGhhcyBiZWVuIGRvd25sb2FkZWQsXG4gICAgICAgIC8vICByZXZlcnQgdG8gYmFja3VwIG1vZGVcbiAgICAgICAgY29uc29sZS5sb2coY3B1SFRNTC5sZW5ndGgsIFwiY3B1SFRNTCBMZW5ndGhcIik7XG4gICAgICAgIGlmICghY3B1SFRNTC5sZW5ndGgpICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHModGhpcy5lcnJvckRlZmF1bHQpO1xuXG4gICAgICAgIC8vICBkaXNwbGF5IHRoZSBwcmV2aW91bHkgZG93bmxvYWRlZCBwcm9kdWN0c1xuICAgICAgICBjcHVIVE1MLmZvckVhY2goY2FyZCA9PiAkKCcjY3B1IC5jcHVfX2xpc3QtLWN1c3RvbWZpZWxkcycpLmFwcGVuZChjYXJkLmh0bWwpKVxuXG4gICAgICAgIC8vICBpZiB0aGVyZSBpcyByb29tIGZvciBtb3JlIHByb2R1Y3RzLFxuICAgICAgICAvLyAgZmlsbCB0aGUgcmVzdCBvZiB0aGUgYWRkLW9uIGJ5XG4gICAgICAgIC8vICBhZGRpbmcgcHJvZHVjdHMgZnJvbSB0aGUgQ1NWc1xuICAgICAgICAvLyAgb2YgcHJvZHVjdHMgYWxyZWFkeSBpbiB0aGUgQ1BVXG4gICAgICAgIGxldCByZW1haW5pbmdTbG90cyA9IHRoaXMucHJvZHVjdExpbWl0IC0gY3B1SFRNTC5sZW5ndGg7XG4gICAgICAgIGlmIChyZW1haW5pbmdTbG90cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGF3YWl0IHVwc2VsbFN1aXRlQ1BVLmdldEFkZGl0aW9uYWxQcm9kdWN0cyhjcHVIVE1MLm1hcChwcm9kdWN0ID0+IHByb2R1Y3QucHJvZHVjdF9pZCksIHJlbWFpbmluZ1Nsb3RzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKTtcbiAgICAgICAgICAgIH0gICBjYXRjaChlcnIpICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNQVSBwYXJzZSBlcnJvcjogXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXBwbHlVcHNlbGxIYW5kbGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgYWRkaW5nIGl0ZW1zIHRvIGNhcnRcbiAgICAgKi9cbiAgICBhZGRUb0NhcnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdoYXNFcnJvcicpOyAvLyByZW1vdmUgYW55IGVycm9yIGhpZ2hsaWdodGluZ1xuICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICAgIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zJykgJiYgIXByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgIHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXdpcmVkJylcbiAgICAgICAgICAgICAgICA/ICQoJy5xYWF0eF9fb3B0aW9ucycsIHByb2R1Y3QpLnNsaWRlRG93bigpIC8vIGlmIG9wdGlvbnMgbG9hZGVkLCBqdXN0IHNob3cgdGhlbVxuICAgICAgICAgICAgICAgIDogdGhpcy50b2dnbGVPcHRpb25zKGV2ZW50KTsgLy8gb3B0aW9ucyBhcmVuJ3QgbG9hZGVkLCBsb2FkIHRoZW0gKyBzaG93IHRoZW1cbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7XG4gICAgICAgICAgICAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLnJlbW92ZUNsYXNzKCdpc0JlaW5nQWRkZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjdHVhbGx5IGFkZCB0byBjYXJ0XG4gICAgICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSAkKCcuY3B1X19pdGVtLWZvcm0nLCBwcm9kdWN0KTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChuZXcgRm9ybURhdGEoZm9ybVswXSksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnIgfHwgcmVzcG9uc2UuZGF0YS5lcnJvcjsgLy8gdGFrZSBub3RlIG9mIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgeyAvLyBHdWFyZCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBTdHJpcCB0aGUgSFRNTCBmcm9tIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7IC8vIGhpZ2hsZ2loaHQgZXJyb3IgaXRlbVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2Zmc2V0ID0gcHJvZHVjdC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IChlcnJvck9mZnNldCAtIDIwKSB9LCA3MDApOyAvLyBzY3JvbGwgdXNlciB0byB0aGUgZXJyb3IgcHJvZHVjdFxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzcyBmcm9tIG91ciAncXVlZFwiIGl0ZW1zXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQgdXNlciBvZiBlcnJvclxuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCd3YXNBZGRlZCcpO1xuICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24nLCBwcm9kdWN0KS50ZXh0KCdBZGRlZCB0byBDYXJ0Jyk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdjcHUtcmVmcmVzaC1jYXJ0LWNvbnRlbnQnKTtcbiAgICAgICAgICAgIC8vIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdpc0JlaW5nQWRkZWQnKSkge1xuICAgICAgICAgICAgLy8gICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xuICAgICAgICAgICAgLy8gICAgICgkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpICYmICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykubGVuZ3RoKVxuICAgICAgICAgICAgLy8gICAgICAgICA/ICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykuZXEoMCkuZmluZCgnLnFhYXRjX19hZGR0b2NhcnQnKS50cmlnZ2VyKCdjbGljaycpIC8vIHRyaWdnZXIgc3VibWl0dGluZyBuZXh0IHByb2R1Y3QgdG8gdGhlIGNhcnRcbiAgICAgICAgICAgIC8vICAgICAgICAgOiB3aW5kb3cubG9jYXRpb24gPSAnL2NhcnQucGhwJztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogd2hlbiBtb2RhbCBvcHRpb24gY2hhbmdlZCB3ZSBuZWVkIHRvIHN5bmMgdGhlIFwicmVhbFwiIGZvcm0uIFN5bmMgb3B0aW9ucyBzZWxlY3RlZCBpbiBzY29wZTEgd2l0aCBzY29wZTJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZHVjdElkXG4gICAgICovXG4gICAgc3luY0Zvcm1PcHRpb24oZXZlbnQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBvcHQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQnKTtcbiAgICAgICAgY29uc3QgdHlwZSA9ICQob3B0KS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgbGV0IHRhcmdldElkID0gbnVsbDtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC1jaGVja2JveCc6XG4gICAgICAgICAgICBjYXNlICdzZXQtcmVjdGFuZ2xlJzpcbiAgICAgICAgICAgIGNhc2UgJ3NldC1yYWRpbyc6XG4gICAgICAgICAgICBjYXNlICdwcm9kdWN0LWxpc3QnOlxuICAgICAgICAgICAgY2FzZSAnc3dhdGNoJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCdpbnB1dDpjaGVja2VkJywgb3B0KTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5zaWJsaW5ncygnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElkID0gJChldmVudC50YXJnZXQpLnByb3AoJ2lkJykucmVwbGFjZShgXyR7cHJvZHVjdElkfWAsICcnKS5yZXBsYWNlKCdtb2RhbF8nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0LXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJCgnLmZvcm0tc2VsZWN0Jywgb3B0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC10ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1pbnB1dCcsIG9wdCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC52YWwoKTtcbiAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBvbiB0aGUgXCJyZWFsXCIgZm9ybVxuICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdG8gY2FydCBmcm9tIG1vZGFsXG4gICAgICovXG4gICAgYWRkVG9DYXJ0RnJvbU1vZGFsKG1vZGFsQ29udGVudCwgcHJvZHVjdCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IG1vZGFsQ29udGVudC5wYXJlbnRzKCcuY3B1X19tb2RhbCcpO1xuICAgICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIG1ha2Ugc3VyZSBhbGwgcmVxdWlyZWQgb3B0aW9ucyBoYXZlIGJlZW4gc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuY3B1X19pdGVtLWJ1dHRvbi0tb3B0aW9ucycsIHByb2R1Y3QpLnRyaWdnZXIoJ2NsaWNrJyk7IC8vIHNob3cgb3B0aW9ucyBhZ2FpbiBpZiB0cmllZCBhZGRpbmcgdG8gY2FydCBiZWZvcmUgc2VsZWN0aW5nIGFsbCBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnLCBwcm9kdWN0KS50cmlnZ2VyKCdjbGljaycpOyAvLyB0cmlnZ2VyIGFkZCB0byBjYXJ0IGJ1dHRvbiBjbGljayBvbiBtYWluIHByb2R1Y3RcbiAgICAgICAgc3dhbC5jbG9zZSgpOyAvLyBjbG9zZSBtb2RhbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNob3cgYW5kIGxvYWQgaWYgbmVlZGVkIHRoaXMgcHJvZHVjdCdzIG9wdGlvbnNcbiAgICAgKi9cbiAgICBzaG93T3B0aW9ucyhlKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSAkKGUuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBjb25zdCBuYW1lID0gJCgnLmNwdV9faXRlbS1uYW1lJywgcHJvZHVjdCkudGV4dCgpO1xuICAgICAgICBjb25zdCBvcHRpb25NYXJrdXAgPSAkKCcuY3B1X19pdGVtLW9wdGlvbnMnLCBwcm9kdWN0KS5odG1sKCk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsIHByb2R1Y3QpLnZhbCgpO1xuXG4gICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogYCR7bmFtZX1gLFxuICAgICAgICAgICAgaHRtbDogb3B0aW9uTWFya3VwLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6ICdjcHVfX21vZGFsJyxcbiAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIG9uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBtb2RhIGxIVE1MIGlzIGNsb25lZCBpdCBkb2Vzbid0IGhhdmUgYW55IGhhbmRsZXJzIGFwcGxpZWQgdG8gaXQuIFRoaXMgaGFuZGxlcyB0aGUgXCJmYWtlXCIgY2xvbmVkIG9wdGlvbnMgdG8gdXBkYXRlIHRoZSBcInJlYWxcIiBvcHRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gJChzd2FsLmdldENvbnRlbnQoKSk7XG4gICAgICAgICAgICAgICAgbWFrZU9wdGlvbklkc1VuaXF1ZShtb2RhbENvbnRlbnQsIHByb2R1Y3RJZCwgJ21vZGFsJyk7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNGb3JtT3B0aW9uKGV2ZW50LCBwcm9kdWN0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgZGVmYXVsdCBzZWxlY3RlZCBvcHRpb25zIHVubGVzcyB0aGVyZSdzIGFuIGVycm9yLi4gdGhlbiB3ZSdsbCBnZXQgc3R1Y2sgaW4gYSBsb29wXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgY2hlY2tib3ggb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgY2hlY2tib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiBpbnB1dCBudW1iZXJzIHRvIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25IYW5kbGVyc1twcm9kdWN0SWRdLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3Byb2R1Y3RJZF0uY2hlY2tPcHRpb25zU2VsZWN0ZWQobW9kYWxDb250ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgYWRkaW5nIHRvIGNhcnQgZnJvbSBtb2RhbFxuICAgICAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1tb2RhbGFkZHRvY2FydCcsIG1vZGFsQ29udGVudCkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5hZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFwcGx5IHVwc2VsbCBoYW5kbGVyc1xuICAgICAqL1xuICAgIGFwcGx5VXBzZWxsSGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgJCgnLmNwdV9faXRlbS5oYXNPcHRpb25zJykudG9BcnJheSgpLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgdGhpc0lEID0gJChwcm9kdWN0KS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbCgpO1xuICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3RoaXNJRF0gPSBuZXcgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0KCQocHJvZHVjdCkpfSk7IC8vIGhhbmRsZSBvcHRpb25zIGZvciBhbGwgcHJvZHVjdHMgdy8gb3B0aW9uc1xuXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnKS5vbignY2xpY2snLCBlID0+IHRoaXMuYWRkVG9DYXJ0KGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XG5cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW9wdGlvbnMnKS5vbignY2xpY2snLCBlID0+IHRoaXMuc2hvd09wdGlvbnMoZSkpOyAvLyBtYW5hZ2UgYWRkaW5nIHRvIGNhcnRcblxuICAgICAgICB0aGlzLmRpc3BsYXlJbkNhcm91c2VsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUpBWCB0aGUgdXBzZWxsIFVSTHMgYW5kL29yIElEcyBhbmQgYXBwZW5kIHdoZXJlIG5lZWRlZFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHRhcmdldHMgLSB0YXJnZXRzIHRvIHVwc2VsbFxuICAgICAqL1xuICAgIGxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpIHtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5zbGljZSgwLCB0aGlzLnByb2R1Y3RMaW1pdCB8fCB0YXJnZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBydW5RdWV1ZUluT3JkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7IC8vIHdoZW4gZG9uZSBhbGwgcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gdGFyZ2V0LnRvU3RyaW5nKCkubWF0Y2goL15bMC05XSskLykgPyB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkIDogdXRpbHMuYXBpLmdldFBhZ2U7XG4gICAgICAgICAgICAgICAgcmVxdWVzdE1ldGhvZCh0YXJnZXQsIHsgdGVtcGxhdGU6ICdjdXN0b20vY2FydC1wYWdlLXVwc2VsbC1pdGVtJyB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9IC8vIGlmIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcHUgLmNwdV9fbGlzdC0tY3VzdG9tZmllbGRzJykuYXBwZW5kKHJlc3BvbnNlKTsgLy8gbm8gZXJyb3IsIGFwcGVuZCBtYXJrdXBcbiAgICAgICAgICAgICAgICAgICAgcnVuUXVldWVJbk9yZGVyKCk7IC8vIHJ1biBuZXh0IGl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcnVuUXVldWVJbk9yZGVyKCk7IC8vIHN0YXJ0IHRoZSBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIFNsaWNrIG9wdGlvbnMgdG8gcHJvZHVjdCBkaXNwbGF5IGFmdGVyIGxvYWRpbmcgcHJvZHVjdHMsXG4gICAgICogdGhlbiBmaXJlIFNsaWNrXG4gICAgICovXG4gICAgZGlzcGxheUluQ2Fyb3VzZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG93TW9iaWxlSW5DYXJvdXNlbCkgcmV0dXJuO1xuXG4gICAgICAgIC8vICBBZGQgQ1NTIHRvIHByb2R1Y3QgY2FyZHMgYmVmb3JlIGZpcmluZyBTbGlja1xuICAgICAgICAkKCcuY3B1X19saXN0JykuYWRkQ2xhc3MoJ2NwdV9fbGlzdC1zbGljaycpXG4gICAgICAgICQoJy5jcHVfX2l0ZW0nKS5hZGRDbGFzcygnY3B1X19pdGVtLXNsaWNrJylcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLnNsaWNrKHtcbiAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZG90c1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibW9iaWxlRmlyc3RcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicm93c1wiOiAxLFxuICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcbiAgICAgICAgICAgIFwicmVzcG9uc2l2ZVwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImJyZWFrcG9pbnRcIjogNzY3LFxuICAgICAgICAgICAgICAgICAgICBcInNldHRpbmdzXCI6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICAgICAvLyBmb3JtYXRDYXJvdXNlbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRzXG4gICAgICovXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSAncmVsYXRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKCdyZWxhdGVkJyk7XG4gICAgICAgICAgICBjYXNlICdzaW1pbGFyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3NpbWlsYXInKTtcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSBmaWVsZHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRDdXN0b21GaWVsZFRhcmdldHMoKTtcbiAgICAgICAgICAgIGNhc2UgJ3Vwc2VsbCBzdWl0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZENTVlRhcmdldHMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG4gKiBwdXQgcHJvZHVjdElEIG9uIHRoZSBlbGVtZW50J3MgXCJmb3JcIiBhbmQgXCJpZFwiIGF0dHJzIHNvIG11bHRpcGxlIGNhc2VzIG9mIHNhbWUgb3B0aW9uIHNldCB3b24ndCBjb25mbGljdFxuICovXG5jb25zdCBtYWtlT3B0aW9uSWRzVW5pcXVlID0gKHNjb3BlLCBwcm9kdWN0SWQsIGtleSkgPT4ge1xuICAgICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgc2NvcGUpLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2lkJyk7IC8vIHVwZGF0ZSBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkuYXR0cignaWQnLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIElEIHRvIGluY2x1ZGUgcHJvZHVjdCBJRFxuICAgICAgICAkKGVsKS5uZXh0KCkuYXR0cignZm9yJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBsYWJlbCB0byB0YXJnZXQgdXBkYXRlZCBJRFxuICAgIH0pO1xuICAgIC8vIGFkZCBpbnB1dCBmaWVsZHMgbGFiZWwgY2xhc3MgYW5kIHB1dCBpbiBoZXJlLiBUaGVzZSBvcHRpb25zIHdlIG5lZWQgdG8gc2VsZWN0IHRoZWlyIHNpYmxpbmcgbGFiZWxcbiAgICBjb25zdCBvcHRpb25zV2l0aExhYmVsQXR0cnMgPSBbXG4gICAgICAgICdpbnB1dFt0eXBlPVwidGV4dFwiXScsXG4gICAgICAgICdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyxcbiAgICAgICAgJ2lucHV0W3R5cGU9XCJmaWxlXCJdJyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICd0ZXh0YXJlYScsXG4gICAgXVxuICAgIGNvbnN0IG9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyA9IG9wdGlvbnNXaXRoTGFiZWxBdHRycy5qb2luKCcsJyk7XG4gICAgJChvcHRpb25zV2l0aExhYmVsQXR0cnNTZWxlY3RvcnMsIHNjb3BlKS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpLmZpbmQoJ2xhYmVsJykuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbklkID0gJChlbCkuYXR0cignZm9yJyk7IC8vIHVwZGF0ZSBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkuYXR0cignZm9yJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkubmV4dCgpLmF0dHIoJ2lkJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBsYWJlbCB0byB0YXJnZXQgdXBkYXRlZCBJRFxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlT3B0aW9uSWRzVW5pcXVlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==