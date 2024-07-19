/*
 Import all product specific js
 */
import PageManager from "./page-manager";
import Review from "./product/reviews";
import collapsibleFactory from "./common/collapsible";
import ProductDetails from "./common/product-details";
import videoGallery from "./product/video-gallery";
import { classifyForm } from "./common/utils/form-utils";
import modalFactory, { modalTypes } from "./global/modal";

import { normalizeFormData } from "./common/utils/api";
// import modalFactory, { showAlertModal, modalTypes } from './global/modal';

import utils from "@bigcommerce/stencil-utils";
import jquerymatchheight from "jquery-match-height";

import carousel from "./common/carousel";
import { getHexFromColorName } from "./custom/ntc";

const { WRITE_REVIEW } = modalTypes;

export default class Product extends PageManager {
  constructor(context) {
    super(context);
    this.url = window.location.href;
    this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    this.reviewModal = modalFactory("#modal-review-form")[0];
  }

  onReady() {
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", () => {
      if (this.url.indexOf("#write_review") !== -1 && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });

    let validator;

    // Init collapsible
    collapsibleFactory();

    this.productDetails = new ProductDetails($(".productView"), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();

    videoGallery();

    this.translateColours();

    this.bulkPricingHandler();

    const $reviewForm = classifyForm(".writeReview-form");

    if ($reviewForm.length > 0) {
      const review = new Review($reviewForm);
      $(document).on("opened.fndtn.reveal", () => this.reviewModal.setupFocusableElements(WRITE_REVIEW));
      $("body").on("click", '[data-reveal-id="modal-review-form"]', () => {
        validator = review.registerValidation(this.context);
        this.ariaDescribeReviewInputs($reviewForm);
      });
      $reviewForm.on("submit", () => {
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

      $(".MagicZoomGallery")
        .find("iframe")
        .each(function (i) {
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
  }

  moreColoursCarousel() {
    var brandSelector = $("[data-brand]");
    var brandName = brandSelector.attr("data-brand");
    var brandUrl = "/brands/" + brandName.split(" ").join("-").toLowerCase() + "/";

    let carouselSettings = {
      dots: false,
      infinite: true,
      // mobileFirst: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      slide: ".js-product-slide",
      arrows: true,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            infinite: true,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            infinite: true,
          },
        },
      ],
    };

    utils.api.getPage(brandUrl, "/templates/brand", (err, response) => {
      var slider = $(response).find("#brandproducts-slider").html();

      var noofsliders = $(slider).find("article").length;
      
      if (noofsliders < 2) {
        $(".more-colours-block").removeClass("d-md-block");
        $(".more-colours-mobile").addClass("d-none");
      } else {
        $(".loadavailableproducts-mob").html(slider).slick(carouselSettings);
        // $(".loadavailableproducts-mob").slick(carouselSettings);
      }
      if(noofsliders <= 2){
        $('.loadavailableproducts-mob').slick('unslick');
      }
    });

    $(document).on("click", ".more-colours-mobile", function (e) {
      if ($(this).hasClass("slickonclick")) {
        $(this).removeClass("slickonclick");
        $(".loadavailableproducts-mob").slick("destroy").slick(carouselSettings);
      }
      utils.api.getPage(brandUrl, "/templates/brand", (err, response) => {
        var slider = $(response).find("#brandproducts-slider").html();
  
        var noofsliders = $(slider).find("article").length;
        // alert(noofsliders);
        if (noofsliders <= 2) {
          $('.loadavailableproducts-mob').slick('unslick');
        } 
      })
    });
  }

  translateColours() {
    $("[data-formatbg]").each(function (i) {
      const bg = $(this).attr("data-formatbg");
      $(this).css("background", getHexFromColorName(bg));
    });
  }

  LoadProductSizesSearch() {
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

      $("#loadQuickView-" + proID).html(
        '<div id="loaderimage" class="loadingOverlay loadingOverlay--transition" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" class="icn-loader" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17.9"><path d="M19.2 5.7a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.1 1.3 4.4.8 5.7.8s2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4z" class="icn-wishlist__heart"></path><path d="M18.3 1.7a5.8 5.8 0 00-4-1.7c-1.5 0-2.9.6-4 1.7L10 2l-.3-.3a5.6 5.6 0 00-4-1.7c-1.5 0-2.9.6-4 1.7a5.8 5.8 0 000 8.1l8 8 .4.1.3-.1 8-8a5.7 5.7 0 00-.1-8.1zM5.7.8c1.3 0 2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.5a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.2 1.3 4.4.8 5.7.8z" class="icn-wishlist__stroke"></path></svg></div>'
      );
      //return;

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
              "' ><a href='javascript:void(0);' class='card-size-option' data-reveal-id='add-from-size' >" +
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
      });
    });
  }

  ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each((_, input) => {
      const $input = $(input);
      const msgSpanId = `${$input.attr("name")}-msg`;

      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  }

  productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  }

  bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  }

  // loading variants stock level
  getVariantStockLevels() {
    const $optionSet = $("[data-product-option-change]");
    const $form = $optionSet.parents($("form"));
    const productId = $('[name="product_id"]', $form).val();
    const $optionsArray = $optionSet.find(".form-radio");
    // console.log('$optionsArray', $optionsArray);

    if ($optionsArray.length > 0) {
      $(".productView-options__block").show();
      $("#loaderimageStockshow").show();
      $.each($optionsArray, (index, item) => {
        const attributeId = $(item).attr("name");
        const attributeIdID = $(item).attr("id");
        const variantSize = $('[for="' + attributeIdID + '"]', $form)
          .text()
          .trim();
        const attributeValue = $(item).val();
        const attribute = `${attributeId}=${attributeValue}`;

        utils.api.productAttributes.optionChange(productId, attribute, "products/product-view-options", (err, response) => {
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
  }

  playVideo() {
    //console.log("from play video");

    $(".playLoadedVideo").on("click", function () {
      var videoID = $(this).attr("data-video-id");
      var viewportheight = $(".productView-img-container").height();
      var viewportwidth = $(".productView-img-container").width();
      var embedCode =
        '<iframe id="doNotPlayMeAnyMore" type="text/html" width="' +
        viewportwidth +
        '" height="' +
        viewportheight +
        '" src="https://www.youtube.com/embed/' +
        videoID +
        '?autoplay=1&mute=0" frameborder="0" allow="autoplay;"></iframe>';
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
  }
}
