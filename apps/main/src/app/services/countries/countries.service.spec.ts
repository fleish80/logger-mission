import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { countriesMock } from '../../mocks/countries.mock';
import { COUNTRIES_URL, CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CountriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); 

  it('should get countries by name', (done) => {

    service.getCountries('isr')
    .subscribe(res => {
      expect(res).toEqual(countriesMock);
      done();
    });

    const req = httpTestingController.expectOne(`${COUNTRIES_URL}isr`);
    expect(req.request.method).toEqual('GET');

    req.flush(countriesMock);

  });

  it('should handle error', () => {

    const error = new HttpErrorResponse({status: 500, statusText: 'Internal Serve Error'});

    service.getCountries('isr')
    .subscribe({
      next: () => {},
      error: (err) => {
        expect(err.status).toEqual(error.status);
        expect(err.statusText).toEqual(error.statusText);
      }
    })
    const req = httpTestingController.expectOne(`${COUNTRIES_URL}isr`);
    expect(req.request.method).toEqual('GET');
    req.flush(new ErrorEvent('error'), error);
  })
});