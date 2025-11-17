"use client";

import { useState } from "react";
import { CheckCircle, Clock, ListChecks } from "lucide-react";

export default function ProgressPage() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Design Landing Page UI",
      status: "completed",
      deadline: "2025-02-04",
      progress: 100,
    },
    {
      id: 2,
      title: "Integrate Payment API",
      status: "in-progress",
      deadline: "2025-02-06",
      progress: 45,
    },
    {
      id: 3,
      title: "Write Service Descriptions",
      status: "pending",
      deadline: "2025-02-08",
      progress: 0,
    },
  ]);

  const assigned = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;

  const overallProgress = Math.round(
    tasks.reduce((acc, t) => acc + t.progress, 0) / assigned
  );

  return (
    <section className="min-h-screen w-full bg-gray-50 px-6 py-10 pt-[100px] pb-[50px]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">My Progress</h1>
        <p className="text-gray-500 mt-1">
          Track your tasks, progress, and deadlines.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<ListChecks size={28} />}
          label="Tasks Assigned"
          value={assigned}
        />

        <StatCard
          icon={<Clock size={28} />}
          label="In Progress"
          value={inProgress}
        />

        <StatCard
          icon={<CheckCircle size={28} />}
          label="Completed"
          value={completed}
        />
      </div>

      {/* Overall Progress */}
      <div className="mt-10 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Overall Progress
        </h2>
        <p className="text-gray-500 text-sm">
          Keep going — you're doing great!
        </p>

        <div className="mt-6 w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>

        <p className="text-right mt-2 text-sm text-gray-700 font-medium">
          {overallProgress}%
        </p>
      </div>

      {/* Task List */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Task List</h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-700",
      "in-progress": "bg-blue-100 text-blue-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return colors[status];
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Status badge */}
      <span
        className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
          task.status
        )}`}
      >
        {task.status.replace("-", " ").toUpperCase()}
      </span>
    </div>
  );
}
