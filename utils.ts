import { NotificationMap } from './constants';
import { TypeNames, Ideas } from './types/IdeaTypes';

export const getInstanceType = (instance: object): TypeNames => instance.constructor.name as TypeNames;

export const shouldNotify = <T extends Ideas>(properties: Array<keyof T>, instanceType: TypeNames): boolean => {
  let shouldNotify = false;
  for (let property of properties) {
    if (property in NotificationMap[instanceType]) {
      shouldNotify = true;
      break;
    }
  }
  return shouldNotify;
}