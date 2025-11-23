import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, Pagination],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  router = inject(ActivatedRoute);

  gender = toSignal(
    this.router.params.pipe(
      map(({ gender }) => gender)
    )
  );

    productsService = inject( ProductsService );
    paginationService = inject(PaginationService);


  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() -1,
      gender: this.gender(),
    }),
    stream: ({ params })  => {
      return this.productsService.getProducts({
         gender: params.gender,
         offset: params.page * 9,

        });
    },
  })


}
