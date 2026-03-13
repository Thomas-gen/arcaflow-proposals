import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ProposalData } from "@/types/proposal";

interface ProposalMeta {
  slug: string;
  client: string;
  company: string;
  service: string;
  date: string;
}

interface Props {
  proposals: ProposalMeta[];
}

export default function IndexPage({ proposals }: Props) {
  return (
    <>
      <Head>
        <title>Arcaflow AI — Proposals</title>
        <meta name="robots" content="noindex,nofollow" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
        style={{
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="w-full max-w-2xl">
          <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
            Arcaflow AI
          </div>
          <h1 className="text-3xl font-light mb-2" style={{ letterSpacing: "-0.02em" }}>
            Proposals
          </h1>
          <p className="text-sm mb-12" style={{ color: "#555" }}>
            {proposals.length} proposal{proposals.length !== 1 ? "s" : ""} — share via direct link
          </p>

          {proposals.length === 0 ? (
            <p className="text-sm" style={{ color: "#444" }}>
              No proposals yet. Add a JSON file to <code style={{ color: "#666" }}>data/proposals/</code>.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {[...proposals]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/proposals/${p.slug}`}
                    className="block px-5 py-4 rounded-xl transition-all"
                    style={{
                      background: "#111",
                      border: "1px solid #1e1e1e",
                      textDecoration: "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium mb-0.5" style={{ color: "#e0e0e0" }}>
                          {p.company}
                          {p.client !== p.company && (
                            <span style={{ color: "#666" }}> · {p.client}</span>
                          )}
                        </div>
                        <div className="text-xs" style={{ color: "#555" }}>
                          {p.service}
                        </div>
                      </div>
                      <div className="text-xs flex-shrink-0 mt-0.5" style={{ color: "#444" }}>
                        {new Date(p.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dataDir = path.join(process.cwd(), "data", "proposals");
  let proposals: ProposalMeta[] = [];

  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
    proposals = files.map((f) => {
      const raw = fs.readFileSync(path.join(dataDir, f), "utf-8");
      const data: ProposalData = JSON.parse(raw);
      return {
        slug: data.slug,
        client: data.client,
        company: data.company,
        service: data.service,
        date: data.date,
      };
    });
  }

  return { props: { proposals } };
};
