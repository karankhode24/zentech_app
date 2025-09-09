// src/App.jsx
import { useEffect, useState } from "react";
import applicationData from "./data/applicationData";

import LoginPage from "./components/auth/LoginPage";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import UserList from "./components/users/UserList";
import UserDetail from "./components/users/UserDetail";
import AddUserModal from "./components/users/modals/AddUserModal";
import UserEditModal from "./components/users/modals/UserEditModal";
import DeleteConfirmationModal from "./components/users/modals/DeleteConfirmationModal";
import ToastContainer from "./components/toast/ToastContainer";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState({ name: "Hi Karan", role: "System Administrator" });
  const [activeTab, setActiveTab] = useState("users");
  const [currentView, setCurrentView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(applicationData.users);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Init: always start unauthenticated and load dark mode preference
  useEffect(() => {
    localStorage.removeItem("Zentech-auth");
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem("Zentech-dark-mode");
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Update document class when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  // Toast helpers
  const addToast = (message, type = "success") =>
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  // Dark mode toggle
  const handleToggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("Zentech-dark-mode", JSON.stringify(newDarkMode));
  };

  // Auth
  const handleLogin = (remember) => {
    setIsAuthenticated(true);
    if (remember) localStorage.setItem("Zentech-auth", "true");
    addToast("Welcome back! You have successfully signed in.", "success");
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("Zentech-auth");
    addToast("You have been logged out successfully.", "success");
  };

  // Navigation / views
  const handleUserClick = (u) => {
    setSelectedUser(u);
    setCurrentView("detail");
  };
  const handleBack = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };
  const handleTabChange = (tab) => {
    if (tab === "roles") return addToast("Roles management is coming soon!", "info");
    setActiveTab(tab);
    handleBack();
  };

  // User actions
  const handleToggleActive = (userId, active) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active } : u))
    );
    const u = users.find((x) => x.id === userId);
    if (u) addToast(`${u.fullName} has been ${active ? "activated" : "deactivated"}.`);
  };

  const handleEditUser = (u) => {
    setUserToEdit(u);
    setShowEditModal(true);
  };

  const handleCreateUser = () => setShowAddUserModal(true);

  const handleSaveUser = (userId, formData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...formData } : u))
    );
    setShowEditModal(false);
    setUserToEdit(null);
    if (selectedUser?.id === userId)
      setSelectedUser({ ...selectedUser, ...formData });
    addToast("User information has been updated successfully.");
  };

  const handleSaveNewUser = (formData, selectedApps) => {
    const newUser = {
      ...formData,
      id: Math.max(...users.map((u) => u.id)) + 1,
      active: true,
      lastAccessed: "Never",
      lastLogin: null,
      createdDate: new Date().toISOString(),
      applications: selectedApps,
    };
    setUsers((prev) => [...prev, newUser]);
    setShowAddUserModal(false);
    addToast("New user has been created successfully.");
  };

  const handleDeleteUser = (u) => {
    setUserToDelete(u);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) handleBack();
    addToast("User has been deleted successfully.");
  };

  // Apps
  const handleAssignApp = (userId, appData) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, applications: [...(u.applications || []), appData] }
          : u
      )
    );
    if (selectedUser?.id === userId) {
      setSelectedUser({
        ...selectedUser,
        applications: [...(selectedUser.applications || []), appData],
      });
    }
    addToast(`${appData.name} has been assigned successfully.`);
  };

  const handleRemoveApp = (userId, appCode) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              applications: (u.applications || []).filter(
                (a) => a.code !== appCode
              ),
            }
          : u
      )
    );
    if (selectedUser?.id === userId) {
      const removedApp = selectedUser.applications?.find(
        (a) => a.code === appCode
      );
      setSelectedUser({
        ...selectedUser,
        applications: (selectedUser.applications || []).filter(
          (a) => a.code !== appCode
        ),
      });
      if (removedApp) addToast(`${removedApp.name} access has been removed.`);
    }
  };

  // Auth gate
  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

  // Main content
  const content =
    activeTab !== "users" ? (
      <div className="container">
        <div className="text-center py-5">
          <h3>Roles Management</h3>
          <p className="text-muted">This feature is coming soon!</p>
        </div>
      </div>
    ) : currentView === "detail" ? (
      <UserDetail
        user={selectedUser}
        onBack={handleBack}
        onEditUser={handleEditUser}
        onAssignApp={handleAssignApp}
        onRemoveApp={handleRemoveApp}
        availableApps={applicationData.availableApplications}
      />
    ) : (
      <UserList
        users={users}
        onUserClick={handleUserClick}
        onToggleActive={handleToggleActive}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onCreateUser={handleCreateUser}
      />
    );

  return (
    <div className={`app Zentech-theme ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header user={user} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      {content}

      <AddUserModal
        show={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleSaveNewUser}
        availableApps={applicationData.availableApplications}
      />

      <UserEditModal
        show={showEditModal}
        user={userToEdit}
        onClose={() => {
          setShowEditModal(false);
          setUserToEdit(null);
        }}
        onSave={handleSaveUser}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        user={userToDelete}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}