

// import React, { useState, useEffect } from 'react';
// import itemService from '../../services/itemService';
// import adminService from '../../services/adminService';
// import { format } from 'date-fns'; // A library to format dates nicely

// const AdminDashboard = ({ user }) => {
//     const [activeTab, setActiveTab] = useState('reports');
//     const [reports, setReports] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 // Fetch reports and users at the same time
//                 const [reportsResponse, usersResponse] = await Promise.all([
//                     itemService.getItems(),
//                     adminService.getAllUsers()
//                 ]);
//                 setReports(reportsResponse.data);
//                 setUsers(usersResponse.data);
//                 setError('');
//             } catch (err) {
//                 setError('Failed to fetch admin data.');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleDelete = async (id, type) => {
//         if (!window.confirm('Are you sure you want to delete this?')) return;

//         try {
//             if (type === 'report') {
//                 await adminService.deleteItem(id);
//                 setReports(reports.filter(r => r._id !== id));
//             } else if (type === 'user') {
//                 await adminService.deleteUser(id);
//                 setUsers(users.filter(u => u._id !== id));
//             }
//         } catch (err) {
//             alert('Failed to delete.');
//             console.error(err);
//         }
//     };
    
//     // The "tickets" tab is removed for now as it has no backend
//     // You can add it back later following a similar pattern

//     if (isLoading) return <p>Loading Admin Dashboard...</p>;
//     if (error) return <p className="auth-error">{error}</p>;

//     return (
//         <main className="main-container dashboard-page-new">
//             <div className="dashboard-header">
//                 <h2 className="dashboard-title">Admin Dashboard - {user.username}</h2>
//             </div>
//             <div className="admin-stats">
//                 <div className="stat-card"><h4>Total Reports</h4><p>{reports.length}</p></div>
//                 <div className="stat-card"><h4>Total Users</h4><p>{users.length}</p></div>
//             </div>
//             <div className="dashboard-tabs">
//                 <button onClick={() => setActiveTab('reports')} className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}>Manage Reports</button>
//                 <button onClick={() => setActiveTab('users')} className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}>Manage Users</button>
//             </div>
//             <div className="admin-content">
//                 {activeTab === 'reports' && (
//                     <table className="admin-table">
//                          <thead><tr><th>Item</th><th>Status</th><th>Category</th><th>User Email</th><th>Date</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {reports.map(report => (
//                                 <tr key={report._id}>
//                                     <td>{report.itemName}</td>
//                                     <td><span className={`item-card-status ${report.status.toLowerCase()}`}>{report.status}</span></td>
//                                     <td>{report.category}</td>
//                                     <td>{report.user?.email || 'N/A'}</td>
//                                     <td>{format(new Date(report.date), 'MMM dd, yyyy')}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleDelete(report._id, 'report')} className="admin-action-btn delete">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 {activeTab === 'users' && (
//                      <table className="admin-table">
//                          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {users.map(user => (
//                                 <tr key={user._id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleDelete(user._id, 'user')} className="admin-action-btn delete" disabled={user.role === 'admin'}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </main>
//     );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import itemService from '../../services/itemService';
// import adminService from '../../services/adminService';
// import { format } from 'date-fns';

// const AdminDashboard = ({ user }) => {
//     const [activeTab, setActiveTab] = useState('reports');
//     const [reports, setReports] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 const [reportsResponse, usersResponse] = await Promise.all([
//                     itemService.getItems(),
//                     adminService.getAllUsers()
//                 ]);
//                 setReports(reportsResponse.data);
//                 setUsers(usersResponse.data);
//                 setError('');
//             } catch (err) {
//                 setError('Failed to fetch admin data.');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleDelete = async (id, type) => {
//         if (!window.confirm('Are you sure you want to delete this?')) return;

//         try {
//             if (type === 'report') {
//                 await adminService.deleteItem(id);
//                 setReports(reports.filter(r => r._id !== id));
//             } else if (type === 'user') {
//                 await adminService.deleteUser(id);
//                 setUsers(users.filter(u => u._id !== id));
//             }
//         } catch (err) {
//             alert('Failed to delete.');
//             console.error(err);
//         }
//     };
    
//     if (isLoading) return <p>Loading Admin Dashboard...</p>;
//     if (error) return <p className="auth-error">{error}</p>;

//     return (
//         <main className="main-container dashboard-page-new">
//             <div className="dashboard-header">
//                 <h2 className="dashboard-title">Admin Dashboard - {user.username}</h2>
//             </div>
//             <div className="admin-stats">
//                 <div className="stat-card"><h4>Total Reports</h4><p>{reports.length}</p></div>
//                 <div className="stat-card"><h4>Total Users</h4><p>{users.length}</p></div>
//             </div>
//             <div className="dashboard-tabs">
//                 <button onClick={() => setActiveTab('reports')} className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}>Manage Reports</button>
//                 <button onClick={() => setActiveTab('users')} className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}>Manage Users</button>
//             </div>
//             <div className="admin-content">
//                 {activeTab === 'reports' && (
//                     <table className="admin-table">
//                          <thead><tr><th>Item</th><th>Status</th><th>Category</th><th>User Email</th><th>Date</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {reports.map(report => (
//                                 <tr key={report._id}>
//                                     <td>{report.itemName}</td>
//                                     <td><span className={`item-card-status ${report.status.toLowerCase()}`}>{report.status}</span></td>
//                                     <td>{report.category}</td>
//                                     <td>{report.user?.email || 'N/A'}</td>
//                                     {/* --- THIS IS THE FIX --- */}
//                                     {/* It now checks if report.createdAt exists before trying to format it. */}
//                                     <td>{report.createdAt ? format(new Date(report.createdAt), 'MMM dd, yyyy') : 'N/A'}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleDelete(report._id, 'report')} className="admin-action-btn delete">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 {activeTab === 'users' && (
//                      <table className="admin-table">
//                          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {users.map(user => (
//                                 <tr key={user._id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleDelete(user._id, 'user')} className="admin-action-btn delete" disabled={user.role === 'admin'}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </main>
//     );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
// itemService is no longer needed for fetching the main list of reports
import adminService from '../../services/adminService';
import { format } from 'date-fns';

const AdminDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('reports');
    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // This now calls the admin-specific service to get ALL items
                const [reportsResponse, usersResponse] = await Promise.all([
                    adminService.getAllItems(),
                    adminService.getAllUsers()
                ]);
                setReports(reportsResponse.data);
                setUsers(usersResponse.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch admin data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;

        try {
            if (type === 'report') {
                await adminService.deleteItem(id);
                setReports(reports.filter(r => r._id !== id));
            } else if (type === 'user') {
                await adminService.deleteUser(id);
                setUsers(users.filter(u => u._id !== id));
            }
        } catch (err) {
            alert('Failed to delete.');
            console.error(err);
        }
    };
    
    if (isLoading) return <p>Loading Admin Dashboard...</p>;
    if (error) return <p className="auth-error">{error}</p>;

    return (
        <main className="main-container dashboard-page-new">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Admin Dashboard - {user.username}</h2>
            </div>
            <div className="admin-stats">
                <div className="stat-card"><h4>Total Reports</h4><p>{reports.length}</p></div>
                <div className="stat-card"><h4>Total Users</h4><p>{users.length}</p></div>
            </div>
            <div className="dashboard-tabs">
                <button onClick={() => setActiveTab('reports')} className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}>Manage Reports</button>
                <button onClick={() => setActiveTab('users')} className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}>Manage Users</button>
            </div>
            <div className="admin-content">
                {activeTab === 'reports' && (
                    <table className="admin-table">
                         <thead><tr><th>Item</th><th>Status</th><th>Category</th><th>User Email</th><th>Date</th><th>Actions</th></tr></thead>
                         <tbody>
                            {reports.map(report => (
                                <tr key={report._id}>
                                    <td>{report.itemName}</td>
                                    <td><span className={`item-card-status ${report.status.toLowerCase()}`}>{report.status}</span></td>
                                    <td>{report.category}</td>
                                    <td>{report.user?.email || 'N/A'}</td>
                                    <td>{report.createdAt ? format(new Date(report.createdAt), 'MMM dd, yyyy') : 'N/A'}</td>
                                    <td className="admin-action-cell">
                                        <button onClick={() => handleDelete(report._id, 'report')} className="admin-action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {activeTab === 'users' && (
                     <table className="admin-table">
                         <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                         <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="admin-action-cell">
                                        <button onClick={() => handleDelete(user._id, 'user')} className="admin-action-btn delete" disabled={user.role === 'admin'}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
};

export default AdminDashboard;
