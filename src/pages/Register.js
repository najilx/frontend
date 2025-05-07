import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    address: '',
    profile_picture: null,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.username)                e.username = 'Required';
    if (form.password !== form.password2) e.password2 = 'Passwords must match';
    return e;
  };

  const handleChange = (field, value) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) return setErrors(e2);

    const data = new FormData();
    for (let k in form) if (form[k] != null) data.append(k, form[k]);

    try {
      await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        body: data,
      });
      alert('Registered! Please log in.');
      nav('/login');
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              className="form-control"
              value={form.username}
              onChange={e => handleChange('username', e.target.value)}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          {/* First & Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                value={form.first_name}
                onChange={e => handleChange('first_name', e.target.value)}
              />
              {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                value={form.last_name}
                onChange={e => handleChange('last_name', e.target.value)}
              />
              {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={form.date_of_birth}
                onChange={e => handleChange('date_of_birth', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={form.gender}
                onChange={e => handleChange('gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="form-group mb-3">
            <label>Address</label>
            <input
              className="form-control"
              value={form.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          </div>

          {/* Password & Confirm */}
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={form.password2}
                onChange={e => handleChange('password2', e.target.value)}
              />
              {errors.password2 && <div className="text-danger">{errors.password2}</div>}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="form-group mb-4">
            <label>Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={e => handleChange('profile_picture', e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
