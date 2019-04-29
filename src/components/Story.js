import React from 'react'
import PropTypes from 'prop-types'
import globalStyle from './../styles.css'

export default class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    if (this.props.onStoryRender) {
      this.props.onStoryRender(this.props.story);
    }
    if (this.props.story.type === 'text') {
      this.imageLoaded()
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.story !== prevProps.story) {
      if (this.props.story.id !== prevProps.story.id && this.props.onStoryRender) {
        this.props.onStoryRender(this.props.story);
      }
      if (this.props.story.type === 'text') {
        this.imageLoaded()
      } else if (this.props.story.type === 'image') {
        let objImg = new Image();
        objImg.src = this.props.story.url;
        if (!objImg.complete) {
          this.pauseId && clearTimeout(this.pauseId)
          this.pauseId = setTimeout(() => {
            this.setState({loaded: false})
          }, 0)
          this.props.action('pause', true)
        }
      }
      this.vid && this.vid.addEventListener('waiting', () => {
        this.props.action('pause', true)
      })
      this.vid && this.vid.addEventListener('playing', () => {
        this.props.action('play', true)
      })
    }
    if (this.vid && (this.props.playState !== prevProps.playState) && !this.props.bufferAction) {
      if (this.props.playState) {
        this.vid.pause()
      } else {
        this.vid.play().catch(e => console.log(e))
      }
    }
  }
  imageLoaded = () => {
    try {
      if (this.pauseId) clearTimeout(this.pauseId)
      this.setState({loaded: true})
      this.props.action('play', true)
      if (this.props.onStoryView) {
        this.props.onStoryView(this.props.story)
      }
    } catch (e) {
      console.log(e)
    }
  }
  videoLoaded = () => {
    try {
      this.props.getVideoDuration(this.vid.duration)
      this.vid && this.vid.play().then(() => {
        this.imageLoaded()
      }).catch(e => {
        this.props.action('pause')
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    let source = this.props.story.url
    let type = this.props.story.type
    return (
      <div style={{...styles.story, width: this.props.width, height: this.props.height}}>
        {type === 'image' &&
          <img
            style={styles.storyContent}
            src={source}
            onLoad={this.imageLoaded}
            key={`story_image_${this.props.story.id}`}
          />
        }
        {type === 'video' &&
          <video
            ref={r => { this.vid = r }}
            style={styles.storyContent}
            src={source}
            controls={false}
            onLoadedData={this.videoLoaded}
            muted={this.props.mutedState}
            autoPlay
            preload="true"
          />
        }
        {type === 'text' &&
          <div
            style={{
              width: this.props.width,
              height: this.props.height,
              position: 'absolute',
              left: 0,
              top: 0,
              background: this.props.story.backgroundColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff'
            }}
          >
            <div style={{marginLeft: '20px', marginRight: '20px', fontSize: '20px', textAlign: 'center'}}>
              {this.props.story.caption}
            </div>
          </div>
        }
        {!this.state.loaded && <div style={{width: this.props.width, height: this.props.height, position: 'absolute', left: 0, top: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 9, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc'}}>{this.props.loader || <div className={globalStyle.spinner} />}</div>}
        {this.props.story.seeMore && this.state.loaded &&
          <div style={{position: 'absolute', margin: 'auto', bottom: 0, zIndex: 9999, width: '100%'}}>
            {this.props.story.caption && this.props.story.caption != "" && type === 'video' &&
              <div className={globalStyle.caption}>
                {this.props.story.caption}
              </div>
            }

            {this.props.story.seeMore}
          </div>
        }
      </div>
    )
  }
}

const styles = {
  story: {
    display: 'flex',
    position: 'relative'
  },
  storyContent: {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
  }
}

Story.propTypes = {
  story: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  action: PropTypes.func,
  loader: PropTypes.element,
  playState: PropTypes.bool,
  mutedState: PropTypes.bool,
  getVideoDuration: PropTypes.func,
  bufferAction: PropTypes.bool,
  onStoryView: PropTypes.func,
  onStoryRender: PropTypes.func
}
