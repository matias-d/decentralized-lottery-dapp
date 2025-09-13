# Lottery DApp

A decentralized lottery application built on the Binance Smart Chain (BSC) testnet, featuring ERC-20 token purchases and ERC-721 lottery tickets with automated prize distribution.

## 🎯 Overview

This DApp implements a complete lottery system where users can purchase tokens with tBNB and use those tokens to buy lottery tickets. The application features a modern React frontend with TypeScript and a robust Solidity backend deployed on BSC testnet.

## ✨ Features

### Smart Contract Features
- **ERC-20 Token (TK)**: Purchase tokens at 0.001 tBNB each
- **ERC-721 Lottery Tickets**: Buy tickets for 5 TK tokens, numbered 0-9999
- **Automated Prize Distribution**: 95% to winner, 5% to contract owner
- **Owner-only Winner Generation**: Secure random winner selection
- **Multi-round System**: Continuous lottery rounds with history tracking

### Frontend Features
- **Network Protection**: Restricted to BSC testnet only
- **MetaMask Integration**: Required for wallet connectivity
- **Multi-tab Dashboard**:
  - **Home**: Overview of lottery statistics and current round
  - **Tokens**: Token balance, purchase, and return functionality
  - **Tickets**: Ticket management and purchase history
  - **Lottery**: Participant stats and historical round data
- **Owner Controls**: Protected routes for lottery administration
- **Responsive Design**: Built with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **React 18** with **Vite** for fast development
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Atomic Design** pattern for component architecture
- **Custom Hooks** for code reusability
- **Context API** for state management
- **Desing UI** for state management

### Backend
- **Solidity** smart contracts
- **Hardhat v3** for development and deployment
- **BSC Testnet** deployment
- **Web3** integration services

## 📋 Requirements

- **Node.js** (v16 or higher)
- **MetaMask** browser extension
- **tBNB** tokens for BSC testnet
- **Git** for version control

## 🚀 Installation

### Clone the Repository
```bash
git clone https://github.com/matias-d/lottery-dapp.git
cd decentralized-lottery-dapp
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## Environment Setup

Before deploying smart contracts, create a `.env` file in the root of the project to store your **MetaMask private key**.  

The private key is used by Hardhat to sign transactions on the BSC Testnet

```bash
# smart-contracts/.env
PRIVATE_KEY="your_metamask_private_key_here
```

### Smart Contracts Setup
```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts
```

## 📁 Project Structure

```
lottery-dapp/
├── frontend/
│   ├── public/
│   │   └── abi/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── lottery/
│   │   │   │   ├── tickets/
│   │   │   │   └── tokens/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── smart-contracts/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
└── README.md
```

## 🎮 How to Use

### 1. Network Setup
- Connect MetaMask to BSC Testnet
- Ensure you have tBNB tokens for transactions

### 2. Token Purchase
- Navigate to the **Tokens** tab
- Enter the amount of TK tokens to purchase
- Confirm the transaction (0.001 tBNB per token)

### 3. Lottery Participation
- Go to the **Tickets** tab
- Purchase lottery tickets (5 TK per ticket)
- Each ticket gets a unique number (0-9999)

### 4. Monitoring
- Check the **Home** tab for lottery statistics
- View the **Lottery** tab for round history
- Track your tickets and token balance

## 🏗 Smart Contract Details

### Token Contract (ERC-20)
- **Symbol**: TK
- **Price**: 0.001 tBNB per token
- **Functionality**: Purchase and return tokens

### Lottery Ticket Contract (ERC-721)
- **Price**: 5 TK tokens per ticket
- **Range**: Numbers 0-9999
- **Unique**: Each ticket has a distinct ID and code

### Lottery System
- **Prize Pool**: Accumulated from ticket sales
- **Distribution**: 95% winner, 5% owner
- **Winner Selection**: Owner-controlled random generation

## 🔐 Security Features

- **Network Validation**: BSC testnet only
- **MetaMask Required**: Wallet connectivity mandatory
- **Protected Routes**: Owner-only administrative functions
- **Input Validation**: TypeScript type checking
- **Smart Contract Security**: Solidity best practices

## 📊 Dashboard Tabs

### Home Tab
- Total tokens in circulation
- Number of participants
- Tickets purchased count
- Token and ticket pricing
- Current round information
- Prize pool amount
- Last winner details

### Tokens Tab
- Personal token balance
- Token purchase interface
- Token return functionality
- Transaction history

### Tickets Tab
- Personal ticket count
- Ticket details (ID and code)
- Purchase history by round
- New ticket purchase

### Lottery Tab
- Current round statistics
- Participant and ticket counts
- Prize pool information
- Personal tickets for current round
- Historical rounds with winners

## 👨‍💻 Development

### Code Quality & Design
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code formatting
- **Clean Architecture** with separation of concerns
- **Modern Dark Mode Interface** with professional aesthetics
- **Responsive Design** optimized for all devices
- **Clean Color Scheme** for optimal readability
- **UX/UI Best Practices** with intuitive navigation(loaders and toast)
- **Reusable Components** following atomic design
- **Custom Hooks** for business logic
- **Service Layer** for Web3 interactions

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Matias Ezequiel Cabrera**
- Frontend Development (React, TypeScript, Tailwind)
- Smart Contract Development (Solidity)
- Hardhat Configuration and Deployment
- Full-stack Architecture and Implementation

---
