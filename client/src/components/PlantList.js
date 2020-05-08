import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(props) {
    super(props)

    this.state = {
      plants: [],
      search: ''
    }
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  componentDidMount() {
    axios.get('http://localhost:3333/plants')
      .then(res => {
        this.setState({plants: res.data.plantsData})
      })
      .catch(err => {
        console.log(err.data)
      })
  }
  

  componentDidUpdate(prevProps, prevState) {

    if (prevState.search !== this.state.search) {
      
      const newPlants = this.state.plants.map(plant => {
        if (this.state.search === '') {
          plant.display = ''
          return plant
        }
        for (var key in plant) {
          if (typeof plant[key] === 'string') {
            if(plant[key].indexOf(this.state.search)!== -1) {
              plant.display = 'selected'
              return plant
            } 
          }
        }
        plant.display = 'not-selected'
        return plant
      })
     // console.log(newPlants)
      this.setState({
        plants: newPlants
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
      <div className='search'>
        <form>
          <input  type='text' 
                  name='search' 
                  value={this.state.search}
                  onChange={this.handleChange}
                   />
          <button>Search</button>
        </form>
      </div>
        {this.state?.plants?.map((plant) => (
          <div className={`plant-card ${plant.display}`} key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
