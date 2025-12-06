import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'teslo-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = signal<CartItem[]>(this.loadFromLocalStorage());

  cartItems = computed(() => this.cart());
  totalItems = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );
  isEmpty = computed(() => this.cart().length === 0);

  constructor() {
    // Efecto para guardar en localStorage cuando cambie el carrito
    effect(() => {
      this.saveToLocalStorage(this.cart());
    });
  }

  addToCart(product: Product, quantity: number = 1) {
    const currentCart = this.cart();
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      // Si ya existe, aumentar cantidad
      this.cart.set(
        currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si no existe, añadir nuevo
      this.cart.set([...currentCart, { product, quantity }]);
    }
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cart.set(
      this.cart().map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }


  incrementQuantity(productId: string) {
    this.cart.set(
      this.cart().map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }


  decrementQuantity(productId: string) {
    const item = this.cart().find(i => i.product.id === productId);
    if (!item) return;

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }


  removeFromCart(productId: string) {
    this.cart.set(
      this.cart().filter(item => item.product.id !== productId)
    );
  }


  clearCart() {
    this.cart.set([]);
  }

  // Verificar si un producto está en el carrito
  isInCart(productId: string): boolean {
    return this.cart().some(item => item.product.id === productId);
  }

  // Obtener cantidad de un producto específico
  getProductQuantity(productId: string): number {
    const item = this.cart().find(i => i.product.id === productId);
    return item?.quantity ?? 0;
  }

  // LocalStorage helpers
  private loadFromLocalStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  private saveToLocalStorage(cart: CartItem[]) {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
}
