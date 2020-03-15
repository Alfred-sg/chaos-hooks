export interface Modal {
  visible: boolean;
  dataSource: any;
  show: (record?: any) => void;
  hide: () => void;
}