'use client';
import { Component } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 rounded-lg"
        >
          <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FaRedo />
            Try Again
          </motion.button>
        </motion.div>
      );
    }

    return this.props.children;
  }
} 