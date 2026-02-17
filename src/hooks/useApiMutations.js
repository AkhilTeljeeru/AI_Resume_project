/**
 * Custom hooks for common API mutation patterns
 * Reduces boilerplate and provides consistent error handling
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/api/apiClient";

/**
 * Generic mutation hook with error handling
 */
export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (options.onSuccess) options.onSuccess(data);
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
      const errorMessage = error?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
};

/**
 * Candidate mutations helper
 */
export const useCandidateMutations = () => {
  return {
    useCreateCandidate: (options = {}) =>
      useApiMutation(
        (data) => apiClient.createCandidate(data),
        {
          invalidateQueries: [["candidates"]],
          successMessage: "Candidate created successfully",
          ...options,
        }
      ),

    useUpdateCandidate: (options = {}) =>
      useApiMutation(
        ({ id, data }) => apiClient.updateCandidate(id, data),
        {
          invalidateQueries: [["candidates"]],
          successMessage: "Candidate updated successfully",
          ...options,
        }
      ),

    useDeleteCandidate: (options = {}) =>
      useApiMutation((id) => apiClient.deleteCandidate(id), {
        invalidateQueries: [["candidates"]],
        successMessage: "Candidate deleted successfully",
        ...options,
      }),
  };
};

/**
 * Job mutations helper
 */
export const useJobMutations = () => {
  return {
    useCreateJob: (options = {}) =>
      useApiMutation((data) => apiClient.createJob(data), {
        invalidateQueries: [["jobs"]],
        successMessage: "Job created successfully",
        ...options,
      }),

    useUpdateJob: (options = {}) =>
      useApiMutation(
        ({ id, data }) => apiClient.updateJob(id, data),
        {
          invalidateQueries: [["jobs"]],
          successMessage: "Job updated successfully",
          ...options,
        }
      ),

    useDeleteJob: (options = {}) =>
      useApiMutation((id) => apiClient.deleteJob(id), {
        invalidateQueries: [["jobs"]],
        successMessage: "Job deleted successfully",
        ...options,
      }),
  };
};
