import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CartService } from '@shared/components/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, ProductImagePipe],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {

  cartService = inject(CartService);

  // Confirmar antes de vaciar el carrito
  confirmClearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  // Confirmar antes de eliminar un producto
  removeItem(productId: string, productName: string) {
    if (confirm(`¿Eliminar "${productName}" del carrito?`)) {
      this.cartService.removeFromCart(productId);
    }
  }
}
