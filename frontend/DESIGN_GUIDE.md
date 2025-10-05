## 🎨 SafePathAI Design Guide & Component Templates

Welcome to the SafePathAI Design Guide! This document provides all the necessary information to maintain a consistent and cohesive design throughout the project. Whether you're working on the Navbar, Dashboard, Emergency Page, or any other component, please refer to this guide to ensure uniformity.


---

## 🖌 Color Palette

Based on the GSSoC Tracker app, the primary colors used are:

Primary Color: #32CD32 (Lime Green)

Secondary Color: #1E90FF (Dodger Blue)

Background Color: #FFFFFF (White) for light mode and #111111 (Very Dark Gray) for dark mode

Text Color: #000000 (Black) for light mode and #FFFFFF (White) for dark mode


These colors are defined in the Tailwind configuration as:
```
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#32CD32',
        secondary: '#1E90FF',
        background: '#FFFFFF',
        text: '#000000',
      },
    },
  },
}
```

---

## 📐 Typography & Spacing

Font Family: Use the default sans-serif font provided by Tailwind.

Font Sizes: Utilize Tailwind's responsive font sizes (text-sm, text-base, text-lg, etc.).

Spacing: Use Tailwind's spacing utilities (p-4, m-4, space-x-4, etc.) to maintain consistent padding and margins.



---

## 🧩 Component Templates

Each component should follow the structure provided below. These templates are pre-wired, meaning you only need to fill in the content.

1. **Navbar** (/components/Navbar.tsx)
```
import React from 'react';

const Navbar = () => (
  <nav className="bg-primary text-white p-4 flex justify-between items-center">
    <div className="logo">SafePathAI</div>
    <ul className="flex space-x-4">
      <li>Home</li>
      <li>Dashboard</li>
      <li>Emergency</li>
      <li>Favorites</li>
      <li>Login</li>
      <li>Signup</li>
    </ul>
  </nav>
);

export default Navbar;
```
2. **Footer** (/components/Footer.tsx)
```
import React from 'react';

const Footer = () => (
  <footer className="bg-secondary text-white p-4 flex justify-between items-center">
    <div>© 2025 SafePathAI</div>
    <div className="flex space-x-4">
      <span>Twitter</span>
      <span>GitHub</span>
      <span>LinkedIn</span>
    </div>
  </footer>
);

export default Footer;
```
3. **Dashboard Layout** (/components/DashboardLayout.tsx)
```
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background text-text">
    <Navbar />
    <main className="flex-1 p-4">{children}</main>
    <Footer />
  </div>
);

export default DashboardLayout;
```
4. Emergency Page (/components/Emergency.tsx)
```
import React from 'react';

const Emergency = () => (
  <div className="p-4">
    <h1 className="text-2xl">Emergency Assistance</h1>
    <p>Content goes here...</p>
  </div>
);

export default Emergency;

```
5. **Favorites Page** (/components/Favorites.tsx)
```bash
import React from 'react';

const Favorites = () => (
  <div className="p-4">
    <h1 className="text-2xl">Your Favorite Locations</h1>
    <p>Content goes here...</p>
  </div>
);

export default Favorites;
```
6. **Login Page** (/components/Login.tsx)
```bash
import React from 'react';

const Login = () => (
  <div className="p-4">
    <h1 className="text-2xl">Login</h1>
    <form>
      <input type="email" placeholder="Email" className="p-2 m-2 border" />
      <input type="password" placeholder="Password" className="p-2 m-2 border" />
      <button type="submit" className="bg-primary text-white p-2 m-2">Login</button>
    </form>
  </div>
);

export default Login;
```
7. **Signup Page** (/components/Signup.tsx)
```bash
import React from 'react';

const Signup = () => (
  <div className="p-4">
    <h1 className="text-2xl">Sign Up</h1>
    <form>
      <input type="text" placeholder="Full Name" className="p-2 m-2 border" />
      <input type="email" placeholder="Email" className="p-2 m-2 border" />
      <input type="password" placeholder="Password" className="p-2 m-2 border" />
      <button type="submit" className="bg-primary text-white p-2 m-2">Sign Up</button>
    </form>
  </div>
);

export default Signup;
```
---

## 🛠 Contribution Guidelines

Component Structure: Place each component in the /components directory. For pages, create a corresponding file in the /pages directory.

Naming Conventions: Use PascalCase for component filenames (e.g., Navbar.tsx, Dashboard.tsx).

Styling: Use Tailwind CSS classes as per the provided templates. Avoid custom CSS unless absolutely necessary.

Imports: Do not import components directly into the App.tsx file. Instead, use the DashboardLayout.tsx to structure the layout and render components within it.

Responsiveness: Ensure all components are responsive. Test on various screen sizes to guarantee a seamless experience across devices.



---

### 📸 Layout References

Please refer to the following layout examples for inspiration:

Colour Fromatting should be similar to this :

<img width="1862" height="915" alt="image" src="https://github.com/user-attachments/assets/c41e062e-1f51-48cd-abb3-57dcca897d56" />

Footer Page similar to this:

<img width="1895" height="398" alt="image" src="https://github.com/user-attachments/assets/7687e17f-53e2-43a6-a963-d51b13687832" />



---

## ✅ Final Notes

Consistency: Always adhere to the design guidelines to maintain a consistent user experience.

Feedback: If you encounter any issues or have suggestions for improvements, please open an issue in the repository.

Collaboration: Engage with other contributors through discussions and pull requests to enhance the project collectively.


Thank you for contributing to SafePathAI! Your efforts help make the platform more accessible and user-friendly for everyone.


---

Feel free to customize the templates and guidelines as per your project's requirements. If you need further assistance or additional components, don't hesitate to ask!
