import { useEffect } from 'react';
import useForm from '../../useForm';
import { Modal, Options } from '../types';

/**
 * 添加表单功能
 * @param modal 
 */
const useModalForm = (modal: Modal, options: Options = {}) => {
  const form = useForm(options.formOptions);

  useEffect(() => {
    if (modal.visible && modal.dataSource){
      const values = options.getValuesFromDataSource ? 
        options.getValuesFromDataSource(modal.dataSource) : modal.dataSource;
        console.log(values);
      form.setFieldsValue(values);
    }
  }, [modal.visible, modal.dataSource]);

  useEffect(() => {
    if (!modal.visible){
      form.resetFields();
    }
  }, [modal.visible]);

  modal.form = form;
}

export default useModalForm;