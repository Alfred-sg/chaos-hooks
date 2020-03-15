import React, { useContext } from 'react';
import { WingBlank, List } from 'antd-mobile';
import Context from './Context';
import styles from './index.less';

export default ({
  name,
  required = true,
  label,
  labelAddon,
  wingBlankSize = 'lg',
  className,
  children,
}: {
  name: string,
  required?: boolean,
  label: string,
  labelAddon?: React.ReactNode,
  wingBlankSize?: "lg" | "sm" | "md",
  className?: string,
  children?: any;
}) => {
  const {
    getFieldError,
  } = useContext(Context);
  const errors = getFieldError(name);
  const hasError = !!errors.length;

  return (
    <div className={className}>
    <WingBlank size={wingBlankSize}>
      <List
        renderHeader={() => required ? (
          <div>
            <span className={styles.required}>*</span>
            {label}
            {labelAddon}
          </div>
        ) : label}
        
      >
          {children}
      </List>
      {hasError ? (
        <span className={styles.error}>{errors.join(',')}</span>
        ) : null}
        </WingBlank>
    </div>
  )
}