export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-700 dark:text-cyan-100">
      {label}
    </span>
  );
}
