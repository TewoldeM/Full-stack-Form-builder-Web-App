import { GetFormsStats } from "@/actions/form";
import React, { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi"
import {TbArrowBounce} from "react-icons/tb"
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
export default function Dasboard() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StateCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <CreateFormBtn />
      <Separator className="my-6" />
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormsStats();
  return <StateCards loading={false} data={stats} />;
}
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormsStats>>;
  loading: boolean;
}

function StateCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StateCard
        title="Total visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StateCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StateCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="visits that resulted in a form submission"
        value={data?.submissionRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StateCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="visits that resulted in a form submission"
        value={data?.bounceRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

function StateCard({  title,icon,value,loading,className,helperText,}: {
  title: string;
  value: string;
  helperText:string;
  loading: boolean;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className={ className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && <Skeleton><span className="opacity-0">0</span></Skeleton>}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{ helperText}</p>
      </CardContent>
  </Card>
)
}
