import { createContext } from 'react';
import { FormMethods } from 'rc-form-hooks';

export default createContext<FormMethods<any>>({} as FormMethods<any>);