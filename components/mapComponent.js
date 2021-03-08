import * as React from 'react';

import { Button, Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import OverlayComponent from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ToggleButton } from 'react-native-paper';
import SwitchButton from 'switch-button-react-native';

const GOOGLE_API_KEY = 'AIzaSyBBUZTSrNRyshhKeOmNp5W9nWKM4-Irsgg';
const destination = {latitude: 37.771707, longitude: -122.4053769};
const origin = {latitude: 37.78825, longitude: -122.4324};
const place = {latitude: 37.8, longitude: -122.4}

class MapComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.onRegionChange = this.onRegionChange.bind(this);
      this.state = {
        region:  {           
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        switch: true,

      }
    }


  
    onRegionChange(region) {
        this.setState({ region });
    }

  
    render() { 
      if (this.props.flag) {
        return (
          <MapView
          style = {styles.map}
          onRegionChange={this.onRegionChange}
          initialRegion = {{           
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
          animatetoRegion = {this.state.region}>
            <MapView.Marker 
            key = 'key' 
            title = 'Owl Trail' 
            image = {require("../Images/origin.png")}
            coordinate = {origin} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')} />

            <MapView.Marker 
            key = 'key1' 
            title = 'Owl Trail' 
            image = {require("../Images/barefoot.png")}
            coordinate = {place} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')} />

            <MapView.Marker 
            key = 'key2' 
            title = 'Definitely not the owl trail' 
            image = {require("../Images/barefoot.png")}
            coordinate = {destination} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')}/>
            

          </MapView>
        );
      }
      else  {
        var poggies;
        var op;
        var mode;
        if (this.state.switch) {
          poggies = styles.nocover;
          op = styles.nocover;
          mode = 'FACTUAL MODE';
        }
        else {
          poggies = styles.cover;
          op = styles.opaque;
          mode = 'NON-FACTUAL MODE';
        }
        
        return (

          <MapView
          style = {styles.map}
          onRegionChange={this.onRegionChange}
          initialRegion = {{           
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
          animatetoRegion = {this.state.region}>
            <View style = {poggies}>


            </View>

            <View style = {styles.switch}> 
              <TouchableOpacity  
              activeOpacity = {0.5} 
              onPress={() => this.setState({switch: !this.state.switch})}
              style = {styles.previewbutton}>
                <Text style = {{fontSize: 18,
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "uppercase"}}> 
                  {mode} 
                </Text>
              </TouchableOpacity>
            </View>

            <MapView.Marker key = 'key' title = 'Start' image = {require("../Images/origin.png")} coordinate = {origin} />
            <MapView.Marker key = 'key2' title = 'End' coordinate = {destination}/>
            <MapViewDirections
              origin = {origin}
              destination = {destination}
              apikey = {GOOGLE_API_KEY}
              strokeWidth = {3}
            />
            

          </MapView>

        );
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  switch: {
    position: 'absolute',
    top: '5%',
  },
  cover: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  nocover: {
    opacity: 0,
  },
  opaque: {
    opacity: 1,
  },
  previewbutton: {
    backgroundColor: "#52ADA8",
    width:200,
    height:50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }

});

export default MapComponent;