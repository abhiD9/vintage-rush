import React, { useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';
import Geocode from "react-geocode";
import LoadingBox from '../components/LoadingBox';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
import Button from "@material-ui/core/Button";

import { useDispatch } from 'react-redux';
import { getApiBaseUrl } from '../helper';
const libs = ['places'];
const defaultLocation = { lat: 45.516, lng: -73.56 };
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

export default function MapScreen(props) {
  const [googleApiKey, setGoogleApiKey] = useState('');
  Geocode.setApiKey(googleApiKey);
  Geocode.enableDebug();
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);
  const [selected, setSelected] = useState(null);

  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [state, setState] = useState(null);

  const mapRef = useRef(null);
   
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await Axios(`${getApiBaseUrl()}/api/config/google`);
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
     
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
    
  };

  // Get City
  	const getCity = ( addressComponent ) => {
		for( let i = 0; i < addressComponent.length; i++ ) {
			if ( addressComponent[ i ].types[0]  ) {
				for ( let j = 0; j < addressComponent[ i ].types.length; j++ ) {
					if ( 'administrative_area_level_2' === addressComponent[ i ].types[j] || 'locality' === addressComponent[ i ].types[j] ) {
						setCity(addressComponent[ i ].long_name);
					}}
			}}};
  // Get Address
  	const getState = ( addressComponent ) => {
		for( let i = 0; i < addressComponent.length; i++ ) {
			if ( addressComponent[ i ].types[0]  ) {
				for ( let j = 0; j < addressComponent[ i ].types.length; j++ ) {
					if ( 'administrative_area_level_1' === addressComponent[ i ].types[j] || 'locality' === addressComponent[ i ].types[j] ) {
						setState(addressComponent[ i ].long_name);
					}}
			}}};
  // Get Postal Code
  	const getPostalCode = ( addressComponent ) => {
		for( let i = 0; i < addressComponent.length; i++ ) {
			if ( addressComponent[ i ].types[0]  ) {
				for ( let j = 0; j < addressComponent[ i ].types.length; j++ ) {
					if ( 'postal_code' === addressComponent[ i ].types[j] || 'locality' === addressComponent[ i ].types[j] ) {
						setPostalCode(addressComponent[ i ].long_name);
					}}
			}}};
  // Get Country
  	const getCountry = ( addressComponent ) => {
		for( let i = 0; i < addressComponent.length; i++ ) {
			if ( addressComponent[ i ].types[0]  ) {
				for ( let j = 0; j < addressComponent[ i ].types.length; j++ ) {
					if ( 'country' === addressComponent[ i ].types[j] || 'locality' === addressComponent[ i ].types[j] ) {
						setCountry(addressComponent[ i ].long_name);
					}}
			}}};

  const dispatch = useDispatch();

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation os not supported by this browser');
   
    } else {
 
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  
  const setChoosenPlace = (e) => {
    setSelected({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    Geocode.fromLatLng(  e.latLng.lat() , e.latLng.lng() )
      .then(response => {
        if(response) {
          getCity(response.results[0].address_components)
          getState(response.results[0].address_components)
          getPostalCode(response.results[0].address_components)
          getCountry(response.results[0].address_components)
          setAddress(response.results[0].formatted_address)
        }
      }
      ).catch(error => console.log(error))
  };

  const enterAndProceed = () => {
   // dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: selected.lat,
          lng: selected.lng,
          address: address,
          state: state,
          postalCode: postalCode,
          city: city,
          country: country,

        },
      });
    props.history.push('/shipping');
  }

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        
        <img className="locate" onClick={() => {getUserCurrentLocation()}} 
        style={{height:'63px', width: '73px'}} src="/images/location.png" alt="" />
      
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          options={options}
        >
        <Marker 
         onLoad={onMarkerLoad} draggable={true} onDragEnd={(e) => {setChoosenPlace(e)}} position={location}/>
        {selected && (
        <InfoWindow  options={{
          pixelOffset: new window.google.maps.Size( 0, -30 ) }}
          position={{lat: selected.lat , lng: selected.lng }}
          onCloseClick={() => {setSelected(null)}}>
          <div >
            <h3>
              {address}
              <div className="row center p-1">
                   <Button style={{fontSize: "small"}} variant="contained"  color="secondary" size="large" onClick={() => { enterAndProceed()}}>
                     Enter and Proceed &nbsp;<span className="fa fa-check-circle"></span></Button>
                     <span className="small p-1 fa fa-info-circle"> you can edit this if it's not showing exact address</span>
              </div>
            </h3>
          </div>
        </InfoWindow>)}
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
} 



 