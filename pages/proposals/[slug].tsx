import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { ProposalData } from "@/types/proposal";
import SlideLayout from "@/components/SlideLayout";
import CoverSlide from "@/components/slides/CoverSlide";
import ChallengesSlide from "@/components/slides/ChallengesSlide";
import ApproachSlide from "@/components/slides/ApproachSlide";
import SolutionSlide from "@/components/slides/SolutionSlide";
import TimelineSlide from "@/components/slides/TimelineSlide";
import InvestmentSlide from "@/components/slides/InvestmentSlide";
import BonusesSlide from "@/components/slides/BonusesSlide";
import TeamSlide from "@/components/slides/TeamSlide";
import NextStepsSlide from "@/components/slides/NextStepsSlide";

interface Props {
  data: ProposalData;
}

export default function ProposalPage({ data }: Props) {
  const slides = [
    <CoverSlide key="cover" data={data} />,
    <ChallengesSlide key="challenges" data={data} />,
    ...(data.approach ? [<ApproachSlide key="approach" data={data} />] : []),
    <SolutionSlide key="solution" data={data} />,
    <TimelineSlide key="timeline" data={data} />,
    ...(data.team && data.team.length > 0 ? [<TeamSlide key="team" data={data} />] : []),
    ...(data.investment ? [<InvestmentSlide key="investment" data={data} />] : []),
    <BonusesSlide key="bonuses" data={data} />,
    <NextStepsSlide key="nextsteps" data={data} />,
  ];

  return (
    <>
      <Head>
        <title>{`Arcaflow AI × ${data.company}`}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SlideLayout slides={slides} clientName={data.client} totalSlides={slides.length} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = path.join(process.cwd(), "data", "proposals");
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
  const filePath = path.join(process.cwd(), "data", "proposals", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: ProposalData = JSON.parse(raw);

  return { props: { data } };
};
