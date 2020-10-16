//推荐歌单
export const getTuiJian = () => {
    return fetch("http://chst.vip:666/personalized?limit=6")
        .then(body => body.json())
}
// 推荐新音乐(根据语种)
export const getSongBySinger = () => {
    return fetch("http://chst.vip:666/top/song?type=96")
        .then(body => body.json())
}
// 获取新歌速递
export const getNewSong = () => {
    return fetch("http://chst.vip:666/personalized/newsong")
        .then(body => body.json())
}

//获取歌单详细信息
export const getGeDan = (id) => {
    return fetch("http://chst.vip:666/playlist/detail?id=" + id)
        .then(body => body.json())
}

//获取专辑内容
export const getZhuanJi = () => {
    return fetch("http://chst.vip:666/album/newest")
        .then(body => body.json())
}

//获取歌曲详情
export const getSongDetail = (id) => {
    return fetch("http://chst.vip:666/song/detail?ids=" + id)
        .then(body => body.json())
}

//获取歌词
export const getMusicUrl = (id) => {
    return fetch("http://chst.vip:666/lyric?id=" + id)
        .then(body => body.json())
}

// 搜索
// limit  展示数量
// offset 当前页码
export const getSearch = (val, count) => {
    return fetch(`http://chst.vip:666/search?keywords=${val}&limit=10&offset=${count}`)
        .then(body => body.json())
}

//热歌榜推荐新音乐
export const getHotMusic = () => {
    return fetch(`http://chst.vip:666/top/song?type=96`)
        .then(body => body.json())
}