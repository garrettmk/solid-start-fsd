import { Heading } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";

export default function NotFound() {
  return (
    <>
      <PageHeader>
        <Heading class="text-lg font-medium">Not Found</Heading>
      </PageHeader>
      <PageContent>
        <Heading class="text-md mb-6">Page Not Found</Heading>
        <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
      </PageContent>
    </>
  );
}
