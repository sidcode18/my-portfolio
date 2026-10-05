import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ViewAllCtaProps = {
  href: string;
  label: string;
};

export function ViewAllCta({ href, label }: ViewAllCtaProps) {
  return (
    <div className="mt-6">
      <Link href={href} className="btn btn-ghost group">
        {label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
