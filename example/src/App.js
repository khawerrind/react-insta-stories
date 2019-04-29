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

  onFocusInput = () => {
    this.setState({
      doPause: true
    })
  }

  onBlurInput = () => {
    this.setState({
      doPause: false
    })
  }
  render () {
    const stories = [
      {
        "group_id":"5a86f706ed30b9234fcf61e0",
        "stories":[
          {
            "id":"5ca6391e0cb59b3bc18cdff1",
            "url":"https://img.glyphs.co/img?src=aHR0cHM6Ly9zMy5tZWRpYWxvb3QuY29tL3Jlc291cmNlcy9Db21pbmdfU29vbl9UZW1wbGF0ZV9QcmV2aWV3MS5qcGc&q=90&enlarge=true&h=1036&w=1600",
            "type":"image",
            "caption":"ok",
            "backgroundColor":"#c69ecc",
            "viewed":false,
            "createdAt":"2019-04-04T22:04:30.378+05:00"
          },
          {
            "id":"5ca6391e0cb59b3bc18cdff2",
            "url":"https://img.glyphs.co/img?src=aHR0cHM6Ly9zMy5tZWRpYWxvb3QuY29tL3Jlc291cmNlcy9Db21pbmdfU29vbl9UZW1wbGF0ZV9QcmV2aWV3MS5qcGc&q=90&enlarge=true&h=1036&w=1600",
            "type":"image",
            "caption":"ok",
            "backgroundColor":"#c69ecc",
            "viewed":false,
            "createdAt":"2019-04-04T22:04:30.378+05:00"
          }
        ],
        "user":{}
      },
      {
        "group_id":"5a86f706ed30b9234fcf61e1",
        "stories":[
          {
            "seeMore":<SeeMore onFocus={this.onFocusInput} onBlur={this.onBlurInput} />,
            "id":"5ca6391e0cb59b3bc18cdff3",
            "url":"https://res.cloudinary.com/css-tricks/image/upload/v1554322762/woo_scz9a9.png",
            "type":"image",
            "caption":"ok",
            "backgroundColor":"#c69ecc",
            "viewed":false,
            "createdAt":"2019-04-04T22:04:30.378+05:00"
          },
          {
            "seeMore":<SeeMore onFocus={this.onFocusInput} onBlur={this.onBlurInput} />,
            "id":"5ca6391e0cb59b3bc18cdff4",
            "url":"https://res.cloudinary.com/css-tricks/image/upload/v1554322762/woo_scz9a9.png",
            "type":"image",
            "caption":"ok",
            "backgroundColor":"#c69ecc",
            "viewed":false,
            "createdAt":"2019-04-04T22:04:30.378+05:00"
          }
        ],
        "user":{}
      }
    ];

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


