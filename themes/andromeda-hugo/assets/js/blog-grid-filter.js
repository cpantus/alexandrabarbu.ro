/**
 * Blog Grid Filter
 * Category filtering functionality for blog-grid section
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const filters = document.querySelectorAll('.c-blog-grid__filter');
    const items = document.querySelectorAll('.c-blog-grid__item');

    if (filters.length === 0 || items.length === 0) {
      return; // No blog grid on this page
    }

    // Add click event to each filter button
    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');

        // Update active state on buttons
        filters.forEach(f => {
          f.classList.remove('c-blog-grid__filter--active');
          f.setAttribute('aria-selected', 'false');
        });
        this.classList.add('c-blog-grid__filter--active');
        this.setAttribute('aria-selected', 'true');

        // Filter items
        filterItems(filterValue, items);
      });
    });

    // Set "All" button as active on load
    const allButton = document.querySelector('.c-blog-grid__filter[data-filter="all"], .c-blog-grid__filter[data-filter="toate"]');
    if (allButton && !document.querySelector('.c-blog-grid__filter--active')) {
      allButton.classList.add('c-blog-grid__filter--active');
      allButton.setAttribute('aria-selected', 'true');
    }
  }

  function filterItems(filterValue, items) {
    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      // Show all items if "all" or "toate" filter is selected
      if (filterValue === 'all' || filterValue === 'toate') {
        item.style.display = '';
        item.style.animation = 'fadeInUp 0.6s ease-out';
      }
      // Show item if category matches
      else if (itemCategory === filterValue) {
        item.style.display = '';
        item.style.animation = 'fadeInUp 0.6s ease-out';
      }
      // Hide item if category doesn't match
      else {
        item.style.display = 'none';
      }
    });
  }
})();
