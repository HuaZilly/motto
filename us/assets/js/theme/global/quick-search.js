import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import urlUtils from '../common/utils/url-utils';

export default function () {
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchClear = $('.quickSearchInput .modal-close');
    const $quickSearchDiv = $('#quickSearch');
    const $searchQuery = $('#search_query');
    const stencilDropDownExtendables = {
        hide: () => {
            $searchQuery.trigger('blur');
            $quickSearchResults.html('');
            $quickSearchClear.hide();
            $quickSearchResults.removeClass('rendered');
            $('body').removeClass('search-dropdown-open');
        },
        show: (event) => {
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearchDiv);

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
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
            $quickSearchResults.addClass('rendered');
            $quickSearchClear.show();
            $('body').addClass('search-dropdown-open')

            $('.modal-close').on('click', (event) => {
                $quickSearchResults.empty().hide();
                $quickSearchResults.removeClass('rendered');
                $('body').removeClass('search-dropdown-open')
                $searchQuery.val('');
                event.preventDefault();
            });
        });
    }, 200);

    utils.hooks.on('search-quick', (event, currentTarget) => {
        // Don't use quick search for mobiles
        // if (/Mobi/i.test(navigator.userAgent)) {
        //     return;
        // }

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

    $(document).on('click', '#quickSearch .view-all-button', function () {
        $('#quickSearch').find('form').trigger('submit');
    });
}
