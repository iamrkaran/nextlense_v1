export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-12 mx-auto w-full max-w-7xl flex-1 md:overflow-y-auto">
      {children}
    </div>
  );
}
