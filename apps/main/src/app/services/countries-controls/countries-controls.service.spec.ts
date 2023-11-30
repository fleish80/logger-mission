import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CountriesStoreService } from '../countries-store/countries-store.service';
import { CountriesControlsService } from './countries-controls.service';


describe('CountriesControlsService', () => {
  let service: CountriesControlsService;
  const mockCountriesStoreService = {
    loadCountries: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: CountriesStoreService, useValue: mockCountriesStoreService}]
    });
    service = TestBed.inject(CountriesControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load countries', fakeAsync(() => {
    service.nameCtrl.setValue('isr');
    expect(mockCountriesStoreService.loadCountries).not.toHaveBeenCalled();
    tick(500);
    expect(mockCountriesStoreService.loadCountries).toHaveBeenCalledWith('isr');
  }));
});
