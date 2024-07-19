import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.reveal';
import nod from './common/nod';
import PageManager from './page-manager';
import utils from "@bigcommerce/stencil-utils";
import jquerymatchheight from 'jquery-match-height';
import Gql from './custom/gql';

export default class WishList extends PageManager {
    constructor(context) {
        super(context);

        this.options = {
            template: 'account/add-wishlist',
        };

        return this;
    }

    /**
     * Creates a confirm box before deleting all wish lists
     */
    wishlistDeleteConfirm() {
        $('body').on('click', '[data-wishlist-delete]', event => {
            const confirmed = window.confirm(this.context.wishlistDelete);

            if (confirmed) {
                return true;
            }

            event.preventDefault();
        });
    }

    registerAddWishListValidation($addWishlistForm) {
        this.addWishlistValidator = nod({
            submit: '.wishlist-form input[type="submit"]',
        });

        this.addWishlistValidator.add([
            {
                selector: '.wishlist-form input[name="wishlistname"]',
                validate: (cb, val) => {
                    const result = val.length > 0;

                    cb(result);
                },
                errorMessage: 'You must enter a wishlist name.',
            },
        ]);

        $addWishlistForm.on('submit', event => {
            this.addWishlistValidator.performCheck();

            if (this.addWishlistValidator.areAll('valid')) {
                return;
            }

            event.preventDefault();
        });
    }

    onReady() {
        const $addWishListForm = $('.wishlist-form');

        if ($addWishListForm.length) {
            this.registerAddWishListValidation($addWishListForm);
        }

        this.wishlistDeleteConfirm();

        console.log("From Wishlist js");
        $(document).on('click', '#copywishlist', function(){
            let $copyText = $(this).attr('data-copy');
            let button = $(this);
            navigator.clipboard.writeText($copyText).then(function() {
                var originalText = button.text();
                button.addClass("btn-success");
                button.text('✓ Copied');
                console.log("originalText", originalText);
                setTimeout(function(){
                    button.text(originalText);
                    button.removeClass("btn-success");
                    button.removeClass("btn-danger");
                }, 750);
            }, function() {
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


        var allIds = jQuery('.wishListProductGrid [data-product-id]').map(function() {
            return parseInt(jQuery(this).attr('data-product-id'));
        }).get();
        new Gql(this.context, allIds.toString());


        // match height
        $('.card-title').matchHeight();

    }
}
