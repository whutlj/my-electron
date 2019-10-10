import React, { useEffect, useState } from 'react';

// useEffect是是一个effect Hook，提供给函数操作副作用的能力。具有componentDidUpdate,componentDidMount,componentWillUnmount的用途
function Home() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  // 完成DOM更改后执行副作用函数
  useEffect(() => {
    console.log('useEffect调用');
    return () => {
      console.log('副作用清理');
    };
  }, [count]);

  useEffect(() => {
    console.log('第二个副作用');
    console.log('分支1修改内容');
    console.log('分支2测试rebase');

    console.log('11111')
    console.log('分支1测试rebase');
  }, [name]);
  function changeName() {
    console.log('feature2修改home index');
    setName(`${Math.random()}`);
    console.log('分支1测试rebase');
  }
  return (
    <div>
      首页
      <div>{count}次数</div>
      <div className="btn" onClick={() => setCount(count + 1)}>
        添加次数
      </div>
      <div className="" onClick={changeName}>
        改变名字
      </div>
    </div>
  );
}
export default Home;
