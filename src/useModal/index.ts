import { useCallback, useState } from 'react';
import useForm from './uses/useForm';
import { Modal, Options } from './types';

const useModal = (options?: Options): Modal => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>(null);

  const show = useCallback((record?: any) => {
    if (record) setDataSource(record);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setDataSource(null);
  }, []);

  const modal = {
    visible,
    dataSource,
    show,
    hide,
  };

  if (options && options.enableForm){
    useForm(modal, options);
  }

  return modal;
}

export default useModal;