/* ========================================
   🚀 ENHANCED DECAP CMS SIDEBAR JAVASCRIPT
   Collapsible interface implementation
   ======================================== */

(function() {
  'use strict';

  // === 📋 CONFIGURATION ===
  const CONFIG = {
    STORAGE_KEY: 'decap_cms_sidebar_state',
    DEFAULT_EXPANDED: ['content-management'], // Only content expanded by default
    SEARCH_DEBOUNCE: 300,
    ANIMATION_DURATION: 300
  };

  // === 📁 GROUP DEFINITIONS ===
  const GROUPS = {
    'quick-actions': {
      title: '🚀 Quick Actions',
      icon: '⚡',
      collections: ['quick_blog_ro', 'quick_services_ro', 'quick_pages_ro'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      expanded: true
    },
    'content-management': {
      title: '🌐 Content Management', 
      icon: '📝',
      subgroups: {
        'romanian': {
          title: '🇷🇴 Romanian',
          collections: ['blog_ro', 'services_ro', 'career_ro', 'case_studies_ro', 'authors_ro', 'pages_ro']
        },
        'english': {
          title: '🇬🇧 English', 
          collections: ['blog_en', 'services_en', 'career_en', 'case_studies_en', 'authors_en', 'pages_en']
        }
      },
      expanded: true
    },
    'visual-elements': {
      title: '🎨 Visual Elements',
      icon: '🎨', 
      collections: ['visual_buttons', 'visual_cards', 'visual_testimonials', 'visual_faqs', 'visual_team', 'visual_statistics', 'visual_cta', 'visual_content'],
      color: 'linear-gradient(90deg, #ff6b6b, #ffa726)',
      expanded: false
    },
    'page-sections': {
      title: '🏗️ Page Sections',
      icon: '🏗️',
      collections: ['section_hero', 'section_features', 'section_portfolio', 'section_about', 'section_contact', 'section_conversion'],
      color: 'linear-gradient(90deg, #4ecdc4, #26c6da)', 
      expanded: false
    },
    'site-config': {
      title: '⚙️ Site Configuration',
      icon: '⚙️',
      collections: ['config', 'site_data'],
      color: 'linear-gradient(90deg, #9c27b0, #673ab7)',
      expanded: false
    }
  };

  // === 💾 STATE MANAGEMENT ===
  class SidebarState {
    constructor() {
      this.state = this.loadState();
    }

    loadState() {
      try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        return saved ? JSON.parse(saved) : { expanded: CONFIG.DEFAULT_EXPANDED };
      } catch (e) {
        console.warn('Failed to load sidebar state:', e);
        return { expanded: CONFIG.DEFAULT_EXPANDED };
      }
    }

    saveState() {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Failed to save sidebar state:', e);
      }
    }

    isExpanded(groupId) {
      return this.state.expanded.includes(groupId);
    }

    toggleGroup(groupId) {
      const index = this.state.expanded.indexOf(groupId);
      if (index > -1) {
        this.state.expanded.splice(index, 1);
      } else {
        this.state.expanded.push(groupId);
      }
      this.saveState();
    }
  }

  // === 🎨 SIDEBAR REORGANIZER ===
  class SidebarReorganizer {
    constructor() {
      this.state = new SidebarState();
      this.sidebar = null;
      this.originalItems = [];
      this.searchTerm = '';
      this.searchTimeout = null;
    }

    init() {
      // Wait for CMS to load
      this.waitForCMS(() => {
        this.findSidebar();
        this.reorganizeSidebar();
        this.addSearchFunctionality();
        this.bindEvents();
        console.log('✅ Enhanced Decap CMS Sidebar loaded!');
      });
    }

    waitForCMS(callback) {
      const checkCMS = () => {
        const sidebar = document.querySelector('[data-testid="sidebar"], .css-1ye4tll, nav[aria-label="Collections"], aside');
        if (sidebar) {
          callback();
        } else {
          setTimeout(checkCMS, 100);
        }
      };
      checkCMS();
    }

    findSidebar() {
      // Try multiple selectors to find the sidebar
      const selectors = [
        '[data-testid="sidebar"]',
        '.css-1ye4tll', 
        'nav[aria-label="Collections"]',
        'aside',
        '[class*="sidebar"]',
        '[class*="navigation"]'
      ];

      for (const selector of selectors) {
        this.sidebar = document.querySelector(selector);
        if (this.sidebar) break;
      }

      if (!this.sidebar) {
        console.warn('Could not find CMS sidebar');
        return;
      }

      // Find the collections list
      const listSelectors = ['ul', 'ol', '[role="list"]', '.collection-list'];
      for (const selector of listSelectors) {
        const list = this.sidebar.querySelector(selector);
        if (list && list.children.length > 5) { // Likely the collections list
          this.collectionsList = list;
          break;
        }
      }

      this.sidebar.classList.add('cms-sidebar');
    }

    reorganizeSidebar() {
      if (!this.collectionsList) return;

      // Store original items
      this.originalItems = Array.from(this.collectionsList.children);
      
      // Clear the list
      this.collectionsList.innerHTML = '';

      // Add search container
      this.addSearchContainer();

      // Create grouped structure
      this.createGroupedStructure();
    }

    addSearchContainer() {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'search-container';
      searchContainer.innerHTML = `
        <div style="position: relative;">
          <input type="text" class="search-input" placeholder="🔍 Search collections..." />
          <span class="search-icon">🔍</span>
        </div>
      `;

      this.collectionsList.parentNode.insertBefore(searchContainer, this.collectionsList);
      
      const searchInput = searchContainer.querySelector('.search-input');
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    handleSearch(term) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchTerm = term.toLowerCase();
        this.updateDisplay();
      }, CONFIG.SEARCH_DEBOUNCE);
    }

    createGroupedStructure() {
      // Create Quick Actions
      this.createQuickActions();

      // Create main groups
      Object.entries(GROUPS).forEach(([groupId, groupConfig]) => {
        if (groupId === 'quick-actions') return; // Already created
        this.createGroup(groupId, groupConfig);
      });

      // Add any remaining ungrouped items
      this.addUngroupedItems();
    }

    createQuickActions() {
      const quickGroup = document.createElement('div');
      quickGroup.className = 'quick-actions-group';
      quickGroup.innerHTML = `
        <h3>🚀 Quick Actions</h3>
        <div class="quick-actions-content"></div>
      `;

      const content = quickGroup.querySelector('.quick-actions-content');
      GROUPS['quick-actions'].collections.forEach(collectionName => {
        const item = this.findCollectionItem(collectionName);
        if (item) {
          const newItem = item.cloneNode(true);
          newItem.className = 'collection-item';
          content.appendChild(newItem);
        }
      });

      this.collectionsList.appendChild(quickGroup);
    }

    createGroup(groupId, groupConfig) {
      const group = document.createElement('div');
      group.className = `collapsible-group ${groupId}-group`;
      group.setAttribute('data-group', groupId);

      const isExpanded = this.state.isExpanded(groupId) || groupConfig.expanded;
      
      const header = document.createElement('div');
      header.className = `group-header ${isExpanded ? 'expanded' : ''}`;
      header.innerHTML = `
        <span>${groupConfig.title}</span>
        <span class="expand-icon">▶</span>
      `;

      const content = document.createElement('div');
      content.className = `group-content ${isExpanded ? 'expanded' : ''}`;

      if (groupConfig.subgroups) {
        // Handle subgroups (like Romanian/English)
        Object.entries(groupConfig.subgroups).forEach(([subgroupId, subgroupConfig]) => {
          const subgroup = this.createSubgroup(subgroupId, subgroupConfig);
          content.appendChild(subgroup);
        });
      } else if (groupConfig.collections) {
        // Handle regular collections
        groupConfig.collections.forEach(collectionName => {
          const item = this.findCollectionItem(collectionName);
          if (item) {
            const newItem = item.cloneNode(true);
            newItem.className = 'collection-item';
            content.appendChild(newItem);
          }
        });
      }

      header.addEventListener('click', () => this.toggleGroup(groupId, header, content));

      group.appendChild(header);
      group.appendChild(content);
      this.collectionsList.appendChild(group);
    }

    createSubgroup(subgroupId, subgroupConfig) {
      const subgroup = document.createElement('div');
      subgroup.className = `language-group ${subgroupId}-group`;

      const isExpanded = this.state.isExpanded(`${subgroupId}-content`);

      const header = document.createElement('div');
      header.className = `language-header ${subgroupId} ${isExpanded ? 'expanded' : ''}`;
      header.innerHTML = `
        <span>${subgroupConfig.title}</span>
        <span class="expand-icon">▶</span>
      `;

      const content = document.createElement('div');
      content.className = `language-content ${isExpanded ? 'expanded' : ''}`;

      subgroupConfig.collections.forEach(collectionName => {
        const item = this.findCollectionItem(collectionName);
        if (item) {
          const newItem = item.cloneNode(true);
          newItem.className = 'collection-item';
          content.appendChild(newItem);
        }
      });

      header.addEventListener('click', () => this.toggleGroup(`${subgroupId}-content`, header, content));

      subgroup.appendChild(header);
      subgroup.appendChild(content);
      return subgroup;
    }

    findCollectionItem(collectionName) {
      return this.originalItems.find(item => {
        const link = item.querySelector('a');
        if (!link) return false;
        const href = link.getAttribute('href') || '';
        return href.includes(`/collections/${collectionName}`) || 
               link.textContent.toLowerCase().includes(collectionName.replace(/_/g, ' '));
      });
    }

    addUngroupedItems() {
      // Add any items that weren't grouped
      const groupedCollections = new Set();
      Object.values(GROUPS).forEach(group => {
        if (group.collections) {
          group.collections.forEach(c => groupedCollections.add(c));
        }
        if (group.subgroups) {
          Object.values(group.subgroups).forEach(subgroup => {
            subgroup.collections.forEach(c => groupedCollections.add(c));
          });
        }
      });

      this.originalItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
          const href = link.getAttribute('href') || '';
          const isGrouped = Array.from(groupedCollections).some(collection => 
            href.includes(`/collections/${collection}`)
          );
          
          if (!isGrouped) {
            const newItem = item.cloneNode(true);
            newItem.className = 'collection-item ungrouped';
            this.collectionsList.appendChild(newItem);
          }
        }
      });
    }

    toggleGroup(groupId, header, content) {
      const isExpanded = header.classList.contains('expanded');
      
      if (isExpanded) {
        header.classList.remove('expanded');
        content.classList.remove('expanded');
      } else {
        header.classList.add('expanded');
        content.classList.add('expanded');
      }

      this.state.toggleGroup(groupId);
    }

    updateDisplay() {
      if (!this.searchTerm) {
        // Show all groups when no search term
        document.querySelectorAll('.collapsible-group, .language-group').forEach(group => {
          group.style.display = 'block';
        });
        return;
      }

      // Filter based on search term
      document.querySelectorAll('.collapsible-group, .language-group').forEach(group => {
        const hasMatch = this.groupHasSearchMatch(group);
        group.style.display = hasMatch ? 'block' : 'none';
      });
    }

    groupHasSearchMatch(group) {
      const items = group.querySelectorAll('.collection-item a');
      return Array.from(items).some(link => 
        link.textContent.toLowerCase().includes(this.searchTerm)
      );
    }

    bindEvents() {
      // Handle active state updates
      const observer = new MutationObserver(() => {
        this.updateActiveStates();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'href']
      });

      // Handle route changes
      window.addEventListener('hashchange', () => {
        setTimeout(() => this.updateActiveStates(), 100);
      });
    }

    updateActiveStates() {
      const currentPath = window.location.hash;
      document.querySelectorAll('.collection-item').forEach(item => {
        const link = item.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          if (href && currentPath.includes(href)) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    }
  }

  // === 🚀 INITIALIZE ===
  const reorganizer = new SidebarReorganizer();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => reorganizer.init());
  } else {
    reorganizer.init();
  }

  // === 🔄 HANDLE SPA NAVIGATION ===
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(() => {
        // Re-run if sidebar was replaced
        if (!document.querySelector('.cms-sidebar')) {
          reorganizer.init();
        }
      }, 500);
    }
  }).observe(document, { subtree: true, childList: true });

})();
