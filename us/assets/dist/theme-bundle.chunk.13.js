(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJfQ2F0YWxvZ1BhZ2UiLCJjb250ZXh0IiwiX3RoaXMyIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImxvYWRlckRpdiIsIiRvdmVybGF5IiwiJCIsInByZXZpZXdNb2RhbCIsIm1vZGFsRmFjdG9yeSIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsImNvbnNvbGUiLCJsb2ciLCJvdXRGaXRJZGVhcyIsImFsbElkcyIsImpRdWVyeSIsIm1hcCIsInBhcnNlSW50IiwiYXR0ciIsImdldCIsImdxbCIsInRvU3RyaW5nIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwicm9sZSIsImluZlNjcm9sbCIsImluZmluaXRlU2Nyb2xsIiwiX2NvbnRleHQiLCJib2R5IiwicGF0aCIsIml0ZW1zIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwiaXRlbSIsImlkIiwicHVzaCIsImNhcm91c2VsIiwiaGlkZSIsImRvY3VtZW50IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImJhY2tJblN0b2NrS2xhdml5byIsInByb2R1Y3RpZCIsInZhcmlhbnRpZCIsInByb2R1Y3R0aXRsZSIsInRleHQiLCJ2YWwiLCJtb3VzZXVwIiwiZSIsImNvbnRhaW5lciIsImlzIiwidGFyZ2V0IiwiaGFzIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYWpheCIsInR5cGUiLCJkYXRhIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsImNhY2hlIiwic3VjY2VzcyIsImVycm9yIiwiZXJyIiwicGVyUGFnZSIsInN0YXJ0IiwiZW5kIiwiX3RoaXMiLCJhbGxvd1Njcm9sbCIsInBhZ2luYXRlT3V0Rml0IiwiY2F0ZWdvcmllcyIsInNjcm9sbFRvcCIsImhlaWdodCIsInJlbW92ZU1vZGFsT25Nb2JpbGUiLCJpc01vYmlsZSIsIndpZHRoIiwicmVtb3ZlQXR0ciIsImh0bWwiLCJpIiwiZ2VuZXJhdGVPdXRmaXRIdG1sIiwiYXBwZW5kIiwiY2F0ZWdvcnkiLCJpbWFnZVVybCIsImltYWdlIiwicmVwbGFjZSIsImltYWdlQWx0IiwiYWx0IiwiZWxlbSIsInF1ZXJ5U2VsZWN0b3IiLCJJbmZpbml0ZVNjcm9sbCIsImhpc3RvcnkiLCJoaWRlTmF2Iiwic2Nyb2xsVGhyZXNob2xkIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN4QztBQUNLO0FBQ0c7QUFDbUI7QUFDMUU7QUFDeUM7QUFDSTtBQUVkO0FBQUEsSUFJVkEsUUFBUSwwQkFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxNQUFBO0lBQ2pCQSxNQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsTUFBQSxDQUFLRSxvQkFBb0IsR0FBR0MsMEdBQTJCLENBQUNKLE9BQU8sQ0FBQztJQUNoRUMsTUFBQSxDQUFLSSxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRO0lBQ25DUCxNQUFBLENBQUtRLFNBQVMsR0FBRyxnRkFBZ0Y7SUFDakdSLE1BQUEsQ0FBS1MsUUFBUSxHQUFHQyxDQUFDLENBQUMsc0NBQXNDLENBQUM7SUFFekRWLE1BQUEsQ0FBS1csWUFBWSxHQUFHQyw2REFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFaLE1BQUE7RUFDekQ7RUFBQ2EsY0FB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QUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQganF1ZXJ5bWF0Y2hoZWlnaHQgZnJvbSAnanF1ZXJ5LW1hdGNoLWhlaWdodCc7XG5pbXBvcnQgeyBub3JtYWxpemVGb3JtRGF0YSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2FwaSc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5LCB7IHNob3dBbGVydE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuLy8gaW1wb3J0ICdzbGljay1jYXJvdXNlbCc7XG5pbXBvcnQgY2Fyb3VzZWwgZnJvbSAnLi9jb21tb24vY2Fyb3VzZWwnO1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ2luZmluaXRlLXNjcm9sbCc7XG5cbmltcG9ydCBncWwgZnJvbSAnLi9jdXN0b20vZ3FsJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB0aGlzLmxvYWRlckRpdiA9ICc8ZGl2IGlkPVwibG9hZGVyaW1hZ2VcIiBjbGFzcz1cImxvYWRpbmdPdmVybGF5IHNzXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj48L2Rpdj4nO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydC1pdGVtLWFkZF0gLmxvYWRpbmdPdmVybGF5Jyk7XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNwcmV2aWV3TW9kYWwnKVswXTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2F0ZWdvcnl5eXl5eXkuanMnKTtcblxuICAgICAgICB0aGlzLm91dEZpdElkZWFzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgdmFyIGFsbElkcyA9IGpRdWVyeSgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgW2RhdGEtcHJvZHVjdGlkXScpLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChqUXVlcnkodGhpcykuYXR0cignZGF0YS1wcm9kdWN0aWQnKSk7XG4gICAgICAgIH0pLmdldCgpO1xuICAgICAgICAvLyAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmF0dHIoJ2RhdGEtY3VycmVudC1wcm9kdWN0cycsIGFsbElkcy50b1N0cmluZygpKTtcbiAgICAgICAgbmV3IGdxbCh0aGlzLmNvbnRleHQsIGFsbElkcy50b1N0cmluZygpKTtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLmF0dHIoe1xuICAgICAgICAgICAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgICAgICAgICAgICdhcmlhLWxpdmUnOiAncG9saXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZigkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgaW5mU2Nyb2xsID0gdGhpcy5pbmZpbml0ZVNjcm9sbCgpO1xuICAgICAgICAgICAgbGV0IF9jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICAgICAgICBpbmZTY3JvbGwub24oICdhcHBlbmQnLCBmdW5jdGlvbiggYm9keSwgcGF0aCwgaXRlbXMsIHJlc3BvbnNlICkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFsbElkcyA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IHBhcnNlSW50KCQoaXRlbSkuYXR0cignZGF0YS1wcm9kdWN0aWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIGFsbElkcy5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmF0dHIoJ2RhdGEtY3VycmVudC1wcm9kdWN0cycsIGFsbElkcy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBuZXcgZ3FsKF9jb250ZXh0LCBhbGxJZHMudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgICAgICBjYXJvdXNlbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbmZTY3JvbGwub24oICdsYXN0JywgZnVuY3Rpb24oIGJvZHksIHBhdGggKSB7XG4gICAgICAgICAgICAgICAgJCgnLmxvYWRlci1lbGxpcHMnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgJy5wcm9kdWN0LnByb2R1Y3QtLW91dGZpdHMnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnByb2R1Y3QucHJvZHVjdC0tb3V0Zml0cycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJhY2tJblN0b2NrS2xhdml5bygpO1xuICAgIH1cblxuICAgIGJhY2tJblN0b2NrS2xhdml5bygpe1xuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm5vdGlmeU1lXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgICAgICAgICB2YXIgdmFyaWFudGlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1wcm9kdWN0LXZhcmlhbnRcIik7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdHRpdGxlID0gJChcIi5jYXJkLXRpdGxlLVwiICsgcHJvZHVjdGlkKS50ZXh0KCk7ICBcblxuICAgICAgICAgICAgaWYoJCgnI21hbnVhbC1iaXMtcHJvZHVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCcjbWFudWFsLWJpcy1wcm9kdWN0JykudmFsKHByb2R1Y3RpZCk7XG4gICAgICAgICAgICAgICAgJCgnI21hbnVhbC1iaXMtdmFyaWFudCcpLnZhbCh2YXJpYW50aWQpO1xuICAgICAgICAgICAgICAgICQoJyNtYW51YWwtYmlzLXByb2R1Y3QtbmFtZScpLnRleHQocHJvZHVjdHRpdGxlKTtcbiAgICAgICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtbWVzc2FnZVwiKS5hZGRDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtc3VjY2Vzc1wiKS5hZGRDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtcG9wdXBcIikucmVtb3ZlQ2xhc3MoXCJkLW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI21hbnVhbC1iaXMtZm9ybS1jbG9zZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIi5tYW51YWwtYmlzLXBvcHVwXCIpLmFkZENsYXNzKFwiZC1ub25lXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChcIiNtYW51YWwtYmlzIC5wb3B1cC1jb250ZW50XCIpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIuaXMoZS50YXJnZXQpICYmIGNvbnRhaW5lci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAkKFwiI21hbnVhbC1iaXNcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcjbWFudWFsLWJpcy1mb3JtJykuc3VibWl0KCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgkKHRoaXMpWzBdKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vYS5rbGF2aXlvLmNvbS9vbnNpdGUvY29tcG9uZW50cy9iYWNrLWluLXN0b2NrL3N1YnNjcmliZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtc3VjY2Vzc1wiKS5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiLm1hbnVhbC1iaXMtbWVzc2FnZVwiKS5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3V0Rml0SWRlYXMoY29udGV4dCkge1xuICAgICAgICBpZigkKCcucHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lci1vdXRmaXQtaWRlYXMnKS5sZW5ndGggPT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBwZXJQYWdlID0gMTI7XG4gICAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICAgIGxldCBlbmQgPSBwZXJQYWdlO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICBsZXQgYWxsb3dTY3JvbGwgPSB0cnVlO1xuICAgICAgICBfdGhpcy5wYWdpbmF0ZU91dEZpdChzdGFydCwgZW5kLCBjb250ZXh0LmNhdGVnb3JpZXMpO1xuICAgICAgICBzdGFydCA9IGVuZDtcbiAgICAgICAgZW5kID0gZW5kICsgcGVyUGFnZTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA+ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCgnZm9vdGVyLmZvb3RlcicpLmhlaWdodCgpIC0gMTAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsbG93U2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuZCA+IGNvbnRleHQuY2F0ZWdvcmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGNvbnRleHQuY2F0ZWdvcmllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBhZ2luYXRlT3V0Rml0KHN0YXJ0LCBlbmQsIGNvbnRleHQuY2F0ZWdvcmllcyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBlbmQgKyBwZXJQYWdlO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZU1vZGFsT25Nb2JpbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgX3RoaXMucmVtb3ZlTW9kYWxPbk1vYmlsZSgpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlTW9kYWxPbk1vYmlsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVNb2RhbE9uTW9iaWxlKCl7XG4gICAgICAgIHZhciBpc01vYmlsZSA9ICQod2luZG93KS53aWR0aCgpIDwgNzY4ID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnaXNNb2JpbGUgPyAnLCBpc01vYmlsZSk7XG4gICAgICAgIGlmKGlzTW9iaWxlKSB7XG4gICAgICAgICAgICAkKCcucmVtb3ZlTW9kYWxPbk1vYmlsZScpLnJlbW92ZUNsYXNzKCdsb2FkU3ViUHJvZHVjdHMnKTtcbiAgICAgICAgICAgICQoJy5yZW1vdmVNb2RhbE9uTW9iaWxlJykucmVtb3ZlQXR0cignZGF0YS1yZXZlYWwtaWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5yZW1vdmVNb2RhbE9uTW9iaWxlJykuYWRkQ2xhc3MoJ2xvYWRTdWJQcm9kdWN0cycpO1xuICAgICAgICAgICAgJCgnLnJlbW92ZU1vZGFsT25Nb2JpbGUnKS5hdHRyKCdkYXRhLXJldmVhbC1pZCcsICdzdWJjYXRlZ29yeS1saXN0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFnaW5hdGVPdXRGaXQoc3RhcnQsIGVuZCwgY2F0ZWdvcmllcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5IGZyb20nLCBzdGFydCwgJ3RvJywgZW5kKTtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgZm9yKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgICAgaHRtbCArPSB0aGlzLmdlbmVyYXRlT3V0Zml0SHRtbChjYXRlZ29yaWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICAkKCcucHJvZHVjdEdyaWQtLW91dGZpdHMnKS5hcHBlbmQoaHRtbCk7XG4gICAgfVxuICAgIGdlbmVyYXRlT3V0Zml0SHRtbChjYXRlZ29yeSl7XG4gICAgICAgIGxldCBpbWFnZVVybCA9IGNhdGVnb3J5LmltYWdlID8gY2F0ZWdvcnkuaW1hZ2UuZGF0YSA6ICcnO1xuICAgICAgICBpbWFnZVVybCA9IGltYWdlVXJsLnJlcGxhY2UoJ3s6c2l6ZX0nLCAnb3JpZ2luYWwnKTtcbiAgICAgICAgbGV0IGltYWdlQWx0ID0gY2F0ZWdvcnkuaW1hZ2UgPyBjYXRlZ29yeS5pbWFnZS5hbHQgOiAnJztcbiAgICAgICAgbGV0IHVybCA9IGNhdGVnb3J5LnVybCA/IGNhdGVnb3J5LnVybCA6ICcnO1xuICAgICAgICBsZXQgaHRtbCA9IGBcbiAgICAgICAgPGxpIGNsYXNzPVwicHJvZHVjdCBwcm9kdWN0LS1vdXRmaXRzIGNvbFwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjYXJkIGNhcmQtLW91dGZpdHMgcGItMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXdyYXAgY2FyZC13cmFwLS1vdXRmaXRzIHBvc2l0aW9uLXJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZW1vdmVNb2RhbE9uTW9iaWxlIGxvYWRTdWJQcm9kdWN0cyBjYXJkLWltYWdlLS1vdXRmaXRzXCIgcmVsPVwiJHt1cmx9XCIgZGF0YS1yZXZlYWwtaWQ9XCJzdWJjYXRlZ29yeS1saXN0XCIgZGF0YS1kZXNrdG9wPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNhcmQtZmlndXJlIGNhcmQtZmlndXJlLS1vdXRmaXRzIGNhcmQtZmlndXJlLS1oLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWctY29udGFpbmVyIGNhcmQtaW1nLWNvbnRhaW5lci0tb3V0Zml0c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZSBsYXp5YXV0b3NpenByb19za3VlcyBsYXp5bG9hZGVkXCIgZGF0YS1zaXplcz1cImF1dG9cIiBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cIiR7aW1hZ2VBbHR9XCIgdGl0bGU9XCIke2ltYWdlQWx0fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IGNhcmQtYm9keS0tb3V0Zml0cyBwLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCIgcmVsPVwiJHt1cmx9XCIgZGF0YS1yZXZlYWwtaWQ9XCJzdWJjYXRlZ29yeS1saXN0XCIgY2xhc3M9XCJidG4gYnRuLWRhcmsgbG9hZFN1YlByb2R1Y3RzXCI+U2hvcCB0aGlzIGxvb2s8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICA8L2xpPmA7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICBcblxuICAgIGluZmluaXRlU2Nyb2xsKCkge1xuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RHcmlkJyk7XG4gICAgICAgIGNvbnN0IGluZlNjcm9sbCA9IG5ldyBJbmZpbml0ZVNjcm9sbChlbGVtLCB7XG4gICAgICAgICAgICBwYXRoOiAnLnBhZ2luYXRpb24taXRlbS0tbmV4dCAucGFnaW5hdGlvbi1saW5rJyxcbiAgICAgICAgICAgIGFwcGVuZDogJy5wcm9kdWN0JyxcbiAgICAgICAgICAgIGhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZU5hdjogJy5wYWdpbmF0aW9uLWxpc3QnLFxuICAgICAgICAgICAgc2Nyb2xsVGhyZXNob2xkOiA4MDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaW5mU2Nyb2xsO1xuICAgIH1cblxuICAgIFxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==