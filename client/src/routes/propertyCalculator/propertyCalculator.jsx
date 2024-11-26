import React, { useState } from 'react';
import './propertyCalculator.scss'; // Import the custom CSS

const PropertyCalculator = () => {
  const [activeTab, setActiveTab] = useState('land');
  const [landArea, setLandArea] = useState('');
  const [landLocation, setLandLocation] = useState('');
  const [landPrice, setLandPrice] = useState(null);

  const [flatType, setFlatType] = useState('buy');
  const [bhk, setBhk] = useState('');
  const [flatArea, setFlatArea] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [flatLocation, setFlatLocation] = useState('');
  const [flatPrice, setFlatPrice] = useState(null);

  const landLocationRates = {
    'Prime City Center': 8000,
    'Urban Commercial': 6000,
    'Urban Residential': 4000,
    'Suburban': 2500,
    'Industrial Zone': 2000,
    'Rural': 1000,
  };

  const flatLocationRates = {
    'Premium Location': { buy: 7000, rent: 35 },
    'City Center': { buy: 5000, rent: 25 },
    'Suburban': { buy: 3500, rent: 18 },
    'Outer Area': { buy: 2500, rent: 12 },
  };

  const calculateLandPrice = () => {
    if (!landArea || !landLocation) return;
    let basePrice = parseFloat(landArea) * landLocationRates[landLocation];
    if (landArea > 10000) basePrice *= 0.95;
    else if (landArea > 20000) basePrice *= 0.90;
    setLandPrice(basePrice);
  };

  const calculateFlatPrice = () => {
    if (!bhk || !flatArea || !flatLocation || !bathroom) return;
    let finalPrice = parseFloat(flatArea) * flatLocationRates[flatLocation][flatType];
    finalPrice *= (1 + parseInt(bhk) * 0.1);
    finalPrice *= (1 + parseInt(bathroom) * 0.05);
    setFlatPrice(finalPrice);
  };

  return (
    <div className="calculator-card">
      <h2 className="title">Property Price Calculator</h2>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'land' ? 'active' : ''}`}
          onClick={() => setActiveTab('land')}
        >
          Land
        </button>
        <button
          className={`tab-button ${activeTab === 'flat' ? 'active' : ''}`}
          onClick={() => setActiveTab('flat')}
        >
          Flat
        </button>
      </div>

      {activeTab === 'land' && (
        <div className="calculator-content">
          <label>Plot Area (sq ft)</label>
          <input
            type="number"
            placeholder="Enter area in square feet"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            min="100"
          />

          <label>Location Type</label>
          <select
            value={landLocation}
            onChange={(e) => setLandLocation(e.target.value)}
          >
            <option value="">Select location type</option>
            {Object.entries(landLocationRates).map(([loc, rate]) => (
              <option key={loc} value={loc}>
                {loc} (₹{rate}/sq ft)
              </option>
            ))}
          </select>

          <button className="calculate-button" onClick={calculateLandPrice}>
            Calculate Land Value
          </button>

          {landPrice && (
            <div className="result">
              <h3>Estimated Land Value</h3>
              <p>₹{landPrice.toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'flat' && (
        <div className="calculator-content">
          <label>Transaction Type</label>
          <div className="transaction-buttons">
            <button
              className={`transaction-button ${flatType === 'buy' ? 'active' : ''}`}
              onClick={() => setFlatType('buy')}
            >
              Buy
            </button>
            <button
              className={`transaction-button ${flatType === 'rent' ? 'active' : ''}`}
              onClick={() => setFlatType('rent')}
            >
              Rent
            </button>
          </div>

          <label>Number of Bedrooms (BHK)</label>
          <select value={bhk} onChange={(e) => setBhk(e.target.value)}>
            <option value="">Select BHK</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} BHK
              </option>
            ))}
          </select>

          <label>Flat Area (sq ft)</label>
          <input
            type="number"
            placeholder="Enter area in square feet"
            value={flatArea}
            onChange={(e) => setFlatArea(e.target.value)}
            min="100"
          />

          <label>Number of Bathrooms</label>
          <select value={bathroom} onChange={(e) => setBathroom(e.target.value)}>
            <option value="">Select number of bathrooms</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
              </option>
            ))}
          </select>

          <label>Location</label>
          <select value={flatLocation} onChange={(e) => setFlatLocation(e.target.value)}>
            <option value="">Select location</option>
            {Object.entries(flatLocationRates).map(([loc, rates]) => (
              <option key={loc} value={loc}>
                {loc} (₹{rates[flatType]}/sq ft{flatType === 'rent' ? '/month' : ''})
              </option>
            ))}
          </select>

          <button className="calculate-button" onClick={calculateFlatPrice}>
            Calculate {flatType === 'buy' ? 'Price' : 'Rent'}
          </button>

          {flatPrice && (
            <div className="result">
              <h3>Estimated {flatType === 'buy' ? 'Flat Price' : 'Monthly Rent'}</h3>
              <p>₹{flatPrice.toLocaleString()}{flatType === 'rent' ? '/month' : ''}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCalculator;
