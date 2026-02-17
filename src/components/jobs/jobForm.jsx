import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Label } from "@/components/ui/label.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

import { X, Plus, Loader2, Sparkles } from "lucide-react";
import { apiClient } from "@/api/apiClient";

export default function JobForm({ job, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: "",
    required_skills: [],
    preferred_skills: [],
    min_experience: "",
    salary_range: "",
    status: "active",
  });

  const [skillInput, setSkillInput] = useState("");
  const [preferredSkillInput, setPreferredSkillInput] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  /* ---------------- LOAD EDIT DATA ---------------- */
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        type: job.type || "full-time",
        description: job.description || "",
        requirements: job.requirements || "",
        required_skills: job.required_skills || [],
        preferred_skills: job.preferred_skills || [],
        min_experience: job.min_experience || "",
        salary_range: job.salary_range || "",
        status: job.status || "active",
      });
    }
  }, [job]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = (type) => {
    const input = type === "required" ? skillInput : preferredSkillInput;
    const field =
      type === "required" ? "required_skills" : "preferred_skills";

    if (input.trim() && !formData[field].includes(input.trim())) {
      handleChange(field, [...formData[field], input.trim()]);
      type === "required"
        ? setSkillInput("")
        : setPreferredSkillInput("");
    }
  };

  const removeSkill = (type, skill) => {
    const field =
      type === "required" ? "required_skills" : "preferred_skills";

    handleChange(
      field,
      formData[field].filter((s) => s !== skill)
    );
  };

  const extractSkillsFromDescription = async () => {
    if (!formData.description && !formData.requirements) return;

    setIsExtracting(true);

    try {
      const result =
        await apiClient.integrations.Core.InvokeLLM({
          prompt: `Extract required and preferred skills from this job description:

Job Description: ${formData.description}

Requirements: ${formData.requirements}`,

          response_json_schema: {
            type: "object",
            properties: {
              required_skills: {
                type: "array",
                items: { type: "string" },
              },
              preferred_skills: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        });

      if (result.required_skills) {
        handleChange("required_skills", [
          ...new Set([
            ...formData.required_skills,
            ...result.required_skills,
          ]),
        ]);
      }

      if (result.preferred_skills) {
        handleChange("preferred_skills", [
          ...new Set([
            ...formData.preferred_skills,
            ...result.preferred_skills,
          ]),
        ]);
      }
    } catch (err) {
      console.error("Skill extraction failed", err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      min_experience: formData.min_experience
        ? Number(formData.min_experience)
        : null,
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label>Job Title *</Label>
          <Input
            value={formData.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Department</Label>
          <Input
            value={formData.department}
            onChange={(e) =>
              handleChange("department", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={formData.location}
            onChange={(e) =>
              handleChange("location", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Employment Type</Label>

          <Select
            value={formData.type}
            onValueChange={(v) =>
              handleChange("type", v)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Min. Experience</Label>
          <Input
            type="number"
            min="0"
            value={formData.min_experience}
            onChange={(e) =>
              handleChange(
                "min_experience",
                e.target.value
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Salary Range</Label>
          <Input
            value={formData.salary_range}
            onChange={(e) =>
              handleChange(
                "salary_range",
                e.target.value
              )
            }
          />
        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <Label>Job Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
          required
        />
      </div>

      {/* AUTO SKILL BUTTON */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={extractSkillsFromDescription}
          disabled={
            isExtracting ||
            (!formData.description &&
              !formData.requirements)
          }
        >
          {isExtracting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Auto-extract Skills
        </Button>
      </div>

      {/* REQUIRED SKILLS */}
      <div className="space-y-2">
        <Label>Required Skills</Label>

        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill("required");
              }
            }}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => addSkill("required")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.required_skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() =>
                  removeSkill("required", skill)
                }
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : job ? (
            "Update Job"
          ) : (
            "Create Job"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
