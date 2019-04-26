import React, { Component } from 'react'
import Container from './components/Container'
import PropTypes from 'prop-types'

export default class ReactInstaStories extends Component {
  componentDidMount() {
    this.props.stories.map(g => {
      g.stories.map(s => {
        let i = new Image()
        if (s.type === 'image') {
          i.src = s.url
        }
      })
    })
  }

  render() {
    return (
      <div>
        <Container {...this.props}/>
      </div>
    )
  }
}

ReactInstaStories.propTypes = {
  stories: PropTypes.array,
  defaultInterval: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  loader: PropTypes.element,
  showNextPrevButtons: PropTypes.bool,
  onGroupChange: PropTypes.func,
  onEnd: PropTypes.func,
  startingGroupIndex: PropTypes.number,
  startingStoryIndex: PropTypes.number,
  doPause: PropTypes.bool,
  onStoryView: PropTypes.func,
  onStoryRender: PropTypes.func
}
