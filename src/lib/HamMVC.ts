import BaseController from './BaseController';
import BaseModel from './BaseModel';
import EventVO from './EventVO';
import HamMVCEvent from './HamMVCEvent';
import HamMVCObject from './HamMVCObject';

type HamMVCObjectOrHamMVCObjectList = HamMVCObject | Array<HamMVCObject>;

export default class HamMVC extends HamMVCObject {
  className = 'ham.mvc.HamMVC';
  modelDict: Map<string, BaseModel> = new Map();
  classDict: Map<string, HamMVCObject> = new Map();
  actionDict: Map<string, BaseController> = new Map();
  modelEventDict: Map<string, Array<EventVO>> = new Map();
  private static instance: HamMVC;
  static getInstance(): HamMVC {
    if (!HamMVC.instance) {
      HamMVC.instance = new HamMVC();
    }
    return HamMVC.instance;
  }

  registClass(_class: HamMVCObject): void;
  registClass(_class: Array<HamMVCObject>): void;
  registClass(_class: HamMVCObjectOrHamMVCObjectList): void {
    if (Array.isArray(_class)) {
      const len = _class.length;
      for (let i = 0; i < len; i++) {
        this.classDict.set(_class[i].className, _class[i]);
      }
    } else {
      this.classDict.set(_class.className, _class);
    }
  }

  createAction(func, className): BaseController {
    const action = new BaseController();
    action.className = className;
    action.run = func;

    this.registClass(action);
    return action;
  }

  createModel(className): BaseModel {
    const model = new BaseModel();
    model.className = className;
    this.registClass(model);
    return model;
  }

  getModel(name): BaseModel {
    if (!this.modelDict.has(name)) {
      if (!this.classDict.has(name)) {
        throw new Error(`please regist ${name}`);
      }
      this.modelDict.set(name, this.classDict.get(name) as BaseModel);
    }

    return this.modelDict.get(name);
  }

  getAction(name): BaseController {
    if (!this.actionDict.has(name)) {
      if (!this.classDict.has(name)) {
        throw new Error(`please regist ${name}`);
      }
      this.actionDict.set(name, this.classDict.get(name) as BaseController);
    }

    return this.actionDict.get(name);
  }

  bindModel(name: string, func: (event: HamMVCEvent) => void, type = 'data') {
    if (!this.modelEventDict.has(name)) {
      this.modelEventDict.set(name, []);
    }
    const binEventVO = new EventVO(name, type, func);
    this.modelEventDict.get(name).push(binEventVO);
    if (!this.getModel(name).hasEventListener(type)) {
      this.getModel(name).addEventListener(type, (e) => {
        const modelEventVector = this.modelEventDict.get(name);

        e.target = this.getModel(name);
        for (let i = 0; i < modelEventVector.length; i++) {
          if (e.type === modelEventVector[i].type) {
            modelEventVector[i].callBack(e);
          }
        }
      });
    }
  }

  unBindModel(name: string, func: (event: HamMVCEvent) => void, type = 'data') {
    this.getModel(name).removeEventListener(type, func);
  }
}

export const $h = HamMVC.getInstance();
