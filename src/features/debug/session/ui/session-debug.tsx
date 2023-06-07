import { useSession } from "@/entities/session";
import { Code } from "@/shared/ui";

export function SessionDebug() {
  const session = useSession();

  return (
    <Code>
      {JSON.stringify(session(), null, 2) ?? 'n/a'}
    </Code>
  );
}