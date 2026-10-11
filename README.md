# SmartPocket 👛

> **Make Smarter Decisions. Never Face a Financial Crisis Again.**  
> A delightful, hand-crafted personal financial companion built directly from hand-drawn wireframes with customizable wallet skins, real-time purchase simulation, envelope budgeting, and commitment protection.

---

## 📸 Key Features

- **Personalized Customized Wallets**: Choose and equip from 16+ unique wallet skins (Van Gogh's Starry Night, Luck Duck, Twin Koi, Batman Emboss, Kawaii Shark, and more) cropped directly from the original collage sheet.
- **Envelope Budgeting & Limits**: Interactive budget envelopes reflecting the original wireframes (Mess, Commute, Health, Shopping, Emergency, Skincare, etc.) with real-time remaining gauges.
- **Pre-Purchase Impact Analysis ("Think Twice Before You Spend")**:
  - 🟢 **HURRA!**: Purchase fits comfortably within the budget and leaves emergency reserves intact.
  - 🟡 **YIKES!**: Purchase compromises planned goals (e.g. "Save for shoes") or exceeds envelope allocations.
  - 🔴 **BEWARE!**: Purchase threatens vital survival funds (e.g., "You will not be able to pay advance mess").
- **Financial Commitment Walls**: Track high-priority commitments like Mess advances, party funds, and rent to prevent impulse drains.
- **Original Wireframe Comparator**: Interactive in-app lightbox comparing the live app directly with the 4 original hand-drawn sketches.

---

## 🛠️ Tech Stack & Prerequisites

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom organic wireframe aesthetic
- **Icons & Effects**: Lucide Icons, Canvas Confetti
- **Build Tool**: Vite 6
- **Testing**: Vitest
- **Prerequisites**: Node.js 18+ and npm installed.

---

## 🚀 Quickstart & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ananya-vishal-walunjkar07/SmartPocket.git
   cd SmartPocket
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port shown in your terminal) to view the app.

4. **Run Unit Tests**:
   ```bash
   npm test
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in `dist/`.

---

## 📁 Project Structure

```text
SmartPocket/
├── public/
│   └── assets/
│       ├── smartpocket-logo.png          # Original hand-drawn SmartPocket logo
│       ├── wireframes/                   # 4 original hand-drawn screen wireframes
│       └── wallets/                      # 16+ cropped wallet skins & collage sheet
├── src/
│   ├── components/
│   │   ├── Home.tsx                      # Welcome & Wallet stacking deck (Wireframe 1)
│   │   ├── Dashboard.tsx                 # Balance gauge & Category envelopes (Wireframe 2)
│   │   ├── Analyze.tsx                   # "Think Twice Before You Spend" engine (Wireframe 4)
│   │   └── Wallets.tsx                   # Wallet selection & customization (Wireframe 3)
│   ├── utils/
│   │   ├── financialEngine.ts            # HURRA / YIKES / BEWARE decision algorithm
│   │   └── financialEngine.test.ts       # Vitest unit test suite
│   ├── types.ts                          # TypeScript interface definitions
│   ├── mockData.ts                       # Seed data accurately mirroring wireframe amounts
│   ├── App.tsx                           # Master app navigation & local persistence
│   ├── index.css                         # Tailwind CSS & custom hand-drawn styling
│   └── main.tsx                          # App mounting point
├── .env.example                          # Safe environment variable template
├── .gitignore                            # Clean ignores for node_modules, dist, etc.
├── package.json                          # Dependencies & build scripts
├── tsconfig.json                         # TypeScript configuration
├── vite.config.ts                        # Vite configuration
└── README.md                             # Project documentation
```

---

## 🛡️ Security & Privacy

- All state and transactions are stored locally using client-side `localStorage`.
- No proprietary API keys or secrets are required.
- `.env.example` is provided for optional environment customization.
