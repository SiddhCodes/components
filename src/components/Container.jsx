import { cn } from "../utils/cn"

export const Container = ({ children }) => {
    return (
        <div className={cn("max-w-7xl mx-auto")}>{children}</div>
    )
}
