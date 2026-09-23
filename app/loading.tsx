import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
