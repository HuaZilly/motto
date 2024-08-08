(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./assets/js/theme/common/aria/constants.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/aria/constants.js ***!
  \**************************************************/
/*! exports provided: ariaKeyCodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ariaKeyCodes", function() { return ariaKeyCodes; });
var ariaKeyCodes = {
  RETURN: 13,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

/***/ }),

/***/ "./assets/js/theme/common/aria/index.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/common/aria/index.js ***!
  \**********************************************/
/*! exports provided: initRadioOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _radioOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radioOptions */ "./assets/js/theme/common/aria/radioOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initRadioOptions", function() { return _radioOptions__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./assets/js/theme/common/aria/radioOptions.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/aria/radioOptions.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/js/theme/common/aria/constants.js");

var setCheckedRadioItem = function setCheckedRadioItem(itemCollection, itemIdx) {
  itemCollection.each(function (idx, item) {
    var $item = $(item);
    if (idx !== itemIdx) {
      $item.attr('aria-checked', false).prop('checked', false);
      return;
    }
    $item.attr('aria-checked', true).prop('checked', true).focus();
  });
};
var calculateTargetItemPosition = function calculateTargetItemPosition(lastItemIdx, currentIdx) {
  switch (true) {
    case currentIdx > lastItemIdx:
      return 0;
    case currentIdx < 0:
      return lastItemIdx;
    default:
      return currentIdx;
  }
};
var handleItemKeyDown = function handleItemKeyDown(itemCollection) {
  return function (e) {
    var keyCode = e.keyCode;
    var itemIdx = itemCollection.index(e.currentTarget);
    var lastCollectionItemIdx = itemCollection.length - 1;
    if (Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"]).includes(keyCode)) {
      e.preventDefault();
      e.stopPropagation();
    }
    switch (keyCode) {
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].RETURN:
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].SPACE:
        {
          setCheckedRadioItem(itemCollection, itemIdx);
          break;
        }
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].LEFT:
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].UP:
        {
          var prevItemIdx = calculateTargetItemPosition(lastCollectionItemIdx, itemIdx - 1);
          itemCollection.get(prevItemIdx).focus();
          break;
        }
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].RIGHT:
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ariaKeyCodes"].DOWN:
        {
          var nextItemIdx = calculateTargetItemPosition(lastCollectionItemIdx, itemIdx + 1);
          itemCollection.get(nextItemIdx).focus();
          break;
        }
      default:
        break;
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (function ($container, itemSelector) {
  var $itemCollection = $container.find(itemSelector);
  $container.on('keydown', itemSelector, handleItemKeyDown($itemCollection));
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/product-details.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/product-details.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductDetails; });
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNumber */ "./node_modules/lodash/isNumber.js");
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isPlainObject */ "./node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.reveal */ "./node_modules/foundation-sites/js/foundation/foundation.reveal.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _product_image_gallery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../product/image-gallery */ "./assets/js/theme/product/image-gallery.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/api */ "./assets/js/theme/common/utils/api.js");
/* harmony import */ var _aria__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./aria */ "./assets/js/theme/common/aria/index.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* harmony import */ var chocolat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! chocolat */ "./node_modules/chocolat/dist/js/chocolat.esm.js");














var optionsTypesMap = {
  INPUT_FILE: "input-file",
  INPUT_TEXT: "input-text",
  INPUT_NUMBER: "input-number",
  INPUT_CHECKBOX: "input-checkbox",
  TEXTAREA: "textarea",
  DATE: "date",
  SET_SELECT: "set-select",
  SET_RECTANGLE: "set-rectangle",
  SET_RADIO: "set-radio",
  SWATCH: "swatch",
  PRODUCT_LIST: "product-list"
};
var ProductDetails = /*#__PURE__*/function () {
  function ProductDetails($scope, context, productAttributesData) {
    var _this = this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    this.$overlay = $("[data-cart-item-add] .loadingOverlay");
    this.$scope = $scope;
    this.context = context;
    this.imageGallery = new _product_image_gallery__WEBPACK_IMPORTED_MODULE_7__["default"]($("[data-image-gallery]", this.$scope));
    this.imageGallery.init();
    this.listenQuantityChange();
    this.initRadioAttributes();
    _wishlist__WEBPACK_IMPORTED_MODULE_9__["default"].load(this.context);
    this.getTabRequests();
    var $form = $("form[data-cart-item-add]", $scope);
    var $productOptionsElement = $("[data-product-option-change]", $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find("[data-default]").length;
    $("[data-product-attribute]").each(function (__, value) {
      var type = value.getAttribute("data-product-attribute");
      _this._makeProductVariantAccessible(value, type);
    });
    $productOptionsElement.on("change", function (event) {
      _this.productOptionsChanged(event);
      _this.setProductVariant();
    });
    $form.on("submit", function (event) {
      _this.addProductToCart(event, $form[0]);
    });

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var $productId = $('[name="product_id"]', $form).val();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange($productId, $form.serialize(), "products/bulk-discount-rates", function (err, response) {
        var attributesData = response.data || {};
        var attributesContent = response.content || {};
        _this.updateProductAttributes(attributesData);
        if (hasDefaultOptions) {
          _this.updateView(attributesData, attributesContent);
        } else {
          _this.updateDefaultAttributesForOOS(attributesData);
        }
      });
    } else {
      this.updateProductAttributes(productAttributesData);
    }

    // $productOptionsElement.show();

    this.previewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_8__["default"])("#previewModal")[0];

    /**
     * Lightbox Popup Image Gallery
     */
    $(".productView-thumbnail.productView-thumbnail--custom").on("click", function () {
      $(".productView-img-container--custom.loadImageHere").attr("data-index", $(this).attr("data-index"));
    });
    var lightboximages = [];
    $(".productView-thumbnails .productView-thumbnail").each(function () {
      if (!$(this).hasClass("playLoadedVideo")) {
        var imageobj = {
          src: $(this).find(".productView-thumbnail-link").attr("data-image-gallery-zoom-image-url")
        };
        lightboximages.push(imageobj);
      }
    });
    $(".productView-img-container--custom.loadImageHere").on("click touchstart", function (e) {
      e.preventDefault();
      var index = $(this).attr("data-index");
      var _Chocolat = Object(chocolat__WEBPACK_IMPORTED_MODULE_13__["default"])(lightboximages),
        api = _Chocolat.api;
      api.open(index);
    });

    //Floating widget
    $("#addToCart-form-floating").on("submit", function (e) {
      e.preventDefault();
      $("#form-action-addToCart").trigger("click");
    });
    $("[data-product-option-change-floating]").on("change", function () {
      var newval = $(this).val();
      $("input[value='" + newval + "']").prop("checked", true);

      // if($(this).find("option:selected").hasClass('disabled')) {
      //   $('#addToCart-floating').hide();
      //   $('.klaviyo-bis-trigger').show();
      // } else {
      //   $('#addToCart-floating').show();
      //   $('.klaviyo-bis-trigger').hide();
      // }
    });
    $("input[type=radio][name^=attribute]").on("change", function () {
      var newval = $(this).val();
      console.log("newval", newval);
      $("select[name=options-floating]").val(newval);

      // var id = $(this).attr('id');
      // if($("label[for="+id+"]").hasClass('unavailable')){
      //   $('#addToCart-floating').hide();
      //   $('.klaviyo-bis-trigger').show();
      // } else {
      //   $('#addToCart-floating').show();
      //   $('.klaviyo-bis-trigger').hide();
      // }
    });
    var elementIsVisibleInViewport = function elementIsVisibleInViewport(el, partiallyVisible) {
      if (partiallyVisible === void 0) {
        partiallyVisible = false;
      }
      var _el$getBoundingClient = el.getBoundingClientRect(),
        top = _el$getBoundingClient.top,
        left = _el$getBoundingClient.left,
        bottom = _el$getBoundingClient.bottom,
        right = _el$getBoundingClient.right;
      var _window = window,
        innerHeight = _window.innerHeight,
        innerWidth = _window.innerWidth;
      var headerHeight = document.querySelector(".header").offsetHeight;
      var newTop = top - headerHeight;
      var newBottom = bottom - headerHeight;
      // console.log("top, newTop, bottom, newBottom, innerHeight");
      // console.log(top, newTop, bottom, newBottom, innerHeight);
      return newTop > 0 && newTop < innerHeight || newBottom > 0 && newBottom < innerHeight;
      return newTop >= 0 && bottom <= innerHeight;
    };
    window.addEventListener("scroll", function (event) {
      var isvisible = elementIsVisibleInViewport(document.getElementById("form-action-addToCart"));
      if (isvisible) {
        $(".floating-addtocart").removeClass("show");
      } else {
        $(".floating-addtocart").addClass("show");
      }
    });
    // EOF - Floating widget
  }
  var _proto = ProductDetails.prototype;
  _proto._makeProductVariantAccessible = function _makeProductVariantAccessible(variantDomNode, variantType) {
    switch (variantType) {
      case optionsTypesMap.SET_RADIO:
      case optionsTypesMap.SWATCH:
        {
          Object(_aria__WEBPACK_IMPORTED_MODULE_11__["initRadioOptions"])($(variantDomNode), "[type=radio]");
          break;
        }
      default:
        break;
    }
  };
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($("[data-product-attribute]"), function (index, value) {
      var optionLabel = value.children[0] ? value.children[0].innerText : "";
      var optionTitle = optionLabel.split(":")[0].trim();
      var required = optionLabel.toLowerCase().includes("required");
      var type = value.getAttribute("data-product-attribute");
      if ((type === "input-file" || type === "input-text" || type === "input-number") && value.querySelector("input").value === "" && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === "textarea" && value.querySelector("textarea").value === "" && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === "date") {
        var isSatisfied = Array.from(value.querySelectorAll("select")).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll("select")).map(function (x) {
            return x.value;
          }).join("-");
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === "set-select") {
        var select = value.querySelector("select");
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === "set-rectangle" || type === "set-radio" || type === "swatch" || type === "input-checkbox" || type === "product-list") {
        var checked = value.querySelector(":checked");
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_12__["convertIntoArray"])(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === "set-rectangle" || type === "set-radio" || type === "product-list") {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_12__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === "swatch") {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_12__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === "input-checkbox") {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === "input-checkbox") {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(", ") : "unsatisfied";
    var view = $(".productView");
    if (productVariant) {
      productVariant = productVariant === "unsatisfied" ? "" : productVariant;
      if (view.attr("data-event-type")) {
        view.attr("data-product-variant", productVariant);
      } else {
        var productName = view.find(".productView-title")[0].innerText.replace(/"/g, "\\$&");
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr("data-product-variant", productVariant);
      }
    }
  }

  /**
   * Since $productView can be dynamically inserted using render_with,
   * We have to retrieve the respective elements
   *
   * @param $scope
   */;
  _proto.getViewModel = function getViewModel($scope) {
    return {
      $priceWithTax: $("[data-product-price-with-tax]", $scope),
      $priceWithoutTax: $("[data-product-price-without-tax]", $scope),
      rrpWithTax: {
        $div: $(".rrp-price--withTax", $scope),
        $span: $("[data-product-rrp-with-tax]", $scope)
      },
      rrpWithoutTax: {
        $div: $(".rrp-price--withoutTax", $scope),
        $span: $("[data-product-rrp-price-without-tax]", $scope)
      },
      nonSaleWithTax: {
        $div: $(".non-sale-price--withTax", $scope),
        $span: $("[data-product-non-sale-price-with-tax]", $scope)
      },
      nonSaleWithoutTax: {
        $div: $(".non-sale-price--withoutTax", $scope),
        $span: $("[data-product-non-sale-price-without-tax]", $scope)
      },
      priceSaved: {
        $div: $(".price-section--saving", $scope),
        $span: $("[data-product-price-saved]", $scope)
      },
      priceNowLabel: {
        $span: $(".price-now-label", $scope)
      },
      priceLabel: {
        $span: $(".price-label", $scope)
      },
      $weight: $(".productView-info [data-product-weight]", $scope),
      $increments: $(".form-field--increments :input", $scope),
      $addToCart: $("#form-action-addToCart", $scope),
      $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
      stock: {
        $container: $(".form-field--stock", $scope),
        $input: $("[data-product-stock]", $scope)
      },
      sku: {
        $label: $("dt.sku-label", $scope),
        $value: $("[data-product-sku]", $scope)
      },
      upc: {
        $label: $("dt.upc-label", $scope),
        $value: $("[data-product-upc]", $scope)
      },
      quantity: {
        $text: $(".incrementTotal", $scope),
        $input: $("[name=qty\\[\\]]", $scope)
      },
      $bulkPricing: $(".productView-info-bulkPricing", $scope)
    };
  }

  /**
   * Checks if the current window is being run inside an iframe
   * @returns {boolean}
   */;
  _proto.isRunningInIframe = function isRunningInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  /**
   *
   * Handle product options changes
   *
   */;
  _proto.productOptionsChanged = function productOptionsChanged(event) {
    var _this2 = this;
    var $changedOption = $(event.target);
    var $form = $changedOption.parents("form");
    var productId = $('[name="product_id"]', $form).val();

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr("type") === "file" || window.FormData === undefined) {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange(productId, $form.serialize(), "products/bulk-discount-rates", function (err, response) {
      var productAttributesData = response.data || {};
      var productAttributesContent = response.content || {};
      _this2.updateProductAttributes(productAttributesData);
      _this2.updateView(productAttributesData, productAttributesContent);
    });
  };
  _proto.showProductImage = function showProductImage(image) {
    if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default()(image)) {
      var zoomImageUrl = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].tools.imageSrcset.getSrcset(image.data, {
        "1x": this.context.zoomSize
      }
      /*
                  Should match zoom size used for data-zoom-image in
                  components/products/product-view.html
                   Note that this will only be used as a fallback image for browsers that do not support srcset
                   Also note that getSrcset returns a simple src string when exactly one size is provided
              */);
      var mainImageUrl = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].tools.imageSrcset.getSrcset(image.data, {
        "1x": this.context.productSize
      }
      /*
                  Should match fallback image size used for the main product image in
                  components/products/product-view.html
                   Note that this will only be used as a fallback image for browsers that do not support srcset
                   Also note that getSrcset returns a simple src string when exactly one size is provided
              */);
      var mainImageSrcset = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].tools.imageSrcset.getSrcset(image.data);
      this.imageGallery.setAlternateImage({
        mainImageUrl: mainImageUrl,
        zoomImageUrl: zoomImageUrl,
        mainImageSrcset: mainImageSrcset
      });
    } else {
      this.imageGallery.restoreImage();
    }
  }

  /**
   *
   * Handle action when the shopper clicks on + / - for quantity
   *
   */;
  _proto.listenQuantityChange = function listenQuantityChange() {
    var _this3 = this;
    this.$scope.on("click", "[data-quantity-change] button", function (event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      var viewModel = _this3.getViewModel(_this3.$scope);
      var $input = viewModel.quantity.$input;
      var quantityMin = parseInt($input.data("quantityMin"), 10);
      var quantityMax = parseInt($input.data("quantityMax"), 10);
      var qty = parseInt($input.val(), 10);

      // If action is incrementing
      if ($target.data("action") === "inc") {
        // If quantity max option is set
        if (quantityMax > 0) {
          // Check quantity does not exceed max
          if (qty + 1 <= quantityMax) {
            qty++;
          }
        } else {
          qty++;
        }
      } else if (qty > 1) {
        // If quantity min option is set
        if (quantityMin > 0) {
          // Check quantity does not fall below min
          if (qty - 1 >= quantityMin) {
            qty--;
          }
        } else {
          qty--;
        }
      }

      // update hidden input
      viewModel.quantity.$input.val(qty);
      // update text
      viewModel.quantity.$text.text(qty);
    });

    // Prevent triggering quantity change when pressing enter
    this.$scope.on("keypress", ".form-input--incrementTotal", function (event) {
      // If the browser supports event.which, then use event.which, otherwise use event.keyCode
      var x = event.which || event.keyCode;
      if (x === 13) {
        // Prevent default
        event.preventDefault();
      }
    });
  }

  /**
   *
   * Add a product to cart
   *
   */;
  _proto.addProductToCart = function addProductToCart(event, form) {
    var _this4 = this;
    var $addToCartBtn = $("#form-action-addToCart", $(event.target));
    var originalBtnVal = $addToCartBtn.val();
    var waitMessage = $addToCartBtn.data("waitMessage");

    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) {
      return;
    }

    // Prevent default
    event.preventDefault();
    $addToCartBtn.val(waitMessage).prop("disabled", true);
    this.$overlay.show();

    // Add item to cart
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemAdd(Object(_utils_api__WEBPACK_IMPORTED_MODULE_10__["normalizeFormData"])(new FormData(form)), function (err, response) {
      var errorMessage = err || response.data.error;
      $addToCartBtn.val(originalBtnVal).prop("disabled", false);
      _this4.$overlay.hide();

      // Guard statement
      if (errorMessage) {
        // Strip the HTML from the error message
        var tmp = document.createElement("DIV");
        tmp.innerHTML = errorMessage;
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_8__["showAlertModal"])(tmp.textContent || tmp.innerText);
      }

      // Open preview modal and update content
      if (_this4.previewModal) {
        _this4.previewModal.open();
        _this4.updateCartContent(_this4.previewModal, response.data.cart_item.id, function () {
          return _this4.previewModal.setupFocusableElements(_global_modal__WEBPACK_IMPORTED_MODULE_8__["modalTypes"].PRODUCT_DETAILS);
        });
      } else {
        _this4.$overlay.show();
        // if no modal, redirect to the cart page....
        // this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);

        _this4.getCartContent(response.data.cart_item.id, function (err, response) {
          if (err) {
            return;
          }
          var customContent = document.createElement('div'),
            body = document.querySelector('body');
          customContent.innerHTML = response;
          customContent.setAttribute('style', 'none');
          customContent.setAttribute('class', 'custom-popup');
          body.append(customContent);
          console.log('The popup content has been created');
          var customPopup = document.querySelector('.custom-popup');

          // Update cart counter
          var cartQuantity = document.querySelector(".custom-popup [data-cart-quantity]"),
            cartCounter = $(".navUser-action .cart-count"),
            quantity = cartQuantity.getAttribute("data-cart-quantity") || 0;
          cartCounter.addClass("cart-count--positive");
          $('body').trigger("cart-quantity-update", quantity);
          customPopup.remove();
          console.log('The popup content has been removed');
        });
      }
    });
  }

  /**
   * Get cart contents
   *
   * @param {String} cartItemId
   * @param {Function} onComplete
   */;
  _proto.getCartContent = function getCartContent(cartItemId, onComplete) {
    var options = {
      template: "cart/preview",
      params: {
        suggest: cartItemId
      },
      config: {
        cart: {
          suggestions: {
            limit: 4
          }
        }
      }
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getContent(options, onComplete);
  }

  /**
   * Redirect to url
   *
   * @param {String} url
   */;
  _proto.redirectTo = function redirectTo(url) {
    if (this.isRunningInIframe() && !window.iframeSdk) {
      window.top.location = url;
    } else {
      window.location = url;
    }
  }

  /**
   * Update cart content
   *
   * @param {Modal} modal
   * @param {String} cartItemId
   * @param {Function} onComplete
   */;
  _proto.updateCartContent = function updateCartContent(modal, cartItemId, onComplete) {
    this.getCartContent(cartItemId, function (err, response) {
      if (err) {
        return;
      }
      modal.updateContent(response);

      // Update cart counter
      var $body = $("body");
      var $cartQuantity = $("[data-cart-quantity]", modal.$content);
      var $cartCounter = $(".navUser-action .cart-count");
      var quantity = $cartQuantity.data("cartQuantity") || 0;
      $cartCounter.addClass("cart-count--positive");
      $body.trigger("cart-quantity-update", quantity);
      if (onComplete) {
        onComplete(response);
      }
    });
  }

  /**
   * Show an message box if a message is passed
   * Hide the box if the message is empty
   * @param  {String} message
   */;
  _proto.showMessageBox = function showMessageBox(message) {
    var $messageBox = $(".productAttributes-message");
    if (message) {
      $(".alertBox-message", $messageBox).text(message);
      $messageBox.show();
    } else {
      $messageBox.hide();
    }
  }

  /**
   * Hide the pricing elements that will show up only when the price exists in API
   * @param viewModel
   */;
  _proto.clearPricingNotFound = function clearPricingNotFound(viewModel) {
    viewModel.rrpWithTax.$div.hide();
    viewModel.rrpWithoutTax.$div.hide();
    viewModel.nonSaleWithTax.$div.hide();
    viewModel.nonSaleWithoutTax.$div.hide();
    viewModel.priceSaved.$div.hide();
    viewModel.priceNowLabel.$span.hide();
    viewModel.priceLabel.$span.hide();
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updatePriceView = function updatePriceView(viewModel, price) {
    this.clearPricingNotFound(viewModel);
    if (price.with_tax) {
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithTax.html(price.with_tax.formatted);
    }
    if (price.without_tax) {
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithoutTax.html(price.without_tax.formatted);
    }
    if (price.rrp_with_tax) {
      viewModel.rrpWithTax.$div.show();
      viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
    }
    if (price.rrp_without_tax) {
      viewModel.rrpWithoutTax.$div.show();
      viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
    }
    if (price.saved) {
      viewModel.priceSaved.$div.show();
      viewModel.priceSaved.$span.html(price.saved.formatted);
    }
    if (price.non_sale_price_with_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
    }
    if (price.non_sale_price_without_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithoutTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data, content) {
    if (content === void 0) {
      content = null;
    }
    var viewModel = this.getViewModel(this.$scope);
    this.showMessageBox(data.stock_message || data.purchasing_message);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_1___default()(data.price)) {
      this.updatePriceView(viewModel, data.price);
    }
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_1___default()(data.weight)) {
      viewModel.$weight.html(data.weight.formatted);
    }

    // Set variation_id if it exists for adding to wishlist
    if (data.variantId) {
      viewModel.$wishlistVariation.val(data.variantId);
    }

    // If SKU is available
    if (data.sku) {
      viewModel.sku.$value.text(data.sku);
      viewModel.sku.$label.show();
    } else {
      viewModel.sku.$label.hide();
      viewModel.sku.$value.text("");
    }

    // If UPC is available
    if (data.upc) {
      viewModel.upc.$value.text(data.upc);
      viewModel.upc.$label.show();
    } else {
      viewModel.upc.$label.hide();
      viewModel.upc.$value.text("");
    }

    // if stock view is on (CP settings)
    if (viewModel.stock.$container.length && lodash_isNumber__WEBPACK_IMPORTED_MODULE_0___default()(data.stock)) {
      // if the stock container is hidden, show
      viewModel.stock.$container.removeClass("u-hiddenVisually");
      viewModel.stock.$input.text(data.stock);
    } else {
      viewModel.stock.$container.addClass("u-hiddenVisually");
      viewModel.stock.$input.text(data.stock);
    }
    this.updateDefaultAttributesForOOS(data);

    // If Bulk Pricing rendered HTML is available
    if (data.bulk_discount_rates && content) {
      viewModel.$bulkPricing.html(content);
    } else if (typeof data.bulk_discount_rates !== "undefined") {
      viewModel.$bulkPricing.html("");
    }
  };
  _proto.updateDefaultAttributesForOOS = function updateDefaultAttributesForOOS(data) {
    var viewModel = this.getViewModel(this.$scope);
    if (!data.purchasable || !data.instock) {
      viewModel.$addToCart.prop("disabled", true);
      viewModel.$increments.prop("disabled", true);
    } else {
      viewModel.$addToCart.prop("disabled", false);
      viewModel.$increments.prop("disabled", false);
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this5 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    this.showProductImage(data.image);
    if (behavior !== "hide_option" && behavior !== "label_option") {
      return;
    }
    $("[data-product-attribute-value]", this.$scope).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data("productAttributeValue"), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this5.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this5.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === "set-select") {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === "hide_option") {
      $attribute.hide();
    } else {
      $attribute.addClass("unavailable");
    }
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === "hide_option") {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($select.val() === $attribute.attr("value")) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr("disabled", "disabled");
      $attribute.html($attribute.html().replace(outOfStockMessage, "") + outOfStockMessage);
    }
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === "set-select") {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === "hide_option") {
      $attribute.show();
    } else {
      $attribute.removeClass("unavailable");
    }
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === "hide_option") {
      $attribute.toggleOption(true);
    } else {
      $attribute.prop("disabled", false);
      $attribute.html($attribute.html().replace(outOfStockMessage, ""));
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest("[data-product-attribute]");
    return $parent ? $parent.data("productAttribute") : null;
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this6 = this;
    $('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = $(radio);

      // Only bind to click once
      if ($radio.attr("data-state") !== undefined) {
        $radio.on("click", function () {
          if ($radio.data("state") === true) {
            $radio.prop("checked", false);
            $radio.data("state", false);
            $radio.trigger("change");
          } else {
            $radio.data("state", true);
          }
          _this6.initRadioAttributes();
        });
      }
      $radio.attr("data-state", $radio.prop("checked"));
    });
  }

  /**
   * Check for fragment identifier in URL requesting a specific tab
   */;
  _proto.getTabRequests = function getTabRequests() {
    if (window.location.hash && window.location.hash.indexOf("#tab-") === 0) {
      var $activeTab = $(".tabs").has("[href='" + window.location.hash + "']");
      var $tabContent = $("" + window.location.hash);
      if ($activeTab.length > 0) {
        $activeTab.find(".tab").removeClass("is-active").has("[href='" + window.location.hash + "']").addClass("is-active");
        $tabContent.addClass("is-active").siblings().removeClass("is-active");
      }
    }
  };
  return ProductDetails;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/api.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/common/utils/api.js ***!
  \*********************************************/
/*! exports provided: filterEmptyValuesFromForm, filterEmptyFilesFromForm, normalizeFormData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterEmptyValuesFromForm", function() { return filterEmptyValuesFromForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterEmptyFilesFromForm", function() { return filterEmptyFilesFromForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeFormData", function() { return normalizeFormData; });
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * This function removes any empty string values from the formData
 * @param formData: FormData object
 * @returns FormData object
*/
var filterEmptyValuesFromForm = function filterEmptyValuesFromForm(formData) {
  var res = new FormData();
  try {
    for (var _iterator = _createForOfIteratorHelperLoose(formData), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        key = _step$value[0],
        val = _step$value[1];
      if (val !== '') {
        res.append(key, val);
      }
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
  return res;
};

/**
 * https://stackoverflow.com/questions/49672992/ajax-request-fails-when-sending-formdata-including-empty-file-input-in-safari
 * Safari browser with jquery 3.3.1 has an issue uploading empty file parameters. This function removes any empty files from the form params
 * @param formData: FormData object
 * @returns FormData object
 */
var filterEmptyFilesFromForm = function filterEmptyFilesFromForm(formData) {
  var res = new FormData();
  try {
    for (var _iterator2 = _createForOfIteratorHelperLoose(formData), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
        key = _step2$value[0],
        val = _step2$value[1];
      if (!(val instanceof File) || val.name || val.size) {
        res.append(key, val);
      }
    }
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
  return res;
};

/**
 * This function removes empty string values and empty files from the formData
 * @param formData: FormData object
 * @returns FormData object
 */
var normalizeFormData = function normalizeFormData(formData) {
  return filterEmptyValuesFromForm(filterEmptyFilesFromForm(formData));
};

/***/ }),

/***/ "./assets/js/theme/common/utils/ie-helpers.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/common/utils/ie-helpers.js ***!
  \****************************************************/
/*! exports provided: isBrowserIE, convertIntoArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowserIE", function() { return isBrowserIE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertIntoArray", function() { return convertIntoArray; });
var isBrowserIE = navigator.userAgent.includes('Trident');
var convertIntoArray = function convertIntoArray(collection) {
  return Array.prototype.slice.call(collection);
};

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

/***/ "./assets/js/theme/product/image-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/image-gallery.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageGallery; });
/* harmony import */ var easyzoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! easyzoom */ "./node_modules/easyzoom/dist/easyzoom.js");
/* harmony import */ var easyzoom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(easyzoom__WEBPACK_IMPORTED_MODULE_0__);

var ImageGallery = /*#__PURE__*/function () {
  function ImageGallery($gallery) {
    this.$mainImage = $gallery.find('[data-image-gallery-main]');
    this.$mainImageNested = $gallery.find('[data-main-image]');
    this.$selectableImages = $gallery.find('[data-image-gallery-item]');
    this.currentImage = {};
  }
  var _proto = ImageGallery.prototype;
  _proto.init = function init() {
    this.bindEvents();
    this.setImageZoom();
  };
  _proto.setMainImage = function setMainImage(imgObj) {
    this.currentImage = Object.assign({}, imgObj);
    this.setActiveThumb();
    this.swapMainImage();
  };
  _proto.setAlternateImage = function setAlternateImage(imgObj) {
    if (!this.savedImage) {
      this.savedImage = {
        mainImageUrl: this.$mainImage.find('img').attr('src'),
        zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
        mainImageSrcset: this.$mainImage.find('img').attr('srcset'),
        $selectedThumb: this.currentImage.$selectedThumb
      };
    }
    this.setMainImage(imgObj);
  };
  _proto.restoreImage = function restoreImage() {
    if (this.savedImage) {
      this.setMainImage(this.savedImage);
      delete this.savedImage;
    }
  };
  _proto.selectNewImage = function selectNewImage(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var imgObj = {
      mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
      zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
      mainImageSrcset: $target.attr('data-image-gallery-new-image-srcset'),
      $selectedThumb: $target,
      mainImageAlt: $target.children().first().attr('alt')
    };
    this.setMainImage(imgObj);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$selectableImages.removeClass('is-active');
    if (this.currentImage.$selectedThumb) {
      this.currentImage.$selectedThumb.addClass('is-active');
    }
  };
  _proto.swapMainImage = function swapMainImage() {
    var isBrowserIE = navigator.userAgent.includes('Trident');
    this.easyzoom.data('easyZoom').swap(this.currentImage.mainImageUrl, this.currentImage.zoomImageUrl, this.currentImage.mainImageSrcset);
    this.$mainImage.attr({
      'data-zoom-image': this.currentImage.zoomImageUrl
    });
    this.$mainImageNested.attr({
      alt: this.currentImage.mainImageAlt,
      title: this.currentImage.mainImageAlt
    });
    if (isBrowserIE) {
      var fallbackStylesIE = {
        'background-image': "url(" + this.currentImage.mainImageUrl + "&ampimbypass=on)",
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-origin': 'content-box',
        'background-size': 'contain'
      };
      this.$mainImageNested.css(fallbackStylesIE);
    }
  };
  _proto.checkImage = function checkImage() {
    var containerHeight = $('.productView-image').height();
    var containerWidth = $('.productView-image').width();
    var height = this.easyzoom.data('easyZoom').$zoom.context.height;
    var width = this.easyzoom.data('easyZoom').$zoom.context.width;
    if (height < containerHeight || width < containerWidth) {
      this.easyzoom.data('easyZoom').hide();
    }
  };
  _proto.setImageZoom = function setImageZoom() {
    var _this = this;
    this.easyzoom = this.$mainImage.easyZoom({
      onShow: function onShow() {
        return _this.checkImage();
      },
      errorNotice: '',
      loadingNotice: ''
    });
  };
  _proto.bindEvents = function bindEvents() {
    this.$selectableImages.on('click', this.selectNewImage.bind(this));
  };
  return ImageGallery;
}();

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

/***/ }),

/***/ "./assets/js/theme/wishlist.js":
/*!*************************************!*\
  !*** ./assets/js/theme/wishlist.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WishList; });
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.reveal */ "./node_modules/foundation-sites/js/foundation/foundation.reveal.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery-match-height */ "./node_modules/jquery-match-height/dist/jquery.matchHeight.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery_match_height__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _custom_gql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/gql */ "./assets/js/theme/custom/gql.js");
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var WishList = /*#__PURE__*/function (_PageManager) {
  function WishList(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.options = {
      template: 'account/add-wishlist'
    };
    return _this || _assertThisInitialized(_this);
  }

  /**
   * Creates a confirm box before deleting all wish lists
   */
  _inheritsLoose(WishList, _PageManager);
  var _proto = WishList.prototype;
  _proto.wishlistDeleteConfirm = function wishlistDeleteConfirm() {
    var _this2 = this;
    $('body').on('click', '[data-wishlist-delete]', function (event) {
      var confirmed = window.confirm(_this2.context.wishlistDelete);
      if (confirmed) {
        return true;
      }
      event.preventDefault();
    });
  };
  _proto.registerAddWishListValidation = function registerAddWishListValidation($addWishlistForm) {
    var _this3 = this;
    this.addWishlistValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.wishlist-form input[type="submit"]'
    });
    this.addWishlistValidator.add([{
      selector: '.wishlist-form input[name="wishlistname"]',
      validate: function validate(cb, val) {
        var result = val.length > 0;
        cb(result);
      },
      errorMessage: 'You must enter a wishlist name.'
    }]);
    $addWishlistForm.on('submit', function (event) {
      _this3.addWishlistValidator.performCheck();
      if (_this3.addWishlistValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.onReady = function onReady() {
    var $addWishListForm = $('.wishlist-form');
    if ($addWishListForm.length) {
      this.registerAddWishListValidation($addWishListForm);
    }
    this.wishlistDeleteConfirm();
    console.log("From Wishlist js");
    $(document).on('click', '#copywishlist', function () {
      var $copyText = $(this).attr('data-copy');
      var button = $(this);
      navigator.clipboard.writeText($copyText).then(function () {
        var originalText = button.text();
        button.addClass("btn-success");
        button.text('✓ Copied');
        console.log("originalText", originalText);
        setTimeout(function () {
          button.text(originalText);
          button.removeClass("btn-success");
          button.removeClass("btn-danger");
        }, 750);
      }, function () {
        button.addClass("btn-danger");
        button.text('Error');
      });
    });

    // var listProducts = $(".productGrid li.product");
    // listProducts.each(function(id, li) {
    //     var proID = $(this).find(".ProductIDs").text();
    //     var forProID = $(this).find(".ProductIDsOnly").text();
    //     var proPrice = $(this).find(".mainLoadedPrice").text();
    //     var discountedPrice = (Number(proPrice.trim().replace("$",""))*Number(0.90)).toFixed(2);
    //     $(".discountedPriceCategory-"+forProID).html("$"+discountedPrice);
    //     if(proID == "NO")
    //         return;
    //     $("#loadQuickView-"+proID).html('<div id="loaderimage" class="loadingOverlay" style="display: block;"></div>');
    //     utils.api.product.getById(proID, { template: 'products/quick-view-options' }, (err, response) => {
    //         if (err) {
    //         throw new Error(err);
    //         }
    //         var availableSizes = "";
    //         $(response).find(".form-option").each(function(i, obj) {
    //             availableSizes  += "<label class='form-option' >"+$(this).html()+"</label>";
    //         });
    //         $("#loadQuickView-"+proID).html(availableSizes);
    //     });
    // });

    var allIds = jQuery('.wishListProductGrid [data-product-id]').map(function () {
      return parseInt(jQuery(this).attr('data-product-id'));
    }).get();
    new _custom_gql__WEBPACK_IMPORTED_MODULE_6__["default"](this.context, allIds.toString());

    // match height
    $('.card-title').matchHeight();
  };
  return WishList;
}(_page_manager__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2FyaWEvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vYXJpYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2FyaWEvcmFkaW9PcHRpb25zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvaWUtaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC9pbWFnZS1nYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvd2lzaGxpc3QuanMiXSwibmFtZXMiOlsiYXJpYUtleUNvZGVzIiwiUkVUVVJOIiwiU1BBQ0UiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJzZXRDaGVja2VkUmFkaW9JdGVtIiwiaXRlbUNvbGxlY3Rpb24iLCJpdGVtSWR4IiwiZWFjaCIsImlkeCIsIml0ZW0iLCIkaXRlbSIsIiQiLCJhdHRyIiwicHJvcCIsImZvY3VzIiwiY2FsY3VsYXRlVGFyZ2V0SXRlbVBvc2l0aW9uIiwibGFzdEl0ZW1JZHgiLCJjdXJyZW50SWR4IiwiaGFuZGxlSXRlbUtleURvd24iLCJlIiwia2V5Q29kZSIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImxhc3RDb2xsZWN0aW9uSXRlbUlkeCIsImxlbmd0aCIsIk9iamVjdCIsInZhbHVlcyIsImluY2x1ZGVzIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2SXRlbUlkeCIsImdldCIsIm5leHRJdGVtSWR4IiwiJGNvbnRhaW5lciIsIml0ZW1TZWxlY3RvciIsIiRpdGVtQ29sbGVjdGlvbiIsImZpbmQiLCJvbiIsIm9wdGlvbnNUeXBlc01hcCIsIklOUFVUX0ZJTEUiLCJJTlBVVF9URVhUIiwiSU5QVVRfTlVNQkVSIiwiSU5QVVRfQ0hFQ0tCT1giLCJURVhUQVJFQSIsIkRBVEUiLCJTRVRfU0VMRUNUIiwiU0VUX1JFQ1RBTkdMRSIsIlNFVF9SQURJTyIsIlNXQVRDSCIsIlBST0RVQ1RfTElTVCIsIlByb2R1Y3REZXRhaWxzIiwiJHNjb3BlIiwiY29udGV4dCIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsIl90aGlzIiwiJG92ZXJsYXkiLCJpbWFnZUdhbGxlcnkiLCJJbWFnZUdhbGxlcnkiLCJpbml0IiwibGlzdGVuUXVhbnRpdHlDaGFuZ2UiLCJpbml0UmFkaW9BdHRyaWJ1dGVzIiwiV2lzaGxpc3QiLCJsb2FkIiwiZ2V0VGFiUmVxdWVzdHMiLCIkZm9ybSIsIiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQiLCJoYXNPcHRpb25zIiwiaHRtbCIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsIl9fIiwidmFsdWUiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwiX21ha2VQcm9kdWN0VmFyaWFudEFjY2Vzc2libGUiLCJldmVudCIsInByb2R1Y3RPcHRpb25zQ2hhbmdlZCIsInNldFByb2R1Y3RWYXJpYW50IiwiYWRkUHJvZHVjdFRvQ2FydCIsIl9pc0VtcHR5IiwiJHByb2R1Y3RJZCIsInZhbCIsInV0aWxzIiwiYXBpIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJlcnIiLCJyZXNwb25zZSIsImF0dHJpYnV0ZXNEYXRhIiwiZGF0YSIsImF0dHJpYnV0ZXNDb250ZW50IiwiY29udGVudCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidXBkYXRlVmlldyIsInVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TIiwicHJldmlld01vZGFsIiwibW9kYWxGYWN0b3J5IiwibGlnaHRib3hpbWFnZXMiLCJoYXNDbGFzcyIsImltYWdlb2JqIiwic3JjIiwicHVzaCIsIl9DaG9jb2xhdCIsIkNob2NvbGF0Iiwib3BlbiIsInRyaWdnZXIiLCJuZXd2YWwiLCJjb25zb2xlIiwibG9nIiwiZWxlbWVudElzVmlzaWJsZUluVmlld3BvcnQiLCJlbCIsInBhcnRpYWxseVZpc2libGUiLCJfZWwkZ2V0Qm91bmRpbmdDbGllbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJfd2luZG93Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwiaGVhZGVySGVpZ2h0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib2Zmc2V0SGVpZ2h0IiwibmV3VG9wIiwibmV3Qm90dG9tIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzdmlzaWJsZSIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIl9wcm90byIsInByb3RvdHlwZSIsInZhcmlhbnREb21Ob2RlIiwidmFyaWFudFR5cGUiLCJpbml0UmFkaW9PcHRpb25zIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsIm9wdGlvbnMiLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpc1NhdGlzZmllZCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImpvaW4iLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJjb252ZXJ0SW50b0FycmF5IiwibWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCIsImlucHQiLCJkYXRhc2V0IiwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlIiwiZmlsdGVyIiwibGFiZWwiLCJpc0Jyb3dzZXJJRSIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwicmVwbGFjZSIsImNhcmQiLCJnZXRWaWV3TW9kZWwiLCIkcHJpY2VXaXRoVGF4IiwiJHByaWNlV2l0aG91dFRheCIsInJycFdpdGhUYXgiLCIkZGl2IiwiJHNwYW4iLCJycnBXaXRob3V0VGF4Iiwibm9uU2FsZVdpdGhUYXgiLCJub25TYWxlV2l0aG91dFRheCIsInByaWNlU2F2ZWQiLCJwcmljZU5vd0xhYmVsIiwicHJpY2VMYWJlbCIsIiR3ZWlnaHQiLCIkaW5jcmVtZW50cyIsIiRhZGRUb0NhcnQiLCIkd2lzaGxpc3RWYXJpYXRpb24iLCJzdG9jayIsIiRpbnB1dCIsInNrdSIsIiRsYWJlbCIsIiR2YWx1ZSIsInVwYyIsInF1YW50aXR5IiwiJHRleHQiLCIkYnVsa1ByaWNpbmciLCJpc1J1bm5pbmdJbklmcmFtZSIsInNlbGYiLCJfdGhpczIiLCIkY2hhbmdlZE9wdGlvbiIsInRhcmdldCIsInBhcmVudHMiLCJwcm9kdWN0SWQiLCJGb3JtRGF0YSIsInVuZGVmaW5lZCIsInByb2R1Y3RBdHRyaWJ1dGVzQ29udGVudCIsInNob3dQcm9kdWN0SW1hZ2UiLCJpbWFnZSIsIl9pc1BsYWluT2JqZWN0Iiwiem9vbUltYWdlVXJsIiwidG9vbHMiLCJpbWFnZVNyY3NldCIsImdldFNyY3NldCIsInpvb21TaXplIiwibWFpbkltYWdlVXJsIiwicHJvZHVjdFNpemUiLCJtYWluSW1hZ2VTcmNzZXQiLCJzZXRBbHRlcm5hdGVJbWFnZSIsInJlc3RvcmVJbWFnZSIsIl90aGlzMyIsIiR0YXJnZXQiLCJ2aWV3TW9kZWwiLCJxdWFudGl0eU1pbiIsInBhcnNlSW50IiwicXVhbnRpdHlNYXgiLCJxdHkiLCJ0ZXh0Iiwid2hpY2giLCJmb3JtIiwiX3RoaXM0IiwiJGFkZFRvQ2FydEJ0biIsIm9yaWdpbmFsQnRuVmFsIiwid2FpdE1lc3NhZ2UiLCJzaG93IiwiY2FydCIsIml0ZW1BZGQiLCJub3JtYWxpemVGb3JtRGF0YSIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiaGlkZSIsInRtcCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzaG93QWxlcnRNb2RhbCIsInRleHRDb250ZW50IiwidXBkYXRlQ2FydENvbnRlbnQiLCJjYXJ0X2l0ZW0iLCJpZCIsInNldHVwRm9jdXNhYmxlRWxlbWVudHMiLCJtb2RhbFR5cGVzIiwiUFJPRFVDVF9ERVRBSUxTIiwiZ2V0Q2FydENvbnRlbnQiLCJjdXN0b21Db250ZW50IiwiYm9keSIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImN1c3RvbVBvcHVwIiwiY2FydFF1YW50aXR5IiwiY2FydENvdW50ZXIiLCJyZW1vdmUiLCJjYXJ0SXRlbUlkIiwib25Db21wbGV0ZSIsInRlbXBsYXRlIiwicGFyYW1zIiwic3VnZ2VzdCIsImNvbmZpZyIsInN1Z2dlc3Rpb25zIiwibGltaXQiLCJnZXRDb250ZW50IiwicmVkaXJlY3RUbyIsInVybCIsImlmcmFtZVNkayIsImxvY2F0aW9uIiwibW9kYWwiLCJ1cGRhdGVDb250ZW50IiwiJGJvZHkiLCIkY2FydFF1YW50aXR5IiwiJGNvbnRlbnQiLCIkY2FydENvdW50ZXIiLCJzaG93TWVzc2FnZUJveCIsIm1lc3NhZ2UiLCIkbWVzc2FnZUJveCIsImNsZWFyUHJpY2luZ05vdEZvdW5kIiwidXBkYXRlUHJpY2VWaWV3IiwicHJpY2UiLCJ3aXRoX3RheCIsImZvcm1hdHRlZCIsIndpdGhvdXRfdGF4IiwicnJwX3dpdGhfdGF4IiwicnJwX3dpdGhvdXRfdGF4Iiwic2F2ZWQiLCJub25fc2FsZV9wcmljZV93aXRoX3RheCIsIm5vbl9zYWxlX3ByaWNlX3dpdGhvdXRfdGF4Iiwic3RvY2tfbWVzc2FnZSIsInB1cmNoYXNpbmdfbWVzc2FnZSIsIl9pc09iamVjdCIsIndlaWdodCIsInZhcmlhbnRJZCIsIl9pc051bWJlciIsImJ1bGtfZGlzY291bnRfcmF0ZXMiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCJfdGhpczUiLCJiZWhhdmlvciIsIm91dF9vZl9zdG9ja19iZWhhdmlvciIsImluU3RvY2tJZHMiLCJpbl9zdG9ja19hdHRyaWJ1dGVzIiwib3V0T2ZTdG9ja01lc3NhZ2UiLCJvdXRfb2Zfc3RvY2tfbWVzc2FnZSIsImkiLCJhdHRyaWJ1dGUiLCIkYXR0cmlidXRlIiwiYXR0cklkIiwiaW5kZXhPZiIsImVuYWJsZUF0dHJpYnV0ZSIsImRpc2FibGVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRzZWxlY3QiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCIkcGFyZW50IiwiY2xvc2VzdCIsIl90aGlzNiIsInJhZGlvIiwiJHJhZGlvIiwiaGFzaCIsIiRhY3RpdmVUYWIiLCJoYXMiLCIkdGFiQ29udGVudCIsInNpYmxpbmdzIiwiZmlsdGVyRW1wdHlWYWx1ZXNGcm9tRm9ybSIsImZvcm1EYXRhIiwicmVzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSIsIl9zdGVwIiwiZG9uZSIsIl9zdGVwJHZhbHVlIiwia2V5IiwiZmlsdGVyRW1wdHlGaWxlc0Zyb21Gb3JtIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9zdGVwMiR2YWx1ZSIsIkZpbGUiLCJuYW1lIiwic2l6ZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNvbGxlY3Rpb24iLCJzbGljZSIsImNhbGwiLCJXUklURV9SRVZJRVciLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwiJGJ1bGtQcmljaW5nTGluayIsInJldmlld01vZGFsIiwiX2luaGVyaXRzTG9vc2UiLCJvblJlYWR5IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInBhdGhuYW1lIiwidmFsaWRhdG9yIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJCQ0RhdGEiLCJwcm9kdWN0X2F0dHJpYnV0ZXMiLCJ2aWRlb0dhbGxlcnkiLCJ0cmFuc2xhdGVDb2xvdXJzIiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJjbGFzc2lmeUZvcm0iLCJyZXZpZXciLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsInBsYXlWaWRlbyIsIm1haW5Qcm9kdWN0SUQiLCJwcm9QcmljZSIsIm1vcmVDb2xvdXJzQ2Fyb3VzZWwiLCJkYXRhX3NyYyIsImJyYW5kU2VsZWN0b3IiLCJicmFuZE5hbWUiLCJicmFuZFVybCIsImNhcm91c2VsU2V0dGluZ3MiLCJkb3RzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNsaWRlIiwiYXJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImdldFBhZ2UiLCJzbGlkZXIiLCJub29mc2xpZGVycyIsInNsaWNrIiwiYmciLCJjc3MiLCJnZXRIZXhGcm9tQ29sb3JOYW1lIiwiTG9hZFByb2R1Y3RTaXplc1NlYXJjaCIsImxpc3RQcm9kdWN0cyIsImxpIiwicHJvSUQiLCJmb3JQcm9JRCIsImRpc2NvdW50ZWRQcmljZSIsIk51bWJlciIsInRvRml4ZWQiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsIkVycm9yIiwiYXZhaWxhYmxlU2l6ZXMiLCJvYmoiLCJpbnB1dElEIiwiZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSIsImF0dHJfbmFtZSIsImF2YWlsYWJsZV92YXJpYW50X3ZhbHVlcyIsImZvckVhY2giLCJudW1iZXIiLCJfIiwiaW5wdXQiLCJtc2dTcGFuSWQiLCJnZXRWYXJpYW50U3RvY2tMZXZlbHMiLCIkb3B0aW9uU2V0IiwiJG9wdGlvbnNBcnJheSIsImF0dHJpYnV0ZUlkIiwiYXR0cmlidXRlSWRJRCIsInZhcmlhbnRTaXplIiwiYXR0cmlidXRlVmFsdWUiLCJwcm9ncmVzc0Jhckh0bWwiLCJ2aWRlb0lEIiwidmlld3BvcnRoZWlnaHQiLCJoZWlnaHQiLCJ2aWV3cG9ydHdpZHRoIiwid2lkdGgiLCJlbWJlZENvZGUiLCJQYWdlTWFuYWdlciIsIiRnYWxsZXJ5IiwiJG1haW5JbWFnZSIsIiRtYWluSW1hZ2VOZXN0ZWQiLCIkc2VsZWN0YWJsZUltYWdlcyIsImN1cnJlbnRJbWFnZSIsImJpbmRFdmVudHMiLCJzZXRJbWFnZVpvb20iLCJzZXRNYWluSW1hZ2UiLCJpbWdPYmoiLCJhc3NpZ24iLCJzZXRBY3RpdmVUaHVtYiIsInN3YXBNYWluSW1hZ2UiLCJzYXZlZEltYWdlIiwiJHNlbGVjdGVkVGh1bWIiLCJzZWxlY3ROZXdJbWFnZSIsIm1haW5JbWFnZUFsdCIsImZpcnN0IiwiZWFzeXpvb20iLCJzd2FwIiwiYWx0IiwiZmFsbGJhY2tTdHlsZXNJRSIsImNoZWNrSW1hZ2UiLCJjb250YWluZXJIZWlnaHQiLCJjb250YWluZXJXaWR0aCIsIiR6b29tIiwiZWFzeVpvb20iLCJvblNob3ciLCJlcnJvck5vdGljZSIsImxvYWRpbmdOb3RpY2UiLCJiaW5kIiwiX2RlZmF1bHQiLCJub2QiLCJzdWJtaXQiLCIkcmV2aWV3c0NvbnRlbnQiLCIkY29sbGFwc2libGUiLCJpbml0TGlua0JpbmQiLCJpbmplY3RQYWdpbmF0aW9uTGluayIsImNvbGxhcHNlUmV2aWV3cyIsIkNvbGxhcHNpYmxlRXZlbnRzIiwiY2xpY2siLCIkbmV4dExpbmsiLCIkcHJldkxpbmsiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwicmV2aWV3UmF0aW5nIiwicmV2aWV3U3ViamVjdCIsInJldmlld0NvbW1lbnQiLCJjYiIsInJlc3VsdCIsImZvcm1zIiwiZW1haWwiLCJyZXZpZXdFbWFpbCIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJzZWxlY3ROZXdWaWRlbyIsInNldE1haW5WaWRlbyIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJlbGVtZW50IiwiJGVsIiwiaXNJbml0aWFsaXplZCIsIldpc2hMaXN0IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIndpc2hsaXN0RGVsZXRlQ29uZmlybSIsImNvbmZpcm1lZCIsImNvbmZpcm0iLCJ3aXNobGlzdERlbGV0ZSIsInJlZ2lzdGVyQWRkV2lzaExpc3RWYWxpZGF0aW9uIiwiJGFkZFdpc2hsaXN0Rm9ybSIsImFkZFdpc2hsaXN0VmFsaWRhdG9yIiwiJGFkZFdpc2hMaXN0Rm9ybSIsIiRjb3B5VGV4dCIsImJ1dHRvbiIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInRoZW4iLCJvcmlnaW5hbFRleHQiLCJzZXRUaW1lb3V0IiwiYWxsSWRzIiwialF1ZXJ5IiwiR3FsIiwidG9TdHJpbmciLCJtYXRjaEhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBTyxJQUFNQSxZQUFZLEdBQUc7RUFDeEJDLE1BQU0sRUFBRSxFQUFFO0VBQ1ZDLEtBQUssRUFBRSxFQUFFO0VBQ1RDLElBQUksRUFBRSxFQUFFO0VBQ1JDLEVBQUUsRUFBRSxFQUFFO0VBQ05DLEtBQUssRUFBRSxFQUFFO0VBQ1RDLElBQUksRUFBRTtBQUNWLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDUEQ7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQTJDO0FBRTNDLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQUlDLGNBQWMsRUFBRUMsT0FBTyxFQUFLO0VBQ3JERCxjQUFjLENBQUNFLElBQUksQ0FBQyxVQUFDQyxHQUFHLEVBQUVDLElBQUksRUFBSztJQUMvQixJQUFNQyxLQUFLLEdBQUdDLENBQUMsQ0FBQ0YsSUFB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ZS1idW5kbGUuY2h1bmsuMTguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYXJpYUtleUNvZGVzID0ge1xuICAgIFJFVFVSTjogMTMsXG4gICAgU1BBQ0U6IDMyLFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG59O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBpbml0UmFkaW9PcHRpb25zIH0gZnJvbSAnLi9yYWRpb09wdGlvbnMnO1xuIiwiaW1wb3J0IHsgYXJpYUtleUNvZGVzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBzZXRDaGVja2VkUmFkaW9JdGVtID0gKGl0ZW1Db2xsZWN0aW9uLCBpdGVtSWR4KSA9PiB7XG4gICAgaXRlbUNvbGxlY3Rpb24uZWFjaCgoaWR4LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0ICRpdGVtID0gJChpdGVtKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gaXRlbUlkeCkge1xuICAgICAgICAgICAgJGl0ZW0uYXR0cignYXJpYS1jaGVja2VkJywgZmFsc2UpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkaXRlbS5hdHRyKCdhcmlhLWNoZWNrZWQnLCB0cnVlKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuZm9jdXMoKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGNhbGN1bGF0ZVRhcmdldEl0ZW1Qb3NpdGlvbiA9IChsYXN0SXRlbUlkeCwgY3VycmVudElkeCkgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgY3VycmVudElkeCA+IGxhc3RJdGVtSWR4OiByZXR1cm4gMDtcbiAgICBjYXNlIGN1cnJlbnRJZHggPCAwOiByZXR1cm4gbGFzdEl0ZW1JZHg7XG4gICAgZGVmYXVsdDogcmV0dXJuIGN1cnJlbnRJZHg7XG4gICAgfVxufTtcblxuY29uc3QgaGFuZGxlSXRlbUtleURvd24gPSBpdGVtQ29sbGVjdGlvbiA9PiBlID0+IHtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IGU7XG4gICAgY29uc3QgaXRlbUlkeCA9IGl0ZW1Db2xsZWN0aW9uLmluZGV4KGUuY3VycmVudFRhcmdldCk7XG4gICAgY29uc3QgbGFzdENvbGxlY3Rpb25JdGVtSWR4ID0gaXRlbUNvbGxlY3Rpb24ubGVuZ3RoIC0gMTtcblxuICAgIGlmIChPYmplY3QudmFsdWVzKGFyaWFLZXlDb2RlcykuaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgIGNhc2UgYXJpYUtleUNvZGVzLlJFVFVSTjpcbiAgICBjYXNlIGFyaWFLZXlDb2Rlcy5TUEFDRToge1xuICAgICAgICBzZXRDaGVja2VkUmFkaW9JdGVtKGl0ZW1Db2xsZWN0aW9uLCBpdGVtSWR4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgYXJpYUtleUNvZGVzLkxFRlQ6XG4gICAgY2FzZSBhcmlhS2V5Q29kZXMuVVA6IHtcbiAgICAgICAgY29uc3QgcHJldkl0ZW1JZHggPSBjYWxjdWxhdGVUYXJnZXRJdGVtUG9zaXRpb24obGFzdENvbGxlY3Rpb25JdGVtSWR4LCBpdGVtSWR4IC0gMSk7XG4gICAgICAgIGl0ZW1Db2xsZWN0aW9uLmdldChwcmV2SXRlbUlkeCkuZm9jdXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgYXJpYUtleUNvZGVzLlJJR0hUOlxuICAgIGNhc2UgYXJpYUtleUNvZGVzLkRPV046IHtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW1JZHggPSBjYWxjdWxhdGVUYXJnZXRJdGVtUG9zaXRpb24obGFzdENvbGxlY3Rpb25JdGVtSWR4LCBpdGVtSWR4ICsgMSk7XG4gICAgICAgIGl0ZW1Db2xsZWN0aW9uLmdldChuZXh0SXRlbUlkeCkuZm9jdXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCRjb250YWluZXIsIGl0ZW1TZWxlY3RvcikgPT4ge1xuICAgIGNvbnN0ICRpdGVtQ29sbGVjdGlvbiA9ICRjb250YWluZXIuZmluZChpdGVtU2VsZWN0b3IpO1xuXG4gICAgJGNvbnRhaW5lci5vbigna2V5ZG93bicsIGl0ZW1TZWxlY3RvciwgaGFuZGxlSXRlbUtleURvd24oJGl0ZW1Db2xsZWN0aW9uKSk7XG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IFwiZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uL2ZvdW5kYXRpb25cIjtcbmltcG9ydCBcImZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi9mb3VuZGF0aW9uLnJldmVhbFwiO1xuaW1wb3J0IEltYWdlR2FsbGVyeSBmcm9tIFwiLi4vcHJvZHVjdC9pbWFnZS1nYWxsZXJ5XCI7XG5pbXBvcnQgbW9kYWxGYWN0b3J5LCB7IHNob3dBbGVydE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSBcIi4uL2dsb2JhbC9tb2RhbFwiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IFdpc2hsaXN0IGZyb20gXCIuLi93aXNobGlzdFwiO1xuaW1wb3J0IHsgbm9ybWFsaXplRm9ybURhdGEgfSBmcm9tIFwiLi91dGlscy9hcGlcIjtcbmltcG9ydCB7IGluaXRSYWRpb09wdGlvbnMgfSBmcm9tIFwiLi9hcmlhXCI7XG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gXCIuL3V0aWxzL2llLWhlbHBlcnNcIjtcblxuaW1wb3J0IENob2NvbGF0IGZyb20gXCJjaG9jb2xhdFwiO1xuXG5jb25zdCBvcHRpb25zVHlwZXNNYXAgPSB7XG4gIElOUFVUX0ZJTEU6IFwiaW5wdXQtZmlsZVwiLFxuICBJTlBVVF9URVhUOiBcImlucHV0LXRleHRcIixcbiAgSU5QVVRfTlVNQkVSOiBcImlucHV0LW51bWJlclwiLFxuICBJTlBVVF9DSEVDS0JPWDogXCJpbnB1dC1jaGVja2JveFwiLFxuICBURVhUQVJFQTogXCJ0ZXh0YXJlYVwiLFxuICBEQVRFOiBcImRhdGVcIixcbiAgU0VUX1NFTEVDVDogXCJzZXQtc2VsZWN0XCIsXG4gIFNFVF9SRUNUQU5HTEU6IFwic2V0LXJlY3RhbmdsZVwiLFxuICBTRVRfUkFESU86IFwic2V0LXJhZGlvXCIsXG4gIFNXQVRDSDogXCJzd2F0Y2hcIixcbiAgUFJPRFVDVF9MSVNUOiBcInByb2R1Y3QtbGlzdFwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdERldGFpbHMge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgdGhpcy4kb3ZlcmxheSA9ICQoXCJbZGF0YS1jYXJ0LWl0ZW0tYWRkXSAubG9hZGluZ092ZXJsYXlcIik7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmltYWdlR2FsbGVyeSA9IG5ldyBJbWFnZUdhbGxlcnkoJChcIltkYXRhLWltYWdlLWdhbGxlcnldXCIsIHRoaXMuJHNjb3BlKSk7XG4gICAgdGhpcy5pbWFnZUdhbGxlcnkuaW5pdCgpO1xuICAgIHRoaXMubGlzdGVuUXVhbnRpdHlDaGFuZ2UoKTtcbiAgICB0aGlzLmluaXRSYWRpb0F0dHJpYnV0ZXMoKTtcbiAgICBXaXNobGlzdC5sb2FkKHRoaXMuY29udGV4dCk7XG4gICAgdGhpcy5nZXRUYWJSZXF1ZXN0cygpO1xuXG4gICAgY29uc3QgJGZvcm0gPSAkKFwiZm9ybVtkYXRhLWNhcnQtaXRlbS1hZGRdXCIsICRzY29wZSk7XG4gICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoXCJbZGF0YS1wcm9kdWN0LW9wdGlvbi1jaGFuZ2VdXCIsICRmb3JtKTtcbiAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZChcIltkYXRhLWRlZmF1bHRdXCIpLmxlbmd0aDtcblxuICAgICQoXCJbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV1cIikuZWFjaCgoX18sIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZVwiKTtcblxuICAgICAgdGhpcy5fbWFrZVByb2R1Y3RWYXJpYW50QWNjZXNzaWJsZSh2YWx1ZSwgdHlwZSk7XG4gICAgfSk7XG5cbiAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5wcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQpO1xuICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgIH0pO1xuXG4gICAgJGZvcm0ub24oXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmFkZFByb2R1Y3RUb0NhcnQoZXZlbnQsICRmb3JtWzBdKTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xuICAgIGlmICgoXy5pc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgIGNvbnN0ICRwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCAkZm9ybSkudmFsKCk7XG5cbiAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UoJHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIFwicHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlc1wiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIGlmIChoYXNEZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhhdHRyaWJ1dGVzRGF0YSwgYXR0cmlidXRlc0NvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgIH1cblxuICAgIC8vICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuc2hvdygpO1xuXG4gICAgdGhpcy5wcmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoXCIjcHJldmlld01vZGFsXCIpWzBdO1xuXG4gICAgLyoqXG4gICAgICogTGlnaHRib3ggUG9wdXAgSW1hZ2UgR2FsbGVyeVxuICAgICAqL1xuICAgICQoXCIucHJvZHVjdFZpZXctdGh1bWJuYWlsLnByb2R1Y3RWaWV3LXRodW1ibmFpbC0tY3VzdG9tXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgJChcIi5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyLS1jdXN0b20ubG9hZEltYWdlSGVyZVwiKS5hdHRyKFwiZGF0YS1pbmRleFwiLCAkKHRoaXMpLmF0dHIoXCJkYXRhLWluZGV4XCIpKTtcbiAgICB9KTtcbiAgICB2YXIgbGlnaHRib3hpbWFnZXMgPSBbXTtcbiAgICAkKFwiLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMgLnByb2R1Y3RWaWV3LXRodW1ibmFpbFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhcInBsYXlMb2FkZWRWaWRlb1wiKSkge1xuICAgICAgICB2YXIgaW1hZ2VvYmogPSB7IHNyYzogJCh0aGlzKS5maW5kKFwiLnByb2R1Y3RWaWV3LXRodW1ibmFpbC1saW5rXCIpLmF0dHIoXCJkYXRhLWltYWdlLWdhbGxlcnktem9vbS1pbWFnZS11cmxcIikgfTtcbiAgICAgICAgbGlnaHRib3hpbWFnZXMucHVzaChpbWFnZW9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJChcIi5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyLS1jdXN0b20ubG9hZEltYWdlSGVyZVwiKS5vbihcImNsaWNrIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBpbmRleCA9ICQodGhpcykuYXR0cihcImRhdGEtaW5kZXhcIik7XG4gICAgICBjb25zdCB7IGFwaSB9ID0gQ2hvY29sYXQobGlnaHRib3hpbWFnZXMpO1xuICAgICAgYXBpLm9wZW4oaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy9GbG9hdGluZyB3aWRnZXRcbiAgICAkKFwiI2FkZFRvQ2FydC1mb3JtLWZsb2F0aW5nXCIpLm9uKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKFwiI2Zvcm0tYWN0aW9uLWFkZFRvQ2FydFwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgfSk7XG4gICAgJChcIltkYXRhLXByb2R1Y3Qtb3B0aW9uLWNoYW5nZS1mbG9hdGluZ11cIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IG5ld3ZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAkKFwiaW5wdXRbdmFsdWU9J1wiICsgbmV3dmFsICsgXCInXVwiKS5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuXG4gICAgICAvLyBpZigkKHRoaXMpLmZpbmQoXCJvcHRpb246c2VsZWN0ZWRcIikuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcbiAgICAgIC8vICAgJCgnI2FkZFRvQ2FydC1mbG9hdGluZycpLmhpZGUoKTtcbiAgICAgIC8vICAgJCgnLmtsYXZpeW8tYmlzLXRyaWdnZXInKS5zaG93KCk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAkKCcjYWRkVG9DYXJ0LWZsb2F0aW5nJykuc2hvdygpO1xuICAgICAgLy8gICAkKCcua2xhdml5by1iaXMtdHJpZ2dlcicpLmhpZGUoKTtcbiAgICAgIC8vIH1cblxuICAgIH0pO1xuXG4gICAgXG4gICAgJChcImlucHV0W3R5cGU9cmFkaW9dW25hbWVePWF0dHJpYnV0ZV1cIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IG5ld3ZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIm5ld3ZhbFwiLCBuZXd2YWwpO1xuICAgICAgJChcInNlbGVjdFtuYW1lPW9wdGlvbnMtZmxvYXRpbmddXCIpLnZhbChuZXd2YWwpO1xuXG4gICAgICAvLyB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAvLyBpZigkKFwibGFiZWxbZm9yPVwiK2lkK1wiXVwiKS5oYXNDbGFzcygndW5hdmFpbGFibGUnKSl7XG4gICAgICAvLyAgICQoJyNhZGRUb0NhcnQtZmxvYXRpbmcnKS5oaWRlKCk7XG4gICAgICAvLyAgICQoJy5rbGF2aXlvLWJpcy10cmlnZ2VyJykuc2hvdygpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgJCgnI2FkZFRvQ2FydC1mbG9hdGluZycpLnNob3coKTtcbiAgICAgIC8vICAgJCgnLmtsYXZpeW8tYmlzLXRyaWdnZXInKS5oaWRlKCk7XG4gICAgICAvLyB9XG4gICAgICBcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnRJc1Zpc2libGVJblZpZXdwb3J0ID0gKGVsLCBwYXJ0aWFsbHlWaXNpYmxlID0gZmFsc2UpID0+IHtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHsgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGggfSA9IHdpbmRvdztcblxuICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIikub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgbmV3VG9wID0gdG9wIC0gaGVhZGVySGVpZ2h0O1xuICAgICAgY29uc3QgbmV3Qm90dG9tID0gYm90dG9tIC0gaGVhZGVySGVpZ2h0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0b3AsIG5ld1RvcCwgYm90dG9tLCBuZXdCb3R0b20sIGlubmVySGVpZ2h0XCIpO1xuICAgICAgLy8gY29uc29sZS5sb2codG9wLCBuZXdUb3AsIGJvdHRvbSwgbmV3Qm90dG9tLCBpbm5lckhlaWdodCk7XG4gICAgICByZXR1cm4gKG5ld1RvcCA+IDAgJiYgbmV3VG9wIDwgaW5uZXJIZWlnaHQpIHx8IChuZXdCb3R0b20gPiAwICYmIG5ld0JvdHRvbSA8IGlubmVySGVpZ2h0KTtcbiAgICAgIHJldHVybiBuZXdUb3AgPj0gMCAmJiBib3R0b20gPD0gaW5uZXJIZWlnaHQ7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChldmVudCkgPT4ge1xuICAgICAgbGV0IGlzdmlzaWJsZSA9IGVsZW1lbnRJc1Zpc2libGVJblZpZXdwb3J0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1hY3Rpb24tYWRkVG9DYXJ0XCIpKTtcbiAgICAgIGlmIChpc3Zpc2libGUpIHtcbiAgICAgICAgJChcIi5mbG9hdGluZy1hZGR0b2NhcnRcIikucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi5mbG9hdGluZy1hZGR0b2NhcnRcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEVPRiAtIEZsb2F0aW5nIHdpZGdldFxuICB9XG5cbiAgX21ha2VQcm9kdWN0VmFyaWFudEFjY2Vzc2libGUodmFyaWFudERvbU5vZGUsIHZhcmlhbnRUeXBlKSB7XG4gICAgc3dpdGNoICh2YXJpYW50VHlwZSkge1xuICAgICAgY2FzZSBvcHRpb25zVHlwZXNNYXAuU0VUX1JBRElPOlxuICAgICAgY2FzZSBvcHRpb25zVHlwZXNNYXAuU1dBVENIOiB7XG4gICAgICAgIGluaXRSYWRpb09wdGlvbnMoJCh2YXJpYW50RG9tTm9kZSksIFwiW3R5cGU9cmFkaW9dXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICQuZWFjaCgkKFwiW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdXCIpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdID8gdmFsdWUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0IDogXCJcIjtcbiAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInJlcXVpcmVkXCIpO1xuICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1hdHRyaWJ1dGVcIik7XG5cbiAgICAgIGlmICgodHlwZSA9PT0gXCJpbnB1dC1maWxlXCIgfHwgdHlwZSA9PT0gXCJpbnB1dC10ZXh0XCIgfHwgdHlwZSA9PT0gXCJpbnB1dC1udW1iZXJcIikgJiYgdmFsdWUucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlID09PSBcIlwiICYmIHJlcXVpcmVkKSB7XG4gICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBcInRleHRhcmVhXCIgJiYgdmFsdWUucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpLnZhbHVlID09PSBcIlwiICYmIHJlcXVpcmVkKSB7XG4gICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBcImRhdGVcIikge1xuICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFwiKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xuXG4gICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RcIikpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICAgICAgLmpvaW4oXCItXCIpO1xuICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gXCJzZXQtc2VsZWN0XCIpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gdmFsdWUucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09IFwic2V0LXJlY3RhbmdsZVwiIHx8IHR5cGUgPT09IFwic2V0LXJhZGlvXCIgfHwgdHlwZSA9PT0gXCJzd2F0Y2hcIiB8fCB0eXBlID09PSBcImlucHV0LWNoZWNrYm94XCIgfHwgdHlwZSA9PT0gXCJwcm9kdWN0LWxpc3RcIikge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcihcIjpjaGVja2VkXCIpO1xuICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gKGlucHQpID0+IGlucHQuZGF0YXNldC5wcm9kdWN0QXR0cmlidXRlVmFsdWUgPT09IGNoZWNrZWQudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdFZhcmlhbnRzbGlzdC5maWx0ZXIobWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dClbMF07XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gXCJzZXQtcmVjdGFuZ2xlXCIgfHwgdHlwZSA9PT0gXCJzZXQtcmFkaW9cIiB8fCB0eXBlID09PSBcInByb2R1Y3QtbGlzdFwiKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlID09PSBcInN3YXRjaFwiKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmNoaWxkcmVuWzBdIDogY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsLnRpdGxlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlID09PSBcImlucHV0LWNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW5wdXQtY2hlY2tib3hcIikge1xuICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbihcIiwgXCIpIDogXCJ1bnNhdGlzZmllZFwiO1xuICAgIGNvbnN0IHZpZXcgPSAkKFwiLnByb2R1Y3RWaWV3XCIpO1xuXG4gICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSBcInVuc2F0aXNmaWVkXCIgPyBcIlwiIDogcHJvZHVjdFZhcmlhbnQ7XG4gICAgICBpZiAodmlldy5hdHRyKFwiZGF0YS1ldmVudC10eXBlXCIpKSB7XG4gICAgICAgIHZpZXcuYXR0cihcImRhdGEtcHJvZHVjdC12YXJpYW50XCIsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5maW5kKFwiLnByb2R1Y3RWaWV3LXRpdGxlXCIpWzBdLmlubmVyVGV4dC5yZXBsYWNlKC9cIi9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgY29uc3QgY2FyZCA9ICQoYFtkYXRhLW5hbWU9XCIke3Byb2R1Y3ROYW1lfVwiXWApO1xuICAgICAgICBjYXJkLmF0dHIoXCJkYXRhLXByb2R1Y3QtdmFyaWFudFwiLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbmNlICRwcm9kdWN0VmlldyBjYW4gYmUgZHluYW1pY2FsbHkgaW5zZXJ0ZWQgdXNpbmcgcmVuZGVyX3dpdGgsXG4gICAqIFdlIGhhdmUgdG8gcmV0cmlldmUgdGhlIHJlc3BlY3RpdmUgZWxlbWVudHNcbiAgICpcbiAgICogQHBhcmFtICRzY29wZVxuICAgKi9cbiAgZ2V0Vmlld01vZGVsKCRzY29wZSkge1xuICAgIHJldHVybiB7XG4gICAgICAkcHJpY2VXaXRoVGF4OiAkKFwiW2RhdGEtcHJvZHVjdC1wcmljZS13aXRoLXRheF1cIiwgJHNjb3BlKSxcbiAgICAgICRwcmljZVdpdGhvdXRUYXg6ICQoXCJbZGF0YS1wcm9kdWN0LXByaWNlLXdpdGhvdXQtdGF4XVwiLCAkc2NvcGUpLFxuICAgICAgcnJwV2l0aFRheDoge1xuICAgICAgICAkZGl2OiAkKFwiLnJycC1wcmljZS0td2l0aFRheFwiLCAkc2NvcGUpLFxuICAgICAgICAkc3BhbjogJChcIltkYXRhLXByb2R1Y3QtcnJwLXdpdGgtdGF4XVwiLCAkc2NvcGUpLFxuICAgICAgfSxcbiAgICAgIHJycFdpdGhvdXRUYXg6IHtcbiAgICAgICAgJGRpdjogJChcIi5ycnAtcHJpY2UtLXdpdGhvdXRUYXhcIiwgJHNjb3BlKSxcbiAgICAgICAgJHNwYW46ICQoXCJbZGF0YS1wcm9kdWN0LXJycC1wcmljZS13aXRob3V0LXRheF1cIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICBub25TYWxlV2l0aFRheDoge1xuICAgICAgICAkZGl2OiAkKFwiLm5vbi1zYWxlLXByaWNlLS13aXRoVGF4XCIsICRzY29wZSksXG4gICAgICAgICRzcGFuOiAkKFwiW2RhdGEtcHJvZHVjdC1ub24tc2FsZS1wcmljZS13aXRoLXRheF1cIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICBub25TYWxlV2l0aG91dFRheDoge1xuICAgICAgICAkZGl2OiAkKFwiLm5vbi1zYWxlLXByaWNlLS13aXRob3V0VGF4XCIsICRzY29wZSksXG4gICAgICAgICRzcGFuOiAkKFwiW2RhdGEtcHJvZHVjdC1ub24tc2FsZS1wcmljZS13aXRob3V0LXRheF1cIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICBwcmljZVNhdmVkOiB7XG4gICAgICAgICRkaXY6ICQoXCIucHJpY2Utc2VjdGlvbi0tc2F2aW5nXCIsICRzY29wZSksXG4gICAgICAgICRzcGFuOiAkKFwiW2RhdGEtcHJvZHVjdC1wcmljZS1zYXZlZF1cIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICBwcmljZU5vd0xhYmVsOiB7XG4gICAgICAgICRzcGFuOiAkKFwiLnByaWNlLW5vdy1sYWJlbFwiLCAkc2NvcGUpLFxuICAgICAgfSxcbiAgICAgIHByaWNlTGFiZWw6IHtcbiAgICAgICAgJHNwYW46ICQoXCIucHJpY2UtbGFiZWxcIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICAkd2VpZ2h0OiAkKFwiLnByb2R1Y3RWaWV3LWluZm8gW2RhdGEtcHJvZHVjdC13ZWlnaHRdXCIsICRzY29wZSksXG4gICAgICAkaW5jcmVtZW50czogJChcIi5mb3JtLWZpZWxkLS1pbmNyZW1lbnRzIDppbnB1dFwiLCAkc2NvcGUpLFxuICAgICAgJGFkZFRvQ2FydDogJChcIiNmb3JtLWFjdGlvbi1hZGRUb0NhcnRcIiwgJHNjb3BlKSxcbiAgICAgICR3aXNobGlzdFZhcmlhdGlvbjogJCgnW2RhdGEtd2lzaGxpc3QtYWRkXSBbbmFtZT1cInZhcmlhdGlvbl9pZFwiXScsICRzY29wZSksXG4gICAgICBzdG9jazoge1xuICAgICAgICAkY29udGFpbmVyOiAkKFwiLmZvcm0tZmllbGQtLXN0b2NrXCIsICRzY29wZSksXG4gICAgICAgICRpbnB1dDogJChcIltkYXRhLXByb2R1Y3Qtc3RvY2tdXCIsICRzY29wZSksXG4gICAgICB9LFxuICAgICAgc2t1OiB7XG4gICAgICAgICRsYWJlbDogJChcImR0LnNrdS1sYWJlbFwiLCAkc2NvcGUpLFxuICAgICAgICAkdmFsdWU6ICQoXCJbZGF0YS1wcm9kdWN0LXNrdV1cIiwgJHNjb3BlKSxcbiAgICAgIH0sXG4gICAgICB1cGM6IHtcbiAgICAgICAgJGxhYmVsOiAkKFwiZHQudXBjLWxhYmVsXCIsICRzY29wZSksXG4gICAgICAgICR2YWx1ZTogJChcIltkYXRhLXByb2R1Y3QtdXBjXVwiLCAkc2NvcGUpLFxuICAgICAgfSxcbiAgICAgIHF1YW50aXR5OiB7XG4gICAgICAgICR0ZXh0OiAkKFwiLmluY3JlbWVudFRvdGFsXCIsICRzY29wZSksXG4gICAgICAgICRpbnB1dDogJChcIltuYW1lPXF0eVxcXFxbXFxcXF1dXCIsICRzY29wZSksXG4gICAgICB9LFxuICAgICAgJGJ1bGtQcmljaW5nOiAkKFwiLnByb2R1Y3RWaWV3LWluZm8tYnVsa1ByaWNpbmdcIiwgJHNjb3BlKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCB3aW5kb3cgaXMgYmVpbmcgcnVuIGluc2lkZSBhbiBpZnJhbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc1J1bm5pbmdJbklmcmFtZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBIYW5kbGUgcHJvZHVjdCBvcHRpb25zIGNoYW5nZXNcbiAgICpcbiAgICovXG4gIHByb2R1Y3RPcHRpb25zQ2hhbmdlZChldmVudCkge1xuICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChldmVudC50YXJnZXQpO1xuICAgIGNvbnN0ICRmb3JtID0gJGNoYW5nZWRPcHRpb24ucGFyZW50cyhcImZvcm1cIik7XG4gICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJGZvcm0pLnZhbCgpO1xuXG4gICAgLy8gRG8gbm90IHRyaWdnZXIgYW4gYWpheCByZXF1ZXN0IGlmIGl0J3MgYSBmaWxlIG9yIGlmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBGb3JtRGF0YVxuICAgIGlmICgkY2hhbmdlZE9wdGlvbi5hdHRyKFwidHlwZVwiKSA9PT0gXCJmaWxlXCIgfHwgd2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIFwicHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlc1wiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgIGNvbnN0IHByb2R1Y3RBdHRyaWJ1dGVzQ29udGVudCA9IHJlc3BvbnNlLmNvbnRlbnQgfHwge307XG4gICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcocHJvZHVjdEF0dHJpYnV0ZXNEYXRhLCBwcm9kdWN0QXR0cmlidXRlc0NvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1Byb2R1Y3RJbWFnZShpbWFnZSkge1xuICAgIGlmIChfLmlzUGxhaW5PYmplY3QoaW1hZ2UpKSB7XG4gICAgICBjb25zdCB6b29tSW1hZ2VVcmwgPSB1dGlscy50b29scy5pbWFnZVNyY3NldC5nZXRTcmNzZXQoXG4gICAgICAgIGltYWdlLmRhdGEsXG4gICAgICAgIHsgXCIxeFwiOiB0aGlzLmNvbnRleHQuem9vbVNpemUgfVxuICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICBTaG91bGQgbWF0Y2ggem9vbSBzaXplIHVzZWQgZm9yIGRhdGEtem9vbS1pbWFnZSBpblxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzL3Byb2R1Y3RzL3Byb2R1Y3Qtdmlldy5odG1sXG5cbiAgICAgICAgICAgICAgICAgICAgTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBpbWFnZSBmb3IgYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBzcmNzZXRcblxuICAgICAgICAgICAgICAgICAgICBBbHNvIG5vdGUgdGhhdCBnZXRTcmNzZXQgcmV0dXJucyBhIHNpbXBsZSBzcmMgc3RyaW5nIHdoZW4gZXhhY3RseSBvbmUgc2l6ZSBpcyBwcm92aWRlZFxuICAgICAgICAgICAgICAgICovXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtYWluSW1hZ2VVcmwgPSB1dGlscy50b29scy5pbWFnZVNyY3NldC5nZXRTcmNzZXQoXG4gICAgICAgIGltYWdlLmRhdGEsXG4gICAgICAgIHsgXCIxeFwiOiB0aGlzLmNvbnRleHQucHJvZHVjdFNpemUgfVxuICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICBTaG91bGQgbWF0Y2ggZmFsbGJhY2sgaW1hZ2Ugc2l6ZSB1c2VkIGZvciB0aGUgbWFpbiBwcm9kdWN0IGltYWdlIGluXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMvcHJvZHVjdHMvcHJvZHVjdC12aWV3Lmh0bWxcblxuICAgICAgICAgICAgICAgICAgICBOb3RlIHRoYXQgdGhpcyB3aWxsIG9ubHkgYmUgdXNlZCBhcyBhIGZhbGxiYWNrIGltYWdlIGZvciBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHNyY3NldFxuXG4gICAgICAgICAgICAgICAgICAgIEFsc28gbm90ZSB0aGF0IGdldFNyY3NldCByZXR1cm5zIGEgc2ltcGxlIHNyYyBzdHJpbmcgd2hlbiBleGFjdGx5IG9uZSBzaXplIGlzIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1haW5JbWFnZVNyY3NldCA9IHV0aWxzLnRvb2xzLmltYWdlU3Jjc2V0LmdldFNyY3NldChpbWFnZS5kYXRhKTtcblxuICAgICAgdGhpcy5pbWFnZUdhbGxlcnkuc2V0QWx0ZXJuYXRlSW1hZ2Uoe1xuICAgICAgICBtYWluSW1hZ2VVcmwsXG4gICAgICAgIHpvb21JbWFnZVVybCxcbiAgICAgICAgbWFpbkltYWdlU3Jjc2V0LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW1hZ2VHYWxsZXJ5LnJlc3RvcmVJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBIYW5kbGUgYWN0aW9uIHdoZW4gdGhlIHNob3BwZXIgY2xpY2tzIG9uICsgLyAtIGZvciBxdWFudGl0eVxuICAgKlxuICAgKi9cbiAgbGlzdGVuUXVhbnRpdHlDaGFuZ2UoKSB7XG4gICAgdGhpcy4kc2NvcGUub24oXCJjbGlja1wiLCBcIltkYXRhLXF1YW50aXR5LWNoYW5nZV0gYnV0dG9uXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgY29uc3Qgdmlld01vZGVsID0gdGhpcy5nZXRWaWV3TW9kZWwodGhpcy4kc2NvcGUpO1xuICAgICAgY29uc3QgJGlucHV0ID0gdmlld01vZGVsLnF1YW50aXR5LiRpbnB1dDtcbiAgICAgIGNvbnN0IHF1YW50aXR5TWluID0gcGFyc2VJbnQoJGlucHV0LmRhdGEoXCJxdWFudGl0eU1pblwiKSwgMTApO1xuICAgICAgY29uc3QgcXVhbnRpdHlNYXggPSBwYXJzZUludCgkaW5wdXQuZGF0YShcInF1YW50aXR5TWF4XCIpLCAxMCk7XG5cbiAgICAgIGxldCBxdHkgPSBwYXJzZUludCgkaW5wdXQudmFsKCksIDEwKTtcblxuICAgICAgLy8gSWYgYWN0aW9uIGlzIGluY3JlbWVudGluZ1xuICAgICAgaWYgKCR0YXJnZXQuZGF0YShcImFjdGlvblwiKSA9PT0gXCJpbmNcIikge1xuICAgICAgICAvLyBJZiBxdWFudGl0eSBtYXggb3B0aW9uIGlzIHNldFxuICAgICAgICBpZiAocXVhbnRpdHlNYXggPiAwKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgcXVhbnRpdHkgZG9lcyBub3QgZXhjZWVkIG1heFxuICAgICAgICAgIGlmIChxdHkgKyAxIDw9IHF1YW50aXR5TWF4KSB7XG4gICAgICAgICAgICBxdHkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXR5Kys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocXR5ID4gMSkge1xuICAgICAgICAvLyBJZiBxdWFudGl0eSBtaW4gb3B0aW9uIGlzIHNldFxuICAgICAgICBpZiAocXVhbnRpdHlNaW4gPiAwKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgcXVhbnRpdHkgZG9lcyBub3QgZmFsbCBiZWxvdyBtaW5cbiAgICAgICAgICBpZiAocXR5IC0gMSA+PSBxdWFudGl0eU1pbikge1xuICAgICAgICAgICAgcXR5LS07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF0eS0tO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBoaWRkZW4gaW5wdXRcbiAgICAgIHZpZXdNb2RlbC5xdWFudGl0eS4kaW5wdXQudmFsKHF0eSk7XG4gICAgICAvLyB1cGRhdGUgdGV4dFxuICAgICAgdmlld01vZGVsLnF1YW50aXR5LiR0ZXh0LnRleHQocXR5KTtcbiAgICB9KTtcblxuICAgIC8vIFByZXZlbnQgdHJpZ2dlcmluZyBxdWFudGl0eSBjaGFuZ2Ugd2hlbiBwcmVzc2luZyBlbnRlclxuICAgIHRoaXMuJHNjb3BlLm9uKFwia2V5cHJlc3NcIiwgXCIuZm9ybS1pbnB1dC0taW5jcmVtZW50VG90YWxcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAvLyBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBldmVudC53aGljaCwgdGhlbiB1c2UgZXZlbnQud2hpY2gsIG90aGVyd2lzZSB1c2UgZXZlbnQua2V5Q29kZVxuICAgICAgY29uc3QgeCA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG4gICAgICBpZiAoeCA9PT0gMTMpIHtcbiAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQWRkIGEgcHJvZHVjdCB0byBjYXJ0XG4gICAqXG4gICAqL1xuICBhZGRQcm9kdWN0VG9DYXJ0KGV2ZW50LCBmb3JtKSB7XG4gICAgY29uc3QgJGFkZFRvQ2FydEJ0biA9ICQoXCIjZm9ybS1hY3Rpb24tYWRkVG9DYXJ0XCIsICQoZXZlbnQudGFyZ2V0KSk7XG4gICAgY29uc3Qgb3JpZ2luYWxCdG5WYWwgPSAkYWRkVG9DYXJ0QnRuLnZhbCgpO1xuICAgIGNvbnN0IHdhaXRNZXNzYWdlID0gJGFkZFRvQ2FydEJ0bi5kYXRhKFwid2FpdE1lc3NhZ2VcIik7XG5cbiAgICAvLyBEbyBub3QgZG8gQUpBWCBpZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBGb3JtRGF0YVxuICAgIGlmICh3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkYWRkVG9DYXJ0QnRuLnZhbCh3YWl0TWVzc2FnZSkucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuXG4gICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAvLyBBZGQgaXRlbSB0byBjYXJ0XG4gICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChub3JtYWxpemVGb3JtRGF0YShuZXcgRm9ybURhdGEoZm9ybSkpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7XG5cbiAgICAgICRhZGRUb0NhcnRCdG4udmFsKG9yaWdpbmFsQnRuVmFsKS5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuXG4gICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgLy8gR3VhcmQgc3RhdGVtZW50XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIC8vIFN0cmlwIHRoZSBIVE1MIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcblxuICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBPcGVuIHByZXZpZXcgbW9kYWwgYW5kIHVwZGF0ZSBjb250ZW50XG4gICAgICBpZiAodGhpcy5wcmV2aWV3TW9kYWwpIHtcbiAgICAgICAgdGhpcy5wcmV2aWV3TW9kYWwub3BlbigpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FydENvbnRlbnQodGhpcy5wcmV2aWV3TW9kYWwsIHJlc3BvbnNlLmRhdGEuY2FydF9pdGVtLmlkLCAoKSA9PlxuICAgICAgICAgIHRoaXMucHJldmlld01vZGFsLnNldHVwRm9jdXNhYmxlRWxlbWVudHMobW9kYWxUeXBlcy5QUk9EVUNUX0RFVEFJTFMpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgLy8gaWYgbm8gbW9kYWwsIHJlZGlyZWN0IHRvIHRoZSBjYXJ0IHBhZ2UuLi4uXG4gICAgICAgIC8vIHRoaXMucmVkaXJlY3RUbyhyZXNwb25zZS5kYXRhLmNhcnRfaXRlbS5jYXJ0X3VybCB8fCB0aGlzLmNvbnRleHQudXJscy5jYXJ0KTtcblxuICAgICAgICB0aGlzLmdldENhcnRDb250ZW50KCByZXNwb25zZS5kYXRhLmNhcnRfaXRlbS5pZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGN1c3RvbUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgICAgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgICAgIGN1c3RvbUNvbnRlbnQuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgY3VzdG9tQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ25vbmUnKTtcbiAgICAgICAgICBjdXN0b21Db250ZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCdjdXN0b20tcG9wdXAnKTtcbiAgICAgICAgICBib2R5LmFwcGVuZChjdXN0b21Db250ZW50KTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgcG9wdXAgY29udGVudCBoYXMgYmVlbiBjcmVhdGVkJyk7XG5cbiAgICAgICAgICBsZXQgY3VzdG9tUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLXBvcHVwJyk7XG5cbiAgICAgICAgICAvLyBVcGRhdGUgY2FydCBjb3VudGVyXG4gICAgICAgICAgbGV0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXBvcHVwIFtkYXRhLWNhcnQtcXVhbnRpdHldXCIpLFxuICAgICAgICAgICAgICBjYXJ0Q291bnRlciA9ICQoXCIubmF2VXNlci1hY3Rpb24gLmNhcnQtY291bnRcIiksXG4gICAgICAgICAgICAgIHF1YW50aXR5ID0gY2FydFF1YW50aXR5LmdldEF0dHJpYnV0ZShcImRhdGEtY2FydC1xdWFudGl0eVwiKSB8fCAwO1xuXG4gICAgICAgICAgY2FydENvdW50ZXIuYWRkQ2xhc3MoXCJjYXJ0LWNvdW50LS1wb3NpdGl2ZVwiKTtcbiAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcihcImNhcnQtcXVhbnRpdHktdXBkYXRlXCIsIHF1YW50aXR5KTtcblxuICAgICAgICAgIGN1c3RvbVBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgcG9wdXAgY29udGVudCBoYXMgYmVlbiByZW1vdmVkJyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2FydCBjb250ZW50c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2FydEl0ZW1JZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlXG4gICAqL1xuICBnZXRDYXJ0Q29udGVudChjYXJ0SXRlbUlkLCBvbkNvbXBsZXRlKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHRlbXBsYXRlOiBcImNhcnQvcHJldmlld1wiLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHN1Z2dlc3Q6IGNhcnRJdGVtSWQsXG4gICAgICB9LFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhcnQ6IHtcbiAgICAgICAgICBzdWdnZXN0aW9uczoge1xuICAgICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgb25Db21wbGV0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVkaXJlY3QgdG8gdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICovXG4gIHJlZGlyZWN0VG8odXJsKSB7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nSW5JZnJhbWUoKSAmJiAhd2luZG93LmlmcmFtZVNkaykge1xuICAgICAgd2luZG93LnRvcC5sb2NhdGlvbiA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY2FydCBjb250ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7TW9kYWx9IG1vZGFsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjYXJ0SXRlbUlkXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGVcbiAgICovXG4gIHVwZGF0ZUNhcnRDb250ZW50KG1vZGFsLCBjYXJ0SXRlbUlkLCBvbkNvbXBsZXRlKSB7XG4gICAgdGhpcy5nZXRDYXJ0Q29udGVudChjYXJ0SXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UpO1xuXG4gICAgICAvLyBVcGRhdGUgY2FydCBjb3VudGVyXG4gICAgICBjb25zdCAkYm9keSA9ICQoXCJib2R5XCIpO1xuICAgICAgY29uc3QgJGNhcnRRdWFudGl0eSA9ICQoXCJbZGF0YS1jYXJ0LXF1YW50aXR5XVwiLCBtb2RhbC4kY29udGVudCk7XG4gICAgICBjb25zdCAkY2FydENvdW50ZXIgPSAkKFwiLm5hdlVzZXItYWN0aW9uIC5jYXJ0LWNvdW50XCIpO1xuICAgICAgY29uc3QgcXVhbnRpdHkgPSAkY2FydFF1YW50aXR5LmRhdGEoXCJjYXJ0UXVhbnRpdHlcIikgfHwgMDtcblxuICAgICAgJGNhcnRDb3VudGVyLmFkZENsYXNzKFwiY2FydC1jb3VudC0tcG9zaXRpdmVcIik7XG4gICAgICAkYm9keS50cmlnZ2VyKFwiY2FydC1xdWFudGl0eS11cGRhdGVcIiwgcXVhbnRpdHkpO1xuXG4gICAgICBpZiAob25Db21wbGV0ZSkge1xuICAgICAgICBvbkNvbXBsZXRlKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGFuIG1lc3NhZ2UgYm94IGlmIGEgbWVzc2FnZSBpcyBwYXNzZWRcbiAgICogSGlkZSB0aGUgYm94IGlmIHRoZSBtZXNzYWdlIGlzIGVtcHR5XG4gICAqIEBwYXJhbSAge1N0cmluZ30gbWVzc2FnZVxuICAgKi9cbiAgc2hvd01lc3NhZ2VCb3gobWVzc2FnZSkge1xuICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJChcIi5wcm9kdWN0QXR0cmlidXRlcy1tZXNzYWdlXCIpO1xuXG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICQoXCIuYWxlcnRCb3gtbWVzc2FnZVwiLCAkbWVzc2FnZUJveCkudGV4dChtZXNzYWdlKTtcbiAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBwcmljaW5nIGVsZW1lbnRzIHRoYXQgd2lsbCBzaG93IHVwIG9ubHkgd2hlbiB0aGUgcHJpY2UgZXhpc3RzIGluIEFQSVxuICAgKiBAcGFyYW0gdmlld01vZGVsXG4gICAqL1xuICBjbGVhclByaWNpbmdOb3RGb3VuZCh2aWV3TW9kZWwpIHtcbiAgICB2aWV3TW9kZWwucnJwV2l0aFRheC4kZGl2LmhpZGUoKTtcbiAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LmhpZGUoKTtcbiAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJGRpdi5oaWRlKCk7XG4gICAgdmlld01vZGVsLm5vblNhbGVXaXRob3V0VGF4LiRkaXYuaGlkZSgpO1xuICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRkaXYuaGlkZSgpO1xuICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAqL1xuICB1cGRhdGVQcmljZVZpZXcodmlld01vZGVsLCBwcmljZSkge1xuICAgIHRoaXMuY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKTtcblxuICAgIGlmIChwcmljZS53aXRoX3RheCkge1xuICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uc2hvdygpO1xuICAgICAgdmlld01vZGVsLiRwcmljZVdpdGhUYXguaHRtbChwcmljZS53aXRoX3RheC5mb3JtYXR0ZWQpO1xuICAgIH1cblxuICAgIGlmIChwcmljZS53aXRob3V0X3RheCkge1xuICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uc2hvdygpO1xuICAgICAgdmlld01vZGVsLiRwcmljZVdpdGhvdXRUYXguaHRtbChwcmljZS53aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgIH1cblxuICAgIGlmIChwcmljZS5ycnBfd2l0aF90YXgpIHtcbiAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRkaXYuc2hvdygpO1xuICAgICAgdmlld01vZGVsLnJycFdpdGhUYXguJHNwYW4uaHRtbChwcmljZS5ycnBfd2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICB9XG5cbiAgICBpZiAocHJpY2UucnJwX3dpdGhvdXRfdGF4KSB7XG4gICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LnNob3coKTtcbiAgICAgIHZpZXdNb2RlbC5ycnBXaXRob3V0VGF4LiRzcGFuLmh0bWwocHJpY2UucnJwX3dpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgfVxuXG4gICAgaWYgKHByaWNlLnNhdmVkKSB7XG4gICAgICB2aWV3TW9kZWwucHJpY2VTYXZlZC4kZGl2LnNob3coKTtcbiAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRzcGFuLmh0bWwocHJpY2Uuc2F2ZWQuZm9ybWF0dGVkKTtcbiAgICB9XG5cbiAgICBpZiAocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aF90YXgpIHtcbiAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aFRheC4kZGl2LnNob3coKTtcbiAgICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aFRheC4kc3Bhbi5odG1sKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4LmZvcm1hdHRlZCk7XG4gICAgfVxuXG4gICAgaWYgKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhvdXRfdGF4KSB7XG4gICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJGRpdi5zaG93KCk7XG4gICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJHNwYW4uaHRtbChwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHZpZXcgb2YgcHJpY2UsIG1lc3NhZ2VzLCBTS1UgYW5kIHN0b2NrIG9wdGlvbnMgd2hlbiBhIHByb2R1Y3Qgb3B0aW9uIGNoYW5nZXNcbiAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICovXG4gIHVwZGF0ZVZpZXcoZGF0YSwgY29udGVudCA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3TW9kZWwgPSB0aGlzLmdldFZpZXdNb2RlbCh0aGlzLiRzY29wZSk7XG5cbiAgICB0aGlzLnNob3dNZXNzYWdlQm94KGRhdGEuc3RvY2tfbWVzc2FnZSB8fCBkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG5cbiAgICBpZiAoXy5pc09iamVjdChkYXRhLnByaWNlKSkge1xuICAgICAgdGhpcy51cGRhdGVQcmljZVZpZXcodmlld01vZGVsLCBkYXRhLnByaWNlKTtcbiAgICB9XG5cbiAgICBpZiAoXy5pc09iamVjdChkYXRhLndlaWdodCkpIHtcbiAgICAgIHZpZXdNb2RlbC4kd2VpZ2h0Lmh0bWwoZGF0YS53ZWlnaHQuZm9ybWF0dGVkKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdmFyaWF0aW9uX2lkIGlmIGl0IGV4aXN0cyBmb3IgYWRkaW5nIHRvIHdpc2hsaXN0XG4gICAgaWYgKGRhdGEudmFyaWFudElkKSB7XG4gICAgICB2aWV3TW9kZWwuJHdpc2hsaXN0VmFyaWF0aW9uLnZhbChkYXRhLnZhcmlhbnRJZCk7XG4gICAgfVxuXG4gICAgLy8gSWYgU0tVIGlzIGF2YWlsYWJsZVxuICAgIGlmIChkYXRhLnNrdSkge1xuICAgICAgdmlld01vZGVsLnNrdS4kdmFsdWUudGV4dChkYXRhLnNrdSk7XG4gICAgICB2aWV3TW9kZWwuc2t1LiRsYWJlbC5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdNb2RlbC5za3UuJGxhYmVsLmhpZGUoKTtcbiAgICAgIHZpZXdNb2RlbC5za3UuJHZhbHVlLnRleHQoXCJcIik7XG4gICAgfVxuXG4gICAgLy8gSWYgVVBDIGlzIGF2YWlsYWJsZVxuICAgIGlmIChkYXRhLnVwYykge1xuICAgICAgdmlld01vZGVsLnVwYy4kdmFsdWUudGV4dChkYXRhLnVwYyk7XG4gICAgICB2aWV3TW9kZWwudXBjLiRsYWJlbC5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdNb2RlbC51cGMuJGxhYmVsLmhpZGUoKTtcbiAgICAgIHZpZXdNb2RlbC51cGMuJHZhbHVlLnRleHQoXCJcIik7XG4gICAgfVxuXG4gICAgLy8gaWYgc3RvY2sgdmlldyBpcyBvbiAoQ1Agc2V0dGluZ3MpXG4gICAgaWYgKHZpZXdNb2RlbC5zdG9jay4kY29udGFpbmVyLmxlbmd0aCAmJiBfLmlzTnVtYmVyKGRhdGEuc3RvY2spKSB7XG4gICAgICAvLyBpZiB0aGUgc3RvY2sgY29udGFpbmVyIGlzIGhpZGRlbiwgc2hvd1xuICAgICAgdmlld01vZGVsLnN0b2NrLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoXCJ1LWhpZGRlblZpc3VhbGx5XCIpO1xuXG4gICAgICB2aWV3TW9kZWwuc3RvY2suJGlucHV0LnRleHQoZGF0YS5zdG9jayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdNb2RlbC5zdG9jay4kY29udGFpbmVyLmFkZENsYXNzKFwidS1oaWRkZW5WaXN1YWxseVwiKTtcbiAgICAgIHZpZXdNb2RlbC5zdG9jay4kaW5wdXQudGV4dChkYXRhLnN0b2NrKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TKGRhdGEpO1xuXG4gICAgLy8gSWYgQnVsayBQcmljaW5nIHJlbmRlcmVkIEhUTUwgaXMgYXZhaWxhYmxlXG4gICAgaWYgKGRhdGEuYnVsa19kaXNjb3VudF9yYXRlcyAmJiBjb250ZW50KSB7XG4gICAgICB2aWV3TW9kZWwuJGJ1bGtQcmljaW5nLmh0bWwoY29udGVudCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YS5idWxrX2Rpc2NvdW50X3JhdGVzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB2aWV3TW9kZWwuJGJ1bGtQcmljaW5nLmh0bWwoXCJcIik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoZGF0YSkge1xuICAgIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcbiAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgdmlld01vZGVsLiRhZGRUb0NhcnQucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgdmlld01vZGVsLiRpbmNyZW1lbnRzLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlld01vZGVsLiRhZGRUb0NhcnQucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgIHZpZXdNb2RlbC4kaW5jcmVtZW50cy5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgKi9cbiAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgY29uc3QgaW5TdG9ja0lkcyA9IGRhdGEuaW5fc3RvY2tfYXR0cmlidXRlcztcbiAgICBjb25zdCBvdXRPZlN0b2NrTWVzc2FnZSA9IGAgKCR7ZGF0YS5vdXRfb2Zfc3RvY2tfbWVzc2FnZX0pYDtcblxuICAgIHRoaXMuc2hvd1Byb2R1Y3RJbWFnZShkYXRhLmltYWdlKTtcblxuICAgIGlmIChiZWhhdmlvciAhPT0gXCJoaWRlX29wdGlvblwiICYmIGJlaGF2aW9yICE9PSBcImxhYmVsX29wdGlvblwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJChcIltkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXVwiLCB0aGlzLiRzY29wZSkuZWFjaCgoaSwgYXR0cmlidXRlKSA9PiB7XG4gICAgICBjb25zdCAkYXR0cmlidXRlID0gJChhdHRyaWJ1dGUpO1xuICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKFwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlXCIpLCAxMCk7XG5cbiAgICAgIGlmIChpblN0b2NrSWRzLmluZGV4T2YoYXR0cklkKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5lbmFibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSBcInNldC1zZWxlY3RcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChiZWhhdmlvciA9PT0gXCJoaWRlX29wdGlvblwiKSB7XG4gICAgICAkYXR0cmlidXRlLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGF0dHJpYnV0ZS5hZGRDbGFzcyhcInVuYXZhaWxhYmxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgY29uc3QgJHNlbGVjdCA9ICRhdHRyaWJ1dGUucGFyZW50KCk7XG5cbiAgICBpZiAoYmVoYXZpb3IgPT09IFwiaGlkZV9vcHRpb25cIikge1xuICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24oZmFsc2UpO1xuICAgICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBpcyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIGEgc2VsZWN0IGRyb3Bkb3duLCBzZWxlY3QgdGhlIGZpcnN0IG9wdGlvbiAoTUVSQy02MzkpXG4gICAgICBpZiAoJHNlbGVjdC52YWwoKSA9PT0gJGF0dHJpYnV0ZS5hdHRyKFwidmFsdWVcIikpIHtcbiAgICAgICAgJHNlbGVjdFswXS5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJGF0dHJpYnV0ZS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCBcIlwiKSArIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gXCJzZXQtc2VsZWN0XCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChiZWhhdmlvciA9PT0gXCJoaWRlX29wdGlvblwiKSB7XG4gICAgICAkYXR0cmlidXRlLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGF0dHJpYnV0ZS5yZW1vdmVDbGFzcyhcInVuYXZhaWxhYmxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICBpZiAoYmVoYXZpb3IgPT09IFwiaGlkZV9vcHRpb25cIikge1xuICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRhdHRyaWJ1dGUucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCBcIlwiKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSB7XG4gICAgY29uc3QgJHBhcmVudCA9ICRhdHRyaWJ1dGUuY2xvc2VzdChcIltkYXRhLXByb2R1Y3QtYXR0cmlidXRlXVwiKTtcblxuICAgIHJldHVybiAkcGFyZW50ID8gJHBhcmVudC5kYXRhKFwicHJvZHVjdEF0dHJpYnV0ZVwiKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgcmFkaW8gYnV0dG9ucyB0byBnZXQgZGVzZWxlY3RlZFxuICAgKi9cbiAgaW5pdFJhZGlvQXR0cmlidXRlcygpIHtcbiAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIHJhZGlvKSA9PiB7XG4gICAgICBjb25zdCAkcmFkaW8gPSAkKHJhZGlvKTtcblxuICAgICAgLy8gT25seSBiaW5kIHRvIGNsaWNrIG9uY2VcbiAgICAgIGlmICgkcmFkaW8uYXR0cihcImRhdGEtc3RhdGVcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAkcmFkaW8ub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCRyYWRpby5kYXRhKFwic3RhdGVcIikgPT09IHRydWUpIHtcbiAgICAgICAgICAgICRyYWRpby5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkcmFkaW8uZGF0YShcInN0YXRlXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgJHJhZGlvLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRyYWRpby5kYXRhKFwic3RhdGVcIiwgdHJ1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pbml0UmFkaW9BdHRyaWJ1dGVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAkcmFkaW8uYXR0cihcImRhdGEtc3RhdGVcIiwgJHJhZGlvLnByb3AoXCJjaGVja2VkXCIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgZnJhZ21lbnQgaWRlbnRpZmllciBpbiBVUkwgcmVxdWVzdGluZyBhIHNwZWNpZmljIHRhYlxuICAgKi9cbiAgZ2V0VGFiUmVxdWVzdHMoKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoXCIjdGFiLVwiKSA9PT0gMCkge1xuICAgICAgY29uc3QgJGFjdGl2ZVRhYiA9ICQoXCIudGFic1wiKS5oYXMoYFtocmVmPScke3dpbmRvdy5sb2NhdGlvbi5oYXNofSddYCk7XG4gICAgICBjb25zdCAkdGFiQ29udGVudCA9ICQoYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YCk7XG5cbiAgICAgIGlmICgkYWN0aXZlVGFiLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJGFjdGl2ZVRhYi5maW5kKFwiLnRhYlwiKS5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKS5oYXMoYFtocmVmPScke3dpbmRvdy5sb2NhdGlvbi5oYXNofSddYCkuYWRkQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICAgICAgJHRhYkNvbnRlbnQuYWRkQ2xhc3MoXCJpcy1hY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIGFueSBlbXB0eSBzdHJpbmcgdmFsdWVzIGZyb20gdGhlIGZvcm1EYXRhXG4gKiBAcGFyYW0gZm9ybURhdGE6IEZvcm1EYXRhIG9iamVjdFxuICogQHJldHVybnMgRm9ybURhdGEgb2JqZWN0XG4qL1xuZXhwb3J0IGNvbnN0IGZpbHRlckVtcHR5VmFsdWVzRnJvbUZvcm0gPSBmb3JtRGF0YSA9PiB7XG4gICAgY29uc3QgcmVzID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICB0cnkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgZm9ybURhdGEpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmVzLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTY3Mjk5Mi9hamF4LXJlcXVlc3QtZmFpbHMtd2hlbi1zZW5kaW5nLWZvcm1kYXRhLWluY2x1ZGluZy1lbXB0eS1maWxlLWlucHV0LWluLXNhZmFyaVxuICogU2FmYXJpIGJyb3dzZXIgd2l0aCBqcXVlcnkgMy4zLjEgaGFzIGFuIGlzc3VlIHVwbG9hZGluZyBlbXB0eSBmaWxlIHBhcmFtZXRlcnMuIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBhbnkgZW1wdHkgZmlsZXMgZnJvbSB0aGUgZm9ybSBwYXJhbXNcbiAqIEBwYXJhbSBmb3JtRGF0YTogRm9ybURhdGEgb2JqZWN0XG4gKiBAcmV0dXJucyBGb3JtRGF0YSBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlckVtcHR5RmlsZXNGcm9tRm9ybSA9IGZvcm1EYXRhID0+IHtcbiAgICBjb25zdCByZXMgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBmb3JtRGF0YSkge1xuICAgICAgICAgICAgaWYgKCEodmFsIGluc3RhbmNlb2YgRmlsZSkgfHwgdmFsLm5hbWUgfHwgdmFsLnNpemUpIHtcbiAgICAgICAgICAgICAgICByZXMuYXBwZW5kKGtleSwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIGVtcHR5IHN0cmluZyB2YWx1ZXMgYW5kIGVtcHR5IGZpbGVzIGZyb20gdGhlIGZvcm1EYXRhXG4gKiBAcGFyYW0gZm9ybURhdGE6IEZvcm1EYXRhIG9iamVjdFxuICogQHJldHVybnMgRm9ybURhdGEgb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBub3JtYWxpemVGb3JtRGF0YSA9IGZvcm1EYXRhID0+IGZpbHRlckVtcHR5VmFsdWVzRnJvbUZvcm0oZmlsdGVyRW1wdHlGaWxlc0Zyb21Gb3JtKGZvcm1EYXRhKSk7XG4iLCJleHBvcnQgY29uc3QgaXNCcm93c2VySUUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdUcmlkZW50Jyk7XG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0SW50b0FycmF5ID0gY29sbGVjdGlvbiA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjb2xsZWN0aW9uKTtcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tIFwiLi9wYWdlLW1hbmFnZXJcIjtcbmltcG9ydCBSZXZpZXcgZnJvbSBcIi4vcHJvZHVjdC9yZXZpZXdzXCI7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gXCIuL2NvbW1vbi9jb2xsYXBzaWJsZVwiO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gXCIuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHNcIjtcbmltcG9ydCB2aWRlb0dhbGxlcnkgZnJvbSBcIi4vcHJvZHVjdC92aWRlby1nYWxsZXJ5XCI7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tIFwiLi9jb21tb24vdXRpbHMvZm9ybS11dGlsc1wiO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBtb2RhbFR5cGVzIH0gZnJvbSBcIi4vZ2xvYmFsL21vZGFsXCI7XG5cbmltcG9ydCB7IG5vcm1hbGl6ZUZvcm1EYXRhIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzL2FwaVwiO1xuLy8gaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBzaG93QWxlcnRNb2RhbCwgbW9kYWxUeXBlcyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IGpxdWVyeW1hdGNoaGVpZ2h0IGZyb20gXCJqcXVlcnktbWF0Y2gtaGVpZ2h0XCI7XG5cbmltcG9ydCBjYXJvdXNlbCBmcm9tIFwiLi9jb21tb24vY2Fyb3VzZWxcIjtcbmltcG9ydCB7IGdldEhleEZyb21Db2xvck5hbWUgfSBmcm9tIFwiLi9jdXN0b20vbnRjXCI7XG5cbmNvbnN0IHsgV1JJVEVfUkVWSUVXIH0gPSBtb2RhbFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KFwiI21vZGFsLXJldmlldy1mb3JtXCIpWzBdO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgJChkb2N1bWVudCkub24oXCJjbG9zZS5mbmR0bi5yZXZlYWxcIiwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoXCIjd3JpdGVfcmV2aWV3XCIpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHZhbGlkYXRvcjtcblxuICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJChcIi5wcm9kdWN0Vmlld1wiKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuXG4gICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZUNvbG91cnMoKTtcblxuICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG5cbiAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybShcIi53cml0ZVJldmlldy1mb3JtXCIpO1xuXG4gICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xuICAgICAgJChkb2N1bWVudCkub24oXCJvcGVuZWQuZm5kdG4ucmV2ZWFsXCIsICgpID0+IHRoaXMucmV2aWV3TW9kYWwuc2V0dXBGb2N1c2FibGVFbGVtZW50cyhXUklURV9SRVZJRVcpKTtcbiAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xuICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcbiAgICAgIH0pO1xuICAgICAgJHJldmlld0Zvcm0ub24oXCJzdWJtaXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKFwidmFsaWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ3Byb2R1Y3R0dHR0dHR0dHR0dHR0dHR0dHR0dC5qcycpO1xuXG4gICAgLy8gbG9hZHMgdGhlIHZhcmlhbnRzIHN0b2NrIGxldmVsXG4gICAgLy8gdGhpcy5nZXRWYXJpYW50U3RvY2tMZXZlbHMoKTtcbiAgICB0aGlzLnBsYXlWaWRlbygpO1xuXG4gICAgdmFyIG1haW5Qcm9kdWN0SUQgPSAkKCdpbnB1dFtuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbCgpO1xuICAgIHZhciBwcm9QcmljZSA9ICQoXCIucHJvZHVjdFZpZXctcHJpY2UgLnByaWNlLXNlY3Rpb24gLm1haW5Mb2FkZWRQcmljZVwiKS50ZXh0KCk7XG4gICAgLy8gdmFyIGRpc2NvdW50ZWRQcmljZSA9IChOdW1iZXIocHJvUHJpY2UudHJpbSgpLnJlcGxhY2UoXCIkXCIsXCJcIikpKk51bWJlcigwLjkwKSkudG9GaXhlZCgyKTtcbiAgICAvLyAkKFwiLmRpc2NvdW50ZWRQcmljZVNpbmdsZVBhZ2UtXCIrbWFpblByb2R1Y3RJRCkuaHRtbChcIiRcIitkaXNjb3VudGVkUHJpY2UpO1xuXG4gICAgLy8gdGhpcy5Mb2FkUHJvZHVjdFNpemVzU2VhcmNoKCk7XG5cbiAgICAkKFwiLnByb2R1Y3RWaWV3LW9wdGlvbnNfX2Jsb2NrIGxhYmVsXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNpemUgPSAkKHRoaXMpLmZpbmQoXCJzcGFuXCIpLmh0bWwoKTtcblxuICAgICAgdmFyIHN0b2NrID0gJCgnc3BhbltkYXRhLXZhcmlhbnQ9XCInICsgc2l6ZSArICdcIl0nKS5odG1sKCk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHNpemUgKyBcIiBoYXMgc3RvY2sgXCIgKyBzdG9jayk7XG5cbiAgICAgIGlmIChzdG9jayA8IDYpIHtcbiAgICAgICAgJChcIi5wcm9kdWN0Vmlldy1vcHRpb25zX19zdG9ja1wiKS5zaG93KCkuZmluZChcIi5zdG9jay1xdHlcIikuaHRtbChzdG9jayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLnByb2R1Y3RWaWV3LW9wdGlvbnNfX3N0b2NrXCIpLmhpZGUoKS5maW5kKFwiLnN0b2NrLXF0eVwiKS5odG1sKFwiXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tb3JlQ29sb3Vyc0Nhcm91c2VsKCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwid2luZG93IGxvYWRlZFwiKTtcblxuICAgICAgJChcIi5NYWdpY1pvb21HYWxsZXJ5XCIpXG4gICAgICAgIC5maW5kKFwiaWZyYW1lXCIpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJtYWdpY1wiLCAkKHRoaXMpKTtcblxuICAgICAgICAgIHZhciBzcmMgPSAkKHRoaXMpLmF0dHIoXCJzcmNcIik7XG4gICAgICAgICAgaWYgKHNyYyAmJiAoc3JjLmluY2x1ZGVzKFwieW91dHViZVwiKSB8fCBzcmMuaW5jbHVkZXMoXCJ2aW1lb1wiKSkpIHtcbiAgICAgICAgICAgIHNyYyArPSBcIiZyZWw9MCZmcz0wJmNvbnRyb2xzPTBcIjtcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcInNyY1wiLCBzcmMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcmNcIiwgc3JjKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZGF0YV9zcmMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNyY1wiKTtcbiAgICAgICAgICBpZiAoZGF0YV9zcmMgJiYgKGRhdGFfc3JjLmluY2x1ZGVzKFwieW91dHViZVwiKSB8fCBkYXRhX3NyYy5pbmNsdWRlcyhcInZpbWVvXCIpKSkge1xuICAgICAgICAgICAgZGF0YV9zcmMgKz0gXCImcmVsPTAmZnM9MCZjb250cm9scz0wXCI7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNyY1wiLCBkYXRhX3NyYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFfc3JjXCIsIGRhdGFfc3JjKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbW9yZUNvbG91cnNDYXJvdXNlbCgpIHtcbiAgICB2YXIgYnJhbmRTZWxlY3RvciA9ICQoXCJbZGF0YS1icmFuZF1cIik7XG4gICAgdmFyIGJyYW5kTmFtZSA9IGJyYW5kU2VsZWN0b3IuYXR0cihcImRhdGEtYnJhbmRcIik7XG4gICAgdmFyIGJyYW5kVXJsID0gXCIvYnJhbmRzL1wiICsgYnJhbmROYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpICsgXCIvXCI7XG5cbiAgICBsZXQgY2Fyb3VzZWxTZXR0aW5ncyA9IHtcbiAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAvLyBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgc2xpZGU6IFwiLmpzLXByb2R1Y3Qtc2xpZGVcIixcbiAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNTUwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB1dGlscy5hcGkuZ2V0UGFnZShicmFuZFVybCwgXCIvdGVtcGxhdGVzL2JyYW5kXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICB2YXIgc2xpZGVyID0gJChyZXNwb25zZSkuZmluZChcIiNicmFuZHByb2R1Y3RzLXNsaWRlclwiKS5odG1sKCk7XG5cbiAgICAgIHZhciBub29mc2xpZGVycyA9ICQoc2xpZGVyKS5maW5kKFwiYXJ0aWNsZVwiKS5sZW5ndGg7XG4gICAgICBcbiAgICAgIGlmIChub29mc2xpZGVycyA8IDIpIHtcbiAgICAgICAgJChcIi5tb3JlLWNvbG91cnMtYmxvY2tcIikucmVtb3ZlQ2xhc3MoXCJkLW1kLWJsb2NrXCIpO1xuICAgICAgICAkKFwiLm1vcmUtY29sb3Vycy1tb2JpbGVcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuaHRtbChzbGlkZXIpLnNsaWNrKGNhcm91c2VsU2V0dGluZ3MpO1xuICAgICAgICAvLyAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuc2xpY2soY2Fyb3VzZWxTZXR0aW5ncyk7XG4gICAgICB9XG4gICAgICBpZihub29mc2xpZGVycyA8PSAyKXtcbiAgICAgICAgJCgnLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2InKS5zbGljaygndW5zbGljaycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5tb3JlLWNvbG91cnMtbW9iaWxlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInNsaWNrb25jbGlja1wiKSkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2xpY2tvbmNsaWNrXCIpO1xuICAgICAgICAkKFwiLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2JcIikuc2xpY2soXCJkZXN0cm95XCIpLnNsaWNrKGNhcm91c2VsU2V0dGluZ3MpO1xuICAgICAgfVxuICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoYnJhbmRVcmwsIFwiL3RlbXBsYXRlcy9icmFuZFwiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICB2YXIgc2xpZGVyID0gJChyZXNwb25zZSkuZmluZChcIiNicmFuZHByb2R1Y3RzLXNsaWRlclwiKS5odG1sKCk7XG4gIFxuICAgICAgICB2YXIgbm9vZnNsaWRlcnMgPSAkKHNsaWRlcikuZmluZChcImFydGljbGVcIikubGVuZ3RoO1xuICAgICAgICAvLyBhbGVydChub29mc2xpZGVycyk7XG4gICAgICAgIGlmIChub29mc2xpZGVycyA8PSAyKSB7XG4gICAgICAgICAgJCgnLmxvYWRhdmFpbGFibGVwcm9kdWN0cy1tb2InKS5zbGljaygndW5zbGljaycpO1xuICAgICAgICB9IFxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHRyYW5zbGF0ZUNvbG91cnMoKSB7XG4gICAgJChcIltkYXRhLWZvcm1hdGJnXVwiKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICBjb25zdCBiZyA9ICQodGhpcykuYXR0cihcImRhdGEtZm9ybWF0YmdcIik7XG4gICAgICAkKHRoaXMpLmNzcyhcImJhY2tncm91bmRcIiwgZ2V0SGV4RnJvbUNvbG9yTmFtZShiZykpO1xuICAgIH0pO1xuICB9XG5cbiAgTG9hZFByb2R1Y3RTaXplc1NlYXJjaCgpIHtcbiAgICB2YXIgbGlzdFByb2R1Y3RzID0gJChcIi5wcm9kdWN0LWN1c3RvbWVydmlld2VkIC5zbGljay1saXN0IC5zbGljay10cmFjayAucHJvZHVjdENhcm91c2VsLXNsaWRlXCIpO1xuXG4gICAgbGlzdFByb2R1Y3RzLmVhY2goZnVuY3Rpb24gKGlkLCBsaSkge1xuICAgICAgLy92YXIgUHJvZHVjdCA9ICQobGkpO1xuICAgICAgdmFyIHByb0lEID0gJCh0aGlzKS5maW5kKFwiLlByb2R1Y3RJRHNcIikudGV4dCgpO1xuICAgICAgdmFyIGZvclByb0lEID0gJCh0aGlzKS5maW5kKFwiLlByb2R1Y3RJRHNPbmx5XCIpLnRleHQoKTtcbiAgICAgIHZhciBwcm9QcmljZSA9ICQodGhpcykuZmluZChcIi5tYWluTG9hZGVkUHJpY2VcIikudGV4dCgpO1xuICAgICAgdmFyIGRpc2NvdW50ZWRQcmljZSA9IChOdW1iZXIocHJvUHJpY2UudHJpbSgpLnJlcGxhY2UoXCIkXCIsIFwiXCIpKSAqIE51bWJlcigwLjkpKS50b0ZpeGVkKDIpO1xuICAgICAgLy9jb25zb2xlLmxvZyhkaXNjb3VudGVkUHJpY2UpO1xuICAgICAgLy9jb25zb2xlLmxvZyhwcm9QcmljZSk7XG5cbiAgICAgICQoXCIuZGlzY291bnRlZFByaWNlQ2F0ZWdvcnktXCIgKyBmb3JQcm9JRCkuaHRtbChcIiRcIiArIGRpc2NvdW50ZWRQcmljZSk7XG5cbiAgICAgIGlmIChwcm9JRCA9PSBcIk5PXCIpIHJldHVybjtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvSUQpO1xuXG4gICAgICAkKFwiI2xvYWRRdWlja1ZpZXctXCIgKyBwcm9JRCkuaHRtbChcbiAgICAgICAgJzxkaXYgaWQ9XCJsb2FkZXJpbWFnZVwiIGNsYXNzPVwibG9hZGluZ092ZXJsYXkgbG9hZGluZ092ZXJsYXktLXRyYW5zaXRpb25cIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY24tbG9hZGVyXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIiB2aWV3Qm94PVwiMCAwIDIwIDE3LjlcIj48cGF0aCBkPVwiTTE5LjIgNS43YTUgNSAwIDAxLTEuNCAzLjVMMTAgMTYuOSAyLjIgOS4yQzEuMyA4LjIuOCA3IC44IDUuN2MwLTEuMy41LTIuNSAxLjQtMy41QzMuMSAxLjMgNC40LjggNS43LjhzMi41LjUgMy41IDEuNGwuMi4yLjYuOC42LS43LjItLjJBNSA1IDAgMDExNC4zLjljMS4zIDAgMi41LjUgMy41IDEuNC45LjkgMS40IDIuMSAxLjQgMy40elwiIGNsYXNzPVwiaWNuLXdpc2hsaXN0X19oZWFydFwiPjwvcGF0aD48cGF0aCBkPVwiTTE4LjMgMS43YTUuOCA1LjggMCAwMC00LTEuN2MtMS41IDAtMi45LjYtNCAxLjdMMTAgMmwtLjMtLjNhNS42IDUuNiAwIDAwLTQtMS43Yy0xLjUgMC0yLjkuNi00IDEuN2E1LjggNS44IDAgMDAwIDguMWw4IDggLjQuMS4zLS4xIDgtOGE1LjcgNS43IDAgMDAtLjEtOC4xek01LjcuOGMxLjMgMCAyLjUuNSAzLjUgMS40bC4yLjIuNi44LjYtLjcuMi0uMkE1IDUgMCAwMTE0LjMuOWMxLjMgMCAyLjUuNSAzLjUgMS40LjkuOSAxLjQgMi4xIDEuNCAzLjVhNSA1IDAgMDEtMS40IDMuNUwxMCAxNi45IDIuMiA5LjJDMS4zIDguMi44IDcgLjggNS43YzAtMS4zLjUtMi41IDEuNC0zLjVDMy4yIDEuMyA0LjQuOCA1LjcuOHpcIiBjbGFzcz1cImljbi13aXNobGlzdF9fc3Ryb2tlXCI+PC9wYXRoPjwvc3ZnPjwvZGl2PidcbiAgICAgICk7XG4gICAgICAvL3JldHVybjtcblxuICAgICAgLy8gbG9hZCBzaXplc1xuICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwcm9JRCwgeyB0ZW1wbGF0ZTogXCJwcm9kdWN0cy9xdWljay12aWV3LW9wdGlvbnNcIiB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXZhaWxhYmxlU2l6ZXMgPSBcIlwiO1xuICAgICAgICAkKHJlc3BvbnNlKVxuICAgICAgICAgIC5maW5kKFwiLmZvcm0tb3B0aW9uXCIpXG4gICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGksIG9iaikge1xuICAgICAgICAgICAgdmFyIGlucHV0SUQgPSAkKHRoaXMpLmF0dHIoXCJmb3JcIik7XG4gICAgICAgICAgICB2YXIgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVcIik7XG4gICAgICAgICAgICB2YXIgYXR0cl9uYW1lID0gJChyZXNwb25zZSlcbiAgICAgICAgICAgICAgLmZpbmQoXCIjXCIgKyBpbnB1dElEKVxuICAgICAgICAgICAgICAuYXR0cihcIm5hbWVcIik7XG5cbiAgICAgICAgICAgIGF2YWlsYWJsZVNpemVzICs9XG4gICAgICAgICAgICAgIFwiPGxhYmVsIGlkPSdcIiArXG4gICAgICAgICAgICAgIHByb0lEICtcbiAgICAgICAgICAgICAgXCInIGNsYXNzPSdmb3JtLW9wdGlvbiB1bmF2YWlsYWJsZWluTGlzdCBJc1Byb2RBdmFpbGFibGUtXCIgK1xuICAgICAgICAgICAgICBwcm9JRCArXG4gICAgICAgICAgICAgIFwiLVwiICtcbiAgICAgICAgICAgICAgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSArXG4gICAgICAgICAgICAgIFwiIGFkZC1tZS10by1jYXJ0JyBkYXRhLXBvcHVwLXR5cGU9J2FkZC10by1iYWcnIGZvcj0nXCIgK1xuICAgICAgICAgICAgICBpbnB1dElEICtcbiAgICAgICAgICAgICAgXCInIGRhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWU9J1wiICtcbiAgICAgICAgICAgICAgZGF0YV9wcm9kdWN0X2F0dHJpYnV0ZV92YWx1ZSArXG4gICAgICAgICAgICAgIFwiJyBuYW1lPSdcIiArXG4gICAgICAgICAgICAgIGF0dHJfbmFtZSArXG4gICAgICAgICAgICAgIFwiJyA+PGEgaHJlZj0namF2YXNjcmlwdDp2b2lkKDApOycgY2xhc3M9J2NhcmQtc2l6ZS1vcHRpb24nIGRhdGEtcmV2ZWFsLWlkPSdhZGQtZnJvbS1zaXplJyA+XCIgK1xuICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoKSArXG4gICAgICAgICAgICAgIFwiPC9hPjwvbGFiZWw+XCI7XG5cbiAgICAgICAgICAgICQoXCIjbG9hZFF1aWNrVmlldy1cIiArIHByb0lEKS5odG1sKGF2YWlsYWJsZVNpemVzKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIrK1wiKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9JRCwgXCJwcm9kdWN0X2lkPVwiICsgcHJvSUQsIFwicHJvZHVjdHMvcXVpY2stdmlldy1vcHRpb25zXCIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGZyb20gcmVzcG9uc2UgZ2V0IHRoZSBhdmFpbGFibGUgYXR0cmlidXRlc1xuXG4gICAgICAgICAgICAgIHZhciBwcm9kdWN0QXR0cmlidXRlcyA9IHJlc3BvbnNlLmRhdGEuYXZhaWxhYmxlX3ZhcmlhbnRfdmFsdWVzO1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3RBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgaWYgKHByb2R1Y3RBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0QXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtYmVyK1wiID09IFwiKTtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJChhdmFpbGFibGVTaXplcykuZmluZChcIi5JblByb2RBdmFpbGFibGVcIikpO1xuICAgICAgICAgICAgICAgICAgJChcIi5Jc1Byb2RBdmFpbGFibGUtXCIgKyBwcm9JRCArIFwiLVwiICsgbnVtYmVyKS5yZW1vdmVDbGFzcyhcInVuYXZhaWxhYmxlaW5MaXN0XCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgJGZvcm0uZmluZChcIltkYXRhLWlucHV0XVwiKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cihcIm5hbWVcIil9LW1zZ2A7XG5cbiAgICAgICRpbnB1dC5zaWJsaW5ncyhcInNwYW5cIikuYXR0cihcImlkXCIsIG1zZ1NwYW5JZCk7XG4gICAgICAkaW5wdXQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgbXNnU3BhbklkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI3dyaXRlX3Jldmlld1wiKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxuXG4gIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiNidWxrX3ByaWNpbmdcIikgIT09IC0xKSB7XG4gICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxvYWRpbmcgdmFyaWFudHMgc3RvY2sgbGV2ZWxcbiAgZ2V0VmFyaWFudFN0b2NrTGV2ZWxzKCkge1xuICAgIGNvbnN0ICRvcHRpb25TZXQgPSAkKFwiW2RhdGEtcHJvZHVjdC1vcHRpb24tY2hhbmdlXVwiKTtcbiAgICBjb25zdCAkZm9ybSA9ICRvcHRpb25TZXQucGFyZW50cygkKFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJGZvcm0pLnZhbCgpO1xuICAgIGNvbnN0ICRvcHRpb25zQXJyYXkgPSAkb3B0aW9uU2V0LmZpbmQoXCIuZm9ybS1yYWRpb1wiKTtcbiAgICAvLyBjb25zb2xlLmxvZygnJG9wdGlvbnNBcnJheScsICRvcHRpb25zQXJyYXkpO1xuXG4gICAgaWYgKCRvcHRpb25zQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgJChcIi5wcm9kdWN0Vmlldy1vcHRpb25zX19ibG9ja1wiKS5zaG93KCk7XG4gICAgICAkKFwiI2xvYWRlcmltYWdlU3RvY2tzaG93XCIpLnNob3coKTtcbiAgICAgICQuZWFjaCgkb3B0aW9uc0FycmF5LCAoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlSWQgPSAkKGl0ZW0pLmF0dHIoXCJuYW1lXCIpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVJZElEID0gJChpdGVtKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRTaXplID0gJCgnW2Zvcj1cIicgKyBhdHRyaWJ1dGVJZElEICsgJ1wiXScsICRmb3JtKVxuICAgICAgICAgIC50ZXh0KClcbiAgICAgICAgICAudHJpbSgpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9ICQoaXRlbSkudmFsKCk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGAke2F0dHJpYnV0ZUlkfT0ke2F0dHJpYnV0ZVZhbHVlfWA7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsIGF0dHJpYnV0ZSwgXCJwcm9kdWN0cy9wcm9kdWN0LXZpZXctb3B0aW9uc1wiLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0b2NrID4gMCkge1xuICAgICAgICAgICAgdmFyIHByb2dyZXNzQmFySHRtbCA9IFwiXCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJiay1zdG9jay1jb3VudGRvd25cIj4nO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJzdG9jay1jb3VudGRvd24tbWVzc2FnZVwiPic7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPGRpdiBjbGFzcz1cIm1lc3NhZ2VfX3RleHRcIj4nO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9ICc8c3BhbiBjbGFzcz1cIm1lc3NhZ2VfX3NpemUgZm9udC13ZWlnaHQtYm9sZCB0ZXh0LXVwcGVyY2FzZVwiPlNpemUgJyArIHZhcmlhbnRTaXplICsgXCI8L3NwYW4+IExlc3MgdGhhbiBcIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPHNwYW4gZGF0YS12YXJpYW50PVwiJyArIHZhcmlhbnRTaXplICsgJ1wiIGNsYXNzPVwidmFyaWFudC1zdG9jayBmb250LXdlaWdodC1ib2xkXCI+JyArIHJlc3BvbnNlLmRhdGEuc3RvY2sgKyBcIjwvc3Bhbj5cIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIiBsZWZ0IGluIHN0b2NrICEhIVwiO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXJIdG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgYmx1ZSBzdHJpcGVzXCI+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSAnPHNwYW4gc3R5bGU9XCJ3aWR0aDogJyArIHJlc3BvbnNlLmRhdGEuc3RvY2sgKyAnJTtcIj48L3NwYW4+JztcbiAgICAgICAgICAgIHByb2dyZXNzQmFySHRtbCArPSBcIjwvZGl2PlwiO1xuXG4gICAgICAgICAgICBwcm9ncmVzc0Jhckh0bWwgKz0gXCI8L2Rpdj5cIjtcblxuICAgICAgICAgICAgJChcIiNsb2FkUHJvZHVjdFZhcmlhbnRCYXJzXCIpLmFwcGVuZChwcm9ncmVzc0Jhckh0bWwpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuc2t1LCByZXNwb25zZS5kYXRhLnN0b2NrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChcIiNsb2FkZXJpbWFnZVN0b2Nrc2hvd1wiKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcGxheVZpZGVvKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJmcm9tIHBsYXkgdmlkZW9cIik7XG5cbiAgICAkKFwiLnBsYXlMb2FkZWRWaWRlb1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2aWRlb0lEID0gJCh0aGlzKS5hdHRyKFwiZGF0YS12aWRlby1pZFwiKTtcbiAgICAgIHZhciB2aWV3cG9ydGhlaWdodCA9ICQoXCIucHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lclwiKS5oZWlnaHQoKTtcbiAgICAgIHZhciB2aWV3cG9ydHdpZHRoID0gJChcIi5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyXCIpLndpZHRoKCk7XG4gICAgICB2YXIgZW1iZWRDb2RlID1cbiAgICAgICAgJzxpZnJhbWUgaWQ9XCJkb05vdFBsYXlNZUFueU1vcmVcIiB0eXBlPVwidGV4dC9odG1sXCIgd2lkdGg9XCInICtcbiAgICAgICAgdmlld3BvcnR3aWR0aCArXG4gICAgICAgICdcIiBoZWlnaHQ9XCInICtcbiAgICAgICAgdmlld3BvcnRoZWlnaHQgK1xuICAgICAgICAnXCIgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArXG4gICAgICAgIHZpZGVvSUQgK1xuICAgICAgICAnP2F1dG9wbGF5PTEmbXV0ZT0wXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhdXRvcGxheTtcIj48L2lmcmFtZT4nO1xuICAgICAgLy9jb25zb2xlLmxvZyh2aWRlb0lEKTtcblxuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLmh0bWwoZW1iZWRDb2RlKTtcbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5zaG93KCk7XG4gICAgICAkKFwiLmxvYWRJbWFnZUhlcmVcIikuaGlkZSgpO1xuICAgICAgJChcIiNwcm9kdWN0VmlkZW9cIikuYWRkQ2xhc3MoXCJkaXNhYmxlWm9vbVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwidmlkZW8gY2xpY2tlZFwiKTtcbiAgICB9KTtcblxuICAgICQoXCIuaW1hZ2VUaHVtYm5haWxDbGlja2VkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8kKFwiI2RvTm90UGxheU1lQW55TW9yZVwiKS5yZW1vdmUoKTtcbiAgICAgICQoXCIubG9hZFZpZGVvSGVyZVwiKS5odG1sKFwiXCIpO1xuICAgICAgJChcIi5sb2FkVmlkZW9IZXJlXCIpLmhpZGUoKTtcbiAgICAgICQoXCIubG9hZEltYWdlSGVyZVwiKS5zaG93KCk7XG4gICAgICAkKFwiI3Byb2R1Y3RWaWRlb1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVab29tXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJJbWFnZSBDbGlja2VkXCIpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgJ2Vhc3l6b29tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VHYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZ2FsbGVyeSkge1xuICAgICAgICB0aGlzLiRtYWluSW1hZ2UgPSAkZ2FsbGVyeS5maW5kKCdbZGF0YS1pbWFnZS1nYWxsZXJ5LW1haW5dJyk7XG4gICAgICAgIHRoaXMuJG1haW5JbWFnZU5lc3RlZCA9ICRnYWxsZXJ5LmZpbmQoJ1tkYXRhLW1haW4taW1hZ2VdJyk7XG4gICAgICAgIHRoaXMuJHNlbGVjdGFibGVJbWFnZXMgPSAkZ2FsbGVyeS5maW5kKCdbZGF0YS1pbWFnZS1nYWxsZXJ5LWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudEltYWdlID0ge307XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2Vab29tKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpbkltYWdlKGltZ09iaikge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHsgLi4uaW1nT2JqIH07XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgICAgICB0aGlzLnN3YXBNYWluSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBzZXRBbHRlcm5hdGVJbWFnZShpbWdPYmopIHtcbiAgICAgICAgaWYgKCF0aGlzLnNhdmVkSW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZWRJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBtYWluSW1hZ2VVcmw6IHRoaXMuJG1haW5JbWFnZS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcbiAgICAgICAgICAgICAgICB6b29tSW1hZ2VVcmw6IHRoaXMuJG1haW5JbWFnZS5hdHRyKCdkYXRhLXpvb20taW1hZ2UnKSxcbiAgICAgICAgICAgICAgICBtYWluSW1hZ2VTcmNzZXQ6IHRoaXMuJG1haW5JbWFnZS5maW5kKCdpbWcnKS5hdHRyKCdzcmNzZXQnKSxcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogdGhpcy5jdXJyZW50SW1hZ2UuJHNlbGVjdGVkVGh1bWIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TWFpbkltYWdlKGltZ09iaik7XG4gICAgfVxuXG4gICAgcmVzdG9yZUltYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5zYXZlZEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE1haW5JbWFnZSh0aGlzLnNhdmVkSW1hZ2UpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2F2ZWRJbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5ld0ltYWdlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBpbWdPYmogPSB7XG4gICAgICAgICAgICBtYWluSW1hZ2VVcmw6ICR0YXJnZXQuYXR0cignZGF0YS1pbWFnZS1nYWxsZXJ5LW5ldy1pbWFnZS11cmwnKSxcbiAgICAgICAgICAgIHpvb21JbWFnZVVybDogJHRhcmdldC5hdHRyKCdkYXRhLWltYWdlLWdhbGxlcnktem9vbS1pbWFnZS11cmwnKSxcbiAgICAgICAgICAgIG1haW5JbWFnZVNyY3NldDogJHRhcmdldC5hdHRyKCdkYXRhLWltYWdlLWdhbGxlcnktbmV3LWltYWdlLXNyY3NldCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgICAgICBtYWluSW1hZ2VBbHQ6ICR0YXJnZXQuY2hpbGRyZW4oKS5maXJzdCgpLmF0dHIoJ2FsdCcpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldE1haW5JbWFnZShpbWdPYmopO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiRzZWxlY3RhYmxlSW1hZ2VzLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlLiRzZWxlY3RlZFRodW1iKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZS4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzd2FwTWFpbkltYWdlKCkge1xuICAgICAgICBjb25zdCBpc0Jyb3dzZXJJRSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ1RyaWRlbnQnKTtcblxuICAgICAgICB0aGlzLmVhc3l6b29tLmRhdGEoJ2Vhc3lab29tJykuc3dhcChcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlLm1haW5JbWFnZVVybCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlLnpvb21JbWFnZVVybCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlLm1haW5JbWFnZVNyY3NldCxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLiRtYWluSW1hZ2UuYXR0cih7XG4gICAgICAgICAgICAnZGF0YS16b29tLWltYWdlJzogdGhpcy5jdXJyZW50SW1hZ2Uuem9vbUltYWdlVXJsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kbWFpbkltYWdlTmVzdGVkLmF0dHIoe1xuICAgICAgICAgICAgYWx0OiB0aGlzLmN1cnJlbnRJbWFnZS5tYWluSW1hZ2VBbHQsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5jdXJyZW50SW1hZ2UubWFpbkltYWdlQWx0LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNCcm93c2VySUUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrU3R5bGVzSUUgPSB7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiBgdXJsKCR7dGhpcy5jdXJyZW50SW1hZ2UubWFpbkltYWdlVXJsfSZhbXBpbWJ5cGFzcz1vbilgLFxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcmVwZWF0JzogJ25vLXJlcGVhdCcsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtb3JpZ2luJzogJ2NvbnRlbnQtYm94JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogJ2NvbnRhaW4nLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy4kbWFpbkltYWdlTmVzdGVkLmNzcyhmYWxsYmFja1N0eWxlc0lFKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9ICQoJy5wcm9kdWN0Vmlldy1pbWFnZScpLmhlaWdodCgpO1xuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9ICQoJy5wcm9kdWN0Vmlldy1pbWFnZScpLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWFzeXpvb20uZGF0YSgnZWFzeVpvb20nKS4kem9vbS5jb250ZXh0LmhlaWdodDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmVhc3l6b29tLmRhdGEoJ2Vhc3lab29tJykuJHpvb20uY29udGV4dC53aWR0aDtcbiAgICAgICAgaWYgKGhlaWdodCA8IGNvbnRhaW5lckhlaWdodCB8fCB3aWR0aCA8IGNvbnRhaW5lcldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmVhc3l6b29tLmRhdGEoJ2Vhc3lab29tJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2Vab29tKCkge1xuICAgICAgICB0aGlzLmVhc3l6b29tID0gdGhpcy4kbWFpbkltYWdlLmVhc3lab29tKHtcbiAgICAgICAgICAgIG9uU2hvdzogKCkgPT4gdGhpcy5jaGVja0ltYWdlKCksXG4gICAgICAgICAgICBlcnJvck5vdGljZTogJycsXG4gICAgICAgICAgICBsb2FkaW5nTm90aWNlOiAnJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kc2VsZWN0YWJsZUltYWdlcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld0ltYWdlLmJpbmQodGhpcykpO1xuICAgIH1cbn1cbiIsImltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgeyBDb2xsYXBzaWJsZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigkcmV2aWV3Rm9ybSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRyZXZpZXdGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcmV2aWV3c0NvbnRlbnQgPSAkKCcjcHJvZHVjdC1yZXZpZXdzJyk7XG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlID0gJCgnW2RhdGEtY29sbGFwc2libGVdJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMuaW5pdExpbmtCaW5kKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UGFnaW5hdGlvbkxpbmsoKTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZVJldmlld3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0aWFsIHBhZ2UgbG9hZCwgdGhlIHVzZXIgY2xpY2tzIG9uIFwiKDEyIFJldmlld3MpXCIgbGlua1xuICAgICAqIFRoZSBicm93c2VyIGp1bXBzIHRvIHRoZSByZXZpZXcgcGFnZSBhbmQgc2hvdWxkIGV4cGFuZCB0aGUgcmV2aWV3cyBzZWN0aW9uXG4gICAgICovXG4gICAgaW5pdExpbmtCaW5kKCkge1xuICAgICAgICBjb25zdCAkY29udGVudCA9ICQoJyNwcm9kdWN0UmV2aWV3cy1jb250ZW50JywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdMaW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld1RhYkxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcbiAgICAgICAgLy8gV2UncmUgaW4gcGFnaW5hdGluZyBzdGF0ZSwgZG8gbm90IGNvbGxhcHNlXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKCcjcHJvZHVjdC1yZXZpZXdzJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgSUQgaW50byB0aGUgcGFnaW5hdGlvbiBsaW5rXG4gICAgICovXG4gICAgaW5qZWN0UGFnaW5hdGlvbkxpbmsoKSB7XG4gICAgICAgIGNvbnN0ICRuZXh0TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICBpZiAoJG5leHRMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclZhbGlkYXRpb24oY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoW3tcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZyYXRpbmdcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdSYXRpbmcsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld1N1YmplY3QsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0ZXh0XCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3Q29tbWVudCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICcud3JpdGVSZXZpZXctZm9ybSBbbmFtZT1cImVtYWlsXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG4gICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdFbWFpbCxcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0ICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24vZm91bmRhdGlvbic7XG5pbXBvcnQgJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi9mb3VuZGF0aW9uLnJldmVhbCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IGpxdWVyeW1hdGNoaGVpZ2h0IGZyb20gJ2pxdWVyeS1tYXRjaC1oZWlnaHQnO1xuaW1wb3J0IEdxbCBmcm9tICcuL2N1c3RvbS9ncWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXNoTGlzdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnYWNjb3VudC9hZGQtd2lzaGxpc3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb25maXJtIGJveCBiZWZvcmUgZGVsZXRpbmcgYWxsIHdpc2ggbGlzdHNcbiAgICAgKi9cbiAgICB3aXNobGlzdERlbGV0ZUNvbmZpcm0oKSB7XG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtd2lzaGxpc3QtZGVsZXRlXScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKHRoaXMuY29udGV4dC53aXNobGlzdERlbGV0ZSk7XG5cbiAgICAgICAgICAgIGlmIChjb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJBZGRXaXNoTGlzdFZhbGlkYXRpb24oJGFkZFdpc2hsaXN0Rm9ybSkge1xuICAgICAgICB0aGlzLmFkZFdpc2hsaXN0VmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJy53aXNobGlzdC1mb3JtIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFdpc2hsaXN0VmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcud2lzaGxpc3QtZm9ybSBpbnB1dFtuYW1lPVwid2lzaGxpc3RuYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aCA+IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1lvdSBtdXN0IGVudGVyIGEgd2lzaGxpc3QgbmFtZS4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGFkZFdpc2hsaXN0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRXaXNobGlzdFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkV2lzaGxpc3RWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zdCAkYWRkV2lzaExpc3RGb3JtID0gJCgnLndpc2hsaXN0LWZvcm0nKTtcblxuICAgICAgICBpZiAoJGFkZFdpc2hMaXN0Rm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJBZGRXaXNoTGlzdFZhbGlkYXRpb24oJGFkZFdpc2hMaXN0Rm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndpc2hsaXN0RGVsZXRlQ29uZmlybSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJvbSBXaXNobGlzdCBqc1wiKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjb3B5d2lzaGxpc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0ICRjb3B5VGV4dCA9ICQodGhpcykuYXR0cignZGF0YS1jb3B5Jyk7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCRjb3B5VGV4dCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUZXh0ID0gYnV0dG9uLnRleHQoKTtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICBidXR0b24udGV4dCgn4pyTIENvcGllZCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JpZ2luYWxUZXh0XCIsIG9yaWdpbmFsVGV4dCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dChvcmlnaW5hbFRleHQpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKFwiYnRuLWRhbmdlclwiKTtcbiAgICAgICAgICAgICAgICB9LCA3NTApO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZENsYXNzKFwiYnRuLWRhbmdlclwiKTtcbiAgICAgICAgICAgICAgICBidXR0b24udGV4dCgnRXJyb3InKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB2YXIgbGlzdFByb2R1Y3RzID0gJChcIi5wcm9kdWN0R3JpZCBsaS5wcm9kdWN0XCIpO1xuICAgICAgICAvLyBsaXN0UHJvZHVjdHMuZWFjaChmdW5jdGlvbihpZCwgbGkpIHtcbiAgICAgICAgLy8gICAgIHZhciBwcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzXCIpLnRleHQoKTtcbiAgICAgICAgLy8gICAgIHZhciBmb3JQcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzT25seVwiKS50ZXh0KCk7XG4gICAgICAgIC8vICAgICB2YXIgcHJvUHJpY2UgPSAkKHRoaXMpLmZpbmQoXCIubWFpbkxvYWRlZFByaWNlXCIpLnRleHQoKTtcbiAgICAgICAgLy8gICAgIHZhciBkaXNjb3VudGVkUHJpY2UgPSAoTnVtYmVyKHByb1ByaWNlLnRyaW0oKS5yZXBsYWNlKFwiJFwiLFwiXCIpKSpOdW1iZXIoMC45MCkpLnRvRml4ZWQoMik7XG4gICAgICAgIC8vICAgICAkKFwiLmRpc2NvdW50ZWRQcmljZUNhdGVnb3J5LVwiK2ZvclByb0lEKS5odG1sKFwiJFwiK2Rpc2NvdW50ZWRQcmljZSk7XG4gICAgICAgIC8vICAgICBpZihwcm9JRCA9PSBcIk5PXCIpXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyAgICAgJChcIiNsb2FkUXVpY2tWaWV3LVwiK3Byb0lEKS5odG1sKCc8ZGl2IGlkPVwibG9hZGVyaW1hZ2VcIiBjbGFzcz1cImxvYWRpbmdPdmVybGF5XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj48L2Rpdj4nKTtcbiAgICAgICAgLy8gICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQocHJvSUQsIHsgdGVtcGxhdGU6ICdwcm9kdWN0cy9xdWljay12aWV3LW9wdGlvbnMnIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB2YXIgYXZhaWxhYmxlU2l6ZXMgPSBcIlwiO1xuICAgICAgICAvLyAgICAgICAgICQocmVzcG9uc2UpLmZpbmQoXCIuZm9ybS1vcHRpb25cIikuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZXMgICs9IFwiPGxhYmVsIGNsYXNzPSdmb3JtLW9wdGlvbicgPlwiKyQodGhpcykuaHRtbCgpK1wiPC9sYWJlbD5cIjtcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAkKFwiI2xvYWRRdWlja1ZpZXctXCIrcHJvSUQpLmh0bWwoYXZhaWxhYmxlU2l6ZXMpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICAgICAgdmFyIGFsbElkcyA9IGpRdWVyeSgnLndpc2hMaXN0UHJvZHVjdEdyaWQgW2RhdGEtcHJvZHVjdC1pZF0nKS5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoalF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtcHJvZHVjdC1pZCcpKTtcbiAgICAgICAgfSkuZ2V0KCk7XG4gICAgICAgIG5ldyBHcWwodGhpcy5jb250ZXh0LCBhbGxJZHMudG9TdHJpbmcoKSk7XG5cblxuICAgICAgICAvLyBtYXRjaCBoZWlnaHRcbiAgICAgICAgJCgnLmNhcmQtdGl0bGUnKS5tYXRjaEhlaWdodCgpO1xuXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
