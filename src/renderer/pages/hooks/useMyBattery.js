import { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';

const nav = typeof navigator === 'object' ? navigator : undefined;
const isSupport = nav && typeof nav.getBattery === 'function';

const isSupport = typeof window.navigator.getBattery;
function useBatteryMock() {
  return { isSupport: false };
}

function useBattery() {
  const [state, setState] = useState({ isSupport: true, fetched: false });
  useEffect(() => {
    let battery = null;
    let isMounted = true;
    function handleChange() {
      if (!isMounted || !battery) return;
      const { charging, chargingTime, dischargingTime, level } = battery;
      const newState = {
        isSupport: true,
        fetched: true,
        charging, // 是否正在充电
        chargingTime, // 距离充电完成需要多少时间
        dischargingTime, // 距离用完电要多久
        level // 电量放大等级
      };
      !isEqual(state, newState) && setState(newState);
    }
    // 异步的，所以必须保证没有卸载
    nav.getBattery().then(bat => {
      if (!isMounted) return;
      battery = bat;
      handleChange();
    });
    return () => {
      isMounted = false;
    };
  });
  return state;
}

export default isSupport ? useBattery : useBatteryMock;
