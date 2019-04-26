import React from 'react'
import Story from './Story'
import ProgressArray from './ProgressArray'
import PropTypes from 'prop-types'
import style from './../styles.css'
import up from './../up.png'
import mutedPng from './../muted.png'
import unmutedPng from './../unmuted.png'
import playPng from './../play.png'
import pausePng from './../pause.png'

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGroupId: this.props.startingGroupIndex ? this.props.startingGroupIndex : 0,
      currentStoryId: this.props.startingStoryIndex ? this.props.startingStoryIndex : 0,
      pause: true,
      count: 0,
      muted: true
    }
    this.defaultInterval = 4000
    this.width = props.width || 360
    this.height = props.height || 640
  }

  componentDidMount() {
    this.props.defaultInterval && (this.defaultInterval = this.props.defaultInterval)
    window.addEventListener("focus", this.onWindowFocus)
    window.addEventListener("blur", this.onWindowBlur)

    if (this.props.onGroupChange) {
      this.props.onGroupChange(this.props.stories[this.state.currentGroupId].user)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.onWindowFocus)
    window.removeEventListener("blur", this.onWindowBlur)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.doPause && !this.props.doPause) { //pause
      this.mustPause();
    } else if (!nextProps.doPause && this.props.doPause) { //play
      this.mustPlay();
    }
  }

  onWindowBlur = () => {
    //pause
    if (!this.state.pause) {
      this.mousedownId = setTimeout(() => {
        this.pause('pause')
      }, 0)
    }
  }

  onWindowFocus = () => {
    if (this.props.doPause) {
      return;
    }

    //play
    if (this.state.pause) {
      this.mousedownId && clearTimeout(this.mousedownId)
      this.pause('play')
    }
  }

  wait = (time) => {
    return new Promise(resolve => {
      this.setState({count: 0})
      let id = setInterval(() => {
        if (this.state.count < time) {
          if (!this.state.pause) {
            this.setState({ count: this.state.count + 1 })
          }
        } else {
          clearInterval(id)
          resolve()
        }
      }, 1)
    })
  }

  pause = (action, bufferAction) => {
    this.setState({ pause: action === 'pause', bufferAction })
  }

  previous = () => {
    if (this.state.currentStoryId > 0) {
      this.setState({
        currentStoryId: this.state.currentStoryId - 1,
        count: 0
      })
    } else if (this.state.currentGroupId > 0) {
      const newGroupId = this.state.currentGroupId - 1;
      const stories = this.props.stories[newGroupId].stories;
      this.setState({
        currentGroupId: newGroupId,
        currentStoryId: stories.length - 1,
        count: 0
      })
      if (this.props.onGroupChange) {
        this.props.onGroupChange(this.props.stories[newGroupId].user)
      }
    }
  }

  next = () => {
    const stories = this.props.stories[this.state.currentGroupId].stories;

    if (this.state.currentStoryId < stories.length - 1) {
      this.setState({
        currentStoryId: this.state.currentStoryId + 1,
        count: 0
      })
    } else if (this.state.currentGroupId < this.props.stories.length - 1) {
      const newGroupId = this.state.currentGroupId + 1
      this.setState({
        currentGroupId: newGroupId,
        currentStoryId: 0,
        count: 0
      })
      if (this.props.onGroupChange) {
        this.props.onGroupChange(this.props.stories[newGroupId].user)
      }
    } else if (this.props.onEnd) {
      this.props.onEnd();
    }
  }

  debouncePause = (e) => {
    e.preventDefault()
    if (this.props.doPause) {
      return
    }
    this.mousedownId = setTimeout(() => {
      this.pause('pause')
    }, 200)
  }

  mouseUp = (e, type) => {
    e.preventDefault()
    if (this.props.doPause) {
      return
    }
    this.mousedownId && clearTimeout(this.mousedownId)
    if (this.state.pause) {
      this.pause('play')
    } else {
      type === 'next' ? this.next() : this.previous()
    }
  }

  getVideoDuration = duration => {
    this.setState({ videoDuration: duration })
  }

  togglePlayPause = () => {
    if (this.state.pause) {
      this.mousedownId && clearTimeout(this.mousedownId)
      this.pause('play')
    } else if (!this.state.pause) {
      this.mousedownId = setTimeout(() => {
        this.pause('pause')
      }, 200)
    }
  }

  mustPause = () => {
    if (!this.state.pause) {
      this.mousedownId = setTimeout(() => {
        this.pause('pause')
      }, 200)
    }
  }

  mustPlay = () => {
    if (this.state.pause) {
      this.mousedownId && clearTimeout(this.mousedownId)
      this.pause('play')
    }
  }

  toggleMuteUnmute = () => {
    this.setState({
      muted: !this.state.muted
    })
  }

  render() {
    const stories = this.props.stories[this.state.currentGroupId].stories;

    let playPauseBtnSrc = pausePng;
    if (this.state.pause) {
      playPauseBtnSrc = playPng;
    }

    let muteUnmuteBtnSrc = unmutedPng;
    if (this.state.muted) {
      muteUnmuteBtnSrc = mutedPng;
    }

    return (
      <div style={{...styles.container, ...{width: this.width, height: this.height}}}>
        <ProgressArray
          next={this.next}
          pause={this.state.pause}
          bufferAction={this.state.bufferAction}
          videoDuration={this.state.videoDuration}
          length={stories.map((s, i) => i)}
          defaultInterval={this.defaultInterval}
          currentStory={stories[this.state.currentStoryId]}
          progress={{id: this.state.currentStoryId, completed: this.state.count / ((stories[this.state.currentStoryId] && stories[this.state.currentStoryId].duration) || this.defaultInterval)}}
        />
        <Story
          action={this.pause}
          bufferAction={this.state.bufferAction}
          height={this.height}
          playState={this.state.pause}
          mutedState={this.state.muted}
          width={this.width}
          story={stories[this.state.currentStoryId]}
          loader={this.props.loader}
          getVideoDuration={this.getVideoDuration}
          onStoryView={this.props.onStoryView}
          onStoryRender={this.props.onStoryRender}
        />
        <div style={styles.overlay}>
          <div style={{width: this.width / 2, zIndex: 999}} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseUp(e, 'previous')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseUp(e, 'previous')} />
          <div style={{width: this.width / 2, zIndex: 999}} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseUp(e, 'next')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseUp(e, 'next')} />
        </div>
        {this.props.showNextPrevButtons &&
          <span className={style.nextBtn} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseUp(e, 'next')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseUp(e, 'next')}><img src={up} /></span>
        }
        {this.props.showNextPrevButtons &&
          <span className={style.prevBtn} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseUp(e, 'previous')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseUp(e, 'previous')}><img src={up} /></span>
        }
        {!this.props.doPause &&
          <span className={style.playPauseBtn} onClick={this.togglePlayPause}><img src={playPauseBtnSrc} /></span>
        }
        {!this.props.doPause &&
          <span className={style.muteUnmuteBtn} onClick={this.toggleMuteUnmute}><img src={muteUnmuteBtnSrc} /></span>
        }
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: '#111',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    height: 'inherit',
    width: 'inherit',
    display: 'flex',
    top: '70px'
  },
  left: {
  },
  right: {
  }
}

Container.propTypes = {
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
