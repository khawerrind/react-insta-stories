import React, { Component } from 'react'

import Stories from 'react-insta-stories'
import SeeMore from './SeeMoreForm'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doPause: false
    }
  }

  onGroupChange = (user) => {
    console.log("GROUP CHANGE NEW GROUP ID = ", user)
  }
  onEnd = () => {
    console.log("ALL END")
  }

  handleTogglePlayPause = () => {
    this.setState({
      doPause: !this.state.doPause
    })
  }

  onStoryView = (story) => {
    console.log("viewed", story)
  }
  onStoryRender = (story) => {
    console.log("rendered", story)
  }
  handleOnGroupRender = (user) => {
    console.log("handleOnGroupRender", user)
  }
  render () {
    return (
      <div className="App">
        <div className="stories">
          <Stories
            stories={stories}
            defaultDuration={1200}
            showNextPrevButtons={true}
            onGroupChange={this.onGroupChange}
            onEnd={this.onEnd}
            startingGroupIndex={0}
            startingStoryIndex={0}
            doPause={this.state.doPause}
            onStoryView={this.onStoryView}
            onStoryRender={this.onStoryRender}
            onGroupRender={this.handleOnGroupRender}
          />
        </div>
        <button onClick={this.handleTogglePlayPause}>Toggle play pause</button>
      </div>
    )
  }
}

//const stories = [{ url: 'https://picsum.photos/1080/1920', seeMore: <SeeMore />, header: { heading: 'Mohit Karekar', subheading: 'Posted 5h ago', profileImage: 'https://picsum.photos/1000/1000' } }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN', header: { heading: 'Mohit Karekar', subheading: 'Posted 32m ago', profileImage: 'https://picsum.photos/1080/1920' } }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg', header: { heading: 'mohitk05/react-insta-stories', subheading: 'Posted 32m ago', profileImage: 'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4' } }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video', seeMore: <SeeMore /> }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video' }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80', 'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1499202189329-5d76e29aa2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1482&q=80']

const stories = JSON.parse('[{"group_id":"5a86f706ed30b9234fcf61e0","stories":[{"id":"5ca6391e0cb59b3bc18cdff2","url":"https://res.cloudinary.com/css-tricks/image/upload/v1554322762/woo_scz9a9.png","type":"image","caption":"ok","backgroundColor":"#c69ecc","viewed":false,"createdAt":"2019-04-04T22:04:30.378+05:00"}, {"id":"5ca6391e0cb59b3bc18cdff2","url":"https://img.glyphs.co/img?src=aHR0cHM6Ly9zMy5tZWRpYWxvb3QuY29tL3Jlc291cmNlcy9Db21pbmdfU29vbl9UZW1wbGF0ZV9QcmV2aWV3MS5qcGc&q=90&enlarge=true&h=1036&w=1600","type":"image","caption":"ok","backgroundColor":"#c69ecc","viewed":false,"createdAt":"2019-04-04T22:04:30.378+05:00"}],"user":{"id":"5a86f706ed30b9234fcf61e0","full_name":"Khawer Zeshan","username":"khawer","color":"#c55e21","avatar":{"small":"//s3.amazonaws.com/plunk-development-uploads/users/5a86f706ed30b9234fcf61e0/5c64336f957b0b6cc130c257.png","large":"//s3.amazonaws.com/plunk-development-uploads/users/5a86f706ed30b9234fcf61e0/5c64336f957b0b6cc130c257_large.jpg","small_key":"users/5a86f706ed30b9234fcf61e0/5c64336f957b0b6cc130c257.png","large_key":"users/5a86f706ed30b9234fcf61e0/5c64336f957b0b6cc130c257_large.jpg"},"cover":{"small":"//s3.amazonaws.com/plunk-development-uploads/users/5a86f706ed30b9234fcf61e0/5bd74eda957b0b17db03495f.png","large":"//s3.amazonaws.com/plunk-development-uploads/users/5a86f706ed30b9234fcf61e0/5bd74eda957b0b17db03495f_large.jpg","small_key":"","large_key":""},"picture":"//s3.amazonaws.com/plunk-development-uploads/users/5a86f706ed30b9234fcf61e0/5c64336f957b0b6cc130c257.png","reaction_type":"","custom_status":"Feeling bored"}}]')

console.log(stories)


