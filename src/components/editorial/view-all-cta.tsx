import Link from "next/link";

type ViewAllCtaProps = {
  href: string;
  label: string;
};

export function ViewAllCta({ href, label }: ViewAllCtaProps) {
  return (
    <div className="mt-8 flex justify-center sm:justify-start">
      <Link href={href} className="editorial-btn-primary inline-flex items-center gap-2">
        {label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
