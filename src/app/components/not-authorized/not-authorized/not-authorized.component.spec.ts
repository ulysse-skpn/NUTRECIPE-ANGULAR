import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RootComponent } from '../../root/root.component';
import { NotAuthorizedComponent } from './not-authorized.component';

describe('NotAuthorizedComponent', () => {
  let component: NotAuthorizedComponent
  let fixture: ComponentFixture<NotAuthorizedComponent>
  let el:HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthorizedComponent ],
      imports: [ RouterTestingModule.withRoutes([
        {
          path:'login' , component: RootComponent
        }
      ])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create Not authorized Page', () => {
    expect(component).toBeTruthy();
  })

  it('should call goToLogin method', async() => {
    spyOn(component,'goToLogin').and.callThrough()
    el = fixture.debugElement.query(By.css(".goToLogin")).nativeElement
    el.click()
    expect(el).toBeDefined()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      expect(component.goToLogin).toHaveBeenCalled()
    })  

  });

});
