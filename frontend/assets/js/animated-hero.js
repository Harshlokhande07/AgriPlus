/**
 * Animated Hero Component
 * Vanilla JavaScript version (React-free)
 * Uses CSS animations for rotating titles
 * 
 * Dependencies: None (pure vanilla JS + CSS)
 * 
 * Usage:
 * const hero = new AnimatedHero({
 *   container: '#hero-container',
 *   titles: ['amazing', 'new', 'wonderful', 'beautiful', 'smart'],
 *   duration: 2000
 * });
 * hero.init();
 */

class AnimatedHero {
  constructor(options = {}) {
    this.container = document.querySelector(options.container || '#hero-container');
    this.titles = options.titles || ['amazing', 'new', 'wonderful', 'beautiful', 'smart'];
    this.duration = options.duration || 2000;
    this.titleNumber = 0;
    this.timeoutId = null;
    this.titleElements = [];
  }

  /**
   * Initialize the hero component
   */
  init() {
    if (!this.container) {
      console.error('AnimatedHero: Container not found');
      return;
    }

    this.createHTML();
    this.setupAnimations();
    this.startRotation();
  }

  /**
   * Create the hero HTML structure
   */
  createHTML() {
    this.container.innerHTML = `
      <div class="w-full">
        <div class="container mx-auto">
          <div class="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <!-- Launch Button -->
            <div>
              <button class="btn btn-secondary gap-4" id="hero-launch-btn">
                <span>Read our launch article</span>
                <i class="fas fa-arrow-right w-4 h-4"></i>
              </button>
            </div>

            <!-- Hero Title Section -->
            <div class="flex gap-4 flex-col">
              <h1 class="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span class="text-slate-600">This is something</span>
                <span class="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  <div id="hero-titles" class="relative w-full h-16 md:h-24">
                    ${this.titles.map((title, index) => `
                      <span class="hero-title absolute w-full text-center font-semibold" data-index="${index}">
                        ${title}
                      </span>
                    `).join('')}
                  </div>
                </span>
              </h1>

              <!-- Description -->
              <p class="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-row gap-3">
              <button class="btn btn-lg btn-outline gap-4" id="hero-call-btn">
                <span>Jump on a call</span>
                <i class="fas fa-phone w-4 h-4"></i>
              </button>
              <button class="btn btn-lg gap-4" id="hero-signup-btn">
                <span>Sign up here</span>
                <i class="fas fa-arrow-right w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.titleElements = this.container.querySelectorAll('.hero-title');
  }

  /**
   * Setup CSS animations for titles
   */
  setupAnimations() {
    // Add animation styles if not already present
    if (!document.getElementById('hero-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'hero-animations';
      styleSheet.textContent = `
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-100px);
          }
        }

        @keyframes slideOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(100px);
          }
        }

        .hero-title {
          opacity: 0;
          transform: translateY(100px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hero-title.active {
          opacity: 1;
          transform: translateY(0);
          animation: slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hero-title.exit-up {
          animation: slideOutUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .hero-title.exit-down {
          animation: slideOutDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        #hero-launch-btn, #hero-call-btn, #hero-signup-btn {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        #hero-launch-btn:hover, #hero-call-btn:hover, #hero-signup-btn:hover {
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(styleSheet);
    }

    // Set initial active state
    this.updateTitleDisplay();
  }

  /**
   * Update which title is displayed
   */
  updateTitleDisplay() {
    this.titleElements.forEach((element, index) => {
      element.classList.remove('active', 'exit-up', 'exit-down');

      if (index === this.titleNumber) {
        element.classList.add('active');
      } else if (index < this.titleNumber) {
        element.classList.add('exit-up');
      } else {
        element.classList.add('exit-down');
      }
    });
  }

  /**
   * Start the title rotation
   */
  startRotation() {
    this.rotate();
  }

  /**
   * Rotate to next title
   */
  rotate() {
    if (this.titleNumber === this.titles.length - 1) {
      this.titleNumber = 0;
    } else {
      this.titleNumber += 1;
    }

    this.updateTitleDisplay();

    // Schedule next rotation
    this.timeoutId = setTimeout(() => {
      this.rotate();
    }, this.duration);
  }

  /**
   * Pause the rotation
   */
  pause() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Resume the rotation
   */
  resume() {
    this.startRotation();
  }

  /**
   * Destroy the component and cleanup
   */
  destroy() {
    this.pause();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  /**
   * Add event listeners to buttons
   */
  attachEventListeners(callbacks = {}) {
    const launchBtn = this.container.querySelector('#hero-launch-btn');
    const callBtn = this.container.querySelector('#hero-call-btn');
    const signupBtn = this.container.querySelector('#hero-signup-btn');

    if (launchBtn && callbacks.onLaunchClick) {
      launchBtn.addEventListener('click', callbacks.onLaunchClick);
    }

    if (callBtn && callbacks.onCallClick) {
      callBtn.addEventListener('click', callbacks.onCallClick);
    }

    if (signupBtn && callbacks.onSignupClick) {
      signupBtn.addEventListener('click', callbacks.onSignupClick);
    }
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimatedHero;
}
