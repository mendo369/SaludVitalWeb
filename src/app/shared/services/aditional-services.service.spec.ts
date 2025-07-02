import { TestBed } from '@angular/core/testing';

import { AditionalServicesService } from './aditional-services.service';

describe('AditionalServicesService', () => {
  let service: AditionalServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AditionalServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
