import React, { useState } from 'react';
import { createPXEClient, waitForPXE, PXE } from "@aztec/aztec.js";
import './AztecWallet.css';

const AztecWallet = () => {
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
    try {
      const pxeClient = await setupSandbox();
      setPxe(pxeClient);
      
      const registeredAccounts = await pxeClient.getRegisteredAccounts();
      setAccounts(registeredAccounts.map(account => account.toString()));
      
      const currentBlockNumber = await pxeClient.getBlockNumber();
      setBlockNumber(currentBlockNumber);

      setConnected(true);
    } catch (error) {
      console.error("Failed to connect:", error);
      alert("Failed to connect to Aztec network. Check console for details.");
    }
  };

  return (
    <div className="aztec-wallet">
      <h2>Aztec Wallet</h2>
      {!connected ? (
        <button className="connect-button" onClick={handleConnect}>
          Connect to Aztec
        </button>
      ) : (
        <div>
          <div className="tab-container">
            {['overview', 'send', 'bridge'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
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
              <ul className="account-list">
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

export default AztecWallet;