import HamMVCEvent from './HamMVCEvent';
import HamMVCObject from './HamMVCObject';

export default class EventVO extends HamMVCObject {
  className = 'ham.mvc.EventVO';
  name: string;
  type: string;
  callBack: (event: HamMVCEvent) => void;

  constructor(name: string, type: string, callBack: (event: HamMVCEvent) => void) {
    super();
    this.name = name;
    this.type = type;
    this.callBack = callBack;
  }
}
