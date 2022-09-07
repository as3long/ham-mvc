import HamMVCObject from './HamMVCObject';

export default class HamMVCEvent extends HamMVCObject {
  className = 'ham.mvc.HamMVCEvent';
  type: string;
  target;

  constructor(type: string) {
    super();
    this.type = type;
  }
}
