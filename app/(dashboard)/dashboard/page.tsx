import { GetFormsStats } from "@/actions/form";
import React, { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function Dasboard() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StateCards loading={true}/>} >
        <CardStatsWrapper />
      </Suspense>
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
        value={data?.visits?.toLocaleString() || "" }
        loading={loading}
        className="shadow-md shadow-blue-600"
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
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && <Skeleton><span>0</span></Skeleton>}
        </div>
      </CardContent>
  </Card>
)
}
