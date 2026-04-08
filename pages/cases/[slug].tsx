import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { CaseStudyData } from "@/types/case-study";
import SlideLayout from "@/components/SlideLayout";
import CaseStudyCover from "@/components/case-study/CaseStudyCover";
import CaseStudyProblems from "@/components/case-study/CaseStudyProblems";
import CaseStudySolution from "@/components/case-study/CaseStudySolution";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyTestimonial from "@/components/case-study/CaseStudyTestimonial";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

interface Props {
  data: CaseStudyData;
}

export default function CaseStudyPage({ data }: Props) {
  const slides = [
    <CaseStudyCover key="cover" data={data} />,
    <CaseStudyProblems key="problems" data={data} />,
    <CaseStudySolution key="solution" data={data} />,
    <CaseStudyResults key="results" data={data} />,
    ...(data.testimonial ? [<CaseStudyTestimonial key="testimonial" data={data} />] : []),
    <CaseStudyCTA key="cta" data={data} />,
  ];

  return (
    <>
      <Head>
        <title>{`${data.company} — Case Study | Arcaflow AI`}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Caveat:wght@400;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SlideLayout slides={slides} clientName={data.company} totalSlides={slides.length} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = path.join(process.cwd(), "data", "case-studies");
  let slugs: string[] = [];

  if (fs.existsSync(dataDir)) {
    slugs = fs
      .readdirSync(dataDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  }

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), "data", "case-studies", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: CaseStudyData = JSON.parse(raw);

  return { props: { data } };
};
