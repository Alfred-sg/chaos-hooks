import React, { Component, useRef, useState, useLayoutEffect, Fragment } from 'react';
import Validator, { ValidateSource, Rules, ErrorList } from 'async-validator';
import { FieldMeta, Errors } from '@/useForm/types';

const useForm = () => {
  const fieldsMeta = { } as { [key: string]: FieldMeta };
  const [fields, setFields] = useState<ValidateSource>({});
  const [errors, setErrors] = useState<Errors>({});

  useLayoutEffect(() => {
    console.log(fieldsMeta)
    const newFields: ValidateSource = {};
    const newErrors: Errors = {};
    getFieldsName().map(name => {
      newFields[name] = fields[name];
      newErrors[name] = errors[name];
    });
    setFields(newFields);
    setErrors(newErrors);
  }, [])

  const registerField = (name: string, meta: FieldMeta) => {
    console.log(name);
    if (fieldsMeta) fieldsMeta[name] = meta;
  }

  const unRegisterField = (name: string) => {
    console.log(fields);
    delete fieldsMeta[name];
    delete fields[name];
    setFields(fields);
    delete errors[name];
    setErrors(errors);
  }

  const getFieldsName = (names?: string[]) => {
    return names ? names : Object.keys((fieldsMeta || {}));
  }

  const setFieldMeta = (name: string, key: string, value: any) => {
    if ( !fieldsMeta[name] ) fieldsMeta[name] = {};
    fieldsMeta[name][key] = value;
  }

  const getFieldMeta = (name: string, key?: string) => {
    const meta = fieldsMeta[name];
    if (key) return meta[key];
    return meta;
  }

  const validate = (names?: string[], vals?: ValidateSource, scroll?: boolean) => {
    const rules: Rules = {};
    getFieldsName(names).map((name: string) => {
      rules[name] = getFieldMeta(name, 'rules');
    });

    return new Promise((resolve, reject) => {
      new Validator(rules).validate(
        vals == undefined ? fields : vals, {}, 
        (errorList: ErrorList) => {
          if (!errorList) {
            const errs = {...errors};
            getFieldsName(names).map(name => {
              delete errs[name];
            });
            setErrors(errs);
            resolve(fields);
          } else {
            const errs: { [key: string]: string[] } = {};
            errorList.map(({ field, message }, index) => {
              if (!index && scroll) scrollToField(field);
              if (!errs[field]) errs[field] = [message];
              else errs[field].push(message);
            });

            setErrors({
              ...errors,
              ...errs,
            });

            reject({
              errors,
            });
          };
        }
      );
    });
  }

  const validateFields = (names?: string[]) => {
    const values: ValidateSource = {};
    getFieldsName(names).map((name: string) => {
      values[name] = fields[name];
    });

    return validate(names, values, true);
  }

  const validateField = (name: string, value: any) => {
    return validate([name], {
      [name]: value,
    });
  }

  const getFieldDecorator = (name: string, meta: FieldMeta = {} as FieldMeta) => {
    console.log(meta);
    registerField(name, meta);
    const { 
      initialValue, 
      trigger = 'onChange', 
      validateTrigger = 'onChange',
      valuePropName = 'value',
    } = meta;

    return (inst: React.ReactElement) => {
      const instProps = inst.props;
      const props = {
        ...instProps,
        defaultValue: initialValue,
        [valuePropName]: getFieldValue(name),
        [trigger]: (val: any) => {
          instProps[trigger] && instProps[trigger](val);
          setFieldsValue({
            [name]: val,
          });
        },
        // 适配 antd 3
        'data-__field': {
          errors: errors[name],
          value: fields[name],
        },
        'data-__meta': {
          validate: [{ rules: meta.rules }]
        }
      };
  
      const originMethod = props[validateTrigger];
      props[validateTrigger] = (val: any) => {
        console.log(val);
        originMethod && originMethod(val);
        validateField(name, val);
      };

      return (
        <Fragment>
          <i ref={(ref: any) => { setFieldMeta(name, 'fieldRef', ref) }} />
          {React.cloneElement(inst, props)}
        </Fragment>
      );
    }
  }

  const scrollToField = (name: string) => {
    const fieldMeta = getFieldMeta(name);
    if (!fieldMeta || !fieldMeta.fieldRef) return;
    const { offsetTop } = fieldMeta.fieldRef;
    if (window.scrollY > offsetTop) window.scrollTo(0, offsetTop);
  }

  const getFieldsValue = () => fields;
  const getFieldValue = (name: string) => fields[name];
  const getFieldsError = () => errors;
  const getFieldError = (name: string) => errors[name] || [];
  const setFieldsValue = (vals: ValidateSource) => {
    setFields({
      ...fields,
      ...vals,
    });
  };
  const resetFields = (names: string[]) => {
    const values = { ...fields };
    getFieldsName(names).map((name: string) => {
      values[name] = getFieldMeta(name, 'initialValue');
    });
    
    setFields(values);
  };

  return {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    getFieldsError,
    getFieldError,
    setFieldsValue,
    resetFields,
    validateFields,
  }
}

export default useForm;
