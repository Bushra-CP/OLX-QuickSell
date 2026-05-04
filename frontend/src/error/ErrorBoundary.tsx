import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
            {/* Icon */}
            <div className="text-red-500 text-5xl mb-4">⚠️</div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm">
              We ran into an unexpected issue. You can try again or go back to a
              safe page.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
