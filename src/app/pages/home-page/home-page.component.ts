import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentComponent } from 'src/app/components/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef: ViewContainerRef;

  showDynamicComponent() {
    this.viewRef.clear();
    this.viewRef.createComponent(DynamicComponentComponent);
  }

  removeDynamicComponent() {
    this.viewRef.clear();
  }
}
