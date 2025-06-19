# Insurance Website

A modern, responsive insurance website built with HTML5, CSS3, JavaScript, and SCSS. Features interactive elements, theme support, and a comprehensive insurance product showcase.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Theme Support**: Light, dark, and custom color themes
- **Interactive Elements**: 
  - Insurance calculators
  - Live chat bot
  - Product comparison tools
  - Quote request forms
- **Performance Optimized**: Minified assets, lazy loading, and efficient bundling
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **SEO Friendly**: Semantic HTML, meta tags, and structured data

## 📁 Project Structure

```
insurance-website/
├── public/                 # Built files (generated)
│   ├── css/               # Compiled CSS files
│   ├── js/                # Bundled JavaScript files
│   ├── images/            # Optimized images
│   ├── fonts/             # Web fonts
│   └── *.html             # HTML pages
├── src/                   # Source files
│   ├── html/              # HTML templates
│   ├── scss/              # SCSS stylesheets
│   │   ├── abstracts/     # Variables, mixins, functions
│   │   ├── base/          # Base styles, resets
│   │   ├── components/    # Reusable components
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page-specific styles
│   │   └── themes/        # Theme variations
│   ├── js/                # JavaScript modules
│   │   ├── components/    # UI components
│   │   ├── utils/         # Utility functions
│   │   └── data/          # JSON data files
│   ├── images/            # Source images
│   └── fonts/             # Source fonts
├── docs/                  # Documentation
├── tests/                 # Test files
├── package.json           # Dependencies and scripts
├── webpack.config.js      # Webpack configuration
├── gulpfile.js           # Gulp build tasks
├── .eslintrc.js          # ESLint configuration
├── .babelrc              # Babel configuration
├── .prettierrc           # Prettier configuration
└── README.md             # This file
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Preprocessor**: SCSS
- **Build Tools**: Webpack 5, Gulp 4
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest
- **Libraries**: Chart.js, Fuse.js, Lodash

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd insurance-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run watch` - Watch for changes and rebuild
- `npm run sass` - Compile SCSS to CSS
- `npm run gulp` - Run Gulp build tasks
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run serve` - Serve built files locally

## 🎨 Customization

### Themes
The website supports multiple themes. To add a new theme:

1. Create a new SCSS file in `src/scss/themes/`
2. Define your color variables
3. Import the theme in `src/scss/main.scss`

### Components
Reusable components are located in `src/scss/components/`. Each component has its own file for easy maintenance.

### JavaScript Modules
JavaScript is modularized in `src/js/`. Add new functionality by creating new modules and importing them in `app.js`.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🧪 Testing

Run tests with:
```bash
npm test
```

Tests are located in the `tests/` directory and cover:
- JavaScript functionality
- Component behavior
- Utility functions

## 📄 Pages

1. **Home** (`index.html`) - Landing page with hero section and featured products
2. **Products** (`products.html`) - Complete product catalog with filtering
3. **Consultation** (`consultation.html`) - Quote request and consultation booking
4. **FAQ** (`faq.html`) - Frequently asked questions with search functionality

## 🔧 Configuration

### Webpack
Configure bundling, optimization, and development server in `webpack.config.js`.

### Gulp
Configure build tasks, asset processing, and file watching in `gulpfile.js`.

### ESLint
Configure code quality rules in `.eslintrc.js`.

### Prettier
Configure code formatting in `.prettierrc`.

## 📈 Performance

The website is optimized for performance with:
- Minified CSS and JavaScript
- Optimized images
- Lazy loading
- Efficient bundling
- CDN-ready assets

## 🔒 Security

- Input validation on all forms
- XSS protection
- Secure headers
- HTTPS ready

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Internet Explorer 11+

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for modern insurance solutions** 