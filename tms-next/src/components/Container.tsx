
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto  px-20 pt-16 flex flex-col">
      {children}
    </div>
  );
}
