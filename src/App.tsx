import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Modal } from './components/ui/Modal';
import { SubmitListingForm } from './components/forms/SubmitListingForm';
import { useModal } from './hooks/useModal';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { ListingDetail } from './pages/ListingDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import type { SubmitListingData } from './types';

function App() {
  const submitModal = useModal();

  const handleSubmitListing = (data: SubmitListingData) => {
    console.log('Submitting listing:', data);
    // In a real app, this would send the data to your backend
    alert('Thank you for your submission! We\'ll review it and get back to you within 2-3 business days.');
    submitModal.closeModal();
  };

  return (
    <Router>
      <Layout onSubmitClick={submitModal.openModal}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Modal
          isOpen={submitModal.isOpen}
          onClose={submitModal.closeModal}
          title="Submit New AI Tool"
          maxWidth="max-w-4xl"
        >
          <SubmitListingForm
            onSubmit={handleSubmitListing}
            onCancel={submitModal.closeModal}
          />
        </Modal>
      </Layout>
    </Router>
  );
}

export default App;