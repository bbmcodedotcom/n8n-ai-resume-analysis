import React, { useState } from 'react';
import './JobCvForm.css';

const JobCvForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [requirement, setRequirement] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    const formData = new FormData();
    formData.append('job_title', jobTitle);
    formData.append('requirement', requirement);
    if (resume) formData.append('resume', resume);
    try {
      const res = await fetch('https://cari-unoriginal-unseasonably.ngrok-free.dev/webhook/cb64c85e-3c84-46a8-b5eb-7b8691255fb8', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Submit failed');
      setSuccess(true);
      setJobTitle('');
      setRequirement('');
      setResume(null);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="jobcv-form-container">
      <form className="jobcv-form" onSubmit={handleSubmit}>
        <h2>Submit Requirement and CV</h2>
        <div className="form-group">
          <label>Job title <span className="required">*</span></label>
          <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Job title" required />
        </div>
        <div className="form-group">
          <label>Requirement <span className="required">*</span></label>
          <textarea value={requirement} onChange={e => setRequirement(e.target.value)} placeholder="Job requirement" required />
        </div>
        <div className="form-group">
          <label>Resume <span className="required">*</span></label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Submitted successfully!</div>}
        <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default JobCvForm;
