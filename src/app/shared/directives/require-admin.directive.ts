import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appRequireAdmin]'
})
export class RequireAdminDirective implements OnInit, OnDestroy {

  stop$ = new Subject();

  isVisible = false;

  /**
   * @param viewContainerRef The location where we need to render the templateRef
   * @param templateRef The templateRef to be potentially rendered
   * @param authenticationService Will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authenticationService.role()) {
      this.checkAccess(this.authenticationService.role());
    } else {
      //  We subscribe to the role$ to know if the user has the admin role
      this.authenticationService.role$.pipe(
        takeUntil(this.stop$)
      ).subscribe(role => {
        this.checkAccess(role);
      });
    }
  }

  checkAccess(role: string): void {
    // If he doesn't have any role, we clear the viewContainerRef
    if (!role) {
      this.viewContainerRef.clear();
    }
    // If the user has the role admin to
    // render this component we can add it
    if (role === AuthenticationService.ROLE_ADMIN) {
      // If it is already visible (which can happen if
      // his roles changed) we do not need to add it a second time
      if (!this.isVisible) {
        // We update the `isVisible` property and add the
        // templateRef to the view using the
        // 'createEmbeddedView' method of the viewContainerRef
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      // If the user does not have the role,
      // we update the `isVisible` property and clear
      // the contents of the viewContainerRef
      this.isVisible = false;
      this.viewContainerRef.clear();
    }
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }

}
