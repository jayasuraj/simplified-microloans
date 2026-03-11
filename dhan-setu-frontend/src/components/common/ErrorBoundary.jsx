// src/components/common/ErrorBoundary.jsx
import React from 'react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-red-100 p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <span className="text-5xl">⚠️</span>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
              Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p className="text-sm md:text-base text-slate-600 text-center mb-6">
              We're sorry for the inconvenience. An unexpected error has occurred. 
              Please try refreshing the page or contact support if the problem persists.
            </p>

            {/* Error Details (for development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 bg-slate-50 rounded-lg border border-slate-200 p-4 text-left overflow-auto max-h-64">
                <p className="text-xs font-semibold text-red-700 mb-2">
                  Error Details (Development Only):
                </p>
                <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                label="Try Again"
                variant="primary"
                onClick={this.handleReset}
              />
              <Button
                label="Go to Home"
                variant="outline"
                onClick={() => window.location.href = '/'}
              />
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                If this problem continues, please contact our support team at{' '}
                <a 
                  href="mailto:support@dhansetu.com" 
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  support@dhansetu.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
