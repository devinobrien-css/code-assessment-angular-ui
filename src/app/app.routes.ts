import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { loggedInGuardGuard } from './core/guards/logged-in.guard';
import { loggedOutGuardGuard } from './core/guards/logged-out.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { BrowseBooksComponent } from './features/browse/browse-books/browse-books.component';
import { SettingsComponent } from './features/profile/settings/settings.component';
import { EditUserComponent } from './features/profile/edit-user/edit-user.component';
import { ChangePasswordComponent } from './features/profile/change-password/change-password.component';
import { ViewUsersComponent } from './features/user-manager/view-users-list/view-users-list.component';
import { ViewBooksComponent } from './features/book-manager/view-books/view-books.component';
import { EventsComponent } from './features/events/events.component';
import { ReturnsComponent } from './features/transactions/returns/returns.component';
import { AddBookComponent } from './features/book-manager/add-book/add-book.component';
import { EditBookComponent } from './features/book-manager/edit-book/edit-book.component';
import { ProcessReturnComponent } from './features/transactions/process-return/process-return.component';
import { WriteReviewComponent } from './features/browse/write-review/write-review.component';
import { CheckedOutBooksComponent } from './features/checked-out-books/checked-out-books.component';
import { FavoritesListComponent } from './features/favorited-books/favorites-list/favorites-list.component';
import { isEmployeeGuard } from './core/guards/is-employee.guard';
import { UnauthorizedErrorComponent } from './shared/components/error/unauthorized-error/unauthorized-error.component';
import { NotFoundErrorComponent } from './shared/components/error/not-found-error/not-found-error.component';
import { ViewBookComponent } from './features/browse/view-book-modal/view-book-modal.component';
import { CheckoutComponent } from './features/browse/checkout/checkout.component';
import { ViewUserModalComponent } from './features/user-manager/view-user-modal/view-user-modal.component';
import { LandingComponent } from './features/landing/landing.component';
import { MainComponent } from './component-library/main/main.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [loggedOutGuardGuard] },
  {
    path: 'explore',
    component: HomePageComponent,
    canActivate: [loggedInGuardGuard],
  },
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
        path: ':bookId',
        component: ViewBookComponent,
      },
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
    path: 'user-manager',
    component: ViewUsersComponent,
    canActivate: [isEmployeeGuard],
    children: [
      {
        path: ':id',
        component: ViewUserModalComponent,
      },
    ],
  },
  {
    path: 'book-manager',
    component: ViewBooksComponent,
    canActivate: [isEmployeeGuard],
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
    component: FavoritesListComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'checked-out-books',
    component: CheckedOutBooksComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'returns',
    component: ReturnsComponent,
    canActivate: [isEmployeeGuard],
    children: [
      {
        path: ':transactionId',
        component: ProcessReturnComponent,
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedErrorComponent,
    canActivate: [loggedInGuardGuard],
  },
  {
    path: 'component-library',
    component: MainComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
