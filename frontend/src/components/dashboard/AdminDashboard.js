// import React, { useState } from 'react';

// const AdminDashboard = ({ user }) => {
//     const [activeTab, setActiveTab] = useState('reports');
//     const [reports, setReports] = useState([
//         { id: 1, item: 'iPhone 13', status: 'Lost', user: 'user1@example.com', date: '2025-08-09' },
//         { id: 2, item: 'Keys', status: 'Found', user: 'user2@example.com', date: '2025-08-08' },
//         { id: 3, item: 'Backpack', status: 'Lost', user: 'user3@example.com', date: '2025-08-07' },
//     ]);
//     const [users, setUsers] = useState([
//         { id: 1, name: 'user1', email: 'user1@example.com', role: 'user', status: 'Active' },
//         { id: 2, name: 'user2', email: 'user2@example.com', role: 'user', status: 'Active' },
//         { id: 3, name: 'admin', email: 'admin@example.com', role: 'admin', status: 'Active' },
//     ]);
//      const [tickets, setTickets] = useState([
//         { id: 1, subject: 'Cannot upload photo', user: 'user1@example.com', status: 'Open' },
//         { id: 2, subject: 'Item marked found by mistake', user: 'user2@example.com', status: 'Open' },
//     ]);

//     const handleResolve = (id, type) => {
//         if (type === 'report') {
//             setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
//         } else if (type === 'ticket') {
//             setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
//         }
//     };

//     const handleDelete = (id, type) => {
//         if (type === 'report') setReports(reports.filter(r => r.id !== id));
//         else if (type === 'user') setUsers(users.filter(u => u.id !== id));
//     };

//     const handleToggleUserStatus = (id) => {
//         setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
//     };

//     return (
//         <main className="main-container dashboard-page-new">
//             <div className="dashboard-header">
//                 <h2 className="dashboard-title">Admin Dashboard - {user.username || user.email.split('@')[0]}</h2>
//             </div>
//             <div className="admin-stats">
//                 <div className="stat-card"><h4>Total Reports</h4><p>{reports.length}</p></div>
//                 <div className="stat-card"><h4>Unresolved</h4><p>{reports.filter(r => r.status !== 'Resolved').length}</p></div>
//                 <div className="stat-card"><h4>Total Users</h4><p>{users.length}</p></div>
//                 <div className="stat-card"><h4>Support Tickets</h4><p>{tickets.filter(t => t.status === 'Open').length}</p></div>
//             </div>
//             <div className="dashboard-tabs">
//                 <button onClick={() => setActiveTab('reports')} className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}>Manage Reports</button>
//                 <button onClick={() => setActiveTab('users')} className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}>Manage Users</button>
//                 <button onClick={() => setActiveTab('tickets')} className={`tab-btn ${activeTab === 'tickets' ? 'active' : ''}`}>Support Tickets</button>
//             </div>
//             <div className="admin-content">
//                 {activeTab === 'reports' && (
//                     <table className="admin-table">
//                          <thead><tr><th>Item</th><th>Status</th><th>User</th><th>Date</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {reports.map(report => (
//                                 <tr key={report.id}>
//                                     <td>{report.item}</td>
//                                     <td><span className={`item-card-status ${report.status.toLowerCase()}`}>{report.status}</span></td>
//                                     <td>{report.user}</td>
//                                     <td>{report.date}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleResolve(report.id, 'report')} className="admin-action-btn" disabled={report.status === 'Resolved'}>Resolve</button>
//                                         <button onClick={() => handleDelete(report.id, 'report')} className="admin-action-btn delete">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 {activeTab === 'users' && (
//                      <table className="admin-table">
//                          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {users.map(user => (
//                                 <tr key={user.id}>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td>{user.status}</td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleToggleUserStatus(user.id)} className={`admin-action-btn ${user.status === 'Blocked' ? 'unblock' : 'block'}`}>{user.status === 'Active' ? 'Block' : 'Unblock'}</button>
//                                         <button onClick={() => handleDelete(user.id, 'user')} className="admin-action-btn delete">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 {activeTab === 'tickets' && (
//                      <table className="admin-table">
//                          <thead><tr><th>Subject</th><th>User</th><th>Status</th><th>Actions</th></tr></thead>
//                          <tbody>
//                             {tickets.map(ticket => (
//                                 <tr key={ticket.id}>
//                                     <td>{ticket.subject}</td>
//                                     <td>{ticket.user}</td>
//                                     <td><span className={`item-card-status ${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
//                                     <td className="admin-action-cell">
//                                         <button onClick={() => handleResolve(ticket.id, 'ticket')} className="admin-action-btn" disabled={ticket.status === 'Resolved'}>Resolve</button>
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
// src/components/dashboard/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import itemService from '../../services/itemService';
import adminService from '../../services/adminService';
import { format } from 'date-fns'; // A library to format dates nicely

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
                // Fetch reports and users at the same time
                const [reportsResponse, usersResponse] = await Promise.all([
                    itemService.getItems(),
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
    
    // The "tickets" tab is removed for now as it has no backend
    // You can add it back later following a similar pattern

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
                                    <td>{format(new Date(report.date), 'MMM dd, yyyy')}</td>
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