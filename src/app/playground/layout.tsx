import Navbar from "@/components/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
    return (
    <div className="mx-20 h-screen">
        <Navbar />
        {children}
    </div>
    )
}