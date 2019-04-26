import React from 'react'
import PropTypes from 'prop-types'
import style from './../styles.css'

export default class Progress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      duration: this.props.defaultInterval
    }
  }

  componentDidMount() {
    if (this.inner) {
      this.inner.addEventListener('webkitAnimationEnd', this.next, false)
      this.inner.addEventListener('animationend', this.next, false)
      this.inner.addEventListener('oanimationend', this.next, false)
    }
  }

  static getDerivedStateFromProps(props, state) {
    let current = props.currentStory;
    let newState = {duration: props.defaultInterval};

    if (typeof current === 'object') {
      if (current.type && current.type === 'video' && props.videoDuration) {
        newState.duration = props.videoDuration * 1000;
      } else if (current.duration) {
        newState.duration = current.duration
      }
    }

    return newState;
  }

  next = () => {
    this.props.next()
  }

  render() {
    let innerStyle
    switch (this.props.active) {
      case 2:
        innerStyle = { width: '100%' }
        break
      case 1:
        innerStyle = { animation: `${this.state.duration}ms linear 0ms ${style.slidein}`, animationPlayState: this.props.pause ? 'paused' : 'running' }
        break
      case 0:
        innerStyle = { width: 0 }
        break
      default:
        innerStyle = { width: 0 }
        break
    }
    return (
      <div className={style.autoHide} style={{...styles.progress, ...{width: `${this.props.width * 100}%`, opacity: 1}}}>
        <div ref={r => { this.inner = r }} className={style.inner} style={innerStyle} /* style={{...styles.overlay, width: `${this.props.completed * 100}%`}} */ />
      </div>
    )
  }
}

const styles = {
  progress: {
    height: 2,
    maxWidth: '100%',
    background: '#555',
    margin: 2
  }
}

Progress.propTypes = {
  width: PropTypes.number,
  defaultInterval: PropTypes.number,
  pause: PropTypes.bool,
  next: PropTypes.func,
  active: PropTypes.number,
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  videoDuration: PropTypes.number,
  bufferAction: PropTypes.bool,
  currentGroupId: PropTypes.number
}
