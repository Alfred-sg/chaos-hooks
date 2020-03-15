import React, { useContext, useRef, useEffect } from 'react';
import { InputItem } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';
import styles from './index.less';

export default ({
  name,
  src,
  onRefresh,
  validCodeData,
  ...rest
}: {
  name: string,
  src: string,
  onRefresh: () => void,
  validCodeData: any,
  [key: string]: any,
}) => {
  const imgWrap = useRef<HTMLDivElement>(null);
  const {
    getFieldDecorator,
    getFieldError,
    setFieldsValue,
  } = useContext(Context);

  const rules = [{
    required: true,
    message: `请输入验证码`,
    whitespace: true, 
    min: 4
  }].filter(item => !!item);

  const handleRefresh = () => {
    onRefresh && onRefresh().then(res => {
      if (res && res.success){
        // const image = new Image();
        // image.src = `data:img/png;base64,${res.data.value}`;
        // imgWrap.current.replaceChild(image, imgWrap.current.firstChild);
      }
    });
  }

  getFieldDecorator('validCodeKey');

  useEffect(() => {
    if (validCodeData && validCodeData.name){
      setFieldsValue({
        validCodeKey: validCodeData.name,
      });
    }
  }, [validCodeData])

  return (
    <FormItem
      name={name}
      required={true}
      label="验证码"
      className={styles.code_verifier__item}
    >
      <div ref={imgWrap}>
        {validCodeData && <img src={`data:img/png;base64,${validCodeData.value}`} />}
        <div
          className={styles.refresh}
          onClick={() => {
            handleRefresh();
          }}
        >
          看不清？换一个
        </div>
      </div>
      
      {getFieldDecorator(name, {
        rules,
      })(
        <InputItem
          placeholder="请输入验证码"
          maxLength={4}
          {...rest}
          error={!!getFieldError(name).length}
        />
      )}
    </FormItem>
  )
}