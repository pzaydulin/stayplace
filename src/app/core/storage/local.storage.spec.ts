import { TestBed } from '@angular/core/testing';
import { LocalStorage, STORAGE_KEY } from './local.storage';

describe('[core/storage] LocalStorage', () => {
  let service: LocalStorage;

  beforeEach(() => {
    // Clear the global localStorage before each test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [LocalStorage],
    });
    service = TestBed.inject(LocalStorage);
  });

  it('should initialize with empty state if no data in localStorage', () => {
    // If no data in localStorage, getLocalState() should return {}
    // and thus the internal BehaviorSubject should be initialized with this value.
    expect(service['state$'].getValue()).toEqual({});
  });

  it('method setItem should update state and save data to localStorage', (done: DoneFn) => {
    spyOn(service.storage, 'setItem').and.callThrough();

    // Calling setItem for adding a new value
    service.setItem('foo', 'bar');

    // Checking that observable getItem returns the expected value
    service.getItem<string>('foo').subscribe((value) => {
      expect(value).toEqual('bar');
    });

    // Forming the expected state and checking the call to native localStorage.setItem
    const expectedState = { foo: 'bar' };
    expect(service.storage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify(expectedState)
    );

    // Checking getter length()
    expect(service.length).toEqual(1);
    done();
  });

  it('method removeItem should remove an item from the state and update localStorage', (done: DoneFn) => {
    // First, we set two values
    service.setItem('foo', 'bar');
    service.setItem('baz', 'qux');

    spyOn(service.storage, 'setItem').and.callThrough();

    // Remove 'foo' key
    service.removeItem('foo');

    // Checking that after removing the value for 'foo' it equals null
    service.getItem<string>('foo').subscribe((value) => {
      expect(value).toBeNull();
    });

    // For the key 'baz', the value should remain
    service.getItem<string>('baz').subscribe((value) => {
      expect(value).toEqual('qux');
    });

    // Expected state after removal
    const expectedState = { baz: 'qux' };
    expect(service.storage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify(expectedState)
    );
    done();
  });

  it('method clear should reset the state and clear localStorage', (done: DoneFn) => {
    // Setting some value to ensure the state is not empty
    service.setItem('foo', 'bar');

    spyOn(service.storage, 'setItem').and.callThrough();

    // Calling clear should reset the state
    service.clear();

    // For any key, getItem should return null, and the internal state should be an empty object
    service.getItem<any>('foo').subscribe((value) => {
      expect(value).toBeNull();
    });

    expect(service['state$'].getValue()).toEqual({});
    expect(service.storage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify({})
    );
    done();
  });
});
