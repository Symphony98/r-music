import React, { Fragment } from "react"
import { Tabs, WhiteSpace } from 'antd-mobile';

import RecMusic from "./../../pages/RecMusic"
import HotSearch from "./../../pages/HotSearch"
import Search from "./../../pages/Search"

import { Route, withRouter, Switch } from "react-router-dom"

import "./index.css"
import Music from "../../pages/RecMusic/music"
import Gedan from "../../pages/RecMusic/gedan"
import Singer from "./../../pages/HotSearch/singer"

const tabs = [
  { title: '推荐音乐' },
  { title: '热歌榜' },
  { title: '搜索' },
];

const TabMain = () => (
  // 这里的Fragment之前都是div，原因是使用了Swit之后，内部不能使用div
  <Switch>
    <Route path="/music" component={Music} />
    <Route path="/gedan" component={Gedan} />
    <Route path="/singer" component={Singer} />
    <Fragment>
      <WhiteSpace />
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} tabBarUnderlineStyle={{ border: "none" }} >
        <Fragment >
          {/* <RecMusic /> */}
          <Route path='/' component={RecMusic} />
        </Fragment>
        <Fragment>
          {/* <HotSearch /> */}
          <Route path='/' component={HotSearch} />
        </Fragment>
        <Fragment>
          {/* <Search /> */}
          <Route path='/' component={Search} />
        </Fragment>
      </Tabs>
      <WhiteSpace />
    </Fragment>
  </Switch>
);

export default withRouter(TabMain)