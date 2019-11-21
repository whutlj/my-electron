import { get } from '@api/fetch';

export async function fetchMusic(id) {
  try {
    const { data = [] } = await get('/song/url', { id });
    if (data.length > 0) {
      const { id, url } = data[0];
      return {
        id,
        url
      };
    }
    return '';
  } catch (error) {
    console.error('获取音乐url失败', error);
  }
}
export async function fetchMusicDetail(musicIds) {
  try {
    if (!musicIds) return;
    let ids = '';
    if (Array.isArray(musicIds)) {
      ids = musicIds.join(',');
    } else {
      ids = musicIds;
    }
    const { songs = [] } = await get('/song/detail', { ids });
    if (songs.length === 1) {
      const {
        name,
        al: { name: albumName, picUrl: albumPicUrl },
        ar
      } = songs[0];
      const artistName = ar
        .map(artist => {
          return artist.name;
        })
        .join('/');
      return {
        name,
        albumName,
        albumPicUrl,
        artistName
      };
    }
    return '';
  } catch (error) {
    console.error('获取音乐url失败', error);
  }
}
