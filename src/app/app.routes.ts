import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { loggedInGuardGuard } from './core/guards/logged-in-guard.guard';
import { loggedOutGuardGuard } from './core/guards/logged-out-guard.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { BrowseBooksComponent } from './features/browse/browse-books/browse-books.component';
import { SettingsComponent } from './features/profile/settings/settings.component';
import { EditUserComponent } from './features/profile/edit-user/edit-user.component';
import { ChangePasswordComponent } from './features/profile/change-password/change-password.component';
import { ViewUsersComponent } from './features/users/view-users/view-users.component';
import { ViewBooksComponent } from './features/books/view-books/view-books.component';
import { EventsComponent } from './features/events/events.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CartComponent } from './features/cart/cart.component';
import { ReturnsComponent } from './features/transactions/returns/returns.component';
import { AddBookComponent } from './features/books/add-book/add-book.component';
import { EditBookComponent } from './features/books/edit-book/edit-book.component';
import { CheckoutComponent } from './shared/components/books/checkout/checkout.component';
import { ProcessReturnComponent } from './features/transactions/process-return/process-return.component';
import { WriteReviewComponent } from './features/browse/write-review/write-review.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [loggedInGuardGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOutGuardGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedOutGuardGuard],
  },
  {
    path: 'browse',
    component: BrowseBooksComponent,
    canActivate: [loggedInGuardGuard],
    children: [
      {
        path: ':bookId/checkout/:userId',
        component: CheckoutComponent,
      },
      {
        path: ':bookId/review',
        component: WriteReviewComponent,
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [loggedInGuardGuard],
    children: [
      {
        path: 'profile',
        component: EditUserComponent,
      },
      {
        path: 'password',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: 'users',
    component: ViewUsersComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'books',
    component: ViewBooksComponent,
    canActivate: [loggedInGuardGuard],
    children: [
      {
        path: 'add',
        component: AddBookComponent,
      },
      {
        path: 'edit/:id',
        component: EditBookComponent,
      },
    ],
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'returns',
    component: ReturnsComponent,
    canActivate: [loggedInGuardGuard],
    children: [
      {
        path: ':transactionId',
        component: ProcessReturnComponent,
      },
    ],
  },
];
