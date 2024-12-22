const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // For HTML generation
const CopyWebpackPlugin = require('copy-webpack-plugin'); // For copying static files

module.exports = {
  entry: './src/main.jsx', // Update this to match your entry point
  output: {
    filename: 'bundle.js', // The bundled file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // Regex for both .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for React and modern JavaScript
          },
        },
      },
      {
        test: /\.css$/, // For handling CSS files
        use: ['style-loader', 'css-loader'], // Add CSS loader for bundling styles
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp|avif)$/, // Matches image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Customize the output file name
              outputPath: 'images/', // Output to 'images' folder
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to your HTML template
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/ads.txt'), to: '' }, // Place ads.txt in the root of dist
        { from: path.resolve(__dirname, 'public/robots.txt'), to: '' }, // Place robots.txt in the root of dist
        { from: path.resolve(__dirname, 'public/sitemap.xml'), to: '' }, // Place sitemap.xml in the root of dist
      ],
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'], // Resolve .jsx and .js files
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from the 'dist' folder
    compress: true, // Enable gzip compression
    port: 9000, // Port number for the development server
  },
};
