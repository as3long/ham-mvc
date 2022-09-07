import test from 'ava';

import { $h } from '../index';

import BaseController from './BaseController';
import HamMVC from './HamMVC';

class MyController extends BaseController {
  className = 'MyController';
  run = () => {
    $h.getModel('com.as3long.books').data = 'MyController设置了数据';
  };
}

const myController = new MyController();

test('单例', async (t) => {
  t.is(HamMVC.getInstance().className, 'ham.mvc.HamMVC');
});

test.cb('回调', (t) => {
  const model = HamMVC.getInstance().createModel('com.as3long.books');

  // view
  HamMVC.getInstance().bindModel('com.as3long.books', (event) => {
    // console.log(event); // 视图更新
    t.is(event.target.className, 'com.as3long.books');
    if (event.target.data === 'MyController设置了数据') {
      t.end();
    }
  });

  // 定义一个action
  $h.createAction(() => {
    model.data = '设置了数据';
  }, 'action');

  $h.registClass([myController]);

  // 调用action
  HamMVC.getInstance().getAction('action').run();
  HamMVC.getInstance().getAction('MyController').run();
});
