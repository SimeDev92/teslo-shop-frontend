import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '@products/services/products.service';
import { ProductDetailsComponent } from './product-details/product-details';


@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {

  productService = inject(ProductsService)
  ActivatedRoute = inject(ActivatedRoute)
  router = inject(Router);

  productId = toSignal(
    this.ActivatedRoute.params.pipe(
      map(params=> params['id'])
    )
  );

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ( { params }) => {
     return this.productService.getProductById( params.id )
    },

  });

  redirectEffect = effect(() => {

    if(this.productResource.error()){

      this.router.navigate(['/admin/products']);
    }


  })

}
