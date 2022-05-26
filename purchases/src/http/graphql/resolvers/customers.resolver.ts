import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  ResolveReference,
} from '@nestjs/graphql';

import { Customer } from '../models/customer';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
