import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DarkModeService } from '../../../core/data-access/darkmode.service';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let darkModeServiceMock: jest.Mocked<DarkModeService>;

  beforeEach(() => {
    darkModeServiceMock = {
      darkModeOn: signal(false)
    } as jest.Mocked<DarkModeService>;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: DarkModeService, useValue: darkModeServiceMock }],
      imports: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('componet should created', () => {
    expect(component).toBeTruthy();
  });

  test('should be on dark mode', () => {
    const mockElement = document.createElement('html');

    jest
      .spyOn(document, 'querySelector')
      .mockReturnValue(mockElement as unknown as HTMLElement);

    mockElement.classList.toggle('dark-mode', true);

    expect(mockElement.classList.contains('dark-mode')).toBeTruthy();
    darkModeServiceMock.darkModeOn.set(mockElement.classList.length !== 0);
    expect(darkModeServiceMock.darkModeOn()).toBeTruthy();
  });

  test('should be off dark mode', () => {

    const mockElement = document.createElement('html');

    jest
      .spyOn(document, 'querySelector')
      .mockReturnValue(mockElement as unknown as HTMLElement);

    mockElement.classList.toggle('dark-mode', false);

    expect(mockElement.classList.contains('dark-mode')).toBeFalsy();
    darkModeServiceMock.darkModeOn.set(mockElement.classList.length !== 0);
    expect(component.darkModeService.darkModeOn()).toBeFalsy()
  });
});
