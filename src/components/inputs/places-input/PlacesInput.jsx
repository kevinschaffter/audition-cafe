import React, { useEffect, useRef } from 'react';
import { FormInput } from 'semantic-ui-react';
import { useScript } from '../../../hooks';

const PlacesInput = ({ onChange, ...props }) => {
  const [loaded] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
  );

  // TODO: Research refs with semantic-ui and add ref to input below
  const input = document.getElementById('places-input');
  const placesRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;

    const handleAddressChange = () => {
      const { address_components, geometry: { location } = {}, utc_offset_minutes } =
        placesRef.current.getPlace() || {};

      const { city, state, country, continent } = address_components.reduce((acc, val) => {
        if (val.types.includes('country')) acc.country = val.long_name;
        else if (val.types.includes('administrative_area_level_1')) acc.state = val.short_name;
        else if (val.types.includes('locality')) acc.city = val.long_name;
        else if (val.types.includes('continent')) acc.continent = val.long_name;
        return acc;
      }, {});

      const [lat, lng] = [location.lat(), location.lng()];
      // TODO: maybe only send truthy values
      const value = { city, state, country, continent, lat, lng, offset: utc_offset_minutes };
      if (onChange) onChange({ name: 'location', value });
    };

    placesRef.current = new window.google.maps.places.Autocomplete(input);
    placesRef.current.addListener('place_changed', handleAddressChange);
    placesRef.current.setFields(['address_components', 'utc_offset_minutes', 'geometry']);
  }, [input, loaded, onChange]);

  return <FormInput {...props} id="places-input" />;
};

export default PlacesInput;
