﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import { UserFormComponent } from "./user-form.component";
import { StaticModalConfig } from "../Shared/modal.config";

@Component({
    selector: "sg-user-list",
    templateUrl: "app/User/user-list.component.html"
})

export class UserListComponent implements OnInit, OnDestroy {
    users: IUser[];
    bsModalRef: BsModalRef;
    userSubsription: Subscription;

    constructor(private readonly userService: UserService,
                private readonly modalService: BsModalService) { }

    ngOnInit(): void {
        this.userSubsription = this.userService.$users.subscribe(users => this.users = users);
        this.userService.loadUsers();
    }

    ngOnDestroy(): void {
        this.userSubsription.unsubscribe();
        this.userService.onComponentDestroy();
    }

    openEditUserModal(user: IUser) {
        this.bsModalRef = this.modalService.show(UserFormComponent, StaticModalConfig);
        const userFormComponent = this.bsModalRef.content as UserFormComponent;
        userFormComponent.title = "Edit User";
        userFormComponent.user = Object.assign({}, user);
    }
}