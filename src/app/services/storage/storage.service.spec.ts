import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { StorageService } from './storage.service'

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    sessionStorage.setItem("test","1")

    TestBed.configureTestingModule({})
    service = TestBed.inject(StorageService)
  });

  it('StorageService should be created', fakeAsync( () => {
    expect(service).toBeTruthy();
  }))

  it('should call get method', fakeAsync( () => {
    spyOn(service,'get').and.callThrough()
    spyOn(sessionStorage,'getItem').and.callThrough()

    service.get("test")
    tick()
    expect(service.get).toHaveBeenCalled()
    expect(sessionStorage.getItem).toHaveBeenCalled()
  }))

  it('should call set method', fakeAsync( () => {
    spyOn(service,'set').and.callThrough()
    spyOn(sessionStorage,'setItem').and.callThrough()

    service.set("test","123")
    tick()
    expect(service.set).toHaveBeenCalled()
    expect(sessionStorage.setItem).toHaveBeenCalled()
  }))

  it('should call remove method', fakeAsync( () => {
    spyOn(service,'remove').and.callThrough()
    spyOn(sessionStorage,'removeItem').and.callThrough()

    service.remove("test")
    tick()
    expect(service.remove).toHaveBeenCalled()
    expect(sessionStorage.removeItem).toHaveBeenCalled()
  }))
});
