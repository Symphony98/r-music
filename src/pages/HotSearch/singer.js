/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from "react"
import { ListView, PullToRefresh } from 'antd-mobile';
import { getSongBySinger } from "@/Api"

//这是个容器 包裹了listView
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    //定义数据源 ListView diff算法
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      refreshing: true,//如果为true 那么会触发刷新动画
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight,//设置listView的高度
    };
  }

  getList() {
    //请求服务器参数 将获取到的新数据(数组类型) 传入到dataSource.cloneWithRows()
    getSongBySinger()
      .then(res => {
        console.log(res);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data),
          isLoading: false,
          refreshing: false
        })
      })
  }

  //页面加载的时候 将数据传入dataSource
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.getList()
  }
  onEndReached = (event) => {
    this.setState({
      isLoading: false
    })
  }
  //下拉刷新的事件处理函数
  onRefresh() {
    this.getList()
  }
  render() {
    // console.log(this.state.isLoading);

    const row = (rowData, sectionID, rowID) => {
      //rowData就是数据源里面的每一项{}
      let spans = rowData.artists.map((item, index) => {
        // console.log(index);
        return (
          <span key={index}>
            {/* 如果当前歌曲有二个歌手，那么就 添加一个 & 符号 */}
            {index > 0 ? " & " : ""}
            {item.name}
          </span>
        )
      })
      return (
        //每一行内容的结构 可以根据自己的需求更改样式 
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#FF6E27',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
              marginTop: "20px",
              paddingLeft: "8px",
              backgroundColor: "rgba(97, 146, 202,.5)"
            }}
          >歌名：{rowData.name}</div>
          <div style={{
            display: '-webkit-box',
            display: 'flex',
            padding: '15px 0 15px 8px',
            backgroundColor: "rgba(97, 146, 202,.5)"
          }}>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.description}</div>
              <div><span style={{ fontSize: '14px', color: '#000' }}>歌手：</span>{spans}</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        initialListSize={5} //初始渲染几个 必须保证占满元素的高度
        ref={el => this.lv = el}
        dataSource={this.state.dataSource} //数据源
        renderHeader={() => <span>欧美热门歌曲</span>}//顶部渲染的结构
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '正在加载...' : '加载完毕'}
        </div>)}//底部渲染的结构
        renderBodyComponent={() => <MyBody />}
        renderRow={row} //渲染listView里面的每一行的结构
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={1}
        onScroll={() => { console.log('scroll'); }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}//只要refreshing属性值为true那么就会有刷新动画
          onRefresh={this.onRefresh.bind(this)}//下拉的时候触发的事件
        />}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached} //数据全部渲染完毕之后触发的方法
        onEndReachedThreshold={10}
      />
    );
  }
}

export default Demo
