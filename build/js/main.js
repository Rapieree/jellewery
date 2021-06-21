// const { default: Splide } = require('@splidejs/splide');


const slider = () => {
  const swiper = new Swiper('.new-products__slider', {
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    pagination: {
      el: ".swiper-pagination",
      type: 'fraction',
      clickable: true,
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          ' of ' +
          '<span class="' + totalClass + '"></span>';
      }
    },
    breakpoints: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      768: {
        navigation: {
          nextEl: '.new-products__next-button',
          prevEl: '.new-products__prev-button',
        },
        pagination: {
          el: ".swiper-pagination",
          type: 'bullets',
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        navigation: {
          nextEl: '.new-products__next-button',
          prevEl: '.new-products__prev-button',
        },
        pagination: {
          el: ".swiper-pagination",
          type: 'bullets',
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
      },
    },
  });

};

slider();
