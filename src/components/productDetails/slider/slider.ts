import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import tempPlaceholderImg from "../../../assets/images/red-panda.png";

import "./slider.css";

export const imageSlider = (product: ProductProjection): HTMLElement => {
  const sliderWrapper = createElement("div", { class: "product-details__slider-wrapper" });
  const images = product.masterVariant.images;
  if (images?.length) {
    for (const image of images) {
      const imageContainer = createElement("div", { class: "product-details__image-container" }, [
        createElement("img", {
          class: "product-details__image",
          src: image.url,
          alt: image.label || "Product image",
        }),
      ]);
      sliderWrapper.append(imageContainer);
    }
  } else {
    const imageContainer = createElement("div", { class: "product-details__image-container" }, [
      createElement("img", {
        class: "product-details__image",
        src: tempPlaceholderImg,
        alt: "Placeholder image",
      }),
    ]);
    sliderWrapper.append(imageContainer);
  }

  const prevPageArrow = createElement("a", { class: "prev-arrow" });
  prevPageArrow.innerHTML = `&#10094`;
  const nextPageArrow = createElement("a", { class: "next-arrow" });
  nextPageArrow.innerHTML = `&#10095`;

  // Slider logic
  const numOfSlides = images?.length;
  prevPageArrow.classList.toggle("hide-arrow", !numOfSlides || numOfSlides < 2);
  nextPageArrow.classList.toggle("hide-arrow", !numOfSlides || numOfSlides < 2);
  const slides: NodeListOf<HTMLDivElement> = sliderWrapper.querySelectorAll(
    ".product-details__image-container"
  );
  slides[0].style.display = "block";
  prevPageArrow.classList.add("hide-arrow");
  let index = 0;
  function showNextSlide(): void {
    const nextSlide = index + 1;
    if (nextSlide < slides.length) {
      slides[index].style.display = "none";
      slides[nextSlide].style.display = "block";
      if (prevPageArrow.classList.contains("hide-arrow")) {
        prevPageArrow.classList.remove("hide-arrow");
      }
      index++;
      if (index === slides.length - 1) {
        nextPageArrow.classList.add("hide-arrow");
      }
    }
  }

  function showPrevSlide(): void {
    const prevSlide = index - 1;
    if (prevSlide >= 0) {
      slides[index].style.display = "none";
      slides[prevSlide].style.display = "block";
      if (nextPageArrow.classList.contains("hide-arrow")) {
        nextPageArrow.classList.remove("hide-arrow");
      }
      index--;
      if (index === 0) {
        prevPageArrow.classList.add("hide-arrow");
      }
    }
  }

  prevPageArrow.addEventListener("click", showPrevSlide);
  nextPageArrow.addEventListener("click", showNextSlide);

  const container = createElement("div", { class: "product-details__image-slider" }, [
    sliderWrapper,
    prevPageArrow,
    nextPageArrow,
  ]);
  return container;
};
