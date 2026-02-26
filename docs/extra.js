// Custom JavaScript for Linux Admin Course Documentation

(function() {
  'use strict';
  
  // Font Size Control
  function initFontSizeControl() {
    // Get or set default font size
    let fontSize = localStorage.getItem('fontSize') || '16';
    
    // Create font size control widget
    const header = document.querySelector('.md-header__inner');
    if (!header) return;
    
    const fontControl = document.createElement('div');
    fontControl.className = 'font-size-control';
    fontControl.innerHTML = `
      <label for="font-size-slider">Font:</label>
      <input type="range" id="font-size-slider" min="12" max="24" value="${fontSize}" step="1">
      <span class="font-size-display">${fontSize}px</span>
    `;
    
    // Insert after search button
    const searchButton = document.querySelector('.md-header__button[for="__search"]');
    if (searchButton && searchButton.parentNode) {
      searchButton.parentNode.insertBefore(fontControl, searchButton.nextSibling);
    } else {
      header.appendChild(fontControl);
    }
    
    // Apply font size
    document.documentElement.style.setProperty('--base-font-size', fontSize + 'px');
    
    // Update on slider change
    const slider = document.getElementById('font-size-slider');
    const display = fontControl.querySelector('.font-size-display');
    
    slider.addEventListener('input', function(e) {
      const newSize = e.target.value;
      document.documentElement.style.setProperty('--base-font-size', newSize + 'px');
      display.textContent = newSize + 'px';
      localStorage.setItem('fontSize', newSize);
    });
  }
  
  // Copy to Clipboard for Code Blocks
  function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(block) {
      const pre = block.parentElement;
      if (pre.tagName === 'PRE' && !pre.querySelector('.copy-button')) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        
        button.addEventListener('click', function() {
          const text = block.textContent;
          navigator.clipboard.writeText(text).then(function() {
            button.textContent = 'Copied!';
            setTimeout(function() {
              button.textContent = 'Copy';
            }, 2000);
          }).catch(function(err) {
            console.error('Failed to copy:', err);
            button.textContent = 'Error';
          });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(button);
      }
    });
  }
  
  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  // Highlight Placeholders
  function highlightPlaceholders() {
    const content = document.querySelector('.md-content');
    if (!content) return;
    
    // Skip if already processed (prevent infinite loop)
    if (content.dataset.placeholdersHighlighted === 'true') return;
    
    // Find and highlight placeholders like [login], [room], [group]
    const placeholderRegex = /\[(login|room|group)\]/gi;
    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip if node is inside a code block or already highlighted
          if (node.parentElement && (
            node.parentElement.closest('pre') || 
            node.parentElement.closest('code') ||
            node.parentElement.classList.contains('placeholder')
          )) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (placeholderRegex.test(node.textContent)) {
        textNodes.push(node);
      }
    }
    
    textNodes.forEach(function(textNode) {
      const parent = textNode.parentNode;
      const text = textNode.textContent;
      const highlighted = text.replace(placeholderRegex, function(match) {
        return '<span class="placeholder">' + match + '</span>';
      });
      
      if (highlighted !== text) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = highlighted;
        parent.replaceChild(wrapper, textNode);
      }
    });
    
    // Mark as processed
    content.dataset.placeholdersHighlighted = 'true';
  }
  
  // Learning Questions (quiz feedback)
  function initLearningQuestions() {
    const questions = document.querySelectorAll('.learning-question');
    if (!questions.length) return;

    questions.forEach(function(block) {
      const checkBtn = block.querySelector('.check-learning');
      const feedbackEl = block.querySelector('.learning-feedback');
      const radios = block.querySelectorAll('input[type="radio"]');
      if (!checkBtn || !feedbackEl || !radios.length) return;

      const correctIndex = block.getAttribute('data-correct');
      const explanation = block.getAttribute('data-explanation') || '';
      if (correctIndex === null) return;

      checkBtn.addEventListener('click', function() {
        let selected = null;
        radios.forEach(function(radio) {
          if (radio.checked) selected = radio.value;
        });

        if (selected === null) {
          feedbackEl.textContent = 'Please select an answer.';
          feedbackEl.className = 'learning-feedback learning-feedback--none';
          return;
        }

        const isCorrect = selected === correctIndex;
        const correctOption = Array.from(radios).find(function(r) { return r.value === correctIndex; });
        const correctText = correctOption ? correctOption.parentElement.textContent.replace(/^\s+|\s+$/g, '') : 'Option ' + (parseInt(correctIndex, 10) + 1);

        if (isCorrect) {
          feedbackEl.textContent = 'Correct! ' + (explanation ? explanation : '');
          feedbackEl.className = 'learning-feedback learning-feedback--correct';
        } else {
          feedbackEl.textContent = 'Incorrect. The correct answer is: ' + correctText + '. Why: ' + explanation;
          feedbackEl.className = 'learning-feedback learning-feedback--incorrect';
        }
      });
    });
  }

  // Keyboard Shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchButton = document.querySelector('.md-header__button[for="__search"]');
        if (searchButton) {
          searchButton.click();
        }
      }
      
      // Ctrl/Cmd + Plus/Minus for font size
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        const slider = document.getElementById('font-size-slider');
        if (slider) {
          const current = parseInt(slider.value);
          if (current < 24) {
            slider.value = current + 1;
            slider.dispatchEvent(new Event('input'));
          }
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        const slider = document.getElementById('font-size-slider');
        if (slider) {
          const current = parseInt(slider.value);
          if (current > 12) {
            slider.value = current - 1;
            slider.dispatchEvent(new Event('input'));
          }
        }
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initFontSizeControl();
      initCopyButtons();
      initSmoothScroll();
      highlightPlaceholders();
      initLearningQuestions();
      initKeyboardShortcuts();
    });
  } else {
    initFontSizeControl();
    initCopyButtons();
    initSmoothScroll();
    highlightPlaceholders();
    initLearningQuestions();
    initKeyboardShortcuts();
  }
  
  // Re-initialize when content changes (e.g. MkDocs navigation)
  const observer = new MutationObserver(function(mutations) {
    initCopyButtons();
    initLearningQuestions();
    // Reset placeholder flag if content is completely replaced
    const contentArea = document.querySelector('.md-content');
    if (contentArea && !contentArea.dataset.placeholdersHighlighted) {
      highlightPlaceholders();
    }
  });
  
  const contentArea = document.querySelector('.md-content');
  if (contentArea) {
    observer.observe(contentArea, {
      childList: true,
      subtree: false  // Only watch direct children, not deep changes
    });
  }
})();
