import SideNav from "@/components/nav/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
    <div className="w-20 flex-none lg:w-64 md:border-r">
      <SideNav />
    </div>
    <div className="flex-grow flex-1 w-full overflow-y-auto mx-auto pt-8 md:mt-0">
      {children}
    </div>
  </div>
  );
}
