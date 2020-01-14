import React, { memo, useState, useEffect, useRef, useDebugValue, useCallback, useMemo, useLayoutEffect } from 'react';
import Comp from './comp';
import { createMemo, useEffectOnce, useEvent, usePromise, useLogger, useCss, useWindowSize, useScroll } from 'react-use';
import useUpdateEffect from './useUpdateEffect';
import useMyCss from './useMyCss';
import useMyScroll from './useMyScroll';
import useMyWindowSize from './useMyWindowSize';
import memoizeOne from 'memoize-one';
import Styles from './index.less';
function createC() {
  console.log('create c');
  return 'c';
}
const memoCreateC = createMemo(createC);
function userMyCallback(fn, dep) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dep]);
  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
// 自定义的toggle
function useMyToggle(initialValue) {
  const [state, setState] = useState(!!initialValue);
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, [setState]);
  return [state, toggle];
}

// 自定义挂载/卸载的钩子函数
function useLifecycles(mount, unmountFn) {
  useEffect(function() {
    if (mount) {
      mount();
    }
    return function() {
      if (unmountFn) {
        unmountFn();
      }
    };
  }, []);
}

// effect只在挂载和卸载时执行一次
// function useLifecyclesOnce(mount, unmount) {

// }
// 自定义事件
const defaultTarget = typeof window === 'object' ? window : null;
function useMyEvent(eventName, listener, target, options) {
  if (target === void 0) {
    target = defaultTarget;
  }
  useEffect(
    function() {
      if (!listener || !target) return;
      target.addEventListener(eventName, listener, options);
      return function() {
        target.removeEventListener(eventName, listener, options);
      };
    },
    [eventName, listener, target, JSON.stringify(options)]
  );
}
function event1() {
  console.log('事件1');
}
function event2() {
  console.log('事件2');
}

// 挂载之后返回promise
function useMyPromise() {
  let cResolve = null;
  let cReject = null;

  const p = new Promise((resolve, reject) => {
    cResolve = resolve;
    cReject = reject;
  });
  useEffect(() => {
    console.log('promise 挂载完了');
    cResolve('页面挂载之后了');
  }, []);
  return p;
}
// 判断是否是每次渲染挂载完之后
function useMyMountedState() {
  let mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);
  useEffect(() => {
    console.log('设置挂载-------');
    mountedRef.current = true;
    return () => {
      console.log('设置卸载-------');
      mountedRef.current = false;
    };
  });
  return get;
}
// 日志钩子，只有一次
function useMyLogger(tag, args) {
  const firstRef = useRef(true);
  const logger = useCallback(function(type, tag, args) {
    if (args) {
      console.log(`${tag ? `${tag} ` : 'useMyLogger'}${type}`, args);
    } else {
      console.log(`${tag ? `${tag} ` : 'useMyLogger'}${type}`);
    }
  }, []);
  useEffect(() => {
    if (!firstRef.current) {
      logger('updated', tag, args);
    }
  });
  useEffect(() => {
    firstRef.current = false;
    logger('mounted', tag, args);
    return () => {
      logger('unmount', tag);
    };
  }, []);
}

export default React.memo(props => {
  const [count, setCount] = useState(1);
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [list, setList] = useState([{ label: '列表', number: 3 }]);
  const [name, setName] = useState('lj');
  const inputRef = useRef(null); // 每次渲染时都返回同一个ref对象
  const instanceRef = useRef(null); // current属性可变且科容纳任意值的通用容器，类似于实例的属性
  const countRef = useRef();
  const [height, setHeight] = useState(0);
  const [myHeght, setMyHeight] = useState(0);
  const [on, toggle] = useMyToggle(true);
  const scrollRef = useRef(null);
  const myScrollRef = useRef(null);
  const { x, y } = useScroll(scrollRef);
  const { x: myX, y: myY } = useScroll(myScrollRef);
  const s1 = useCss({
    color: '#f00'
  });
  const ms1 = useMyCss({
    color: '#f00'
  });
  const { width, height: winHeight } = useWindowSize();
  useUpdateEffect(function() {
    console.log('这里是测试update Effect');
  }, []);
  const { width: myWidth, height: myyHeght } = useMyWindowSize();

  useLayoutEffect(() => {
    console.log('------------------\n');
    console.log('useLayoutEffect');
  });
  const cbRef = useRef(null);
  const c1 = memoCreateC();
  const c2 = memoCreateC();
  useEffectOnce(() => {
    console.log('-------mount');
    return () => {
      console.log('-------unmount');
    };
  });
  useLogger('useLogger', count);
  useMyLogger('useMyLogger', count);
  const myCb = userMyCallback(() => {
    console.log('我是自定义callback');
  }, []);
  let open = false;
  const stateRef = useRef();
  function changeCount() {
    setCount(count + 1);
  }

  const thePromise = useMyPromise();
  thePromise.then(res => {
    console.log('这里是页面挂载之后执行');
  });
  useLifecycles(
    () => {
      console.log('组件挂载周期componentDidMount');
    },
    () => {
      console.log('组件挂载周期componentWillUnmount');
    }
  );

  const [eventName, setEventName] = useState(() => event1);
  useMyEvent('keydown', eventName);
  const memorizedSum = useMemo(() => {
    // 是在渲染期间做的事情，不要在里面做渲染期间不会做的事情，比如副作用都是在useEffect中完成
    console.log('计算a+b');
    return a + b;
  }, [a, b]);
  // 相当于componentDidUpdate componentDidMount，每次渲染后会执行副作用函数，包括第一次渲染时，渲染后执行的操作
  useEffect(() => {
    function consoleCount() {
      console.log('测试依赖列表中不加入依赖---', count);
    }
    consoleCount();
    // 通过ref来记录之前的值
    // stateRef.current = count;
  }, []);
  useEffect(() => {
    console.log('name change');
  }, [name]);
  useEffect(() => {
    console.log('只会在挂载和卸载时执行1---', count);
    return () => {
      // 这里面的count和name都是初始值，因为不依赖任何props和state
      console.log('只会在挂载和卸载时执行2', count, name);
    };
  }, []);
  const memorizedCb = useCallback(value => {
    console.log('callback调用', value);
  }, []);
  useDebugValue(count === 1 ? '武理小杰' : '333');
  function changeName() {
    setName(`${Math.random()}`);
  }
  function changeOpen() {
    open = !open;
  }

  function focusInput() {
    inputRef.current.focus();
  }
  function instanceHandle() {
    const { current } = instanceRef;
    current.consoleName(Math.random());
  }
  function showCount() {
    setTimeout(() => {
      console.log('showCount', stateRef.current);
    }, 2000);
  }
  const measureRef = useCallback(node => {
    if (node) {
      console.log('执行高度技术');
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  function valueChange(e) {
    setMyHeight(e.target.value);
  }
  function changeEventName() {
    setEventName(pre => {
      return event2;
    });
  }
  // 测试
  useEffect(() => {
    console.log('----测试是不是每次都会执行-----');
  }, []);

  const memorizedComp = useMemo(() => <Comp count={count} ref={instanceRef}></Comp>, [count]);
  const isMounted = useMyMountedState();
  if (isMounted()) {
    console.log('挂载');
  } else {
    console.log('未挂载');
  }
  // vue通过收集依赖来重新渲染，react只要props或者state改变就会触发render，不管页面中是否真的用到来该prop或者state
  return (
    <div>
      <h1>hooks扩展>&amp;"{myHeght}</h1>
      <div className={s1}>{on ? '开' : '关'}</div>
      <div className={ms1}>result={c1}</div>
      <div>result={c2}</div>
      <p className="res">
        count数量新值{count}，旧值{stateRef.current}
      </p>
      <div className="" ref={measureRef} style={{ height: `${myHeght}px` }}>
        我是测试高度{height}
      </div>

      <input type="text" ref={inputRef} placeholder="测试useRef" onChange={valueChange} />
      <div onClick={changeCount} className="countBtn">
        改变count
      </div>
      <div>
        浏览器窗口大小{width}
        {winHeight}
      </div>
      <div>
        浏览器窗口大小{myWidth}
        {myyHeght}
      </div>
      <div ref={scrollRef} className={Styles['scroll-box']}>
        <div>x:{x}</div>
        <div>y:{y}</div>
        <div className={Styles['pass']}>
          <div>x:{x}</div>
          <div>y:{y}</div>
        </div>
      </div>
      <div ref={myScrollRef} className={Styles['scroll-box']}>
        <div>x:{myX}</div>
        <div>y:{myY}</div>
        <div className={Styles['pass']}>
          <div>x:{myX}</div>
          <div>y:{myY}</div>
        </div>
      </div>
      <div onClick={showCount}>显示count</div>
      <div onClick={changeEventName}>changeEventName</div>
      <div onClick={toggle}>toggle触发</div>
      <div onClick={changeName}>改变name</div>
      <div onClick={changeOpen}>改变open</div>
      <div onClick={focusInput}>聚焦input</div>
      <div onClick={myCb}>调用myCb</div>
      <div onClick={instanceHandle}>子组件ref测试</div>
      <div onClick={memorizedCb.bind(null, 1222)}>memorizedCb</div>
      <div onClick={() => setA(10)}>memorizedSum</div>
      {/* {memorizedComp} */}
      {list.map((item, index) => {
        return <p key={index}>{item.label}</p>;
      })}
    </div>
  );
});
