import React, { Component, Fragment } from "react"
import "./index.css"

import { getNewSong, getTuiJian } from "@/Api"
// import { Link, NavLink } from "react-router-dom";

class RecMusic extends Component {
  constructor() {
    super()
    this.state = {
      arr: [],
      newSong: [],
      mp3Url: ""
    }
  }

  async componentDidMount() {
    await getTuiJian()
      .then(res => {
        this.setState({
          arr: res.result
        })
      })

    await getNewSong()
      .then(res => {
        this.setState({
          newSong: res.result,
        })
      })
  }

  palyMp3(item) {
    localStorage.setItem("music-detail", JSON.stringify(item))
    this.props.history.push(`/music?id=${item.id}`)
  }

  ToGedan(item) {
    localStorage.setItem("gedan_detail", JSON.stringify(item))
    this.props.history.push(`/gedan?id=${item.id}`)
  }

  render() {
    let { newSong, arr } = this.state
    let divs = newSong.map(item => {
      return (
        <div className="music_detail" key={item.song.album.id}>
          <h3>{item.song.album.name}</h3>
          <button onClick={this.palyMp3.bind(this, item)}>点击播放</button>
          {/* <NavLink to={{ pathname: "/music", params: { msg: item } }}>点击播放</NavLink> */}
        </div>
      )
    })

    let divs1 = arr.map(item => {
      return (
        <div key={item.id} className="tuijian_detail" onClick={this.ToGedan.bind(this, item)}>
          <img src={item.picUrl} alt="" />
          <span>{item.name}</span>
        </div>
      )
    })

    return (
      <Fragment>
        <div className="tuijian">
          <h1>推荐歌单</h1>
          {divs1}
        </div>
        <div className="music">
          <h1>大家都在听</h1>
          {divs}
        </div>
      </Fragment>

    )
  }
}

export default RecMusic