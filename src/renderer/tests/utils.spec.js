// import { preloadImg } from '../utils/index.js';
import { preloadImg } from '@/renderer/utils/index.js';

describe('测试渲染进程函数', () => {
  it('图片预加载单个', () => {
    const res = preloadImg('http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110721.jpg', {});
    expect(res).toEqual(['http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110721.jpg']);
  });
  it('图片预加载单个数组', () => {
    const res = preloadImg(['http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110722.jpg'], {});
    expect(res).toEqual(['http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110722.jpg']);
  });
  it('图片预加载多个数组', () => {
    const res = preloadImg(['http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110723.jpg', 'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110724.jpg'], {
      addPath: '?addPath'
    });
    expect(res).toEqual(['http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110723.jpg', 'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110724.jpg']);
  });
  it('图片预加载多个数组', () => {
    const res = preloadImg(
      [{ key: 'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110727.jpg' }, { key: 'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110728.jpg' }],
      {
        addPath: '?addPath',
        key: 'key'
      }
    );
    expect(res).toEqual([
      'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110727.jpg?addPath',
      'http://p1.music.126.net/F7sOIipVqrPNMliaculFuw==/109951164488110728.jpg?addPath'
    ]);
  });
});
