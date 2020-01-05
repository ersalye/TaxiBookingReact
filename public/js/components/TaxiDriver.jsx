import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { markerIcon } from "./includes/Marker";
import { taxiIcon } from "./includes/TaxiMarker";
import image from "../../images/current.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "@material-ui/core/Slider";
require("leaflet.animatedmarker/src/AnimatedMarker");
// import { Button } from "react-bootstrap";
const geolib = require("geolib");

class Home extends Component {
  constructor(props) {
    super(props);
    this.mapRefs = createRef();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      zoom: 18,
      height: 0,
      arrData: [],
      markers: [],
      bookings: [],
      data: [],
      loaded: false,
      radius: 40 * 10,
      value: 10000,
      time: "",
      visible: false,
      bottomModalAndTitle: false,
      loading: true,
      valids: true,
      modalData: [],
      loaderZindex: 1,
      maxDist: 0
    };
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //     this.goBack();
    //     this.setState({ bottomModalAndTitle: false });
    //     return true;
    // });
    this.getPosition();
    this.getPreviousRides();
  }

  getPreviousRides() {
    axios({
      method: "GET",
      url: `${process.env.API_URL}api/driverbooking/${this.props.location.state.userid}`,
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        console.log(response, "bookingresponse");
        this.setState({ bookings: response.data.data });
      })
      .catch(function(error) {
        if (error.response) {
          alert(error.response.data.message);
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
        }
      });
  }
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height - 65 });
  }
  getPosition() {
    let latlng = null;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 1.05,
              longitudeDelta: 0.02
            }
          }
          // () => this.getLocations()
        );
        var icon = L.divIcon({
          className: "custom-div-icon",
          html: `<img width="48px" height="48px" src=${image}/>`,
          iconSize: [4, 4],
          //   iconUrl: require("../../images/current.png"),
          iconAnchor: [12, 6]
        });
        latlng = new L.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(this.marker1.leafletElement, "maprefs");
        var currentLocationMarker = L.marker(latlng, { icon: taxiIcon }).addTo(
          this.marker1.leafletElement
        );
        console.log(latlng, "current");
      },
      error => this.setState({ error: error.message })
      // { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  getLocations() {
    return Promise.all([
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
      // get children as an array
      console.log(response, "resp");
      var snapshot = response[0].data.data;
      var items = [];
      snapshot.forEach(child => {
        console.log(child, "child");
        items.push({
          id: child.id,
          coordinates: { latitude: child.latitude, longitude: child.longitude },

          name: child.name,
          license_number: child.license_number,
          taxi_number: child.taxi_number,
          phone_number: child.phoneno
        });
      });
      let { region } = this.state;
      let { latitude, longitude } = region;

      let markers = items
        .map(feature => {
          console.log(feature, "feature");
          let coords = feature.coordinates;
          // let data = feature.properties
          let distance1 = this.calculateDistance(
            latitude,
            longitude,
            coords.latitude,
            coords.longitude
          );
          console.log(distance1, "distupper");
          return {
            coordinate: {
              latitude: coords.latitude,
              longitude: coords.longitude
            },
            properties: {
              id: feature.id,
              driver_name: feature.name,
              license_number: feature.license_number,
              taxi_number: feature.taxi_number,
              distance: distance1,
              // timeto: feature.timeto,
              // address: feature.address,
              phoneno: feature.phone_number
              // gender: feature.gender
            }
          };
        })
        .filter(marker => {
          let distance = this.calculateDistance(
            latitude,
            longitude,
            marker.coordinate.latitude,
            marker.coordinate.longitude
          );
          return distance <= this.state.value;
        });

      this.setState({
        markers: markers,
        loaded: true,
        loading: false,
        loaderZindex: 0
      });
      const res = Math.min.apply(
        Math,
        this.state.markers.map(function(o) {
          return o.properties.distance;
        })
      );
      // alert(res);
      this.setState({ maxDist: res });
      // this.setState({ arrData: items });
    });
  }

  // }}

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      { latitude: origLat, longitude: origLon },
      { latitude: markerLat, longitude: markerLon }
    );
  }
  getTaxiDrivers = () => {
    this.getLocations();

    // Promise.all([
    //   axios({
    //     method: "GET",
    //     url: `${process.env.API_URL}api/taxidriver`,
    //     headers: {
    //       "content-type": "application/json",
    //       Accept: "application/json",
    //       Authorization: ""
    //     }
    //     // data: {
    //     // }
    //   })
    // ]).then(response => {
    //   const taxidriverlist = response[0].data.data.map(taxi => ({
    //     ...taxi
    //   }));

    //   response[0].data.data = taxidriverlist;

    //   this.setState({
    //     taxidrivers: taxidriverlist
    //   });
    //   let { lat, lng } = this.state;
    //   let { taxidrivers } = this.state;
    //   let markers1 = taxidrivers
    //     .map(feature => {
    //       // console.log(feature);
    //       // let coords = feature.coordinates;
    //       // let data = feature.properties

    //       return {
    //         coordinate: {
    //           latitude: feature.latitude,
    //           longitude: feature.longitude
    //         },
    //         properties: {
    //           id: feature.id,
    //           name: feature.taxi_number
    //         }
    //       };
    //     })
    //     .filter(marker => {
    //       // return console.log(lat, "filter makrer");
    //       let distance = this.calculateDistance(
    //         lat,
    //         lng,
    //         marker.coordinate.latitude,
    //         marker.coordinate.longitude
    //       );
    //       return distance <= this.state.value;
    //     });
    //   console.log(markers1, "filtermarkered");
    //   console.log(this.state.value, "statevalueradius");
    //   this.setState({
    //     taxifilter: markers1,
    //     loaded: true,
    //     loading: false
    //   });
    //   // return console.log(this.state.page);
    //   // console.log(this.state.taxidrivers, "state taxi");
    // });
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

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      { latitude: origLat, longitude: origLon },
      { latitude: markerLat, longitude: markerLon }
    );
  }

  bookNow = (taxilat, taxilon, currentpost, taxiid) => {
    if (this.marker1.leafletElement.hasLayer(animatedMarker)) {
      this.marker1.leafletElement.removeLayer(animatedMarker);
    }
    this.btn.setAttribute("disabled", "disabled");
    console.log(taxilat, "taxilat");
    console.log(taxilon, "taxilon");
    console.log(currentpost, "currentpost");
    // alert("book");
    var taxiloc = [taxilat, taxilon];
    var A = taxiloc;
    var B = currentpost;
    // var A = [27.709733, 85.321544];
    // var B = [27.7172453, 85.3239605];
    function slope(a, b) {
      if (a[0] == b[0]) {
        return null;
      }
      return (b[1] - a[1]) / (b[0] - a[0]);
    }
    function intercept(point, slope) {
      if (slope === null) {
        // vertical line
        return point[0];
      }
      return point[1] - slope * point[0];
    }
    var m = slope(A, B);
    var b = intercept(A, m);
    var coordinates = [];
    for (var x = A[0]; x <= B[0]; x = x + 0.0005) {
      var y = m * x + b;
      coordinates.push([x, y]);
    }
    this.marker1.leafletElement.fitBounds(L.polygon([A, B]).getBounds());
    console.log(coordinates);
    for (var i = 0; i < coordinates.length; i++) {
      var m = L.circleMarker(coordinates[i], { radius: 10, color: "green" });
      // this.mapRef.current.leafletElement.addLayer(m);
    }
    var line = L.polyline(coordinates);
    var myIcon = taxiIcon;
    var animatedMarker = L.animatedMarker(line.getLatLngs(), {
      icon: myIcon,
      interval: 1000,
      autoStart: true,
      onEnd: function() {
        const popupContent =
          ' <div className="bind-popup">' +
          '<div className="bind-header">Your Taxi Have Reached.</div></div>';
        animatedMarker.bindPopup(popupContent).openPopup();
      }
    });
    if ((this.props.location.state.user_type = 1)) {
      axios({
        method: "POST",
        url: `${process.env.API_URL}api/booking`,
        headers: {
          "content-type": "application/json",
          Accept: "application/json"
        },
        data: {
          taxi_id: taxiid,
          user_id: this.props.location.state.userid,
          user_type: this.props.location.state.user_type
        }
      })
        .then(response => {
          console.log(response, "response");
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
          }
        });
    } else {
      axios({
        method: "POST",
        url: `${process.env.API_URL}api/booking`,
        headers: {
          "content-type": "application/json",
          Accept: "application/json"
        },
        data: {
          taxi_id: taxiid,
          user_id: this.props.location.state.userid,
          user_type: this.props.location.state.user_type
        }
      })
        .then(response => {
          console.log(response, "response");
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
          }
        });
    }
    console.log(this.marker1.leafletElement, "leafletelme");
    this.marker1.leafletElement.addLayer(animatedMarker);
    console.log(this.marker1.leafletElement, "markers");
  };
  sliderChange = (event, slidervalue) => {
    // console.log(value);
    this.getTaxiDrivers();
    this.setState({ value: slidervalue });
    // currentLocationCircle.remove();
    // this.getCurrentPostionCircle(this.state.currentLocation, slidervalue);
  };
  render() {
    const position = [this.state.region.latitude, this.state.region.longitude];
    const { height, zoom, markers, bookings } = this.state;
    const marks = [
      {
        value: 3000,
        label: "10km"
      },
      {
        value: 1000,
        label: "20km"
      },
      {
        value: 500,
        label: "30km"
      },
      {
        value: 50,
        label: "40km"
      }
    ];
    function valuetext(value) {
      return `${value}`;
    }

    function valueLabelFormat(value) {
      return marks.findIndex(mark => mark.value === value) + 1;
    }
    var taxilocation = [];

    return (
      <div>
        <ToastContainer newestOnTop={true} enableMultiContainer />

        {/* <Slider
          defaultValue={3000}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          // step={500}
          marks={marks}
          // valueLabelDisplay="on"
          min={50}
          max={3000}
          onChange={value => {
            this.getLocations();
            this.setState({ value:value });
            console.log(this.state.value, "valuecahnge");
          }}
        /> */}

        <Map
          center={position}
          ref={ref => {
            this.marker1 = ref;
          }}
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
          <div class="card custom-card" style={{ width: "18rem" }}>
            <h4>
              <b>Previous Bookings</b>
            </h4>
            {bookings &&
              bookings.map(booking => {
                return (
                  <div class="card-body custom-top">
                    <h5 class="card-title">
                      DriverName: <b>{booking.name}</b>
                    </h5>
                    <p class="card-text">
                      This Taxi Was Booked On {booking.created_at} by You which
                      taxi number is {booking.taxi_number},Phone Number is{" "}
                      {booking.phone_number}
                    </p>
                  </div>
                );
              })}
          </div>

          <TileLayer
            attribution='&amp;copy Developer:<a href=" http://fusemachines.com.np">NAXA</a>'
            url="https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw"
            maxZoom={20}
          />
          {markers &&
            markers.map(markerposition => (
              <Marker
                key={`marker-${Math.random()}`}
                position={[
                  markerposition.coordinate.latitude,
                  markerposition.coordinate.longitude
                ]}
                icon={taxiIcon}
                iconAnchor={[45, 46]}
              >
                <Popup>
                  <div className="bind-popup">
                    <table className="bind-header">
                      <tbody>
                        <tr>
                          <th>Driver Name:</th>
                          <td>{markerposition.properties.driver_name}</td>
                        </tr>
                        <tr>
                          <th>License Number:</th>
                          <td>{markerposition.properties.license_number}</td>
                        </tr>
                        <tr>
                          <th>Taxi Number</th>
                          <td>{markerposition.properties.taxi_number}</td>
                        </tr>
                        <tr>
                          <th>Phone Number</th>
                          <td>{markerposition.properties.phoneno}</td>
                        </tr>
                        <tr>
                          <th>Distance</th>
                          <td>{markerposition.properties.distance} metres</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      ref={btn => {
                        this.btn = btn;
                      }}
                      className="btn btn-danger"
                      onClick={() => {
                        this.bookNow(
                          markerposition.coordinate.latitude,
                          markerposition.coordinate.longitude,
                          position,
                          markerposition.properties.id
                        );
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </Popup>
                {this.state.maxDist &&
                this.state.maxDist == markerposition.properties.distance ? (
                  <Tooltip
                    direction="right"
                    offset={[-8, -2]}
                    opacity={1}
                    permanent
                  >
                    <span>Best Match</span>
                  </Tooltip>
                ) : (
                  ""
                )}
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}

export default Home;
