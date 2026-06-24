# 📐 Odin Calculator

A clean, minimalist, and responsive web calculator built with vanilla HTML5, CSS3, and JavaScript. This project is completed as part of **The Odin Project** curriculum.

---

[Live Demo](https://felixjackquinkwokkenzi.github.io/odin-calculator/)

## ✨ Features

- **Basic Operations**: Supports addition, subtraction, multiplication, and division.
- **Chained Calculations**: Resolves operations progressively as you type (e.g., typing `12 + 7 - 1` calculates `19` on pressing `-` and yields `18` on equals).
- **Keyboard Support**: Full keyboard mapping for speed and accessibility:
  - Numbers `0`-`9` and decimal `.`
  - Operators `+`, `-`, `*` (multiplies), `/` (divides)
  - `Enter` or `=` for calculation
  - `Backspace` to delete the last digit
  - `Escape` to clear all state
- **Division by Zero Protection**: Clean error-handling state that prevents the application from crashing.
- **Floating-Point Precision Fix**: Automatically rounds floating-point numbers up to 7 decimal places and trims redundant trailing zeros (e.g., `0.1 + 0.2` perfectly renders `0.3`).
- **Minimalist UI/UX Design**: Uses a cohesive, modern neutral color palette (slate-based) with elegant hover states, micro-transitions, and built-in focus management (preventing duplicate click/enter triggers).

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure.
- **CSS3**: Responsive styling, CSS Grid, variables, and custom interactive transitions.
- **JavaScript (ES6+)**: Custom application state management and event-driven keyboard/mouse controllers.

---

## 🚀 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/felixjackquinkwokkenzi/odin-calculator.git
   ```
2. Navigate into the project folder:
   ```bash
   cd odin-calculator
   ```
3. Open the `index.html` file directly in any modern browser, or run it through a local development server such as VS Code's **Live Server** extension.

---

## 🧑‍💻 Author

- **Felix Jackquin Kwok Kenzi** - [GitHub Profile](https://github.com/felixjackquinkwokkenzi)
