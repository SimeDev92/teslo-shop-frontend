import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 600px;
      border-radius: 1rem;
    }

    /* Custom navigation buttons */
    .swiper-button-next,
    .swiper-button-prev {
      width: 40px;
      height: 40px;
      background: oklch(var(--b1) / 0.9);
      backdrop-filter: blur(8px);
      border-radius: 50%;
      color: oklch(var(--bc));
      border: 1px solid oklch(var(--b3));
      transition: all 0.3s ease;
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
      font-size: 16px;
      font-weight: bold;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      background: oklch(var(--s));
      color: oklch(var(--sc));
      transform: scale(1.1);
    }

    /* Custom pagination */
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: oklch(var(--bc) / 0.3);
      opacity: 1;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      background: oklch(var(--s));
      width: 24px;
      border-radius: 5px;
    }

    /* Image styling */
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
    }

    /* Loading skeleton */
    .swiper-slide-loading {
      background: linear-gradient(
        90deg,
        oklch(var(--b2)) 0%,
        oklch(var(--b3)) 50%,
        oklch(var(--b2)) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .swiper {
        height: 400px;
      }
    }
  `,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if (!this.swiper) return;

    this.swiper.destroy(true, true);

    const paginationElement: HTMLDivElement = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');
    if (paginationElement) {
      paginationElement.innerHTML = '';
    }

    setTimeout(() => {
      this.swipperInit();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.swipperInit();
  }

  swipperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: this.images().length > 1,
      speed: 600,

      modules: [Navigation, Pagination, Autoplay],

      // Autoplay (opcional, puedes comentarlo si no lo quieres)
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Keyboard control
      keyboard: {
        enabled: true,
      },

      // Mouse wheel
      mousewheel: {
        forceToAxis: true,
      },
    });
  }
}
