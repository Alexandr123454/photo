import React from 'react';
import { connect } from 'react-redux'
import { loadimages } from './API_DATA'
import { Spring, Transition, animated } from 'react-spring/renderprops';
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

async componentDidMount () {
  let response = await loadimages()

  let images = [...response.hits]

  this.props.setData(images) // 
}

  render() {

    const { images } = this.props 

    return (
      
      <Spring
        from={{ marginTop: -5000 }}
        to={{ marginTop: 0 }}
        config={{tension: 80}}
      >
      {props => (
        <div style={props}>
          <div className="images">
            {images.length 
              ? images.map(item => (
                  <img  
                    src={item.largeImageURL}
                    alt={item.tags}
                    className="images__item"
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
