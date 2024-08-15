import "focus-within-polyfill";

import "./global/jquery-migrate";
import "./common/select-option-plugin";
import PageManager from "./page-manager";
import quickSearch from "./global/quick-search";
import currencySelector from "./global/currency-selector";
import mobileMenuToggle from "./global/mobile-menu-toggle";
import menu from "./global/menu";
import foundation from "./global/foundation";
import quickView from "./global/quick-view";
import cartPreview from "./global/cart-preview";
import privacyCookieNotification from "./global/cookieNotification";
import adminBar from "./global/adminBar";
import carousel from "./common/carousel";
import loadingProgressBar from "./global/loading-progress-bar";
import svgInjector from "./global/svg-injector";
import $ from "jquery";
import compareProducts from "./global/compare-products";
import utils from "@bigcommerce/stencil-utils";
import { normalizeFormData } from "./common/utils/api";
import gql from "./custom/gql";

require("readmore-js");
import Readmore from "readmore-js";

export default class Global extends PageManager {
  onReady() {
    const { channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar } = this.context;
    cartPreview(secureBaseUrl, cartId);
    quickSearch();
    currencySelector(cartId);
    foundation($(document));
    quickView(this.context);
    carousel();
    menu();
    mobileMenuToggle();
    privacyCookieNotification();
    var _this = this;

    console.log("global.js");

    if (showAdminBar) {
      adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
    }
    loadingProgressBar();
    svgInjector();
    compareProducts(this.context.urls);

    this.runUtilities();
    this.currencyExchange();
    this.footerForm();
    // this.runLazyload();
    this.reviewScroll();
    // this.LoadProductSizes();
    this.popupProducts();
    this.popupProductsMagazine();
    this.addToWishList();
    // this.updateWishlistIcon();
    this.removeFromWishList();
    
    this.addMeToCart();
    this.tolstoyAddToCart();
    this.runMatchHeight();
    this.moreColors();
    this.toggleVouchers();
    // this.displayDiscountBanner();
    this.displayNavigationBanner();
    this.addActive();
    // this.displayFeaturedOn404Page();

    $(window).on("resize", function () {
      _this.dynamicHeaderPadding();
    });
    window.dataLayer = window.dataLayer || [];

    $( ".form-option" ).on( "click", function() {
      var index = $(".productView-options__block label").index($(this));
      window.dataLayer.insiderid = 'SSH_173143_'+productId+'_'+variantData[index].node.entityId;
    });
  }

  runUtilities() {
    $("#loadProductVariantBars").hide();

    new Readmore(".readmore", {
      collapsedHeight: 100,
      heightMargin: 5,
      moreLink: '<a class="readmore-more" href="#">Read more</a>',
      lessLink: '<a class="readmore-less" href="#">Close</a>',
    });

    $('[data-button-type="add-cart"]').on("click", (e) => {
      $(e.currentTarget).next().attr({
        role: "status",
        "aria-live": "polite",
      });
    });

    $("a.reset-btn").on("click", () => {
      $("span.reset-message").attr({
        role: "status",
        "aria-live": "polite",
      });
    });

    $(".loadingOverlay--quicksearch").on("click", function () {
      $(".dropdown--quickSearch").removeClass("is-open f-open-dropdown").attr("aria-hidden", "true");
      $("#loaderimageQuickSearch").hide();
      $(".form-searchbox__btm").hide();
      $(".form-input--searchanise").val("");
    });

    $(".js-btn-search-mob").on("click", function () {
      $(".navPages-quickSearch").toggleClass("open");
    });

    $(".navUser-action--closesearch").on("click", function () {
      $(".dropdown--quickSearch").removeClass("is-open f-open-dropdown").attr("aria-hidden", "true");
      $("#loaderimageQuickSearch").hide();
      $(".form-searchbox__btm").hide();
      $(".form-input--searchanise").val("");
    });

    $(document).on("click", ".accordion-navigation__title", function (event) {
      $("html,body").animate({ scrollTop: $(event.target).offset().top - $("header").height() - 50 }, 1000);
    });

    // $('.country_select').val('Australia').trigger('change');
    // $('.state_select').val('Victoria').trigger('change');
  }

  currencyExchange(){
    const loadingClass = 'is-loading';
    const $exchange = $('[data-currency-exchange]');
    const $exchangeDropdown = $('#currency-converter-dropdown');
    const $exchangeLoading = $('<div class="loadingOverlay"></div>');

    $exchange.on('click', event => {
      if (/Mobi/i.test(navigator.userAgent)) {
        return event.stopPropagation();
      }
      if($exchange.attr('data-loaded') == "true") {
        return;
      }
      event.preventDefault();

      $exchangeDropdown
          .addClass(loadingClass)
          .html($exchangeLoading);
      $exchangeLoading
          .show();

      utils.api.getPage("/currency-converter/", "/templates/pages", (err, content) => {
        if (content) {
          let maincontent = $(content).find(".page-content--centered").html();
          $exchangeDropdown
              .removeClass(loadingClass)
              .html(maincontent);
          $exchangeLoading
              .hide();
          $exchange.attr('data-loaded', "true");
        }
      });
    });

  }

  runMatchHeight() {
    $(".card-title").matchHeight();
    // $('.card-sizes.card-sizes--list').matchHeight();
    $(".card-bottom").matchHeight();
    $(".card-text--price").matchHeight();
  }

  footerForm() {
    $(window).on("load", function () {
      if ($("[data-content-region=footer_bottom]").find("[data-widget-id]").length > 0) {
        console.log("Hide Default Klavyo Form");
        $(".klaviyo-default-form").hide();
      } else {
        console.log("Show Default Klavyo Form");
        $(".klaviyo-default-form").show();
      }
    });
  }

  runLazyload() {
    $("img").each(function (index, value) {
      console.log(`div${index}: ${this.id}`);
      var src = $(this).attr("src");
      $(this).attr("src", "");
      $(this).attr("data-src", src);
    });
    var lazyLoadInstance = new LazyLoad({
      // Your custom settings go here
      elements_selector: "img",
    });
  }

  reviewScroll() {

    let judeReviewContainer =  $('.productView-rating .writejudgemereviews');
    judeReviewContainer.find('.jdgm-widget').css('pointer-events', 'none');
    judeReviewContainer.css('cursor', 'pointer');

    $(document).on('click','.review-scroll, .productView-rating .writejudgemereviews' , () => {
      if ($(".productView-reviewTabLink").is(":visible")) {
        console.log("We are in DESKTOP");

        $(".productView-reviewTabLink").trigger("click");
        $("html, body").animate({
          scrollTop: $("#tab-reviews").offset().top - 100,
        }, 500);
      } else {
        console.log("We are in MOBILE");

        if (!$("#panel-list-6").hasClass("active")) {
          $("#panel-list-6-heading").trigger("click");
        }

        $("html, body").animate({
          scrollTop: $("#panel-list-6").offset().top - 180,
        }, 500);
      }
    });
  }

  displayFeaturedOn404Page() {
    if (!$(".featured-products").length) return;
    console.log("fetch from homepage");
    utils.api.getPage("/", "/templates/pages", (err, content) => {
      if (content) {
        let maincontent = $(content).find(".producthomelist-wrap").html();
        $(".featured-products").html(maincontent);
        $(".featured-products [data-slick]").slick();
      }
    });
  }

  displayDiscountBanner() {
    utils.api.getPage("/discount-banner/", "/templates/pages", (err, content) => {
      if (content) {
        let maincontent = $(content).find(".page-content--centered").html();
        $(".headerpromotiontext").show().find(".text-center").html(maincontent);
      }
      this.dynamicHeaderPadding();
    });
  }

  displayNavigationBanner() {
    utils.api.getPage("/navigation-image-2/", "/templates/pages", (err, content) => {
      if (content) {
        let maincontent = $(content).find(".page-content--centered").html();
        $(".navPage-subMenu-image-2").html(maincontent);
      }
    });
  }

  dynamicHeaderPadding() {
    // var isMobile = $(window).width() < 768 ? true : false;
    // if (isMobile) {
    //   var headerHeight = $("header").height();
    //   $("body").css("padding-top", headerHeight);
    // } else {
    //   $("body").css("padding-top", "");
    // }
  }

  LoadProductSizes() {
    var listProducts = $(".productGrid li.product");
    listProducts.each(function (id, li) {
      //var Product = $(li);
      var proID = $(this).find(".ProductIDs").text();
      var forProID = $(this).find(".ProductIDsOnly").text();
      var proPrice = $(this).find(".mainLoadedPrice").text();
      var discountedPrice = (Number(proPrice.trim().replace("$", "")) * Number(0.9)).toFixed(2);
      //console.log(discountedPrice);
      //console.log(proPrice);

      $(".discountedPriceCategory-" + forProID).html("$" + discountedPrice);

      if (proID == "NO") {
        // add to cartbutton here
        var addToBag =
          "<label data-popup-type='add-to-bag' id='" +
          forProID +
          "' class='form-option add-me-to-cart test form-option--addtocart' for='" +
          forProID +
          "' data-product-attribute-value='" +
          forProID +
          "' name='" +
          forProID +
          "' ><a href='javascript:void(0);' class='btn btn-primary btn-sm btn-add-to-cart' data-reveal-id='add-from-size' >Add To Bag</a></label>";
        $("#loadQuickView-" + forProID).html(addToBag);
        return;
      }
      //console.log(proID);

      $("#loadQuickView-" + proID).html(
        '<div id="loaderimage" class="loadingOverlay loadingOverlay--transition" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" class="icn-loader" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17.9"><path d="M19.2 5.7a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.1 1.3 4.4.8 5.7.8s2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4z" class="icn-wishlist__heart"></path><path d="M18.3 1.7a5.8 5.8 0 00-4-1.7c-1.5 0-2.9.6-4 1.7L10 2l-.3-.3a5.6 5.6 0 00-4-1.7c-1.5 0-2.9.6-4 1.7a5.8 5.8 0 000 8.1l8 8 .4.1.3-.1 8-8a5.7 5.7 0 00-.1-8.1zM5.7.8c1.3 0 2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.5a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.2 1.3 4.4.8 5.7.8z" class="icn-wishlist__stroke"></path></svg></div>'
      );
      //return;

      // load sizes
      utils.api.product.getById(proID, { template: "products/quick-view-options" }, (err, response) => {
        console.log(proID);
        if (proID == 597) {
          console.log(response);
        }
        if (err) {
          throw new Error(err);
        }

        var availableSizes = "";
        $(response)
          .find(".form-option")
          .each(function (i, obj) {
            var inputID = $(this).attr("for");
            var data_product_attribute_value = $(this).attr("data-product-attribute-value");
            var attr_name = $(response)
              .find("#" + inputID)
              .attr("name");

            availableSizes +=
              "<label id='" +
              proID +
              "' class='form-option unavailableinList IsProdAvailable-" +
              proID +
              "-" +
              data_product_attribute_value +
              " add-me-to-cart' data-popup-type='add-to-bag' for='" +
              inputID +
              "' data-product-attribute-value='" +
              data_product_attribute_value +
              "' name='" +
              attr_name +
              "' ><a href='javascript:void(0);' class='card-size-option kk' data-reveal-id='add-from-size' >" +
              $(this).html() +
              "</a></label>";

            $("#loadQuickView-" + proID).html(availableSizes);
            //console.log("++");

            utils.api.productAttributes.optionChange(proID, "product_id=" + proID, "products/quick-view-options", (err, response) => {
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

        //Select Dropdown Options
        var availableOptions = "";
        $(response)
          .find(".form-select option")
          .each(function (i, obj) {
            var data_product_attribute_value = $(this).attr("data-product-attribute-value");
            var inputID = data_product_attribute_value;
            var attr_name = $(response).find("select").attr("name");
            console.log("=+=+=+=+=+>>>" + inputID);
            if (inputID != undefined)
              availableOptions +=
                "<li id='" +
                proID +
                "' data-popup-type='dropdown-options' class='form-option unavailableinList IsProdAvailable-" +
                proID +
                "-" +
                data_product_attribute_value +
                " add-me-to-cart notASize' for='" +
                inputID +
                "' data-product-attribute-value='" +
                data_product_attribute_value +
                "' name='" +
                attr_name +
                "' ><a href='javascript:void(0);' class='card-size-option ww' data-reveal-id='add-from-size' >" +
                $(this).html() +
                "</a></li>";

            utils.api.productAttributes.optionChange(proID, "product_id=" + proID, "products/quick-view-options", (err, response) => {
              var productAttributes = response.data.available_variant_values;
              if (productAttributes.length > 0) {
                productAttributes.forEach(function (number) {
                  $(".IsProdAvailable-" + proID + "-" + number).removeClass("unavailableinList");
                });
              }
            });
          });

        if (availableOptions) {
          availableOptions =
            "<a href='javascript:void(0)' class='btn btn-primary btn-sm toggle-choose-options'>Choose Options</a><ul class='product-options-list'>" +
            availableOptions;
          availableOptions += "</ul>";
          $("#loadQuickView-" + proID).html(availableOptions);
        }
      });
    });
  }

  toggleVouchers() {
    $(document).on("click", ".toggle-choose-options", function () {
      $(".product-options-list").toggleClass("show");
      $(this).toggleClass("active");
    });
  }

  moreColors() {
    $(document).on("click", ".loadMoreColors", function () {
      var productID = $(this).attr("data-id");
      var brand_name = $(".loadingBrandName-" + productID + ":first")
        .text()
        .trim();
      var brand_url = "/brands/" + brand_name.split(" ").join("-").toLowerCase() + "/";
      console.log(productID + " - " + brand_name + " - " + brand_url);

      $("#loaderimageMoreColor").show();
      $(".loadingMoreColors").html("");
      $.ajax({
        method: "GET",
        url: brand_url,
        success(ajaxresponse) {
          //console.log(ajaxresponse);
          $("#loaderimageMoreColor").hide();

          $(".loadingMoreColors").html($(ajaxresponse).find("ul.productGrid").addClass("moreColorsLoaded"));
          $(".loadingMoreColors .loadMoreColors").hide();

          carousel();

          //members and sizes
          var listProducts = $(".moreColorsLoaded li.product");
          listProducts.each(function (id, li) {
            var proID = $(this).find(".ProductIDs").text();
            var forProID = $(this).find(".ProductIDsOnly").text();
            var proPrice = $(this).find(".mainLoadedPrice").text();
            var discountedPrice = (Number(proPrice.trim().replace("$", "")) * Number(0.9)).toFixed(2);

            $(".discountedPriceCategory-" + forProID).html("$" + discountedPrice);

            if (proID == "NO") return;

            // console.log('proID', proID);

            $(".moreColorsLoaded #loadQuickView-" + proID).html(
              '<div id="loaderimage" class="loadingOverlay loadingOverlay--transition" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" class="icn-loader" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17.9"><path d="M19.2 5.7a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.1 1.3 4.4.8 5.7.8s2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4z" class="icn-wishlist__heart"></path><path d="M18.3 1.7a5.8 5.8 0 00-4-1.7c-1.5 0-2.9.6-4 1.7L10 2l-.3-.3a5.6 5.6 0 00-4-1.7c-1.5 0-2.9.6-4 1.7a5.8 5.8 0 000 8.1l8 8 .4.1.3-.1 8-8a5.7 5.7 0 00-.1-8.1zM5.7.8c1.3 0 2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.5a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.2 1.3 4.4.8 5.7.8z" class="icn-wishlist__stroke"></path></svg></div>'
            );

            // return;
            // load sizes
            utils.api.product.getById(proID, { template: "products/quick-view-options" }, (err, response) => {
              if (err) {
                throw new Error(err);
              }
              var availableSizes = "";
              $(response)
                .find(".form-option")
                .each(function (i, obj) {
                  var inputID = $(this).attr("for");
                  var data_product_attribute_value = $(this).attr("data-product-attribute-value");
                  var attr_name = $(response)
                    .find("#" + inputID)
                    .attr("name");

                  availableSizes +=
                    "<label id='" +
                    proID +
                    "' class='form-option unavailableinList IsProdAvailable-" +
                    proID +
                    "-" +
                    data_product_attribute_value +
                    " add-me-to-cart' data-popup-type='add-to-bag' for='" +
                    inputID +
                    "' data-product-attribute-value='" +
                    data_product_attribute_value +
                    "' name='" +
                    attr_name +
                    "' ><a href='javascript:void(0);' class='card-size-option iii' data-reveal-id='add-from-size' >" +
                    $(this).html() +
                    "</a></label>";

                  $(".moreColorsLoaded #loadQuickView-" + proID).html(availableSizes);

                  utils.api.productAttributes.optionChange(proID, "product_id=" + proID, "products/quick-view-options", (err, response2) => {
                    var productAttributes = response2.data.available_variant_values;
                    if (productAttributes.length > 0) {
                      productAttributes.forEach(function (number) {
                        $(".IsProdAvailable-" + proID + "-" + number).removeClass("unavailableinList");
                      });
                    }
                  });
                });
            });
          });
        },
      });
    });
  }

  /**
   * Track Add to Cart
   */

  trackAddToCart(prodDetails) {
    dataLayer.push({ ecommerce: null });

    console.log("prodDetails", prodDetails);

    // prodDetails = JSON.parse(prodDetails);
    // productId, productName, productBrand, productVariant, currency, price

    console.log("prodDetails.item_id", prodDetails.item_id);

    dataLayer.push({
      event: "added_to_cart",
      ecommerce: {
        currency: "AUD",
        value: Number(prodDetails.price),
        items: [
          {
            item_id: Number(prodDetails.item_id),
            item_name: prodDetails.item_name,
            item_brand: prodDetails.item_brand,
            item_variant: prodDetails.item_variant,
            currency: prodDetails.currency,
            price: Number(prodDetails.price),
          },
        ],
      },
    });
  }

  addMeToCart() {
    var _this = this;
    $(document).on("submit", "form[data-cart-item-add]", function () {
      var prodDetails = $(this).find(".btn--addtocart").attr("data-product-details");
      if (prodDetails) {
        _this.trackAddToCart(JSON.parse(prodDetails));
      }
    });

    $(document).on("click", ".add-me-to-cart", function () {
      var _clickedSize = $(this).text().trim();
      var _product_id = $(this).attr("id");
      var _product_brand = $(".loadingBrandName-" + _product_id)
        .text()
        .trim();
      var _product_name = $(".card-title-" + _product_id + ":first")
        .text()
        .trim();
      var _actual_price = $(".mainPrice-" + _product_id + ":first")
        .text()
        .trim();

      var prodDetails = {
        item_id: _product_id,
        item_name: _product_name,
        item_brand: _product_brand,
        item_variant: _clickedSize,
        currency: "AU",
        price: _actual_price.replace(/[^0-9.-]+/g, ""),
      };

      _this.trackAddToCart(prodDetails);

      if ($(".product-listing-container-outfit-ideas").length) {
        console.log("We're on outfit ideas");
        console.log($(".for-outfit-loader-" + $(this).attr("id")).length);
        console.log($(this).attr("id"));

        if ($(".for-outfit-loader-" + $(this).attr("id")).length) {
          console.log($(this));
          $(".for-outfit-loader-" + $(this).attr("id"))
            .removeClass("text-success")
            .html("");
        } else {
          $(this)
            .parent(".card-sizes--list")
            .parent(".card-bottom")
            .find(".card-colors__wrapper")
            .html('<span class="outfit-loader kkk for-outfit-loader-' + $(this).attr("id") + '" ></span>');
        }
      }
      // for product listing page
      if ($(".product-listing.yyy").length) {
        console.log("We're on listing page");
        if ($(".outfit-loader-" + $(this).attr("id")).length) {
          console.log($(this));
          $(".outfit-loader-" + $(this).attr("id"))
            .removeClass("text-success")
            .html("");
        } else {
          $(this)
            .parent(".card-sizes--list")
            .parent(".card-bottom")
            .find(".card-colors__wrapper")
            .append('<span class="outfit-loader jjj outfit-loader-' + $(this).attr("id") + '" ></span>');
        }
      }

      var hideSize = "NO";
      if ($(this).hasClass("notASize")) {
        hideSize = "YES";
      }
      console.log(" ------------ > " + hideSize);

      var popupType = $(this).attr("data-popup-type");

      console.log(popupType, "popupType");

      if (popupType) {
        console.log("popupType", popupType);

        var outOfStock = "The selected option is out of stock !!!";
        var addedToCart = "Selected product is added to cart !!!";

        if (popupType == "add-to-bag") {
          $("#clickedSize").hide();
          var confirmCart = "Do you want this product added";
        } else {
          $("#clickedSize").show();
          var confirmCart = "Do you want to add";
        }
      } else {
        var outOfStock = "The selected size is out of stock !!!";
        var addedToCart = "Selected product size is added to cart !!!";
        var confirmCart = "Do you want to add the size";
        $("#clickedSize").show();
      }

      $("#isAvailable h5 .primart-text").text(confirmCart);
      $("#addingSuccess h5").text(addedToCart);
      $("#notAvailable h5").text(outOfStock);

      $("#addingError").hide();
      $("#addingSuccess").hide();
      //console.log("Add To Cart Clicked ...");
      //console.log($(this).attr("id"));
      var clickedSize = $(this).text();
      var product_id = $(this).attr("id");
      var attrubute_id = $(this).attr("for");
      var attrubute_value = $(this).attr("data-product-attribute-value");
      var attrubute_name = $(this).attr("name");
      var product_name = $(".card-title-" + product_id + ":first").text();
      console.log("product-name ==> " + product_name);
      var actual_price = $(".mainPrice-" + product_id + ":first").text();
      console.log("Actual Price => " + actual_price);
      var member_price = $(".discountedPriceCategory-" + product_id + ":first").text();
      console.log("Member Price => " + member_price);

      // var product_image_src = $(".productGrid .product .product-image-"+product_id+" .data-product-image-"+product_id).find("img").attr("src");
      var product_image_src = $(".productGrid .product .product-image-" + product_id + " .prodImgSlider:nth-child(1)")
        .find("img")
        .attr("src");

      var product_image_size = $(".productGrid .product .product-image-" + product_id + " .data-product-image-" + product_id)
        .find("img")
        .attr("sizes");
      // var product_image = product_image_src.replace("/160w/","/"+product_image_size.replace("px","")+"w/");
      var product_image = product_image_src.replace("/160w/", "/600".replace("px", "") + "w/");
      console.log("product-image ==> " + product_image);
      console.log("product-image-size ==> " + product_image_size);
      console.log("product-image-final ==> " + product_image);

      console.log("clickedSize ===", clickedSize);
      console.log("product_id", product_id);
      console.log("attrubute_id", attrubute_id);
      console.log("attrubute_value", attrubute_value);
      console.log("attrubute_name", attrubute_name);

      if ($(this).hasClass("unavailableinList")) {
        $("#notAvailable").show();
        $("#isAvailable").hide();
      } else {
        $("#notAvailable").hide();
        $("#product_id").val(product_id);
        $("#clickedSize").text(clickedSize);
        $(".product_attrib_to_add").attr("id", attrubute_id);
        $(".product_attrib_to_add").val(attrubute_value);
        $(".product_attrib_to_add").attr("name", attrubute_name);
        $("#isAvailable").show();
        $("#actualPrice").text(actual_price);
        $("#memberPrice").text(member_price);
        $("#productName").text(product_name);
        $("#productSize").text(clickedSize);

        if (clickedSize == "Add To Bag" || hideSize == "YES") {
          $(".dispSizeText").addClass("d-none");
          if (hideSize == "NO") $("#productSize").addClass("d-none");
          $("#productSize").text(clickedSize);
          $("#productSize").addClass("hideSizeText");
        }

        $("#addedImage").attr("src", product_image);
      }

      if (popupType == "add-to-bag") {
        const $form = $("form[data-cart-item-add]:last");
        $form.trigger("submit");
      }
    });

    // form submit
    const $form = $("form[data-cart-item-add]:last");
    $form.on("submit", (event) => {
      this.addProductToCartListing(event, $form[0]);
    });
  }

  tolstoyAddToCart() {
    const myCallback = (data) => {
      const { productId } = data;
      console.log("Your add to cart logic here", productId);
      var sizeElem = $(".form-option.form-option--custom:not(.unavailable):first").next("input");
      const formData = new FormData();
      formData.append("action", "add");
      formData.append("product_id", "9493");
      formData.append(sizeElem.attr("name"), sizeElem.val());
      formData.append("qty[]", "1");

      utils.api.cart.itemAdd(normalizeFormData(formData), (err, response) => {
        const errorMessage = err || response.data.error;

        if (errorMessage) {
          console.error(errorMessage);
          window.tolstoyWidget.postMessage({
            ...data,
            eventName: "tolstoy_add_to_cart_error",
            description: "itemSoldOut",
          });
        } else {
          console.log(response);
          window.tolstoyWidget.postMessage({
            ...data,
            eventName: "tolstoy_add_to_cart_success",
          });
          // update the count by 1
          var currentCount = $(".countPill").text();
          var newCount = parseInt(currentCount) + 1;
          $(".countPill").addClass("countPill--positive").text(newCount);
        }
      });
    };

    const subscribeToAddToCart = () => {
      console.log("subscribeToAddToCart");
      window.tolstoyWidget.subscribe("tolstoy_add_to_cart", myCallback);
    };

    if (window.tolstoyWidget) {
      subscribeToAddToCart();
    } else {
      window.addEventListener("tolstoyWidgetReady", function () {
        subscribeToAddToCart();
      });
    }
  }

  /**
   *
   * Add a product to cart
   *
   */
  addProductToCartListing(event, form) {
    console.log("addtocartformsubmitted");
    console.log($(form).find(".product_attrib_to_add").val());
    console.log($(form).find("#product_id").val());
    // IsProdAvailable-526-101
    // IsProdAvailable-526-101
    // IsProdAvailable-product_id-attribute[386]

    const $addToCartBtn = $("#form-action-addToCart", $(event.target));
    const originalBtnVal = $addToCartBtn.val();
    const waitMessage = $addToCartBtn.data("waitMessage");
    var clickedSizeClass = "IsProdAvailable-" + $(form).find("#product_id").val() + "-" + $(form).find(".product_attrib_to_add").val();
    var ClickedProductID = $(form).find("#product_id").val();
    console.log(clickedSizeClass);

    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) {
      return;
    }

    // Prevent default
    event.preventDefault();

    // display the loader
    $("#isAvailable").hide();
    $("#isAvailable").append(
      '<div id="loaderimage" class="loadingOverlay mm" style="display: block;position: relative !important; top: 22px!important;"></div>'
    );
    // Add item to cart
    utils.api.cart.itemAdd(normalizeFormData(new FormData(form)), (err, response) => {
      console.log("response on add to cart", response);
      console.log(response);
      const errorMessage = err || response.data.error;

      if (errorMessage) {
        // Strip the HTML from the error message
        // unable to add to cart - shoe error message
        $("#addingError").show();
        if (response.data.error) $(".stockNotAvailable").html(response.data.error);
        $("#isAvailable").hide();
        $(".loadingOverlay").hide();

        if ($(".product-listing-container-outfit-ideas").length) {
          //var currentLoading = $(".card-colors__wrapper:contains('Loading ...')");
          var currentLoading = $(".for-outfit-loader-" + ClickedProductID);
          currentLoading.removeClass("text-success").addClass("text-danger").html(response.data.error);
          setTimeout(function () {
            currentLoading.removeClass("text-success").removeClass("text-danger").html("");
            currentLoading.remove();
          }, 3000);
        }

        // for product listing pages
        if ($(".product-listing.yyy").length) {
          var currentLoading = $(".outfit-loader-" + ClickedProductID);
          currentLoading.removeClass("text-success").addClass("text-danger").html(response.data.error);
          setTimeout(function () {
            currentLoading.removeClass("text-success").removeClass("text-danger").html("");
            currentLoading.remove();
          }, 3000);
        }
      } else {
        var product_id = response.data.cart_item.product_id;
        console.log(product_id);
        console.log("here ... ");
        console.log(clickedSizeClass);

        // product added to cart - show success message
        $("#addingSuccess").show();
        $("#isAvailable").hide();
        $(".loadingOverlay").hide();

        var product_name = $(".card-title-" + product_id + ":first").text();
        console.log("product-name ==> " + product_name);
        var actual_price = $(".mainPrice-" + product_id + ":first").text();
        console.log("Actual Price => " + actual_price);
        var member_price = $(".discountedPriceCategory-" + product_id + ":first").text();
        console.log("Member Price => " + member_price);

        var product_image = response.data.cart_item.thumbnail;
        //$(".productGrid .product .product-image-"+product_id+" .data-product-image-"+product_id).find("img").attr("src");
        console.log("product-image ==> " + product_image);
        var selectedSize = $("#productSize").text().trim();
        console.log(selectedSize);

        var addedImage = $("#addedImage").attr("src");
        $("#addedProductImage").attr("src", addedImage);

        // $("#addedProductImage").attr("src",product_image);
        $("#addedProductName").text(product_name);
        $("#addedActualPrice").text(actual_price);
        $("#addedMemberPrice").text(member_price);
        $("#addedProductSize").text(selectedSize);

        if (selectedSize == "Add To Bag" || $("#productSize").hasClass("hideSizeText")) {
          $(".addedDispSizeText").addClass("d-none");
        }
        if (selectedSize == "Add To Bag") $("#addedProductSize").addClass("d-none");

        // read the cart count

        // update the count by 1
        var currentCount = $(".countPill").text();
        var newCount = parseInt(currentCount) + 1;
        $(".countPill").addClass("countPill--positive").text(newCount);

        if ($(".product-listing-container-outfit-ideas").length) {
          //var currentLoading = $(".card-colors__wrapper:contains('Loading ...')");
          var currentLoading = $(".for-outfit-loader-" + product_id);
          currentLoading.removeClass("text-danger").addClass("text-success").html("Added to Cart");
          // added to make the click status active
          $("." + clickedSizeClass).addClass("active");
          // commented to always display the message
          // setTimeout(function(){
          //     currentLoading.removeClass('text-success').removeClass('text-danger').html('');
          // }, 2000);
        }

        if ($(".product-listing.yyy").length) {
          var currentLoading = $(".outfit-loader-" + product_id);
          currentLoading.removeClass("text-danger").addClass("text-success").html("Added to Cart");
          // added to make the click status active
          $("." + clickedSizeClass).addClass("active");
          // commented to always display the message
          // setTimeout(function(){
          //     currentLoading.removeClass('text-success').removeClass('outfit-fail').html('');
          // }, 2000);
        }
      }
    });
  }

  // load product in popup for outfit-ideas
  popupProducts() {
    var _context = this.context;
    $(document).on("click", ".loadSubProducts", function (e) {
      var subCatUrl = $(this).attr("rel");
      console.log("subCatUrl", subCatUrl);

      $(".loadingProducts").html("");
      $(".loadingOverlay").show();
      $.ajax({
        method: "GET",
        url: subCatUrl,
        success(response) {
          if ($(response).find("ul.productGrid").length == 0) {
            $(".loadingOverlay").hide();
            $(".loadingProducts").html("Oops too late! This outfit is now sold out.");
            return;
          }

          $(".loadingProducts").html($(response).find("ul.productGrid").addClass("subCatLoadedInPopup"));
          $(".loadingProducts").find("[data-slick]").slick();
          $(".loadingOverlay").hide();

          $(".card-title").matchHeight();
          $(".card-bottom").matchHeight();
          $(".card-text--price").matchHeight();

          var allIds = $(".subCatLoadedInPopup [data-productid]")
            .map(function () {
              return parseInt(jQuery(this).attr("data-productid"));
            })
            .get();
          new gql(_context, allIds.toString());
        },
      });
    });

    $("button.button--close").on("click", function () {
      $("#subcategory-list").removeClass("modalCss");
    });
  }

  // load product in popup for outfit-ideas
  popupProductsMagazine() {
    $("a.loadSubProductsMagazine").on("click", function () {
      var subCatUrl = $(this).attr("rel").replace("https://motto-staging.mybigcommerce.com", "");
      // console.log('subCatUrlxxxxxx', subCatUrl);

      $(".loadingProductsMagazine").html("");
      $(".loadingOverlay").show();
      $.ajax({
        method: "GET",
        url: subCatUrl,
        success(response) {
          //console.log(response);
          $(".loadingProductsMagazine").html($(response).find("ul.productGrid").addClass("subCatLoadedInPopupMagazine"));
          // initialize the slider
          $("[data-slick]").slick();
          // .removeAttr("data-slick").removeClass("card-img-container--slide").removeClass("prodImgSlider")
          $(".loadingOverlay").hide();

          $("ul.subCatLoadedInPopupMagazine li").each(function (id, li) {
            var subProID = $(this).find(".ProductIDs").text();
            var subCatPopUpMainPriceProId = $(this).find(".ProductIDsOnly").text();
            //console.log(relatedMainPriceProId);
            var subCatPopUpMainPrice = $(this).find(".mainLoadedPrice").text();
            //console.log(relatedMainPrice);
            var discountedsubCatPopUpProductPrice = (Number(subCatPopUpMainPrice.trim().replace("$", "")) * Number(0.9)).toFixed(2);
            //console.log(subCatPopUpMainPriceProId+" - "+subCatPopUpMainPrice+" - "+discountedsubCatPopUpProductPrice);

            $(".discountedPriceCategory-" + subCatPopUpMainPriceProId).html("$" + discountedsubCatPopUpProductPrice);

            if (subProID == "NO") return;
            //console.log(proID);

            $("#loadQuickView-" + subProID).html(
              '<div id="loaderimage" class="loadingOverlay" style="display: block;position: relative !important; top: 22px!important;"></div>'
            );
            //return;
            utils.api.product.getById(subProID, { template: "products/quick-view-options" }, (err, response) => {
              if (err) {
                throw new Error(err);
              }
              //console.log(response);
              // loop the class
              var availableSizes = "";
              $(response)
                .find(".form-option")
                .each(function (i, obj) {
                  //console.log($(this).html());
                  availableSizes += "<label class='form-option' >" + $(this).html() + "</label>";
                });

              $("#loadQuickView-" + subProID).html(availableSizes);
            });
          });
        },
      });
    });
  }

  // update the icons of already added wishlist
  updateWishlistIcon() {
    utils.api.getPage("/wishlist.php?action=viewwishlistitems&wishlistid=1", "/account/wishlist-details", (err, response) => {
      $(response)
        .find(".productGrid li.product")
        .each(function (id, li) {
          var productID = $(this).attr("data-product-id");
          var itemID = $(this).attr("data-item-id");
          var removeURL = $(this).attr("data-remove-url");

          // console.log(productID+" - "+itemID+" - "+removeURL);
          // hide add button
          $(".addToWishListFromList-" + productID).hide();
          // show remove button
          $(".removeFromWishListFromList-" + productID).show();

          $(".removeFromWishListFromList-" + productID).attr({
            "data-product-id": productID,
            "data-item-id": itemID,
            "data-remove-url": removeURL,
          });
        });
    });
  }

  // add to wishlist
  addToWishList() {
    let _context = this.context;
    let count = 0;
    $(document).on("click", ".addToWishListFromList", function () {
      var prodID = $(this).attr("data-pro-id");

      if (!$(".loggedinuser")[0]) {
        window.location.href = "/login.php";
        return;
      }

      $(".loaderimageWishList-" + prodID).show();

      if (_context.customer.wishlists.length == 0 && count == 0) {
        $.ajax({
          method: "POST",
          url: "/wishlist.php?action=addwishlist",
          data: { submit: "", publicwishlist: "on", wishlistname: "my wishlist", authenticity_token: _context.token },
          success(response) {
            count++;
            $.ajax({
              method: "POST",
              url: "/wishlist.php",
              data: { action: "add", product_id: prodID },
              success(response) {
                $(".loaderimageWishList-" + prodID).hide();
                $(".addToWishListFromList-" + prodID).hide();
                $(".removeFromWishListFromList-" + prodID).show();
              },
            });
          },
        });
      } else {
        $.ajax({
          method: "POST",
          url: "/wishlist.php",
          data: { action: "add", product_id: prodID },
          success(response) {
            $(".loaderimageWishList-" + prodID).hide();
            $(".addToWishListFromList-" + prodID).hide();
            $(".removeFromWishListFromList-" + prodID).show();
          },
        });
      }
    });
  }

  // add to wishlist
  removeFromWishList() {
    $(document).on("click", ".removeFromWishListFromList", function () {
      var prodID = $(this).attr("data-pro-id");
      let wishlistId = $(this).attr("data-wishlistid");
      var wishlistItem = $(this).attr("data-wishlist-item");
      $(".loaderimageRemoveWishList-" + prodID).show();
      $.ajax({
        method: "POST",
        url: "/wishlist.php?wishlistid=" + wishlistId + "&action=remove&item_id=" + wishlistItem,
        success(response) {
          $(".loaderimageRemoveWishList-" + prodID).hide();
          $(".removeFromWishListFromList-" + prodID).hide();
          $(".addToWishListFromList-" + prodID).show();
        },
      });
    });
  }

  // add active class for description tab only for desktop view
  addActive(){
    //  alert('test');

      if ($(window).width() > 1200) {
        if ($('.product-dtl-page').length === 0) {
          $(".accordion-navigation--description").addClass("active");
          $(".content--description").addClass("active");
        }
      }

  }
  
}

