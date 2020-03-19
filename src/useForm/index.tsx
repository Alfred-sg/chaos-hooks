import React, { Component, useRef, useState, useLayoutEffect, Fragment, useEffect } from 'react';
import Validator, { ValidateSource, Rules, ErrorList } from 'async-validator';
import { FieldMeta, Errors } from '@/useForm/types';

class VirtualField extends Component<any> {
  componentWillUnmount(){
    const { onDestroy } = this.props;
    onDestroy && onDestroy();
  }

  render(){
    const { setFieldRef } = this.props;
    return <i ref={(ref: any) => { if (ref) setFieldRef(ref) }} />;
  }
}

const useForm = () => {
  const fieldsMeta = useRef<{ [key: string]: FieldMeta }>({});
  const [fields, setFields] = useState<ValidateSource>({});
  const [errors, setErrors] = useState<Errors>({});
  const [shouldFlushState, setShouldFlushState] = useState<boolean>(false);

  /**
   * 利用 useEffect 刷新 state，willUnmount 中取得的 state 为历史数据（闭包引起）
   * 但这样做会造成两次渲染
   */
  useEffect(() => {
    if (shouldFlushState){
      setFields(getFieldsValue());
      setErrors(getFieldsError());
    }
  }, [shouldFlushState]);

  const registerField = (name: string, meta: FieldMeta) => {
    fieldsMeta.current[name] = meta;
  }

  const unRegisterField = (name: string) => {
    delete fieldsMeta.current[name];
    delete fields[name];
    setFields(fields);
    delete errors[name];
    setErrors(errors);
  }

  const getFieldsName = (names?: string[]) => {
    return names ? names : Object.keys((fieldsMeta.current || {}));
  }

  const setFieldMeta = (name: string, key: string, value: any) => {
    if ( !fieldsMeta.current[name] ) fieldsMeta.current[name] = {};
    fieldsMeta.current[name][key] = value;
  }

  const getFieldMeta = (name: string, key?: string) => {
    const meta = fieldsMeta.current[name];
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
        originMethod && originMethod(val);
        validateField(name, val);
      };

      const onDestroy = () => {
        if (!shouldFlushState){
          setShouldFlushState(true);
          delete fieldsMeta.current[name];
        };
      }

      return (
        <Fragment>
          <VirtualField 
            onDestroy={onDestroy}
            setFieldRef={(ref: any) => { setFieldMeta(name, 'fieldRef', ref) }}
          />
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

  const getFieldsValue = () => {
    const values: ValidateSource = {};
    const names = getFieldsName();
    names.forEach(name => {
      values[name] = fields[name];
    })
    return values;
  }
  const getFieldValue = (name: string) => fields[name];
  const getFieldsError = () => {
    const errs: Errors = {};
    const names = getFieldsName();
    names.forEach(name => {
      errs[name] = errors[name];
    })
    return errs;
  };
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
