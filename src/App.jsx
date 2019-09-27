import React from 'react';
import { connect } from 'react-redux'
import { loadimages } from './API_DATA'
import { Spring } from 'react-spring/renderprops';
import classnames from 'classnames';
import './App.css';

const getData = state => ({
  images: state.images,
});

const getMethods = dispatch => ({
  setData: data => dispatch({
    type: 'SET_DATA',
    value: data,
  }),
});

class App extends React.Component {

  state = {
    toggle: true,
  }

  async componentDidMount () {
    let response = await loadimages()
    let images = [...response.hits]
    this.props.setData(images) 
  }

  handleClick = () => {
    this.setState(state => ({
      toggle: !state.toggle,
    }))
  }

  render() {

    const { images } = this.props
    const { toggle } = this.state 

    return (
      <Spring
        from={{ marginTop: -5000 }}
        to={{ marginTop: 0 }}
        config={{tension: 80}}
      >
      {props => (
        <div style={props}>
          <div className="button-flex">
            <button 
              className="button" 
              onClick={() => {this.handleClick()}}
            >Change view
            </button>
          </div>
          <div
            className={classnames({
              'gridImages': toggle === true,
              'simpleView': toggle === false,
            })}
          >
            {images.length 
              ? images.map(item => (
                  <img  
                    src={item.largeImageURL}
                    alt={item.tags}
                    className="gridImages__item"
                    className={classnames({
                      'gridImages__item': toggle === true,
                      'simpleView__item': toggle === false,
                    })}
                  />
                )) 
              : "No images"}
          </div>   
        </div>
      )}
    </Spring>
    )
  }
}

export default connect(
  getData,
  getMethods
)(App);
