import { useSession } from "@/entities/session";

export function SessionDebug() {
  const session = useSession();

  return (
    <pre class="bg-slate-200 p-4 inline-block rounded-md">
      {JSON.stringify(session(), null, 2) ?? 'n/a'}
    </pre>
  );
}