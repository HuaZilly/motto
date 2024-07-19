import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import urlUtils from '../common/utils/url-utils';
import jquerymatchheight from 'jquery-match-height';
import carousel from './../common/carousel';


export default function () {
    const TOP_STYLING = 'top: 49px;';
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchExpand = $('#quick-search-expand');
    const $searchQuery = $quickSearchForms.find('[data-search-quick]');
    const stencilDropDownExtendables = {
        hide: () => {
            $quickSearchExpand.attr('aria-expanded', false);
            $searchQuery.trigger('blur');
            // document.querySelector('body').classList.remove('has-activeModal');
        },
        show: (event) => {
            $quickSearchExpand.attr('aria-expanded', true);
            $searchQuery.trigger('focus');
            event.stopPropagation();
            // document.querySelector('body').classList.add('has-activeModal');
        },
    };
    
    document.addEventListener('click',function(e){
        //console.log('test');
        //console.log(e.target);
        if(e.target && e.target.id== 'quick-search-expand'){
            
            var d = document.querySelector('body');
            d.className += " otherclass";
        }
    });

    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $('#quickSearch'), TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], .modal-background').length === 0) {
            stencilDropDown.hide($container);
        }
    };

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery) => {
        $("#loaderimageQuickSearch").show();
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
            const $quickSearchResultsCurrent = $quickSearchResults.filter(':visible');

            const $noResultsMessage = $quickSearchResultsCurrent.find('.quickSearchMessage');
            if ($noResultsMessage.length) {
                $noResultsMessage.attr({
                    role: 'status',
                    'aria-live': 'polite',
                });
            } else {
                const $quickSearchAriaMessage = $quickSearchResultsCurrent.next();
                $quickSearchAriaMessage.addClass('u-hidden');

                const predefinedText = $quickSearchAriaMessage.data('search-aria-message-predefined-text');
                const itemsFoundCount = $quickSearchResultsCurrent.find('.product').length;

                $quickSearchAriaMessage.text(`${itemsFoundCount} ${predefinedText} ${searchQuery}`);

                setTimeout(() => {
                    $quickSearchAriaMessage.removeClass('u-hidden');
                }, 100);
            }

            // console.log('quick-searchhhhhhhhhhhhhhhhhh.js');
            // LoadProductSizesSearch();
            
        });
        
    }, 200);

    utils.hooks.on('search-quick', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }

        doSearch(searchQuery);
        
    });

    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();

        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');

        if (searchQuery.length === 0) {
            return;
        }

        urlUtils.goToUrl(`${searchUrl}?search_query=${searchQuery}`);
        window.location.reload();
    });

    const LoadProductSizesSearch = () => {

        $("#loaderimageQuickSearch").hide();
        var listProducts = $(".productGrid li.product");
        listProducts.each(function(id, li) {
            //var Product = $(li);
            var proID = $(this).find(".ProductIDs").text();
            var forProID = $(this).find(".ProductIDsOnly").text();
            var proPrice = $(this).find(".mainLoadedPrice").text();
            var discountedPrice = (Number(proPrice.trim().replace("$",""))*Number(0.90)).toFixed(2);
            //console.log(discountedPrice);
            //console.log(proPrice);

            $(".discountedPriceCategory-"+forProID).html("$"+discountedPrice);

            if(proID == "NO")
                return;
            //console.log(proID);
            
            $("#loadQuickView-"+proID).html('<div id="loaderimage" class="loadingOverlay loadingOverlay--transition" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" class="icn-loader" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17.9"><path d="M19.2 5.7a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.1 1.3 4.4.8 5.7.8s2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4z" class="icn-wishlist__heart"></path><path d="M18.3 1.7a5.8 5.8 0 00-4-1.7c-1.5 0-2.9.6-4 1.7L10 2l-.3-.3a5.6 5.6 0 00-4-1.7c-1.5 0-2.9.6-4 1.7a5.8 5.8 0 000 8.1l8 8 .4.1.3-.1 8-8a5.7 5.7 0 00-.1-8.1zM5.7.8c1.3 0 2.5.5 3.5 1.4l.2.2.6.8.6-.7.2-.2A5 5 0 0114.3.9c1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.5a5 5 0 01-1.4 3.5L10 16.9 2.2 9.2C1.3 8.2.8 7 .8 5.7c0-1.3.5-2.5 1.4-3.5C3.2 1.3 4.4.8 5.7.8z" class="icn-wishlist__stroke"></path></svg></div>');
            //return;

            // load sizes
            utils.api.product.getById(proID, { template: 'products/quick-view-options' }, (err, response) => {
                if (err) {
                    throw new Error(err);
                }
                var availableSizes = "";
                $(response).find(".form-option").each(function(i, obj) {
                    var inputID = $(this).attr("for");
                    var data_product_attribute_value = $(this).attr("data-product-attribute-value");
                    var attr_name = $(response).find("#"+inputID).attr("name");
                    
                    availableSizes  += "<label id='"+proID+"' class='form-option unavailableinList IsProdAvailable-"+proID+"-"+data_product_attribute_value+" add-me-to-cart' data-popup-type='add-to-bag' for='"+inputID+"' data-product-attribute-value='"+data_product_attribute_value+"' name='"+attr_name+"' ><a href='javascript:void(0);' class='card-size-option' data-reveal-id='add-from-size' >"+$(this).html()+"</a></label>";
                

                    $("#loadQuickView-"+proID).html(availableSizes);

                    utils.api.productAttributes.optionChange(proID, "product_id="+proID, "products/quick-view-options", (err, response) => { 
                        var productAttributes = response.data.available_variant_values;
                        if(productAttributes.length >0){
                            productAttributes.forEach(function(number) {
                                $(".IsProdAvailable-"+proID+"-"+number).removeClass("unavailableinList");
                            });
                        }                        
                    });

                });
    
            });
        });
    }

}

// body.classList.add("MyClass");

