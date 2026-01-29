'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function AdminFormPage() {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imageUploading, setImageUploading] = useState(false);

  // Default services (your 4 services)
  const defaultServices = [
    { id: 'projects-development', title: 'Projects Development & Management' },
    { id: 'consultancy', title: 'Consultancy' },
    { id: 'architectural-design', title: 'Architectural Design and Urban Planning' },
    { id: 'facilities-pm', title: 'Organisation Facilities - PM' },
    { id: 'hospitality', title: 'Hospitality Consultancy' }
  ];

  // Services list for project dropdown
  const [servicesList, setServicesList] = useState(defaultServices);

  // Fetch services on mount (if Supabase is configured)
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title')
        .order('title');
      if (error) {
        console.log('Using default services (Supabase not configured yet)');
        return;
      }
      if (data && data.length > 0) {
        setServicesList(data);
      }
    } catch (error) {
      console.log('Using default services');
    }
  };

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    service_id: '', // Link to service
    category: 'residential',
    sector: 'high-rise',
    location: 'Dubai',
    country: 'UAE',
    client: '',
    value: '',
    year: '',
    duration: '',
    status: 'Completed',
    description: '',
    challenge: '',
    solution: '',
    features: [''],
    heroImage: '',
    heroThumbnail: '',
    galleryImages: [],
    galleryThumbnails: []
  });

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    subtitle: '',
    shortDesc: '',
    description: '',
    longDescription: '',
    heroImage: '',
    heroThumbnail: '',
    features: [{ title: '', desc: '' }],
    stats: [{ value: '', label: '' }],
    process: [{ step: '01', title: '', desc: '' }]
  });

  // Project Categories (matching header/footer navigation)
  const projectCategories = [
    { id: 'residential', name: 'Residential Buildings' },
    { id: 'commercial', name: 'Commercial & Office' },
    { id: 'mixed-use', name: 'Mixed Use Developments' },
    { id: 'hospitality', name: 'Hotels & Hospitality' },
    { id: 'renovations', name: 'Renovations' }
  ];

  // Project Sectors (matching header/footer navigation)
  const projectSectors = [
    { id: 'high-rise', name: 'High Rise Towers' },
    { id: 'villas', name: 'Villas & Master Plans' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'retail', name: 'Retail & Commercial' },
    { id: 'education', name: 'Education' },
    { id: 'oil-gas', name: 'Oil & Gas' }
  ];

  // Common Locations
  const projectLocations = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Al Ain',
    'Saudi Arabia',
    'Qatar',
    'Bahrain',
    'Kuwait',
    'Oman',
    'Other'
  ];

  const projectStatuses = ['Completed', 'In Progress', 'Upcoming'];

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Image Upload
  const uploadImage = async (file, folder, isThumbnail = false) => {
    try {
      setImageUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${isThumbnail ? 'thumb_' : ''}${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('error', 'Failed to upload image');
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleHeroImageUpload = async (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, formType === 'project' ? 'projects' : 'services');
    if (url) {
      if (formType === 'project') {
        setProjectForm(prev => ({ ...prev, heroImage: url }));
      } else {
        setServiceForm(prev => ({ ...prev, heroImage: url }));
      }
    }
  };

  const handleThumbnailUpload = async (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, formType === 'project' ? 'projects/thumbnails' : 'services/thumbnails', true);
    if (url) {
      if (formType === 'project') {
        setProjectForm(prev => ({ ...prev, heroThumbnail: url }));
      } else {
        setServiceForm(prev => ({ ...prev, heroThumbnail: url }));
      }
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const urls = [];
    for (const file of files) {
      const url = await uploadImage(file, 'projects/gallery');
      if (url) urls.push(url);
    }
    setProjectForm(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...urls] }));
  };

  const handleGalleryThumbnailUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const urls = [];
    for (const file of files) {
      const url = await uploadImage(file, 'projects/gallery/thumbnails', true);
      if (url) urls.push(url);
    }
    setProjectForm(prev => ({ ...prev, galleryThumbnails: [...prev.galleryThumbnails, ...urls] }));
  };

  const removeGalleryImage = (index, type) => {
    if (type === 'full') {
      setProjectForm(prev => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== index) }));
    } else {
      setProjectForm(prev => ({ ...prev, galleryThumbnails: prev.galleryThumbnails.filter((_, i) => i !== index) }));
    }
  };

  // Project Form Handlers
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...projectForm.features];
    newFeatures[index] = value;
    setProjectForm(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setProjectForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  const removeFeature = (index) => setProjectForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

  const submitProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('projects').insert([{
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        service_id: projectForm.service_id || null,
        category: projectForm.category,
        sector: projectForm.sector,
        location: projectForm.location,
        country: projectForm.country,
        client: projectForm.client,
        value: projectForm.value,
        year: projectForm.year,
        duration: projectForm.duration,
        status: projectForm.status,
        description: projectForm.description,
        challenge: projectForm.challenge,
        solution: projectForm.solution,
        features: projectForm.features.filter(f => f.trim() !== ''),
        hero_image: projectForm.heroImage,
        hero_thumbnail: projectForm.heroThumbnail,
        gallery_images: projectForm.galleryImages,
        gallery_thumbnails: projectForm.galleryThumbnails
      }]);
      if (error) throw error;
      showMessage('success', 'Project added successfully!');
      setProjectForm({
        title: '', subtitle: '', service_id: '', category: 'residential', sector: 'high-rise', location: 'Dubai', country: 'UAE', client: '', value: '', year: '', duration: '', status: 'Completed', description: '', challenge: '', solution: '', features: [''], heroImage: '', heroThumbnail: '', galleryImages: [], galleryThumbnails: []
      });
    } catch (error) {
      showMessage('error', error.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  // Service Form Handlers
  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceFeatureChange = (index, field, value) => {
    const newFeatures = [...serviceForm.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setServiceForm(prev => ({ ...prev, features: newFeatures }));
  };

  const addServiceFeature = () => setServiceForm(prev => ({ ...prev, features: [...prev.features, { title: '', desc: '' }] }));
  const removeServiceFeature = (index) => setServiceForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

  const handleStatChange = (index, field, value) => {
    const newStats = [...serviceForm.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setServiceForm(prev => ({ ...prev, stats: newStats }));
  };

  const addStat = () => setServiceForm(prev => ({ ...prev, stats: [...prev.stats, { value: '', label: '' }] }));
  const removeStat = (index) => setServiceForm(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));

  const handleProcessChange = (index, field, value) => {
    const newProcess = [...serviceForm.process];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setServiceForm(prev => ({ ...prev, process: newProcess }));
  };

  const addProcess = () => {
    const nextStep = String(serviceForm.process.length + 1).padStart(2, '0');
    setServiceForm(prev => ({ ...prev, process: [...prev.process, { step: nextStep, title: '', desc: '' }] }));
  };
  const removeProcess = (index) => setServiceForm(prev => ({ ...prev, process: prev.process.filter((_, i) => i !== index) }));

  const submitService = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('services').insert([{
        title: serviceForm.title,
        subtitle: serviceForm.subtitle,
        short_desc: serviceForm.shortDesc,
        description: serviceForm.description,
        long_description: serviceForm.longDescription,
        hero_image: serviceForm.heroImage,
        hero_thumbnail: serviceForm.heroThumbnail,
        features: serviceForm.features.filter(f => f.title.trim() !== ''),
        stats: serviceForm.stats.filter(s => s.value.trim() !== ''),
        process: serviceForm.process.filter(p => p.title.trim() !== '')
      }]);
      if (error) throw error;
      showMessage('success', 'Service added successfully!');
      setServiceForm({
        title: '', subtitle: '', shortDesc: '', description: '', longDescription: '', heroImage: '', heroThumbnail: '', features: [{ title: '', desc: '' }], stats: [{ value: '', label: '' }], process: [{ step: '01', title: '', desc: '' }]
      });
      // Refresh services list for project dropdown
      fetchServices();
    } catch (error) {
      showMessage('error', error.message || 'Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      <header className="bg-black border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ed1b24] flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">PDC Admin</span>
                <span className="text-gray-500 text-sm block">Content Management</span>
              </div>
            </div>
            <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">← Back to Website</a>
          </div>
        </div>
      </header>

      {message.text && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          <p className="text-white font-medium">{message.text}</p>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('projects')} className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'projects' ? 'bg-[#ed1b24] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>Add Project</button>
          <button onClick={() => setActiveTab('services')} className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'services' ? 'bg-[#ed1b24] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>Add Service</button>
        </div>

        {/* PROJECT FORM */}
        {activeTab === 'projects' && (
          <form onSubmit={submitProject} className="space-y-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Project Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Title *</label>
                  <input type="text" name="title" value={projectForm.title} onChange={handleProjectChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., The Royal Atlantis" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
                  <input type="text" name="subtitle" value={projectForm.subtitle} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., Redefining Luxury" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Service Category *</label>
                  <select name="service_id" value={projectForm.service_id} onChange={handleProjectChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-[#ed1b24] focus:outline-none">
                    <option value="">-- Select Service --</option>
                    {servicesList.map(service => <option key={service.id} value={service.id}>{service.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Category *</label>
                  <select name="category" value={projectForm.category} onChange={handleProjectChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-[#ed1b24] focus:outline-none">
                    {projectCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sector *</label>
                  <select name="sector" value={projectForm.sector} onChange={handleProjectChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-[#ed1b24] focus:outline-none">
                    {projectSectors.map(sec => <option key={sec.id} value={sec.id}>{sec.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Location *</label>
                  <select name="location" value={projectForm.location} onChange={handleProjectChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-[#ed1b24] focus:outline-none">
                    {projectLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                  <input type="text" name="country" value={projectForm.country} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., UAE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select name="status" value={projectForm.status} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-[#ed1b24] focus:outline-none">
                    {projectStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
                  <input type="text" name="client" value={projectForm.client} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., Atlantis Resorts" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Value</label>
                  <input type="text" name="value" value={projectForm.value} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., $1.4B" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                  <input type="text" name="year" value={projectForm.year} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., 2021" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
                  <input type="text" name="duration" value={projectForm.duration} onChange={handleProjectChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., 36 Months" />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                <textarea name="description" value={projectForm.description} onChange={handleProjectChange} required rows={4} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none resize-none" placeholder="Project description..." />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Challenge</label>
                <textarea name="challenge" value={projectForm.challenge} onChange={handleProjectChange} rows={3} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none resize-none" placeholder="What challenges did this project face..." />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Solution</label>
                <textarea name="solution" value={projectForm.solution} onChange={handleProjectChange} rows={3} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none resize-none" placeholder="How were the challenges solved..." />
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
                <button type="button" onClick={addFeature} className="px-4 py-2 bg-[#ed1b24] text-white rounded-lg hover:bg-[#c41119] text-sm font-medium">+ Add Feature</button>
              </div>
              <div className="space-y-3">
                {projectForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., 795 Luxury Residences" />
                    {projectForm.features.length > 1 && <button type="button" onClick={() => removeFeature(index)} className="px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">×</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Images</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Hero Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleHeroImageUpload(e, 'project')} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ed1b24] file:text-white file:cursor-pointer" />
                  {projectForm.heroImage && <img src={projectForm.heroImage} alt="Hero" className="mt-3 w-full h-40 object-cover rounded-lg" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Hero Thumbnail</label>
                  <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, 'project')} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ed1b24] file:text-white file:cursor-pointer" />
                  {projectForm.heroThumbnail && <img src={projectForm.heroThumbnail} alt="Thumbnail" className="mt-3 w-32 h-24 object-cover rounded-lg" />}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Gallery Images</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ed1b24] file:text-white file:cursor-pointer" />
                {projectForm.galleryImages.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {projectForm.galleryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Gallery ${index}`} className="w-24 h-24 object-cover rounded-lg" />
                        <button type="button" onClick={() => removeGalleryImage(index, 'full')} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading || imageUploading} className="w-full py-4 bg-[#ed1b24] text-white font-bold text-lg rounded-xl hover:bg-[#c41119] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : imageUploading ? 'Uploading...' : 'Save Project'}
            </button>
          </form>
        )}

        {/* SERVICE FORM */}
        {activeTab === 'services' && (
          <form onSubmit={submitService} className="space-y-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Service Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Service Title *</label>
                  <input type="text" name="title" value={serviceForm.title} onChange={handleServiceChange} required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., Project Management" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
                  <input type="text" name="subtitle" value={serviceForm.subtitle} onChange={handleServiceChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="e.g., From Vision to Reality" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                  <input type="text" name="shortDesc" value={serviceForm.shortDesc} onChange={handleServiceChange} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Brief description..." />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                <textarea name="description" value={serviceForm.description} onChange={handleServiceChange} required rows={3} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none resize-none" placeholder="Service description..." />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Long Description</label>
                <textarea name="longDescription" value={serviceForm.longDescription} onChange={handleServiceChange} rows={5} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none resize-none" placeholder="Detailed description..." />
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Features</h2>
                <button type="button" onClick={addServiceFeature} className="px-4 py-2 bg-[#ed1b24] text-white rounded-lg hover:bg-[#c41119] text-sm font-medium">+ Add Feature</button>
              </div>
              <div className="space-y-4">
                {serviceForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <input type="text" value={feature.title} onChange={(e) => handleServiceFeatureChange(index, 'title', e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Feature title" />
                    <input type="text" value={feature.desc} onChange={(e) => handleServiceFeatureChange(index, 'desc', e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Feature description" />
                    {serviceForm.features.length > 1 && <button type="button" onClick={() => removeServiceFeature(index)} className="px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">×</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Stats</h2>
                <button type="button" onClick={addStat} className="px-4 py-2 bg-[#ed1b24] text-white rounded-lg hover:bg-[#c41119] text-sm font-medium">+ Add Stat</button>
              </div>
              <div className="space-y-4">
                {serviceForm.stats.map((stat, index) => (
                  <div key={index} className="flex gap-3">
                    <input type="text" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} className="w-32 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="200+" />
                    <input type="text" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Projects Completed" />
                    {serviceForm.stats.length > 1 && <button type="button" onClick={() => removeStat(index)} className="px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">×</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Process Steps</h2>
                <button type="button" onClick={addProcess} className="px-4 py-2 bg-[#ed1b24] text-white rounded-lg hover:bg-[#c41119] text-sm font-medium">+ Add Step</button>
              </div>
              <div className="space-y-4">
                {serviceForm.process.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-14 h-14 bg-[#ed1b24] rounded-lg flex items-center justify-center text-white font-bold shrink-0">{step.step}</div>
                    <div className="flex-1 flex gap-3">
                      <input type="text" value={step.title} onChange={(e) => handleProcessChange(index, 'title', e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Step title" />
                      <input type="text" value={step.desc} onChange={(e) => handleProcessChange(index, 'desc', e.target.value)} className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none" placeholder="Step description" />
                    </div>
                    {serviceForm.process.length > 1 && <button type="button" onClick={() => removeProcess(index)} className="px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">×</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Images</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Hero Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleHeroImageUpload(e, 'service')} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ed1b24] file:text-white file:cursor-pointer" />
                  {serviceForm.heroImage && <img src={serviceForm.heroImage} alt="Hero" className="mt-3 w-full h-40 object-cover rounded-lg" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Hero Thumbnail</label>
                  <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, 'service')} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ed1b24] file:text-white file:cursor-pointer" />
                  {serviceForm.heroThumbnail && <img src={serviceForm.heroThumbnail} alt="Thumbnail" className="mt-3 w-32 h-24 object-cover rounded-lg" />}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || imageUploading} className="w-full py-4 bg-[#ed1b24] text-white font-bold text-lg rounded-xl hover:bg-[#c41119] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : imageUploading ? 'Uploading...' : 'Save Service'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
