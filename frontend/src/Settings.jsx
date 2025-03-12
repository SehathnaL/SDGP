import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

const Card = ({ children }) => <div className="card">{children}</div>;
const CardContent = ({ children }) => <div className="card-content">{children}</div>;
const Label = ({ children }) => <label className="label">{children}</label>;
const Input = ({ type = "text", placeholder }) => (
    <input type={type} placeholder={placeholder} className="input" />
);

const Button = ({ children, variant, className = "" }) => (
    <button className={`button button-${variant} ${className}`}>{children}</button>
);

const Switch = ({ checked, onCheckedChange }) => (
    <label className="switch">
        <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
        <span className="slider"></span>
    </label>
);

const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [appNotifications, setAppNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [locationSharing, setLocationSharing] = useState(false);
    const [searchEngineIndexing, setSearchEngineIndexing] = useState(false);
    const [messagePrivacy, setMessagePrivacy] = useState("Everyone");
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [loginAlerts, setLoginAlerts] = useState(false);
    const [backupCodes, setBackupCodes] = useState(false);
    const [deviceManagement, setDeviceManagement] = useState(false);
    const [fontSize, setFontSize] = useState("Medium");
    const [language, setLanguage] = useState("English");
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [subscriptionStatus, setSubscriptionStatus] = useState(true);

    return (
        <div className={`settings ${darkMode ? 'settings-dark' : ''}`}>
            <aside className="sidebar">
                <img src="./logo12.png" alt="Logo" className="logo" />
                <ul>
                    <li>
                        <i className="fas fa-home"></i> <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <i className="fas fa-comments"></i> <Link to="/interview-history">Interview History</Link>
                    </li>
                    <li>
                        <i className="fas fa-user"></i> <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <i className="fas fa-cog"></i> <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </aside>
            <div className="settings-main">
                <div className="settings-grid">
                    <Card>
                        <CardContent>
                            <h3>Account Settings</h3>
                            <Label>Name</Label>
                            <Input placeholder="John Doe" />
                            <Label>Email</Label>
                            <Input type="email" placeholder="johndoe@example.com" />
                            <Label>Password</Label>
                            <Input type="password" placeholder="********" />
                            <Button variant="outline">Change Password</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Privacy Settings</h3>
                            <div className="label-switch-container">
                                <Label>Profile Visibility</Label>
                                <Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />
                            </div>
                            <div className="label-switch-container">
                                <Label>Location Sharing</Label>
                                <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
                            </div>
                            <div className="label-switch-container">
                                <Label>Search Engine Indexing</Label>
                                <Switch checked={searchEngineIndexing} onCheckedChange={setSearchEngineIndexing} />
                            </div>
                            <Label>Message Privacy</Label>
                            <select className="select" value={messagePrivacy} onChange={(e) => setMessagePrivacy(e.target.value)}>
                                <option value="Everyone">Everyone</option>
                                <option value="Friends Only">Friends Only</option>
                                <option value="No One">No One</option>
                            </select>
                            <Button variant="destructive">Delete Account</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Security Settings</h3>
                            <div className="label-switch-container">
                                <Label>Two-Factor Authentication</Label>
                                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                            </div>
                            <Label>Password Recovery Email</Label>
                            <Input type="email" placeholder="recovery@example.com" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} />
                            <div className="label-switch-container">
                                <Label>Login Alerts</Label>
                                <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                            </div>
                            <div className="label-switch-container">
                                <Label>Backup Codes</Label>
                                <Switch checked={backupCodes} onCheckedChange={setBackupCodes} />
                            </div>
                            <div className="label-switch-container">
                                <Label>Device Management</Label>
                                <Switch checked={deviceManagement} onCheckedChange={setDeviceManagement} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Notifications</h3>
                            <div className="label-switch-container">
                                <Label>Email Notifications</Label>
                                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                            </div>
                            <div className="label-switch-container">
                                <Label>App Notifications</Label>
                                <Switch checked={appNotifications} onCheckedChange={setAppNotifications} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Appearance Settings</h3>
                            <div className="label-switch-container">
                                <Label>Dark Mode</Label>
                                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                            </div>
                            <Label>Font Size</Label>
                            <select className="select" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                            <Label>Language</Label>
                            <select className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3>Payment Settings</h3>
                            <Label>Payment Method</Label>
                            <select className="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                            <div className="label-switch-container">
                                <Label>Subscription Status</Label>
                                <Switch checked={subscriptionStatus} onCheckedChange={setSubscriptionStatus} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="settings-footer">
                    <Button variant="default">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
