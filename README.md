# User Management Dashboard

A modern, responsive React-based dashboard for managing user data. This project fetches user information from a REST API and provides various tools to filter, sort, and organize the display of information.

## 🚀 Features

- **Live Data Fetching**: Retrieves real-time data from JSONPlaceholder API.
- **Advanced Searching**: Instant search functionality across names and emails with a debounced input for performance.
- **Dynamic Sorting**: Multi-directional sorting (Ascending, Descending, and Reset) for columns like Name, Email, and Company.
- **Pagination**: Customizable rows per page (5, 10, or 20) with easy navigation.
- **Theme Support**: Seamlessly switch between **Dark Mode** and **Light Mode**.
- **Column Visibility**: Toggle specific columns (Phone, Website, address, etc.) to tailor the view.
- **Keyboard Shortcuts**: Press `/` to quickly focus on the search bar.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop screens.

## 🏗️ Architecture

The application is built using a modern React stack focus on modularity and performance:

### Tech Stack
- **Frontend Framework**: [React v18](https://reactjs.org/)
- **UI Components**: [Material UI (MUI) v7](https://mui.com/)
- **Styling**: Vanilla CSS for custom layouts and glassmorphism effects.
- **Data Source**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (Mock REST API)

### Component Structure
- **App.js**: Main entry point handling the core logic, state management, and orchestration of sub-components.
- **UserTable.js**: A specialized component for rendering user rows with custom sorting headers.
- **SearchBar.js**: Manages input state and keyboard listeners.
- **ColumnVisibilityToggle.js**: Provides a menu to control data density.
- **ThemeToggle.js**: Handles switching between light and dark visual themes.

### State Management
Utilizes React's `useState`, `useEffect`, `useMemo`, and `useCallback` hooks to manage:
- User data and loading/error states.
- Search queries and sorting configurations.
- Pagination indices.
- Theme preferences and column visibility toggles.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/prnz82/umd.git
   ```
2. Navigate to the directory:
   ```bash
   cd User-Dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## 🌐 Deployment
The project is configured for easy deployment to GitHub Pages.
```bash
npm run deploy
```
Visit the live site: [https://prnz82.github.io/umd](https://prnz82.github.io/umd)