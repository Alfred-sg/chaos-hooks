import React, { useState } from 'react';
import useForm from 'rc-form-hooks';

export default (options: any) => {
  const [ errors, setErrors ] = useState<{[key: string]: any}>({});
  const formMethods = useForm(options);

  return {
    ...formMethods,
    errors,
    setFieldsValue: async (vals: any) => {
      const res = await formMethods.setFieldsValue(vals);
      console.log(formMethods.getFieldsError())
      setErrors(formMethods.getFieldsError());
      return res;
    },
    validateFields: async () => {
      const res = await formMethods.validateFields();
      setErrors(formMethods.getFieldsError());
      return res;
    },
    getFieldsError: () => {
      return errors;
    },
    getFieldError: (name: string) => {
      return errors[name] || [];
    }
  }
}