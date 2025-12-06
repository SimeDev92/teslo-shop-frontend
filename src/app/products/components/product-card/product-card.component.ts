import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CartService } from '@shared/components/cart/cart.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Component({
  selector: 'product-card',
  imports: [RouterLink, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();

  imageUrl = computed(() => {
    return `${baseUrl}/files/product/${
      this.product().images[0]
    }`;
  });

  private cartService = inject(CartService);

    isInCart = computed(() =>
    this.cartService.isInCart(this.product().id)
  );

    addToCart() {
    this.cartService.addToCart(this.product(), 1);
    }
}
