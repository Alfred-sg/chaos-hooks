import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../';

describe('useForm', () => {
  describe('register & unregister field', () => {
    it('metadata is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { };

      act(() => {
        result.current.registerField(name, meta);
      });
      
      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.getFieldMeta(name)).toBe(meta);
      expect(result.current.getFieldValue(name)).toBe(undefined);
      expect(result.current.getFieldsValue()).toEqual({
        test: undefined
      });
    });

    it('initialValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { 
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
      });
      
      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.getFieldMeta(name, 'initialValue')).toBe('test');
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test'
      });
    });

    it('deepValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = { 
        initialValue: 'a'
      };

      act(() => {
        result.current.registerField(name, meta);
      });
        
      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a']
      });
    });
    
    it('metadata is destoryed when unregister', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { };

      act(() => {
        result.current.registerField(name, meta);
        result.current.unRegisterField(name);
      });

      expect(result.current.getFieldMeta(name)).toBe(undefined);
      expect(result.current.getFieldValue(name)).toBe(undefined);
      expect(result.current.getFieldsValue()).toEqual({ });
    });
  });

  describe('set & get field value', () => {
    it('value is updated when set field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { 
        initialValue: 'test'
      };

      act(() => {
        result.current.registerField(name, meta);
      });
      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);

      act(() => {
        result.current.setFieldValue(name, 'setFieldValue');
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue(name)).toBe('setFieldValue');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'setFieldValue'
      });
    });

    it('deep value is setted when set field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = { 
        initialValue: 'a'
      };

      act(() => {
        result.current.registerField(name, meta);
      });
        
      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a']
      });

      act(() => {
        result.current.setFieldValue(name, 'b');
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual(['b']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['b']
      });
    });

    it('value is updated when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { 
        initialValue: 'test'
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);

      act(() => {
        result.current.setFieldsValue({
          [name]: 'setFieldsValue'
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue(name)).toBe('setFieldsValue');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'setFieldsValue'
      });
    });

    it('deep value is setted when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = { 
        initialValue: 'a'
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a']
      });

      act(() => {
        result.current.setFieldsValue({
          test: ['b']
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual(['b']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['b']
      });
    });

    it('value is reseted when reset fields', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = { 
        initialValue: 'test'
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldsValue({
          [name]: 'setFieldsValue'
        });
        result.current.resetFields();
      });

      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test'
      });
    });
  });

  describe('validate field', () => {
    it('validate initial value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        rules: [{
          required: true,
          message: 'test is required'
        }]
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toEqual(['test is required']);
    });

    it('validate field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        rules: [{
          required: true,
          message: 'test is required'
        }]
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldValue(name, 'test');
      });

      expect(result.current.getFieldValue(name)).toBe('test');

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toBe(undefined);

      // act(() => {
      //   result.current.setFieldValue(name, undefined);
      //   result.current.validateFields();
      // });
      // expect(result.current.getFieldError(name)).toBe(['test is required']);
    });

    it('validate cleared field', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
        rules: [{
          required: true,
          message: 'test is required'
        }]
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldValue(name, undefined);
      });

      expect(result.current.getFieldValue(name)).toBe(undefined);

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toEqual(['test is required']);
    });
  });


});