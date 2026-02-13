import React from 'react';
import { n8nService } from './services/n8n';
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

  const handleSubmitListing = async (data: SubmitListingData) => {
    console.log('Submitting listing:', data);
    try {
      await n8nService.submitListing(data);
      alert('Thank you for your submission! It has been sent to our workflow for review.');
      submitModal.closeModal();
    } catch (error) {
      alert('There was an error submitting your listing. Please try again.');
      console.error(error);
    }
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