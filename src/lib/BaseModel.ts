import EventDispatcher from './EventDispatcher'
import HamMVCEvent from './HamMVCEvent';

export default class BaseModel extends EventDispatcher {
  className = 'ham.mvc.BaseModel';
  target = this;
  private _data = null;

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
    this.dispatchEvent(new HamMVCEvent('data'));
  }
}
