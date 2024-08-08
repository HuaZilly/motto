(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery-match-height */ "./node_modules/jquery-match-height/dist/jquery.matchHeight.js");
/* harmony import */ var jquery_match_height__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery_match_height__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_utils_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/utils/api */ "./assets/js/theme/common/utils/api.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/carousel */ "./assets/js/theme/common/carousel.js");
/* harmony import */ var infinite_scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! infinite-scroll */ "./node_modules/infinite-scroll/js/index.js");
/* harmony import */ var infinite_scroll__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(infinite_scroll__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _custom_gql__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom/gql */ "./assets/js/theme/custom/gql.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }









// import 'slick-carousel';



var Category = /*#__PURE__*/function (_CatalogPage) {
  function Category(context) {
    var _this2;
    _this2 = _CatalogPage.call(this, context) || this;
    _this2.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    _this2.url = window.location.pathname;
    _this2.loaderDiv = '<div id="loaderimage" class="loadingOverlay ss" style="display: block;"></div>';
    _this2.$overlay = $('[data-cart-item-add] .loadingOverlay');
    _this2.previewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#previewModal')[0];
    return _this2;
  }
  _inheritsLoose(Category, _CatalogPage);
  var _proto = Category.prototype;
  _proto.onReady = function onReady() {
    console.log('categoryyyyyyy.js');
    this.outFitIdeas(this.context);
    var allIds = jQuery('#product-listing-container [data-productid]').map(function () {
      return parseInt(jQuery(this).attr('data-productid'));
    }).get();
    // $('#product-listing-container').attr('data-current-products', allIds.toString());
    new _custom_gql__WEBPACK_IMPORTED_MODULE_10__["default"](this.context, allIds.toString());
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
    $('a.reset-btn').on('click', function () {
      $('span.reset-message').attr({
        role: 'status',
        'aria-live': 'polite'
      });
    });
    if ($('.pagination-item--next .pagination-link').length > 0) {
      var infScroll = this.infiniteScroll();
      var _context = this.context;
      infScroll.on('append', function (body, path, items, response) {
        var allIds = [];
        items.forEach(function (item) {
          var id = parseInt($(item).attr('data-productid'));
          allIds.push(id);
        });
        // $('#product-listing-container').attr('data-current-products', allIds.toString());
        new _custom_gql__WEBPACK_IMPORTED_MODULE_10__["default"](_context, allIds.toString());
        Object(_common_carousel__WEBPACK_IMPORTED_MODULE_8__["default"])();
      });
      infScroll.on('last', function (body, path) {
        $('.loader-ellips').hide();
      });
    }
    $(document).on('touchstart', '.product.product--outfits', function () {
      $('.product.product--outfits').removeClass('active');
      $(this).addClass('active');
    });
    this.backInStockKlaviyo();
  };
  _proto.backInStockKlaviyo = function backInStockKlaviyo() {
    $(document).on("click", ".notifyMe", function () {
      var productid = $(this).attr("id");
      var variantid = $(this).attr("data-product-variant");
      var producttitle = $(".card-title-" + productid).text();
      if ($('#manual-bis-product').length > 0) {
        $('#manual-bis-product').val(productid);
        $('#manual-bis-variant').val(variantid);
        $('#manual-bis-product-name').text(producttitle);
        $(".manual-bis-message").addClass("d-none");
        $(".manual-bis-success").addClass("d-none");
        $(".manual-bis-popup").removeClass("d-none");
      }
    });
    $(document).on("click", "#manual-bis-form-close", function () {
      $(".manual-bis-popup").addClass("d-none");
    });
    $(document).mouseup(function (e) {
      var container = $("#manual-bis .popup-content");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("#manual-bis").addClass("d-none");
      }
    });
    $('#manual-bis-form').submit(function (e) {
      e.preventDefault();
      var formData = new FormData($(this)[0]);
      $.ajax({
        type: "POST",
        url: "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function success(response) {
          console.log(response);
          $(".manual-bis-success").removeClass("d-none");
        },
        error: function error(err) {
          console.error(err);
          $(".manual-bis-message").removeClass("d-none");
        }
      });
    });
  };
  _proto.outFitIdeas = function outFitIdeas(context) {
    if ($('.product-listing-container-outfit-ideas').length == 0) return;
    var perPage = 12;
    var start = 0;
    var end = perPage;
    var _this = this;
    var allowScroll = true;
    _this.paginateOutFit(start, end, context.categories);
    start = end;
    end = end + perPage;
    $(window).on('scroll', function () {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - $('footer.footer').height() - 100) {
        if (allowScroll) {
          if (end > context.categories.length) {
            end = context.categories.length;
            allowScroll = false;
          }
          _this.paginateOutFit(start, end, context.categories);
          start = end;
          end = end + perPage;
          _this.removeModalOnMobile();
        }
      }
    });
    _this.removeModalOnMobile();
    $(window).on('resize', function () {
      _this.removeModalOnMobile();
    });
  };
  _proto.removeModalOnMobile = function removeModalOnMobile() {
    var isMobile = $(window).width() < 768 ? true : false;
    console.log('isMobile ? ', isMobile);
    if (isMobile) {
      $('.removeModalOnMobile').removeClass('loadSubProducts');
      $('.removeModalOnMobile').removeAttr('data-reveal-id');
    } else {
      $('.removeModalOnMobile').addClass('loadSubProducts');
      $('.removeModalOnMobile').attr('data-reveal-id', 'subcategory-list');
    }
  };
  _proto.paginateOutFit = function paginateOutFit(start, end, categories) {
    console.log('Display from', start, 'to', end);
    var html = '';
    for (var i = start; i < end; i++) {
      html += this.generateOutfitHtml(categories[i]);
    }
    $('.productGrid--outfits').append(html);
  };
  _proto.generateOutfitHtml = function generateOutfitHtml(category) {
    var imageUrl = category.image ? category.image.data : '';
    imageUrl = imageUrl.replace('{:size}', 'original');
    var imageAlt = category.image ? category.image.alt : '';
    var url = category.url ? category.url : '';
    var html = "\n        <li class=\"product product--outfits col\">\n            <article class=\"card card--outfits pb-0\">\n                <div class=\"card-wrap card-wrap--outfits position-relative\">\n                    <div class=\"removeModalOnMobile loadSubProducts card-image--outfits\" rel=\"" + url + "\" data-reveal-id=\"subcategory-list\" data-desktop=\"true\">\n                        <figure class=\"card-figure card-figure--outfits card-figure--h-auto\">\n                            <div class=\"card-img-container card-img-container--outfits\">\n                                <img class=\"card-image lazyautosizpro_skues lazyloaded\" data-sizes=\"auto\" src=\"" + imageUrl + "\" alt=\"" + imageAlt + "\" title=\"" + imageAlt + "\">\n                            </div>\n                        </figure>\n                    </div>\n                    <div class=\"card-body card-body--outfits p-0\">\n                        <a href=\"javascript:void(0);\" rel=\"" + url + "\" data-reveal-id=\"subcategory-list\" class=\"btn btn-dark loadSubProducts\">Shop this look</a>\n                    </div>\n                </div>\n            </article>\n        </li>";
    return html;
  };
  _proto.infiniteScroll = function infiniteScroll() {
    var elem = document.querySelector('.productGrid');
    var infScroll = new infinite_scroll__WEBPACK_IMPORTED_MODULE_9___default.a(elem, {
      path: '.pagination-item--next .pagination-link',
      append: '.product',
      history: false,
      hideNav: '.pagination-list',
      scrollThreshold: 800
    });
    return infScroll;
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJfQ2F0YWxvZ1BhZ2UiLCJjb250ZXh0IiwiX3RoaXMyIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImxvYWRlckRpdiIsIiRvdmVybGF5IiwiJCIsInByZXZpZXdNb2RhbCIsIm1vZGFsRmFjdG9yeSIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsImNvbnNvbGUiLCJsb2ciLCJvdXRGaXRJZGVhcyIsImFsbElkcyIsImpRdWVyeSIsIm1hcCIsInBhcnNlSW50IiwiYXR0ciIsImdldCIsImdxbCIsInRvU3RyaW5nIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwicm9sZSIsImluZlNjcm9sbCIsImluZmluaXRlU2Nyb2xsIiwiX2NvbnRleHQiLCJib2R5IiwicGF0aCIsIml0ZW1zIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwiaXRlbSIsImlkIiwicHVzaCIsImNhcm91c2VsIiwiaGlkZSIsImRvY3VtZW50IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImJhY2tJblN0b2NrS2xhdml5byIsInByb2R1Y3RpZCIsInZhcmlhbnRpZCIsInByb2R1Y3R0aXRsZSIsInRleHQiLCJ2YWwiLCJtb3VzZXVwIiwiZSIsImNvbnRhaW5lciIsImlzIiwidGFyZ2V0IiwiaGFzIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYWpheCIsInR5cGUiLCJkYXRhIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsImNhY2hlIiwic3VjY2VzcyIsImVycm9yIiwiZXJyIiwicGVyUGFnZSIsInN0YXJ0IiwiZW5kIiwiX3RoaXMiLCJhbGxvd1Njcm9sbCIsInBhZ2luYXRlT3V0Rml0IiwiY2F0ZWdvcmllcyIsInNjcm9sbFRvcCIsImhlaWdodCIsInJlbW92ZU1vZGFsT25Nb2JpbGUiLCJpc01vYmlsZSIsIndpZHRoIiwicmVtb3ZlQXR0ciIsImh0bWwiLCJpIiwiZ2VuZXJhdGVPdXRmaXRIdG1sIiwiYXBwZW5kIiwiY2F0ZWdvcnkiLCJpbWFnZVVybCIsImltYWdlIiwicmVwbGFjZSIsImltYWdlQWx0IiwiYWx0IiwiZWxlbSIsInF1ZXJ5U2VsZWN0b3IiLCJJbmZpbml0ZVNjcm9sbCIsImhpc3RvcnkiLCJoaWRlTmF2Iiwic2Nyb2xsVGhyZXNob2xkIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJmaWx0ZXJFbXB0eVZhbHVlc0Zyb21Gb3JtIiwicmVzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSIsIl9zdGVwIiwiZG9uZSIsIl9zdGVwJHZhbHVlIiwidmFsdWUiLCJrZXkiLCJmaWx0ZXJFbXB0eUZpbGVzRnJvbUZvcm0iLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX3N0ZXAyJHZhbHVlIiwiRmlsZSIsIm5hbWUiLCJzaXplIiwibm9ybWFsaXplRm9ybURhdGEiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN4QztBQUNLO0FBQ0c7QUFDbUI7QUFDMUU7QUFDeUM7QUFDSTtBQUVkO0FBQUEsSUFJVkEsUUFBUSwwQkFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxNQUFBO0lBQ2pCQSxNQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsTUFBQSxDQUFLRSxvQkFBb0IsR0FBR0MsMEdBQTJCLENBQUNKLE9BQU8sQ0FBQztJQUNoRUMsTUFBQSxDQUFLSSxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRO0lBQ25DUCxNQUFBLENBQUtRLFNBQVMsR0FBRyxnRkFBZ0Y7SUFDakdSLE1BQUEsQ0FBS1MsUUFBUSxHQUFHQyxDQUFDLENBQUMsc0NBQXNDLENBQUM7SUFFekRWLE1BQUEsQ0FBS1csWUFBWSxHQUFHQyw2REFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFaLE1BQUE7RUFDekQ7RUFBQ2EsY0FBQSxDQUFBaEIsUUFBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQWdCLE1BQUEsR0FBQWpCLFFBQUEsQ0FBQWtCLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ05DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBRWhDLElBQUksQ0FBQ0MsV0FBVyxDQUFDLElBQUksQ0FBQ3BCLE9BQU8sQ0FBQztJQUU5QixJQUFJcUIsTUFBTSxHQUFHQyxNQUFNLENBQUMsNkNBQTZDLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVc7TUFDOUUsT0FBT0MsUUFBUSxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQztJQUNSO0lBQ0EsSUFBSUMsb0RBQUcsQ0FBQyxJQUFJLENBQUMzQixPQUFPLEVBQUVxQixNQUFNLENBQUNPLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFHeEMsSUFBSWpCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDa0IsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNoQyxJQUFJLENBQUNDLGlCQUFpQixDQUFDLENBQUM7SUFDNUIsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDQyxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDcERDLGdFQUFLLENBQUNDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNILGNBQWMsQ0FBQztJQUNyRDtJQUVBcEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDdUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFNO01BQy9CdkIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUNjLElBQUksQ0FBQztRQUN6QlUsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUU7TUFDakIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0lBRUYsSUFBR3hCLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDa0IsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUN4RCxJQUFJTyxTQUFTLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUNyQyxJQUFJQyxRQUFRLEdBQUcsSUFBSSxDQUFDdEMsT0FBTztNQUUzQm9DLFNBQVMsQ0FBQ0YsRUFBRSxDQUFFLFFBQVEsRUFBRSxVQUFVSyxJQUFJLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUc7UUFFNUQsSUFBSXJCLE1BQU0sR0FBRyxFQUFFO1FBQ2ZvQixLQUFLLENBQUNFLE9BQU8sQ0FBQyxVQUFBQyxJQUFJLEVBQUk7VUFDbEIsSUFBSUMsRUFBRSxHQUFHckIsUUFBUSxDQUFDYixDQUFDLENBQUNpQyxJQUFJLENBQUMsQ0FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1VBQ2pESixNQUFNLENBQUN5QixJQUFJLENBQUNELEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUM7UUFDRjtRQUNBLElBQUlsQixvREFBRyxDQUFDVyxRQUFRLEVBQUVqQixNQUFNLENBQUNPLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFcENtQixnRUFBUSxDQUFDLENBQUM7TUFDZCxDQUFDLENBQUM7TUFDRlgsU0FBUyxDQUFDRixFQUFFLENBQUUsTUFBTSxFQUFFLFVBQVVLLElBQUksRUFBRUMsSUFBSSxFQUFHO1FBQ3pDN0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUNxQyxJQUFJLENBQUMsQ0FBQztNQUM5QixDQUFDLENBQUM7SUFDTjtJQUVBckMsQ0FBQyxDQUFDc0MsUUFBUSxDQUFDLENBQUNmLEVBQUUsQ0FBQyxZQUFZLEVBQUUsMkJBQTJCLEVBQUUsWUFBVTtNQUNoRXZCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDdUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztNQUNwRHZDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ3dDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDQyxrQkFBa0IsQ0FBQyxDQUFDO0VBQzdCLENBQUM7RUFBQXJDLE1BQUEsQ0FFRHFDLGtCQUFrQixHQUFsQixTQUFBQSxtQkFBQSxFQUFvQjtJQUNoQnpDLENBQUMsQ0FBQ3NDLFFBQVEsQ0FBQyxDQUFDZixFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFVO01BQzNDLElBQUltQixTQUFTLEdBQUcxQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNjLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDbEMsSUFBSTZCLFNBQVMsR0FBRzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2MsSUFBSSxDQUFDLHNCQUFzQixDQUFDO01BQ3BELElBQUk4QixZQUFZLEdBQUc1QyxDQUFDLENBQUMsY0FBYyxHQUFHMEMsU0FBUyxDQUFDLENBQUNHLElBQUksQ0FBQyxDQUFDO01BRXZELElBQUc3QyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ2tCLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDcENsQixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzhDLEdBQUcsQ0FBQ0osU0FBUyxDQUFDO1FBQ3ZDMUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM4QyxHQUFHLENBQUNILFNBQVMsQ0FBQztRQUN2QzNDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDNkMsSUFBSSxDQUFDRCxZQUFZLENBQUM7UUFDaEQ1QyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ3dDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDM0N4QyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ3dDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDM0N4QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQ3VDLFdBQVcsQ0FBQyxRQUFRLENBQUM7TUFDaEQ7SUFDSixDQUFDLENBQUM7SUFDRnZDLENBQUMsQ0FBQ3NDLFFBQVEsQ0FBQyxDQUFDZixFQUFFLENBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFlBQVU7TUFDeER2QixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQ3dDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBQ0Z4QyxDQUFDLENBQUNzQyxRQUFRLENBQUMsQ0FBQ1MsT0FBTyxDQUFDLFVBQVNDLENBQUMsRUFBRTtNQUM1QixJQUFJQyxTQUFTLEdBQUdqRCxDQUFDLENBQUMsNEJBQTRCLENBQUM7TUFDL0MsSUFBSSxDQUFDaUQsU0FBUyxDQUFDQyxFQUFFLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDLElBQUlGLFNBQVMsQ0FBQ0csR0FBRyxDQUFDSixDQUFDLENBQUNHLE1BQU0sQ0FBQyxDQUFDakMsTUFBTSxLQUFLLENBQUMsRUFBQztRQUNwRWxCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQ3dDLFFBQVEsQ0FBQyxRQUFRLENBQUM7TUFDbkM7SUFDSixDQUFDLENBQUM7SUFDRnhDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDcUQsTUFBTSxDQUFFLFVBQVNMLENBQUMsRUFBQztNQUNyQ0EsQ0FBQyxDQUFDTSxjQUFjLENBQUMsQ0FBQztNQUNsQixJQUFJQyxRQUFRLEdBQUcsSUFBSUMsUUFBUSxDQUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZDQSxDQUFDLENBQUN5RCxJQUFJLENBQUM7UUFDSEMsSUFBSSxFQUFFLE1BQU07UUFDWmhFLEdBQUcsRUFBRSxpRUFBaUU7UUFDdEVpRSxJQUFJLEVBQUVKLFFBQVE7UUFDZEssV0FBVyxFQUFFLEtBQUs7UUFDbEJDLFdBQVcsRUFBRSxLQUFLO1FBQ2xCQyxLQUFLLEVBQUUsS0FBSztRQUNaQyxPQUFPLEVBQUUsU0FBQUEsUUFBU2hDLFFBQVEsRUFBQztVQUN2QnhCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDdUIsUUFBUSxDQUFDO1VBQ3JCL0IsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUN1QyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUM7UUFDRHlCLEtBQUssRUFBRSxTQUFBQSxNQUFTQyxHQUFHLEVBQUU7VUFDakIxRCxPQUFPLENBQUN5RCxLQUFLLENBQUNDLEdBQUcsQ0FBQztVQUNsQmpFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDdUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUNsRDtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQW5DLE1BQUEsQ0FFREssV0FBVyxHQUFYLFNBQUFBLFlBQVlwQixPQUFPLEVBQUU7SUFDakIsSUFBR1csQ0FBQyxDQUFDLHlDQUF5QyxDQUFDLENBQUNrQixNQUFNLElBQUksQ0FBQyxFQUFFO0lBRTdELElBQUlnRCxPQUFPLEdBQUcsRUFBRTtJQUNoQixJQUFJQyxLQUFLLEdBQUcsQ0FBQztJQUNiLElBQUlDLEdBQUcsR0FBR0YsT0FBTztJQUNqQixJQUFJRyxLQUFLLEdBQUcsSUFBSTtJQUNoQixJQUFJQyxXQUFXLEdBQUcsSUFBSTtJQUN0QkQsS0FBSyxDQUFDRSxjQUFjLENBQUNKLEtBQUssRUFBRUMsR0FBRyxFQUFFL0UsT0FBTyxDQUFDbUYsVUFBVSxDQUFDO0lBQ3BETCxLQUFLLEdBQUdDLEdBQUc7SUFDWEEsR0FBRyxHQUFHQSxHQUFHLEdBQUdGLE9BQU87SUFDbkJsRSxDQUFDLENBQUNMLE1BQU0sQ0FBQyxDQUFDNEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFXO01BQzlCLElBQUd2QixDQUFDLENBQUNMLE1BQU0sQ0FBQyxDQUFDOEUsU0FBUyxDQUFDLENBQUMsR0FBR3pFLENBQUMsQ0FBQ0wsTUFBTSxDQUFDLENBQUMrRSxNQUFNLENBQUMsQ0FBQyxHQUFHMUUsQ0FBQyxDQUFDc0MsUUFBUSxDQUFDLENBQUNvQyxNQUFNLENBQUMsQ0FBQyxHQUFHMUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDMEUsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUU7UUFDdEcsSUFBSUosV0FBVyxFQUFFO1VBQ2IsSUFBR0YsR0FBRyxHQUFHL0UsT0FBTyxDQUFDbUYsVUFBVSxDQUFDdEQsTUFBTSxFQUFFO1lBQ2hDa0QsR0FBRyxHQUFHL0UsT0FBTyxDQUFDbUYsVUFBVSxDQUFDdEQsTUFBTTtZQUMvQm9ELFdBQVcsR0FBRyxLQUFLO1VBQ3ZCO1VBQ0FELEtBQUssQ0FBQ0UsY0FBYyxDQUFDSixLQUFLLEVBQUVDLEdBQUcsRUFBRS9FLE9BQU8sQ0FBQ21GLFVBQVUsQ0FBQztVQUNwREwsS0FBSyxHQUFHQyxHQUFHO1VBQ1hBLEdBQUcsR0FBR0EsR0FBRyxHQUFHRixPQUFPO1VBRW5CRyxLQUFLLENBQUNNLG1CQUFtQixDQUFDLENBQUM7UUFDL0I7TUFDSjtJQUNKLENBQUMsQ0FBQztJQUVGTixLQUFLLENBQUNNLG1CQUFtQixDQUFDLENBQUM7SUFDM0IzRSxDQUFDLENBQUNMLE1BQU0sQ0FBQyxDQUFDNEIsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFXO01BQzlCOEMsS0FBSyxDQUFDTSxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQXZFLE1BQUEsQ0FFRHVFLG1CQUFtQixHQUFuQixTQUFBQSxvQkFBQSxFQUFxQjtJQUNqQixJQUFJQyxRQUFRLEdBQUc1RSxDQUFDLENBQUNMLE1BQU0sQ0FBQyxDQUFDa0YsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUs7SUFDckR0RSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLEVBQUVvRSxRQUFRLENBQUM7SUFDcEMsSUFBR0EsUUFBUSxFQUFFO01BQ1Q1RSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ3VDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztNQUN4RHZDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOEUsVUFBVSxDQUFDLGdCQUFnQixDQUFDO0lBQzFELENBQUMsTUFBTTtNQUNIOUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUN3QyxRQUFRLENBQUMsaUJBQWlCLENBQUM7TUFDckR4QyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO0lBQ3hFO0VBQ0osQ0FBQztFQUFBVixNQUFBLENBQ0RtRSxjQUFjLEdBQWQsU0FBQUEsZUFBZUosS0FBSyxFQUFFQyxHQUFHLEVBQUVJLFVBQVUsRUFBQztJQUNsQ2pFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsRUFBRTJELEtBQUssRUFBRSxJQUFJLEVBQUVDLEdBQUcsQ0FBQztJQUM3QyxJQUFJVyxJQUFJLEdBQUcsRUFBRTtJQUNiLEtBQUksSUFBSUMsQ0FBQyxHQUFHYixLQUFLLEVBQUVhLENBQUMsR0FBR1osR0FBRyxFQUFFWSxDQUFDLEVBQUUsRUFBRTtNQUM3QkQsSUFBSSxJQUFJLElBQUksQ0FBQ0Usa0JBQWtCLENBQUNULFVBQVUsQ0FBQ1EsQ0FBQyxDQUFDLENBQUM7SUFDbEQ7SUFDQWhGLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDa0YsTUFBTSxDQUFDSCxJQUFJLENBQUM7RUFDM0MsQ0FBQztFQUFBM0UsTUFBQSxDQUNENkUsa0JBQWtCLEdBQWxCLFNBQUFBLG1CQUFtQkUsUUFBUSxFQUFDO0lBQ3hCLElBQUlDLFFBQVEsR0FBR0QsUUFBUSxDQUFDRSxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0UsS0FBSyxDQUFDMUIsSUFBSSxHQUFHLEVBQUU7SUFDeER5QixRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7SUFDbEQsSUFBSUMsUUFBUSxHQUFHSixRQUFRLENBQUNFLEtBQUssR0FBR0YsUUFBUSxDQUFDRSxLQUFLLENBQUNHLEdBQUcsR0FBRyxFQUFFO0lBQ3ZELElBQUk5RixHQUFHLEdBQUd5RixRQUFRLENBQUN6RixHQUFHLEdBQUd5RixRQUFRLENBQUN6RixHQUFHLEdBQUcsRUFBRTtJQUMxQyxJQUFJcUYsSUFBSSx5U0FJZ0ZyRixHQUFHLHdYQUdjMEYsUUFBUSxpQkFBVUcsUUFBUSxtQkFBWUEsUUFBUSxvUEFLbEc3RixHQUFHLGdNQUlsRDtJQUNOLE9BQU9xRixJQUFJO0VBQ2YsQ0FBQztFQUFBM0UsTUFBQSxDQUdEc0IsY0FBYyxHQUFkLFNBQUFBLGVBQUEsRUFBaUI7SUFDYixJQUFNK0QsSUFBSSxHQUFHbkQsUUFBUSxDQUFDb0QsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNuRCxJQUFNakUsU0FBUyxHQUFHLElBQUlrRSxzREFBYyxDQUFDRixJQUFJLEVBQUU7TUFDdkM1RCxJQUFJLEVBQUUseUNBQXlDO01BQy9DcUQsTUFBTSxFQUFFLFVBQVU7TUFDbEJVLE9BQU8sRUFBRSxLQUFLO01BQ2RDLE9BQU8sRUFBRSxrQkFBa0I7TUFDM0JDLGVBQWUsRUFBRTtJQUNyQixDQUFDLENBQUM7SUFDRixPQUFPckUsU0FBUztFQUNwQixDQUFDO0VBQUFyQixNQUFBLENBR0RlLGlCQUFpQixHQUFqQixTQUFBQSxrQkFBQSxFQUFvQjtJQUNoQixJQUFBNEUscUJBQUEsR0FNSSxJQUFJLENBQUN2RyxvQkFBb0I7TUFMSHdHLGVBQWUsR0FBQUQscUJBQUEsQ0FBckNFLG9CQUFvQjtNQUNFQyxlQUFlLEdBQUFILHFCQUFBLENBQXJDSSxvQkFBb0I7TUFDR0Msa0JBQWtCLEdBQUFMLHFCQUFBLENBQXpDTSxxQkFBcUI7TUFDRUMsa0JBQWtCLEdBQUFQLHFCQUFBLENBQXpDUSxxQkFBcUI7TUFDQUMsY0FBYyxHQUFBVCxxQkFBQSxDQUFuQ1UsbUJBQW1CO0lBRXZCLElBQU1DLHdCQUF3QixHQUFHMUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO0lBQ2hFLElBQU0yRyx1QkFBdUIsR0FBRzNHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUM5RCxJQUFNNEcsZUFBZSxHQUFHLElBQUksQ0FBQ3ZILE9BQU8sQ0FBQ3dILHVCQUF1QjtJQUM1RCxJQUFNQyxjQUFjLEdBQUc7TUFDbkJDLE1BQU0sRUFBRTtRQUNKNUIsUUFBUSxFQUFFO1VBQ042QixhQUFhLEVBQUUsSUFBSTtVQUNuQkMsUUFBUSxFQUFFO1lBQ05DLEtBQUssRUFBRU47VUFDWDtRQUNKO01BQ0osQ0FBQztNQUNETyxRQUFRLEVBQUU7UUFDTkMsY0FBYyxFQUFFLDBCQUEwQjtRQUMxQ0MsT0FBTyxFQUFFO01BQ2IsQ0FBQztNQUNEQyxRQUFRLEVBQUU7SUFDZCxDQUFDO0lBRUQsSUFBSSxDQUFDQyxhQUFhLEdBQUcsSUFBSUMsOERBQWEsQ0FBQ1YsY0FBYyxFQUFFLFVBQUNXLE9BQU8sRUFBSztNQUNoRWYsd0JBQXdCLENBQUMzQixJQUFJLENBQUMwQyxPQUFPLENBQUNMLGNBQWMsQ0FBQztNQUNyRFQsdUJBQXVCLENBQUM1QixJQUFJLENBQUMwQyxPQUFPLENBQUNKLE9BQU8sQ0FBQztNQUU3Q3JILENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzBILGNBQWMsQ0FBQyxjQUFjLENBQUM7TUFFeEMxSCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMySCxPQUFPLENBQUM7UUFDcEJsRCxTQUFTLEVBQUU7TUFDZixDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ1gsQ0FBQyxFQUFFO01BQ0NtRCx1QkFBdUIsRUFBRTtRQUNyQjVCLGVBQWUsRUFBZkEsZUFBZTtRQUNmRSxlQUFlLEVBQWZBLGVBQWU7UUFDZkUsa0JBQWtCLEVBQWxCQSxrQkFBa0I7UUFDbEJFLGtCQUFrQixFQUFsQkEsa0JBQWtCO1FBQ2xCRSxjQUFjLEVBQWRBO01BQ0o7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FBQXJILFFBQUE7QUFBQSxFQXhQaUMwSSxnREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTUMseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUF5QkEsQ0FBR3ZFLFFBQVEsRUFBSTtFQUNqRCxJQUFNd0UsR0FBRyxHQUFHLElBQUl2RSxRQUFRLENBQUMsQ0FBQztFQUUxQixJQUFJO0lBQ0EsU0FBQXdFLFNBQUEsR0FBQUMsK0JBQUEsQ0FBeUIxRSxRQUFRLEdBQUEyRSxLQUFBLElBQUFBLEtBQUEsR0FBQUYsU0FBQSxJQUFBRyxJQUFBLEdBQUU7TUFBQSxJQUFBQyxXQUFBLEdBQUFGLEtBQUEsQ0FBQUcsS0FBQTtRQUF2QkMsR0FBRyxHQUFBRixXQUFBO1FBQUV0RixHQUFHLEdBQUFzRixXQUFBO01BQ2hCLElBQUl0RixHQUFHLEtBQUssRUFBRSxFQUFFO1FBQ1ppRixHQUFHLENBQUM3QyxNQUFNLENBQUNvRCxHQUFHLEVBQUV4RixHQUFHLENBQUM7TUFDeEI7SUFDSjtFQUNKLENBQUMsQ0FBQyxPQUFPRSxDQUFDLEVBQUU7SUFDUnpDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDd0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBLE9BQU8rRSxHQUFHO0FBQ2QsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNUSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCQSxDQUFHaEYsUUFBUSxFQUFJO0VBQ2hELElBQU13RSxHQUFHLEdBQUcsSUFBSXZFLFFBQVEsQ0FBQyxDQUFDO0VBRTFCLElBQUk7SUFDQSxTQUFBZ0YsVUFBQSxHQUFBUCwrQkFBQSxDQUF5QjFFLFFBQVEsR0FBQWtGLE1BQUEsSUFBQUEsTUFBQSxHQUFBRCxVQUFBLElBQUFMLElBQUEsR0FBRTtNQUFBLElBQUFPLFlBQUEsR0FBQUQsTUFBQSxDQUFBSixLQUFBO1FBQXZCQyxHQUFHLEdBQUFJLFlBQUE7UUFBRTVGLEdBQUcsR0FBQTRGLFlBQUE7TUFDaEIsSUFBSSxFQUFFNUYsR0FBRyxZQUFZNkYsSUFBSSxDQUFDLElBQUk3RixHQUFHLENBQUM4RixJQUFJLElBQUk5RixHQUFHLENBQUMrRixJQUFJLEVBQUU7UUFDaERkLEdBQUcsQ0FBQzdDLE1BQU0sQ0FBQ29ELEdBQUcsRUFBRXhGLEdBQUcsQ0FBQztNQUN4QjtJQUNKO0VBQ0osQ0FBQyxDQUFDLE9BQU9FLENBQUMsRUFBRTtJQUNSekMsT0FBTyxDQUFDeUQsS0FBSyxDQUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QjtFQUVBLE9BQU8rRSxHQUFHO0FBQ2QsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTWUsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQkEsQ0FBR3ZGLFFBQVE7RUFBQSxPQUFJdUUseUJBQXlCLENBQUNTLHdCQUF3QixDQUFDaEYsUUFBUSxDQUFDLENBQUM7QUFBQSxFOzs7Ozs7Ozs7Ozs7QUNoRDFHO0FBQUE7QUFBQSxJQUFNd0YsWUFBWSxHQUFHLGNBQWM7QUFDbkMsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUErQkEsQ0FBSUMsVUFBVTtFQUFBLE9BQUssQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ0YsVUFBVSxDQUFDRixZQUFZLENBQUMsQ0FBQyxDQUFDN0gsTUFBTTtBQUFBO0FBQ3RHLElBQU1rSSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFBLEVBQThCO0VBQ3RELEtBQUssSUFBSXBFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3FFLFNBQUEsQ0FBbUJuSSxNQUFNLEVBQUU4RCxDQUFDLEVBQUUsRUFBRTtJQUNoRCxJQUFNaUUsVUFBVSxHQUFHSyxJQUFJLENBQUNDLEtBQUssQ0FBb0J2RSxDQUFDLFFBQUFxRSxTQUFBLENBQUFuSSxNQUFBLElBQUQ4RCxDQUFDLEdBQUF3RSxTQUFBLEdBQUFILFNBQUEsQ0FBRHJFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlnRSwrQkFBK0IsQ0FBQ0MsVUFBVSxDQUFDLEVBQUU7TUFDN0MsT0FBT0EsVUFBVTtJQUNyQjtFQUNKO0FBQ0osQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNeEosMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUEyQkEsQ0FBSUosT0FBTyxFQUFLO0VBQ3BELElBQVFvSyx3QkFBd0IsR0FBd0VwSyxPQUFPLENBQXZHb0ssd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQ3JLLE9BQU8sQ0FBN0VxSyxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUt0SyxPQUFPLENBQTNDc0ssK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHUixzQkFBc0IsQ0FBQ0ssd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ2IsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWdCLGVBQWUsR0FBR2IsTUFBTSxDQUFDQyxJQUFJLENBQUNTLGdCQUFnQixDQUFDYixZQUFZLENBQUMsQ0FBQyxDQUFDbkksR0FBRyxDQUFDLFVBQUEwSCxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDMEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQztFQUFBLEVBQUM7RUFFcEcsT0FBT0YsZUFBZSxDQUFDRyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFN0IsR0FBRyxFQUFFdEQsQ0FBQyxFQUFLO0lBQzNDbUYsR0FBRyxDQUFDN0IsR0FBRyxDQUFDLEdBQUd1QixhQUFhLENBQUM3RSxDQUFDLENBQUM7SUFDM0IsT0FBT21GLEdBQUc7RUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCBqcXVlcnltYXRjaGhlaWdodCBmcm9tICdqcXVlcnktbWF0Y2gtaGVpZ2h0JztcbmltcG9ydCB7IG5vcm1hbGl6ZUZvcm1EYXRhIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvYXBpJztcbmltcG9ydCBtb2RhbEZhY3RvcnksIHsgc2hvd0FsZXJ0TW9kYWwsIG1vZGFsVHlwZXMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG4vLyBpbXBvcnQgJ3NsaWNrLWNhcm91c2VsJztcbmltcG9ydCBjYXJvdXNlbCBmcm9tICcuL2NvbW1vbi9jYXJvdXNlbCc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnaW5maW5pdGUtc2Nyb2xsJztcblxuaW1wb3J0IGdxbCBmcm9tICcuL2N1c3RvbS9ncWwnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIHRoaXMubG9hZGVyRGl2ID0gJzxkaXYgaWQ9XCJsb2FkZXJpbWFnZVwiIGNsYXNzPVwibG9hZGluZ092ZXJsYXkgc3NcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPjwvZGl2Pic7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0LWl0ZW0tYWRkXSAubG9hZGluZ092ZXJsYXknKTtcblxuICAgICAgICB0aGlzLnByZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI3ByZXZpZXdNb2RhbCcpWzBdO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXRlZ29yeXl5eXl5eS5qcycpO1xuXG4gICAgICAgIHRoaXMub3V0Rml0SWRlYXModGhpcy5jb250ZXh0KTtcblxuICAgICAgICB2YXIgYWxsSWRzID0galF1ZXJ5KCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciBbZGF0YS1wcm9kdWN0aWRdJykubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLXByb2R1Y3RpZCcpKTtcbiAgICAgICAgfSkuZ2V0KCk7XG4gICAgICAgIC8vICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJykuYXR0cignZGF0YS1jdXJyZW50LXByb2R1Y3RzJywgYWxsSWRzLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXcgZ3FsKHRoaXMuY29udGV4dCwgYWxsSWRzLnRvU3RyaW5nKCkpO1xuICAgICAgICBcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnc3Bhbi5yZXNldC1tZXNzYWdlJykuYXR0cih7XG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKCQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBpbmZTY3JvbGwgPSB0aGlzLmluZmluaXRlU2Nyb2xsKCk7XG4gICAgICAgICAgICBsZXQgX2NvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgICAgICAgIGluZlNjcm9sbC5vbiggJ2FwcGVuZCcsIGZ1bmN0aW9uKCBib2R5LCBwYXRoLCBpdGVtcywgcmVzcG9uc2UgKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWxsSWRzID0gW107XG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gcGFyc2VJbnQoJChpdGVtKS5hdHRyKCdkYXRhLXByb2R1Y3RpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgYWxsSWRzLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJykuYXR0cignZGF0YS1jdXJyZW50LXByb2R1Y3RzJywgYWxsSWRzLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIG5ldyBncWwoX2NvbnRleHQsIGFsbElkcy50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICAgIGNhcm91c2VsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluZlNjcm9sbC5vbiggJ2xhc3QnLCBmdW5jdGlvbiggYm9keSwgcGF0aCApIHtcbiAgICAgICAgICAgICAgICAkKCcubG9hZGVyLWVsbGlwcycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvdWNoc3RhcnQnLCAnLnByb2R1Y3QucHJvZHVjdC0tb3V0Zml0cycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC5wcm9kdWN0LS1vdXRmaXRzJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmFja0luU3RvY2tLbGF2aXlvKCk7XG4gICAgfVxuXG4gICAgYmFja0luU3RvY2tLbGF2aXlvKCl7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubm90aWZ5TWVcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0aWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgIHZhciB2YXJpYW50aWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXByb2R1Y3QtdmFyaWFudFwiKTtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0dGl0bGUgPSAkKFwiLmNhcmQtdGl0bGUtXCIgKyBwcm9kdWN0aWQpLnRleHQoKTsgIFxuXG4gICAgICAgICAgICBpZigkKCcjbWFudWFsLWJpcy1wcm9kdWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJyNtYW51YWwtYmlzLXByb2R1Y3QnKS52YWwocHJvZHVjdGlkKTtcbiAgICAgICAgICAgICAgICAkKCcjbWFudWFsLWJpcy12YXJpYW50JykudmFsKHZhcmlhbnRpZCk7XG4gICAgICAgICAgICAgICAgJCgnI21hbnVhbC1iaXMtcHJvZHVjdC1uYW1lJykudGV4dChwcm9kdWN0dGl0bGUpO1xuICAgICAgICAgICAgICAgICQoXCIubWFudWFsLWJpcy1tZXNzYWdlXCIpLmFkZENsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgICAgICAgICAgICQoXCIubWFudWFsLWJpcy1zdWNjZXNzXCIpLmFkZENsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgICAgICAgICAgICQoXCIubWFudWFsLWJpcy1wb3B1cFwiKS5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjbWFudWFsLWJpcy1mb3JtLWNsb3NlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtcG9wdXBcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKFwiI21hbnVhbC1iaXMgLnBvcHVwLWNvbnRlbnRcIik7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICQoXCIjbWFudWFsLWJpc1wiKS5hZGRDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoJyNtYW51YWwtYmlzLWZvcm0nKS5zdWJtaXQoIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCQodGhpcylbMF0pO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hLmtsYXZpeW8uY29tL29uc2l0ZS9jb21wb25lbnRzL2JhY2staW4tc3RvY2svc3Vic2NyaWJlXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIubWFudWFsLWJpcy1zdWNjZXNzXCIpLnJlbW92ZUNsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICQoXCIubWFudWFsLWJpcy1tZXNzYWdlXCIpLnJlbW92ZUNsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvdXRGaXRJZGVhcyhjb250ZXh0KSB7XG4gICAgICAgIGlmKCQoJy5wcm9kdWN0LWxpc3RpbmctY29udGFpbmVyLW91dGZpdC1pZGVhcycpLmxlbmd0aCA9PSAwKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHBlclBhZ2UgPSAxMjtcbiAgICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgICAgbGV0IGVuZCA9IHBlclBhZ2U7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGxldCBhbGxvd1Njcm9sbCA9IHRydWU7XG4gICAgICAgIF90aGlzLnBhZ2luYXRlT3V0Rml0KHN0YXJ0LCBlbmQsIGNvbnRleHQuY2F0ZWdvcmllcyk7XG4gICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgICBlbmQgPSBlbmQgKyBwZXJQYWdlO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpID4gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKCdmb290ZXIuZm9vdGVyJykuaGVpZ2h0KCkgLSAxMDApIHtcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZW5kID4gY29udGV4dC5jYXRlZ29yaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gY29udGV4dC5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFnaW5hdGVPdXRGaXQoc3RhcnQsIGVuZCwgY29udGV4dC5jYXRlZ29yaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGVuZCArIHBlclBhZ2U7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlTW9kYWxPbk1vYmlsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBfdGhpcy5yZW1vdmVNb2RhbE9uTW9iaWxlKCk7XG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVNb2RhbE9uTW9iaWxlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZU1vZGFsT25Nb2JpbGUoKXtcbiAgICAgICAgdmFyIGlzTW9iaWxlID0gJCh3aW5kb3cpLndpZHRoKCkgPCA3NjggPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpc01vYmlsZSA/ICcsIGlzTW9iaWxlKTtcbiAgICAgICAgaWYoaXNNb2JpbGUpIHtcbiAgICAgICAgICAgICQoJy5yZW1vdmVNb2RhbE9uTW9iaWxlJykucmVtb3ZlQ2xhc3MoJ2xvYWRTdWJQcm9kdWN0cycpO1xuICAgICAgICAgICAgJCgnLnJlbW92ZU1vZGFsT25Nb2JpbGUnKS5yZW1vdmVBdHRyKCdkYXRhLXJldmVhbC1pZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLnJlbW92ZU1vZGFsT25Nb2JpbGUnKS5hZGRDbGFzcygnbG9hZFN1YlByb2R1Y3RzJyk7XG4gICAgICAgICAgICAkKCcucmVtb3ZlTW9kYWxPbk1vYmlsZScpLmF0dHIoJ2RhdGEtcmV2ZWFsLWlkJywgJ3N1YmNhdGVnb3J5LWxpc3QnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWdpbmF0ZU91dEZpdChzdGFydCwgZW5kLCBjYXRlZ29yaWVzKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc3BsYXkgZnJvbScsIHN0YXJ0LCAndG8nLCBlbmQpO1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBmb3IodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBodG1sICs9IHRoaXMuZ2VuZXJhdGVPdXRmaXRIdG1sKGNhdGVnb3JpZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgICQoJy5wcm9kdWN0R3JpZC0tb3V0Zml0cycpLmFwcGVuZChodG1sKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVPdXRmaXRIdG1sKGNhdGVnb3J5KXtcbiAgICAgICAgbGV0IGltYWdlVXJsID0gY2F0ZWdvcnkuaW1hZ2UgPyBjYXRlZ29yeS5pbWFnZS5kYXRhIDogJyc7XG4gICAgICAgIGltYWdlVXJsID0gaW1hZ2VVcmwucmVwbGFjZSgnezpzaXplfScsICdvcmlnaW5hbCcpO1xuICAgICAgICBsZXQgaW1hZ2VBbHQgPSBjYXRlZ29yeS5pbWFnZSA/IGNhdGVnb3J5LmltYWdlLmFsdCA6ICcnO1xuICAgICAgICBsZXQgdXJsID0gY2F0ZWdvcnkudXJsID8gY2F0ZWdvcnkudXJsIDogJyc7XG4gICAgICAgIGxldCBodG1sID0gYFxuICAgICAgICA8bGkgY2xhc3M9XCJwcm9kdWN0IHByb2R1Y3QtLW91dGZpdHMgY29sXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImNhcmQgY2FyZC0tb3V0Zml0cyBwYi0wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtd3JhcCBjYXJkLXdyYXAtLW91dGZpdHMgcG9zaXRpb24tcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbW92ZU1vZGFsT25Nb2JpbGUgbG9hZFN1YlByb2R1Y3RzIGNhcmQtaW1hZ2UtLW91dGZpdHNcIiByZWw9XCIke3VybH1cIiBkYXRhLXJldmVhbC1pZD1cInN1YmNhdGVnb3J5LWxpc3RcIiBkYXRhLWRlc2t0b3A9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY2FyZC1maWd1cmUgY2FyZC1maWd1cmUtLW91dGZpdHMgY2FyZC1maWd1cmUtLWgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltZy1jb250YWluZXIgY2FyZC1pbWctY29udGFpbmVyLS1vdXRmaXRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltYWdlIGxhenlhdXRvc2l6cHJvX3NrdWVzIGxhenlsb2FkZWRcIiBkYXRhLXNpemVzPVwiYXV0b1wiIHNyYz1cIiR7aW1hZ2VVcmx9XCIgYWx0PVwiJHtpbWFnZUFsdH1cIiB0aXRsZT1cIiR7aW1hZ2VBbHR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgY2FyZC1ib2R5LS1vdXRmaXRzIHAtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiByZWw9XCIke3VybH1cIiBkYXRhLXJldmVhbC1pZD1cInN1YmNhdGVnb3J5LWxpc3RcIiBjbGFzcz1cImJ0biBidG4tZGFyayBsb2FkU3ViUHJvZHVjdHNcIj5TaG9wIHRoaXMgbG9vazwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgIDwvbGk+YDtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIFxuXG4gICAgaW5maW5pdGVTY3JvbGwoKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdEdyaWQnKTtcbiAgICAgICAgY29uc3QgaW5mU2Nyb2xsID0gbmV3IEluZmluaXRlU2Nyb2xsKGVsZW0sIHtcbiAgICAgICAgICAgIHBhdGg6ICcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLFxuICAgICAgICAgICAgYXBwZW5kOiAnLnByb2R1Y3QnLFxuICAgICAgICAgICAgaGlzdG9yeTogZmFsc2UsXG4gICAgICAgICAgICBoaWRlTmF2OiAnLnBhZ2luYXRpb24tbGlzdCcsXG4gICAgICAgICAgICBzY3JvbGxUaHJlc2hvbGQ6IDgwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbmZTY3JvbGw7XG4gICAgfVxuXG4gICAgXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBhbnkgZW1wdHkgc3RyaW5nIHZhbHVlcyBmcm9tIHRoZSBmb3JtRGF0YVxuICogQHBhcmFtIGZvcm1EYXRhOiBGb3JtRGF0YSBvYmplY3RcbiAqIEByZXR1cm5zIEZvcm1EYXRhIG9iamVjdFxuKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXJFbXB0eVZhbHVlc0Zyb21Gb3JtID0gZm9ybURhdGEgPT4ge1xuICAgIGNvbnN0IHJlcyA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIGZvcm1EYXRhKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJlcy5hcHBlbmQoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk2NzI5OTIvYWpheC1yZXF1ZXN0LWZhaWxzLXdoZW4tc2VuZGluZy1mb3JtZGF0YS1pbmNsdWRpbmctZW1wdHktZmlsZS1pbnB1dC1pbi1zYWZhcmlcbiAqIFNhZmFyaSBicm93c2VyIHdpdGgganF1ZXJ5IDMuMy4xIGhhcyBhbiBpc3N1ZSB1cGxvYWRpbmcgZW1wdHkgZmlsZSBwYXJhbWV0ZXJzLiBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgYW55IGVtcHR5IGZpbGVzIGZyb20gdGhlIGZvcm0gcGFyYW1zXG4gKiBAcGFyYW0gZm9ybURhdGE6IEZvcm1EYXRhIG9iamVjdFxuICogQHJldHVybnMgRm9ybURhdGEgb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXJFbXB0eUZpbGVzRnJvbUZvcm0gPSBmb3JtRGF0YSA9PiB7XG4gICAgY29uc3QgcmVzID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICB0cnkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgZm9ybURhdGEpIHtcbiAgICAgICAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIEZpbGUpIHx8IHZhbC5uYW1lIHx8IHZhbC5zaXplKSB7XG4gICAgICAgICAgICAgICAgcmVzLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59O1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBlbXB0eSBzdHJpbmcgdmFsdWVzIGFuZCBlbXB0eSBmaWxlcyBmcm9tIHRoZSBmb3JtRGF0YVxuICogQHBhcmFtIGZvcm1EYXRhOiBGb3JtRGF0YSBvYmplY3RcbiAqIEByZXR1cm5zIEZvcm1EYXRhIG9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRm9ybURhdGEgPSBmb3JtRGF0YSA9PiBmaWx0ZXJFbXB0eVZhbHVlc0Zyb21Gb3JtKGZpbHRlckVtcHR5RmlsZXNGcm9tRm9ybShmb3JtRGF0YSkpO1xuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
