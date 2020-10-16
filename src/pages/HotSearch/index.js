import React, { Component, Fragment } from "react"
import "./index.css"
import { getHotMusic } from "@/Api"
class HotSearch extends Component {
    constructor() {
        super()
        this.state = {
            arr: [],
            oldarr: []
        }
    }

    async componentDidMount() {
        await getHotMusic()
            .then(res => {
                this.setState({
                    oldarr: res.data,
                })
            })
        let { oldarr } = this.state
        let num1 = 0
        let num2 = 10
        let arrs = oldarr.splice(num1, num2)
        this.setState({
            arr: arrs,
            oldarr
        })
    }

    getMore() {
        let { arr, oldarr } = this.state
        if (!oldarr) return
        let num1 = 0
        let num2 = 10
        let arrs = oldarr.splice(num1, num2)
        this.setState({
            arr: [...arr, ...arrs]
        })
    }

    toMusic(item) {
        localStorage.setItem("music-detail", JSON.stringify(item))
        this.props.history.push(`/music?id=${item.id}`)
    }

    render() {
        let { arr } = this.state
        // console.log(arr);
        let divs = arr.map((item, index) => {
            return (
                <div key={item.id} className="hot_content_list">
                    <span>{index + 1}</span>
                    <span>{item.album.name}</span>
                    <button onClick={this.toMusic.bind(this, item)}>点击播放</button>
                </div>

            )
        })
        return (
            <Fragment>
                <div className="top">
                    <p><i>云音乐</i></p>
                    <p>热歌榜</p>
                    <p>更新时间：10月15日</p>
                </div>
                <div className="hot_content">
                    {divs}
                    <button onClick={this.getMore.bind(this)}>点击加载更多</button>
                </div>
            </Fragment>
        )
    }
}

export default HotSearch