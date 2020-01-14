import HookCom from '@/renderer/pages/hooks/index.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('react hook测试', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  it.only('测试count增加', () => {
    act(() => {
      ReactDOM.render(<HookCom></HookCom>, container);
    });
    const res = container.querySelector('.res');
    const btn = container.querySelector('.countBtn');
    expect(res.textContent).toEqual('count数量新值1，旧值');
    act(() => {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(res.textContent).toEqual('count数量新值2，旧值1');
  });
});
