import jquerymatchheight from "jquery-match-height";
import Plyr from "plyr";
import { getHexFromColorName } from "./ntc";

export default class Gql {
  constructor(context, allIds) {
    this.context = context;
    this.allIds = allIds;
    this.loadGql();
  }

  groupProductsByBrand(products) {
    const groupedProducts = {};

    for (const { node } of products) {
      const { entityId, name, brand } = node;
      const brandId = brand.entityId;

      if (!groupedProducts[brandId]) {
        groupedProducts[brandId] = {
          brand: brand,
          products: [],
        };
      }

      groupedProducts[brandId].products.push({
        entityId: entityId,
        name: name,
      });
    }

    return groupedProducts;
  }

  loadGql() {
    var _context = this.context;
    var token = this.context.token;
    if (!token || !this.allIds) {
      console.log("No GQL Queries Fired");
      return;
    }
    console.log("GQL Fetching IDS ... ", this.allIds);

    var query = `
        query productsInCategory {
            site {
              products(entityIds: [${this.allIds}], first: 30) {
                pageInfo {
                  hasNextPage
                  startCursor
                  endCursor
                }
                edges {
                  node {
                    name
                    sku
                    entityId
                    path
                    availability
                    inventory {
                      isInStock
                    }
                    brand {
                      entityId
                      name
                      products(first: 15) {
                        edges {
                          node {
                            entityId
                            name
                            path
                            customFields(names: ["Colour"]) {
                              edges {
                                node {
                                  entityId
                                  name
                                  value
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    variants {
                      edges {
                        node {
                          entityId
                          options {
                            edges {
                              node {
                                entityId
                                displayName
                                values {
                                  edges {
                                    node {
                                      entityId
                                      label
                                    }
                                  }
                                }
                              }
                            }
                          }
                          inventory {
                            isInStock
                            aggregated {
                              availableToSell
                              warningLevel
                            }
                            byLocation {
                              edges {
                                node {
                                  locationEntityId
                                  isInStock
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    customFields {
                      edges {
                        node {
                          entityId
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              settings {
                inventory {
                  productOutOfStockBehavior
                }
              }
            }
            customer {
              entityId
              firstName
              wishlists {
                edges {
                  node {
                    entityId
                    name
                    items {
                      edges {
                        node {
                          entityId
                          productEntityId
                        }
                      }
                    }
                  }
                }
              }
            }
          }`;

    fetch("/graphql", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-BC-Customer-ID" : _context.customer?.id,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((json) => {
        var cursor = json.data.site.products.pageInfo.endCursor;
        this.context.cursor = cursor;
        var trimmedCursor = cursor.replace("=", "");
        let products = json.data.site.products.edges;
        
        let productsInWishlist = json.data.customer?.wishlists?.edges?.flatMap(wishlist => 
          wishlist.node?.items?.edges?.map(item => item.node.productEntityId));
        let wishlistItems = json.data.customer?.wishlists?.edges?.flatMap(wishlist => 
          wishlist.node?.items?.edges?.map(item => item.node.entityId));
        let wishlistId = json.data.customer?.wishlists?.edges[0]?.node.entityId;

        for (var node of products) {
          var product = node.node;

          // Variant Sizes
          var variants = this.getVariants(
            product.entityId,
            product.variants.edges
          );
          var sizesSel = $("#loadQuickView-" + product.entityId);
          if(product.inventory.isInStock) {
            sizesSel.addClass(trimmedCursor).html(variants);
          } else {
            if(_context.enable_restock_notify) {
              var notifyVariantId = product.variants?.edges[0]?.node.entityId;
              var notifyMeHtml = `<label id="${product.entityId}" class="form-option notifyMe direct-add-to-cart" data-product-variant="${notifyVariantId}">
                    <a href="javascript:void(0);" class="card-size-option">
                        <span class="form-option-variant">Notify Me</span> 
                    </a>
                </label>`;
              sizesSel.addClass(trimmedCursor).html(notifyMeHtml);
            }
          }

          // Thumbnail Video
          var video = this.getVideoUrl(product.customFields.edges);
          if (video) {
            this.activateVideoThumbnail(product.entityId, product.path, video);
            // this.autoplayForMobile(player);
          }

          // More Colors
          if (product.brand && _context.color_variation_display_type == "icons") {
            var colourHtml = "";
            product.brand.products.edges.forEach((brandProduct) => {
              var prod = brandProduct.node;
              var fields = prod.customFields.edges;
              fields.forEach((field) => {
                if (product.entityId == prod.entityId) {
                  colourHtml +=
                    "<div class='card-colors-list__items selected'><a href='" +
                    prod.path +
                    "' title='" +
                    prod.name +
                    "'><span class='card-colors-list__color' data-bg='" +
                    field.node.value +
                    "' style='background:" +
                    getHexFromColorName(field.node.value) +
                    "'></span></a></div>";
                } else {
                  colourHtml +=
                    "<div class='card-colors-list__items'><a href='" +
                    prod.path +
                    "' title='" +
                    prod.name +
                    "'><span class='card-colors-list__color' data-bg='" +
                    field.node.value +
                    "' style='background:" +
                    getHexFromColorName(field.node.value) +
                    "'></span></a></div>";
                }
              });
            });
            var colourSel = $("#loadMoreColours-" + product.entityId);
            colourSel.html(colourHtml);
          }

          // Wishlist
          if(productsInWishlist?.includes(product.entityId)) {
            let item = wishlistItems[productsInWishlist.indexOf(product.entityId)];
            $('.addToWishListFromList-' + product.entityId).hide();
            $('.removeFromWishListFromList-' + product.entityId).attr('data-wishlist-item', item).attr('data-wishlistid', wishlistId).css('display', 'flex').show();
          }
        }

        $("." + trimmedCursor)
          .closest("article")
          .find(".card-title")
          .matchHeight();
        $("." + trimmedCursor)
          .closest("article")
          .find(".card-bottom")
          .matchHeight();
      });
  }

  getVideoUrl(customFields) {
    for (var customField of customFields) {
      var field = customField.node;
      if (field.name == "Video") {
        return field.value;
      }
    }
    return;
  }

  activateVideoThumbnail(prodId, prodPath, video) {
    console.log("video", video);
    let videoType = "vimeo";
    let position = video.search("vimeo");
    if (position < 0) {
      videoType = "youtube";
    }

    var html = `
            <div class="prodImgSlider playThisVideo-${prodId}">
                <a href="${prodPath}" class="videoPlayerTrigger data-product-image-${prodId}">
                    <div class="js-player" data-plyr-provider="${videoType}" data-plyr-embed-id="${video}"></div>
                </a>
            </div>`;

    $(".card-img-container.card-img-container--listing.product-image-" + prodId + " .card-img-container--slide")
      .slick("slickAdd", html, 1)
      .slick("slickGoTo", 2);

    let player = new Plyr(".data-product-image-" + prodId + " .js-player", {
      controls: ["play-large"],
      ratio: "9:16",
      youtube: {
        noCookie: false,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
      vimeo: { background: true },
      clickToPlay: false,
      muted: true,
      loop: { active: true },
      resetOnEnd: true,
      autoplay: false,
    });
    // player.poster = false;

    $(".playThisVideo-" + prodId).hover(playVideo, pauseVideo);
    function playVideo(e) {
      player.play();
    }
    function pauseVideo(e) {
      player.stop();
    }

    function isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    if (isTouchDevice()) {
      console.log("Touch device detected");
      player.autoplay = true;
    } else {
      console.log("Non-touch device detected");
    }

    $(".playThisVideo-" + prodId + " .videoPlayerTrigger").on("click touchstart", function (e) {
      if (isTouchDevice()) {
        console.log("Touch !!");

        if (player.playing) {
          console.log("Already playing. Time to move on!");
          var url = $(this).attr("href");
          window.location.href = url;
        } else {
          player.play();
          e.preventDefault();
        }

      } else {
        console.log("Desktop !!");
      }
    });

  }

  getYoutubeIdFromUrl(url) {
    var video_id = url.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  autoplayForMobile(player) {
    var windowWidth = window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth;
    var mobile = windowWidth < 768;
    if (mobile) {
      player.on("ready", (event) => {
        player.play();
      });
    }

    $(window).on("resize", function () {
      var windowWidth = window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth;
      var mobile = windowWidth < 768;
      if (mobile) {
        player.play();
      }
    });
  }

  getVariants(prodId, variants) {
    var sizesHtml = "";
    var sizesDropdown = `<a href="javascript:void(0)" class="btn btn-primary btn-sm toggle-choose-options">Choose Options</a>`;
    sizesDropdown += `<ul class="product-options-list">`;

    for (var node of variants) {
      var variant = node.node;
      var variantId = variant.entityId;

      if (variant.options.edges.length == 0) {
        sizesHtml += this.sizeHtmlInStock(prodId, variantId, '', "Add to Cart", "");

        return sizesHtml;
      }

      for (var option of variant.options.edges) {
        var optionId = option.node.entityId;
        for (var val of option.node.values.edges) {
          var label = val.node.label;
          var labelId = val.node.entityId;

          if (option.node.displayName == "Size") {
            if (variant.inventory.isInStock) {
            // if (variant.inventory.aggregated.availableToSell > 0) {
              sizesHtml += this.sizeHtmlInStock(prodId, variantId, optionId, label, labelId);
            } else {
              sizesHtml += this.sizeHtmlNotInStock(prodId, variantId, optionId, label, labelId);
            }
          } else {
            sizesDropdown += this.sizeHtmlDropdown(prodId, variantId, optionId, label, labelId);
          }
        }
      }
    }
    sizesDropdown += `</ul>`;

    if (sizesHtml) {
      return sizesHtml;
    } else {
      return sizesDropdown;
    }
  }

  sizeHtmlInStock(prodId, variantId, optionId, label, labelId) { 
    var directAdd = labelId ? "" : "direct-add-to-cart";
    var popupType = `data-reveal-id="add-from-size"`;
    if ($(".product-listing-container-outfit-ideas").length) {
      popupType = `data-reveal-outfit="true"`;
    } else {
      // remove this else if you want to display a model popup on clicking the sizes on product listing page
      popupType = `data-reveal-outfit="true"`;
    }

    let html = `
        <label id="${prodId}" class="form-option IsProdAvailable-${prodId}-${labelId} add-me-to-cart ${directAdd}" data-popup-type="add-to-bag" for="attribute_rectangle__${optionId}_${labelId}" data-product-attribute-value="${labelId}" name="attribute[${optionId}]">
            <a href="javascript:void(0);" class="card-size-option iii" ${popupType}>
                <span class="form-option-variant">${label}</span>
            </a>
        </label>`;

    if (prodId == 6510) {
      html = `
            <label id="${prodId}" class="form-option IsProdAvailable-${prodId}-${labelId} ${directAdd}" for="attribute_rectangle__${optionId}_${labelId}" data-product-attribute-value="${labelId}" name="attribute[${optionId}]">
                <a href="/giftcertificates.php" class="card-size-option ll">
                    <span class="form-option-variant">${label}</span>
                </a>
            </label>`;
    }
    return html;
  }

  sizeHtmlNotInStock(prodId, variantId, optionId, label, labelId) { 

    let html;

    if(this.context.enable_restock_notify) {
      html = `
          <label id="${prodId}" class="form-option unavailableinList notifyMe IsProdAvailable-${prodId}-${labelId}" data-popup-type="add-to-bag" for="attribute_rectangle__${optionId}_${labelId}" data-product-variant=${variantId} data-product-attribute-value="${labelId}" name="attribute[${optionId}]">
              <a href="javascript:void(0);" class="card-size-option cart-notify-link" >
                  <span class="form-option-variant">${label}</span>
              </a>
              <span class="cart-notify-msg">Notify me</span>
          </label>`;
    } else {
      html = `
        <label id="${prodId}" class="form-option unavailableinList IsProdAvailable-${prodId}-${labelId}" data-popup-type="add-to-bag" for="attribute_rectangle__${optionId}_${labelId}" data-product-variant=${variantId} data-product-attribute-value="${labelId}" name="attribute[${optionId}]">
            <a href="javascript:void(0);" class="card-size-option">
                <span class="form-option-variant">${label}</span>
            </a>
        </label>`;
    }

    return html;
  }

  sizeHtmlDropdown(prodId, variantId, optionId, label, labelId) { 
    let html = `
        <li id="${prodId}" data-popup-type="dropdown-options" class="form-option IsProdAvailable-${prodId}-${labelId} add-me-to-cart notASize" for="${labelId}" data-product-attribute-value="${labelId}" name="attribute[${optionId}]">
            <a href="javascript:void(0);" class="card-size-option ooo" data-reveal-id="add-from-size">${label}</a>
        </li>`;
    return html;
  }
}
