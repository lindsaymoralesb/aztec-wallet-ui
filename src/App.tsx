import React, { useState } from 'react';
import { createPXEClient, waitForPXE, PXE } from "@aztec/aztec.js";

const App = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [connected, setConnected] = useState(false);
    const [pxe, setPxe] = useState<PXE | null>(null);
    const [accounts, setAccounts] = useState<string[]>([]);
    const [blockNumber, setBlockNumber] = useState<number | null>(null);

    const setupSandbox = async () => {
        const PXE_URL = 'http://localhost:8080';
        const pxeClient = createPXEClient(PXE_URL);
        await waitForPXE(pxeClient);
        return pxeClient;
    };

    const handleConnect = async () => {
        setupSandbox().then((pxeClient) => {
            setPxe(pxeClient);
            pxeClient.getRegisteredAccounts().then((registeredAccounts) => {
                setAccounts(registeredAccounts.map(account => account.toString()));
            })
            pxeClient.getBlockNumber().then((currentBlockNumber) => {
                setBlockNumber(currentBlockNumber);
            })
            setConnected(true);
        }).catch((error) => {
            console.error("Failed to connect:", error);
            alert("Failed to connect to Aztec network. Check console for details.");
        });
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Aztec Wallet</h2>
            {!connected ? (
                <button
                    onClick={handleConnect}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Connect to Aztec
                </button>
            ) : (
                <div>
                    <div style={{ marginBottom: '20px' }}>
                        {['overview', 'send', 'bridge'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '10px',
                                    marginRight: '10px',
                                    backgroundColor: activeTab === tab ? '#ddd' : '#F1F1F1',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'overview' && (
                        <div>
                            <p>Connected to Aztec</p>
                            <p>Block Number: {blockNumber}</p>
                            <p>Registered Accounts:</p>
                            <ul>
                                {accounts.map((account, index) => (
                                    <li key={index}>{account}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'send' && (
                        <p>Send tokens functionality will be implemented here</p>
                    )}
                    {activeTab === 'bridge' && (
                        <p>Bridge tokens between Ethereum and Aztec will be implemented here</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
