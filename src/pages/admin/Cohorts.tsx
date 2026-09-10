import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  BarChart4,
  UsersRound,
} from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";
import Avatar from "../../components/cohorts/Avatar";
import StatusBadge from "../../components/cohorts/StatusBadge";
import RowActions from "../../components/cohorts/RowActions";
import FilterButton from "../../components/cohorts/FilterButton";
import Pagination from "../../components/cohorts/Pagination";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";

import { cohorts, cohortOverviewStats, managedCohortIds } from "../../data/cohorts";
import type { Cohort } from "../../types/cohort";


function StatCard({
  icon,
  label,
  value,
  delta,
  caption,
  border,
  bg,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  delta: string;
  caption: string;
  border: string;
  bg: string;
  valueColor: string;
}) {
  return (
    <div
      className="h-[117px] w-full rounded-[11px] border p-4"
      style={{ borderColor: border, backgroundColor: bg }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[12px] text-[#555]">{label}</span>
      </div>

      <p className="mt-1 text-[17px] font-semibold" style={{ color: valueColor }}>
        {value}
      </p>

      <p className="text-[10px] font-medium text-[#00833b]">{delta}</p>
      <p className="mt-1 text-[10px] text-[#929292]">{caption}</p>
    </div>
  );
}



type ModalState = { type: "archive" | "delete"; cohort: Cohort } | null;

export default function Cohorts() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalState>(null);

  const managedCohorts = cohorts.filter((c) => managedCohortIds.includes(c.id));

  const confirmAction = () => {
    // Wire this up to your archive/delete API call.
    setModal(null);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white px-6 py-5">
        <div className="mx-auto max-w-[1400px]">
          {/* ============== PAGE HEADER ============== */}
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

          {/* ============== HEADER ACTIONS ============== */}
          <div className="mt-5 flex justify-end gap-5">
            <button
              type="button"
              onClick={() => navigate("/admin/cohorts/report")}
              className="flex h-10 items-center gap-2 rounded-[10px] border border-[#222] bg-white px-3 text-[12px] font-semibold text-[#222]"
            >
              <BarChart4 size={16} strokeWidth={1.7} />
              Generate Report
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/cohorts/new")}
              className="flex h-10 items-center gap-2 rounded-[10px] bg-[#07863d] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#067434]"
            >
              <UsersRound size={16} />
              Create Cohort
            </button>
          </div>

          {/* ============== COHORT OVERVIEW ============== */}
          <section className="mt-7 rounded-[11px] border border-[#e8e8e8] px-3 pb-4 pt-3">
            <h2 className="text-[15px] font-medium text-[#161616]">Cohort Overview</h2>

            <div className="mt-5 flex w-full justify-center gap-5">
              <StatCard
                icon={<UsersRound size={20} strokeWidth={1.8} className="text-[#4285ff]" />}
                label="Total Cohort"
                value={cohortOverviewStats.totalCohorts.value}
                delta={cohortOverviewStats.totalCohorts.delta}
                caption={cohortOverviewStats.totalCohorts.caption}
                border="#d6e4ff"
                bg="#eaf2ff"
                valueColor="#3981ff"
              />
              <StatCard
                icon={<UsersRound size={20} strokeWidth={1.8} className="text-[#008844]" />}
                label="Active Cohorts"
                value={cohortOverviewStats.activeCohorts.value}
                delta={cohortOverviewStats.activeCohorts.delta}
                caption={cohortOverviewStats.activeCohorts.caption}
                border="#d2e8da"
                bg="#e8f5ee"
                valueColor="#07853d"
              />
              <StatCard
                icon={<UsersRound size={20} strokeWidth={1.8} className="text-[#f3a000]" />}
                label="Upcoming Cohorts"
                value={cohortOverviewStats.upcomingCohorts.value}
                delta={cohortOverviewStats.upcomingCohorts.delta}
                caption={cohortOverviewStats.upcomingCohorts.caption}
                border="#ffe2bf"
                bg="#fff2e1"
                valueColor="#f39800"
              />
              <StatCard
                icon={<UsersRound size={20} strokeWidth={1.8} className="text-[#ff3c46]" />}
                label="Completed Cohorts"
                value={cohortOverviewStats.completedCohorts.value}
                delta={cohortOverviewStats.completedCohorts.delta}
                caption={cohortOverviewStats.completedCohorts.caption}
                border="#f6d9df"
                bg="#fdecef"
                valueColor="#ff3b46"
              />
            </div>
          </section>

          {/* ============== FILTERS ============== */}
          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-9 w-[228px] shrink-0 items-center gap-2 rounded-full bg-[#f4f4f4] px-3">
              <Search size={14} strokeWidth={1.8} className="text-[#888]" />
              <span className="text-[10px] text-[#777]">
                Search users, courses or lessons...
              </span>
            </div>

            <FilterButton width="104px">All Cohort</FilterButton>
            <FilterButton width="102px">All Types</FilterButton>
            <FilterButton width="102px">All Status</FilterButton>
            <FilterButton width="92px">All Date</FilterButton>

            <button
              type="button"
              className="flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-[#e8e8e8] px-3 text-[11px] text-[#777]"
            >
              Clear filter
              <SlidersHorizontal size={13} strokeWidth={1.8} />
            </button>
          </div>

          {/* ============== MAIN COHORT TABLE ============== */}
          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[950px]">
              <div className="grid grid-cols-[34px_2fr_1.1fr_0.9fr_0.7fr_0.6fr_0.6fr_0.65fr_0.65fr_70px] items-center bg-[#f3f3f3] px-2 py-4">
                <div>
                  <input type="checkbox" className="h-[14px] w-[14px]" />
                </div>
                <div className="text-[11px] font-semibold text-[#222]">Cohort</div>
                <div className="text-[11px] font-semibold text-[#222]">Program Type</div>
                <div className="text-[11px] font-semibold text-[#222]">Status</div>
                <div className="text-center text-[11px] font-semibold text-[#222]">Enrollees</div>
                <div className="text-center text-[11px] font-semibold text-[#222]">Courses</div>
                <div className="text-center text-[11px] font-semibold text-[#222]">Start</div>
                <div className="text-center text-[11px] font-semibold text-[#222]">End</div>
                <div className="text-center text-[11px] font-semibold text-[#222]">Actions</div>
              </div>

              {cohorts.map((cohort) => (
                <div
                  key={cohort.code}
                  className="grid min-h-[62px] cursor-pointer grid-cols-[34px_2fr_1.1fr_0.9fr_0.7fr_0.6fr_0.6fr_0.65fr_0.65fr_70px] items-center border-b border-[#ededed] px-2 hover:bg-[#fafafa]"
                  onClick={() => navigate(`/admin/cohorts/${cohort.id}`)}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="h-[14px] w-[14px]" />
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar src={cohort.image} initials={cohort.initials} size={36} />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-[#222]">{cohort.name}</p>
                      <p className="mt-1 text-[9px] text-[#929292]">{cohort.code}</p>
                    </div>
                  </div>

                  <div className="truncate text-[10px] text-[#222]">{cohort.programType}</div>

                  <div>
                    <StatusBadge status={cohort.status} />
                  </div>

                  <div className="text-center text-[10px] text-[#222]">{cohort.enrolled}</div>
                  <div className="text-center text-[10px] text-[#222]">{cohort.courses}</div>
                  <div className="text-center text-[10px] text-[#222]">{cohort.start}</div>
                  <div className="text-center text-[10px] text-[#222]">{cohort.end}</div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <RowActions
                      onEdit={() => navigate(`/admin/cohorts/${cohort.id}/edit`)}
                      onArchive={() => setModal({ type: "archive", cohort })}
                      onDelete={() => setModal({ type: "delete", cohort })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Pagination showingFrom={1} showingTo={6} total={20} itemLabel="Cohorts" />

          {/* ============== MY MANAGED COHORTS ============== */}
          <section className="mt-9 rounded-[11px] border border-[#e8e8e8] p-3">
            <h2 className="mb-5 text-[15px] font-medium text-[#161616]">My Managed Cohorts</h2>

            <div className="overflow-x-auto">
              <div className="min-w-[850px]">
                <div className="grid grid-cols-[34px_2.5fr_0.9fr_0.75fr_0.75fr_0.75fr_0.75fr_70px] items-center bg-[#f3f3f3] px-2 py-4">
                  <div>
                    <input type="checkbox" className="h-[14px] w-[14px]" />
                  </div>
                  <div className="text-[11px] font-semibold text-[#222]">Cohort</div>
                  <div className="text-[11px] font-semibold text-[#222]">Status</div>
                  <div className="text-center text-[11px] font-semibold text-[#222]">Enrollees</div>
                  <div className="text-center text-[11px] font-semibold text-[#222]">Courses</div>
                  <div className="text-center text-[11px] font-semibold text-[#222]">Start</div>
                  <div className="text-center text-[11px] font-semibold text-[#222]">End</div>
                  <div className="text-center text-[11px] font-semibold text-[#222]">Actions</div>
                </div>

                {managedCohorts.map((cohort) => (
                  <div
                    key={cohort.code}
                    className="grid min-h-[61px] cursor-pointer grid-cols-[34px_2.5fr_0.9fr_0.75fr_0.75fr_0.75fr_0.75fr_70px] items-center border-b border-[#ededed] px-2 hover:bg-[#fafafa]"
                    onClick={() => navigate(`/admin/cohorts/${cohort.id}`)}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="h-[14px] w-[14px]" />
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar src={cohort.image} initials={cohort.initials} size={36} />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium text-[#222]">{cohort.name}</p>
                        <p className="mt-1 text-[9px] text-[#929292]">{cohort.code}</p>
                      </div>
                    </div>

                    <div>
                      <StatusBadge status={cohort.status} />
                    </div>

                    <div className="text-center text-[10px]">{cohort.enrolled}</div>
                    <div className="text-center text-[10px]">{cohort.courses}</div>
                    <div className="text-center text-[10px]">{cohort.start}</div>
                    <div className="text-center text-[10px]">{cohort.end}</div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <RowActions
                        onEdit={() => navigate(`/admin/cohorts/${cohort.id}/edit`)}
                        onArchive={() => setModal({ type: "archive", cohort })}
                        onDelete={() => setModal({ type: "delete", cohort })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConfirmActionModal
        open={modal?.type === "archive"}
        tone="warning"
        title="Are You Sure?"
        description={`You are about to archive ${modal?.cohort.name}. Archived items can be recovered!`}
        confirmLabel="Yes, Archive!"
        onConfirm={confirmAction}
        onCancel={() => setModal(null)}
      />

      <ConfirmActionModal
        open={modal?.type === "delete"}
        tone="danger"
        title="Are You Sure?"
        description={`You are about to permanently delete ${modal?.cohort.name}. Deleted items cannot be recovered!`}
        confirmLabel="Yes, Delete!"
        onConfirm={confirmAction}
        onCancel={() => setModal(null)}
      />
    </AdminDashboardLayout>
  );
}
