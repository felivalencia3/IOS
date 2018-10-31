import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

export default class BikeNYC extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, markers: [] };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  fetchMarkerData() {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderMarkers() {
    return this.state.isLoading
      ? null
      : this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude
          };

          const metadata = `Status: ${marker.statusValue}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.stationName}
              description={metadata}
            />
          );
        });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.renderMarkers()}
      </MapView>
    );
  }
}
