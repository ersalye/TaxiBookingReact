import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { markerIcon } from "./includes/Marker";
import { taxiIcon } from "./includes/TaxiMarker";
import image from "../../images/current.png";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.mapRefs = createRef();
    this.state = {
      lat: 27.7172,
      lng: 85.324,
      height: 0,
      zoom: 15,
      taxidrivers: [],
      currentLocation: null
    };
  }
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height - 32 });
  }
  componentWillMount() {
    this.updateDimensions();
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

      // return console.log(this.state.page);
      console.log(this.state.taxidrivers, "state taxi");
    });
  };
  componentDidMount() {
    this.currentLocation();
    this.getTaxiDrivers();
  }
  setcurrentlocation = loc => {
    console.log(loc, "sert");
    this.setState({ currentLocation: loc });
  };
  currentLocation = () => {
    let latlng;

    navigator &&
      navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(location => {
        latlng = new L.LatLng(
          location.coords.latitude,
          location.coords.longitude
        );
        console.log(
          [location.coords.latitude, location.coords.longitude],
          "aa"
        );
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
        L.marker(latlng, { icon: icon }).addTo(
          this.mapRefs &&
            this.mapRefs.current &&
            this.mapRefs.current.leafletElement
        );
      });
    // this.notify();
    navigator.permissions
      .query({ name: "geolocation" })
      .then(PermissionStatus => {
        if (PermissionStatus.state == "granted") {
          // this.notify()
        } else {
          // this.notify()
        }
      });
  };
  render() {
    const position = [this.state.lat, this.state.lng];
    const { height, zoom, taxidrivers } = this.state;

    return (
      <div>
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
          <TileLayer
            attribution='&amp;copy Developer:<a href=" http://naxa.com.np">NAXA</a>'
            url="https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw"
            maxZoom={20}
          />
          {taxidrivers &&
            taxidrivers.map(position => (
              <Marker
                key={`marker-${position.id}`}
                position={[position.latitude, position.longitude]}
                icon={taxiIcon}
                iconAnchor={[45, 46]}
              >
                <Popup>
                  <div class="bind-popup">
                    <div class="bind-header">
                      <h2>Varun</h2>
                      <p>
                        <i class="material-icons" style={{ fontSize: "16px" }}>
                          room
                        </i>
                        <i class="material-icons pop-dir">directions</i>
                      </p>
                      <a class="openSpace_btn" href="/#/OpenSpaceDetails">
                        View Details
                      </a>
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
