import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('donor');
  const [donorForm, setDonorForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodType: '',
    organsWillingToDonate: [],
    existingMedicalConditions: '',
    consent: false,
    country: 'India',
    state: '',
    city: '',
  });
  const [recipientForm, setRecipientForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodType: '',
    organNeeded: '',
    urgencyLevel: 'low',
    medicalRecordId: '',
    hospitalName: '',
    hospitalCountry: '',
    hospitalState: '',
    consent: false,
  });
  const [searchFilters, setSearchFilters] = useState({
    organ: '',
    bloodType: '',
    location: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch hospitals on mount
    axios.get('/api/hospitals')
      .then(res => setHospitals(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDonorInputChange = (e) => {
    const { id, value, type, checked, name } = e.target;
    if (name === 'organsWillingToDonate') {
      let newOrgans = [...donorForm.organsWillingToDonate];
      if (checked) {
        newOrgans.push(value);
      } else {
        newOrgans = newOrgans.filter(o => o !== value);
      }
      setDonorForm({ ...donorForm, organsWillingToDonate: newOrgans });
    } else if (type === 'checkbox') {
      setDonorForm({ ...donorForm, [id]: checked });
    } else {
      setDonorForm({ ...donorForm, [id]: value });
    }
  };

  const handleRecipientInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRecipientForm({ ...recipientForm, [id]: checked });
    } else {
      setRecipientForm({ ...recipientForm, [id]: value });
    }
  };

  const handleSearchInputChange = (e) => {
    const { id, value } = e.target;
    setSearchFilters({ ...searchFilters, [id.replace('search-', '')]: value });
  };

  const submitDonorForm = (e) => {
    e.preventDefault();
    if (!donorForm.consent) {
      alert('Please provide consent to share your information.');
      return;
    }
    axios.post('/api/donors', {
      fullName: donorForm.fullName,
      email: donorForm.email,
      phone: donorForm.phone,
      dateOfBirth: donorForm.dateOfBirth,
      bloodType: donorForm.bloodType,
      organsWillingToDonate: donorForm.organsWillingToDonate,
      existingMedicalConditions: donorForm.existingMedicalConditions,
      consent: donorForm.consent,
      location: {
        country: donorForm.country,
        state: donorForm.state,
        city: donorForm.city,
      },
    })
    .then(() => {
      alert('Donor registration submitted successfully!');
      setDonorForm({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        bloodType: '',
        organsWillingToDonate: [],
        existingMedicalConditions: '',
        consent: false,
        country: 'India',
        state: '',
        city: '',
      });
    })
    .catch(err => {
      alert('Error submitting donor registration: ' + err.message);
    });
  };

  const submitRecipientForm = (e) => {
    e.preventDefault();
    if (!recipientForm.consent) {
      alert('Please provide consent to share your information.');
      return;
    }
    axios.post('/api/recipients', {
      fullName: recipientForm.fullName,
      email: recipientForm.email,
      phone: recipientForm.phone,
      dateOfBirth: recipientForm.dateOfBirth,
      bloodType: recipientForm.bloodType,
      organNeeded: recipientForm.organNeeded,
      urgencyLevel: recipientForm.urgencyLevel,
      medicalRecordId: recipientForm.medicalRecordId,
      hospital: {
        name: recipientForm.hospitalName,
        country: recipientForm.hospitalCountry,
        state: recipientForm.hospitalState,
      },
      consent: recipientForm.consent,
    })
    .then(() => {
      alert('Recipient registration submitted successfully!');
      setRecipientForm({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        bloodType: '',
        organNeeded: '',
        urgencyLevel: 'low',
        medicalRecordId: '',
        hospitalName: '',
        hospitalCountry: '',
        hospitalState: '',
        consent: false,
      });
    })
    .catch(err => {
      alert('Error submitting recipient registration: ' + err.message);
    });
  };

  const submitSearchForm = (e) => {
    e.preventDefault();
    const params = {};
    if (searchFilters.organ) params.organ = searchFilters.organ;
    if (searchFilters.bloodType) params.bloodType = searchFilters.bloodType;
    if (searchFilters.location) params.location = searchFilters.location;

    axios.get('/api/donors', { params })
      .then(res => {
        setSearchResults(res.data);
      })
      .catch(err => {
        alert('Error searching donors: ' + err.message);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="navbar text-white shadow-lg bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-heartbeat text-2xl"></i>
            <span className="text-xl font-bold">LifeShare</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="hover:text-gray-200 transition">Home</a>
            <a href="#about" className="hover:text-gray-200 transition">About</a>
            <button onClick={() => setActiveTab('donor')} className="hover:text-gray-200 transition">Register</button>
            <a href="#search" className="hover:text-gray-200 transition">Search</a>
            <a href="#hospitals" className="hover:text-gray-200 transition">Hospitals</a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 px-4 py-2">
            <a href="#home" className="block py-2 text-white hover:bg-gray-700 rounded px-2">Home</a>
            <a href="#about" className="block py-2 text-white hover:bg-gray-700 rounded px-2">About</a>
            <button onClick={() => { setActiveTab('donor'); setMobileMenuOpen(false); }} className="block py-2 text-white hover:bg-gray-700 rounded px-2 text-left w-full">Register</button>
            <a href="#search" className="block py-2 text-white hover:bg-gray-700 rounded px-2">Search</a>
            <a href="#hospitals" className="block py-2 text-white hover:bg-gray-700 rounded px-2">Hospitals</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://placehold.co/')", height: '60vh'}}>
        <div className="px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Organ Donation Saves Lives</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our network of donors and recipients to create life-saving connections with your gift of organ donation.</p>
          <div className="space-x-4">
            <button onClick={() => setActiveTab('donor')} className="btn-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Become a Donor</button>
            <a href="#about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-block">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Our Organ Donation System</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-gray-50 p-6 rounded-lg shadow-md text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-500 text-4xl mb-4">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Life-Saving Matches</h3>
              <p className="text-gray-600">Our advanced matching algorithm connects donors with recipients based on medical compatibility, location, and urgency.</p>
            </div>
            <div className="card bg-gray-50 p-6 rounded-lg shadow-md text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-purple-500 text-4xl mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure &amp; Private</h3>
              <p className="text-gray-600">Your personal and medical information is protected with the highest security standards and strict confidentiality.</p>
            </div>
            <div className="card bg-gray-50 p-6 rounded-lg shadow-md text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Nationwide Network</h3>
              <p className="text-gray-600">Connected with over 500 hospitals and transplant centers across the country to facilitate timely transplants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Pledge as Donor or Recipient</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b">
              <button
                className={`tab-btn py-4 px-6 font-medium ${activeTab === 'donor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => handleTabChange('donor')}
              >
                Donor Pledge
              </button>
              <button
                className={`tab-btn py-4 px-6 font-medium ${activeTab === 'recipient' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => handleTabChange('recipient')}
              >
                Recipient Pledge
              </button>
            </div>

            {/* Donor Form */}
            {activeTab === 'donor' && (
              <form onSubmit={submitDonorForm} className="grid md:grid-cols-2 gap-6 p-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={donorForm.fullName}
                      onChange={handleDonorInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={donorForm.email}
                      onChange={handleDonorInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={donorForm.phone}
                      onChange={handleDonorInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={donorForm.dateOfBirth}
                      onChange={handleDonorInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Medical Information</h3>
                  <div className="mb-4">
                    <label htmlFor="bloodType" className="block text-gray-700 mb-2">Blood Type</label>
                    <select
                      id="bloodType"
                      value={donorForm.bloodType}
                      onChange={handleDonorInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Organs Willing to Donate</label>
                    <div className="space-y-2">
                      {['kidney', 'liver', 'lung', 'pancreas', 'heart', 'intestine'].map((organ) => (
                        <label key={organ} className="flex items-center">
                          <input
                            type="checkbox"
                            name="organsWillingToDonate"
                            value={organ}
                            checked={donorForm.organsWillingToDonate.includes(organ)}
                            onChange={handleDonorInputChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">{organ.charAt(0).toUpperCase() + organ.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="existingMedicalConditions" className="block text-gray-700 mb-2">Existing Medical Conditions</label>
                    <textarea
                      id="existingMedicalConditions"
                      value={donorForm.existingMedicalConditions}
                      onChange={handleDonorInputChange}
                      rows="3"
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={donorForm.consent}
                      onChange={handleDonorInputChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                      required
                    />
                    <label htmlFor="consent" className="ml-2 text-gray-700">I consent to share my information with transplant centers</label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">Location Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                      <select
                        id="country"
                        value={donorForm.country}
                        onChange={handleDonorInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="India">India</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-gray-700 mb-2">State/Region</label>
                      <input
                        type="text"
                        id="state"
                        value={donorForm.state}
                        onChange={handleDonorInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        value={donorForm.city}
                        onChange={handleDonorInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 text-center">
                  <button type="submit" className="btn-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Submit Donor Registration
                  </button>
                </div>
              </form>
            )}

            {/* Recipient Form */}
            {activeTab === 'recipient' && (
              <form onSubmit={submitRecipientForm} className="grid md:grid-cols-2 gap-6 p-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Patient Information</h3>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={recipientForm.fullName}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={recipientForm.email}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={recipientForm.phone}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={recipientForm.dateOfBirth}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Medical Information</h3>
                  <div className="mb-4">
                    <label htmlFor="bloodType" className="block text-gray-700 mb-2">Blood Type</label>
                    <select
                      id="bloodType"
                      value={recipientForm.bloodType}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="organNeeded" className="block text-gray-700 mb-2">Organ Needed</label>
                    <select
                      id="organNeeded"
                      value={recipientForm.organNeeded}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Organ</option>
                      <option value="kidney">Kidney</option>
                      <option value="liver">Liver</option>
                      <option value="lung">Lung</option>
                      <option value="heart">Heart</option>
                      <option value="pancreas">Pancreas</option>
                      <option value="intestine">Intestine</option>
                      <option value="cornea">Cornea</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="urgencyLevel" className="block text-gray-700 mb-2">Urgency Level</label>
                    <select
                      id="urgencyLevel"
                      value={recipientForm.urgencyLevel}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="low">Low (can wait months/years)</option>
                      <option value="medium">Medium (needed in weeks/months)</option>
                      <option value="high">High (needed in days/weeks)</option>
                      <option value="critical">Critical (immediate need)</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="medicalRecordId" className="block text-gray-700 mb-2">Medical Record ID</label>
                    <input
                      type="text"
                      id="medicalRecordId"
                      value={recipientForm.medicalRecordId}
                      onChange={handleRecipientInputChange}
                      className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">Hospital Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="hospitalName" className="block text-gray-700 mb-2">Hospital/Clinic Name</label>
                      <input
                        type="text"
                        id="hospitalName"
                        value={recipientForm.hospitalName}
                        onChange={handleRecipientInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hospitalCountry" className="block text-gray-700 mb-2">Country</label>
                      <select
                        id="hospitalCountry"
                        value={recipientForm.hospitalCountry}
                        onChange={handleRecipientInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="hospitalState" className="block text-gray-700 mb-2">State/Region</label>
                      <input
                        type="text"
                        id="hospitalState"
                        value={recipientForm.hospitalState}
                        onChange={handleRecipientInputChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={recipientForm.consent}
                    onChange={handleRecipientInputChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 text-gray-700">I consent to share my medical information with potential donors and transplant centers</label>
                </div>

                <div className="md:col-span-2 text-center">
                  <button type="submit" className="btn-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Submit Recipient Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Search for Organ Donors</h2>
          <form onSubmit={submitSearchForm} className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label htmlFor="organ" className="block text-gray-700 mb-2">Organ Needed</label>
              <select
                id="organ"
                value={searchFilters.organ}
                onChange={handleSearchInputChange}
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Organs</option>
                <option value="kidney">Kidney</option>
                <option value="liver">Liver</option>
                <option value="lung">Lung</option>
                <option value="heart">Heart</option>
                <option value="pancreas">Pancreas</option>
                <option value="intestine">Intestine</option>
              </select>
            </div>
            <div>
              <label htmlFor="bloodType" className="block text-gray-700 mb-2">Blood Type</label>
              <select
                id="bloodType"
                value={searchFilters.bloodType}
                onChange={handleSearchInputChange}
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Country, State or City"
                value={searchFilters.location}
                onChange={handleSearchInputChange}
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-3 text-center mt-4">
              <button type="submit" className="btn-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Search Donors
              </button>
            </div>
          </form>

          <div id="searchResults" className="border-t pt-6">
            {searchResults.length === 0 ? (
              <div id="noResultsMessage" className="text-center py-8">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-medium text-gray-600">No results found</h3>
                <p className="text-gray-500">Try adjusting your search filters to find donors.</p>
              </div>
            ) : (
              <div id="donorList" className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Potential Donors</h3>
                {searchResults.map((donor) => (
                  <div key={donor._id} className="card bg-gray-50 p-6 rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="text-lg font-bold mb-2">{donor.fullName}</h4>
                    <p><strong>Blood Type:</strong> {donor.bloodType}</p>
                    <p><strong>Organs Willing to Donate:</strong> {donor.organsWillingToDonate.join(', ')}</p>
                    <p><strong>Location:</strong> {donor.location.city}, {donor.location.state}, {donor.location.country}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section id="hospitals" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Partner Hospitals &amp; Transplant Centers</h2>
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="text-gray-600">Our network of certified transplant centers adhere to the highest medical and ethical standards in organ donation and transplantation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hospitals.map((hospital) => (
              <div key={hospital._id} className="card bg-white p-6 rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                {hospital.imageUrl && (
                  <img src={hospital.imageUrl} alt={hospital.name} className="w-full h-48 object-cover rounded mb-4" />
                )}
                <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                <p className="text-gray-600 mb-2"><i className="fas fa-map-marker-alt text-blue-500 mr-2"></i> {hospital.address}</p>
                <p className="text-gray-600 mb-2"><i className="fas fa-phone text-blue-500 mr-2"></i> {hospital.phone}</p>
                <p className="text-gray-600 mb-4"><i className="fas fa-star text-yellow-400 mr-2"></i> {hospital.rating.toFixed(1)}</p>
                <p className="text-gray-700">{hospital.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#search" className="btn-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block">
              View All Partner Hospitals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
