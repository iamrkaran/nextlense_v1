import './style.css';
export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      {children}
    </div>
  );
}
