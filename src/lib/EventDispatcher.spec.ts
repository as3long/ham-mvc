import { debug } from 'console';

import test from 'ava';

import EventDispatcher from './EventDispatcher';
import HamMVCEvent from './HamMVCEvent';

let dispatch: EventDispatcher;
let handler;
test.before((t) => {
  dispatch = new EventDispatcher();
  handler = (event: HamMVCEvent) => {
    //
    debug(event);
    t.is(event.type, 'test');
  };
});

test('EventDispatcher className', (t) => {
  t.is(dispatch.className, 'ham.mvc.EventDispatcher');
});

test('EventDispatcher', async (t) => {
  dispatch.addEventListener('test', handler);
  dispatch.addEventListener('test', handler);

  t.true(dispatch.hasEventListener('test'));
  t.false(dispatch.hasEventListener('none type'));
  dispatch.dispatchEvent(new HamMVCEvent('test'));
  dispatch.dispatchEvent(new HamMVCEvent('none type'));

  dispatch.removeEventListener('test', handler);
  t.false(dispatch.hasEventListener('test'));

  dispatch.removeEventListener('none type', handler);

  dispatch.addEventListener('test', handler);
  t.true(dispatch.hasEventListener('test'));

  dispatch.removeAllEventListener('test');
  t.false(dispatch.hasEventListener('test'));
  dispatch.removeAllEventListener('none type');
});
