(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vbW9kZWxzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvZm9ybS11dGlscy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblNvcnRCeVN1Ym1pdCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInVybCIsIlVybCIsInBhcnNlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCIkIiwic2VyaWFsaXplIiwic3BsaXQiLCJxdWVyeSIsInBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwidXJsVXRpbHMiLCJidWlsZFF1ZXJ5U3RyaW5nIiwiUGFnZU1hbmFnZXIiLCJkZWZhdWx0T3B0aW9ucyIsImFjY29yZGlvblRvZ2dsZVNlbGVjdG9yIiwiYmxvY2tlclNlbGVjdG9yIiwiY2xlYXJGYWNldFNlbGVjdG9yIiwiY29tcG9uZW50U2VsZWN0b3IiLCJmYWNldE5hdkxpc3RTZWxlY3RvciIsInByaWNlUmFuZ2VFcnJvclNlbGVjdG9yIiwicHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IiLCJwcmljZVJhbmdlRm9ybVNlbGVjdG9yIiwicHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IiLCJwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvciIsInNob3dNb3JlVG9nZ2xlU2VsZWN0b3IiLCJmYWNldGVkU2VhcmNoRmlsdGVySXRlbXMiLCJtb2RhbCIsIm1vZGFsRmFjdG9yeSIsIm1vZGFsT3BlbiIsIkZhY2V0ZWRTZWFyY2giLCJyZXF1ZXN0T3B0aW9ucyIsImNhbGxiYWNrIiwib3B0aW9ucyIsIl90aGlzIiwiX2V4dGVuZCIsImNvbGxhcHNlZEZhY2V0cyIsImNvbGxhcHNlZEZhY2V0SXRlbXMiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJpbml0UHJpY2VWYWxpZGF0b3IiLCJlYWNoIiwiaW5kZXgiLCJuYXZMaXN0IiwiY29sbGFwc2VGYWNldEl0ZW1zIiwiYWNjb3JkaW9uVG9nZ2xlIiwiJGFjY29yZGlvblRvZ2dsZSIsImNvbGxhcHNpYmxlIiwiZGF0YSIsImlzQ29sbGFwc2VkIiwicHVzaCIsInRhcmdldElkIiwic2V0VGltZW91dCIsImlzIiwiY29sbGFwc2VBbGxGYWNldHMiLCJvblN0YXRlQ2hhbmdlIiwiYmluZCIsIm9uVG9nZ2xlQ2xpY2siLCJvbkFjY29yZGlvblRvZ2dsZSIsIm9uQ2xlYXJGYWNldCIsIm9uRmFjZXRDbGljayIsIm9uUmFuZ2VTdWJtaXQiLCJmaWx0ZXJGYWNldEl0ZW1zIiwiYmluZEV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3IiwiX3RoaXMyIiwic2hvdyIsImdldFVybCIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJjdXN0b21Mb2FkUHJvZHVjdFNpemVzIiwibGlzdFByb2R1Y3RzIiwiaWQiLCJsaSIsInByb0lEIiwiZmluZCIsInRleHQiLCJmb3JQcm9JRCIsInByb1ByaWNlIiwiZGlzY291bnRlZFByaWNlIiwiTnVtYmVyIiwidHJpbSIsInJlcGxhY2UiLCJ0b0ZpeGVkIiwiaHRtbCIsInV0aWxzIiwicHJvZHVjdCIsImdldEJ5SWQiLCJ0ZW1wbGF0ZSIsInJlc3BvbnNlIiwiYXZhaWxhYmxlU2l6ZXMiLCJpIiwib2JqIiwiZXhwYW5kRmFjZXRJdGVtcyIsIiRuYXZMaXN0IiwiYXR0ciIsIl93aXRob3V0IiwiaGFzTW9yZVJlc3VsdHMiLCJfdW5pb24iLCJ0b2dnbGVGYWNldEl0ZW1zIiwiX2luY2x1ZGVzIiwiZ2V0TW9yZUZhY2V0UmVzdWx0cyIsIl90aGlzMyIsImZhY2V0IiwiZmFjZXRVcmwiLCJvcGVuIiwic2hvd01vcmUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInVwZGF0ZUNvbnRlbnQiLCJjbG9zZSIsIiRpdGVtcyIsInZhbCIsInRvTG93ZXJDYXNlIiwiZWxlbWVudCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJfdGhpczQiLCIkYWNjb3JkaW9uVG9nZ2xlcyIsImV4cGFuZEFsbEZhY2V0cyIsIl90aGlzNSIsImxlbmd0aCIsInZhbGlkYXRvciIsIm5vZCIsInNlbGVjdG9ycyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJWYWxpZGF0b3JzIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiX3RoaXM2IiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJfdGhpczciLCJ1bmJpbmRFdmVudHMiLCJvbiIsIm9uUG9wU3RhdGUiLCJkb2N1bWVudCIsImhvb2tzIiwib2ZmIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJnb1RvVXJsIiwiJHRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwidXJsUXVlcnlQYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmVBbGwiLCJjb25zdGFudHMiLCJWQUxJRCIsImRlY29kZVVSSSIsInBhcnNlUXVlcnlQYXJhbXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInJlbG9hZCIsImN1cnJlbnRVcmwiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJsaW5rVXJsIiwicmUiLCJ1cGRhdGVkTGlua1VybCIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJmb3JtcyIsImVtYWlsIiwidmFsdWUiLCJ0ZXN0IiwicGFzc3dvcmQiLCJub3RFbXB0eSIsImlucHV0VGFnTmFtZXMiLCJjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QiLCJlbXB0eSIsImNvbmZpcm0iLCJtaXNtYXRjaCIsImludmFsaWQiLCJvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQiLCJvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCIsIm9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCIsIm9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCIsImNsYXNzaWZ5SW5wdXQiLCJpbnB1dCIsImZvcm1GaWVsZENsYXNzIiwiJGlucHV0IiwiJGZvcm1GaWVsZCIsInBhcmVudCIsInRhZ05hbWUiLCJwcm9wIiwiY2xhc3NOYW1lIiwic3BlY2lmaWNDbGFzc05hbWUiLCJpbnB1dFR5cGUiLCJfY2FtZWxDYXNlIiwiX2NhcGl0YWxpemUiLCJhZGRDbGFzcyIsImNsYXNzaWZ5Rm9ybSIsIiRmb3JtIiwiJGlucHV0cyIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsIl9fIiwiZ2V0RmllbGRJZCIsIiRmaWVsZCIsImZpZWxkSWQiLCJtYXRjaCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCIkc3RhdGVGaWVsZCIsInN0YXRlRmllbGRBdHRycyIsInR5cGUiLCJuYW1lIiwiYWZ0ZXIiLCJzZXRFbWFpbFZhbGlkYXRpb24iLCJmaWVsZCIsImVycm9yVGV4dCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImVycm9yTWVzc2FnZSIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsInBhc3N3b3JkU2VsZWN0b3IiLCJwYXNzd29yZDJTZWxlY3RvciIsInJlcXVpcmVtZW50cyIsIl9yZWYiLCJpc09wdGlvbmFsIiwiJHBhc3N3b3JkIiwicGFzc3dvcmRWYWxpZGF0aW9ucyIsIlJlZ0V4cCIsImFscGhhIiwibnVtZXJpYyIsIm1pbmxlbmd0aCIsInByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHMiLCJfcHJpY2VWYWxpZGF0aW9uRXJyb3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImtleXMiLCJjbGFzc2VzIiwiZm9yRWFjaCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNPO0FBQzFCO0FBQUEsSUFFREEsV0FBVywwQkFBQUMsWUFBQTtFQUFBLFNBQUFELFlBQUE7SUFBQSxPQUFBQyxZQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0VBQUFDLGNBQUEsQ0FBQUosV0FBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQUksTUFBQSxHQUFBTCxXQUFBLENBQUFNLFNBQUE7RUFBQUQsTUFBQSxDQUM1QkUsY0FBYyxHQUFkLFNBQUFBLGVBQWVDLEtBQUssRUFBRUMsYUFBYSxFQUFFO0lBQ2pDLElBQU1DLEdBQUcsR0FBR0MsMENBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNqRCxJQUFNQyxXQUFXLEdBQUdDLENBQUMsQ0FBQ1IsYUFBYSxDQUFDLENBQUNTLFNBQVMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFFM0RULEdBQUcsQ0FBQ1UsS0FBSyxDQUFDSixX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QUFrQixHQUFHclEsQ0FBQyxtQkFBaUJrTyxLQUFLLENBQUNyTCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQztJQUUxRWdILE1BQU0sQ0FBQ3lHLElBQUksQ0FBQ3BJLDRDQUFHLENBQUNxSSxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNwRixLQUFLLEVBQUs7TUFDeEMsSUFBSWlGLGtCQUFrQixDQUFDSSxRQUFRLENBQUN2SSw0Q0FBRyxDQUFDcUksT0FBTyxDQUFDbkYsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRGlGLGtCQUFrQixDQUFDSyxXQUFXLENBQUN4SSw0Q0FBRyxDQUFDcUksT0FBTyxDQUFDbkYsS0FBSyxDQUFDLENBQUM7TUFDdEQ7SUFDSixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjM0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9ICQoY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkuc3BsaXQoJz0nKTtcblxuICAgICAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybC5xdWVyeSkgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaG9va3MsIGFwaSB9IGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IFVybCBmcm9tIFwidXJsXCI7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSBcIi4vdXRpbHMvdXJsLXV0aWxzXCI7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gXCIuLi9nbG9iYWwvbW9kYWxcIjtcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSBcIi4vY29sbGFwc2libGVcIjtcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tIFwiLi91dGlscy9mb3JtLXV0aWxzXCI7XG5pbXBvcnQgbm9kIGZyb20gXCIuL25vZFwiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IGNhcm91c2VsIGZyb20gXCIuLy4uL2NvbW1vbi9jYXJvdXNlbFwiO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3I6XG4gICAgXCIjZmFjZXRlZFNlYXJjaCAuYWNjb3JkaW9uLW5hdmlnYXRpb24sICNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLXRvZ2dsZVwiLFxuICBibG9ja2VyU2VsZWN0b3I6IFwiI2ZhY2V0ZWRTZWFyY2ggLmJsb2NrZXJcIixcbiAgY2xlYXJGYWNldFNlbGVjdG9yOiBcIiNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLWNsZWFyTGlua1wiLFxuICBjb21wb25lbnRTZWxlY3RvcjogXCIjZmFjZXRlZFNlYXJjaC1uYXZMaXN0XCIsXG4gIGZhY2V0TmF2TGlzdFNlbGVjdG9yOiBcIiNmYWNldGVkU2VhcmNoIC5uYXZMaXN0XCIsXG4gIHByaWNlUmFuZ2VFcnJvclNlbGVjdG9yOiBcIiNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWlubGluZU1lc3NhZ2VcIixcbiAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6IFwiI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0tZmllbGRzZXRcIixcbiAgcHJpY2VSYW5nZUZvcm1TZWxlY3RvcjogXCIjZmFjZXQtcmFuZ2UtZm9ybVwiLFxuICBwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcjogXCIjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1tYXhfcHJpY2VdXCIsXG4gIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiBcIiNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1pbl9wcmljZV1cIixcbiAgLy8gICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiBcIiNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGlua1wiLFxuICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiBcIiNmYWNldGVkU2VhcmNoICNmYWNldGVkU2VhcmNoLW5hdkxpc3QgLnRvZ2dsZUxpbmtcIixcbiAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiBcIiNmYWNldGVkU2VhcmNoLWZpbHRlckl0ZW1zIC5mb3JtLWlucHV0XCIsXG4gIG1vZGFsOiBtb2RhbEZhY3RvcnkoXCIjbW9kYWxcIilbMF0sXG4gIG1vZGFsT3BlbjogZmFsc2UsXG59O1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIC0gT2JqZWN0IHdpdGggb3B0aW9ucyBmb3IgdGhlIGFqYXggcmVxdWVzdHNcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIENvbmZpZ3VyYWJsZSBvcHRpb25zXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGxldCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICogICAgICB0ZW1wbGF0ZXM6IHtcbiAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgKiAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcidcbiAgICogICAgIH1cbiAgICogfTtcbiAgICpcbiAgICogbGV0IHRlbXBsYXRlc0RpZExvYWQgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICogICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcbiAgICogfTtcbiAgICpcbiAgICogbGV0IGZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgdGVtcGxhdGVzRGlkTG9hZCk7XG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAvLyBQcml2YXRlIHByb3BlcnRpZXNcbiAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMub3B0aW9ucyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBbXTtcbiAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcblxuICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAvLyBTaG93IGxpbWl0ZWQgaXRlbXMgYnkgZGVmYXVsdFxuICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgfSk7XG5cbiAgICAvLyBNYXJrIGluaXRpYWxseSBjb2xsYXBzZWQgYWNjb3JkaW9uc1xuICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoXCJjb2xsYXBzaWJsZUluc3RhbmNlXCIpO1xuXG4gICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDb2xsYXBzZSBhbGwgZmFjZXRzIGlmIGluaXRpYWxseSBoaWRkZW5cbiAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb21wb25lbnRTZWxlY3RvcikuaXMoXCI6aGlkZGVuXCIpKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VBbGxGYWNldHMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uVG9nZ2xlQ2xpY2sgPSB0aGlzLm9uVG9nZ2xlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DbGVhckZhY2V0ID0gdGhpcy5vbkNsZWFyRmFjZXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRmFjZXRDbGljayA9IHRoaXMub25GYWNldENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmZpbHRlckZhY2V0SXRlbXMgPSB0aGlzLmZpbHRlckZhY2V0SXRlbXMuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgY29uc29sZS5sb2coXCJmYWNldGVkLXNlYXJjaC5qc1wiKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBtZXRob2RzXG4gIHJlZnJlc2hWaWV3KGNvbnRlbnQpIHtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICB9XG5cbiAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgLy8gSW5pdCBwcmljZSB2YWxpZGF0b3JcbiAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCk7XG4gICAgdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcygpO1xuXG4gICAgLy8gQmluZCBldmVudHNcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIC8vY29uc29sZS5sb2coXCJkaXNwbGF5IHJlZnJlc2hlZFwiKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XG4gICAgY29uc29sZS5sb2codXJsVXRpbHMuZ2V0VXJsKCkpO1xuICAgIC8vY29uc29sZS5sb2codGhpcy5yZXF1ZXN0T3B0aW9ucyk7XG4gICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIHRoaXMucmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xuXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coY29udGVudCk7XG4gICAgICAvLyBSZWZyZXNoIHZpZXcgd2l0aCBuZXcgY29udGVudFxuICAgICAgdGhpcy5yZWZyZXNoVmlldyhjb250ZW50KTtcblxuICAgICAgLy8gdGhpcy5jdXN0b21Mb2FkUHJvZHVjdFNpemVzKCk7XG4gICAgICAvLyBpbml0aWFsaXplIHRoZSBzbGlkZXJcbiAgICAgIC8vICQoJ1tkYXRhLXNsaWNrXScpLnNsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBjdXN0b21Mb2FkUHJvZHVjdFNpemVzKCkge1xuICAgIHZhciBsaXN0UHJvZHVjdHMgPSAkKFwiLnByb2R1Y3RHcmlkIGxpLnByb2R1Y3RcIik7XG4gICAgbGlzdFByb2R1Y3RzLmVhY2goZnVuY3Rpb24gKGlkLCBsaSkge1xuICAgICAgLy8gZGlzcGxheSBkaXNjb3VudGVkIHByaWNlXG4gICAgICAvL3ZhciBQcm9kdWN0ID0gJChsaSk7XG4gICAgICB2YXIgcHJvSUQgPSAkKHRoaXMpLmZpbmQoXCIuUHJvZHVjdElEc1wiKS50ZXh0KCk7XG4gICAgICB2YXIgZm9yUHJvSUQgPSAkKHRoaXMpLmZpbmQoXCIuUHJvZHVjdElEc09ubHlcIikudGV4dCgpO1xuICAgICAgdmFyIHByb1ByaWNlID0gJCh0aGlzKS5maW5kKFwiLm1haW5Mb2FkZWRQcmljZVwiKS50ZXh0KCk7XG4gICAgICB2YXIgZGlzY291bnRlZFByaWNlID0gKFxuICAgICAgICBOdW1iZXIocHJvUHJpY2UudHJpbSgpLnJlcGxhY2UoXCIkXCIsIFwiXCIpKSAqIE51bWJlcigwLjkpXG4gICAgICApLnRvRml4ZWQoMik7XG4gICAgICAvL2NvbnNvbGUubG9nKGRpc2NvdW50ZWRQcmljZSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHByb1ByaWNlKTtcblxuICAgICAgJChcIi5kaXNjb3VudGVkUHJpY2VDYXRlZ29yeS1cIiArIGZvclByb0lEKS5odG1sKFwiJFwiICsgZGlzY291bnRlZFByaWNlKTtcblxuICAgICAgLy92YXIgUHJvZHVjdCA9ICQobGkpO1xuICAgICAgLy8gdmFyIHByb0lEID0gJCh0aGlzKS5maW5kKFwiLlByb2R1Y3RJRHNcIikudGV4dCgpO1xuICAgICAgLy8gLy9jb25zb2xlLmxvZyhwcm9JRCk7XG5cbiAgICAgICQoXCIjbG9hZFF1aWNrVmlldy1cIiArIHByb0lEKS5odG1sKFxuICAgICAgICAnPGRpdiBpZD1cImxvYWRlcmltYWdlXCIgY2xhc3M9XCJsb2FkaW5nT3ZlcmxheVwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7cG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7IHRvcDogMjJweCFpbXBvcnRhbnQ7XCI+PC9kaXY+J1xuICAgICAgKTtcbiAgICAgIC8vcmV0dXJuO1xuICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChcbiAgICAgICAgcHJvSUQsXG4gICAgICAgIHsgdGVtcGxhdGU6IFwicHJvZHVjdHMvcXVpY2stdmlldy1vcHRpb25zXCIgfSxcbiAgICAgICAgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIC8vIGxvb3AgdGhlIGNsYXNzXG4gICAgICAgICAgdmFyIGF2YWlsYWJsZVNpemVzID0gXCJcIjtcbiAgICAgICAgICAkKHJlc3BvbnNlKVxuICAgICAgICAgICAgLmZpbmQoXCIuZm9ybS1vcHRpb25cIilcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpLCBvYmopIHtcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkKHRoaXMpLmh0bWwoKSk7XG4gICAgICAgICAgICAgIGF2YWlsYWJsZVNpemVzICs9XG4gICAgICAgICAgICAgICAgXCI8bGFiZWwgY2xhc3M9J2Zvcm0tb3B0aW9uJyA+XCIgKyAkKHRoaXMpLmh0bWwoKSArIFwiPC9sYWJlbD5cIjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJChcIiNsb2FkUXVpY2tWaWV3LVwiICsgcHJvSUQpLmh0bWwoYXZhaWxhYmxlU2l6ZXMpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gUmVtb3ZlXG4gICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICB9XG5cbiAgY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKFwiaWRcIik7XG4gICAgY29uc3QgaGFzTW9yZVJlc3VsdHMgPSAkbmF2TGlzdC5kYXRhKFwiaGFzTW9yZVJlc3VsdHNcIik7XG5cbiAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgIGlmIChfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpKSB7XG4gICAgICB0aGlzLmdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KSB7XG4gICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKFwiZmFjZXRcIik7XG4gICAgY29uc3QgZmFjZXRVcmwgPSB1cmxVdGlscy5nZXRVcmwoKTtcblxuICAgIHRoaXMub3B0aW9ucy5tb2RhbC5vcGVuKCk7XG4gICAgdGhpcy5vcHRpb25zLm1vZGFsT3BlbiA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSkge1xuICAgICAgYXBpLmdldFBhZ2UoXG4gICAgICAgIGZhY2V0VXJsLFxuICAgICAgICB7XG4gICAgICAgICAgdGVtcGxhdGU6IHRoaXMucmVxdWVzdE9wdGlvbnMuc2hvd01vcmUsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAgIHRoaXMub3B0aW9ucy5tb2RhbC5vcGVuKCk7XG4gICAgICAgICAgLy8gICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgdGhpcy5vcHRpb25zLm1vZGFsT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbHRlckZhY2V0SXRlbXMoZXZlbnQpIHtcbiAgICBjb25zdCAkaXRlbXMgPSAkKFwiLm5hdkxpc3QtaXRlbVwiKTtcbiAgICBjb25zdCBxdWVyeSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodGV4dC5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpIHtcbiAgICAgICAgJChlbGVtZW50KS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YShcImNvbGxhcHNpYmxlSW5zdGFuY2VcIik7XG5cbiAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XG4gIH1cblxuICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YShcImNvbGxhcHNpYmxlSW5zdGFuY2VcIik7XG5cbiAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xuICB9XG5cbiAgY29sbGFwc2VBbGxGYWNldHMoKSB7XG4gICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBhbmRBbGxGYWNldHMoKSB7XG4gICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gIGluaXRQcmljZVZhbGlkYXRvcigpIHtcbiAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxuICAgICAgZmllbGRzZXRTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yLFxuICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcbiAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcbiAgICAgIG1pblByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24oXG4gICAgICB2YWxpZGF0b3IsXG4gICAgICBzZWxlY3RvcnMsXG4gICAgICB0aGlzLm9wdGlvbnMudmFsaWRhdGlvbkVycm9yTWVzc2FnZXNcbiAgICApO1xuXG4gICAgdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuICB9XG5cbiAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XG4gICAgY29uc3QgJG5hdkxpc3RzID0gJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpO1xuXG4gICAgLy8gUmVzdG9yZSBjb2xsYXBzZWQgc3RhdGUgZm9yIGVhY2ggZmFjZXRcbiAgICAkbmF2TGlzdHMuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcbiAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cihcImlkXCIpO1xuICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuXG4gICAgICBpZiAoc2hvdWxkQ29sbGFwc2UpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5leHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVDb2xsYXBzZWRGYWNldHMoKSB7XG4gICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoXCJjb2xsYXBzaWJsZUluc3RhbmNlXCIpO1xuICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcbiAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuXG4gICAgICBpZiAoc2hvdWxkQ29sbGFwc2UpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgLy8gQ2xlYW4tdXBcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgLy8gRE9NIGV2ZW50c1xuICAgICQod2luZG93KS5vbihcInN0YXRlY2hhbmdlXCIsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgJCh3aW5kb3cpLm9uKFwicG9wc3RhdGVcIiwgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLFxuICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrXG4gICAgKTtcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgIFwidG9nZ2xlLmNvbGxhcHNpYmxlXCIsXG4gICAgICB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsXG4gICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlXG4gICAgKTtcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgIFwia2V5dXBcIixcbiAgICAgIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsXG4gICAgICB0aGlzLmZpbHRlckZhY2V0SXRlbXNcbiAgICApO1xuICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAvLyBIb29rc1xuICAgIGhvb2tzLm9uKFwiZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkXCIsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICBob29rcy5vbihcImZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkXCIsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgaG9va3Mub24oXCJzb3J0Qnktc3VibWl0dGVkXCIsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICB9XG5cbiAgdW5iaW5kRXZlbnRzKCkge1xuICAgIC8vIERPTSBldmVudHNcbiAgICAkKHdpbmRvdykub2ZmKFwic3RhdGVjaGFuZ2VcIiwgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAkKHdpbmRvdykub2ZmKFwicG9wc3RhdGVcIiwgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAkKGRvY3VtZW50KS5vZmYoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvcixcbiAgICAgIHRoaXMub25Ub2dnbGVDbGlja1xuICAgICk7XG4gICAgJChkb2N1bWVudCkub2ZmKFxuICAgICAgXCJ0b2dnbGUuY29sbGFwc2libGVcIixcbiAgICAgIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvcixcbiAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGVcbiAgICApO1xuICAgICQoZG9jdW1lbnQpLm9mZihcbiAgICAgIFwia2V5dXBcIixcbiAgICAgIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsXG4gICAgICB0aGlzLmZpbHRlckZhY2V0SXRlbXNcbiAgICApO1xuICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKFwiY2xpY2tcIiwgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgLy8gSG9va3NcbiAgICBob29rcy5vZmYoXCJmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWRcIiwgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgIGhvb2tzLm9mZihcImZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkXCIsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgaG9va3Mub2ZmKFwic29ydEJ5LXN1Ym1pdHRlZFwiLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgfVxuXG4gIG9uQ2xlYXJGYWNldChldmVudCkge1xuICAgIGNvbnN0ICRsaW5rID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKFwiaHJlZlwiKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyBVcGRhdGUgVVJMXG4gICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICB9XG5cbiAgb25Ub2dnbGVDbGljayhldmVudCkge1xuICAgIGNvbnN0ICR0b2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIGNvbnN0ICRuYXZMaXN0ID0gJCgkdG9nZ2xlLmF0dHIoXCJocmVmXCIpKTtcblxuICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBUb2dnbGUgdmlzaWJsZSBpdGVtc1xuICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gIH1cblxuICBvbkZhY2V0Q2xpY2soZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICBjb25zdCAkbGluayA9ICQoY3VycmVudFRhcmdldCk7XG4gICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cihcImhyZWZcIik7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJGxpbmsudG9nZ2xlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcblxuICAgIC8vIFVwZGF0ZSBVUkxcbiAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsT3Blbikge1xuICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdChcIj1cIik7XG5cbiAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XG4gICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKHVybFF1ZXJ5UGFyYW1zLCB1cmwucXVlcnkpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHVybFV0aWxzLmdvVG9VcmwoXG4gICAgICBVcmwuZm9ybWF0KHtcbiAgICAgICAgcGF0aG5hbWU6IHVybC5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG9uUmFuZ2VTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCF0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IuYXJlQWxsKG5vZC5jb25zdGFudHMuVkFMSUQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoXCImXCIpO1xuICAgIHF1ZXJ5UGFyYW1zID0gdXJsVXRpbHMucGFyc2VRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcyk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdXJsLnF1ZXJ5W2tleV0gPSBxdWVyeVBhcmFtc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxuICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgIHVybFV0aWxzLmdvVG9VcmwoXG4gICAgICBVcmwuZm9ybWF0KHtcbiAgICAgICAgcGF0aG5hbWU6IHVybC5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgLy90aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAvLyByZWxvYWQgdGhlIHBhZ2UsIGluc3RlYWQgb2YgYWpheCByZWZyZXNoIHZpZXdcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgb25BY2NvcmRpb25Ub2dnbGUoZXZlbnQpIHtcbiAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YShcImNvbGxhcHNpYmxlSW5zdGFuY2VcIik7XG4gICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcblxuICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xuICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRzLCBbaWRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcbiAgICB9XG4gIH1cblxuICBvblBvcFN0YXRlKCkge1xuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGN1cnJlbnRVcmwpO1xuICAgIC8vIElmIHNlYXJjaFBhcmFtcyBkb2VzIG5vdCBjb250YWluIGEgcGFnZSB2YWx1ZSB0aGVuIG1vZGlmeSB1cmwgcXVlcnkgc3RyaW5nIHRvIGhhdmUgcGFnZT0xXG4gICAgaWYgKCFzZWFyY2hQYXJhbXMuaGFzKFwicGFnZVwiKSkge1xuICAgICAgY29uc3QgbGlua1VybCA9ICQoXCIucGFnaW5hdGlvbi1saW5rXCIpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgY29uc3QgcmUgPSAvcGFnZT1bMC05XSsvaTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRMaW5rVXJsID0gbGlua1VybC5yZXBsYWNlKHJlLCBcInBhZ2U9MVwiKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVwZGF0ZWRMaW5rVXJsKTtcbiAgICB9XG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJzdGF0ZWNoYW5nZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGYWNldGVkU2VhcmNoO1xuIiwiY29uc3QgZm9ybXMgPSB7XG4gICAgZW1haWwodmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmUgPSAvXi4rQC4rXFwuLisvO1xuICAgICAgICByZXR1cm4gcmUudGVzdCh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHBhc3N3b3JkIGZpZWxkXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcGFzc3dvcmQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm90RW1wdHkodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZXMgaWYgYSBmaWVsZCBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqXG4gICAgICovXG4gICAgbm90RW1wdHkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1zO1xuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBub2QgZnJvbSAnLi4vbm9kJztcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9tb2RlbHMvZm9ybXMnO1xuXG5jb25zdCBpbnB1dFRhZ05hbWVzID0gW1xuICAgICdpbnB1dCcsXG4gICAgJ3NlbGVjdCcsXG4gICAgJ3RleHRhcmVhJyxcbl07XG4vKipcbiAqIFNldCB1cCBPYmplY3Qgd2l0aCBFcnJvciBNZXNzYWdlcyBvbiBQYXNzd29yZCBWYWxpZGF0aW9uLiBQbGVhc2UgdXNlIG1lc3NhZ2VzIGluIG1lbnRpb25lZCBvcmRlclxuICogQHBhcmFtIHtzdHJpbmd9IGVtcHR5IGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgZW1wdHkgZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25maXJtIGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgZW1wdHkgY29uZmlybWF0aW9uIGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gbWlzbWF0Y2ggZGVmaW5lcyBlcnJvciB0ZXh0IGlmIGNvbmZpcm0gcGFzc2ZvcmQgbWlzbWF0Y2hlcyBwYXNzZm9yZCBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IGludmFsaWQgZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBpbnZhbGlkIHBhc3N3b3JkIGNoYXJhdGVycyBzZXF1ZW5jZVxuICogQHJldHVybiB7b2JqZWN0fSBtZXNzYWdlcyBvciBkZWZhdWx0IHRleHRzIGlmIG5vdGhpbmcgaXMgcHJvdmlkaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QgPSAoZW1wdHksIGNvbmZpcm0sIG1pc21hdGNoLCBpbnZhbGlkKSA9PiAoe1xuICAgIG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dDogZW1wdHksXG4gICAgb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQ6IGNvbmZpcm0sXG4gICAgb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0OiBtaXNtYXRjaCxcbiAgICBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQ6IGludmFsaWQsXG59KTtcblxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gYW4gaW5wdXQgZWxlbWVudCBvbiBpdHMgdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkQ2xhc3NcbiAqIEByZXR1cm4ge29iamVjdH0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZnVuY3Rpb24gY2xhc3NpZnlJbnB1dChpbnB1dCwgZm9ybUZpZWxkQ2xhc3MpIHtcbiAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICBjb25zdCAkZm9ybUZpZWxkID0gJGlucHV0LnBhcmVudChgLiR7Zm9ybUZpZWxkQ2xhc3N9YCk7XG4gICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dC5wcm9wKCd0YWdOYW1lJykudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCBjbGFzc05hbWUgPSBgJHtmb3JtRmllbGRDbGFzc30tLSR7dGFnTmFtZX1gO1xuICAgIGxldCBzcGVjaWZpY0NsYXNzTmFtZTtcblxuICAgIC8vIElucHV0IGNhbiBiZSB0ZXh0L2NoZWNrYm94L3JhZGlvIGV0Yy4uLlxuICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VHlwZSA9ICRpbnB1dC5wcm9wKCd0eXBlJyk7XG5cbiAgICAgICAgaWYgKF8uaW5jbHVkZXMoWydyYWRpbycsICdjaGVja2JveCcsICdzdWJtaXQnXSwgaW5wdXRUeXBlKSkge1xuICAgICAgICAgICAgLy8gaWU6IC5mb3JtLWZpZWxkLS1jaGVja2JveCwgLmZvcm0tZmllbGQtLXJhZGlvXG4gICAgICAgICAgICBjbGFzc05hbWUgPSBgJHtmb3JtRmllbGRDbGFzc30tLSR7Xy5jYW1lbENhc2UoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWU6IC5mb3JtLWZpZWxkLS1pbnB1dCAuZm9ybS1maWVsZC0taW5wdXRUZXh0XG4gICAgICAgICAgICBzcGVjaWZpY0NsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0ke18uY2FwaXRhbGl6ZShpbnB1dFR5cGUpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBcHBseSBjbGFzcyBtb2RpZmllclxuICAgIHJldHVybiAkZm9ybUZpZWxkXG4gICAgICAgIC5hZGRDbGFzcyhjbGFzc05hbWUpXG4gICAgICAgIC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzTmFtZSk7XG59XG5cbi8qKlxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBlYWNoIGlucHV0IGVsZW1lbnQgaW4gYSBmb3JtIGJhc2VkIG9uIGl0cyB0eXBlXG4gKiBAZXhhbXBsZVxuICogLy8gQmVmb3JlXG4gKiA8Zm9ybSBpZD1cImZvcm1cIj5cbiAqICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZFwiPlxuICogICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIj5cbiAqICAgICA8L2Rpdj5cbiAqICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZFwiPlxuICogICAgICAgICA8c2VsZWN0Pi4uLjwvc2VsZWN0PlxuICogICAgIDwvZGl2PlxuICogPC9mb3JtPlxuICpcbiAqIGNsYXNzaWZ5Rm9ybSgnI2Zvcm0nLCB7IGZvcm1GaWVsZENsYXNzOiAnZm9ybS1maWVsZCcgfSk7XG4gKlxuICogLy8gQWZ0ZXJcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLWlucHV0IGZvcm0tZmllbGQtLWlucHV0VGV4dFwiPi4uLjwvZGl2PlxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0tc2VsZWN0XCI+Li4uPC9kaXY+XG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBmb3JtU2VsZWN0b3IgLSBzZWxlY3RvciBvciBlbGVtZW50XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7alF1ZXJ5fSBFbGVtZW50IGl0c2VsZlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NpZnlGb3JtKGZvcm1TZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgJGZvcm0gPSAkKGZvcm1TZWxlY3Rvcik7XG4gICAgY29uc3QgJGlucHV0cyA9ICRmb3JtLmZpbmQoaW5wdXRUYWdOYW1lcy5qb2luKCcsICcpKTtcblxuICAgIC8vIE9idGFpbiBvcHRpb25zXG4gICAgY29uc3QgeyBmb3JtRmllbGRDbGFzcyA9ICdmb3JtLWZpZWxkJyB9ID0gb3B0aW9ucztcblxuICAgIC8vIENsYXNzaWZ5IGVhY2ggaW5wdXQgaW4gYSBmb3JtXG4gICAgJGlucHV0cy5lYWNoKChfXywgaW5wdXQpID0+IHtcbiAgICAgICAgY2xhc3NpZnlJbnB1dChpbnB1dCwgZm9ybUZpZWxkQ2xhc3MpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICRmb3JtO1xufVxuXG4vKipcbiAqIEdldCBpZCBmcm9tIGdpdmVuIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJGZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0RmllbGRJZCgkZmllbGQpIHtcbiAgICBjb25zdCBmaWVsZElkID0gJGZpZWxkLnByb3AoJ25hbWUnKS5tYXRjaCgvKFxcWy4qXFxdKS8pO1xuXG4gICAgaWYgKGZpZWxkSWQgJiYgZmllbGRJZC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkSWRbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIEluc2VydCBoaWRkZW4gZmllbGQgYWZ0ZXIgU3RhdGUvUHJvdmluY2UgZmllbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSAkc3RhdGVGaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJHN0YXRlRmllbGQpIHtcbiAgICBjb25zdCBmaWVsZElkID0gZ2V0RmllbGRJZCgkc3RhdGVGaWVsZCk7XG4gICAgY29uc3Qgc3RhdGVGaWVsZEF0dHJzID0ge1xuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgbmFtZTogYEZvcm1GaWVsZElzVGV4dCR7ZmllbGRJZH1gLFxuICAgICAgICB2YWx1ZTogJzEnLFxuICAgIH07XG5cbiAgICAkc3RhdGVGaWVsZC5hZnRlcigkKCc8aW5wdXQgLz4nLCBzdGF0ZUZpZWxkQXR0cnMpKTtcbn1cblxuY29uc3QgVmFsaWRhdG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgbmV3IHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBkaXJ0eVxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JUZXh0IGRlc2NyaWJlcyBlcnJvck1hc3NhZ2Ugb24gZW1haWwgdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHNldEVtYWlsVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yVGV4dCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQyU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0gcmVxdWlyZW1lbnRzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yVGV4dHNPYmplY3RcbiAgICAgKiBAcGFyYW0gaXNPcHRpb25hbFxuICAgICAqL1xuICAgIHNldFBhc3N3b3JkVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgcGFzc3dvcmRTZWxlY3RvciwgcGFzc3dvcmQyU2VsZWN0b3IsIHJlcXVpcmVtZW50cywge1xuICAgICAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0LCBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsIG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcbiAgICB9LCBpc09wdGlvbmFsKSA9PiB7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZCA9ICQocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5tYXRjaChuZXcgUmVnRXhwKHJlcXVpcmVtZW50cy5hbHBoYSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMubnVtZXJpYykpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWwubGVuZ3RoID49IHJlcXVpcmVtZW50cy5taW5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgb3B0aW9uYWwgYW5kIG5vdGhpbmcgZW50ZXJlZCwgaXQgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbCA9PT0gJHBhc3N3b3JkLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZFZhbGlkYXRpb25zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHtOb2R9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmVycm9yU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZpZWxkc2V0U2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZvcm1TZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWF4UHJpY2VTZWxlY3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMubWluUHJpY2VTZWxlY3RvclxuICAgICAqL1xuICAgIHNldE1pbk1heFByaWNlVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgc2VsZWN0b3JzLCBwcmljZVZhbGlkYXRpb25FcnJvclRleHRzID0ge30pID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3IsXG4gICAgICAgICAgICBmb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfSA9IHNlbGVjdG9ycztcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICAgICAgY29uc3QgeyBvbk1pblByaWNlRXJyb3IsIG9uTWF4UHJpY2VFcnJvciwgbWluUHJpY2VOb3RFbnRlcmVkLCBtYXhQcmljZU5vdEVudGVyZWQsIG9uSW52YWxpZFByaWNlIH0gPSBwcmljZVZhbGlkYXRpb25FcnJvclRleHRzO1xuXG4gICAgICAgIHZhbGlkYXRvci5jb25maWd1cmUoe1xuICAgICAgICAgICAgZm9ybTogZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgcHJldmVudFN1Ym1pdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3NDbGFzczogJ18nLCAvLyBLTFVER0U6IERvbid0IGFwcGx5IHN1Y2Nlc3MgY2xhc3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6IGBtaW4tbWF4OiR7bWluUHJpY2VTZWxlY3Rvcn06JHttYXhQcmljZVNlbGVjdG9yfWAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ21pbi1udW1iZXI6MCcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5zZXRNZXNzYWdlT3B0aW9ucyh7XG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgcGFyZW50OiBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZXJyb3JTcGFuOiBlcnJvclNlbGVjdG9yLFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgc2V0U3RhdGVDb3VudHJ5VmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yVGV4dCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY2xhc3NlcyBmcm9tIGRpcnR5IGZvcm0gaWYgcHJldmlvdXNseSBjaGVja2VkXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgY2xlYW5VcFN0YXRlVmFsaWRhdGlvbjogKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0ICRmaWVsZENsYXNzRWxlbWVudCA9ICQoKGBbZGF0YS10eXBlPVwiJHtmaWVsZC5kYXRhKCdmaWVsZFR5cGUnKX1cIl1gKSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobm9kLmNsYXNzZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGZpZWxkQ2xhc3NFbGVtZW50Lmhhc0NsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAkZmllbGRDbGFzc0VsZW1lbnQucmVtb3ZlQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCB7IFZhbGlkYXRvcnMsIGluc2VydFN0YXRlSGlkZGVuRmllbGQgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=