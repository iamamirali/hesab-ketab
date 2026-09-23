export function LinearLoader({ show }: { show: boolean }) {
  if (show) {
    return (
      <div className="fixed top-0 left-0 bg-emerald-100 z-9999 h-1 w-full overflow-hidden">
        <div className="h-full w-1/2 animate-browser-loader rounded-full bg-emerald-500" />
      </div>
    );
  } else return null;
}
