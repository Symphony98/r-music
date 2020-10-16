import React, { Component } from "react"
import qs from "query-string"

import { getMusicUrl } from "@/Api"

class Music extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            detail: [],
            lrc: ""
        }
    }

    async componentDidMount() {
        let { id } = qs.parse(this.props.location.search)

        let detail = JSON.parse(localStorage.getItem("music-detail"))

        this.setState({
            id,
            detail
        })

        await getMusicUrl(id)
            .then(res => {
                // console.log(res)
                this.setState({
                    lrc: res.lrc.lyric
                })
            })
    }

    componentWillUnmount(){
        // 删除localStorage的数据
        localStorage.removeItem("music-detail")
    }

    render() {
        let { id, detail, lrc } = this.state
        let str = lrc.split("[")
        let str2 = str.join(" ").split("]")
        let lrcs = str2.map((item,index)=>{
            return (
                <p key={index}>{item}</p>
            )
        })
        // console.log(str2);
        return (
            <div>
                <h1>{detail.name}</h1>
                <audio src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`} controls="control" />
                <h3>{lrcs}</h3>
            </div>
        )
    }
}

export default Music