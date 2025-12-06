import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CartService } from '@shared/components/cart/cart.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent, ProductImagePipe, RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  // Cantidad seleccionada
  quantity = signal(1);

  // Resource del producto
  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productsService.getProductByIdOrSlug(params.idSlug);
    },
  });

  // Computed: Si el producto está en el carrito
  isInCart = computed(() => {
    const product = this.productResource.value();
    if (!product) return false;
    return this.cartService.isInCart(product.id);
  });

  // Computed: Cantidad actual en el carrito
  currentCartQuantity = computed(() => {
    const product = this.productResource.value();
    if (!product) return 0;
    return this.cartService.getProductQuantity(product.id);
  });

  // Incrementar cantidad
  incrementQuantity() {
    if (this.quantity() < 99) {
      this.quantity.update(q => q + 1);
    }
  }

  // Decrementar cantidad
  decrementQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  // Cambio manual de cantidad
  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value) || 1;

    // Validar rango
    value = Math.max(1, Math.min(99, value));

    this.quantity.set(value);
    input.value = value.toString();
  }

  // Añadir al carrito
  addToCart() {
    const product = this.productResource.value();
    if (!product) return;

    this.cartService.addToCart(product, this.quantity());

    // Opcional: Mostrar toast de éxito
    // this.toastService.success(`${product.title} añadido al carrito`);
  }

  // Actualizar cantidad en el carrito
  updateCartQuantity() {
    const product = this.productResource.value();
    if (!product) return;

    this.cartService.updateQuantity(product.id, this.quantity());

    // Opcional: Mostrar toast de éxito
    // this.toastService.success('Cantidad actualizada');
  }
}
