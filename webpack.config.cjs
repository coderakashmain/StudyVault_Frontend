const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Assuming you are using this for HTML generation

module.exports = {
  entry: './src/main.jsx',  // Update this to match your entry point
  output: {
    filename: 'bundle.js',  // The bundled file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Regex for both .js and .jsx files
        exclude: /node_modules/,  // Exclude node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Babel presets for React and modern JavaScript
          },
        },
      },
      {
        test: /\.css$/,  // For handling CSS files
        use: ['style-loader', 'css-loader'],  // Add CSS loader for bundling styles
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp|avif)$/, // matches image files
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
      template: './index.html',  // Path to your HTML template
    }),

    

  ],
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve .jsx and .js files
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,  // Port number for development server
  },
};
