import { Component, ErrorInfo, ReactNode } from "react";
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by error boundary:", error, errorInfo);
  }



  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center w-full h-96 ">
          <p className="text-lg m-4">
            Xatolikka yo'l qo'yildi. Iltimos, keyinroq urib ko'ring!
          </p>
          <p className="text-lg  m-4">
            Something went wrong. Please, try again later!
          </p>
          <p className="text-lg  m-4">
            Что-то пошло не так. Пожалуйста, попробуйте позже!
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
