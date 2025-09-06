import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaCar, FaStar, FaRoad, FaUsers, FaSuitcase, FaShieldAlt, 
  FaCheckCircle, FaClock, FaPhone, FaArrowLeft, FaUser, FaCalendarAlt,
  FaChevronLeft, FaChevronRight, FaSearch, FaChevronDown
} from 'react-icons/fa';
import PaymentForm from './PaymentForm';

// Rwanda administrative data
const rwandaData = {
  provinces: [
    {
      name: "Eastern Province",
      districts: [
        {
          name: "Bugesera",
          sectors: ["Gashora", "Juru", "Kamabuye", "Mareba", "Mayange", "Musenyi", "Mwogo", "Ngeruka", "Ntarama", "Nyamata", "Nyarugenge", "Rilima", "Ruhuha", "Rweru", "Shyara"]
        },
        {
          name: "Gatsibo",
          sectors: ["Gasange", "Gatsibo", "Gitoki", "Kabarore", "Kageyo", "Kiramuruzi", "Kiziguro", "Muhura", "Murambi", "Ngarama", "Nyagihanga", "Remera", "Rugarama", "Rwimbogo"]
        },
        {
          name: "Kayonza",
          sectors: ["Gahini", "Kabare", "Kabarondo", "Mukarange", "Murama", "Murundi", "Mwiri", "Ndego", "Nyamirama", "Rukara", "Ruramira", "Rwinkwavu"]
        },
        {
          name: "Kirehe",
          sectors: ["Gahara", "Gatore", "Kigarama", "Kigina", "Kirehe", "Mahama", "Mpanga", "Musaza", "Mushikiri", "Nasho", "Nyamugari", "Nyarubuye", "Rwabarimba", "Rwanyamuhanga"]
        },
        {
          name: "Ngoma",
          sectors: ["Gashanda", "Jarama", "Karembo", "Kaziba", "Kibungo", "Mugesera", "Murama", "Mutenderi", "Remera", "Rukira", "Rukumberu", "Rurenge", "Sake", "Zaza"]
        },
        {
          name: "Nyagatare",
          sectors: ["Gatebe", "Karama", "Karangazi", "Katabagemu", "Kiyombe", "Matimba", "Mimuri", "Mukama", "Musheri", "Nyagatare", "Rukomo", "Rwempasha", "Rwimiyaga", "Tabagwe"]
        },
        {
          name: "Rwamagana",
          sectors: ["Fumbwe", "Gahengeri", "Gishali", "Karenge", "Kigabiro", "Muhazi", "Munyaga", "Munyiginya", "Musha", "Muyumbu", "Mwulire", "Nyarubuye", "Rukara", "Rwamagana"]
        }
      ]
    },
    {
      name: "Kigali",
      districts: [
        {
          name: "Gasabo",
          sectors: ["Bumbogo", "Gatsata", "Gikomero", "Gisozi", "Jabana", "Jali", "Kacyiru", "Kimihurura", "Kimironko", "Kinyinya", "Ndera", "Nduba", "Remera", "Rusororo", "Rutunga"]
        },
        {
          name: "Kicukiro",
          sectors: ["Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Kigarama", "Masaka", "Niboye", "Nyarugunga"]
        },
        {
          name: "Nyarugenge",
          sectors: ["Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageragere", "Muhima", "Nyakabanda", "Nyamirambo", "Nyarugenge", "Rwezamenyo"]
        }
      ]
    },
    {
      name: "Northern Province",
      districts: [
        {
          name: "Burera",
          sectors: ["Bungwe", "Butaro", "Cyanika", "Cyeru", "Gahunga", "Gatebe", "Gitovu", "Kagogo", "Kinoni", "Kinyababa", "Kivuye", "Nemba", "Rugarama", "Rugengabari", "Ruhunde", "Rusarabuye", "Rwerere"]
        },
        {
          name: "Gakenke",
          sectors: ["Busengo", "Coko", "Cyabingo", "Gakenke", "Gashenyi", "Janja", "Kamubuga", "Karambo", "Kivuruga", "Mataba", "Minazi", "Mugunga", "Muhondo", "Muyongwe", "Muzo", "Nemba", "Ruli", "Rusasa", "Rushashi"]
        },
        {
          name: "Gicumbi",
          sectors: ["Bukure", "Bwisige", "Byumba", "Cyumba", "Giti", "Kageyo", "Kaniga", "Manyagiro", "Miyove", "Mukarange", "Muko", "Mutete", "Nyamiyaga", "Nyankenke", "Rubaya", "Rukomo", "Rushaki", "Rutare", "Ruvune", "Rwamiko", "Shangasha"]
        },
        {
          name: "Musanze",
          sectors: ["Busogo", "Cyuve", "Gacaca", "Gashaki", "Gataraga", "Kimonyi", "Kinigi", "Muhoza", "Muko", "Musanze", "Nkotsi", "Nyange", "Remera", "Rwaza", "Shingiro"]
        },
        {
          name: "Rulindo",
          sectors: ["Base", "Burega", "Bushoki", "Buyoga", "Cyinzuzi", "Cyungo", "Kinihira", "Kisaro", "Masoro", "Mbogo", "Murambi", "Ngoma", "Ntarabana", "Rukozo", "Rusiga", "Shyorongi", "Tumba"]
        }
      ]
    },
    {
      name: "Southern Province",
      districts: [
        {
          name: "Gisagara",
          sectors: ["Gikonko", "Gishubi", "Kansi", "Kibirizi", "Kigembe", "Mamba", "Muganza", "Mugombwa", "Mukindo", "Musha", "Ndora", "Nyanza", "Save"]
        },
        {
          name: "Huye",
          sectors: ["Gishamvu", "Huye", "Karama", "Kigoma", "Kinazi", "Maraba", "Mbazi", "Mukura", "Ngoma", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba"]
        },
        {
          name: "Kamonyi",
          sectors: ["Gacurabwenge", "Karama", "Kayenzi", "Kayumbu", "Mugina", "Musambira", "Ngamba", "Rukoma", "Runyinya", "Rwabutazi", "Shyogwe"]
        },
        {
          name: "Muhanga",
          sectors: ["Cyeza", "Kabacuzi", "Kibangu", "Kiyumba", "Muhanga", "Mushishiro", "Nyabinoni", "Nyamabuye", "Nyarusange", "Rongi", "Rugendabari", "Shyanda"]
        },
        {
          name: "Nyamagabe",
          sectors: ["Buruhukiro", "Cyanika", "Gatare", "Kaduha", "Kamegeri", "Kibirizi", "Kibumbwe", "Kitabi", "Mbazi", "Mugano", "Musange", "Musebeya", "Mushubi", "Nkomane", "Gasaka", "Tare"]
        },
        {
          name: "Nyanza",
          sectors: ["Busasamana", "Busoro", "Cyabakamyi", "Kibilizi", "Kigoma", "Mukingo", "Muyira", "Ntyazo", "Nyagisozi", "Rwabicuma", "Rwankuba"]
        },
        {
          name: "Nyaruguru",
          sectors: ["Busanze", "Cyahinda", "Kibeho", "Mata", "Muganza", "Munini", "Ngera", "Ngoma", "Nyabimata", "Nyagisozi", "Ruheru", "Ruramba", "Rusenge"]
        },
        {
          name: "Ruhango",
          sectors: ["Bweramana", "Byimana", "Kabagali", "Kinazi", "Kinihira", "Mbuye", "Mpanda", "Mushishiro", "Ntongwe", "Ruhango", "Rusarasi", "Rwabutazi", "Shyogwe"]
        }
      ]
    },
    {
      name: "Western Province",
      districts: [
        {
          name: "Karongi",
          sectors: ["Bwishyura", "Gashari", "Gishyita", "Gitesi", "Mubuga", "Murambi", "Murundi", "Mutuntu", "Rubengera", "Rugabano", "Ruganda", "Rwankuba", "Twumba"]
        },
        {
          name: "Ngororero",
          sectors: ["Bwira", "Gatumba", "Hindiro", "Kageyo", "Kavumu", "Matyazo", "Muhanda", "Muhororo", "Ndaro", "Ngororero", "Nyange", "Sovu", "Bigogwe"]
        },
        {
          name: "Nyabihu",
          sectors: ["Bigogwe", "Jenda", "Jomba", "Kabatwa", "Karago", "Kintobo", "Mukamira", "Muringa", "Rambura", "Rugera", "Rurembo", "Shyira"]
        },
        {
          name: "Nyamasheke",
          sectors: ["Bushekeri", "Bushenge", "Cyato", "Gihombo", "Kagano", "Kanjongo", "Karambi", "Karengera", "Kirimbi", "Macuba", "Mahembe", "Nyabitekeri", "Rangiro", "Ruharambuga", "Shangi", "Zihare"]
        },
        {
          name: "Rubavu",
          sectors: ["Bugeshi", "Busasamana", "Cyanzarwe", "Gisenyi", "Kanama", "Kanzenze", "Mudende", "Nyakiriba", "Nyamyumba", "Rubavu", "Rugerero"]
        },
        {
          name: "Rusizi",
          sectors: ["Bugarama", "Butare", "Bweyeye", "Gashonga", "Giheke", "Gihundwe", "Gikundamvura", "Gitambi", "Kamembe", "Muganza", "Mururu", "Nkanka", "Nkombo", "Nkungu", "Nyakabuye", "Nyakarenzo", "Nzahaha", "Rwimbogo"]
        },
        {
          name: "Rutsiro",
          sectors: ["Boneza", "Gihango", "Kigeyo", "Kivumu", "Manihira", "Mukura", "Murunda", "Musasa", "Mushonyi", "Mushubati", "Nyabirasi", "Ruhango", "Rusebeya", "Rwashyambere"]
        }
      ]
    }
  ]
};

// Flattened arrays for easier access
const allDistricts = rwandaData.provinces.flatMap(province => 
  province.districts.map(district => district.name)
);

const allSectors = rwandaData.provinces.flatMap(province =>
  province.districts.flatMap(district => district.sectors)
);

// Calendar Component (unchanged)
const Calendar = ({ selectedDate, onDateSelect, scheduledTime, onTimeChange }) => {
  // ... (calendar implementation remains the same)
};

function BookingForm() {
  const [step, setStep] = useState(1);
  const [pickupProvince, setPickupProvince] = useState('');
  const [pickupDistrict, setPickupDistrict] = useState('');
  const [pickupSector, setPickupSector] = useState('');
  const [dropoffProvince, setDropoffProvince] = useState('');
  const [dropoffDistrict, setDropoffDistrict] = useState('');
  const [dropoffSector, setDropoffSector] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [rideTimeOption, setRideTimeOption] = useState('now');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [pickupSearch, setPickupSearch] = useState('');
  const [dropoffSearch, setDropoffSearch] = useState('');

  // Filter sectors based on search input
  const filteredPickupSectors = allSectors.filter(sector =>
    sector.toLowerCase().includes(pickupSearch.toLowerCase())
  );
  
  const filteredDropoffSectors = allSectors.filter(sector =>
    sector.toLowerCase().includes(dropoffSearch.toLowerCase())
  );

  const rideTypes = [
    { 
      id: 'economy', 
      name: 'Economy', 
      icon: FaCar, 
      price: '15,000-20,000 RWF', 
      time: '5 min', 
      description: 'Affordable everyday rides',
      features: [
        { text: 'AC', icon: null },
        { text: 'Standard Comfort', icon: null },
        { text: 'Safe Ride', icon: FaShieldAlt }
      ]
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      icon: FaStar, 
      price: '25,000-35,000 RWF', 
      time: '7 min', 
      description: 'Luxury comfort rides',
      features: [
        { text: 'Premium Car', icon: null },
        { text: 'Top Rated Driver', icon: null },
        { text: 'Luxury Interior', icon: null }
      ]
    },
    { 
      id: 'suv', 
      name: 'SUV', 
      icon: FaRoad, 
      price: '30,000-40,000 RWF', 
      time: '10 min', 
      description: 'Spacious for groups',
      features: [
        { text: '6-8 Seats', icon: FaUsers },
        { text: 'Extra Luggage Space', icon: FaSuitcase },
        { text: 'Family Friendly', icon: null }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!pickupSector.trim()) {
      newErrors.pickupSector = 'Pickup sector is required';
    }
    if (!dropoffSector.trim()) {
      newErrors.dropoffSector = 'Dropoff sector is required';
    }
    if (!selectedRide) {
      newErrors.ride = 'Please select a ride type';
    }
    if (rideTimeOption === 'schedule') {
      if (!scheduledDate) {
        newErrors.scheduledDate = 'Please select a date';
      }
      if (!scheduledTime) {
        newErrors.scheduledTime = 'Please select a time';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const ride = rideTypes.find(r => r.id === selectedRide);
    let displayDate, displayTime;
    if (rideTimeOption === 'now') {
      displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      displayTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } else {
      displayDate = scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const [hours, minutes] = scheduledTime.split(':');
      const hourInt = parseInt(hours, 10);
      const ampm = hourInt >= 12 ? 'PM' : 'AM';
      const formattedHour = hourInt % 12 || 12;
      displayTime = `${formattedHour}:${minutes} ${ampm}`;
    }
    const newOrder = {
      pickup: `${pickupSector}, ${pickupDistrict}`,
      dropoff: `${dropoffSector}, ${dropoffDistrict}`,
      type: ride.name,
      price: ride.price,
      date: displayDate,
      time: displayTime,
      immediate: rideTimeOption === 'now'
    };
    setOrder(newOrder);
    setStep(2);
  };

  const handleBookNow = () => {
    setStep(3);
  };

  const handleBackToBooking = () => {
    setStep(1);
  };

  const handlePaymentClose = () => {
    setStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    setStep(1);
    setPickupProvince('');
    setPickupDistrict('');
    setPickupSector('');
    setDropoffProvince('');
    setDropoffDistrict('');
    setDropoffSector('');
    setSelectedRide(null);
    setRideTimeOption('now');
    setScheduledTime('');
    setScheduledDate(null);
  };

  // Confirmation Component (unchanged)
  const Confirmation = ({ order, onBookNow, onBack }) => {
    // ... (confirmation implementation remains the same)
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <FaCar className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Ride in Rwanda</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience premium transportation with our reliable and comfortable ride service across all districts and sectors of Rwanda
          </p>
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* Location Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Pickup Location Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700">Pickup Sector</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                  <input
                    placeholder="Select pickup sector"
                    value={pickupSector}
                    readOnly
                    onClick={() => setShowPickupDropdown(!showPickupDropdown)}
                    className="pl-12 pr-10 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full cursor-pointer"
                  />
                  {showPickupDropdown && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search sectors..."
                            value={pickupSearch}
                            onChange={(e) => setPickupSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="p-2">
                        {filteredPickupSectors.length > 0 ? (
                          filteredPickupSectors.map((sector) => (
                            <div
                              key={sector}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer rounded-md"
                              onClick={() => {
                                setPickupSector(sector);
                                setShowPickupDropdown(false);
                                setPickupSearch('');
                                
                                // Find the district for this sector
                                for (const province of rwandaData.provinces) {
                                  for (const district of province.districts) {
                                    if (district.sectors.includes(sector)) {
                                      setPickupDistrict(district.name);
                                      setPickupProvince(province.name);
                                      break;
                                    }
                                  }
                                }
                              }}
                            >
                              {sector}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500">No sectors found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {pickupSector && (
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">
                      District: <span className="font-medium">{pickupDistrict}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Province: <span className="font-medium">{pickupProvince}</span>
                    </div>
                  </div>
                )}
                {errors.pickupSector && (
                  <p className="text-red-500 text-xs mt-1">{errors.pickupSector}</p>
                )}
              </div>

              {/* Dropoff Location Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700">Dropoff Sector</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                  <input
                    placeholder="Select dropoff sector"
                    value={dropoffSector}
                    readOnly
                    onClick={() => setShowDropoffDropdown(!showDropoffDropdown)}
                    className="pl-12 pr-10 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg text-base w-full cursor-pointer"
                  />
                  {showDropoffDropdown && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search sectors..."
                            value={dropoffSearch}
                            onChange={(e) => setDropoffSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="p-2">
                        {filteredDropoffSectors.length > 0 ? (
                          filteredDropoffSectors.map((sector) => (
                            <div
                              key={sector}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer rounded-md"
                              onClick={() => {
                                setDropoffSector(sector);
                                setShowDropoffDropdown(false);
                                setDropoffSearch('');
                                
                                // Find the district for this sector
                                for (const province of rwandaData.provinces) {
                                  for (const district of province.districts) {
                                    if (district.sectors.includes(sector)) {
                                      setDropoffDistrict(district.name);
                                      setDropoffProvince(province.name);
                                      break;
                                    }
                                  }
                                }
                              }}
                            >
                              {sector}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500">No sectors found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {dropoffSector && (
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">
                      District: <span className="font-medium">{dropoffDistrict}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Province: <span className="font-medium">{dropoffProvince}</span>
                    </div>
                  </div>
                )}
                {errors.dropoffSector && (
                  <p className="text-red-500 text-xs mt-1">{errors.dropoffSector}</p>
                )}
              </div>
            </div>

            {/* Ride Time Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">When do you need the ride?</label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  rideTimeOption === 'now' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="rideTime"
                    value="now"
                    checked={rideTimeOption === 'now'}
                    onChange={() => setRideTimeOption('now')}
                    className="mr-2 text-blue-500"
                  />
                  <FaClock className="mr-2 text-blue-600" />
                  Right Now
                </label>
                <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  rideTimeOption === 'schedule' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="rideTime"
                    value="schedule"
                    checked={rideTimeOption === 'schedule'}
                    onChange={() => setRideTimeOption('schedule')}
                    className="mr-2 text-blue-500"
                  />
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Schedule Later
                </label>
              </div>

              {/* Calendar Component */}
              {rideTimeOption === 'schedule' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar 
                    selectedDate={scheduledDate}
                    onDateSelect={setScheduledDate}
                    scheduledTime={scheduledTime}
                    onTimeChange={setScheduledTime}
                  />
                  {errors.scheduledDate && (
                    <p className="text-red-500 text-xs mt-2">{errors.scheduledDate}</p>
                  )}
                  {errors.scheduledTime && (
                    <p className="text-red-500 text-xs mt-2">{errors.scheduledTime}</p>
                  )}
                </div>
              )}
            </div>

            {/* Ride Types */}
            <div className="mb-8">
              <label className="text-lg font-semibold text-gray-900 mb-6 block">Choose Your Ride</label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {rideTypes.map((ride) => {
                  const Icon = ride.icon;
                  const isSelected = selectedRide === ride.id;
                  return (
                    <div 
                      key={ride.id} 
                      onClick={() => setSelectedRide(ride.id)} 
                      className={`cursor-pointer border-2 rounded-lg p-4 transition-transform duration-300 ${
                        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300 shadow-md'
                      }`}
                    >
                      <div className={`flex items-center mb-4 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{ride.name}</h3>
                          <p className="text-sm">{ride.description}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {ride.features.map((f, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <FaCheckCircle className="w-4 h-4 text-blue-600" />
                            <span>{f.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-gray-900 font-bold">{ride.price}</div>
                      <div className="flex items-center text-blue-600 text-sm">
                        <FaClock className="w-4 h-4 mr-1" /> {ride.time} ETA
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.ride && (
                <p className="text-red-500 text-xs mt-2">{errors.ride}</p>
              )}
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
              <button 
                onClick={handleSubmit} 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Confirm & Book Ride
              </button>
            </div>

            <p className="text-center text-gray-500 text-xs mt-2">
              Complete your booking
            </p>
          </div>
        )}

        {/* Step 2: Confirmation Component */}
        {step === 2 && order && (
          <Confirmation 
            order={order} 
            onBookNow={handleBookNow}
            onBack={handleBackToBooking}
          />
        )}

        {/* Step 3: Payment Form */}
        {step === 3 && order && (
          <PaymentForm 
            order={order} 
            onPaymentSubmit={handlePaymentSubmit}
            onClose={handlePaymentClose}
          />
        )}
      </div>
    </section>
  );
}

export default BookingForm;