const slidersInitialize = () => {
  if (document.querySelector('.product-slider__slider') !== null) {
    /* eslint-disable-next-line */
    const productSlider = new Swiper('.product-slider__slider', {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
            ' of ' +
            '<span class="' + totalClass + '"></span>';
        },
      },
      breakpoints: {
        768: {
          navigation: {
            nextEl: '.product-slider__next-button',
            prevEl: '.product-slider__prev-button',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
          navigation: {
            nextEl: '.product-slider__next-button',
            prevEl: '.product-slider__prev-button',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
      },
    });
  }

  if (document.querySelector('.photo-slider__controller') !== null && document.querySelector('.photo-slider__full') !== null) {
    /* eslint-disable-next-line */
    const photoSliderController = new Swiper('.photo-slider__controller', {
      slideToClickedSlide: true,
      allowTouchMove: true,
      mousewheel: {
        invert: false,
        releaseOnEdges: false,
      },
      breakpoints: {
        768: {
          spaceBetween: 14,
          direction: 'horizontal',
          slidesPerView: 3,
          simulateTouch: true,
          initialSlide: 1,
          allowTouchMove: true,
        },
        1024: {
          spaceBetween: 30,
          direction: 'vertical',
          slidesPerView: 3,
          simulateTouch: true,
          initialSlide: 1,
          allowTouchMove: false,
        },
      },
    });

    /* eslint-disable-next-line */
    const photoSliderFull = new Swiper('.photo-slider__full', {
      slideToClickedSlide: true,
      initialSlide: 0,
      direction: 'horizontal',
      allowTouchMove: true,
      thumbs: {
        swiper: photoSliderController,
        slideThumbActiveClass: 'photo-slider__controller-item--current',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
            ' of ' +
            '<span class="' + totalClass + '"></span>';
        },
      },
      breakpoints: {
        768: {
          slideToClickedSlide: true,
          initialSlide: 0,
          direction: 'horizontal',
          allowTouchMove: false,
        },
        1024: {
          slideToClickedSlide: true,
          initialSlide: 0,
          direction: 'vertical',
          allowTouchMove: false,
        },
      },

    });

    let isShiftPress = false;

    photoSliderController.$el.on('keydown', (evt) => {
      if (evt.keyCode === 16) {
        isShiftPress = true;
        return;
      }
    });

    photoSliderController.$el.on('keyup', (evt) => {
      if (evt.keyCode !== 13 && evt.keyCode !== 32 && evt.keyCode !== 9) return;

      const slideIndex = evt.target.dataset.slideIndex;

      if (!slideIndex) return;

      if (evt.keyCode === 9 || (evt.keyCode === 9 && isShiftPress)) {

        photoSliderFull.slideTo(slideIndex);
        photoSliderController.slideTo(slideIndex);
        isShiftPress = false;
        return;
      }

    });
  }
};

const accordeonInitialize = () => {
  if (document.querySelector('.accordeon') !== null) {
    const accordeon = document.querySelector('.accordeon');
    const accordeonHeaderList = accordeon.querySelectorAll('.accordeon__header');
    const accordeonButtonList = accordeon.querySelectorAll('.accordeon__button');
    const accordeonContentList = accordeon.querySelectorAll('.accordeon__content');

    const accordeonClassOpenHeader = 'accordeon__header--open';
    const accordeonClassOpenButton = 'accordeon__button--open';
    const accordeonClassOpenContent = 'accordeon__content--open';

    accordeonButtonList.forEach((item, index) => {
      item.addEventListener('click', () => {
        accordeonHeaderList[index].classList.toggle(accordeonClassOpenHeader);
        accordeonButtonList[index].classList.toggle(accordeonClassOpenButton);
        accordeonContentList[index].classList.toggle(accordeonClassOpenContent);
      });
    });
  }
};

const tabsInitialize = () => {
  if (document.querySelector('.tabs') !== null) {
    const tabs = document.querySelector('.tabs');
    const tabsItems = tabs.querySelectorAll('.tabs__content');
    const tabsButtons = tabs.querySelectorAll('.tabs__control');

    const tabsItemClassActive = 'tabs__content--current';
    const tabsButtonClassActive = 'tabs__control--current';

    let activeIndex = -1;

    for (let i = 0; i < tabsItems.length; i++) {
      if (tabsItems[i].classList.contains(tabsItemClassActive)) {
        activeIndex = i;
        break;
      }
    }

    if (activeIndex === -1) {
      activeIndex = 0;
      tabsItems[0].classList.add(tabsItemClassActive);
      tabsButtons[0].classList.add(tabsButtonClassActive);
    }

    tabsButtons.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (index !== activeIndex) {
          tabsItems[activeIndex].classList.remove(tabsItemClassActive);
          tabsButtons[activeIndex].classList.remove(tabsButtonClassActive);
          tabsItems[index].classList.add(tabsItemClassActive);
          tabsButtons[index].classList.add(tabsButtonClassActive);

          activeIndex = index;
        }
      });
    });
  }
};

const menuInitialize = () => {
  if (document.querySelector('.page-header') !== null) {
    const menuHeader = document.querySelector('.page-header');
    const menuButton = menuHeader.querySelector('.page-header__menu-button');

    const bodyScrollHiddenClass = 'page-body--scroll-hidden';
    const bodyVisibilityHiddenClass = 'page-body--visibility-hidden';

    const menuHeaderOpenClass = 'page-header--open';
    const menuHeaderNojsClass = 'page-header--nojs';

    if (menuHeader.classList.contains(menuHeaderNojsClass)) {
      menuHeader.classList.remove(menuHeaderNojsClass);
    }

    const setMenuOpening = (flag) => {
      if (flag) {
        menuHeader.classList.add(menuHeaderOpenClass);
        document.body.classList.add(bodyScrollHiddenClass);
        document.body.classList.add(bodyVisibilityHiddenClass);
        document.addEventListener('keydown', onMenuEscapeKeyDown);
      } else if (!flag) {
        menuHeader.classList.remove(menuHeaderOpenClass);
        document.body.classList.remove(bodyScrollHiddenClass);
        document.body.classList.remove(bodyVisibilityHiddenClass);
        document.removeEventListener('keydown', onMenuEscapeKeyDown);
      }
    }

    const onMenuEscapeKeyDown = (evt) => {
      if (evt.key === ('Escape' || 'Esc')) {
        evt.preventDefault();
        setMenuOpening(false);
      }
    }

    menuButton.addEventListener('click', () => {
      if (!menuHeader.classList.contains(menuHeaderOpenClass)) {
        setMenuOpening(true);
      } else {
        setMenuOpening(false);
      }
    });
  }
}

const modalsInitialize = () => {
  const bodyScrollHiddenClass = 'page-body--desktop-scroll-hidden';
  const modalOpenClass = 'modal--open';

  const focusSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([aria-hidden])',
    'textarea:not([disabled]):not([aria-hidden])',
    'button:not([disabled]):not([aria-hidden])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ]; // Селекторы элементов, способных фокусироваться

  let mousePressed = false;
  let shiftPressed = false;

  // Обязательно инициализировать перед использованием
  // start
  let modalFocusElementsList; // modal.querySelectorAll(focusSelectors)
  let modalFocusStartElem; // modalFocusElementsList[0]
  let modalFocusEndElem; //  modalFocusElementsList[modalFocusElementsList.length - 1]

  let onModalEscapeKeyDown; // через onModalCallbackEscapeKeyDown
  let onModalMouseUp; // через onModalCallbackMouseUp
  // end

  class Modal {
    constructor(modalElement, openButton, closeButton) {
      this._modalElement = modalElement;
      this._openButton = openButton;
      this._closeButton = closeButton;

      this._focusElementsList = this._modalElement.querySelectorAll(focusSelectors);
      this._focusStartElem = this._focusElementsList[0];
      this._focusEndElem = this._focusElementsList[this._focusElementsList.length - 1];

      this._shiftPressed = false;

      this._onModalEscapeKeyDown = this._onModalEscapeKeyDown.bind(this);
      this._onModalMouseUp = this._onModalMouseUp.bind(this);
    }

    _onModalShiftUp(evt) { // отслеживание отпускания shift
      if (evt.key === 'Shift') {
        this._shiftPressed = false;
      }
    }

    _setFocusControl(evt) { // Установить фокус с клавиатуры только на элементах формы
      if (evt.key === 'Shift') {
        shiftPressed = true;
      }
      if ((!shiftPressed && evt.key === 'Tab') && (document.querySelector(':focus') === this._focusEndElem)) {
        evt.preventDefault();
        this._focusStartElem.focus();
      }
      else if ((shiftPressed && evt.key === 'Tab') && (document.querySelector(':focus') === this._focusStartElem)) {
        evt.preventDefault();
        this._focusEndElem.focus();
      }
    }

    _onModalEscapeKeyDown(evt) {
      if (evt.key === ('Escape' || 'Esc')) {
        evt.preventDefault();
        this._setModalOpening(false);
      }
    }

    _onModalMouseDown(evt) {
      if (evt.target === evt.currentTarget) {
        mousePressed = true;
      }
    }

    _onModalMouseUp(evt) {
      if (evt.target === this._modalElement && mousePressed === true) {
        mousePressed = false;
        this._setModalOpening(false);
      }
    }

    _setModalOpening(flag) {
      if (flag) {
        this._modalElement.classList.add(modalOpenClass);
        document.body.classList.add(bodyScrollHiddenClass);
        window.addEventListener('keydown', this._onModalEscapeKeyDown);
        window.addEventListener('keydown', this._setFocusControl);
        window.addEventListener('keyup', this._onModalShiftUp);
        this._modalElement.addEventListener('mousedown', this._onModalMouseDown);
        this._modalElement.addEventListener('click', this._onModalMouseUp);
        this._focusElementsList[0].focus();
      } else {
        this._modalElement.classList.remove(modalOpenClass);
        document.body.classList.remove(bodyScrollHiddenClass);
        window.removeEventListener('keydown', this._onModalEscapeKeyDown);
        window.removeEventListener('keydown', this._setFocusControl);
        window.removeEventListener('keyup', this._onModalShiftUp);
        this._modalElement.removeEventListener('mousedown', this._onModalMouseDown);
        this._modalElement.removeEventListener('click', this._onModalMouseUp);
      }
    }

    modalInitialize() {
      this._openButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        this._setModalOpening(this._modalElement, true);
      });

      this._closeButton.addEventListener('click', () => this._setModalOpening(false));
    }
  }

  // Окно добавления в корзину
  if (document.querySelector('.modal--add-to-basket') !== null && document.querySelector('.product-details__add-basket-link') !== null) {
    const addToBasket = document.querySelector('.modal--add-to-basket');
    const addToBasketCloseButton = addToBasket.querySelector('.modal__close-button');
    const addToBasketOpenButton = document.querySelector('.product-details__add-basket-link');

    const modalAddToBasket = new Modal(addToBasket, addToBasketOpenButton, addToBasketCloseButton);
    modalAddToBasket.modalInitialize();
  }

  // Окно логина
  if (document.querySelector('.modal--login') !== null) {
    const login = document.querySelector('.modal--login');
    const loginCloseButton = login.querySelector('.modal__close-button');
    const loginOpenButton = document.querySelector('.user-auth__login a');

    const modalLogin = new Modal(login, loginOpenButton, loginCloseButton);
    modalLogin.modalInitialize();
  }
}

const filterInitialize = () => {
  if (document.querySelector('.filter') !== null && document.querySelector('.filter__menu-button') !== null) {
    const filter = document.querySelector('.filter');
    const filterButton = filter.querySelector('.filter__menu-button');
    const filterCloseButton = filter.querySelector('.filter__close-button');

    const filterClassOpen = 'filter--open';
    const filterClassNojs = 'filter--nojs';

    if (filter.classList.contains(filterClassNojs)) {
      filter.classList.remove(filterClassNojs);
    }

    filterButton.addEventListener('click', () => {
      filter.classList.toggle(filterClassOpen);
    });

    filterCloseButton.addEventListener('click', () => {
      if (filter.classList.contains(filterClassOpen)) {
        filter.classList.remove(filterClassOpen);
      }
    });
  }
}

slidersInitialize();
accordeonInitialize();
tabsInitialize();
menuInitialize();
modalsInitialize();
filterInitialize();
