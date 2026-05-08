import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/metadata";

export function Footer() {
  return (
    <footer className="w-full">
      <Separator />
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
