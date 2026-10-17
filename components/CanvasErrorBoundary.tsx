import { Component, ReactNode } from 'react'

interface IProps {
    children: ReactNode
}

interface IState {
    hasError: boolean
}

// Without WebGL (disabled GPU, old devices) the 3D canvas throws on mount.
// Render nothing in its place instead of crashing the whole page.
export default class CanvasErrorBoundary extends Component<IProps, IState> {
    state: IState = { hasError: false }

    static getDerivedStateFromError(): IState {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) return null
        return this.props.children
    }
}
