import React from "react"
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';

import { getSearch } from "@/Api"
import "./index.css"

class SearchCom extends React.Component {
    state = {
        value: '海阔天空',
        arr: [],
        count: 0
    };
    async componentDidMount() {
        let { value, count } = this.state
        await getSearch(value, count)
            .then(res => {
                // console.log(res)
                this.setState({
                    arr: res.result.songs
                })
            })
    }
    onChange = (value) => {
        // console.log(value);
        this.setState({ value });
        if (value === "") {
            this.setState({
                arr: [],
                count: 0
            })
        }
    };
    clear = () => {
        this.setState({
            value: '',
            arr: [],
            count: 0
        });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    }

    async onSubmit(value) {
        let { count } = this.state
        if (value === "") return
        await getSearch(value, count)
            .then(res => {
                console.log(res)
                this.setState({
                    arr: res.result.songs
                })
            })
    }

    getMoreSearch() {
        let { value, count, arr } = this.state
        if (!value) {
            alert("请输入数据")
            return
        }
        count = count + 10
        console.log(count);
        getSearch(value, count)
            .then(res => {
                this.setState({
                    count,
                    arr: [...arr, ...res.result.songs]
                })
            })
    }

    render() {
        let { value, arr } = this.state

        let divs = arr.map((item, index) => {
            let athors = item.artists.map((item, index) => {
                return (
                    <span key={index}>{item.name}</span>
                )
            })

            return (
                <div key={index} className="main">
                    <h3 className="main_name">{item.name}</h3>
                    <div className="main_author">
                        {athors}
                        —
                        {item.album.name}
                    </div>
                    <button className="main_btn">点击播放</button>
                </div>
            )
        })
        return (
            <div className="search_main">
                <WingBlank><div className="sub-title">搜索</div></WingBlank>
                <SearchBar
                    value={value}
                    placeholder="点击回车即可搜索"
                    onSubmit={this.onSubmit.bind(this, value)}
                    onBlur={() => console.log('光标移除了')}
                    onCancel={this.clear.bind(this)}
                    maxLength={8}
                    onChange={this.onChange} />
                <WhiteSpace />
                {divs}
                {value ? <button className="btn" onClick={this.getMoreSearch.bind(this)}>点击加载更多</button> : <p>请输入数据后按回车键搜索</p>}
            </div >
        );
    }
}

export default SearchCom