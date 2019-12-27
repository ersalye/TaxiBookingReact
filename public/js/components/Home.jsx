import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { markerIcon } from "./includes/Marker";
import { taxiIcon } from "./includes/TaxiMarker";
import image from "../../images/current.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "@material-ui/core/Slider";

// import { Button } from "react-bootstrap";
const geolib = require("geolib");

class Home extends Component {
  constructor(props) {
    super(props);
    this.mapRefs = createRef();
    this.state = {
      lat: 27.7172,
      lng: 85.324,
      height: 0,
      zoom: 12,
      taxidrivers: [],
      currentLocation: null,
      loaded: false,
      radius: 12000,
      value: 12000,
      time: "",
      visible: false,
      bottomModalAndTitle: false,
      loading: true,
      valids: true,
      modalData: [],
      error: null,
      taxifilter: []
    };
  }
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height - 32 });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    // this.getPosition();

    this.currentLocation();
  }
  getTaxiDrivers = () => {
    Promise.all([
      axios({
        method: "GET",
        url: `${process.env.API_URL}api/taxidriver`,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: ""
        }
        // data: {
        // }
      })
    ]).then(response => {
      const taxidriverlist = response[0].data.data.map(taxi => ({
        ...taxi
      }));

      response[0].data.data = taxidriverlist;

      this.setState({
        taxidrivers: taxidriverlist
      });
      let { lat, lng } = this.state;
      let { taxidrivers } = this.state;
      let markers1 = taxidrivers
        .map(feature => {
          // console.log(feature);
          // let coords = feature.coordinates;
          // let data = feature.properties

          return {
            coordinate: {
              latitude: feature.latitude,
              longitude: feature.longitude
            },
            properties: {
              id: feature.id,
              name: feature.taxi_number
            }
          };
        })
        .filter(marker => {
          // return console.log(lat, "filter makrer");
          let distance = this.calculateDistance(
            lat,
            lng,
            marker.coordinate.latitude,
            marker.coordinate.longitude
          );
          return distance <= this.state.value;
        });
      console.log(markers1, "filtermarkered");
      console.log(this.state.value, "statevalueradius");
      this.setState({
        taxifilter: markers1,
        loaded: true,
        loading: false
      });
      // return console.log(this.state.page);
      // console.log(this.state.taxidrivers, "state taxi");
    });
  };
  setcurrentlocation = loc => {
    // console.log(loc, "sert");
    this.setState({ currentLocation: loc });
  };
  currentLocation = () => {
    let latlng;
    let a = false;
    navigator &&
      navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(location => {
        latlng = new L.LatLng(
          location.coords.latitude,
          location.coords.longitude
        );
        // console.log(
        //   [location.coords.latitude, location.coords.longitude],
        //   "aa"
        // );
        this.setcurrentlocation([
          location.coords.latitude,
          location.coords.longitude
        ]);
        this.setState({
          currentLocation: [location.coords.latitude, location.coords.longitude]
        });
        // L.circleMarker(latlng, { radius: 6, fillColor: 'red', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'red', }).addTo(this.props.mapRefs.current.leafletElement);
        // console.log("current", this.state.currentLocation)
        var icon = L.divIcon({
          className: "custom-div-icon",
          html: `<img width="48px" height="48px" src=${image}/>`,
          iconSize: [4, 4],
          //   iconUrl: require("../../images/current.png"),
          iconAnchor: [12, 6]
        });
        // console.log(this.mapRefs, "maprefs");
        var currentLocationMarker = L.marker(latlng, { icon: icon }).addTo(
          this.mapRefs.current.leafletElement
        );
        // currentLocationMarker.remove();
        console.log(this.state.value, "radi value");
        // this.getCurrentPostionCircle(latlng, this.state.value);
        // }
      });
    // this.notify();
    navigator.permissions
      .query({ name: "geolocation" })
      .then(PermissionStatus => {
        if (PermissionStatus.state == "granted") {
          // this.notify()
        } else {
          this.notify();
        }
      });
  };
  getCurrentPostionCircle = (latlng, radiusvalue) => {
    global.currentLocationCircle = L.circle(latlng, {
      radius: radiusvalue
    }).addTo(this.mapRefs.current.leafletElement);
  };
  notify = () =>
    toast.info("Turn your location service ON for better experience", {
      autoClose: 3000,
      position: "bottom-right"
    });
  getTaxi = () => {
    this.getTaxiDrivers();
  };

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      { latitude: origLat, longitude: origLon },
      { latitude: markerLat, longitude: markerLon }
    );
  }

  bookNow = () => {
    alert("book");
  };
  sliderChange = (event, slidervalue) => {
    // console.log(value);
    this.getTaxiDrivers();
    this.setState({ value: slidervalue });
    // currentLocationCircle.remove();
    // this.getCurrentPostionCircle(this.state.currentLocation, slidervalue);
  };
  render() {
    const position = [this.state.lat, this.state.lng];
    const { height, zoom, taxifilter } = this.state;
    const marks = [
      {
        value: 12000,
        label: "10km"
      },
      {
        value: 8000,
        label: "20km"
      },
      {
        value: 4000,
        label: "30km"
      },
      {
        value: 1000,
        label: "40km"
      }
    ];

    function valuetext(value) {
      return `${value}`;
    }

    function valueLabelFormat(value) {
      return marks.findIndex(mark => mark.value === value) + 1;
    }

    return (
      <div>
        <ToastContainer newestOnTop={true} enableMultiContainer />

        <Slider
          defaultValue={12000}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={4000}
          marks={marks}
          // valueLabelDisplay="on"
          min={1000}
          max={12000}
          onChange={this.sliderChange}
        />

        <Map
          center={position}
          ref={this.mapRefs}
          zoom={zoom}
          maxZoom={18}
          attributionControl={true}
          zoomControl={false}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          style={{ height: height, zIndex: 2 }}
        >
          <div id="button-wrapper">
            <button className="btn btn-warning" onClick={this.getTaxi}>
              Get Nearest Taxi
            </button>
          </div>
          <TileLayer
            attribution='&amp;copy Developer:<a href=" http://fusemachines.com.np">NAXA</a>'
            url="https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw"
            maxZoom={20}
          />
          {taxifilter &&
            taxifilter.map(position => (
              // console.log(position, "pos"),
              <Marker
                key={`marker-${Math.random()}`}
                position={[
                  position.coordinate.latitude,
                  position.coordinate.longitude
                ]}
                icon={taxiIcon}
                iconAnchor={[45, 46]}
              >
                <Popup>
                  <div className="bind-popup">
                    <div className="bind-header">
                      <tr>
                        <th>Driver Name:</th>
                        {/* <td>{position.driver_name}</td> */}
                      </tr>
                      <tr>
                        <th>License Number:</th>
                        {/* <td>{position.license_number}</td> */}
                      </tr>
                      <tr>
                        <th>Taxi Number</th>
                        {/* <td>{position.taxi_number}</td> */}
                      </tr>
                      {/* <h2>Varun</h2>
                      <p>
                        <i className="material-icons" style={{ fontSize: "16px" }}>
                          room
                        </i>
                        <i className="material-icons pop-dir">directions</i>
                      </p>
                      <a className="openSpace_btn" href="/#/OpenSpaceDetails">
                        View Details
                      </a> */}
                      <button class="btn btn-danger" onClick={this.bookNow}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}

export default Home;
