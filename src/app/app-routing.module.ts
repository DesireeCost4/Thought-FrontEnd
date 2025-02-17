import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { LogoutComponent } from './logout/logout.component';

import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { MessageComponent } from './message/message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'asidebar-left', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'feed', component: FeedComponent, canActivate: [authGuard] },


  { path: 'messages/:userId', component: MessageComponent, canActivate: [authGuard]  },
  { path: 'profile/:username', component: UserProfileComponent },
  


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
