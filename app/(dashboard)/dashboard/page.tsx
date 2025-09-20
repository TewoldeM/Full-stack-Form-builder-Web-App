import { GetForms, GetFormsStats } from "@/actions/form";
import React, { Suspense } from "react";
import { LuView } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { BiRightArrowAlt } from "react-icons/bi"
import {FaEdit} from "react-icons/fa"
export default function Dasboard() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StateCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2 p-2">Your Forms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
      </div>
      <Suspense
        fallback={[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      >
        <FormCards />
      </Suspense>
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

function StateCard({
  title,
  icon,
  value,
  loading,
  className,
  helperText,
}: {
  title: string;
  value: string;
  helperText: string;
  loading: boolean;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <link href={`/forms/$(form.id)`}>
            <Button asChild className="w-full mt-2 text-md gap-4">
              View submission <BiRightArrowAlt />
            </Button>
          </link>
        )}
        {!form.published && (
          <link href={`/build/$(form.id)`}>
            <Button asChild className="w-full mt-2 text-md gap-4">
             Edit form <FaEdit />
            </Button>
          </link>
        )}
      </CardFooter>
    </Card>
  );
}
