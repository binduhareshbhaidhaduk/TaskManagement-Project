import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import './Contact.css';
import { GiRotaryPhone } from 'react-icons/gi';
import { MdOutlineEmail } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addContactMessage } from '../../Services/Action/taskAction';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContactMessage(formData));
        setFormData({ email: '', name: '', message: '' }); 
    };

    return (
        <div className="container contact-page">
            {/* Contact Information Section */}
            <div className="contact-info-section container mt-4">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="info-card text-center p-3 border rounded" style={{ minHeight: '180px' }}>
                            <IoLocationOutline className="icon mb-3" style={{ fontSize: '2rem' }} />
                            <h3 className="h5">OUR MAIN OFFICE</h3>
                            <p>SoHo 94 Broadway St<br />New York, NY 1001</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="info-card text-center p-3 border rounded" style={{ minHeight: '180px' }}>
                            <IoCallOutline className="icon mb-3" style={{ fontSize: '2rem' }} />
                            <h3 className="h5">PHONE NUMBER</h3>
                            <p>234-9876-5400<br />888-0123-4567 (Toll Free)</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="info-card text-center p-3 border rounded" style={{ minHeight: '180px' }}>
                            <GiRotaryPhone className="icon mb-3" style={{ fontSize: '2rem' }} />
                            <h3 className="h5">FAX</h3>
                            <p>1-234-567-8900</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="info-card text-center p-3 border rounded" style={{ minHeight: '180px' }}>
                            <MdOutlineEmail className="icon mb-3" style={{ fontSize: '2rem' }} />
                            <h3 className="h5">EMAIL</h3>
                            <p><a href="mailto:hello@theme.com">workflowhub@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-form-section mt-5">
                <form className="contact-form p-4 border rounded" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="form-title text-center mb-4">
                        <h2>Contact Us</h2>
                        <p>We love to hear from you! Please fill out the form below.</p>
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control w-100"
                            placeholder="Enter a valid email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="form-control  w-100"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control  w-100"
                            placeholder="Enter your message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
