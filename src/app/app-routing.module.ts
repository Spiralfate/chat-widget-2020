import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { UserChatroomComponent } from "./user-chatroom/user-chatroom.component";


const routes: Routes = [
  { path: 'admin', component: ChatroomComponent },
  { path: 'chat', component: UserChatroomComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
