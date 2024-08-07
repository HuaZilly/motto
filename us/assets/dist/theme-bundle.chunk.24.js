(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

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

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + stateObj.name + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

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

/***/ }),

/***/ "./assets/js/theme/global/sweet-alert.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/global/sweet-alert.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);


// WeakMap will defined in the global scope if native WeakMap is not supported.
var weakMap = new WeakMap(); // eslint-disable-line no-unused-vars

// Set defaults for sweetalert2 popup boxes
var Swal = sweetalert2__WEBPACK_IMPORTED_MODULE_0___default.a.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: 'button button--primary',
    cancelButton: 'button'
  }
});

// Re-export
/* harmony default export */ __webpack_exports__["default"] = (Swal);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9jYXJ0LXBhZ2UtdXBzZWxsLXByb2R1Y3QtZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9tYWtlLW9wdGlvbnMtdW5pcXVlLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvc3dlZXQtYWxlcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJGNhcnRDb250ZW50IiwiJCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRvdmVybGF5IiwiaGlkZSIsImJpbmRFdmVudHMiLCJkaXNwbGF5TWVtYmVyUHJpY2UiLCJjYXJ0UGFnZVVwc2VsbCIsIkNhcnRQYWdlVXBzZWxsIiwiY2FydFByb2R1Y3RzIiwiZWFjaCIsImlkIiwibGkiLCJtYWluUHJvZHVjdElEIiwiYXR0ciIsImNvbnNvbGUiLCJsb2ciLCJwcm9QcmljZSIsInJlcGxhY2UiLCJkaXNjb3VudGVkUHJpY2UiLCJOdW1iZXIiLCJ0cmltIiwidG9GaXhlZCIsImh0bWwiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIl90aGlzIiwiaXRlbUlkIiwiZGF0YSIsIiRlbCIsIm9sZFF0eSIsInBhcnNlSW50IiwidmFsIiwibWF4UXR5IiwibWluUXR5IiwibWluRXJyb3IiLCJtYXhFcnJvciIsIm5ld1F0eSIsInN3YWwiLCJmaXJlIiwidGV4dCIsImljb24iLCJzaG93IiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiaXRlbVVwZGF0ZSIsImVyciIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJlcnJvcnMiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJfdGhpczIiLCJpbnZhbGlkRW50cnkiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJfdGhpczQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50IiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJzZXR1cEZvY3VzYWJsZUVsZW1lbnRzIiwibW9kYWxUeXBlcyIsIkNBUlRfQ0hBTkdFX1BST0RVQ1QiLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGNoYW5nZWRPcHRpb24iLCIkZm9ybSIsInBhcmVudHMiLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJpdGVtIiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIl90aGlzNSIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImxlbmd0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsInJlcGxhY2VXaXRoIiwicXVhbnRpdHkiLCJ0cmlnZ2VyIiwiYmluZENhcnRFdmVudHMiLCJfdGhpczYiLCJkZWJvdW5jZVRpbWVvdXQiLCJfYmluZCIsIl9kZWJvdW5jZSIsInByZXZlbnREZWZhdWx0Iiwib25RdHlGb2N1cyIsInZhbHVlIiwiY2hhbmdlIiwic3RyaW5nIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIl90aGlzNyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJjb2RlIiwic2hvd0NvdXBvbkVycm9yIiwiYXBwbHlDb2RlIiwiYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cyIsIl90aGlzOCIsIiRjZXJ0Q29udGFpbmVyIiwiJGNlcnRGb3JtIiwiJGNlcnRJbnB1dCIsInRvZ2dsZSIsImdpZnRDZXJ0Q2hlY2siLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiX3RoaXM5IiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJmaW5kIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJfdGhpczEwIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiY29udGV4dCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsImFkZENsYXNzIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwiY29sbGFwc2libGVGYWN0b3J5IiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCJjZXJ0IiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIl90cmFuc2Zvcm0iLCJyZXQiLCJuYW1lIiwicmVwbGFjZW1lbnRBdHRyaWJ1dGVzIiwiJG5ld0VsZW1lbnQiLCIkaGlkZGVuSW5wdXQiLCJwcmV2IiwiYXBwZW5kIiwicmVxdWlyZWQiLCJtYWtlU3RhdGVPcHRpb25hbCIsInR5cGUiLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwiYWRkT3B0aW9ucyIsInN0YXRlc0FycmF5IiwiJHNlbGVjdEVsZW1lbnQiLCJjb250YWluZXIiLCJwdXNoIiwicHJlZml4IiwiX2lzRW1wdHkiLCJfZWFjaCIsInN0YXRlcyIsInN0YXRlT2JqIiwiY2FsbGJhY2siLCJjb3VudHJ5TmFtZSIsImNvdW50cnkiLCJnZXRCeU5hbWUiLCJzaG93QWxlcnRNb2RhbCIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIm5ld0VsZW1lbnQiLCJDYXJ0UGFnZVVwc2VsbFByb2R1Y3QiLCIkc2NvcGUiLCJpbml0UmFkaW9BdHRyaWJ1dGVzIiwiJHByb2R1Y3RJZCIsImtleSIsIiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQiLCJ1cGRhdGVPcHRpb25WaWV3IiwiYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucyIsInRvQXJyYXkiLCJmb3JFYWNoIiwib3B0aW9uIiwicHJvZHVjdE9wdGlvbnNDaGFuZ2VkIiwidGFyZ2V0Iiwib3B0aW9uUm93IiwiRm9ybURhdGEiLCJ1bmRlZmluZWQiLCJzaWJsaW5ncyIsIiRzZWxlY3RlZE9wdGlvbiIsImluZGV4T2YiLCJvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyIsInJlZHVjZSIsImNvdW50Iiwic2VsZWN0IiwiY2hlY2tPcHRpb25zU2VsZWN0ZWQiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVwZGF0ZVZpZXciLCJudW1iZXJSZXF1aXJlZE9wdGlvbnMiLCJudW1iZXJTZWxlY3RlZE9wdGlvbnMiLCJ1cGRhdGVQcmljZVZpZXciLCJwcmljZSIsIndpdGhvdXRfdGF4IiwiZm9ybWF0dGVkIiwiX2lzT2JqZWN0IiwiaW1hZ2VFbCIsImltYWdlIiwiaW1hZ2VTcmMiLCJvcHRpb25NZXNzYWdlIiwic3RvY2tfbWVzc2FnZSIsImJlaGF2aW9yIiwib3V0X29mX3N0b2NrX2JlaGF2aW9yIiwiaW5TdG9ja0lkcyIsImluX3N0b2NrX2F0dHJpYnV0ZXMiLCJvdXRPZlN0b2NrTWVzc2FnZSIsIm91dF9vZl9zdG9ja19tZXNzYWdlIiwiaSIsImF0dHJpYnV0ZSIsIiRhdHRyaWJ1dGUiLCJhdHRySWQiLCJlbmFibGVBdHRyaWJ1dGUiLCJkaXNhYmxlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlVHlwZSIsImRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJzZWxlY3RlZEluZGV4IiwiZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlIiwicmVtb3ZlQXR0ciIsIiRwYXJlbnQiLCJjbG9zZXN0IiwicmFkaW8iLCIkcmFkaW8iLCJjbGljayIsIm1ha2VPcHRpb25JZHNVbmlxdWUiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZSIsInQiLCJyIiwiT2JqZWN0IiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9uZXh0IiwiX3Rocm93IiwiVkVSU0lPTiIsIm1vZGUiLCJlcnJvckRlZmF1bHQiLCJzaG93TW9iaWxlSW5DYXJvdXNlbCIsInByb2R1Y3RMaW1pdCIsImxvYWRpbmciLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImJpbmQiLCJnZXRQYWdlIiwicmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsInVwc2VsbFRhcmdldHMiLCJBcnJheSIsImZyb20iLCJTZXQiLCJyZW1vdmVDYXJ0SXRlbVRhcmdldHMiLCJjYXJ0SXRlbURhdGEiLCJjYXJ0SXRlbSIsInByb2R1Y3R1cmwiLCJvcmlnaW4iLCJwcm9kdWN0SWQiLCJ0b1N0cmluZyIsInVwc2VsbEl0ZW1zIiwidXBzZWxsaXRlbSIsImdldFJhbmRvbUludCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRBdXRvVGFyZ2V0cyIsIml0ZW1JbmRleCIsImVxIiwic3RvcmVkRGF0YSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkVXBzZWxsVGFyZ2V0cyIsIm9wdHMiLCJjb25maWciLCJyZWxhdGVkX3Byb2R1Y3RzIiwibGltaXQiLCJzaW1pbGFyX2J5X3ZpZXdzIiwicmVzIiwidGFyZ2V0cyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJsb2FkQ3VzdG9tRmllbGRUYXJnZXRzIiwic3BsaXQiLCJ1cHNlbGxJdGVtIiwibG9hZENTVlRhcmdldHMiLCJfbG9hZENTVlRhcmdldHMiLCJfY2FsbGVlIiwiY3B1SFRNTHRleHQiLCJjcHVIVE1MIiwicmVtYWluaW5nU2xvdHMiLCJfY2FsbGVlJCIsIl9jb250ZXh0Iiwic2Vzc2lvblN0b3JhZ2UiLCJ1cHNlbGxTdWl0ZUNQVSIsInBhcnNlQXJyYXlGcm9tU3RyaW5nIiwiY2FyZCIsImdldEFkZGl0aW9uYWxQcm9kdWN0cyIsIm1hcCIsInByb2R1Y3RfaWQiLCJ0MCIsImVycm9yIiwiYXBwbHlVcHNlbGxIYW5kbGVycyIsImFkZFRvQ2FydCIsImhhc0NsYXNzIiwic2xpZGVEb3duIiwidG9nZ2xlT3B0aW9ucyIsImZvcm0iLCJpdGVtQWRkIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImVycm9yT2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwic3luY0Zvcm1PcHRpb24iLCJvcHQiLCJ0YXJnZXRJZCIsImFkZFRvQ2FydEZyb21Nb2RhbCIsIm1vZGFsQ29udGVudCIsIm9uQ2xvc2UiLCJjbG9zZSIsInNob3dPcHRpb25zIiwib3B0aW9uTWFya3VwIiwidGl0bGUiLCJjdXN0b21DbGFzcyIsInNob3dDbG9zZUJ1dHRvbiIsInNob3dDb25maXJtQnV0dG9uIiwib25PcGVuIiwib3B0aW9uSGFuZGxlcnMiLCJ0aGlzSUQiLCJkaXNwbGF5SW5DYXJvdXNlbCIsInJ1blF1ZXVlSW5PcmRlciIsInNoaWZ0IiwicmVxdWVzdE1ldGhvZCIsIm1hdGNoIiwicmVhZHkiLCJzbGljayIsInNjb3BlIiwiZWwiLCJvcHRpb25JZCIsIm9wdGlvbnNXaXRoTGFiZWxBdHRycyIsIm9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyIsIndlYWtNYXAiLCJXZWFrTWFwIiwiU3dhbCIsInN3ZWV0QWxlcnQiLCJtaXhpbiIsImJ1dHRvbnNTdHlsaW5nIiwiY29uZmlybUJ1dHRvbiIsImNhbmNlbEJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7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VyxFQUFFO0lBQ1R3QixhQUFhLEVBQUUsd0JBQXdCO0lBQ3ZDQyxZQUFZLEVBQUU7RUFDbEI7QUFDSixDQUFDLENBQUM7O0FBRUY7QUFDZUwsbUVBQUksRSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBnaWZ0Q2VydENoZWNrIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgU2hpcHBpbmdFc3RpbWF0b3IgZnJvbSAnLi9jYXJ0L3NoaXBwaW5nLWVzdGltYXRvcic7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIG1vZGFsVHlwZXMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgc3dhbCBmcm9tICcuL2dsb2JhbC9zd2VldC1hbGVydCc7XG4vLyBjdXN0b21cbmltcG9ydCBDYXJ0UGFnZVVwc2VsbCBmcm9tICcuL2N1c3RvbS9jYXJ0LXBhZ2UtdXBzZWxsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmRpc3BsYXlNZW1iZXJQcmljZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMubmV0IC0gQ2FydCBQYWdlIFVwc2VsbFxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhcnRQYWdlVXBzZWxsID0gbmV3IENhcnRQYWdlVXBzZWxsKCk7XG5cbiAgICB9XG5cbiAgICBkaXNwbGF5TWVtYmVyUHJpY2UoKXtcblxuICAgICAgICB2YXIgY2FydFByb2R1Y3RzID0gJChcIi5jYXJ0X3Byb2R1Y3RfaWRcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coY2FydFByb2R1Y3RzKTtcbiAgICAgICAgY2FydFByb2R1Y3RzLmVhY2goZnVuY3Rpb24oaWQsIGxpKSB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgYW5kIGRpc3BsYXkgZGlzY291bnRlZCBwcmljZVxuICAgICAgICAgICAgdmFyIG1haW5Qcm9kdWN0SUQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXByb2R1Y3QtaWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIj0+Pj4+PlwiK21haW5Qcm9kdWN0SUQpO1xuICAgICAgICAgICAgdmFyIHByb1ByaWNlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1wcm9kdWN0LXByaWNlXCIpLnJlcGxhY2UoXCIkXCIsXCJcIik7XG4gICAgICAgICAgICB2YXIgZGlzY291bnRlZFByaWNlID0gKE51bWJlcihwcm9QcmljZS50cmltKCkucmVwbGFjZShcIiRcIixcIlwiKSkqTnVtYmVyKDAuOTApKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgJChcIi5tZW1iZXJQcm9kdWN0UHJpY2UtXCIrbWFpblByb2R1Y3RJRCkuaHRtbChcIiRcIitkaXNjb3VudGVkUHJpY2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBcblxuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghbmV3UXR5KSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgJHtpbnZhbGlkRW50cnl9IGlzIG5vdCBhIHZhbGlkIGVudHJ5YCxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuXG4gICAgICAgICAgICBtb2RhbC5zZXR1cEZvY3VzYWJsZUVsZW1lbnRzKG1vZGFsVHlwZXMuQ0FSVF9DSEFOR0VfUFJPRFVDVCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJGNoYW5nZWRPcHRpb24ucGFyZW50cygnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9ICQoJ1tuYW1lPVwiaXRlbV9pZFwiXScsICRmb3JtKS5hdHRyKCd2YWx1ZScpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKGl0ZW0sICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCdwLmFsZXJ0Qm94LW1lc3NhZ2UnLCAkbWVzc2FnZUJveCkudGV4dChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XG4gICAgICAgIGNvbnN0ICRjYXJ0SXRlbXNSb3dzID0gJCgnW2RhdGEtaXRlbS1yb3ddJywgdGhpcy4kY2FydENvbnRlbnQpO1xuICAgICAgICBjb25zdCAkY2FydFBhZ2VUaXRsZSA9ICQoJ1tkYXRhLWNhcnQtcGFnZS10aXRsZV0nKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiAnY2FydC90b3RhbHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlID0gXy5iaW5kKF8uZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRSZW1vdmVJdGVtID0gXy5iaW5kKF8uZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuXG4gICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuXG4gICAgICAgICAgICAvLyBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgLy8gICAgIHRleHQ6IHN0cmluZyxcbiAgICAgICAgICAgIC8vICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICAvLyAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIC8vIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmIChyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjYXJ0XG4gICAgICAgICAgICAvLyAgICAgICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZWRpdF0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtRWRpdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgICAgIHRoaXMuY2FydEVkaXRPcHRpb25zKGl0ZW1JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIC8vICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgLy8gICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgc2hvd0NvdXBvbkVycm9yKCRjb2RlSW5wdXQuZGF0YSgnZXJyb3InKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmNvdXBvbi1lcnJvcicpLmhpZGUoKS50ZXh0KFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93Q291cG9uRXJyb3IocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzaG93Q291cG9uRXJyb3IodGV4dCl7XG4gICAgICAgICAgICAgICAgJCgnLmNvdXBvbi1lcnJvcicpLnNob3coKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNlcnRGb3JtID0gJCgnLmNhcnQtZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjZXJ0SW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghZ2lmdENlcnRDaGVjayhjb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY2VydElucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5R2lmdENlcnRpZmljYXRlKGNvZGUsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZ2lmdHdyYXBdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9naWZ0LXdyYXBwaW5nLWZvcm0nLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRm9ybSgpIHtcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRzZWxlY3QudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XG5cbiAgICAgICAgICAgICQoYC5naWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlVmlld3MoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0ICRzaW5nbGVGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1zaW5nbGUnKTtcbiAgICAgICAgICAgIGNvbnN0ICRtdWx0aUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLW11bHRpcGxlJyk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NhbWUnKSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCdbbmFtZT1cImdpZnR3cmFwdHlwZVwiXScpLm9uKCdjbGljaycsIHRvZ2dsZVZpZXdzKTtcblxuICAgICAgICB0b2dnbGVWaWV3cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuYmluZENhcnRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kUHJvbW9Db2RlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKTtcblxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSBuZXcgU2hpcHBpbmdFc3RpbWF0b3IoJCgnW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXScpKTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAqIEludHVpdFNvbHV0aW9ucy5uZXQgLSBDYXJ0IFBhZ2UgVXBzZWxsXG4gICAgICAgICovXG4gICAgICAgIC8vIHJlbG9hZCBjYXJ0IGNvbnRlbnQgd2hlbiBhIENhcnQgUGFnZSBVcHNlbGwgaXRlbSBpcyBhZGRlZCB0byB0aGUgY2FydFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY3B1LXJlZnJlc2gtY2FydC1jb250ZW50JywgKCkgPT4gdGhpcy5yZWZyZXNoQ29udGVudChmYWxzZSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnQ291bnRyeVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnU3RhdGUvUHJvdmluY2VcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgLy8gTm90IGFsbCBjb3VudHJpZXMgcmVxdWlyZSB0aGUgcHJvdmluY2UgdG8gYmUgZmlsbGVkXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKHRvZ2dsZUJ1dHRvbiwgYnV0dG9uU2VsZWN0b3IsICR0b2dnbGVDb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xuICAgICAgICAgICAgJCh0b2dnbGVCdXR0b24pLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIHNlbGVjdG9yVG9BY3RpdmF0ZSk7XG4gICAgICAgICAgICAkKGJ1dHRvblNlbGVjdG9yKS50ZXh0KCQoYCMke3NlbGVjdG9yVG9BY3RpdmF0ZX1gKS50ZXh0KCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQpIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xuICAgIH1cblxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JDb250YWluZXIgPSAkKCcuc2hpcHBpbmctZXN0aW1hdG9yJyk7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtID0gJCgnLmVzdGltYXRvci1mb3JtJyk7XG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjaXR5OiAkKCdbbmFtZT1cInNoaXBwaW5nLWNpdHlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZShldmVudC5jdXJyZW50VGFyZ2V0LCAnLnNoaXBwaW5nLWVzdGltYXRlLXNob3dfX2J0bi1uYW1lJywgJGVzdGltYXRvckNvbnRhaW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbi8qKlxuICogSWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgZnJvbSBiY2FwcCwgYSB0ZXh0IGZpZWxkIHdpbGwgYmUgc2VudC4gVGhpcyB3aWxsIGNyZWF0ZSBhIHNlbGVjdCBlbGVtZW50IHRvIGhvbGQgb3B0aW9ucyBhZnRlciB0aGUgcmVtb3RlIHJlcXVlc3QuXG4gKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBhdHRycyA9IF8udHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gU3RyaW5nIGlzIGluamVjdGVkIGZyb20gbG9jYWxpemVyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxuICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBzd2l0Y2ggdG8gYW4gaW5wdXQgZmllbGQgYW5kIGhpZGUgdGhlIHJlcXVpcmVkIGZpZWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPGlucHV0IC8+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRuZXdFbGVtZW50KTtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzQXJyYXlcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkc2VsZWN0RWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gYWRkT3B0aW9ucyhzdGF0ZXNBcnJheSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcblxuICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtzdGF0ZXNBcnJheS5wcmVmaXh9PC9vcHRpb24+YCk7XG5cbiAgICBpZiAoIV8uaXNFbXB0eSgkc2VsZWN0RWxlbWVudCkpIHtcbiAgICAgICAgXy5lYWNoKHN0YXRlc0FycmF5LnN0YXRlcywgKHN0YXRlT2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5pZH1cIj4ke3N0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0UGFnZVVwc2VsbFByb2R1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0td2lyZWQnKTtcblxuICAgICAgICB0aGlzLmluaXRSYWRpb0F0dHJpYnV0ZXMoKTtcblxuICAgICAgICB0aGlzLiRmb3JtID0gJCgnZm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgdGhpcy4kZm9ybSkudmFsKCk7XG5cbiAgICAgICAgdGhpcy5rZXkgPSAnY3B1JzsgLy8gdW5pcXVlIGluZGVudGlmaWVyIGZvciB0aGlzIGN1c3RvbWl6YXRpb25cblxuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKGBbZGF0YS0ke3RoaXMua2V5fS1vcHRpb24tY2hhbmdlXWAsIHRoaXMuJGZvcm0pOyAvLyBpZSA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiIGRhdGEtY3B1LW9wdGlvbi1jaGFuZ2U+XG5cbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25WaWV3KCk7XG4gICAgICAgIC8vIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgYXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAvLyAgICAgY29uc3QgYXR0cmlidXRlc0NvbnRlbnQgPSByZXNwb25zZS5jb250ZW50IHx8IHt9O1xuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIC8vICAgICAvLyBpZiAoaGFzRGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgLy8gICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAvLyAgICAgdGhpcy51cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIC8vICAgICAvLyB9XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIFwiaXNSZXF1aXJlZFwiIHRvIG9wdGlvbnMgdGhhdCBhcmUgcmVxdWlyZWRcbiAgICAgKi9cbiAgICBhZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zKCkge1xuICAgICAgICAkKCcuZm9ybS1maWVsZCcsIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudCkudG9BcnJheSgpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbikuZmluZCgnc21hbGw6Y29udGFpbnMoXCJSZXF1aXJlZFwiKScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQob3B0aW9uKS5hZGRDbGFzcygnaXNSZXF1aXJlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgcHJvZHVjdCBvcHRpb25zIGNoYW5nZXNcbiAgICAgKi9cbiAgICBwcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNvbnN0IG9wdGlvblJvdyA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpO1xuXG4gICAgICAgIC8vIERvIG5vdCB0cmlnZ2VyIGFuIGFqYXggcmVxdWVzdCBpZiBpdCdzIGEgZmlsZSBvciBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgRm9ybURhdGFcbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3R5cGUnKSA9PT0gJ2ZpbGUnIHx8IHdpbmRvdy5Gb3JtRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdhcyBhbiBvcHRpb24gd2l0aCBhIHZhbHVlIHNlbGVjdGVkP1xuICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24udmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gJGNoYW5nZWRPcHRpb24uYXR0cigndHlwZScpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5zaWJsaW5ncygnaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udmFsKCkubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCd2YWx1ZScsICRjaGFuZ2VkT3B0aW9uLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdGVkT3B0aW9uID0gJGNoYW5nZWRPcHRpb24uZmluZChgb3B0aW9uW3ZhbHVlPVwiJHskY2hhbmdlZE9wdGlvbi52YWwoKX1cIl1gKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRPcHRpb24uYXR0cignc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRPcHRpb24uc2libGluZ3MoJ29wdGlvbicpLmF0dHIoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBkYXRlIHNlbGVjdCwgbWFrZSBzdXJlIGFsbCAzIHNlbGVjdHMgYXJlIGZpbGxlZCBpbiBiZWZvcmUgc2F5aW5nIGl0J3MgZmlsbGVkIGluXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZignbW9udGgnKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ2RheScpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZigneWVhcicpICE9PSAtMVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb3VudCB0aGUgb3RoZXIgZGF0ZSBmaWVsZHMgKGlmIGNoYW5nZWQgbW9udGgsIHNlZSBpZiBkYXkgYW5kIHllYXIgYXJlIGZpbGxlZCBvdXQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyU2VsZWN0ZWREYXRlRmllbGRzID0gJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ3NlbGVjdCcpLnRvQXJyYXkoKS5yZWR1Y2UoKGNvdW50LCBzZWxlY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHNlbGVjdCkudmFsKCkgPT09ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY291bnQgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKTsgLy8gaXQncyBub3QgYSBkYXRlIHNlbGVjdCwganVzdCBtYXJrIHRoZSBvcHRpb24gYXMgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCd0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udmFsKCkubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi50ZXh0KCRjaGFuZ2VkT3B0aW9uLnZhbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVsc2UgcmVtb3ZlIGNsYXNzICh0aGVyZSB3YXMgbm8gdmFsdWUgZm9yIHRoaXMgb3B0aW9uKVxuICAgICAgICAgICAgb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1ha2UgQVBJIGNhbGwgb24gb3B0aW9uIGNoYW5nZSB0byB1cGRhdGUgYXZhaWxhYmlsaXR5XG4gICAgICovXG4gICAgdXBkYXRlT3B0aW9uVmlldygpICB7XG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgLy8gc3RvY2sgc3R1ZmYgKHNob3VsZCB3aXJlIHVwIGltYWdlIGNoYW5nZSBhcyB3ZWxsIGxhdGVyKVxuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLmN1cnJlbnRTdG9jaycsICRzY29wZSkudGV4dChwcm9kdWN0QXR0cmlidXRlc0RhdGEuc3RvY2spO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KCcnKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENoZWNrIHdoZXRoZXIgYWxsIHJlcXVpcmVkIG9wdGlvbnMgYXJlIHNlbGVjdGVkIFxuICAgICAqL1xuICAgIGNoZWNrT3B0aW9uc1NlbGVjdGVkKCkgIHtcbiAgICAgICAgLypcbiAgICAgICAgIyMgc2VlIGlmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZFxuICAgICAgICAqL1xuICAgICAgICBjb25zdCBudW1iZXJSZXF1aXJlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkJykubGVuZ3RoO1xuICAgICAgICBjb25zdCBudW1iZXJTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkLmlzU2VsZWN0ZWQnKS5sZW5ndGg7XG4gICAgICAgIC8vIGNvbnN0ICRhZGRUb0NhcnRCdXR0b24gPSAkZm9ybS5maW5kKCcuY2FyZC1hY3Rpb25zIC5idXR0b24nKTtcbiAgICAgICAgLy8gJGFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVDbGFzcygnYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgIGlmIChudW1iZXJSZXF1aXJlZE9wdGlvbnMgPT09IDAgfHwgbnVtYmVyUmVxdWlyZWRPcHRpb25zIDw9IG51bWJlclNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIGFkZCBjbGFzcyB0byBwcm9kdWN0IGZvciBlYXN5IGFkZGluZyB0byBjYXJ0XG4gICAgICAgICAgICAkKCcuY3B1X19tb2RhbCcpLmFkZENsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpOyAvLyB1cGRhdGUgdGV4dCBmb3IgdXNlciBhcyB3ZWxsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gcmVtb3ZlIGNsYXNzIHNpbmNlIG5vdCBhbGwgb3B0aW9ucyBmaWxsZWQgaW5cbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykucmVtb3ZlQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZVByaWNlVmlldyhwcmljZSkge1xuICAgICAgICBpZiAocHJpY2Uud2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgICQoYFtkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXhdYCwgdGhpcy4kc2NvcGUpLmh0bWwocHJpY2Uud2l0aG91dF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmlldyBvZiBwcmljZSwgbWVzc2FnZXMsIFNLVSBhbmQgc3RvY2sgb3B0aW9ucyB3aGVuIGEgcHJvZHVjdCBvcHRpb24gY2hhbmdlc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlVmlldyhkYXRhKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBwcmljZVxuICAgICAgICAvLyBjb25zdCB2aWV3TW9kZWwgPSB0aGlzLmdldFZpZXdNb2RlbCh0aGlzLiRzY29wZSk7XG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEucHJpY2UpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByaWNlVmlldyhkYXRhLnByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgaW1hZ2VcbiAgICAgICAgY29uc3QgaW1hZ2VFbCA9ICQoYC5jcHVfX2l0ZW0taW1nYCwgdGhpcy4kc2NvcGUpO1xuICAgICAgICBpZiAoXy5pc09iamVjdChkYXRhLmltYWdlKSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBkYXRhLmltYWdlLmRhdGEucmVwbGFjZSgnezpzaXplfScsICczMDB4MzAwJyk7XG4gICAgICAgICAgICBpbWFnZUVsLmF0dHIoJ3NyYycsIGltYWdlU3JjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VFbC5kYXRhKCdzcmMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIG1lc3NhZ2UgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGNvbnN0IG9wdGlvbk1lc3NhZ2UgPSBkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2U7XG4gICAgICAgIGlmIChvcHRpb25NZXNzYWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG9wdGlvbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtkYXRhLm91dF9vZl9zdG9ja19tZXNzYWdlfSlgO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciAhPT0gJ2hpZGVfb3B0aW9uJyAmJiBiZWhhdmlvciAhPT0gJ2xhYmVsX29wdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXScsIHRoaXMuJHNjb3BlLmFkZCgnLmNwdV9fbW9kYWwnKSkuZWFjaCgoaSwgYXR0cmlidXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYXR0cmlidXRlID0gJChhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZScpLCAxMCk7XG5cbiAgICAgICAgICAgIGlmIChpblN0b2NrSWRzLmluZGV4T2YoYXR0cklkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3VuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgJHNlbGVjdCA9ICRhdHRyaWJ1dGUucGFyZW50KCk7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgYXR0cmlidXRlIGlzIHRoZSBzZWxlY3RlZCBvcHRpb24gaW4gYSBzZWxlY3QgZHJvcGRvd24sIHNlbGVjdCB0aGUgZmlyc3Qgb3B0aW9uIChNRVJDLTYzOSlcbiAgICAgICAgICAgIGlmICgkYXR0cmlidXRlLnBhcmVudCgpLnZhbCgpID09PSAkYXR0cmlidXRlLmF0dHIoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0WzBdLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSArIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd1bmF2YWlsYWJsZScpXG4gICAgICAgICAgICAgICAgLnByZXYoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkge1xuICAgICAgICBjb25zdCAkcGFyZW50ID0gJGF0dHJpYnV0ZS5jbG9zZXN0KCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKTtcbiAgICAgICAgcmV0dXJuICRwYXJlbnQgPyAkcGFyZW50LmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJykgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IHJhZGlvIGJ1dHRvbnMgdG8gZ2V0IGRlc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBpbml0UmFkaW9BdHRyaWJ1dGVzKCkge1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIHJhZGlvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkcmFkaW8gPSAkKHJhZGlvKTtcblxuICAgICAgICAgICAgLy8gT25seSBiaW5kIHRvIGNsaWNrIG9uY2VcbiAgICAgICAgICAgIGlmICgkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkcmFkaW8uY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHJhZGlvLmRhdGEoJ3N0YXRlJykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLmRhdGEoJ3N0YXRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uY2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScsICRyYWRpby5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50c1xuICAgICAqL1xuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIG1ha2VPcHRpb25JZHNVbmlxdWUodGhpcy4kc2NvcGUsIHRoaXMuJHByb2R1Y3RJZCwgdGhpcy5rZXkpOyAvLyBtYWtlIG9wdGlvbnMgdW5pcXVlIHNvIHRoZXJlIGFlciBubyBjb25mbGljdHMgd2hlbiBzZWxlY3Rpbmcgb3B0aW9uc1xuXG4gICAgICAgIHRoaXMuYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucygpOyAvLyBhZGQgXCJpc1JlcXVpcmVkXCIgdG8gcmVxdWlyZWQgb3B0aW9uc1xuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBvcHRpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50LCBldmVudC50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LnNob3coKTtcblxuICAgICAgICAvLyB1cGRhdGUgb3B0aW9ucyBzZWxlY3RlZCBvbiBsb2FkXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgcmFkaW8gb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgcmFkaW8gYnV0dG9ucyB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCd0ZXh0YXJlYScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiB0ZXh0YXJlYSB0cCBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgfVxufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgc3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5pbXBvcnQgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0IGZyb20gJy4vY2FydC1wYWdlLXVwc2VsbC1wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IG1ha2VPcHRpb25JZHNVbmlxdWUgZnJvbSAnLi9tYWtlLW9wdGlvbnMtdW5pcXVlJztcbmltcG9ydCBmb3JtYXRDYXJvdXNlbCBmcm9tICcuLi9jb21tb24vY2Fyb3VzZWwuanMnO1xuaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnO1xuXG4vLyAgQXByIDIwMTk6IHVwZGF0ZWQgdmVyc2lvbiBpbmNsdWRlcyBJVFMgVXBzZWxsIFN1aXRlXG5jb25zdCBWRVJTSU9OID0gJzIuMCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludHVpdFNvbHV0aW9ucy5uZXQgLSBDYXJ0IFBhZ2UgVXBzZWxsJywgVkVSU0lPTik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9wdGlvbnMgPSAncmVsYXRlZCcsICdzaW1pbGFyJywgJ2N1c3RvbSBmaWVsZHMnXG4gICAgICAgICAqIGVycm9yRGVmYXVsdCA9IGJhY2t1cCBtb2RlOyBvbmx5IG5lY2Vzc2FyeSB3aXRoIFVwc2VsbCBTdWl0ZVxuICAgICAgICAgKiAtLSByZWxhdGVkID0gYXV0b21hdGljYWxseSBsb2FkcyByZWxhdGVkIHByb2R1Y3RzIGZyb20gYSByYW5kb20gaXRlbSBpbiB0aGUgY2FydFxuICAgICAgICAgKiAtLSBzaW1pbGFyID0gYXV0b21hdGljYWxseSBsb2FkcyBzaW1pbGFyIGJ5IHZpZXcgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XG4gICAgICAgICAqIC0tIGN1c3RvbSBmaWVsZHMgPSB3aWxsIGxvYWQgdGhlIHByb2R1Y3RzIHNwZWNpZmllZCBieSB0aGUgY2FydCBpdGVtJ3MgY3VzdG9tIGZpZWxkc1xuICAgICAgICAgKiAtLSB1cHNlbGwgc3VpdGUgPSB3aWxsIGxvYWQgcHJvZHVjdHMgc3BlY2lmaWVkIGJ5IFVwc2VsbCBTdWl0ZSBDU1ZzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vZGUgPSAnY3VzdG9tIGZpZWxkcyc7XG4gICAgICAgIHRoaXMuZXJyb3JEZWZhdWx0ID0gJ3NpbWlsYXInO1xuICAgICAgICB0aGlzLnNob3dNb2JpbGVJbkNhcm91c2VsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGltaXQgPSAzO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9ICQoJyNjcHUgLmxvYWRpbmdPdmVybGF5Jyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCA9IHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQuYmluZCh1dGlscy5hcGkucHJvZHVjdCk7IC8vIHJlcXVpcmVkIHRvIGtlZXAgc2NvcGUgb2YgdXRpbHMgdG8gdGhlIHV0aWxzXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlID0gdXRpbHMuYXBpLmdldFBhZ2UuYmluZCh1dGlscy5hcGkpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxuICAgICAqXG4gICAgICogcHVsbGVkIGZyb20gc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkyMjk2NDUvcmVtb3ZlLWR1cGxpY2F0ZS12YWx1ZXMtZnJvbS1qcy1hcnJheVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgZHVwbGljYXRlIGl0ZW1zIGZyb21cbiAgICAgKi9cbiAgICByZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHVwc2VsbFRhcmdldHMpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh1cHNlbGxUYXJnZXRzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IGNhcnQgaXRlbXMgVVJMcyBhbmQgUHJvZHVjdCBJZHMgc28gd2UgZG9uJ3QgdHJ5IHRvIHVwc2VsbCBhbiBpdGVtIHRoYXQncyBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICogQHBhcmFtIHthcnJheX0gdXBzZWxsVGFyZ2V0cyAtIGFycmF5IG9mIGl0ZW1zIHdlIHdhbnQgdG8gc3RyaXAgb3V0IGFueSBjYXJ0IGl0ZW0gbWF0Y2hlcyBmcm9tXG4gICAgICovXG4gICAgcmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHVwc2VsbFRhcmdldHMpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCBkYXRhIGZyb20gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgY29uc3QgY2FydEl0ZW1EYXRhID0gW107XG4gICAgICAgICQoJ1tkYXRhLXVwc2VsbF0nKS50b0FycmF5KCkuZm9yRWFjaChjYXJ0SXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0dXJsID0gJChjYXJ0SXRlbSkuZGF0YSgncHJvZHVjdC11cmwnKS5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sICcnKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtaWQnKS50b1N0cmluZygpIHx8ICcnO1xuICAgICAgICAgICAgY2FydEl0ZW1EYXRhLnB1c2gocHJvZHVjdHVybCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG9ubHkga2VlcCB1cHNlbGwgaXRlbXMgdGhhdCBhcmVuJ3Qgd2l0aGluIG91ciBjYXJ0SXRlbURhdGEgYXJyYXlcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdXBzZWxsVGFyZ2V0cy5yZWR1Y2UoKHVwc2VsbEl0ZW1zLCB1cHNlbGxpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FydEl0ZW1EYXRhLmluZGV4T2YodXBzZWxsaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBzZWxsSXRlbXMucHVzaCh1cHNlbGxpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cHNlbGxJdGVtcztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICAvLyByZXR1cm4gcmVzdWx0XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHJhbmRvbSBpbnQgZ2l2ZW4gYSBtYXhcbiAgICAgKi9cbiAgICBnZXRSYW5kb21JbnQobWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGF1dG9tYXRpY2FsbHkgbG9hZCBwcm9kdWN0cyBmcm9tIHRoZSBjYXJ0IGl0ZW0ncyBlaXRoZXIgcmVsYXRlZCBwcm9kdWN0cyBvciBzaW1pbGFyIGJ5IHZpZXcgaXRlbXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFwicmVsYXRlZFwiIG9yIFwic2ltaWxhclwiXG4gICAgICovXG4gICAgbG9hZEF1dG9UYXJnZXRzKHR5cGUpIHtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5nZXRSYW5kb21JbnQoJCgnLmNhcnQtaXRlbScpLmxlbmd0aCk7IC8vIGdldCByYW5kb20gaXRlbSBpbmRleCAocGljayByYW5kb20gaXRlbSlcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJCgnLmNhcnQtaXRlbScpLmVxKGl0ZW1JbmRleCB8fCAwKS5kYXRhKCdwcm9kdWN0LWlkJyk7IC8vIGdldCBwcm9kdWN0IGlkIG9mIHRoYXQgcmFuZG9tIGl0ZW1cbiAgICAgICAgaWYgKGl0ZW1JZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNlZSBpZiB3ZSBhbHJlYWR5IGFqYXgnZCBmb3IgdGhlc2UgdXBzZWxsIGl0ZW1zXG4gICAgICAgIGxldCBzdG9yZWREYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgY3B1X19pdGVtcyR7aXRlbUlkfWApKSB8fCBbXTtcbiAgICAgICAgaWYgKHN0b3JlZERhdGEubGVuZ3RoKSB7IC8vIGlmIGFscmVhZHkgYWpheGVkIGFuZCBzdG9yZWQgdXBzZWxsIGl0ZW1zXG4gICAgICAgICAgICBzdG9yZWREYXRhID0gdGhpcy5yZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHN0b3JlZERhdGEpOyAvLyByZW1vdmUgZHVwbGljYXRlIHVwc2VsbCB0YXJnZXRzXG4gICAgICAgICAgICBzdG9yZWREYXRhID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgICAgIHRoaXMubG9hZFVwc2VsbFRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIGxvYWQgdGhvc2Ugc3RvcmVkIHVwc2VsbCBpdGVtc1xuICAgICAgICB9IGVsc2UgeyAvLyBvdGhlcndpc2VcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2FydC1wYWdlLXVwc2VsbC10YXJnZXRzLS0ke3R5cGV9YCxcbiAgICAgICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZF9wcm9kdWN0czogeyBsaW1pdDogNzAsIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1pbGFyX2J5X3ZpZXdzOiB7IGxpbWl0OiA3MCwgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChpdGVtSWQsIG9wdHMsIChlcnIsIHJlcykgPT4geyAvLyBhamF4IGZvciB0aGUgZmlyc3QgaXRlbSdzIHVwc2VsbCBpdGVtcyAoc3VnZ2VzdGVkIHByb2R1Y3RzKVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJyNjcHUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gSlNPTi5wYXJzZShyZXMpIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgY3B1X19pdGVtcyR7aXRlbUlkfWAsIEpTT04uc3RyaW5naWZ5KHRhcmdldHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFycmF5IG9mIHVwc2VsbCBwcm9kdWN0IFVSTHMgYW5kL29yIElEc1xuICAgICAqL1xuICAgIGxvYWRDdXN0b21GaWVsZFRhcmdldHMoKSB7XG4gICAgICAgIGxldCB0YXJnZXRzID0gW107XG4gICAgICAgICQoJ1tkYXRhLXVwc2VsbF0nKS50b0FycmF5KCkuZm9yRWFjaChjYXJ0SXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cHNlbGxJdGVtcyA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Vwc2VsbCcpO1xuICAgICAgICAgICAgaWYgKHVwc2VsbEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHVwc2VsbEl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHVwc2VsbEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwc2VsbEl0ZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHVwc2VsbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIG1vZGUgaXMgc2V0IHRvIGN1c3RvbSBmaWVsZHMgYnV0IG5vIGl0ZW1zIGhhdmUgY3VzdG9tIGZpZWxkcyBhcHBsaWVkLCBkZWZhdWx0IHRvIHVzaW5nIHJlbGF0ZWQgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygncmVsYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRDU1ZUYXJnZXRzICgpICAgIHtcbiAgICAgICAgLy8gIGdldCB0aGUgcHJldmlvdXNseSBBSkFYZWQgcHJvZHVjdHMgZnJvbSBzZXNzaW9uU3RvcmFnZVxuICAgICAgICBjb25zdCBjcHVIVE1MdGV4dCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjcHVDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgY3B1SFRNTCA9IHVwc2VsbFN1aXRlQ1BVLnBhcnNlQXJyYXlGcm9tU3RyaW5nKGNwdUhUTUx0ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIC8vICBpZiBub3RoaW5nIGhhcyBiZWVuIGRvd25sb2FkZWQsXG4gICAgICAgIC8vICByZXZlcnQgdG8gYmFja3VwIG1vZGVcbiAgICAgICAgY29uc29sZS5sb2coY3B1SFRNTC5sZW5ndGgsIFwiY3B1SFRNTCBMZW5ndGhcIik7XG4gICAgICAgIGlmICghY3B1SFRNTC5sZW5ndGgpICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHModGhpcy5lcnJvckRlZmF1bHQpO1xuXG4gICAgICAgIC8vICBkaXNwbGF5IHRoZSBwcmV2aW91bHkgZG93bmxvYWRlZCBwcm9kdWN0c1xuICAgICAgICBjcHVIVE1MLmZvckVhY2goY2FyZCA9PiAkKCcjY3B1IC5jcHVfX2xpc3QtLWN1c3RvbWZpZWxkcycpLmFwcGVuZChjYXJkLmh0bWwpKVxuXG4gICAgICAgIC8vICBpZiB0aGVyZSBpcyByb29tIGZvciBtb3JlIHByb2R1Y3RzLFxuICAgICAgICAvLyAgZmlsbCB0aGUgcmVzdCBvZiB0aGUgYWRkLW9uIGJ5XG4gICAgICAgIC8vICBhZGRpbmcgcHJvZHVjdHMgZnJvbSB0aGUgQ1NWc1xuICAgICAgICAvLyAgb2YgcHJvZHVjdHMgYWxyZWFkeSBpbiB0aGUgQ1BVXG4gICAgICAgIGxldCByZW1haW5pbmdTbG90cyA9IHRoaXMucHJvZHVjdExpbWl0IC0gY3B1SFRNTC5sZW5ndGg7XG4gICAgICAgIGlmIChyZW1haW5pbmdTbG90cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGF3YWl0IHVwc2VsbFN1aXRlQ1BVLmdldEFkZGl0aW9uYWxQcm9kdWN0cyhjcHVIVE1MLm1hcChwcm9kdWN0ID0+IHByb2R1Y3QucHJvZHVjdF9pZCksIHJlbWFpbmluZ1Nsb3RzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKTtcbiAgICAgICAgICAgIH0gICBjYXRjaChlcnIpICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNQVSBwYXJzZSBlcnJvcjogXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXBwbHlVcHNlbGxIYW5kbGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgYWRkaW5nIGl0ZW1zIHRvIGNhcnRcbiAgICAgKi9cbiAgICBhZGRUb0NhcnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdoYXNFcnJvcicpOyAvLyByZW1vdmUgYW55IGVycm9yIGhpZ2hsaWdodGluZ1xuICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICAgIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zJykgJiYgIXByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgIHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXdpcmVkJylcbiAgICAgICAgICAgICAgICA/ICQoJy5xYWF0eF9fb3B0aW9ucycsIHByb2R1Y3QpLnNsaWRlRG93bigpIC8vIGlmIG9wdGlvbnMgbG9hZGVkLCBqdXN0IHNob3cgdGhlbVxuICAgICAgICAgICAgICAgIDogdGhpcy50b2dnbGVPcHRpb25zKGV2ZW50KTsgLy8gb3B0aW9ucyBhcmVuJ3QgbG9hZGVkLCBsb2FkIHRoZW0gKyBzaG93IHRoZW1cbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7XG4gICAgICAgICAgICAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLnJlbW92ZUNsYXNzKCdpc0JlaW5nQWRkZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjdHVhbGx5IGFkZCB0byBjYXJ0XG4gICAgICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSAkKCcuY3B1X19pdGVtLWZvcm0nLCBwcm9kdWN0KTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChuZXcgRm9ybURhdGEoZm9ybVswXSksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnIgfHwgcmVzcG9uc2UuZGF0YS5lcnJvcjsgLy8gdGFrZSBub3RlIG9mIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgeyAvLyBHdWFyZCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBTdHJpcCB0aGUgSFRNTCBmcm9tIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7IC8vIGhpZ2hsZ2loaHQgZXJyb3IgaXRlbVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2Zmc2V0ID0gcHJvZHVjdC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IChlcnJvck9mZnNldCAtIDIwKSB9LCA3MDApOyAvLyBzY3JvbGwgdXNlciB0byB0aGUgZXJyb3IgcHJvZHVjdFxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzcyBmcm9tIG91ciAncXVlZFwiIGl0ZW1zXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQgdXNlciBvZiBlcnJvclxuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCd3YXNBZGRlZCcpO1xuICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24nLCBwcm9kdWN0KS50ZXh0KCdBZGRlZCB0byBDYXJ0Jyk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdjcHUtcmVmcmVzaC1jYXJ0LWNvbnRlbnQnKTtcbiAgICAgICAgICAgIC8vIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdpc0JlaW5nQWRkZWQnKSkge1xuICAgICAgICAgICAgLy8gICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xuICAgICAgICAgICAgLy8gICAgICgkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpICYmICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykubGVuZ3RoKVxuICAgICAgICAgICAgLy8gICAgICAgICA/ICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykuZXEoMCkuZmluZCgnLnFhYXRjX19hZGR0b2NhcnQnKS50cmlnZ2VyKCdjbGljaycpIC8vIHRyaWdnZXIgc3VibWl0dGluZyBuZXh0IHByb2R1Y3QgdG8gdGhlIGNhcnRcbiAgICAgICAgICAgIC8vICAgICAgICAgOiB3aW5kb3cubG9jYXRpb24gPSAnL2NhcnQucGhwJztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogd2hlbiBtb2RhbCBvcHRpb24gY2hhbmdlZCB3ZSBuZWVkIHRvIHN5bmMgdGhlIFwicmVhbFwiIGZvcm0uIFN5bmMgb3B0aW9ucyBzZWxlY3RlZCBpbiBzY29wZTEgd2l0aCBzY29wZTJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZHVjdElkXG4gICAgICovXG4gICAgc3luY0Zvcm1PcHRpb24oZXZlbnQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBvcHQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQnKTtcbiAgICAgICAgY29uc3QgdHlwZSA9ICQob3B0KS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgbGV0IHRhcmdldElkID0gbnVsbDtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC1jaGVja2JveCc6XG4gICAgICAgICAgICBjYXNlICdzZXQtcmVjdGFuZ2xlJzpcbiAgICAgICAgICAgIGNhc2UgJ3NldC1yYWRpbyc6XG4gICAgICAgICAgICBjYXNlICdwcm9kdWN0LWxpc3QnOlxuICAgICAgICAgICAgY2FzZSAnc3dhdGNoJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCdpbnB1dDpjaGVja2VkJywgb3B0KTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5zaWJsaW5ncygnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElkID0gJChldmVudC50YXJnZXQpLnByb3AoJ2lkJykucmVwbGFjZShgXyR7cHJvZHVjdElkfWAsICcnKS5yZXBsYWNlKCdtb2RhbF8nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0LXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJCgnLmZvcm0tc2VsZWN0Jywgb3B0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC10ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1pbnB1dCcsIG9wdCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC52YWwoKTtcbiAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBvbiB0aGUgXCJyZWFsXCIgZm9ybVxuICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdG8gY2FydCBmcm9tIG1vZGFsXG4gICAgICovXG4gICAgYWRkVG9DYXJ0RnJvbU1vZGFsKG1vZGFsQ29udGVudCwgcHJvZHVjdCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IG1vZGFsQ29udGVudC5wYXJlbnRzKCcuY3B1X19tb2RhbCcpO1xuICAgICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIG1ha2Ugc3VyZSBhbGwgcmVxdWlyZWQgb3B0aW9ucyBoYXZlIGJlZW4gc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuY3B1X19pdGVtLWJ1dHRvbi0tb3B0aW9ucycsIHByb2R1Y3QpLnRyaWdnZXIoJ2NsaWNrJyk7IC8vIHNob3cgb3B0aW9ucyBhZ2FpbiBpZiB0cmllZCBhZGRpbmcgdG8gY2FydCBiZWZvcmUgc2VsZWN0aW5nIGFsbCBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnLCBwcm9kdWN0KS50cmlnZ2VyKCdjbGljaycpOyAvLyB0cmlnZ2VyIGFkZCB0byBjYXJ0IGJ1dHRvbiBjbGljayBvbiBtYWluIHByb2R1Y3RcbiAgICAgICAgc3dhbC5jbG9zZSgpOyAvLyBjbG9zZSBtb2RhbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNob3cgYW5kIGxvYWQgaWYgbmVlZGVkIHRoaXMgcHJvZHVjdCdzIG9wdGlvbnNcbiAgICAgKi9cbiAgICBzaG93T3B0aW9ucyhlKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSAkKGUuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBjb25zdCBuYW1lID0gJCgnLmNwdV9faXRlbS1uYW1lJywgcHJvZHVjdCkudGV4dCgpO1xuICAgICAgICBjb25zdCBvcHRpb25NYXJrdXAgPSAkKCcuY3B1X19pdGVtLW9wdGlvbnMnLCBwcm9kdWN0KS5odG1sKCk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsIHByb2R1Y3QpLnZhbCgpO1xuXG4gICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogYCR7bmFtZX1gLFxuICAgICAgICAgICAgaHRtbDogb3B0aW9uTWFya3VwLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6ICdjcHVfX21vZGFsJyxcbiAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIG9uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBtb2RhIGxIVE1MIGlzIGNsb25lZCBpdCBkb2Vzbid0IGhhdmUgYW55IGhhbmRsZXJzIGFwcGxpZWQgdG8gaXQuIFRoaXMgaGFuZGxlcyB0aGUgXCJmYWtlXCIgY2xvbmVkIG9wdGlvbnMgdG8gdXBkYXRlIHRoZSBcInJlYWxcIiBvcHRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gJChzd2FsLmdldENvbnRlbnQoKSk7XG4gICAgICAgICAgICAgICAgbWFrZU9wdGlvbklkc1VuaXF1ZShtb2RhbENvbnRlbnQsIHByb2R1Y3RJZCwgJ21vZGFsJyk7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNGb3JtT3B0aW9uKGV2ZW50LCBwcm9kdWN0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgZGVmYXVsdCBzZWxlY3RlZCBvcHRpb25zIHVubGVzcyB0aGVyZSdzIGFuIGVycm9yLi4gdGhlbiB3ZSdsbCBnZXQgc3R1Y2sgaW4gYSBsb29wXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgY2hlY2tib3ggb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgY2hlY2tib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiBpbnB1dCBudW1iZXJzIHRvIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25IYW5kbGVyc1twcm9kdWN0SWRdLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3Byb2R1Y3RJZF0uY2hlY2tPcHRpb25zU2VsZWN0ZWQobW9kYWxDb250ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgYWRkaW5nIHRvIGNhcnQgZnJvbSBtb2RhbFxuICAgICAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1tb2RhbGFkZHRvY2FydCcsIG1vZGFsQ29udGVudCkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5hZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFwcGx5IHVwc2VsbCBoYW5kbGVyc1xuICAgICAqL1xuICAgIGFwcGx5VXBzZWxsSGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgJCgnLmNwdV9faXRlbS5oYXNPcHRpb25zJykudG9BcnJheSgpLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgdGhpc0lEID0gJChwcm9kdWN0KS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbCgpO1xuICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3RoaXNJRF0gPSBuZXcgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0KCQocHJvZHVjdCkpfSk7IC8vIGhhbmRsZSBvcHRpb25zIGZvciBhbGwgcHJvZHVjdHMgdy8gb3B0aW9uc1xuXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnKS5vbignY2xpY2snLCBlID0+IHRoaXMuYWRkVG9DYXJ0KGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XG5cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW9wdGlvbnMnKS5vbignY2xpY2snLCBlID0+IHRoaXMuc2hvd09wdGlvbnMoZSkpOyAvLyBtYW5hZ2UgYWRkaW5nIHRvIGNhcnRcblxuICAgICAgICB0aGlzLmRpc3BsYXlJbkNhcm91c2VsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUpBWCB0aGUgdXBzZWxsIFVSTHMgYW5kL29yIElEcyBhbmQgYXBwZW5kIHdoZXJlIG5lZWRlZFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHRhcmdldHMgLSB0YXJnZXRzIHRvIHVwc2VsbFxuICAgICAqL1xuICAgIGxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpIHtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5zbGljZSgwLCB0aGlzLnByb2R1Y3RMaW1pdCB8fCB0YXJnZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBydW5RdWV1ZUluT3JkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7IC8vIHdoZW4gZG9uZSBhbGwgcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gdGFyZ2V0LnRvU3RyaW5nKCkubWF0Y2goL15bMC05XSskLykgPyB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkIDogdXRpbHMuYXBpLmdldFBhZ2U7XG4gICAgICAgICAgICAgICAgcmVxdWVzdE1ldGhvZCh0YXJnZXQsIHsgdGVtcGxhdGU6ICdjdXN0b20vY2FydC1wYWdlLXVwc2VsbC1pdGVtJyB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9IC8vIGlmIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcHUgLmNwdV9fbGlzdC0tY3VzdG9tZmllbGRzJykuYXBwZW5kKHJlc3BvbnNlKTsgLy8gbm8gZXJyb3IsIGFwcGVuZCBtYXJrdXBcbiAgICAgICAgICAgICAgICAgICAgcnVuUXVldWVJbk9yZGVyKCk7IC8vIHJ1biBuZXh0IGl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcnVuUXVldWVJbk9yZGVyKCk7IC8vIHN0YXJ0IHRoZSBsb29wXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIFNsaWNrIG9wdGlvbnMgdG8gcHJvZHVjdCBkaXNwbGF5IGFmdGVyIGxvYWRpbmcgcHJvZHVjdHMsXG4gICAgICogdGhlbiBmaXJlIFNsaWNrXG4gICAgICovXG4gICAgZGlzcGxheUluQ2Fyb3VzZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG93TW9iaWxlSW5DYXJvdXNlbCkgcmV0dXJuO1xuXG4gICAgICAgIC8vICBBZGQgQ1NTIHRvIHByb2R1Y3QgY2FyZHMgYmVmb3JlIGZpcmluZyBTbGlja1xuICAgICAgICAkKCcuY3B1X19saXN0JykuYWRkQ2xhc3MoJ2NwdV9fbGlzdC1zbGljaycpXG4gICAgICAgICQoJy5jcHVfX2l0ZW0nKS5hZGRDbGFzcygnY3B1X19pdGVtLXNsaWNrJylcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLnNsaWNrKHtcbiAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZG90c1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibW9iaWxlRmlyc3RcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicm93c1wiOiAxLFxuICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcbiAgICAgICAgICAgIFwicmVzcG9uc2l2ZVwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImJyZWFrcG9pbnRcIjogNzY3LFxuICAgICAgICAgICAgICAgICAgICBcInNldHRpbmdzXCI6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICAgICAvLyBmb3JtYXRDYXJvdXNlbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRzXG4gICAgICovXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSAncmVsYXRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKCdyZWxhdGVkJyk7XG4gICAgICAgICAgICBjYXNlICdzaW1pbGFyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3NpbWlsYXInKTtcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSBmaWVsZHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRDdXN0b21GaWVsZFRhcmdldHMoKTtcbiAgICAgICAgICAgIGNhc2UgJ3Vwc2VsbCBzdWl0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZENTVlRhcmdldHMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG4gKiBwdXQgcHJvZHVjdElEIG9uIHRoZSBlbGVtZW50J3MgXCJmb3JcIiBhbmQgXCJpZFwiIGF0dHJzIHNvIG11bHRpcGxlIGNhc2VzIG9mIHNhbWUgb3B0aW9uIHNldCB3b24ndCBjb25mbGljdFxuICovXG5jb25zdCBtYWtlT3B0aW9uSWRzVW5pcXVlID0gKHNjb3BlLCBwcm9kdWN0SWQsIGtleSkgPT4ge1xuICAgICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgc2NvcGUpLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2lkJyk7IC8vIHVwZGF0ZSBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkuYXR0cignaWQnLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIElEIHRvIGluY2x1ZGUgcHJvZHVjdCBJRFxuICAgICAgICAkKGVsKS5uZXh0KCkuYXR0cignZm9yJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBsYWJlbCB0byB0YXJnZXQgdXBkYXRlZCBJRFxuICAgIH0pO1xuICAgIC8vIGFkZCBpbnB1dCBmaWVsZHMgbGFiZWwgY2xhc3MgYW5kIHB1dCBpbiBoZXJlLiBUaGVzZSBvcHRpb25zIHdlIG5lZWQgdG8gc2VsZWN0IHRoZWlyIHNpYmxpbmcgbGFiZWxcbiAgICBjb25zdCBvcHRpb25zV2l0aExhYmVsQXR0cnMgPSBbXG4gICAgICAgICdpbnB1dFt0eXBlPVwidGV4dFwiXScsXG4gICAgICAgICdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyxcbiAgICAgICAgJ2lucHV0W3R5cGU9XCJmaWxlXCJdJyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICd0ZXh0YXJlYScsXG4gICAgXVxuICAgIGNvbnN0IG9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyA9IG9wdGlvbnNXaXRoTGFiZWxBdHRycy5qb2luKCcsJyk7XG4gICAgJChvcHRpb25zV2l0aExhYmVsQXR0cnNTZWxlY3RvcnMsIHNjb3BlKS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpLmZpbmQoJ2xhYmVsJykuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbklkID0gJChlbCkuYXR0cignZm9yJyk7IC8vIHVwZGF0ZSBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkuYXR0cignZm9yJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkubmV4dCgpLmF0dHIoJ2lkJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBsYWJlbCB0byB0YXJnZXQgdXBkYXRlZCBJRFxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlT3B0aW9uSWRzVW5pcXVlO1xuIiwiaW1wb3J0IHN3ZWV0QWxlcnQgZnJvbSAnc3dlZXRhbGVydDInO1xuXG4vLyBXZWFrTWFwIHdpbGwgZGVmaW5lZCBpbiB0aGUgZ2xvYmFsIHNjb3BlIGlmIG5hdGl2ZSBXZWFrTWFwIGlzIG5vdCBzdXBwb3J0ZWQuXG5jb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4vLyBTZXQgZGVmYXVsdHMgZm9yIHN3ZWV0YWxlcnQyIHBvcHVwIGJveGVzXG5jb25zdCBTd2FsID0gc3dlZXRBbGVydC5taXhpbih7XG4gICAgYnV0dG9uc1N0eWxpbmc6IGZhbHNlLFxuICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgIGNvbmZpcm1CdXR0b246ICdidXR0b24gYnV0dG9uLS1wcmltYXJ5JyxcbiAgICAgICAgY2FuY2VsQnV0dG9uOiAnYnV0dG9uJyxcbiAgICB9LFxufSk7XG5cbi8vIFJlLWV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgU3dhbDtcbiJdLCJzb3VyY2VSb290IjoiIn0=