import HamMVCEvent from './HamMVCEvent';
import HamMVCObject from './HamMVCObject';
import { isFunction } from './utils';

export default class EventDispatcher extends HamMVCObject {
  className = 'ham.mvc.EventDispatcher';
  dict: Map<string, Array<(event: HamMVCEvent) => void>> = new Map();

  addEventListener(type: string, listener: (event: HamMVCEvent) => void) {
    if (!isFunction(listener)) {
      throw new Error('指定的 listener 不是一个函数');
    }

    if (!this.dict.has(type)) {
      this.dict.set(type, []);
    }

    this.dict.get(type).push(listener);
  }

  dispatchEvent(event: HamMVCEvent) {
    const { type } = event;
    if (!this.dict.has(type)) {
      return;
    }

    const arr = this.dict.get(type);
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      arr[i](event);
    }
  }

  hasEventListener(type: string) {
    return this.dict.has(type);
  }

  removeEventListener(type: string, listener: (event: HamMVCEvent) => void) {
    if (!this.dict.has(type)) {
      return;
    }
    const arr = this.dict.get(type);
    const result = arr.filter((item) => item !== listener);
    if (result.length === 0) {
      this.dict.delete(type);
    } else {
      this.dict.set(type, result);
    }
  }

  removeAllEventListener(type: string): boolean {
    if (!this.dict.has(type)) {
      return true;
    }

    return this.dict.delete(type);
  }
}
