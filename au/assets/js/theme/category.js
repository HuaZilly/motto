import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import utils from "@bigcommerce/stencil-utils";
import jquerymatchheight from 'jquery-match-height';
import { normalizeFormData } from './common/utils/api';
import modalFactory, { showAlertModal, modalTypes } from './global/modal';
// import 'slick-carousel';
import carousel from './common/carousel';
import InfiniteScroll from 'infinite-scroll';

import gql from './custom/gql';



export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
        this.url = window.location.pathname;
        this.loaderDiv = '<div id="loaderimage" class="loadingOverlay ss" style="display: block;"></div>';
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');

        this.previewModal = modalFactory('#previewModal')[0];
    }

    onReady() {
        console.log('categoryyyyyyy.js');

        this.outFitIdeas(this.context);

        var allIds = jQuery('#product-listing-container [data-productid]').map(function() {
            return parseInt(jQuery(this).attr('data-productid'));
        }).get();
        // $('#product-listing-container').attr('data-current-products', allIds.toString());
        new gql(this.context, allIds.toString());
        

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => {
            $('span.reset-message').attr({
                role: 'status',
                'aria-live': 'polite',
            });
        });

        if($('.pagination-item--next .pagination-link').length > 0) {
            let infScroll = this.infiniteScroll();
            let _context = this.context;

            infScroll.on( 'append', function( body, path, items, response ) {

                var allIds = [];
                items.forEach(item => {
                    var id = parseInt($(item).attr('data-productid'));
                    allIds.push(id);
                });
                // $('#product-listing-container').attr('data-current-products', allIds.toString());
                new gql(_context, allIds.toString());

                carousel();
            });
            infScroll.on( 'last', function( body, path ) {
                $('.loader-ellips').hide();
            });
        }

        $(document).on('touchstart', '.product.product--outfits', function(){
            $('.product.product--outfits').removeClass('active');
            $(this).addClass('active');
        });

        this.backInStockKlaviyo();
    }

    backInStockKlaviyo(){
        $(document).on("click", ".notifyMe", function(){
            var productid = $(this).attr("id");
            var variantid = $(this).attr("data-product-variant");
            var producttitle = $(".card-title-" + productid).text();  

            if($('#manual-bis-product').length > 0) {
                $('#manual-bis-product').val(productid);
                $('#manual-bis-variant').val(variantid);
                $('#manual-bis-product-name').text(producttitle);
                $(".manual-bis-message").addClass("d-none");
                $(".manual-bis-success").addClass("d-none");
                $(".manual-bis-popup").removeClass("d-none");
            }
        });
        $(document).on("click", "#manual-bis-form-close", function(){
            $(".manual-bis-popup").addClass("d-none");
        });
        $(document).mouseup(function(e) {
            var container = $("#manual-bis .popup-content");
            if (!container.is(e.target) && container.has(e.target).length === 0){
            $("#manual-bis").addClass("d-none");
            }
        });
        $('#manual-bis-form').submit( function(e){
            e.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function(response){
                    console.log(response);
                    $(".manual-bis-success").removeClass("d-none");
                },
                error: function(err) {
                    console.error(err);
                    $(".manual-bis-message").removeClass("d-none");
                }
            });
        });
    }

    outFitIdeas(context) {
        if($('.product-listing-container-outfit-ideas').length == 0) return;

        let perPage = 12;
        let start = 0;
        let end = perPage;
        let _this = this;
        let allowScroll = true;
        _this.paginateOutFit(start, end, context.categories);
        start = end;
        end = end + perPage;
        $(window).on('scroll', function() {
            if($(window).scrollTop() + $(window).height() > $(document).height() - $('footer.footer').height() - 100) {
                if (allowScroll) {
                    if(end > context.categories.length) {
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
        $(window).on('resize', function() {
            _this.removeModalOnMobile();
        });
    }

    removeModalOnMobile(){
        var isMobile = $(window).width() < 768 ? true : false;
        console.log('isMobile ? ', isMobile);
        if(isMobile) {
            $('.removeModalOnMobile').removeClass('loadSubProducts');
            $('.removeModalOnMobile').removeAttr('data-reveal-id');
        } else {
            $('.removeModalOnMobile').addClass('loadSubProducts');
            $('.removeModalOnMobile').attr('data-reveal-id', 'subcategory-list');
        }
    }
    paginateOutFit(start, end, categories){
        console.log('Display from', start, 'to', end);
        let html = '';
        for(var i = start; i < end; i++) {
            html += this.generateOutfitHtml(categories[i]);
        }
        $('.productGrid--outfits').append(html);
    }
    generateOutfitHtml(category){
        let imageUrl = category.image ? category.image.data : '';
        imageUrl = imageUrl.replace('{:size}', 'original');
        let imageAlt = category.image ? category.image.alt : '';
        let url = category.url ? category.url : '';
        let html = `
        <li class="product product--outfits col">
            <article class="card card--outfits pb-0">
                <div class="card-wrap card-wrap--outfits position-relative">
                    <div class="removeModalOnMobile loadSubProducts card-image--outfits" rel="${url}" data-reveal-id="subcategory-list" data-desktop="true">
                        <figure class="card-figure card-figure--outfits card-figure--h-auto">
                            <div class="card-img-container card-img-container--outfits">
                                <img class="card-image lazyautosizpro_skues lazyloaded" data-sizes="auto" src="${imageUrl}" alt="${imageAlt}" title="${imageAlt}">
                            </div>
                        </figure>
                    </div>
                    <div class="card-body card-body--outfits p-0">
                        <a href="javascript:void(0);" rel="${url}" data-reveal-id="subcategory-list" class="btn btn-dark loadSubProducts">Shop this look</a>
                    </div>
                </div>
            </article>
        </li>`;
        return html;
    }
    

    infiniteScroll() {
        const elem = document.querySelector('.productGrid');
        const infScroll = new InfiniteScroll(elem, {
            path: '.pagination-item--next .pagination-link',
            append: '.product',
            history: false,
            hideNav: '.pagination-list',
            scrollThreshold: 800,
        });
        return infScroll;
    }

    
    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

}
