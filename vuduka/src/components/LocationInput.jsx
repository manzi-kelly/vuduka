import React, { useRef, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationInput = ({ 
  placeholder, 
  value, 
  onChange, 
  onPlaceSelect,
  className = "" 
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Initialize autocomplete once component mounts
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
    } else {
      // If Google Maps API isn't loaded yet, wait for it
      const checkApiLoaded = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkApiLoaded);
          initAutocomplete();
        }
      }, 100);
    }

    function initAutocomplete() {
      // Restrict to Rwanda
      const options = {
        componentRestrictions: { country: "rw" },
        types: ["geocode", "establishment"]
      };

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
          
          if (onPlaceSelect) {
            onPlaceSelect({
              address: place.formatted_address,
              location: place.geometry && place.geometry.location
                ? {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }
                : null
            });
          }
        }
      });
    }

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange, onPlaceSelect]);

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <FaMapMarkerAlt className="text-blue-600" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full ${className}`}
      />
    </div>
  );
};

export default LocationInput;