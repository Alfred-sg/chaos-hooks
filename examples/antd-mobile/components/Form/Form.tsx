import React, { useState } from 'react';
import FormContext from './Context';
import { FormMethods } from 'rc-form-hooks';
import styles from './index.less';

export default ({
  form,
  children,
}: {
  form: FormMethods<any>,
  children: React.ReactNode[] | React.ReactNode,
}) => {
  return (
    <div className={styles.form}>
      <FormContext.Provider value={form}>
        { children }
      </FormContext.Provider>
    </div>
  )
}