import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        // Reset error state instead of reloading the entire page
        // This preserves user authentication and just recovers from the error
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
                    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-card max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-[#fff5f5] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-[#dc3545]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Something went wrong</h1>
                        <p className="text-[#666666] mb-6">
                            We're sorry, but the application encountered an unexpected error.
                        </p>

                        {this.state.error && (
                            <div className="bg-[#f8f9fa] p-4 rounded-xl mb-6 text-left overflow-auto max-h-40">
                                <p className="text-xs font-mono text-[#dc3545]">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={this.handleReload}
                            className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
