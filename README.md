# 3D Spinning Sphere

An interactive 3D spinning sphere with starfield background and mouse controls, built with Three.js.

## Features

- **3D Spinning Sphere**: A glowing cyan sphere with wireframe overlay and red marker dots for clear rotation visibility
- **Starfield Background**: Beautiful space-like background with 10,000 stars (toggleable)
- **Mouse Interaction**: 
  - Move your mouse to control the sphere's position on screen
  - The sphere follows mouse movement with smooth damping
  - Mouse position also influences rotation direction
- **Auto-rotation**: The sphere continuously spins on both axes
- **Responsive Design**: Adapts to different screen sizes

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/dazdaz/3d-spinning-sphere.git
   cd 3d-spinning-sphere
   ```

2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Or using Node.js (if you have http-server installed)
   npx http-server -p 8080
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Controls

- **Mouse Movement**: Move your mouse to guide the sphere around the screen
- **Toggle Starfield**: Click the "Toggle Starfield" button in the top-left corner to enable/disable the starfield background

## Technical Details

- Built with [Three.js](https://threejs.org/) r128
- Uses WebGL for rendering
- Features include:
  - MeshStandardMaterial with emissive properties
  - Point lighting for depth perception
  - BufferGeometry for efficient starfield rendering
  - Smooth animation loop with requestAnimationFrame

## File Structure

```
3d-spinning-sphere/
├── index.html          # Main HTML file
├── script.js           # JavaScript application logic
├── three.min.js        # Three.js library
└── README.md           # This file
```

## Browser Compatibility

Works in all modern browsers that support WebGL:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues or pull requests to improve this project!

---

Created with ❤️ using Three.js