import { useState } from 'react';
import { Modal } from './types';

const useModal = (): Modal => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>(null);

  const show = (record?: any) => {
    if (record) setDataSource(record);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    setDataSource(null);
  };

  return {
    visible,
    dataSource,
    show,
    hide,
  }
}

export default useModal;