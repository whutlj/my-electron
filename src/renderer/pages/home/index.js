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
      console.log('master超前一');
      console.log('master超前二');
      console.log('第二');
      console.log('第三');
    };
  }, [count]);

  useEffect(() => {
    console.log('第二个副作用');
    console.log('第二次修改');
  }, [name]);
  function changeName() {
    setName(`${Math.random()}`);
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
