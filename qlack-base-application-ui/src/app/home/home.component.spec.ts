import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Home.ComponentComponent } from './home.component.component';

describe('Home.ComponentComponent', () => {
  let component: Home.ComponentComponent;
  let fixture: ComponentFixture<Home.ComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Home.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
