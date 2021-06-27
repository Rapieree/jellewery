const slidersInitialize = () => {
  if (document.querySelector('.product-slider__slider') !== null) {
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

  const setModalOpening = (modalElement, flag) => {
    if (flag) {
      modalElement.classList.add(modalOpenClass);
      document.body.classList.add(bodyScrollHiddenClass);
      window.addEventListener('keydown', onModalEscapeKeyDown);
      window.addEventListener('keydown', setFocusControl);
      window.addEventListener('keyup', onModalShiftUp);
      modalElement.addEventListener('mousedown', onModalMouseDown);
      modalElement.addEventListener('click', onModalMouseUp);
      modalFocusElementsList[0].focus();
    } else {
      modalElement.classList.remove(modalOpenClass);
      document.body.classList.remove(bodyScrollHiddenClass);
      window.removeEventListener('keydown', onModalEscapeKeyDown);
      window.removeEventListener('keydown', setFocusControl);
      window.removeEventListener('keyup', onModalShiftUp);
      modalElement.removeEventListener('mousedown', onModalMouseDown);
      modalElement.removeEventListener('click', onModalMouseUp);
    }

  }

  const setFocusControl = (evt) => { // Установить фокус с клавиатуры только на элементах формы
    if (evt.key === 'Shift') {
      shiftPressed = true;
    }
    if ((!shiftPressed && evt.key === 'Tab') && (document.querySelector(':focus') === modalFocusEndElem)) {
      evt.preventDefault();
      modalFocusStartElem.focus();
    }
    else if ((shiftPressed && evt.key === 'Tab') && (document.querySelector(':focus') === modalFocusStartElem)) {
      evt.preventDefault();
      modalFocusEndElem.focus();
    }
  }

  const onModalShiftUp = (evt) => { // отслеживание отпускания shift
    if (evt.key === 'Shift') {
      shiftPressed = false;
    }
  }

  const onModalCallbackEscapeKeyDown = (modalElement) => {
    return (evt) => {
      if (evt.key === ('Escape' || 'Esc')) {
        evt.preventDefault();
        setModalOpening(modalElement, false);
      }
    };
  }

  function onModalMouseDown(evt) {
    if (evt.target === evt.currentTarget) {
      mousePressed = true;
    }
  }

  function onModalCallbackMouseUp(modalElement) {
    return (evt) => {
      if (evt.target === modalElement && mousePressed === true) {
        mousePressed = false;
        setModalOpening(modalElement, false);
      }
    }
  }

  // Окно добавления в корзину
  if (document.querySelector('.modal--add-to-basket') !== null && document.querySelector('.product-details__add-basket-link') !== null) {
    const modalAddToBasket = document.querySelector('.modal--add-to-basket');
    const modalAddToBasketCloseButton = modalAddToBasket.querySelector('.modal__close-button');
    const addToBasketOpenButton = document.querySelector('.product-details__add-basket-link');

    modalFocusElementsList = modalAddToBasket.querySelectorAll(focusSelectors);
    modalFocusStartElem = modalFocusElementsList[0];
    modalFocusEndElem = modalFocusElementsList[modalFocusElementsList.length - 1];

    onModalEscapeKeyDown = onModalCallbackEscapeKeyDown(modalAddToBasket);
    onModalMouseUp = onModalCallbackMouseUp(modalAddToBasket);

    addToBasketOpenButton.addEventListener('click', (evt) =>  {
      evt.preventDefault();
      setModalOpening(modalAddToBasket, true);
    });
    modalAddToBasketCloseButton.addEventListener('click', () => setModalOpening(modalAddToBasket, false));
  }

  // Окно логина
  if(document.querySelector('.modal--login') !== null) {
    const modalLogin = document.querySelector('.modal--login');
    const modalLoginCloseButton = modalLogin.querySelector('.modal__close-button');
    const loginOpenButton = document.querySelector('.user-auth__login a');

    modalFocusElementsList = modalLogin.querySelectorAll(focusSelectors);
    modalFocusStartElem = modalFocusElementsList[0];
    modalFocusEndElem = modalFocusElementsList[modalFocusElementsList.length - 1];

    onModalEscapeKeyDown = onModalCallbackEscapeKeyDown(modalLogin);
    onModalMouseUp = onModalCallbackMouseUp(modalLogin);

    loginOpenButton.addEventListener('click', (evt) =>  {
      evt.preventDefault();
      setModalOpening(modalLogin, true);
    });
    modalLoginCloseButton.addEventListener('click', () => setModalOpening(modalLogin, false));
  }
}

const filterInitialize = () => {
  if(document.querySelector('.filter') !== null && document.querySelector('.filter__menu-button') !== null) {
    const filter = document.querySelector('.filter');
    const filterButton = filter.querySelector('.filter__menu-button');
    const filterCloseButton = filter.querySelector('.filter__close-button');

    const filterClassOpen = 'filter--open';
    const filterClassNojs = 'filter--nojs';

    if(filter.classList.contains(filterClassNojs)) {
      filter.classList.remove(filterClassNojs);
    }

    filterButton.addEventListener('click', () => {
      filter.classList.toggle(filterClassOpen);
    });

    filterCloseButton.addEventListener('click', () => {
      if(filter.classList.contains(filterClassOpen)) {
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
