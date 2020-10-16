import React, { Component } from "react"
import qs from "query-string"

import { getGeDan } from "@/Api"

class Gedan extends Component {
    constructor() {
        super()
        this.state = {
            arr: [],
            id: "",
            picUrl: "",
            copywriter: ""
        }
    }

    async componentDidMount() {
        let { id } = qs.parse(this.props.location.search)
        await getGeDan(id)
            .then(res => {
                this.setState({
                    arr: res.playlist.tracks
                })
            })

        let arr = JSON.parse(localStorage.getItem("gedan_detail"))
        this.setState({
            id,
            picUrl: arr.picUrl,
            copywriter: arr.copywriter
        })
    }

    ToMusic(item) {
        localStorage.setItem("music-detail", JSON.stringify(item))
        this.props.history.push(`/music?id=${item.id}`)
    }

    render() {
        let { arr, picUrl, copywriter } = this.state
        let divs = arr.map(item => {
            let authors = item.ar.map(item => {
                return (
                    <span key={item.id}>{item.name}</span>
                )
            })
            return (
                <div key={item.id} className="content">
                    <span>{item.al.name}</span>
                    <br />
                    {authors}
                    <button onClick={this.ToMusic.bind(this, item)}>点击播放</button>
                </div>
            )
        })
        return (
            <div>
                <div className="title">
                    <img src={picUrl} width="120" height="120" alt="歌单图片" />
                    <span>{copywriter}</span>
                </div>
                {divs}

            </div>
        )
    }
}
export default Gedan