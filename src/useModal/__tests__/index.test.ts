import { renderHook, act } from '@testing-library/react-hooks';
import useModal from '../';

describe('useModal', () => {
  describe('show & hide modal', () => {
    it('show modal', () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.show();
      });
      
      expect(result.current.visible).toBe(true);
      expect(result.current.dataSource).toEqual(null);
    });

    it('show modal with dataSource', () => {
      const { result } = renderHook(() => useModal());
      const dataSource = {
        test: 'test'
      };

      act(() => {
        result.current.show(dataSource);
      });
      
      expect(result.current.visible).toBe(true);
      expect(result.current.dataSource).toBe(dataSource);
    });

    it('hide modal', () => {
      const { result } = renderHook(() => useModal());
      const dataSource = {
        test: 'test'
      };

      act(() => {
        result.current.show(dataSource);
        result.current.hide();
      });
      
      expect(result.current.visible).toBe(false);
      expect(result.current.dataSource).toEqual(null);
    });
  });

  describe('show & hide modal with form', () => {
    it('show modal', () => {
      const { result, rerender } = renderHook(() => useModal({
        enableForm: true,
        getValuesFromDataSource: (dataSource) => {
          return {
            test: dataSource.test,
          }
        }
      }));
      const dataSource = {
        test: 'test'
      };

      act(() => {
        if (result.current.form) result.current.form.registerField('test');
        result.current.show(dataSource);
      });
      
      if (result.current.form){
        expect(result.current.form.getFieldsValue()).toEqual(dataSource);
      }
    });
  });
});