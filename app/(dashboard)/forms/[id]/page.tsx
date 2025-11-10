import { GetFormById, GetFormWithSubmission } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React, { ReactNode } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";
import { StatesCard } from "../../dashboard/page";
import { error } from "console";
import { ElementsType } from "@/components/FormElements";
import { FormElementInstance } from "@/components/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDate, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("form not found");
  }
  const { visits, submissions } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <div className="flex flex-col">
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.share} />
        </div>
        <div className="py-4 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.share} />
          </div>
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatesCard
          title="Total visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits?.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatesCard
          title="Total Submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions?.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatesCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="visits that resulted in a form submission"
          value={submissionRate?.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatesCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="visits that resulted in a form submission"
          value={bounceRate?.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div>
        <SubmissionTable id={form.id} />
      </div>
    </div>
  );
}

export default FormDetailPage;

type Row = { [key: string]: string } & { submittedAt: Date };
async function SubmissionTable({ id }: { id: number }) {
  const form = await GetFormWithSubmission(id);
  if (!form) {
    throw new Error("form not found");
  }
  const formElements = JSON.parse(form?.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];
  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckBoxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });
  const rows: Row[] = [];
  form.formSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submission</h1>
      <div className="rounded-border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((columns) => (
                  <RowCell
                    key={columns.id}
                    type={columns.type}
                    value={row[columns.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value)
      node = <Badge variant={"outline"}>
        {format(date, "dd/MM/yyy")}
      </Badge>
      break;
    case "CheckBoxField":
      const checked = value === "true"
      node = <Checkbox checked={checked} disabled />
      break

  }
  return <TableCell>{node}</TableCell>;
}
