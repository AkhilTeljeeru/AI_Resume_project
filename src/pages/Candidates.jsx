import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function Candidates() {
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(null);

  // ✅ FETCH CANDIDATES
  const { data: candidates = [], isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => apiClient.getCandidates(),
  });

  // ✅ UPDATE STATUS MUTATION
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {id: number, status: string}>} */
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return apiClient.updateCandidate(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Status updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ DELETE MUTATION
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, number>} */
  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ BULK OPERATIONS
  const handleBulkStatusChange = async (status) => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateStatusMutation.mutateAsync({ id, status })
        )
      );
      setSelectedIds([]);
      setBulkAction(null);
    } catch (err) {
      toast.error("Failed to update statuses");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} candidate(s)?`)) return;
    try {
      await Promise.all(selectedIds.map((id) => deleteMutation.mutateAsync(id)));
      setSelectedIds([]);
    } catch (err) {
      toast.error("Failed to delete candidates");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(
      selectedIds.length === candidates.length
        ? []
        : candidates.map((c) => c.id)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      shortlisted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading candidates: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <p className="text-slate-600 mt-1">Manage and track candidate information</p>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between"
        >
          <span className="font-medium">{selectedIds.length} selected</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkStatusChange("shortlisted")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
            >
              <Check className="w-4 h-4" />
              Shortlist
            </button>
            <button
              onClick={() => handleBulkStatusChange("rejected")}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </motion.div>
      )}

      {/* Candidates Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-slate-500">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500">No candidates found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === candidates.length}
                    onChange={selectAll}
                    className="w-4 h-4"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Skills</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {candidates.map((candidate) => (
                  <motion.tr
                    key={candidate.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(candidate.id)}
                        onChange={() => toggleSelect(candidate.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{candidate.name}</td>
                    <td className="px-6 py-4 text-slate-600">{candidate.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills?.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills?.length > 2 && (
                          <span className="text-xs text-slate-500">
                            +{candidate.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status || "new"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={createPageUrl("candidate")}
                          className="p-2 hover:bg-slate-100 rounded transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteMutation.mutate(candidate.id)}
                          type="button"
                          className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
