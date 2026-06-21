
import React, { useState } from "react";
import api from "../api/axios";
import "../styles/Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setMessage("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setMessage("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setShowChangePassword(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <h1>Welcome back, {user?.firstName || "User"}</h1>
              <p className="header-subtitle">Manage your account settings</p>
            </div>
            <div className="header-actions">
              <span className="user-email">{user?.email}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </header>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Account Details</h3>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user?.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">
                  {user?.firstName} {user?.lastName || "Not provided"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Joined</span>
                <span className="detail-value">
                  {formatDate(user?.createdAt)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Status</span>
                <span className="badge success">Active</span>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Security</h3>
              <div className="detail-item">
                <span className="detail-label">Email Verification</span>
                <span className="badge success">Verified</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Login</span>
                <span className="detail-value">
                  {formatDate(user?.lastLogin)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Login Attempts</span>
                <span className="detail-value">{user?.loginAttempts || 0}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Role</span>
                <span className="detail-value">{user?.role || "User"}</span>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button
                className="action-btn primary"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>
          </div>

          {showChangePassword && (
            <div
              className="modal-overlay"
              onClick={() => setShowChangePassword(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Change Password</h3>
                  <button
                    className="modal-close"
                    onClick={() => setShowChangePassword(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="Enter your current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password (minimum 8 characters)"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}
                  {message && <div className="success-message">{message}</div>}

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowChangePassword(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="primary-btn"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}