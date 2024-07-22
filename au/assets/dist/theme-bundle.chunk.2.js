(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  function CatalogPage() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(CatalogPage, _PageManager);
  var _proto = CatalogPage.prototype;
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_carousel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../common/carousel */ "./assets/js/theme/common/carousel.js");













var defaultOptions = {
  accordionToggleSelector: "#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle",
  blockerSelector: "#facetedSearch .blocker",
  clearFacetSelector: "#facetedSearch .facetedSearch-clearLink",
  componentSelector: "#facetedSearch-navList",
  facetNavListSelector: "#facetedSearch .navList",
  priceRangeErrorSelector: "#facet-range-form .form-inlineMessage",
  priceRangeFieldsetSelector: "#facet-range-form .form-fieldset",
  priceRangeFormSelector: "#facet-range-form",
  priceRangeMaxPriceSelector: "#facet-range-form [name=max_price]",
  priceRangeMinPriceSelector: "#facet-range-form [name=min_price]",
  //   showMoreToggleSelector: "#facetedSearch .accordion-content .toggleLink",
  showMoreToggleSelector: "#facetedSearch #facetedSearch-navList .toggleLink",
  facetedSearchFilterItems: "#facetedSearch-filterItems .form-input",
  modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])("#modal")[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data("collapsibleInstance");
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(":hidden")) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
    console.log("faceted-search.js");
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();

    //console.log("display refreshed");
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    console.log(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl());
    //console.log(this.requestOptions);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }
      // console.log(content);
      // Refresh view with new content
      _this2.refreshView(content);

      // this.customLoadProductSizes();
      // initialize the slider
      // $('[data-slick]').slick();
    });
  };
  _proto.customLoadProductSizes = function customLoadProductSizes() {
    var listProducts = $(".productGrid li.product");
    listProducts.each(function (id, li) {
      // display discounted price
      //var Product = $(li);
      var proID = $(this).find(".ProductIDs").text();
      var forProID = $(this).find(".ProductIDsOnly").text();
      var proPrice = $(this).find(".mainLoadedPrice").text();
      var discountedPrice = (Number(proPrice.trim().replace("$", "")) * Number(0.9)).toFixed(2);
      //console.log(discountedPrice);
      //console.log(proPrice);

      $(".discountedPriceCategory-" + forProID).html("$" + discountedPrice);

      //var Product = $(li);
      // var proID = $(this).find(".ProductIDs").text();
      // //console.log(proID);

      $("#loadQuickView-" + proID).html('<div id="loaderimage" class="loadingOverlay" style="display: block;position: relative !important; top: 22px!important;"></div>');
      //return;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.product.getById(proID, {
        template: "products/quick-view-options"
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        // console.log(response);
        // loop the class
        var availableSizes = "";
        $(response).find(".form-option").each(function (i, obj) {
          //console.log($(this).html());
          availableSizes += "<label class='form-option' >" + $(this).html() + "</label>";
        });
        $("#loadQuickView-" + proID).html(availableSizes);
      });
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr("id");

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr("id");
    var hasMoreResults = $navList.data("hasMoreResults");
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr("id");

    // Toggle depending on `collapsed` flag
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data("facet");
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();
    this.options.modal.open();
    this.options.modalOpen = true;
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        //   this.options.modal.open();
        //   this.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    } else {
      this.options.modal.close();
      this.options.modalOpen = false;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $(".navList-item");
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data("collapsibleInstance");
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data("collapsibleInstance");
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr("id");
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data("collapsibleInstance");
      var id = collapsible.targetId;
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on("statechange", this.onStateChange);
    $(window).on("popstate", this.onPopState);
    $(document).on("click", this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on("toggle.collapsible", this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on("keyup", this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on("click", this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on("facetedSearch-facet-clicked", this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on("facetedSearch-range-submitted", this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off("statechange", this.onStateChange);
    $(window).off("popstate", this.onPopState);
    $(document).off("click", this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off("toggle.collapsible", this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off("keyup", this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off("click", this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off("facetedSearch-facet-clicked", this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off("facetedSearch-range-submitted", this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off("sortBy-submitted", this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr("href");
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr("href"));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr("href");
    event.preventDefault();
    $link.toggleClass("is-selected");

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split("=");
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split("&");
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    //this.updateView();
    // reload the page, instead of ajax refresh view
    return window.location.reload();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data("collapsibleInstance");
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl);
    // If searchParams does not contain a page value then modify url query string to have page=1
    if (!searchParams.has("page")) {
      var linkUrl = $(".pagination-link").attr("href");
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, "page=1");
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }
    $(window).trigger("statechange");
  };
  return FacetedSearch;
}();
/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vbW9kZWxzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvZm9ybS11dGlscy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblNvcnRCeVN1Ym1pdCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInVybCIsIlVybCIsInBhcnNlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCIkIiwic2VyaWFsaXplIiwic3BsaXQiLCJxdWVyeSIsInBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwidXJsVXRpbHMiLCJidWlsZFF1ZXJ5U3RyaW5nIiwiUGFnZU1hbmFnZXIiLCJkZWZhdWx0T3B0aW9ucyIsImFjY29yZGlvblRvZ2dsZVNlbGVjdG9yIiwiYmxvY2tlclNlbGVjdG9yIiwiY2xlYXJGYWNldFNlbGVjdG9yIiwiY29tcG9uZW50U2VsZWN0b3IiLCJmYWNldE5hdkxpc3RTZWxlY3RvciIsInByaWNlUmFuZ2VFcnJvclNlbGVjdG9yIiwicHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IiLCJwcmljZVJhbmdlRm9ybVNlbGVjdG9yIiwicHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IiLCJwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvciIsInNob3dNb3JlVG9nZ2xlU2VsZWN0b3IiLCJmYWNldGVkU2VhcmNoRmlsdGVySXRlbXMiLCJtb2RhbCIsIm1vZGFsRmFjdG9yeSIsIm1vZGFsT3BlbiIsIkZhY2V0ZWRTZWFyY2giLCJyZXF1ZXN0T3B0aW9ucyIsImNhbGxiYWNrIiwib3B0aW9ucyIsIl90aGlzIiwiX2V4dGVuZCIsImNvbGxhcHNlZEZhY2V0cyIsImNvbGxhcHNlZEZhY2V0SXRlbXMiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJpbml0UHJpY2VWYWxpZGF0b3IiLCJlYWNoIiwiaW5kZXgiLCJuYXZMaXN0IiwiY29sbGFwc2VGYWNldEl0ZW1zIiwiYWNjb3JkaW9uVG9nZ2xlIiwiJGFjY29yZGlvblRvZ2dsZSIsImNvbGxhcHNpYmxlIiwiZGF0YSIsImlzQ29sbGFwc2VkIiwicHVzaCIsInRhcmdldElkIiwic2V0VGltZW91dCIsImlzIiwiY29sbGFwc2VBbGxGYWNldHMiLCJvblN0YXRlQ2hhbmdlIiwiYmluZCIsIm9uVG9nZ2xlQ2xpY2siLCJvbkFjY29yZGlvblRvZ2dsZSIsIm9uQ2xlYXJGYWNldCIsIm9uRmFjZXRDbGljayIsIm9uUmFuZ2VTdWJtaXQiLCJmaWx0ZXJGYWNldEl0ZW1zIiwiYmluZEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3IiwiX3RoaXMyIiwic2hvdyIsImdldFVybCIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJjdXN0b21Mb2FkUHJvZHVjdFNpemVzIiwibGlzdFByb2R1Y3RzIiwiaWQiLCJsaSIsInByb0lEIiwiZmluZCIsInRleHQiLCJmb3JQcm9JRCIsInByb1ByaWNlIiwiZGlzY291bnRlZFByaWNlIiwiTnVtYmVyIiwidHJpbSIsInJlcGxhY2UiLCJ0b0ZpeGVkIiwiaHRtbCIsInV0aWxzIiwicHJvZHVjdCIsImdldEJ5SWQiLCJ0ZW1wbGF0ZSIsInJlc3BvbnNlIiwiYXZhaWxhYmxlU2l6ZXMiLCJpIiwib2JqIiwiZXhwYW5kRmFjZXRJdGVtcyIsIiRuYXZMaXN0IiwiYXR0ciIsIl93aXRob3V0IiwiaGFzTW9yZVJlc3VsdHMiLCJfdW5pb24iLCJ0b2dnbGVGYWNldEl0ZW1zIiwiX2luY2x1ZGVzIiwiZ2V0TW9yZUZhY2V0UmVzdWx0cyIsIl90aGlzMyIsImZhY2V0IiwiZmFjZXRVcmwiLCJvcGVuIiwic2hvd01vcmUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInVwZGF0ZUNvbnRlbnQiLCJjbG9zZSIsIiRpdGVtcyIsInZhbCIsInRvTG93ZXJDYXNlIiwiZWxlbWVudCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJfdGhpczQiLCIkYWNjb3JkaW9uVG9nZ2xlcyIsImV4cGFuZEFsbEZhY2V0cyIsIl90aGlzNSIsImxlbmd0aCIsInZhbGlkYXRvciIsIm5vZCIsInNlbGVjdG9ycyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJWYWxpZGF0b3JzIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiX3RoaXM2IiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJfdGhpczciLCJ1bmJpbmRFdmVudHMiLCJvbiIsIm9uUG9wU3RhdGUiLCJkb2N1bWVudCIsImhvb2tzIiwib2ZmIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJnb1RvVXJsIiwiJHRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwidXJsUXVlcnlQYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmVBbGwiLCJjb25zdGFudHMiLCJWQUxJRCIsImRlY29kZVVSSSIsInBhcnNlUXVlcnlQYXJhbXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInJlbG9hZCIsImN1cnJlbnRVcmwiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJsaW5rVXJsIiwicmUiLCJ1cGRhdGVkTGlua1VybCIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJmb3JtcyIsImVtYWlsIiwidmFsdWUiLCJ0ZXN0IiwicGFzc3dvcmQiLCJub3RFbXB0eSIsImlucHV0VGFnTmFtZXMiLCJjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QiLCJlbXB0eSIsImNvbmZpcm0iLCJtaXNtYXRjaCIsImludmFsaWQiLCJvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQiLCJvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCIsIm9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCIsIm9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCIsImNsYXNzaWZ5SW5wdXQiLCJpbnB1dCIsImZvcm1GaWVsZENsYXNzIiwiJGlucHV0IiwiJGZvcm1GaWVsZCIsInBhcmVudCIsInRhZ05hbWUiLCJwcm9wIiwiY2xhc3NOYW1lIiwic3BlY2lmaWNDbGFzc05hbWUiLCJpbnB1dFR5cGUiLCJfY2FtZWxDYXNlIiwiX2NhcGl0YWxpemUiLCJhZGRDbGFzcyIsImNsYXNzaWZ5Rm9ybSIsIiRmb3JtIiwiJGlucHV0cyIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsIl9fIiwiZ2V0RmllbGRJZCIsIiRmaWVsZCIsImZpZWxkSWQiLCJtYXRjaCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCIkc3RhdGVGaWVsZCIsInN0YXRlRmllbGRBdHRycyIsInR5cGUiLCJuYW1lIiwiYWZ0ZXIiLCJzZXRFbWFpbFZhbGlkYXRpb24iLCJmaWVsZCIsImVycm9yVGV4dCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImVycm9yTWVzc2FnZSIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsInBhc3N3b3JkU2VsZWN0b3IiLCJwYXNzd29yZDJTZWxlY3RvciIsInJlcXVpcmVtZW50cyIsIl9yZWYiLCJpc09wdGlvbmFsIiwiJHBhc3N3b3JkIiwicGFzc3dvcmRWYWxpZGF0aW9ucyIsIlJlZ0V4cCIsImFscGhhIiwibnVtZXJpYyIsIm1pbmxlbmd0aCIsInByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHMiLCJfcHJpY2VWYWxpZGF0aW9uRXJyb3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImtleXMiLCJjbGFzc2VzIiwiZm9yRWFjaCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNPO0FBQzFCO0FBQUEsSUFFREEsV0FBVywwQkFBQUMsWUFBQTtFQUFBLFNBQUFELFlBQUE7SUFBQSxPQUFBQyxZQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0VBQUFDLGNBQUEsQ0FBQUosV0FBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQUksTUFBQSxHQUFBTCxXQUFBLENBQUFNLFNBQUE7RUFBQUQsTUFBQSxDQUM1QkUsY0FBYyxHQUFkLFNBQUFBLGVBQWVDLEtBQUssRUFBRUMsYUFBYSxFQUFFO0lBQ2pDLElBQU1DLEdBQUcsR0FBR0MsMENBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNqRCxJQUFNQyxXQUFXLEdBQUdDLENBQUMsQ0FBQ1IsYUFBYSxDQUFDLENBQUNTLFNBQVMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFFM0RULEdBQUcsQ0FBQ1UsS0FBSyxDQUFDSixX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QUFrQixHQUFHclEsQ0FBQyxtQkFBaUJrTyxLQUFLLENBQUNyTCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQztJQUUxRWdILE1BQU0sQ0FBQ3lHLElBQUksQ0FBQ3BJLDRDQUFHLENBQUNxSSxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNwRixLQUFLLEVBQUs7TUFDeEMsSUFBSWlGLGtCQUFrQixDQUFDSSxRQUFRLENBQUN2SSw0Q0FBRyxDQUFDcUksT0FBTyxDQUFDbkYsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRGlGLGtCQUFrQixDQUFDSyxXQUFXLENBQUN4SSw0Q0FBRyxDQUFDcUksT0FBTyxDQUFDbkYsS0FBSyxDQUFDLENBQUM7TUFDdEQ7SUFDSixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2dQYWdlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgVXJsIGZyb20gXCJ1cmxcIjtcbmltcG9ydCB1cmxVdGlscyBmcm9tIFwiLi91dGlscy91cmwtdXRpbHNcIjtcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSBcIi4uL2dsb2JhbC9tb2RhbFwiO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tIFwiLi9jb2xsYXBzaWJsZVwiO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gXCIuL3V0aWxzL2Zvcm0tdXRpbHNcIjtcbmltcG9ydCBub2QgZnJvbSBcIi4vbm9kXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgY2Fyb3VzZWwgZnJvbSBcIi4vLi4vY29tbW9uL2Nhcm91c2VsXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjpcbiAgICBcIiNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlXCIsXG4gIGJsb2NrZXJTZWxlY3RvcjogXCIjZmFjZXRlZFNlYXJjaCAuYmxvY2tlclwiLFxuICBjbGVhckZhY2V0U2VsZWN0b3I6IFwiI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtY2xlYXJMaW5rXCIsXG4gIGNvbXBvbmVudFNlbGVjdG9yOiBcIiNmYWNldGVkU2VhcmNoLW5hdkxpc3RcIixcbiAgZmFjZXROYXZMaXN0U2VsZWN0b3I6IFwiI2ZhY2V0ZWRTZWFyY2ggLm5hdkxpc3RcIixcbiAgcHJpY2VSYW5nZUVycm9yU2VsZWN0b3I6IFwiI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0taW5saW5lTWVzc2FnZVwiLFxuICBwcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcjogXCIjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldFwiLFxuICBwcmljZVJhbmdlRm9ybVNlbGVjdG9yOiBcIiNmYWNldC1yYW5nZS1mb3JtXCIsXG4gIHByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yOiBcIiNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV1cIixcbiAgcHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3I6IFwiI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXVwiLFxuICAvLyAgIHNob3dNb3JlVG9nZ2xlU2VsZWN0b3I6IFwiI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1jb250ZW50IC50b2dnbGVMaW5rXCIsXG4gIHNob3dNb3JlVG9nZ2xlU2VsZWN0b3I6IFwiI2ZhY2V0ZWRTZWFyY2ggI2ZhY2V0ZWRTZWFyY2gtbmF2TGlzdCAudG9nZ2xlTGlua1wiLFxuICBmYWNldGVkU2VhcmNoRmlsdGVySXRlbXM6IFwiI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXRcIixcbiAgbW9kYWw6IG1vZGFsRmFjdG9yeShcIiNtb2RhbFwiKVswXSxcbiAgbW9kYWxPcGVuOiBmYWxzZSxcbn07XG5cbi8qKlxuICogRmFjZXRlZCBzZWFyY2ggdmlldyBjb21wb25lbnRcbiAqL1xuY2xhc3MgRmFjZXRlZFNlYXJjaCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnMgLSBPYmplY3Qgd2l0aCBvcHRpb25zIGZvciB0aGUgYWpheCByZXF1ZXN0c1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgZmV0Y2hpbmcgdGVtcGxhdGVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgKiAgICAgIHRlbXBsYXRlczoge1xuICAgKiAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgKiAgICAgfVxuICAgKiB9O1xuICAgKlxuICAgKiBsZXQgdGVtcGxhdGVzRGlkTG9hZCA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICogICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgKiB9O1xuICAgKlxuICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIC8vIFByaXZhdGUgcHJvcGVydGllc1xuICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5vcHRpb25zID0gXy5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xuICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IFtdO1xuXG4gICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcbiAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgdGhpcy5pbml0UHJpY2VWYWxpZGF0b3IoKTtcblxuICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkKG5hdkxpc3QpKTtcbiAgICB9KTtcblxuICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YShcImNvbGxhcHNpYmxlSW5zdGFuY2VcIik7XG5cbiAgICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cy5wdXNoKGNvbGxhcHNpYmxlLnRhcmdldElkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgIC8vIE5PVEU6IE5lZWQgdG8gZXhlY3V0ZSBhZnRlciBDb2xsYXBzaWJsZSBnZXRzIGJvb3RzdHJhcHBlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbXBvbmVudFNlbGVjdG9yKS5pcyhcIjpoaWRkZW5cIikpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZUFsbEZhY2V0cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gT2JzZXJ2ZSB1c2VyIGV2ZW50c1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZSA9IHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGUgPSB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNsZWFyRmFjZXQgPSB0aGlzLm9uQ2xlYXJGYWNldC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUmFuZ2VTdWJtaXQgPSB0aGlzLm9uUmFuZ2VTdWJtaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImZhY2V0ZWQtc2VhcmNoLmpzXCIpO1xuICB9XG5cbiAgLy8gUHVibGljIG1ldGhvZHNcbiAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgIGlmIChjb250ZW50KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAvLyBSZXN0b3JlIHZpZXcgc3RhdGVcbiAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldHMoKTtcbiAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAvLyBCaW5kIGV2ZW50c1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcImRpc3BsYXkgcmVmcmVzaGVkXCIpO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLnNob3coKTtcbiAgICBjb25zb2xlLmxvZyh1cmxVdGlscy5nZXRVcmwoKSk7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnJlcXVlc3RPcHRpb25zKTtcbiAgICBhcGkuZ2V0UGFnZSh1cmxVdGlscy5nZXRVcmwoKSwgdGhpcy5yZXF1ZXN0T3B0aW9ucywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5oaWRlKCk7XG5cbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50KTtcbiAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuXG4gICAgICAvLyB0aGlzLmN1c3RvbUxvYWRQcm9kdWN0U2l6ZXMoKTtcbiAgICAgIC8vIGluaXRpYWxpemUgdGhlIHNsaWRlclxuICAgICAgLy8gJCgnW2RhdGEtc2xpY2tdJykuc2xpY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGN1c3RvbUxvYWRQcm9kdWN0U2l6ZXMoKSB7XG4gICAgdmFyIGxpc3RQcm9kdWN0cyA9ICQoXCIucHJvZHVjdEdyaWQgbGkucHJvZHVjdFwiKTtcbiAgICBsaXN0UHJvZHVjdHMuZWFjaChmdW5jdGlvbiAoaWQsIGxpKSB7XG4gICAgICAvLyBkaXNwbGF5IGRpc2NvdW50ZWQgcHJpY2VcbiAgICAgIC8vdmFyIFByb2R1Y3QgPSAkKGxpKTtcbiAgICAgIHZhciBwcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzXCIpLnRleHQoKTtcbiAgICAgIHZhciBmb3JQcm9JRCA9ICQodGhpcykuZmluZChcIi5Qcm9kdWN0SURzT25seVwiKS50ZXh0KCk7XG4gICAgICB2YXIgcHJvUHJpY2UgPSAkKHRoaXMpLmZpbmQoXCIubWFpbkxvYWRlZFByaWNlXCIpLnRleHQoKTtcbiAgICAgIHZhciBkaXNjb3VudGVkUHJpY2UgPSAoXG4gICAgICAgIE51bWJlcihwcm9QcmljZS50cmltKCkucmVwbGFjZShcIiRcIiwgXCJcIikpICogTnVtYmVyKDAuOSlcbiAgICAgICkudG9GaXhlZCgyKTtcbiAgICAgIC8vY29uc29sZS5sb2coZGlzY291bnRlZFByaWNlKTtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvUHJpY2UpO1xuXG4gICAgICAkKFwiLmRpc2NvdW50ZWRQcmljZUNhdGVnb3J5LVwiICsgZm9yUHJvSUQpLmh0bWwoXCIkXCIgKyBkaXNjb3VudGVkUHJpY2UpO1xuXG4gICAgICAvL3ZhciBQcm9kdWN0ID0gJChsaSk7XG4gICAgICAvLyB2YXIgcHJvSUQgPSAkKHRoaXMpLmZpbmQoXCIuUHJvZHVjdElEc1wiKS50ZXh0KCk7XG4gICAgICAvLyAvL2NvbnNvbGUubG9nKHByb0lEKTtcblxuICAgICAgJChcIiNsb2FkUXVpY2tWaWV3LVwiICsgcHJvSUQpLmh0bWwoXG4gICAgICAgICc8ZGl2IGlkPVwibG9hZGVyaW1hZ2VcIiBjbGFzcz1cImxvYWRpbmdPdmVybGF5XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDsgdG9wOiAyMnB4IWltcG9ydGFudDtcIj48L2Rpdj4nXG4gICAgICApO1xuICAgICAgLy9yZXR1cm47XG4gICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKFxuICAgICAgICBwcm9JRCxcbiAgICAgICAgeyB0ZW1wbGF0ZTogXCJwcm9kdWN0cy9xdWljay12aWV3LW9wdGlvbnNcIiB9LFxuICAgICAgICAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgLy8gbG9vcCB0aGUgY2xhc3NcbiAgICAgICAgICB2YXIgYXZhaWxhYmxlU2l6ZXMgPSBcIlwiO1xuICAgICAgICAgICQocmVzcG9uc2UpXG4gICAgICAgICAgICAuZmluZChcIi5mb3JtLW9wdGlvblwiKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGksIG9iaikge1xuICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCQodGhpcykuaHRtbCgpKTtcbiAgICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZXMgKz1cbiAgICAgICAgICAgICAgICBcIjxsYWJlbCBjbGFzcz0nZm9ybS1vcHRpb24nID5cIiArICQodGhpcykuaHRtbCgpICsgXCI8L2xhYmVsPlwiO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKFwiI2xvYWRRdWlja1ZpZXctXCIgKyBwcm9JRCkuaHRtbChhdmFpbGFibGVTaXplcyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyBSZW1vdmVcbiAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG4gIH1cblxuICBjb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoXCJpZFwiKTtcbiAgICBjb25zdCBoYXNNb3JlUmVzdWx0cyA9ICRuYXZMaXN0LmRhdGEoXCJoYXNNb3JlUmVzdWx0c1wiKTtcblxuICAgIGlmIChoYXNNb3JlUmVzdWx0cykge1xuICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIFtpZF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gVG9nZ2xlIGRlcGVuZGluZyBvbiBgY29sbGFwc2VkYCBmbGFnXG4gICAgaWYgKF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCkpIHtcbiAgICAgIHRoaXMuZ2V0TW9yZUZhY2V0UmVzdWx0cygkbmF2TGlzdCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICBjb25zdCBmYWNldCA9ICRuYXZMaXN0LmRhdGEoXCJmYWNldFwiKTtcbiAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuXG4gICAgdGhpcy5vcHRpb25zLm1vZGFsLm9wZW4oKTtcbiAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XG4gICAgICBhcGkuZ2V0UGFnZShcbiAgICAgICAgZmFjZXRVcmwsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGxpc3RfYWxsOiBmYWNldCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vICAgdGhpcy5vcHRpb25zLm1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAvLyAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLmNsb3NlKCk7XG4gICAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmlsdGVyRmFjZXRJdGVtcyhldmVudCkge1xuICAgIGNvbnN0ICRpdGVtcyA9ICQoXCIubmF2TGlzdC1pdGVtXCIpO1xuICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgJGl0ZW1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xuICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKFwiY29sbGFwc2libGVJbnN0YW5jZVwiKTtcblxuICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcbiAgfVxuXG4gIGNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKFwiY29sbGFwc2libGVJbnN0YW5jZVwiKTtcblxuICAgIGNvbGxhcHNpYmxlLmNsb3NlKCk7XG4gIH1cblxuICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcbiAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgIHRoaXMuY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cGFuZEFsbEZhY2V0cygpIHtcbiAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xuICAgIGlmICgkKHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRm9ybVNlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0b3IgPSBub2QoKTtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB7XG4gICAgICBlcnJvclNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUVycm9yU2VsZWN0b3IsXG4gICAgICBmaWVsZHNldFNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICBmb3JtU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRm9ybVNlbGVjdG9yLFxuICAgICAgbWF4UHJpY2VTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yLFxuICAgICAgbWluUHJpY2VTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yLFxuICAgIH07XG5cbiAgICBWYWxpZGF0b3JzLnNldE1pbk1heFByaWNlVmFsaWRhdGlvbihcbiAgICAgIHZhbGlkYXRvcixcbiAgICAgIHNlbGVjdG9ycyxcbiAgICAgIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlc1xuICAgICk7XG5cbiAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gIH1cblxuICByZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcygpIHtcbiAgICBjb25zdCAkbmF2TGlzdHMgPSAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3Rvcik7XG5cbiAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxuICAgICRuYXZMaXN0cy5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKG5hdkxpc3QpO1xuICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKFwiaWRcIik7XG4gICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG5cbiAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpIHtcbiAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YShcImNvbGxhcHNpYmxlSW5zdGFuY2VcIik7XG4gICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRzLCBpZCk7XG5cbiAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICAvLyBDbGVhbi11cFxuICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG5cbiAgICAvLyBET00gZXZlbnRzXG4gICAgJCh3aW5kb3cpLm9uKFwic3RhdGVjaGFuZ2VcIiwgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAkKHdpbmRvdykub24oXCJwb3BzdGF0ZVwiLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsXG4gICAgICB0aGlzLm9uVG9nZ2xlQ2xpY2tcbiAgICApO1xuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgXCJ0b2dnbGUuY29sbGFwc2libGVcIixcbiAgICAgIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvcixcbiAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGVcbiAgICApO1xuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgXCJrZXl1cFwiLFxuICAgICAgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcyxcbiAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtc1xuICAgICk7XG4gICAgJCh0aGlzLm9wdGlvbnMuY2xlYXJGYWNldFNlbGVjdG9yKS5vbihcImNsaWNrXCIsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgIC8vIEhvb2tzXG4gICAgaG9va3Mub24oXCJmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWRcIiwgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgIGhvb2tzLm9uKFwiZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWRcIiwgdGhpcy5vblJhbmdlU3VibWl0KTtcbiAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gIH1cblxuICB1bmJpbmRFdmVudHMoKSB7XG4gICAgLy8gRE9NIGV2ZW50c1xuICAgICQod2luZG93KS5vZmYoXCJzdGF0ZWNoYW5nZVwiLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICQod2luZG93KS5vZmYoXCJwb3BzdGF0ZVwiLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICQoZG9jdW1lbnQpLm9mZihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLFxuICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrXG4gICAgKTtcbiAgICAkKGRvY3VtZW50KS5vZmYoXG4gICAgICBcInRvZ2dsZS5jb2xsYXBzaWJsZVwiLFxuICAgICAgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLFxuICAgICAgdGhpcy5vbkFjY29yZGlvblRvZ2dsZVxuICAgICk7XG4gICAgJChkb2N1bWVudCkub2ZmKFxuICAgICAgXCJrZXl1cFwiLFxuICAgICAgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcyxcbiAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtc1xuICAgICk7XG4gICAgJCh0aGlzLm9wdGlvbnMuY2xlYXJGYWNldFNlbGVjdG9yKS5vZmYoXCJjbGlja1wiLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAvLyBIb29rc1xuICAgIGhvb2tzLm9mZihcImZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZFwiLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgaG9va3Mub2ZmKFwiZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWRcIiwgdGhpcy5vblJhbmdlU3VibWl0KTtcbiAgICBob29rcy5vZmYoXCJzb3J0Qnktc3VibWl0dGVkXCIsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICB9XG5cbiAgb25DbGVhckZhY2V0KGV2ZW50KSB7XG4gICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoXCJocmVmXCIpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIFVwZGF0ZSBVUkxcbiAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gIH1cblxuICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgJHRvZ2dsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgY29uc3QgJG5hdkxpc3QgPSAkKCR0b2dnbGUuYXR0cihcImhyZWZcIikpO1xuXG4gICAgLy8gUHJldmVudCBkZWZhdWx0XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFRvZ2dsZSB2aXNpYmxlIGl0ZW1zXG4gICAgdGhpcy50b2dnbGVGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgfVxuXG4gIG9uRmFjZXRDbGljayhldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKFwiaHJlZlwiKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkbGluay50b2dnbGVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xuXG4gICAgLy8gVXBkYXRlIFVSTFxuICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubW9kYWxPcGVuKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubW9kYWwuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KFwiPVwiKTtcblxuICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdXJsVXRpbHMuZ29Ub1VybChcbiAgICAgIFVybC5mb3JtYXQoe1xuICAgICAgICBwYXRobmFtZTogdXJsLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgb25SYW5nZVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMucHJpY2VSYW5nZVZhbGlkYXRvci5hcmVBbGwobm9kLmNvbnN0YW50cy5WQUxJRCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgIGxldCBxdWVyeVBhcmFtcyA9IGRlY29kZVVSSSgkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpKS5zcGxpdChcIiZcIik7XG4gICAgcXVlcnlQYXJhbXMgPSB1cmxVdGlscy5wYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICBpZiAocXVlcnlQYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKHVybFF1ZXJ5UGFyYW1zLCB1cmwucXVlcnkpO1xuXG4gICAgdXJsVXRpbHMuZ29Ub1VybChcbiAgICAgIFVybC5mb3JtYXQoe1xuICAgICAgICBwYXRobmFtZTogdXJsLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAvL3RoaXMudXBkYXRlVmlldygpO1xuICAgIC8vIHJlbG9hZCB0aGUgcGFnZSwgaW5zdGVhZCBvZiBhamF4IHJlZnJlc2ggdmlld1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xuICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKFwiY29sbGFwc2libGVJbnN0YW5jZVwiKTtcbiAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuXG4gICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldHMsIFtpZF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9wU3RhdGUoKSB7XG4gICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoY3VycmVudFVybCk7XG4gICAgLy8gSWYgc2VhcmNoUGFyYW1zIGRvZXMgbm90IGNvbnRhaW4gYSBwYWdlIHZhbHVlIHRoZW4gbW9kaWZ5IHVybCBxdWVyeSBzdHJpbmcgdG8gaGF2ZSBwYWdlPTFcbiAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoXCJwYWdlXCIpKSB7XG4gICAgICBjb25zdCBsaW5rVXJsID0gJChcIi5wYWdpbmF0aW9uLWxpbmtcIikuYXR0cihcImhyZWZcIik7XG4gICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xuICAgICAgY29uc3QgdXBkYXRlZExpbmtVcmwgPSBsaW5rVXJsLnJlcGxhY2UocmUsIFwicGFnZT0xXCIpO1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXBkYXRlZExpbmtVcmwpO1xuICAgIH1cbiAgICAkKHdpbmRvdykudHJpZ2dlcihcInN0YXRlY2hhbmdlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2V0ZWRTZWFyY2g7XG4iLCJjb25zdCBmb3JtcyA9IHtcbiAgICBlbWFpbCh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZSA9IC9eLitALitcXC4uKy87XG4gICAgICAgIHJldHVybiByZS50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgcGFzc3dvcmQgZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwYXNzd29yZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RFbXB0eSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlcyBpZiBhIGZpZWxkIGlzIGVtcHR5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICpcbiAgICAgKi9cbiAgICBub3RFbXB0eSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybXM7XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9ub2QnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL21vZGVscy9mb3Jtcyc7XG5cbmNvbnN0IGlucHV0VGFnTmFtZXMgPSBbXG4gICAgJ2lucHV0JyxcbiAgICAnc2VsZWN0JyxcbiAgICAndGV4dGFyZWEnLFxuXTtcbi8qKlxuICogU2V0IHVwIE9iamVjdCB3aXRoIEVycm9yIE1lc3NhZ2VzIG9uIFBhc3N3b3JkIFZhbGlkYXRpb24uIFBsZWFzZSB1c2UgbWVzc2FnZXMgaW4gbWVudGlvbmVkIG9yZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZW1wdHkgZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBlbXB0eSBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpcm0gZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBlbXB0eSBjb25maXJtYXRpb24gZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBtaXNtYXRjaCBkZWZpbmVzIGVycm9yIHRleHQgaWYgY29uZmlybSBwYXNzZm9yZCBtaXNtYXRjaGVzIHBhc3Nmb3JkIGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gaW52YWxpZCBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGludmFsaWQgcGFzc3dvcmQgY2hhcmF0ZXJzIHNlcXVlbmNlXG4gKiBAcmV0dXJuIHtvYmplY3R9IG1lc3NhZ2VzIG9yIGRlZmF1bHQgdGV4dHMgaWYgbm90aGluZyBpcyBwcm92aWRpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCA9IChlbXB0eSwgY29uZmlybSwgbWlzbWF0Y2gsIGludmFsaWQpID0+ICh7XG4gICAgb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0OiBlbXB0eSxcbiAgICBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dDogY29uZmlybSxcbiAgICBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQ6IG1pc21hdGNoLFxuICAgIG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dDogaW52YWxpZCxcbn0pO1xuXG5cbi8qKlxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBhbiBpbnB1dCBlbGVtZW50IG9uIGl0cyB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRmllbGRDbGFzc1xuICogQHJldHVybiB7b2JqZWN0fSBFbGVtZW50IGl0c2VsZlxuICovXG5mdW5jdGlvbiBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcykge1xuICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgIGNvbnN0ICRmb3JtRmllbGQgPSAkaW5wdXQucGFyZW50KGAuJHtmb3JtRmllbGRDbGFzc31gKTtcbiAgICBjb25zdCB0YWdOYW1lID0gJGlucHV0LnByb3AoJ3RhZ05hbWUnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHt0YWdOYW1lfWA7XG4gICAgbGV0IHNwZWNpZmljQ2xhc3NOYW1lO1xuXG4gICAgLy8gSW5wdXQgY2FuIGJlIHRleHQvY2hlY2tib3gvcmFkaW8gZXRjLi4uXG4gICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXRUeXBlID0gJGlucHV0LnByb3AoJ3R5cGUnKTtcblxuICAgICAgICBpZiAoXy5pbmNsdWRlcyhbJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3N1Ym1pdCddLCBpbnB1dFR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWNoZWNrYm94LCAuZm9ybS1maWVsZC0tcmFkaW9cbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGAke2Zvcm1GaWVsZENsYXNzfS0tJHtfLmNhbWVsQ2FzZShpbnB1dFR5cGUpfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWlucHV0IC5mb3JtLWZpZWxkLS1pbnB1dFRleHRcbiAgICAgICAgICAgIHNwZWNpZmljQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSR7Xy5jYXBpdGFsaXplKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFwcGx5IGNsYXNzIG1vZGlmaWVyXG4gICAgcmV0dXJuICRmb3JtRmllbGRcbiAgICAgICAgLmFkZENsYXNzKGNsYXNzTmFtZSlcbiAgICAgICAgLmFkZENsYXNzKHNwZWNpZmljQ2xhc3NOYW1lKTtcbn1cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGVhY2ggaW5wdXQgZWxlbWVudCBpbiBhIGZvcm0gYmFzZWQgb24gaXRzIHR5cGVcbiAqIEBleGFtcGxlXG4gKiAvLyBCZWZvcmVcbiAqIDxmb3JtIGlkPVwiZm9ybVwiPlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICogICAgIDwvZGl2PlxuICogICAgIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gKiAgICAgICAgIDxzZWxlY3Q+Li4uPC9zZWxlY3Q+XG4gKiAgICAgPC9kaXY+XG4gKiA8L2Zvcm0+XG4gKlxuICogY2xhc3NpZnlGb3JtKCcjZm9ybScsIHsgZm9ybUZpZWxkQ2xhc3M6ICdmb3JtLWZpZWxkJyB9KTtcbiAqXG4gKiAvLyBBZnRlclxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0taW5wdXQgZm9ybS1maWVsZC0taW5wdXRUZXh0XCI+Li4uPC9kaXY+XG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zZWxlY3RcIj4uLi48L2Rpdj5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGZvcm1TZWxlY3RvciAtIHNlbGVjdG9yIG9yIGVsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtqUXVlcnl9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmeUZvcm0oZm9ybVNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCAkZm9ybSA9ICQoZm9ybVNlbGVjdG9yKTtcbiAgICBjb25zdCAkaW5wdXRzID0gJGZvcm0uZmluZChpbnB1dFRhZ05hbWVzLmpvaW4oJywgJykpO1xuXG4gICAgLy8gT2J0YWluIG9wdGlvbnNcbiAgICBjb25zdCB7IGZvcm1GaWVsZENsYXNzID0gJ2Zvcm0tZmllbGQnIH0gPSBvcHRpb25zO1xuXG4gICAgLy8gQ2xhc3NpZnkgZWFjaCBpbnB1dCBpbiBhIGZvcm1cbiAgICAkaW5wdXRzLmVhY2goKF9fLCBpbnB1dCkgPT4ge1xuICAgICAgICBjbGFzc2lmeUlucHV0KGlucHV0LCBmb3JtRmllbGRDbGFzcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gJGZvcm07XG59XG5cbi8qKlxuICogR2V0IGlkIGZyb20gZ2l2ZW4gZmllbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRGaWVsZElkKCRmaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSAkZmllbGQucHJvcCgnbmFtZScpLm1hdGNoKC8oXFxbLipcXF0pLyk7XG5cbiAgICBpZiAoZmllbGRJZCAmJiBmaWVsZElkLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmllbGRJZFswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogSW5zZXJ0IGhpZGRlbiBmaWVsZCBhZnRlciBTdGF0ZS9Qcm92aW5jZSBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRzdGF0ZUZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkc3RhdGVGaWVsZCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSBnZXRGaWVsZElkKCRzdGF0ZUZpZWxkKTtcbiAgICBjb25zdCBzdGF0ZUZpZWxkQXR0cnMgPSB7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICBuYW1lOiBgRm9ybUZpZWxkSXNUZXh0JHtmaWVsZElkfWAsXG4gICAgICAgIHZhbHVlOiAnMScsXG4gICAgfTtcblxuICAgICRzdGF0ZUZpZWxkLmFmdGVyKCQoJzxpbnB1dCAvPicsIHN0YXRlRmllbGRBdHRycykpO1xufVxuXG5jb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvclRleHQgZGVzY3JpYmVzIGVycm9yTWFzc2FnZSBvbiBlbWFpbCB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgc2V0RW1haWxWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JUZXh0KSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmRTZWxlY3RvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZDJTZWxlY3RvclxuICAgICAqIEBwYXJhbSByZXF1aXJlbWVudHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3JUZXh0c09iamVjdFxuICAgICAqIEBwYXJhbSBpc09wdGlvbmFsXG4gICAgICovXG4gICAgc2V0UGFzc3dvcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBwYXNzd29yZFNlbGVjdG9yLCBwYXNzd29yZDJTZWxlY3RvciwgcmVxdWlyZW1lbnRzLCB7XG4gICAgICAgIG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCwgb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQsIG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCwgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgIH0sIGlzT3B0aW9uYWwpID0+IHtcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkID0gJChwYXNzd29yZFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRWYWxpZGF0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLmFscGhhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5tYXRjaChuZXcgUmVnRXhwKHJlcXVpcmVtZW50cy5udW1lcmljKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5sZW5ndGggPj0gcmVxdWlyZW1lbnRzLm1pbmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBvcHRpb25hbCBhbmQgbm90aGluZyBlbnRlcmVkLCBpdCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsID09PSAkcGFzc3dvcmQudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHBhc3N3b3JkVmFsaWRhdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcbiAgICAgKiBAcGFyYW0ge05vZH0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdG9yc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZXJyb3JTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZmllbGRzZXRTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZm9ybVNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5tYXhQcmljZVNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5taW5QcmljZVNlbGVjdG9yXG4gICAgICovXG4gICAgc2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBzZWxlY3RvcnMsIHByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHMgPSB7fSkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICB9ID0gc2VsZWN0b3JzO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuICAgICAgICBjb25zdCB7IG9uTWluUHJpY2VFcnJvciwgb25NYXhQcmljZUVycm9yLCBtaW5QcmljZU5vdEVudGVyZWQsIG1heFByaWNlTm90RW50ZXJlZCwgb25JbnZhbGlkUHJpY2UgfSA9IHByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHM7XG5cbiAgICAgICAgdmFsaWRhdG9yLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBmb3JtOiBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAnXycsIC8vIEtMVURHRTogRG9uJ3QgYXBwbHkgc3VjY2VzcyBjbGFzc1xuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6IGBtaW4tbWF4OiR7bWluUHJpY2VTZWxlY3Rvcn06JHttYXhQcmljZVNlbGVjdG9yfWAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAnbWluLW51bWJlcjowJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLnNldE1lc3NhZ2VPcHRpb25zKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXG4gICAgICAgICAgICBwYXJlbnQ6IGZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICAgICAgICBlcnJvclNwYW46IGVycm9yU2VsZWN0b3IsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgbmV3IHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBkaXJ0eVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JUZXh0KSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjbGFzc2VzIGZyb20gZGlydHkgZm9ybSBpZiBwcmV2aW91c2x5IGNoZWNrZWRcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBjbGVhblVwU3RhdGVWYWxpZGF0aW9uOiAoZmllbGQpID0+IHtcbiAgICAgICAgY29uc3QgJGZpZWxkQ2xhc3NFbGVtZW50ID0gJCgoYFtkYXRhLXR5cGU9XCIke2ZpZWxkLmRhdGEoJ2ZpZWxkVHlwZScpfVwiXWApKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhub2QuY2xhc3NlcykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICgkZmllbGRDbGFzc0VsZW1lbnQuaGFzQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKSkge1xuICAgICAgICAgICAgICAgICRmaWVsZENsYXNzRWxlbWVudC5yZW1vdmVDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxufTtcblxuZXhwb3J0IHsgVmFsaWRhdG9ycywgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
