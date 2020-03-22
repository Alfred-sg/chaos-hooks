import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '../';

describe('useFetch', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const request = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success');
      }, 2000);
    });

  it('fetch basic', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(() => {
      return request();
    }));
    
    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual('success');
  });

  it('fetch manual', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(() => {
      return request();
    }, {
      manual: true,
    }));
    
    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual('success');
  });
});