import type { ReactNode } from "react";

import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  BarChart4,
  UsersRound,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";

import ellipse from "../../assets/Ellipse 12.png";
import ellipse1 from "../../assets/Ellipse 12 (1).png";
import ellipse2 from "../../assets/Ellipse 12 (2).png";
import ellipse3 from "../../assets/Ellipse 12 (3).png";
import ellipse5 from "../../assets/Ellipse 12 (5).png";
import ellipse6 from "../../assets/Ellipse 12 (6).png";
import ellipse7 from "../../assets/Ellipse 12 (7).png"
import ellipse8 from "../../assets/Ellipse 12 (8).png";
import ellipse9 from "../../assets/Ellipse 12 (9).png";
import ellipse10 from "../../assets/Ellipse 12 (10).png";
import ellipse11 from "../../assets/Ellipse 12 (11).png";
import ellipse12 from "../../assets/Ellipse 12 (12).png";

type CohortStatus = "Completed" | "Active" | "Upcoming";

interface Cohort {
  name: string;
  code: string;
  coordinator: string;
  image?: string;
  coordinatorImage?: string;
  initials: string;
  coordinatorInitials: string;
  status: CohortStatus;
  enrolled: string;
  courses: string;
  start: string;
  end: string;
}

interface ManagedCohort {
  name: string;
  code: string;
  image?: string;
  initials: string;
  status: CohortStatus;
  enrolled: string;
  courses: string;
  start: string;
  end: string;
}


// ======================================================
// DATA
// ======================================================

const cohorts: Cohort[] = [
  {
    name: "Cohort 1 Batch A (Genesis)",
    code: "TF01-01-A",
    coordinator: "Oqundele Isaac",
    image: ellipse,
    coordinatorImage: ellipse7,
    initials: "GA",
    coordinatorInitials: "OI",
    status: "Completed",
    enrolled: "200",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
  },
  {
    name: "Cohort 1 Batch B (Alpha)",
    code: "TF01-02-B",
    coordinator: "Matthew Coker",
    image: ellipse1,
    coordinatorImage: ellipse8,
    initials: "AB",
    coordinatorInitials: "MC",
    status: "Completed",
    enrolled: "245",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
  },
  {
    name: "Cohort 2 Batch A (Gemini)",
    code: "TF02-01-A",
    coordinator: "Abdul EFmi",
    image: ellipse2,
    coordinatorImage: ellipse9,
    initials: "GA",
    coordinatorInitials: "AE",
    status: "Active",
    enrolled: "102",
    courses: "14",
    start: "2/6/26",
    end: "2/9/26",
  },
  {
    name: "Cohort 2 Batch B (Beta)",
    code: "TF02-02-B",
    coordinator: "Ngozi Favour",
    image: ellipse3,
    coordinatorImage: ellipse10,
    initials: "BB",
    coordinatorInitials: "NF",
    status: "Active",
    enrolled: "100",
    courses: "14",
    start: "2/6/26",
    end: "2/9/26",
  },
  {
    name: "Cohort 3 Batch A (Origin)",
    code: "TF03-03-A",
    coordinator: "John Akike",
    image: ellipse5,
    coordinatorImage: ellipse11,
    initials: "OA",
    coordinatorInitials: "JA",
    status: "Active",
    enrolled: "465",
    courses: "10",
    start: "2/6/26",
    end: "2/9/26",
  },
  {
    name: "Cohort 3 Batch B (Gamma)",
    code: "TF03-03-B",
    coordinator: "Trueminds INNovation",
    image: ellipse6,
    coordinatorImage: ellipse12,
    initials: "GB",
    coordinatorInitials: "TI",
    status: "Upcoming",
    enrolled: "-",
    courses: "-",
    start: "2/10/26",
    end: "2/01/27",
  },
];

const managedCohorts: ManagedCohort[] = [
  {
    name: "Cohort 1 Batch A (Genesis)",
    code: "TF01-01-A",
    image: ellipse,
    initials: "GA",
    status: "Completed",
    enrolled: "200",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
  },
  {
    name: "Cohort 3 Batch A (Origin)",
    code: "TF03-03-A",
    image: ellipse5,
    initials: "OA",
    status: "Active",
    enrolled: "245",
    courses: "10",
    start: "2/3/26",
    end: "2/6/26",
  },
  {
    name: "Cohort 3 Batch B (Gamma)",
    code: "TF03-03-B",
    image: ellipse6,
    initials: "GB",
    status: "Upcoming",
    enrolled: "102",
    courses: "14",
    start: "2/6/26",
    end: "2/9/26",
  },
];


// ======================================================
// PROFILE IMAGE
// ======================================================

function ProfileImage({
  src,
  initials,
}: {
  src?: string;
  initials: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dfe9e2] text-[9px] font-semibold text-[#087b3c]">
      {initials}
    </div>
  );
}


// ======================================================
// STATUS BADGE
// ======================================================

function StatusBadge({
  status,
}: {
  status: CohortStatus;
}) {
  const styles: Record<CohortStatus, string> = {
    Completed: "bg-[#dcefe6] text-[#008342]",
    Active: "bg-[#dfebff] text-[#377fff]",
    Upcoming: "bg-[#fff0d8] text-[#f29400]",
  };

  return (
    <span
      className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-3 py-2 text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}


// ======================================================
// ACTION BUTTONS
// ======================================================

function Actions() {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Edit cohort"
        className="text-[#4385ff] transition-opacity hover:opacity-60"
      >
        <Pencil size={15} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        aria-label="Archive cohort"
        className="text-[#f0a000] transition-opacity hover:opacity-60"
      >
        <Archive size={15} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        aria-label="Delete cohort"
        onClick={() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete this cohort?"
          );

          if (confirmed) {
            console.log("Cohort deleted");
          }
        }}
        className="text-[#ff4141] transition-opacity hover:opacity-60"
      >
        <Trash2 size={15} strokeWidth={1.8} />
      </button>
    </div>
  );
}


// ======================================================
// FILTER BUTTON
// ======================================================

function FilterButton({
  children,
  width,
}: {
  children: ReactNode;
  width: string;
}) {
  return (
    <button
      type="button"
      style={{ width }}
      className="flex h-9 shrink-0 items-center justify-between rounded-[10px] border border-[#e8e8e8] bg-white px-3 text-[11px] text-[#555]"
    >
      <span>{children}</span>

      <ChevronDown
        size={13}
        strokeWidth={1.8}
      />
    </button>
  );
}


// ======================================================
// PAGE
// ======================================================

export default function Cohorts() {
  return (
    <AdminDashboardLayout>

      <div className="min-h-screen bg-white px-6 py-5">

        <div className="mx-auto max-w-[1400px]">


          {/* ==================================================
              PAGE HEADER
          ================================================== */}

          <div className="flex items-start justify-between">

            <div>
              <h1 className="text-[17px] font-semibold text-[#087b3c]">
                Cohort Management
              </h1>

              <p className="mt-2 text-[11px] text-[#888]">
                Continue to monitor the Cohorts
              </p>
            </div>

          </div>


          {/* ==================================================
              HEADER ACTIONS
          ================================================== */}

          <div className="mt-5 flex justify-end gap-5">

            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-[10px] border border-[#222] bg-white px-3 text-[12px] font-semibold text-[#222]"
            >
              <BarChart4
                size={16}
                strokeWidth={1.7}
              />

              Generate Report
            </button>


            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-[10px] bg-[#07863d] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#067434]"
            >
              <UsersRound size={16} />

              Create Cohort
            </button>

          </div>


          {/* ==================================================
              COHORT OVERVIEW
          ================================================== */}

          <section className="mt-7 rounded-[11px] border border-[#e8e8e8] px-3 pb-4 pt-3">

            <h2 className="text-[15px] font-medium text-[#161616]">
              Cohort Overview
            </h2>


            <div className="mt-5 w-full flex justify-center gap-5">


              {/* TOTAL COHORT */}

              <div className="h-[117px] w-full rounded-[11px] border border-[#d6e4ff] bg-[#eaf2ff] p-4">

                <div className="flex items-center gap-3">

                  <UsersRound
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#4285ff]"
                  />

                  <span className="text-[12px] text-[#555]">
                    Total Cohort
                  </span>

                </div>

                <p className="mt-1 text-[17px] font-semibold text-[#3981ff]">
                  20
                </p>

                <p className="text-[10px] font-medium text-[#00833b]">
                  +10 this month
                </p>

                <p className="mt-1 text-[10px] text-[#929292]">
                  All cohort
                </p>

              </div>


              {/* ACTIVE COHORTS */}

              <div className="h-[117px] w-full rounded-[11px] border border-[#d2e8da] bg-[#e8f5ee] p-4">

                <div className="flex items-center gap-3">

                  <UsersRound
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#008844]"
                  />

                  <span className="text-[12px] text-[#555]">
                    Active Cohorts
                  </span>

                </div>

                <p className="mt-1 text-[17px] font-semibold text-[#07853d]">
                  2
                </p>

                <p className="text-[10px] font-medium text-[#00833b]">
                  +1 this month
                </p>

                <p className="mt-1 text-[10px] text-[#929292]">
                  Currently running
                </p>

              </div>


              {/* UPCOMING COHORTS */}

              <div className="h-[117px] w-full rounded-[11px] border border-[#ffe2bf] bg-[#fff2e1] p-4">

                <div className="flex items-center gap-3">

                  <UsersRound
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#f3a000]"
                  />

                  <span className="text-[12px] text-[#555]">
                    Upcoming Cohorts
                  </span>

                </div>

                <p className="mt-1 text-[17px] font-semibold text-[#f39800]">
                  2
                </p>

                <p className="text-[10px] font-medium text-[#00833b]">
                  +2 this month
                </p>

                <p className="mt-1 text-[10px] text-[#929292]">
                  Starting soon
                </p>

              </div>


              {/* COMPLETED COHORTS */}

              <div className="h-[117px] w-full   rounded-[11px] border border-[#f6d9df] bg-[#fdecef] p-4">

                <div className="flex items-center gap-3">

                  <UsersRound
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#ff3c46]"
                  />

                  <span className="text-[12px] text-[#555]">
                    Completed Cohorts
                  </span>

                </div>

                <p className="mt-1 text-[17px] font-semibold text-[#ff3b46]">
                  5
                </p>

                <p className="text-[10px] font-medium text-[#00833b]">
                  +1 this month
                </p>

                <p className="mt-1 text-[10px] text-[#929292]">
                  Successfully completed
                </p>

              </div>

            </div>

          </section>


          {/* ==================================================
              FILTERS
          ================================================== */}

          <div className="mt-7 flex items-center gap-4">

            {/* Search */}

            <div className="flex h-9 w-[228px] shrink-0 items-center gap-2 rounded-full bg-[#f4f4f4] px-3">

              <Search
                size={14}
                strokeWidth={1.8}
                className="text-[#888]"
              />

              <span className="text-[10px] text-[#777]">
                Search users, courses or lessons...
              </span>

            </div>


            <FilterButton width="104px">
              All Cohort
            </FilterButton>


            <FilterButton width="128px">
              All Coordinator
            </FilterButton>


            <FilterButton width="102px">
              All Status
            </FilterButton>


            <FilterButton width="92px">
              All Date
            </FilterButton>


            <button
              type="button"
              className="flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-[#e8e8e8] px-3 text-[11px] text-[#777]"
            >
              Clear filter

              <SlidersHorizontal
                size={13}
                strokeWidth={1.8}
              />
            </button>

          </div>


          {/* ==================================================
              MAIN COHORT TABLE
          ================================================== */}

          <div className="mt-7 overflow-x-auto">

            <div className="min-w-[900px]">

              {/* TABLE HEADER */}

              <div className="grid grid-cols-[34px_2.25fr_1.35fr_0.9fr_0.65fr_0.65fr_0.7fr_0.7fr_70px] items-center bg-[#f3f3f3] px-2 py-4">

                <div>
                  <input
                    type="checkbox"
                    className="h-[14px] w-[14px]"
                  />
                </div>

                <div className="text-[11px] font-semibold text-[#222]">
                  Cohort
                </div>

                <div className="text-[11px] font-semibold text-[#222]">
                  Coordinator
                </div>

                <div className="text-[11px] font-semibold text-[#222]">
                  Status
                </div>

                <div className="text-center text-[11px] font-semibold text-[#222]">
                  Enrollees
                </div>

                <div className="text-center text-[11px] font-semibold text-[#222]">
                  Courses
                </div>

                <div className="text-center text-[11px] font-semibold text-[#222]">
                  Start
                </div>

                <div className="text-center text-[11px] font-semibold text-[#222]">
                  End
                </div>

                <div className="text-center text-[11px] font-semibold text-[#222]">
                  Actions
                </div>

              </div>


              {/* TABLE ROWS */}

              {cohorts.map((cohort) => (
                <div
                  key={cohort.code}
                  className="grid min-h-[62px] grid-cols-[34px_2.25fr_1.35fr_0.9fr_0.65fr_0.65fr_0.7fr_0.7fr_70px] items-center border-b border-[#ededed] px-2"
                >

                  {/* Checkbox */}

                  <div>
                    <input
                      type="checkbox"
                      className="h-[14px] w-[14px]"
                    />
                  </div>


                  {/* Cohort */}

                  <div className="flex min-w-0 items-center gap-3">

                    <ProfileImage
                      src={cohort.image}
                      initials={cohort.initials}
                    />

                    <div className="min-w-0">

                      <p className="truncate text-[11px] font-medium text-[#222]">
                        {cohort.name}
                      </p>

                      <p className="mt-1 text-[9px] text-[#929292]">
                        {cohort.code}
                      </p>

                    </div>

                  </div>


                  {/* Coordinator */}

                  <div className="flex min-w-0 items-center gap-2">

                    <ProfileImage
                      src={cohort.coordinatorImage}
                      initials={cohort.coordinatorInitials}
                    />

                    <span className="max-w-[105px] text-[10px] leading-[14px] text-[#222]">
                      {cohort.coordinator}
                    </span>

                  </div>


                  {/* Status */}

                  <div>
                    <StatusBadge status={cohort.status} />
                  </div>


                  {/* Enrollees */}

                  <div className="text-center text-[10px] text-[#222]">
                    {cohort.enrolled}
                  </div>


                  {/* Courses */}

                  <div className="text-center text-[10px] text-[#222]">
                    {cohort.courses}
                  </div>


                  {/* Start */}

                  <div className="text-center text-[10px] text-[#222]">
                    {cohort.start}
                  </div>


                  {/* End */}

                  <div className="text-center text-[10px] text-[#222]">
                    {cohort.end}
                  </div>


                  {/* Actions */}

                  <Actions />

                </div>
              ))}

            </div>

          </div>


          {/* ==================================================
              PAGINATION
          ================================================== */}

          <div className="mt-6 flex items-center justify-between">

            <span className="text-[10px] text-[#777]">
              Showing 1 to 6 of 20 Cohorts
            </span>


            <div className="flex items-center gap-2">

              <button
                type="button"
                aria-label="Previous page"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc]"
              >
                <ChevronLeft size={14} />
              </button>


              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#72a6ff] bg-[#edf4ff] text-[10px] text-[#347aff]"
              >
                1
              </button>


              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc] text-[10px]"
              >
                2
              </button>


              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc] text-[10px]"
              >
                3
              </button>


              <button
                type="button"
                aria-label="Next page"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc]"
              >
                <ChevronRight size={14} />
              </button>


              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc] text-[10px]"
              >
                10
              </button>


              <button
                type="button"
                className="flex h-7 items-center gap-2 rounded-[7px] border border-[#ccc] px-2 text-[10px]"
              >
                Last page

                <ChevronDown size={12} />
              </button>

            </div>

          </div>


          {/* ==================================================
              MY MANAGED COHORTS
          ================================================== */}

          <section className="mt-9 rounded-[11px] border border-[#e8e8e8] p-3">

            <h2 className="mb-5 text-[15px] font-medium text-[#161616]">
              My Managed Cohorts
            </h2>


            <div className="overflow-x-auto">

              <div className="min-w-[850px]">

                {/* TABLE HEADER */}

                <div className="grid grid-cols-[34px_2.5fr_0.9fr_0.75fr_0.75fr_0.75fr_0.75fr_70px] items-center bg-[#f3f3f3] px-2 py-4">

                  <div>
                    <input
                      type="checkbox"
                      className="h-[14px] w-[14px]"
                    />
                  </div>

                  <div className="text-[11px] font-semibold text-[#222]">
                    Cohort
                  </div>

                  <div className="text-[11px] font-semibold text-[#222]">
                    Status
                  </div>

                  <div className="text-center text-[11px] font-semibold text-[#222]">
                    Enrollees
                  </div>

                  <div className="text-center text-[11px] font-semibold text-[#222]">
                    Courses
                  </div>

                  <div className="text-center text-[11px] font-semibold text-[#222]">
                    Start
                  </div>

                  <div className="text-center text-[11px] font-semibold text-[#222]">
                    End
                  </div>

                  <div className="text-center text-[11px] font-semibold text-[#222]">
                    Actions
                  </div>

                </div>


                {/* ROWS */}

                {managedCohorts.map((cohort) => (
                  <div
                    key={cohort.code}
                    className="grid min-h-[61px] grid-cols-[34px_2.5fr_0.9fr_0.75fr_0.75fr_0.75fr_0.75fr_70px] items-center border-b border-[#ededed] px-2"
                  >

                    {/* Checkbox */}

                    <div>
                      <input
                        type="checkbox"
                        className="h-[14px] w-[14px]"
                      />
                    </div>


                    {/* Cohort */}

                    <div className="flex min-w-0 items-center gap-3">

                      <ProfileImage
                        src={cohort.image}
                        initials={cohort.initials}
                      />

                      <div className="min-w-0">

                        <p className="truncate text-[11px] font-medium text-[#222]">
                          {cohort.name}
                        </p>

                        <p className="mt-1 text-[9px] text-[#929292]">
                          {cohort.code}
                        </p>

                      </div>

                    </div>


                    {/* Status */}

                    <div>
                      <StatusBadge status={cohort.status} />
                    </div>


                    {/* Enrollees */}

                    <div className="text-center text-[10px]">
                      {cohort.enrolled}
                    </div>


                    {/* Courses */}

                    <div className="text-center text-[10px]">
                      {cohort.courses}
                    </div>


                    {/* Start */}

                    <div className="text-center text-[10px]">
                      {cohort.start}
                    </div>


                    {/* End */}

                    <div className="text-center text-[10px]">
                      {cohort.end}
                    </div>


                    {/* Actions */}

                    <Actions />

                  </div>
                ))}

              </div>

            </div>

          </section>

        </div>

      </div>

    </AdminDashboardLayout>
  );
}